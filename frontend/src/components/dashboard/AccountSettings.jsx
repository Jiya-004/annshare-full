import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import {
  IoPersonOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCameraOutline,
  IoTrashOutline,
  IoCheckmarkCircle,
  IoShieldCheckmark,
  IoAlertCircleOutline,
  IoNotificationsOutline,
  IoCloudUploadOutline,
  IoCheckmark,
  IoBusinessOutline,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import { isValidEmail, isValidPhone, formatPhoneNumber } from "../../utils/validation";

/* ==========================================================================
   STYLED COMPONENTS FOR ACCOUNT SETTINGS
   ========================================================================== */

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TabsHeader = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 1.5px solid rgba(23, 74, 58, 0.1);
  padding-bottom: 12px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  border: none;
  background: ${(props) => (props.$active ? "#174A3A" : "transparent")};
  color: ${(props) => (props.$active ? "#FFFFFF" : "#556B64")};
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? "700" : "600")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  .tab-icon {
    font-size: 1.1rem;
    display: flex;
    color: ${(props) => (props.$active ? "#A7F3D0" : "#71827B")};
  }

  &:hover {
    background: ${(props) => (props.$active ? "#174A3A" : "#ECEEEA")};
    color: ${(props) => (props.$active ? "#FFFFFF" : "#174A3A")};
  }
`;

const ContentCard = styled.div`
  background: #FFFFFF;
  border-radius: 22px;
  padding: 32px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.04);

  @media (max-width: 768px) {
    padding: 22px 18px;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;

  h3 {
    margin: 0 0 6px;
    font-size: 1.15rem;
    color: #174A3A;
    font-weight: 700;
    letter-spacing: -0.2px;
  }

  p {
    margin: 0;
    color: #71827B;
    font-size: 0.88rem;
  }
`;

/* Avatar Upload Zone */
const AvatarUploadBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px;
  background: #F8F5ED;
  border-radius: 18px;
  border: 1px dashed rgba(23, 74, 58, 0.2);
  margin-bottom: 28px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .avatar-preview-wrapper {
    position: relative;
    width: 90px;
    height: 90px;
    flex-shrink: 0;

    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;
      border: 2px solid #FFFFFF;
      box-shadow: 0 4px 14px rgba(23, 74, 58, 0.15);
    }

    .avatar-fallback {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background: #174A3A;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      border: 2px solid #FFFFFF;
      box-shadow: 0 4px 14px rgba(23, 74, 58, 0.15);
    }

    .camera-badge {
      position: absolute;
      bottom: -4px;
      right: -4px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #2E7D5B;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      border: 2px solid #FFFFFF;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
  }

  .avatar-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .action-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .hint-text {
      font-size: 0.78rem;
      color: #71827B;
    }
  }
`;

const UploadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #174A3A;
  color: #FFFFFF;
  padding: 9px 16px;
  border-radius: 12px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0F3327;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(23, 74, 58, 0.2);
  }
`;

const RemovePhotoBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: #DC2626;
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px solid rgba(220, 38, 38, 0.25);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`;

/* Form Styles */
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${(props) => (props.$fullWidth ? "1 / -1" : "auto")};

  label {
    font-size: 0.84rem;
    font-weight: 700;
    color: #2E3E37;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tag {
      font-size: 0.72rem;
      font-weight: 600;
      color: #2E7D5B;
      background: #E8F5E9;
      padding: 2px 8px;
      border-radius: 6px;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .field-icon {
      position: absolute;
      left: 14px;
      color: #71827B;
      font-size: 1.1rem;
      pointer-events: none;
    }

    input, textarea {
      width: 100%;
      padding: 11px 14px 11px 40px;
      border-radius: 12px;
      border: 1.5px solid rgba(23, 74, 58, 0.14);
      background: #FAFBF9;
      font-size: 0.9rem;
      color: #174A3A;
      font-family: inherit;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #2E7D5B;
        background: #FFFFFF;
        box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
      }

      &::placeholder {
        color: #9CA3AF;
      }
    }

    .eye-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: #71827B;
      cursor: pointer;
      font-size: 1.15rem;
      display: flex;
      align-items: center;
      padding: 4px;

      &:hover {
        color: #174A3A;
      }
    }
  }
`;

const PrimarySaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #174A3A;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;
  align-self: flex-start;

  &:hover {
    background: #0F3327;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(23, 74, 58, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

/* Success / Error Alerts */
const AlertBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 0.88rem;
  font-weight: 600;

  &.success {
    background: #E8F5E9;
    color: #2E7D5B;
    border: 1px solid #C8E6C9;
  }

  &.error {
    background: #FFEBEE;
    color: #C62828;
    border: 1px solid #FFCDD2;
  }
`;

