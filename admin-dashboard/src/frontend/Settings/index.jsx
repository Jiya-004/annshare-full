import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Row, Col, Form, Button, Nav, Toast, ToastContainer, Badge, InputGroup } from 'react-bootstrap';
import {
  FiUser,
  FiSettings,
  FiLock,
  FiCheckCircle,
  FiBell,
  FiMail,
  FiPhone,
  FiShield,
  FiKey,
  FiGlobe,
  FiClock,
  FiAlertTriangle,
  FiSave,
  FiCheck,
  FiBriefcase,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { getAdminProfile, updateAdminProfile, changeAdminPassword, subscribeToAdminService } from '../../services/adminService';

// Styled Components matching ANNShare Brand System
const PageHeader = styled.div`
  margin-bottom: 24px;

  h2 {
    font-weight: 600;
    color: #12201B;
    margin: 0;
    font-size: 1.55rem;
    letter-spacing: -0.5px;
  }

  p {
    margin: 3px 0 0 0;
    color: #66736D;
    font-size: 0.86rem;
  }
`;

const MainCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
`;

const TabButton = styled(Nav.Link)`
  border-radius: 20px !important;
  font-size: 0.84rem !important;
  font-weight: 600 !important;
  padding: 8px 18px !important;
  color: ${props => (props.$active ? '#ffffff !important' : '#66736D !important')};
  background: ${props => (props.$active ? '#185C4A !important' : 'transparent !important')};
  transition: all 0.15s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;

  &:hover {
    color: ${props => (props.$active ? '#ffffff !important' : '#185C4A !important')};
    background: ${props => (props.$active ? '#185C4A !important' : '#EEF8F4 !important')};
  }
`;

const ProfileAvatarCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #EEF8F4;
  color: #185C4A;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #185C4A;
  box-shadow: 0 4px 12px rgba(24, 92, 74, 0.12);
  margin-bottom: 12px;
`;

const SectionCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 14px;
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
  margin-bottom: 20px;
`;

const StyledInputGroupText = styled(InputGroup.Text)`
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  border-right: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  color: #66736D;
`;

const StyledFormInput = styled(Form.Control)`
  border: 1px solid #E6ECE8;
  border-left: none;
  border-top-right-radius: ${props => (props.$hasRightBtn ? '0 !important' : '12px')};
  border-bottom-right-radius: ${props => (props.$hasRightBtn ? '0 !important' : '12px')};
  border-right: ${props => (props.$hasRightBtn ? 'none !important' : '1px solid #E6ECE8')};
  height: 42px;
  font-size: 0.86rem;
  background: #ffffff;
  color: #12201B;
  transition: all 0.15s ease;

  &:focus {
    background: #ffffff;
    border-color: #185C4A;
    box-shadow: 0 0 0 3px rgba(24, 92, 74, 0.08);
  }
`;

const TogglePasswordBtn = styled(Button)`
  background: #F7F8F6 !important;
  border: 1px solid #E6ECE8 !important;
  border-left: none !important;
  border-top-right-radius: 12px !important;
  border-bottom-right-radius: 12px !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  color: #66736D !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 14px !important;
  transition: all 0.15s ease !important;

  &:hover, &:focus, &:active {
    background: #EEF8F4 !important;
    border-color: #185C4A !important;
    color: #185C4A !important;
    box-shadow: none !important;
  }
`;

const SaveButton = styled(Button)`
  background: #185C4A;
  border-color: #185C4A;
  border-radius: 20px;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 0.86rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;

  &:hover, &:focus, &:active {
    background: #123F33 !important;
    border-color: #123F33 !important;
    box-shadow: 0 4px 12px rgba(24, 92, 74, 0.2);
  }
`;

const cleanInitialPhone = (rawPhone) => {
  if (!rawPhone || rawPhone === '+977 9841234567' || rawPhone === '+977 9841000001') return '';
  return rawPhone;
};

const Settings = () => {
  const [profile, setProfile] = useState(getAdminProfile());
  const [activeTab, setActiveTab] = useState('Profile');

  // Form states
  const [name, setName] = useState(profile.name || 'Admin');
  const [email, setEmail] = useState(profile.email || 'admin@annshare.org');
  const [phone, setPhone] = useState(cleanInitialPhone(profile.phone));
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Security states & Eye Toggles
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // System settings states
  const [emailAlerts, setEmailAlerts] = useState(profile.emailAlerts ?? true);
  const [autoExpireHours, setAutoExpireHours] = useState(profile.autoExpireHours ?? 6);
  const [maintenanceMode, setMaintenanceMode] = useState(profile.maintenanceMode ?? false);
  const [autoAssignNGO, setAutoAssignNGO] = useState(profile.autoAssignNGO ?? true);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      const p = getAdminProfile();
      setProfile(p);
      if (p.name) setName(p.name);
      if (p.email) setEmail(p.email);
      if (p.phone !== undefined) setPhone(cleanInitialPhone(p.phone));
    });
    return unsub;
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateAdminProfile({
        name,
        email,
        phone: phone.trim(),
        avatarText: name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A'
      });
      triggerToast('Admin profile details saved to database successfully!');
    } catch (err) {
      triggerToast(err.message || 'Failed to save profile changes to database.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      triggerToast('Please enter your current password.');
      return;
    }
    if (!newPassword) {
      triggerToast('Please enter a new password.');
      return;
    }
    if (newPassword.length < 6) {
      triggerToast('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast('New password and confirmation do not match!');
      return;
    }

    setIsSubmittingPassword(true);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      triggerToast('Admin password updated successfully in the backend!');
    } catch (err) {
      triggerToast(err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleSaveSystemSettings = (e) => {
    e.preventDefault();
    updateAdminProfile({
      emailAlerts,
      autoExpireHours,
      maintenanceMode,
      autoAssignNGO
    });
    triggerToast('Platform operations parameters updated!');
  };

  return (
    <Container fluid className="p-0">
      <PageHeader>
        <h2>Admin Profile & System Settings</h2>
        <p>Manage account security, administrative privileges, and food platform operations parameters.</p>
      </PageHeader>

      <MainCard>
        {/* Styled Pill Navigation Bar */}
        <Nav className="gap-2 mb-4 p-1 rounded" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8', width: 'fit-content' }}>
          <Nav.Item>
            <TabButton
              $active={activeTab === 'Profile'}
              onClick={() => setActiveTab('Profile')}
            >
              <FiUser size={16} /> Admin Profile
            </TabButton>
          </Nav.Item>

          <Nav.Item>
            <TabButton
              $active={activeTab === 'Security'}
              onClick={() => setActiveTab('Security')}
            >
              <FiLock size={16} /> Password & Security
            </TabButton>
          </Nav.Item>

          <Nav.Item>
            <TabButton
              $active={activeTab === 'System'}
              onClick={() => setActiveTab('System')}
            >
              <FiSettings size={16} /> System Operations
            </TabButton>
          </Nav.Item>
        </Nav>

        {/* TAB 1: ADMIN PROFILE */}
        {activeTab === 'Profile' && (
          <Row className="g-4">
            {/* Left Profile Overview Card */}
            <Col lg={4}>
              <SectionCard className="text-center">
                <div className="d-flex flex-column align-items-center">
                  <ProfileAvatarCircle>
                    {profile.avatarText || 'SJ'}
                  </ProfileAvatarCircle>
                  <h5 style={{ fontWeight: 700, color: '#12201B', margin: '4px 0 2px 0' }}>
                    {name || profile.name}
                  </h5>
                  <div style={{ fontSize: '0.82rem', color: '#66736D', marginBottom: '12px' }}>
                    {email || profile.email}
                  </div>

                  <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                    <Badge bg="success" style={{ background: '#EEF8F4', color: '#185C4A', padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                      <FiShield className="me-1" /> Super Admin
                    </Badge>
                    <Badge bg="light" style={{ background: '#F3F4F6', color: '#374151', padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                      ANNShare Ops
                    </Badge>
                  </div>

                  <div className="w-100 pt-3 border-top text-start" style={{ borderColor: '#E6ECE8', fontSize: '0.82rem' }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#66736D' }}>Admin ID:</span>
                      <strong style={{ color: '#12201B' }}>{profile.id || 'ADM-001'}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#66736D' }}>Account Status:</span>
                      <strong style={{ color: '#065F46' }}>Active & Verified</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: '#66736D' }}>Last Active:</span>
                      <strong style={{ color: '#12201B' }}>Just now</strong>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </Col>

            {/* Right Profile Edit Form */}
            <Col lg={8}>
              <SectionCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.1rem', marginBottom: '18px' }} className="d-flex align-items-center gap-2">
                  <FiUser style={{ color: '#185C4A' }} /> Personal Profile Details
                </h5>

                <Form onSubmit={handleSaveProfile}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Full Name</Form.Label>
                    <InputGroup>
                      <StyledInputGroupText><FiUser size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter full name..."
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Email Address</Form.Label>
                    <InputGroup>
                      <StyledInputGroupText><FiMail size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter admin email address..."
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B', margin: 0 }}>
                        Phone Contact
                      </Form.Label>
                      <span style={{ fontSize: '0.74rem', color: '#66736D' }}>(Optional)</span>
                    </div>
                    <InputGroup>
                      <StyledInputGroupText><FiPhone size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977 98XXXXXXXX"
                      />
                    </InputGroup>
                    <Form.Text style={{ fontSize: '0.74rem', color: '#66736D' }}>
                      Admins do not need to share personal numbers with donors or NGOs. You may leave this blank or provide an official hotline.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Assigned Organization</Form.Label>
                    <InputGroup>
                      <StyledInputGroupText><FiBriefcase size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        type="text"
                        value={profile.organization || 'ANNShare Operations Center'}
                        disabled
                        style={{ background: '#F7F8F6', color: '#66736D' }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <div className="pt-2">
                    <SaveButton type="submit" disabled={isSavingProfile}>
                      <FiSave size={16} /> {isSavingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                    </SaveButton>
                  </div>
                </Form>
              </SectionCard>
            </Col>
          </Row>
        )}

        {/* TAB 2: PASSWORD & SECURITY */}
        {activeTab === 'Security' && (
          <Row className="g-4">
            <Col lg={7}>
              <SectionCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.1rem', marginBottom: '18px' }} className="d-flex align-items-center gap-2">
                  <FiKey style={{ color: '#185C4A' }} /> Update Admin Password
                </h5>

                <Form onSubmit={handleChangePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Current Password</Form.Label>
                    <InputGroup>
                      <StyledInputGroupText><FiLock size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        $hasRightBtn
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Enter current password..."
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                      <TogglePasswordBtn
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        title={showCurrentPassword ? 'Hide password' : 'Show password'}
                      >
                        {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </TogglePasswordBtn>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>New Password</Form.Label>
                    <InputGroup>
                      <StyledInputGroupText><FiKey size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        $hasRightBtn
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password (min 6 characters)..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <TogglePasswordBtn
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        title={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </TogglePasswordBtn>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Confirm New Password</Form.Label>
                    <InputGroup>
                      <StyledInputGroupText><FiCheckCircle size={16} /></StyledInputGroupText>
                      <StyledFormInput
                        $hasRightBtn
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-type new password to confirm..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <TogglePasswordBtn
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        title={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </TogglePasswordBtn>
                    </InputGroup>
                  </Form.Group>

                  <SaveButton type="submit" disabled={isSubmittingPassword}>
                    <FiLock size={16} /> {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                  </SaveButton>
                </Form>
              </SectionCard>
            </Col>

            <Col lg={5}>
              <SectionCard style={{ background: '#F7F8F6' }}>
                <h6 style={{ fontWeight: 700, color: '#12201B', marginBottom: '12px' }} className="d-flex align-items-center gap-2">
                  <FiShield style={{ color: '#185C4A' }} /> Security Policy Summary
                </h6>
                <ul className="ps-3 mb-0" style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: '1.7' }}>
                  <li>Passwords must be at least 8 characters long.</li>
                  <li>Session expires automatically after 60 minutes of inactivity.</li>
                  <li>Two-factor authentication (2FA) is enforced for system administrators.</li>
                  <li>All administrative actions are logged in the platform audit trail.</li>
                </ul>
              </SectionCard>
            </Col>
          </Row>
        )}

        {/* TAB 3: SYSTEM OPERATIONS */}
        {activeTab === 'System' && (
          <Row className="g-4">
            <Col lg={8}>
              <SectionCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.1rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                  <FiGlobe style={{ color: '#185C4A' }} /> Platform Operational Parameters
                </h5>

                <Form onSubmit={handleSaveSystemSettings}>
                  <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                    <Form.Group className="mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.9rem' }} className="d-flex align-items-center gap-2">
                            <FiBell style={{ color: '#185C4A' }} /> Urgent Listing Notifications
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#66736D', marginTop: '2px' }}>
                            Send real-time alerts to network NGOs for surplus donations expiring in under 3 hours.
                          </div>
                        </div>
                        <Form.Check
                          type="switch"
                          id="email-alerts-switch"
                          checked={emailAlerts}
                          onChange={(e) => setEmailAlerts(e.target.checked)}
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                    <Form.Group className="mb-0">
                      <Form.Label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#12201B' }} className="d-flex align-items-center gap-2">
                        <FiClock style={{ color: '#185C4A' }} /> Unclaimed Food Auto-Expiry Window
                      </Form.Label>
                      <div style={{ fontSize: '0.78rem', color: '#66736D', marginBottom: '10px' }}>
                        Set automatic expiration timeframe for unclaimed surplus food items.
                      </div>
                      <Form.Select
                        value={autoExpireHours}
                        onChange={(e) => setAutoExpireHours(Number(e.target.value))}
                        style={{ borderRadius: '12px', height: '40px', fontSize: '0.86rem', maxWidth: '240px', background: '#ffffff', borderColor: '#E6ECE8' }}
                      >
                        <option value={2}>2 Hours (Fast perishable)</option>
                        <option value={4}>4 Hours (Standard meals)</option>
                        <option value={6}>6 Hours (Default)</option>
                        <option value={12}>12 Hours (Extended bakery & grains)</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                    <Form.Group className="mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.9rem' }} className="d-flex align-items-center gap-2">
                            <FiCheckCircle style={{ color: '#185C4A' }} /> Automatic NGO Matchmaking
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#66736D', marginTop: '2px' }}>
                            Automatically match surplus food listings to nearby verified shelters based on district distance.
                          </div>
                        </div>
                        <Form.Check
                          type="switch"
                          id="auto-assign-switch"
                          checked={autoAssignNGO}
                          onChange={(e) => setAutoAssignNGO(e.target.checked)}
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  {/* Maintenance Mode Warning Block */}
                  <div className="p-3 rounded mb-4" style={{ background: maintenanceMode ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${maintenanceMode ? '#FCA5A5' : '#FDE68A'}` }}>
                    <Form.Group className="mb-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div style={{ fontWeight: 700, color: maintenanceMode ? '#991B1B' : '#92400E', fontSize: '0.9rem' }} className="d-flex align-items-center gap-2">
                            <FiAlertTriangle size={18} /> Platform Maintenance Mode
                          </div>
                          <div style={{ fontSize: '0.78rem', color: maintenanceMode ? '#7F1D1D' : '#78350F', marginTop: '2px' }}>
                            Restrict new food postings during system updates. Active donations remain claimable.
                          </div>
                        </div>
                        <Form.Check
                          type="switch"
                          id="maintenance-switch"
                          checked={maintenanceMode}
                          onChange={(e) => setMaintenanceMode(e.target.checked)}
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <SaveButton type="submit">
                    <FiSave size={16} /> Save System Parameters
                  </SaveButton>
                </Form>
              </SectionCard>
            </Col>
          </Row>
        )}
      </MainCard>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="light">
          <Toast.Header>
            <FiCheckCircle className="me-2 text-success" />
            <strong className="me-auto" style={{ color: '#12201B' }}>ANNShare Settings</strong>
          </Toast.Header>
          <Toast.Body style={{ fontSize: '0.84rem', color: '#374151' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Settings;
