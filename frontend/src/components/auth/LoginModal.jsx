import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  IoClose,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoAlertCircleOutline,
  IoSparklesOutline,
  IoLogoGoogle,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { registerAccount, findAccount, updateAccountPassword } from "../../data/accountsStore";
import RoleSelector from "./RoleSelector";
import { isValidEmail, isValidPhone } from "../../utils/validation";
import api from "../../services/api";

/* Animations */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 54, 43, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 16px;
  animation: ${fadeIn} 0.25s ease-out forwards;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ModalCard = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(23, 74, 58, 0.08);
  border-radius: 26px;
  width: 100%;
  max-width: 470px;
  padding: 30px 32px 26px;
  box-shadow: 0 24px 64px rgba(18, 54, 43, 0.22), 0 4px 16px rgba(0, 0, 0, 0.04);
  position: relative;
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  max-height: min(90vh, calc(100dvh - 32px));
  overflow-y: auto;
  scrollbar-width: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 24px 22px 20px;
    border-radius: 22px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 20px 16px 16px;
    border-radius: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(23, 74, 58, 0.06);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #174A3A;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 5;

  @media (max-width: 768px) {
    top: 14px;
    right: 14px;
    width: 32px;
    height: 32px;
    font-size: 1.15rem;
  }

  &:hover {
    background: rgba(23, 74, 58, 0.12);
    transform: rotate(90deg);
  }
`;

const HeaderZone = styled.div`
  text-align: center;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }

  .brand-logo-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      margin-bottom: 8px;
      gap: 6px;
    }

    img {
      height: 38px;
      width: auto;
      object-fit: contain;

      @media (max-width: 768px) {
        height: 32px;
      }
    }

    .brand-name {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.25rem;
      font-weight: 800;
      color: #174A3A;
      letter-spacing: -0.01em;

      @media (max-width: 768px) {
        font-size: 1.12rem;
      }
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.7rem;
    font-weight: 800;
    color: #174A3A;
    margin: 0 0 6px;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 4px;
    }

    @media (max-width: 480px) {
      font-size: 1.22rem;
    }
  }

  p.subtitle {
    font-size: 0.94rem;
    color: #556B64;
    margin: 0;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      line-height: 1.35;
    }

    @media (max-width: 480px) {
      font-size: 0.76rem;
    }
  }
`;

const IntentNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #E8F5E9;
  border: 1px solid #C8E6C9;
  color: #2E7D32;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    padding: 7px 10px;
    font-size: 0.76rem;
    margin-bottom: 14px;
    gap: 6px;
    border-radius: 10px;
  }

  svg {
    font-size: 1.05rem;
    flex-shrink: 0;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }

  label {
    font-size: 0.84rem;
    font-weight: 700;
    color: #2E3E37;

    @media (max-width: 768px) {
      font-size: 0.78rem;
    }
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 48px;
      padding: 0 14px;
      padding-right: ${(props) => (props.$hasToggle ? "42px" : "14px")};
      background: #FAFBF9;
      border: 1.5px solid ${(props) => (props.$hasError ? "#E53935" : "rgba(23, 74, 58, 0.14)")};
      border-radius: 14px;
      font-size: 0.94rem;
      font-family: inherit;
      color: #174A3A;
      box-sizing: border-box;
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        height: 42px;
        font-size: 0.86rem;
        border-radius: 12px;
        padding: 0 12px;
        padding-right: ${(props) => (props.$hasToggle ? "38px" : "12px")};
      }

      &:focus {
        outline: none;
        background: #FFFFFF;
        border-color: #2E7D5B;
        box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.15);
      }

      &::placeholder {
        color: #9AA7A1;
      }
    }

    .eye-toggle {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: #71827B;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      @media (max-width: 768px) {
        right: 10px;
        font-size: 1.05rem;
      }

      &:hover {
        color: #174A3A;
      }
    }
  }
`;

const ErrorBanner = styled.div`
  background: #FFEBEE;
  border: 1px solid #FFCDD2;
  color: #C62828;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    font-size: 0.76rem;
    padding: 6px 10px;
    border-radius: 8px;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  height: 48px;
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 14px;
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.22);
  transition: all 0.2s ease;
  margin-top: 4px;

  @media (max-width: 768px) {
    height: 42px;
    font-size: 0.88rem;
    border-radius: 12px;
    gap: 6px;
    margin-top: 2px;
  }

  &:hover:not(:disabled) {
    background: #0F3327;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(23, 74, 58, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 0 16px;
  gap: 12px;
  color: #8C9C95;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    margin: 14px 0 12px;
    font-size: 0.72rem;
    gap: 8px;
  }

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(23, 74, 58, 0.1);
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  height: 46px;
  background: #FFFFFF;
  border: 1.5px solid rgba(23, 74, 58, 0.14);
  border-radius: 14px;
  color: #2E3E37;
  font-size: 0.92rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    height: 42px;
    font-size: 0.82rem;
    border-radius: 12px;
    gap: 8px;

    .google-icon {
      font-size: 1rem;
    }
  }

  @media (max-width: 380px) {
    font-size: 0.76rem;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    background: #FAFBF9;
    border-color: rgba(23, 74, 58, 0.28);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .google-icon {
    font-size: 1.1rem;
    color: #EA4335;
  }
`;

const ForgotPasswordRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -6px;
  margin-bottom: 4px;

  button {
    background: transparent;
    border: none;
    color: #2E7D5B;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s ease;

    &:hover {
      color: #174A3A;
      text-decoration: underline;
    }
  }
`;

const SuccessBanner = styled.div`
  background: #E8F5E9;
  border: 1px solid #C8E6C9;
  color: #2E7D32;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    font-size: 0.76rem;
    padding: 8px 10px;
    border-radius: 8px;
  }
`;

const ToggleModeRow = styled.div`
  text-align: center;
  margin-top: 18px;
  font-size: 0.88rem;
  color: #556B64;

  @media (max-width: 768px) {
    margin-top: 14px;
    font-size: 0.8rem;
  }

  button {
    background: transparent;
    border: none;
    color: #174A3A;
    font-weight: 700;
    cursor: pointer;
    margin-left: 6px;
    padding: 0;

    &:hover {
      color: #2E7D5B;
      text-decoration: underline;
    }
  }
`;

export const LoginModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    selectedRole,
    setSelectedRole,
    authIntent,
    intentPayload,
    authModalMode,
    login,
    loginWithCredentials,
    registerWithCredentials,
  } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef(null);

  // Sync role defaults when opening
  useEffect(() => {
    if (isAuthModalOpen) {
      setIsSignUp(authModalMode === "signup");
      setIsForgotPassword(false);
      if (emailInputRef.current) {
        setTimeout(() => emailInputRef.current?.focus(), 100);
      }
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isAuthModalOpen, authModalMode]);

  // Handle escape key
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAuthModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!newPassword.trim()) {
      setErrorMessage("Please enter your new password.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Try real backend reset
      await api.auth.forgotPassword({
        email: email.trim(),
        newPassword: newPassword.trim(),
        role: selectedRole,
      });

      // Also sync local storage accounts store if present
      updateAccountPassword(email.trim(), newPassword.trim());

      setSuccessMessage("Password reset successfully! You can now sign in with your new password.");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setIsForgotPassword(false);
        setPassword(newPassword.trim());
      }, 1400);
    } catch (err) {
      // 2. Fallback to local accountsStore for offline/local demo users
      const localUpdated = updateAccountPassword(email.trim(), newPassword.trim());
      if (localUpdated) {
        setSuccessMessage("Password reset successfully! You can now sign in with your new password.");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setIsForgotPassword(false);
          setPassword(newPassword.trim());
        }, 1400);
      } else {
        setErrorMessage(err.message || "Failed to reset password. Please check your email or contact support.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (isSignUp && !name.trim()) {
      setErrorMessage("Please enter your name or organization.");
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      setIsLoading(false);
      return;
    }

    if (isSignUp && !isValidEmail(email.trim())) {
      setErrorMessage("Please enter a valid email address (e.g. name@gmail.com).");
      setIsLoading(false);
      return;
    }

    if (isSignUp && !phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      setIsLoading(false);
      return;
    }

    if (isSignUp && !isValidPhone(phone.trim())) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length > 10) {
        setErrorMessage("Phone number cannot be more than 10 digits. Please enter exactly 10 digits.");
      } else if (digits.length < 10) {
        setErrorMessage("Phone number is too short. Please enter exactly 10 digits starting with 98 or 97.");
      } else {
        setErrorMessage("Please enter a valid 10-digit mobile number starting with 98 or 97.");
      }
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      setIsLoading(false);
      return;
    }

    if (isSignUp && password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      try {
        await registerWithCredentials({
          name: name.trim(),
          organization: name.trim(),
          orgName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password,
          role: selectedRole,
        });
      } catch (backendErr) {
        try {
          const account = registerAccount({
            name: name.trim(),
            organization: name.trim(),
            identifier: email.trim(),
            phone: phone.trim(),
            password: password,
            role: selectedRole,
          });
          login(account);
        } catch (localErr) {
          setErrorMessage(backendErr.message || localErr.message || "An account with this email or phone number already exists.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await loginWithCredentials(email.trim(), password);
      } catch (backendErr) {
        const account = findAccount(email.trim(), password);
        if (account) {
          login(account);
        } else {
          setErrorMessage(backendErr.message || "Invalid email/username or password.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const defaultEmail = selectedRole === "donor" ? "donor.partner@gmail.com" : "shelter.coord@gmail.com";
    const defaultName = selectedRole === "donor" ? "Green Kitchen Partner" : "Kathmandu Relief NGO";
    try {
      await loginWithCredentials(defaultEmail, "password123");
    } catch {
      try {
        await registerWithCredentials({
          name: defaultName,
          organization: defaultName,
          email: defaultEmail,
          password: "password123",
          role: selectedRole,
        });
      } catch {
        let account = findAccount(defaultEmail, "google_oauth");
        if (!account) {
          try {
            account = registerAccount({
              name: defaultName,
              organization: defaultName,
              identifier: defaultEmail,
              password: "google_oauth",
              role: selectedRole,
            });
          } catch {
            account = findAccount(defaultEmail, "google_oauth");
          }
        }
        if (account) login(account);
      }
    }
  };

  // Helper text describing active intent
  const renderIntentNotice = () => {
    if (!authIntent) return null;
    let text = "";
    if (authIntent === "donate_food") {
      text =
        selectedRole === "donor"
          ? "Signing in as Food Donor to list and share surplus food."
          : "Note: Donating surplus food requires a Food Donor account.";
    } else if (authIntent === "view_order_request" || authIntent === "order_requests") {
      text =
        selectedRole === "ngo"
          ? "Signing in as NGO Partner to view and manage food order requests."
          : "Note: Order requests are managed by verified NGO accounts.";
    } else if (authIntent === "request_food" || authIntent === "claim_food") {
      text =
        selectedRole === "ngo"
          ? intentPayload?.title
            ? `Signing in as NGO Partner to request "${intentPayload.title}".`
            : "Signing in as NGO Partner to request this surplus food batch."
          : "Note: Requesting and claiming food is reserved for verified NGOs.";
    } else if (authIntent === "contact_donor") {
      text = "Signing in to contact the food donor.";
    } else {
      text = `Signing in as ${selectedRole === "donor" ? "Food Donor" : "NGO Partner"} to continue.`;
    }

    return (
      <IntentNotice>
        <IoSparklesOutline />
        <span>{text}</span>
      </IntentNotice>
    );
  };

  return (
    <Overlay onClick={closeAuthModal} role="dialog" aria-modal="true">
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeAuthModal} aria-label="Close modal">
          <IoClose />
        </CloseButton>

        {/* Brand & Heading */}
        <HeaderZone>
          <div className="brand-logo-wrap">
            <img src="/logo-old.png" alt="ANNShare Logo" />
         
          </div>
          <h2>Welcome to ANNShare</h2>
          <p className="subtitle">Choose how you want to make an impact.</p>
        </HeaderZone>

        {/* Pill-Style Role Selector */}
        <RoleSelector
          selectedRole={selectedRole}
          onSelectRole={handleRoleSelect}
        />

        {/* Intent Tracker Notice */}
        {renderIntentNotice()}

        {/* Error & Success Messages */}
        {errorMessage && (
          <ErrorBanner style={{ marginBottom: "14px" }}>
            <IoAlertCircleOutline style={{ fontSize: "1.1rem" }} />
            <span>{errorMessage}</span>
          </ErrorBanner>
        )}

        {successMessage && (
          <SuccessBanner>
            <IoCheckmarkCircle style={{ fontSize: "1.15rem" }} />
            <span>{successMessage}</span>
          </SuccessBanner>
        )}

        {/* FORGOT PASSWORD FORM */}
        {isForgotPassword ? (
          <Form onSubmit={handleForgotPasswordSubmit}>
            <div style={{ textAlign: "center", marginBottom: "6px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#174A3A", margin: "0 0 4px" }}>
                Reset Your Password
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#66736D", margin: 0 }}>
                Enter your {selectedRole === "donor" ? "Donor" : "NGO"} registered email and create a new password.
              </p>
            </div>

            <FormGroup $hasError={Boolean(errorMessage && !email.trim())}>
              <label htmlFor="auth-email">Registered Email</label>
              <div className="input-wrap">
                <input
                  id="auth-email"
                  ref={emailInputRef}
                  type="email"
                  placeholder={
                    selectedRole === "donor"
                      ? "donor@restaurant.com"
                      : "partner@organization.org"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </FormGroup>

            <FormGroup $hasToggle $hasError={Boolean(errorMessage && !newPassword.trim())}>
              <label htmlFor="auth-new-password">New Password</label>
              <div className="input-wrap">
                <input
                  id="auth-new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </FormGroup>

            <FormGroup $hasToggle $hasError={Boolean(errorMessage && confirmPassword !== newPassword)}>
              <label htmlFor="auth-confirm-password">Confirm New Password</label>
              <div className="input-wrap">
                <input
                  id="auth-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </FormGroup>

            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? <span>Resetting Password...</span> : <span>Reset Password & Continue</span>}
            </PrimaryButton>

            <ToggleModeRow style={{ marginTop: "12px" }}>
              <span>Remembered your password?</span>
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
              >
                Back to Sign In
              </button>
            </ToggleModeRow>
          </Form>
        ) : (
          /* REGULAR LOGIN / REGISTER FORM */
          <>
            <Form onSubmit={handleSubmit}>
              {isSignUp && (
                <FormGroup>
                  <label htmlFor="auth-name">
                    {selectedRole === "donor" ? "Your Name / Kitchen Name" : "Organization / Shelter Name"}
                  </label>
                  <div className="input-wrap">
                    <input
                      id="auth-name"
                      type="text"
                      placeholder={
                        selectedRole === "donor"
                          ? "e.g. Green Leaf Café"
                          : "e.g. Hope Foundation Nepal"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </FormGroup>
              )}

              {isSignUp && (
                <FormGroup $hasError={Boolean(errorMessage && errorMessage.toLowerCase().includes("phone"))}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <label htmlFor="auth-phone" style={{ margin: 0 }}>Phone Number (Mobile)</label>
                    {phone.length > 0 && (
                      <span style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: isValidPhone(phone) ? "#185C4A" : (phone.length === 10 ? "#b94a48" : "#66736D")
                      }}>
                        {phone.length}/10 digits
                      </span>
                    )}
                  </div>
                  <div className="input-wrap">
                    <input
                      id="auth-phone"
                      type="tel"
                      maxLength={10}
                      placeholder="e.g. 98XXXXXXXX or 97XXXXXXXX"
                      value={phone}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhone(cleaned);
                        if (errorMessage && errorMessage.toLowerCase().includes("phone")) {
                          setErrorMessage("");
                        }
                      }}
                      autoComplete="tel"
                      required
                    />
                  </div>
                  {phone.length > 0 && phone.length < 10 && (
                    <div style={{ fontSize: "0.74rem", color: "#66736D", marginTop: "4px" }}>
                      Please enter 10 digits starting with 98 or 97
                    </div>
                  )}
                  {phone.length === 10 && !isValidPhone(phone) && (
                    <div style={{ fontSize: "0.74rem", color: "#b94a48", marginTop: "4px" }}>
                      Must start with 98 or 97.
                    </div>
                  )}
                  {isValidPhone(phone) && (
                    <div style={{ fontSize: "0.74rem", color: "#185C4A", marginTop: "4px", fontWeight: 500 }}>
                      ✓ Valid Nepali mobile number
                    </div>
                  )}
                </FormGroup>
              )}

              <FormGroup $hasError={Boolean(errorMessage && !email.trim())}>
                <label htmlFor="auth-email">Email</label>
                <div className="input-wrap">
                  <input
                    id="auth-email"
                    ref={emailInputRef}
                    type="email"
                    placeholder={
                      selectedRole === "donor"
                        ? "donor@restaurant.com"
                        : "partner@organization.org"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </FormGroup>

              <FormGroup
                $hasToggle
                $hasError={Boolean(errorMessage && !password.trim())}
              >
                <label htmlFor="auth-password">Password</label>
                <div className="input-wrap">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
              </FormGroup>

              {/* Forgot Password Link on Sign In Mode */}
              {!isSignUp && (
                <ForgotPasswordRow>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                  >
                    Forgot password?
                  </button>
                </ForgotPasswordRow>
              )}

              <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span>Connecting...</span>
                ) : (
                  <>
                    <span>
                      {isSignUp
                        ? `Create ${selectedRole === "donor" ? "Donor" : "NGO"} Account`
                        : "Continue"}
                    </span>
                    <IoArrowForward />
                  </>
                )}
              </PrimaryButton>
            </Form>

            {/* Google OAuth Option */}
            <Divider>or</Divider>
            <GoogleButton type="button" onClick={handleGoogleLogin} disabled={isLoading}>
              <IoLogoGoogle className="google-icon" />
              <span>Continue with Google as {selectedRole === "donor" ? "Donor" : "NGO"}</span>
            </GoogleButton>

            {/* Toggle between Sign In and Create Account */}
            <ToggleModeRow>
              <span>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setIsForgotPassword(false);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </ToggleModeRow>
          </>
        )}
      </ModalCard>
    </Overlay>
  );
};

export default LoginModal;