/* Password Requirements Box */
const PasswordCriteriaList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 14px 0 18px;
  padding: 14px 16px;
  background: #F8F5ED;
  border-radius: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .criteria-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: ${(props) => (props.$met ? "#2E7D5B" : "#71827B")};

    &.met {
      color: #2E7D5B;
      font-weight: 600;
    }

    .status-icon {
      font-size: 0.95rem;
    }
  }
`;

/* Notification Switch Row */
const PreferenceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #ECEEEA;

  &:last-child {
    border-bottom: none;
  }

  .info {
    max-width: 80%;

    h5 {
      margin: 0 0 3px;
      font-size: 0.94rem;
      color: #174A3A;
      font-weight: 600;
    }

    p {
      margin: 0;
      font-size: 0.82rem;
      color: #71827B;
    }
  }

  /* Modern iOS-style toggle switch */
  .switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 26px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #D1D5DB;
      transition: 0.25s;
      border-radius: 34px;

      &::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.25s;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }
    }

    input:checked + .slider {
      background-color: #2E7D5B;
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }
  }
`;

/* ==========================================================================
   MAIN COMPONENT: AccountSettings
   ========================================================================== */

export default function AccountSettings({ role = "donor" }) {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "password" | "notifications"

  // Profile fields state
  const [name, setName] = useState(user?.name || (role === "ngo" ? "NGO Partner" : "Donor"));
  const [organization, setOrganization] = useState(user?.organization || "Your Organization");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+977 980-0000000");
  const [location, setLocation] = useState(user?.location || "Kathmandu, Nepal");
  const [extraDetail, setExtraDetail] = useState(
    role === "ngo" ? "NGO-KTM-2078/5541 (250 meal capacity)" : "FSSAI Food Hygiene Audit Grade A"
  );

  // Avatar states
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarPhoto || null);

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Feedback states
  const [profileAlert, setProfileAlert] = useState(null); // { type: 'success' | 'error', message: '' }
  const [passwordAlert, setPasswordAlert] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Notification toggles
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    proximityAlerts: true,
    pickupUpdates: true,
    weeklyDigest: false,
  });

  // Password validation checklist
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  /* --------------------------------------------------------------------------
     PHOTO UPLOAD HANDLERS
     -------------------------------------------------------------------------- */
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setProfileAlert({ type: "error", message: "Please select a valid image file (JPG, PNG, WEBP)." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileAlert({ type: "error", message: "Image size must be less than 5MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatarPreview(dataUrl);
      updateUser({ avatarPhoto: dataUrl });
      setProfileAlert({ type: "success", message: "Profile photo uploaded and updated!" });
      setTimeout(() => setProfileAlert(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    updateUser({ avatarPhoto: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProfileAlert({ type: "success", message: "Profile photo removed." });
    setTimeout(() => setProfileAlert(null), 3000);
  };

  /* --------------------------------------------------------------------------
     PROFILE SAVE HANDLER
     -------------------------------------------------------------------------- */
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setProfileAlert({ type: "error", message: "Full name is required." });
      return;
    }

    if (email.trim() && !isValidEmail(email.trim())) {
      setProfileAlert({ type: "error", message: "Please enter a valid email address (e.g. name@domain.com)." });
      return;
    }

    if (phone.trim() && !isValidPhone(phone.trim())) {
      setProfileAlert({ type: "error", message: "Please enter a valid phone number (e.g. +977 980-1234567 or 9841234567)." });
      return;
    }

    const formattedPhone = phone.trim() ? formatPhoneNumber(phone.trim()) : "";

    updateUser({
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      phone: formattedPhone || phone.trim(),
      location: location.trim(),
      avatar: name.trim().charAt(0).toUpperCase(),
    });

    setProfileAlert({ type: "success", message: "Account details saved successfully!" });
    setTimeout(() => setProfileAlert(null), 3500);
  };

  /* --------------------------------------------------------------------------
     PASSWORD UPDATE HANDLER
     -------------------------------------------------------------------------- */
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordAlert(null);

    if (!currentPassword) {
      setPasswordAlert({ type: "error", message: "Please enter your current password." });
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      setPasswordAlert({
        type: "error",
        message: "New password does not satisfy all safety requirements.",
      });
      return;
    }

    if (!passwordsMatch) {
      setPasswordAlert({ type: "error", message: "Passwords do not match." });
      return;
    }

    setIsUpdatingPassword(true);

    // Simulate backend password change
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setPasswordAlert({ type: "success", message: "Password updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordAlert(null), 4000);
    }, 600);
  };

  return (
    <SettingsContainer>
      {/* Subtabs Header */}
      <TabsHeader>
        <TabButton
          type="button"
          $active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          <span className="tab-icon"><IoPersonOutline /></span>
          <span>Profile & Avatar</span>
        </TabButton>

        <TabButton
          type="button"
          $active={activeTab === "password"}
          onClick={() => setActiveTab("password")}
        >
          <span className="tab-icon"><IoLockClosedOutline /></span>
          <span>Change Password</span>
        </TabButton>

        <TabButton
          type="button"
          $active={activeTab === "notifications"}
          onClick={() => setActiveTab("notifications")}
        >
          <span className="tab-icon"><IoNotificationsOutline /></span>
          <span>Preferences & Alerts</span>
        </TabButton>
      </TabsHeader>

      {/* =========================================================================
          TAB 1: PROFILE & AVATAR UPLOAD
          ========================================================================= */}
      {activeTab === "profile" && (
        <ContentCard>
          <SectionHeader>
            <h3>Profile & Organization Credentials</h3>
            <p>
              Upload your profile picture and keep your verified contact information up to date.
            </p>
          </SectionHeader>

          {profileAlert && (
            <AlertBanner className={profileAlert.type}>
              {profileAlert.type === "success" ? <IoCheckmarkCircle size={18} /> : <IoAlertCircleOutline size={18} />}
              <span>{profileAlert.message}</span>
            </AlertBanner>
          )}

          {/* Photo Upload Box */}
          <AvatarUploadBox>
            <div className="avatar-preview-wrapper">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className="avatar-img" />
              ) : (
                <div className="avatar-fallback">
                  {user?.avatar || (role === "ngo" ? "H" : "R")}
                </div>
              )}
              <div className="camera-badge" title="Change photo">
                <IoCameraOutline />
              </div>
            </div>

            <div className="avatar-actions">
              <div className="action-buttons">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                />
                <UploadBtn type="button" onClick={handlePhotoClick}>
                  <IoCloudUploadOutline size={16} />
                  <span>Upload Profile Picture</span>
                </UploadBtn>

                {avatarPreview && (
                  <RemovePhotoBtn type="button" onClick={handleRemovePhoto}>
                    <IoTrashOutline size={14} />
                    <span>Remove</span>
                  </RemovePhotoBtn>
                )}
              </div>
              <span className="hint-text">
                Recommended size: 400x400px square. Max 5MB (JPG, PNG, WEBP).
              </span>
            </div>
          </AvatarUploadBox>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column" }}>
            <FormGrid>
              <FormGroup>
                <label>
                  <span>Primary Contact Name</span>
                  <span className="tag">Required</span>
                </label>
                <div className="input-wrapper">
                  <span className="field-icon"><IoPersonOutline /></span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Shrestha"
                    required
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <label>
                  <span>{role === "ngo" ? "NGO Name" : "Kitchen / Business Name"}</span>
                </label>
                <div className="input-wrapper">
                  <span className="field-icon"><IoBusinessOutline /></span>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Himalayan Kitchen & Café"
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <label>
                  <span>Registered Email</span>
                  <span className="tag">Verified</span>
                </label>
                <div className="input-wrapper">
                  <span className="field-icon"><IoMailOutline /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    required
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <label>
                  <span>Contact Phone</span>
                </label>
                <div className="input-wrapper">
                  <span className="field-icon"><IoCallOutline /></span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^\d+ -]/g, "");
                      setPhone(cleaned);
                    }}
                    placeholder="+977 980-0000000"
                  />
                </div>
              </FormGroup>

              <FormGroup $fullWidth>
                <label>
                  <span>{role === "ngo" ? "Distribution Center Address" : "Surplus Food Pickup Location"}</span>
                </label>
                <div className="input-wrapper">
                  <span className="field-icon"><IoLocationOutline /></span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Street, City, Nepal"
                  />
                </div>
              </FormGroup>

              <FormGroup $fullWidth>
                <label>
                  <span>{role === "ngo" ? "Government Registration / Shelter Capacity" : "Food Hygiene & Compliance License"}</span>
                </label>
                <div className="input-wrapper">
                  <span className="field-icon"><IoShieldCheckmark /></span>
                  <input
                    type="text"
                    value={extraDetail}
                    onChange={(e) => setExtraDetail(e.target.value)}
                  />
                </div>
              </FormGroup>
            </FormGrid>

            <PrimarySaveBtn type="submit">
              <IoCheckmark size={18} />
              <span>Save Profile Changes</span>
            </PrimarySaveBtn>
          </form>
        </ContentCard>
      )}

      {/* =========================================================================
          TAB 2: CHANGE PASSWORD & SECURITY
          ========================================================================= */}
      {activeTab === "password" && (
        <ContentCard>
          <SectionHeader>
            <h3>Change Account Password</h3>
            <p>
              Ensure your account is protected with a strong password that you do not use anywhere else.
            </p>
          </SectionHeader>

          {passwordAlert && (
            <AlertBanner className={passwordAlert.type}>
              {passwordAlert.type === "success" ? <IoCheckmarkCircle size={18} /> : <IoAlertCircleOutline size={18} />}
              <span>{passwordAlert.message}</span>
            </AlertBanner>
          )}

          <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
            <FormGroup style={{ marginBottom: "16px" }}>
              <label>Current Password</label>
              <div className="input-wrapper">
                <span className="field-icon"><IoLockClosedOutline /></span>
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowCurrent(!showCurrent)}
                  aria-label="Toggle password visibility"
                >
                  {showCurrent ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </FormGroup>

            <FormGroup style={{ marginBottom: "16px" }}>
              <label>New Password</label>
              <div className="input-wrapper">
                <span className="field-icon"><IoLockClosedOutline /></span>
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password (min. 8 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowNew(!showNew)}
                  aria-label="Toggle password visibility"
                >
                  {showNew ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </FormGroup>

            <FormGroup style={{ marginBottom: "16px" }}>
              <label>Confirm New Password</label>
              <div className="input-wrapper">
                <span className="field-icon"><IoLockClosedOutline /></span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Toggle password visibility"
                >
                  {showConfirm ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </FormGroup>

            {/* Password Safety Indicator Checklist */}
            <PasswordCriteriaList>
              <div className={`criteria-item ${hasMinLength ? "met" : ""}`}>
                <span className="status-icon">
                  {hasMinLength ? <IoCheckmarkCircle /> : <IoAlertCircleOutline />}
                </span>
                <span>At least 8 characters</span>
              </div>

              <div className={`criteria-item ${hasUppercase ? "met" : ""}`}>
                <span className="status-icon">
                  {hasUppercase ? <IoCheckmarkCircle /> : <IoAlertCircleOutline />}
                </span>
                <span>Contains uppercase letter (A-Z)</span>
              </div>

              <div className={`criteria-item ${hasNumber ? "met" : ""}`}>
                <span className="status-icon">
                  {hasNumber ? <IoCheckmarkCircle /> : <IoAlertCircleOutline />}
                </span>
                <span>Contains at least one number</span>
              </div>

              <div className={`criteria-item ${passwordsMatch ? "met" : ""}`}>
                <span className="status-icon">
                  {passwordsMatch ? <IoCheckmarkCircle /> : <IoAlertCircleOutline />}
                </span>
                <span>Passwords match</span>
              </div>
            </PasswordCriteriaList>

            <PrimarySaveBtn type="submit" disabled={isUpdatingPassword}>
              <IoLockClosedOutline size={18} />
              <span>{isUpdatingPassword ? "Updating Password..." : "Update Password"}</span>
            </PrimarySaveBtn>
          </form>
        </ContentCard>
      )}

      {/* =========================================================================
          TAB 3: NOTIFICATIONS & PREFERENCES
          ========================================================================= */}
      {activeTab === "notifications" && (
        <ContentCard>
          <SectionHeader>
            <h3>Notification Preferences</h3>
            <p>Choose when and how ANNShare contacts you regarding food rescue operations.</p>
          </SectionHeader>

          <div>
            <PreferenceRow>
              <div className="info">
                <h5>Surplus Match & Request Notifications</h5>
                <p>Receive instant notifications when new surplus items match your criteria or requests are made.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferences.emailAlerts}
                  onChange={(e) => setPreferences({ ...preferences, emailAlerts: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </PreferenceRow>

            <PreferenceRow>
              <div className="info">
                <h5>Proximity Alerts (&lt; 5km)</h5>
                <p>Prioritize food listings and shelter requests closest to your registered address.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferences.proximityAlerts}
                  onChange={(e) => setPreferences({ ...preferences, proximityAlerts: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </PreferenceRow>

            <PreferenceRow>
              <div className="info">
                <h5>Pickup Dispatch & Route Telemetry</h5>
                <p>Get live updates when volunteer drivers or collection staff are on the way.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferences.pickupUpdates}
                  onChange={(e) => setPreferences({ ...preferences, pickupUpdates: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </PreferenceRow>

            <PreferenceRow>
              <div className="info">
                <h5>Weekly Environmental Impact Digest</h5>
                <p>Receive weekly statistics on kilograms of food rescued, CO2 avoided, and meals served.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={preferences.weeklyDigest}
                  onChange={(e) => setPreferences({ ...preferences, weeklyDigest: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </PreferenceRow>
          </div>
        </ContentCard>
      )}
    </SettingsContainer>
  );
}
