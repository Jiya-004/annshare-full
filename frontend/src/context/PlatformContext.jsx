import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const auth = useAuth() || {};
  const {
    isAuthenticated = false,
    role = null,
    selectedRole = "donor",
    requireAuth = () => {},
    login: authLogin = () => {},
    logout: authLogout = () => {},
    isAuthModalOpen: isNewAuthModalOpen = false,
    closeAuthModal: closeNewAuthModal = () => {},
  } = auth;

  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const platformMode = role === "ngo" ? "ngos" : "donors";
  const authModalRole = selectedRole === "ngo" || role === "ngo" ? "ngos" : "donors";

  const setPlatformMode = (mode) => {
    // Mode switcher
  };

  const openAuthModal = (targetRole = "donors") => {
    const formatted = targetRole === "ngos" || targetRole === "ngo" ? "ngo" : "donor";
    requireAuth({ role: formatted, intent: formatted === "donor" ? "donate_food" : "view_order_request" });
  };

  const closeAuthModal = () => {
    closeNewAuthModal();
  };

  const login = (account) => {
    authLogin(account);
  };

  const logout = () => {
    authLogout();
  };

  const toggleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      openAuthModal("donors");
    }
  };

  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  const openRequestModal = (foodItem = null) => {
    setSelectedFoodItem(foodItem);
    setIsRequestModalOpen(true);
  };
  const closeRequestModal = () => {
    setSelectedFoodItem(null);
    setIsRequestModalOpen(false);
  };

  return (
    <PlatformContext.Provider
      value={{
        isAuthenticated,
        isAuthModalOpen: isNewAuthModalOpen,
        authModalRole: authModalRole || platformMode,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        toggleAuth,
        platformMode,
        setPlatformMode,
        isListModalOpen,
        openListModal,
        closeListModal,
        isRequestModalOpen,
        openRequestModal,
        closeRequestModal,
        selectedFoodItem,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
};

export default PlatformContext;
