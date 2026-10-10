import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  IoClose,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
  IoLeafOutline,
  IoSparkles,
  IoCheckmarkCircle,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { usePlatform } from "../context/PlatformContext";
import { registerAccount, findAccount } from "../data/accountsStore";

/* ==========================================================================
   ANIMATIONS & STYLED COMPONENTS
   ========================================================================== */

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 61, 50, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease-out forwards;
`;

const ModalCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  width: 100%;
  max-width: 940px;
  min-height: 580px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25), 0 0 1px rgba(18, 61, 50, 0.2);
  position: relative;
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    max-width: 480px;
    min-height: auto;
    max-height: min(90vh, calc(100dvh - 32px));
    overflow-y: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(18, 61, 50, 0.06);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #123D32;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(18, 61, 50, 0.12);
    transform: rotate(90deg);
  }
`;

/* ----------------- LEFT COLUMN: INTRO & IMPACT PANEL (Using /loginfood.png) ----------------- */

const IntroPanel = styled.div`
 background: linear-gradient(rgb(13 64 53 / 36%) 0%, rgb(10 35 29 / 47%) 100%), url(/loginfood.png) center center / cover no-repeat;
  color: #FFFFFF;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  @media (max-width: 860px) {
    display: none;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .brand-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.18);
    color: #A7F3D0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 999px;
    width: fit-content;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.2;
    margin: 6px 0 0;
  }

  p.support {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.45;
    margin: 4px 0 0;
  }
`;

const PhotoPreviewBox = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  height: 150px;
  margin: 14px 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .caption-badge {
    position: absolute;
    bottom: 8px;
    left: 8px;
    right: 8px;
    background: rgba(13, 64, 53, 0.88);
    backdrop-filter: blur(6px);
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #A7F3D0;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const ImpactFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .num {
      font-size: 0.95rem;
      font-weight: 800;
      color: #A7F3D0;
    }

    .lbl {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
  }
`;

/* ----------------- RIGHT COLUMN: FORM PANEL ----------------- */

const FormPanel = styled.div`
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 500px) {
    padding: 24px 18px;
  }
`;

const MobileBrandBar = styled.div`
  display: none;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  img {
    height: 32px;
    width: auto;
    object-fit: contain;
  }

  span {
    font-size: 0.85rem;
    font-weight: 800;
    color: #123D32;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  @media (max-width: 860px) {
    display: flex;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 24px;

  @media (max-width: 500px) {
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.65rem;
    font-weight: 800;
    color: #123D32;
    margin: 0 0 6px;
    letter-spacing: -0.01em;

    @media (max-width: 500px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 0.92rem;
    color: #6B7280;
    margin: 0;
    line-height: 1.4;

    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;

const RoleSwitcher = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #F3F4F3;
  padding: 4px;
  border-radius: 14px;
  margin-bottom: 24px;
  border: 1px solid rgba(18, 61, 50, 0.08);
`;

const RolePill = styled.button`
  background: ${(props) => (props.$isActive ? "#123D32" : "transparent")};
  color: ${(props) => (props.$isActive ? "#FFFFFF" : "#4B5563")};
  font-weight: ${(props) => (props.$isActive ? "700" : "600")};
  font-size: 0.88rem;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$isActive ? "0 2px 8px rgba(18, 61, 50, 0.25)" : "none"};

  &:hover {
    color: ${(props) => (props.$isActive ? "#FFFFFF" : "#123D32")};
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.84rem;
    font-weight: 700;
    color: #374151;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 46px;
      padding: 0 14px;
      padding-right: ${(props) => (props.$hasToggle ? "42px" : "14px")};
      background: #FAFBF9;
      border: 1px solid ${(props) => (props.$hasError ? "#EF4444" : "rgba(18, 61, 50, 0.15)")};
      border-radius: 12px;
      font-size: 0.95rem;
      font-family: inherit;
      color: #123D32;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #10B981;
        background: #FFFFFF;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
      }

      &::placeholder {
        color: #9CA3AF;
      }
    }

    .eye-btn {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: #6B7280;
      font-size: 1.15rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      &:hover {
        color: #123D32;
      }
    }
  }
