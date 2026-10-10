import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const defaultAuthValue = {
  user: null,
  role: null,
  isAuthenticated: false,
  selectedRole: "donor",
  setSelectedRole: () => {},
  authIntent: null,
  intentPayload: null,
  isAuthModalOpen: false,
  authModalMode: "signin",
  setAuthModalMode: () => {},
  wrongRoleState: { isOpen: false, requiredRole: "ngo", intent: null, payload: null },
  requireAuth: () => {},
  login: () => {},
  logout: () => {},
  switchRole: () => {},
  updateUser: () => {},
  closeAuthModal: () => {},
  closeWrongRoleModal: () => {},
  fulfillIntent: () => {},
  loginWithCredentials: async () => {},
  registerWithCredentials: async () => {},
};

const AuthContext = createContext(defaultAuthValue);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const pendingAuthCallbackRef = useRef(null);

  // Active authenticated user: null or { ... }
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("annshare_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal open states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("signin"); // "signin" | "signup"

  // Context-aware authentication tracking
  const [selectedRole, setSelectedRole] = useState("donor"); // "donor" | "ngo"
  const [authIntent, setAuthIntent] = useState(null);
  const [intentPayload, setIntentPayload] = useState(null);

  // Wrong Role Modal state
  const [wrongRoleState, setWrongRoleState] = useState({
    isOpen: false,
    requiredRole: "ngo",
    intent: null,
    payload: null,
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("annshare_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("annshare_user");
        localStorage.removeItem("annshare_token");
      }
    } catch (e) {
      console.error("Failed to persist user session", e);
    }
  }, [user]);

  const isAuthenticated = Boolean(user);
  const role = user ? user.role : null;

  /**
   * Helper to route to the appropriate dashboard and activate the intended action
   */
  const fulfillIntent = useCallback(
    (targetRole, intentToRun, payload) => {
      if (targetRole === "donor") {
        if (intentToRun === "donate_food") {
          navigate("/donor/dashboard?tab=donate", { state: { intent: "donate_food", payload } });
        } else if (intentToRun === "my_donations") {
          navigate("/donor/dashboard?tab=my-donations", { state: { intent: "my_donations", payload } });
        } else {
          navigate("/donor/dashboard?tab=overview", { state: { intent: intentToRun, payload } });
        }
      } else if (targetRole === "ngo") {
        if (intentToRun === "view_order_request" || intentToRun === "order_requests") {
          navigate("/ngo/dashboard?tab=requests", { state: { intent: "view_order_request", payload } });
        } else if (intentToRun === "request_food" || intentToRun === "claim_food") {
          navigate("/ngo/dashboard?tab=requests&action=new", { state: { intent: intentToRun, payload } });
        } else if (intentToRun === "find_food") {
          navigate("/ngo/dashboard?tab=find-food", { state: { intent: "find_food", payload } });
        } else {
          navigate("/ngo/dashboard?tab=overview", { state: { intent: intentToRun, payload } });
        }
      }
    },
    [navigate]
  );

  /**
   * Universal Context-Aware Auth Trigger
   */
  const requireAuth = useCallback(
    ({
      role: requiredRole = "donor",
      intent = null,
      payload = null,
      onAuthorized = null,
      mode = "signin",
    }) => {
      if (isAuthenticated && role === requiredRole) {
        if (typeof onAuthorized === "function") {
          onAuthorized();
          return;
        }
        fulfillIntent(requiredRole, intent, payload);
        return;
      }

      if (isAuthenticated && role !== requiredRole) {
        pendingAuthCallbackRef.current = onAuthorized;
        setWrongRoleState({
          isOpen: true,
          requiredRole,
          intent,
          payload,
        });
        return;
      }

      pendingAuthCallbackRef.current = onAuthorized;
      setAuthModalMode(mode);
      setSelectedRole(requiredRole);
      setAuthIntent(intent);
      setIntentPayload(payload);
      setIsAuthModalOpen(true);
    },
    [isAuthenticated, role, fulfillIntent]
  );

  /**
   * Login handler
   */
  const login = (account) => {
    if (!account) return;

    const userRole = account.role === "ngos" || account.role === "ngo" ? "ngo" : "donor";
    const finalUser = {
      ...account,
      role: userRole,
      avatar: account.avatar || account.name?.[0]?.toUpperCase() || "U",
    };

    setUser(finalUser);
    setIsAuthModalOpen(false);

    const callbackToRun = pendingAuthCallbackRef.current;
    pendingAuthCallbackRef.current = null;

    if (typeof callbackToRun === "function") {
      setAuthIntent(null);
      setIntentPayload(null);
      callbackToRun();
      return;
    }

    const currentIntent = authIntent;
    const currentPayload = intentPayload;

    setAuthIntent(null);
    setIntentPayload(null);

    fulfillIntent(userRole, currentIntent, currentPayload);
  };

  /**
   * Real Async Login via Backend API
   */
  const loginWithCredentials = async (email, password) => {
    try {
      const data = await api.auth.login(email, password);
      login(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Real Async Register via Backend API
   */
  const registerWithCredentials = async (userData) => {
    try {
      const data = await api.auth.register(userData);
      login(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Switch role triggered by WrongRoleModal or Profile Menu
   */
  const switchRole = (targetRole) => {
    const pendingIntent = wrongRoleState.intent || authIntent;
    const pendingPayload = wrongRoleState.payload || intentPayload;

    setWrongRoleState({ isOpen: false, requiredRole: "ngo", intent: null, payload: null });
    setUser(null);
    setSelectedRole(targetRole);
    setAuthIntent(pendingIntent);
    setIntentPayload(pendingPayload);
    setIsAuthModalOpen(true);
  };

  /**
   * Logout handler
   */
  const logout = () => {
    setUser(null);
    setAuthIntent(null);
    setIntentPayload(null);
    localStorage.removeItem("annshare_token");
    setWrongRoleState({ isOpen: false, requiredRole: "ngo", intent: null, payload: null });
    navigate("/");
  };

  /**
   * Update user details
   */
  const updateUser = useCallback(async (updates) => {
    try {
      await api.auth.updateProfile(updates).catch(() => {});
    } catch {}

    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem("annshare_user", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save updated user", e);
      }
      return updated;
    });
  }, []);

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    pendingAuthCallbackRef.current = null;
  };

  const closeWrongRoleModal = () => {
    setWrongRoleState({ isOpen: false, requiredRole: "ngo", intent: null, payload: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        selectedRole,
        setSelectedRole,
        authIntent,
        intentPayload,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        wrongRoleState,
        requireAuth,
        login,
        loginWithCredentials,
        registerWithCredentials,
        logout,
        switchRole,
        updateUser,
        closeAuthModal,
        closeWrongRoleModal,
        fulfillIntent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context || defaultAuthValue;
};

export default AuthContext;