`;

const ErrorBanner = styled.div`
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #B91C1C;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoToast = styled.div`
  background: #ECFDF5;
  border: 1px solid #6EE7B7;
  color: #065F46;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ForgotPasswordRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -6px;

  button {
    background: transparent;
    border: none;
    font-size: 0.82rem;
    font-weight: 600;
    color: #059669;
    cursor: pointer;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  background: #123D32;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.98rem;
  border-radius: 12px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.75 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(18, 61, 50, 0.2);

  &:hover:not(:disabled) {
    background: #062B23;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(18, 61, 50, 0.3);
  }
`;

const FooterAccountRow = styled.div`
  text-align: center;
  font-size: 0.88rem;
  color: #6B7280;
  margin-top: 20px;

  button {
    background: transparent;
    border: none;
    font-weight: 700;
    color: #123D32;
    cursor: pointer;
    margin-left: 4px;

    &:hover {
      color: #059669;
      text-decoration: underline;
    }
  }
`;

/* ==========================================================================
   SIGN IN MODAL COMPONENT
   ========================================================================== */

export const SignInModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalRole,
    login,
  } = usePlatform();

  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState(authModalRole || "donors");
  const [prevAuthModalRole, setPrevAuthModalRole] = useState(authModalRole);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const identifierInputRef = useRef(null);

  if (authModalRole !== prevAuthModalRole) {
    setPrevAuthModalRole(authModalRole);
    setSelectedRole(authModalRole || "donors");
  }

  // Handle Escape key & body overflow lock
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    // Auto-focus first field
    const timeout = setTimeout(() => {
      if (identifierInputRef.current) {
        identifierInputRef.current.focus();
      }
    }, 100);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage("");
    setInfoMessage("");
  };

  const handleForgotPassword = () => {
    setInfoMessage("Password reset instructions will be sent to your registered email.");
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setInfoMessage("");

    if (isSignUp && !name.trim()) {
      setErrorMessage("Please enter your full name or organization name.");
      return;
    }

    if (!identifier.trim()) {
      setErrorMessage("Please enter your email or username.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (isSignUp) {
      try {
        const account = registerAccount({
          name,
          organization: name,
          identifier,
          password,
          role: selectedRole,
        });
        login(account);
      } catch (err) {
        setErrorMessage("An account with this email already exists.");
      }
    } else {
      const account = findAccount(identifier, password);
      if (!account) {
        setErrorMessage("Invalid email/username or password.");
        return;
      }
      login(account);
    }
  };

  const isDonor = selectedRole === "donors";

  return (
    <ModalOverlay onClick={closeAuthModal} role="dialog" aria-modal="true">
      <ModalCard onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <CloseButton onClick={closeAuthModal} aria-label="Close modal">
          <IoClose />
        </CloseButton>

        {/* 1. LEFT SIDE: INTRO & IMAGE BANNER PANEL */}
        <IntroPanel>
          

         

      
        </IntroPanel>

        {/* 2. RIGHT SIDE: FORM PANEL */}
        <FormPanel>
          <MobileBrandBar>
            <img src="/logo.png" alt="ANNShare" />
            <span>ANNShare</span>
          </MobileBrandBar>

          <FormHeader>
            <h3>
              {isSignUp
                ? isDonor
                  ? "Join as a Food Donor"
                  : "Join as a Verified NGO"
                : isDonor
                ? "Welcome back, Food Donor"
                : "Welcome back, NGO"}
            </h3>
            <p>
              {isSignUp
                ? isDonor
                  ? "Register your business to turn surplus food into social impact."
                  : "Register your organization to receive rescued food for your community."
                : isDonor
                ? "Sign in to manage your surplus food and rescue impact."
                : "Sign in to discover surplus food for your community."}
            </p>
          </FormHeader>

          {/* Role Switcher Pill */}
          <RoleSwitcher role="tablist" aria-label="Choose your role">
            <RolePill
              type="button"
              role="tab"
              aria-selected={isDonor}
              $isActive={isDonor}
              onClick={() => handleRoleChange("donors")}
            >
              <IoRestaurantOutline style={{ fontSize: "1rem" }} />
              <span>Donor</span>
            </RolePill>
            <RolePill
              type="button"
              role="tab"
              aria-selected={!isDonor}
              $isActive={!isDonor}
              onClick={() => handleRoleChange("ngos")}
            >
              <IoPeopleOutline style={{ fontSize: "1.05rem" }} />
              <span>NGO</span>
            </RolePill>
          </RoleSwitcher>

          {/* Form */}
          <LoginForm onSubmit={handleSubmit}>
            {errorMessage && (
              <ErrorBanner>
                <IoInformationCircleOutline style={{ fontSize: "1rem" }} />
                <span>{errorMessage}</span>
              </ErrorBanner>
            )}

            {infoMessage && (
              <InfoToast>
                <IoCheckmarkCircle style={{ fontSize: "1rem" }} />
                <span>{infoMessage}</span>
              </InfoToast>
            )}

            {/* Full name / Organization name (Sign Up only) */}
            {isSignUp && (
              <FormGroup $hasError={Boolean(errorMessage && !name.trim())}>
                <label htmlFor="auth-name">Full name / Organization name</label>
                <div className="input-wrapper">
                  <input
                    id="auth-name"
                    type="text"
                    placeholder={
                      isDonor
                        ? "e.g. Ramesh Shrestha or Himalayan Kitchen"
                        : "e.g. Hope Foundation Nepal"
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </FormGroup>
            )}

            {/* Email / Username */}
            <FormGroup $hasError={Boolean(errorMessage && !identifier.trim())}>
              <label htmlFor="auth-identifier">Email or username</label>
              <div className="input-wrapper">
                <input
                  id="auth-identifier"
                  ref={identifierInputRef}
                  type="text"
                  placeholder={
                    isDonor
                      ? "e.g. greenkitchen@annshare.org"
                      : "e.g. hopefoundation@annshare.org"
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </FormGroup>

            {/* Password */}
            <FormGroup
              $hasToggle
              $hasError={Boolean(errorMessage && !password.trim())}
            >
              <label htmlFor="auth-password">Password</label>
              <div className="input-wrapper">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </FormGroup>

            {/* Forgot password */}
            {!isSignUp && (
              <ForgotPasswordRow>
                <button type="button" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              </ForgotPasswordRow>
            )}

            {/* Submit Button */}
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                ? (
                  <>
                    Create Account <IoArrowForward />
                  </>
                ) : (
                  <>
                    Sign In <IoArrowForward />
                  </>
                )}
            </SubmitButton>
          </LoginForm>

          {/* Toggle between Sign In and Sign Up */}
          <FooterAccountRow>
            <span>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setName("");
                setErrorMessage("");
                setInfoMessage("");
              }}
            >
              {isSignUp ? "Sign in" : "Create account"}
            </button>
          </FooterAccountRow>
        </FormPanel>
      </ModalCard>
    </ModalOverlay>
  );
};

export default SignInModal;
