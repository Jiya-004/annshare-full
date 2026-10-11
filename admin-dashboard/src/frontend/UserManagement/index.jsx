import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Nav, Dropdown, Row, Col, ListGroup, Toast, ToastContainer, Modal } from 'react-bootstrap';
import {
  FiUsers,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiCheckCircle,
  FiSlash,
  FiTrash2,
  FiUserCheck,
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiFileText,
  FiXCircle,
  FiDownload,
  FiAlertTriangle,
  FiUserPlus
} from 'react-icons/fi';

import StatusBadge from '../../components/StatusBadge';
import ConfirmModal from '../../components/modals/ConfirmModal';

import {
  getUsers,
  updateUserStatus,
  deleteUser,
  createUser,
  subscribeToAdminService
} from '../../services/adminService';

// Styled Components for Clean Visual Hierarchy
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
  font-size: 0.82rem !important;
  font-weight: 600 !important;
  padding: 6px 16px !important;
  white-space: nowrap !important;
  color: ${props => (props.$active ? '#ffffff !important' : '#66736D !important')};
  background: ${props => (props.$active ? '#185C4A !important' : 'transparent !important')};
  transition: all 0.15s ease !important;

  &:hover {
    color: ${props => (props.$active ? '#ffffff !important' : '#185C4A !important')};
    background: ${props => (props.$active ? '#185C4A !important' : '#EEF8F4 !important')};
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 260px;

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #66736D;
    font-size: 0.92rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledFormInput = styled(Form.Control)`
  padding-left: 38px;
  border-radius: 20px;
  height: 38px;
  font-size: 0.82rem;
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  color: #12201B;
  transition: all 0.15s ease;

  &:focus {
    background: #ffffff;
    border-color: #185C4A;
    box-shadow: 0 0 0 3px rgba(24, 92, 74, 0.08);
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #EEF8F4;
  color: #185C4A;
  font-size: 0.78rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #DFF1E9;
`;

const ActionIconButton = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  color: #66736D;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &::after {
    display: none !important;
  }

  &:hover {
    background: #EEF8F4;
    color: #185C4A;
  }
`;

// Upgraded Modern & Sleek Dropdown Styling
const StyledDropdownMenu = styled(Dropdown.Menu)`
  font-size: 0.84rem !important;
  border-radius: 14px !important;
  border: 1px solid rgba(23, 63, 53, 0.12) !important;
  box-shadow: 0 10px 30px rgba(23, 63, 53, 0.12) !important;
  padding: 8px !important;
  min-width: 210px !important;
  background: #ffffff !important;
  z-index: 1050 !important;

  .dropdown-divider {
    margin: 6px 0 !important;
    border-color: rgba(23, 63, 53, 0.08) !important;
  }
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  display: flex !important;
  align-items: center !important;
  padding: 9px 12px !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 0.84rem !important;
  color: ${props =>
    props.$variant === 'danger'
      ? '#991B1B'
      : props.$variant === 'warning'
      ? '#92400E'
      : '#12201B'} !important;
  transition: all 0.15s ease !important;
  margin-bottom: 2px !important;

  &:hover {
    background: ${props =>
      props.$variant === 'danger'
        ? '#FFF4F3'
        : props.$variant === 'warning'
        ? '#FFF9ED'
        : '#EEF5F2'} !important;
    color: ${props =>
      props.$variant === 'danger'
        ? '#7F1D1D'
        : props.$variant === 'warning'
        ? '#78350F'
        : '#173F35'} !important;
  }

  .item-icon {
    font-size: 1rem;
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

const StyledTable = styled(Table)`
  font-size: 0.85rem;

  thead th {
    font-size: 0.72rem;
    font-weight: 700;
    color: #66736D;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: transparent;
    border-bottom: 1px solid #E6ECE8;
    padding: 12px 16px;
  }

  tbody tr {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: #F7F8F6;
    }

    td {
      padding: 14px 16px;
      border-bottom: 1px solid #E6ECE8;
      vertical-align: middle;
    }
  }
`;

const UserManagement = () => {
  const [users, setUsers] = useState(getUsers());
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Page Navigation States (NO MODALS for viewing/auditing)
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewingProfileUser, setViewingProfileUser] = useState(null);
  const [auditingUser, setAuditingUser] = useState(null);
  const [auditNotes, setAuditNotes] = useState('');

  // Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Confirm Action Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({ title: '', message: '', action: null });

  // Create User Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);
  const [createError, setCreateError] = useState('');
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Donor',
    password: '',
    organization: '',
    location: ''
  });

  const handleOpenCreateModal = () => {
    setNewUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'Donor',
      password: '',
      organization: '',
      location: ''
    });
    setCreateError('');
    setShowCreateModal(true);
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    setCreateError('');

    const trimmedName = newUserForm.name.trim();
    const trimmedEmail = newUserForm.email.trim();
    const trimmedPhone = newUserForm.phone.trim();
    const trimmedPass = newUserForm.password.trim();

    if (!trimmedName) {
      setCreateError('Name is required');
      return;
    }
    if (!trimmedEmail) {
      setCreateError('Email is required');
      return;
    }
    if (!trimmedPhone) {
      setCreateError('Phone number is required');
      return;
    }

    const cleanPhone = trimmedPhone.replace(/[\s-]/g, '').replace(/^\+977/, '');
    if (!/^(98|97)\d{8}$/.test(cleanPhone)) {
      setCreateError('Please enter a valid 10-digit mobile number starting with 98 or 97.');
      return;
    }

    if (users.some(u => {
      const uPhone = (u.phone || '').replace(/[\s-]/g, '').replace(/^\+977/, '');
      return uPhone === cleanPhone;
    })) {
      setCreateError('A user with this phone number already exists.');
      return;
    }

    if (!trimmedPass || trimmedPass.length < 6) {
      setCreateError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsSubmittingUser(true);
      await createUser({
        name: trimmedName,
        email: trimmedEmail,
        phone: cleanPhone,
        password: trimmedPass,
        role: newUserForm.role,
        organization: newUserForm.organization.trim(),
        location: newUserForm.location.trim()
      });
      setShowCreateModal(false);
      setToastMessage(`User ${trimmedName} created successfully!`);
      setShowToast(true);
    } catch (err) {
      setCreateError(err.message || 'Failed to create user');
    } finally {
      setIsSubmittingUser(false);
    }
  };

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      setUsers(getUsers());
    });
    return unsub;
  }, []);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const isDonor = (u) => u.role?.toLowerCase() === 'donor';
  const isNGO = (u) => ['ngo', 'receiver'].some(r => u.role?.toLowerCase().includes(r));
  const isPending = (u) => u.verificationStatus?.toLowerCase().includes('pending');
  const isSuspended = (u) => u.status?.toLowerCase() === 'suspended';

  const getRoleBadgeStyle = (role = '') => {
    const lower = role.toLowerCase();
    if (lower === 'donor') {
      return {
        bg: '#EEF5F2',
        color: '#173F35',
        border: '1px solid rgba(23, 63, 53, 0.2)',
        label: 'Donor'
      };
    }
    if (lower === 'ngo' || lower.includes('receiver')) {
      return {
        bg: '#FDF2EE',
        color: '#B9684D',
        border: '1px solid rgba(185, 104, 77, 0.25)',
        label: 'NGO / Receiver'
      };
    }
    return {
      bg: '#F7F8F6',
      color: '#12201B',
      border: '1px solid #E6ECE8',
      label: role
    };
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'All') return true;
    if (activeTab === 'Donors') return isDonor(user);
    if (activeTab === 'Receivers') return isNGO(user);
    if (activeTab === 'Pending') return isPending(user);
    if (activeTab === 'Suspended') return isSuspended(user);
    return true;
  });

  // Open Standalone Profile Page View
  const handleOpenProfilePage = (user) => {
    setAuditingUser(null);
    setViewingProfileUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Standalone Audit Verification Page View (NO MODAL)
  const handleOpenAuditPage = (user) => {
    setViewingProfileUser(null);
    setAuditingUser(user);
    setAuditNotes('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuditApprove = (user) => {
    updateUserStatus(user.id, 'Active', 'verified');
    setToastMessage(`Verification APPROVED for ${user.name}! Account verified.`);
    setShowToast(true);
    setAuditingUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuditReject = (user) => {
    updateUserStatus(user.id, 'Active', 'rejected');
    setToastMessage(`Verification REJECTED for ${user.name}. Status updated.`);
    setShowToast(true);
    setAuditingUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const promptAction = (type, user) => {
    setSelectedUser(user);
    if (type === 'suspend') {
      setConfirmConfig({
        title: 'Confirm User Suspension',
        message: `Are you sure you want to suspend ${user.name}? They will lose access to surplus food listings.`,
        action: () => updateUserStatus(user.id, 'Suspended', null),
        variant: 'danger',
        text: 'Suspend User'
      });
    } else if (type === 'activate') {
      setConfirmConfig({
        title: 'Confirm Account Activation',
        message: `Activate account for ${user.name}?`,
        action: () => updateUserStatus(user.id, 'Active', null),
        variant: 'success',
        text: 'Activate User'
      });
    } else if (type === 'delete') {
      setConfirmConfig({
        title: 'Confirm User Deletion',
        message: `Are you sure you want to permanently delete user ${user.name}? This action cannot be undone.`,
        action: () => {
          deleteUser(user.id);
          if (viewingProfileUser?.id === user.id) setViewingProfileUser(null);
          if (auditingUser?.id === user.id) setAuditingUser(null);
        },
        variant: 'danger',
        text: 'Delete User'
      });
    }
    setShowConfirmModal(true);
  };

  // -------------------------------------------------------------
  // 1. STANDALONE AUDIT VERIFICATION PAGE VIEW (NO MODAL)
  // -------------------------------------------------------------
  if (auditingUser) {
    const user = users.find(u => u.id === auditingUser.id) || auditingUser;
    const roleStyle = getRoleBadgeStyle(user.role);

    return (
      <Container fluid className="p-0">
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
          <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide bg="success">
            <Toast.Body className="text-white d-flex align-items-center gap-2">
              <FiCheckCircle size={18} />
              {toastMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>

        {/* Back Button & Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setAuditingUser(null)}
              style={{
                borderRadius: '20px',
                padding: '6px 16px',
                fontWeight: 600,
                fontSize: '0.84rem',
                borderColor: '#E6ECE8',
                color: '#12201B'
              }}
            >
              <FiArrowLeft className="me-1" /> Back to Users List
            </Button>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
                Audit Verification Documents
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#66736D', marginTop: '2px' }}>
                Review legal registration & food safety compliance files for <strong>{user.name}</strong> (<span style={{ fontFamily: 'monospace' }}>#{user.id}</span>)
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => handleAuditApprove(user)}
              style={{ background: '#185C4A', borderColor: '#185C4A', borderRadius: '20px', fontWeight: 600, padding: '7px 20px', fontSize: '0.84rem' }}
            >
              <FiCheckCircle className="me-1" /> Approve Verification
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => handleAuditReject(user)}
              style={{ borderRadius: '20px', fontWeight: 600, padding: '7px 20px', fontSize: '0.84rem' }}
            >
              <FiXCircle className="me-1" /> Reject Application
            </Button>
          </div>
        </div>

        {/* Audit Page Grid Layout */}
        <Row className="g-4">
          {/* Left Column: NGO Profile & Contacts */}
          <Col lg={4}>
            <Card style={{ border: '1px solid #E6ECE8', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
              <div className="text-center mb-4">
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #B9684D 0%, #8C4731 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  boxShadow: '0 4px 12px rgba(185, 104, 77, 0.25)'
                }}>
                  {user.avatarText || 'NG'}
                </div>
                <h4 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.2rem' }}>{user.name}</h4>
                <div style={{ marginTop: '6px' }}>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: roleStyle.bg,
                    color: roleStyle.color,
                    border: roleStyle.border
                  }}>
                    {roleStyle.label}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded mb-3" style={{ background: '#FFF9ED', border: '1px solid #FDE68A' }}>
                <div style={{ fontSize: '0.76rem', color: '#92400E', fontWeight: 600, marginBottom: '2px' }}>Current Audit Status</div>
                <StatusBadge status={user.verificationStatus} />
              </div>

              <hr style={{ borderColor: '#E6ECE8' }} />

              <h6 style={{ fontWeight: 700, color: '#12201B', marginBottom: '14px', fontSize: '0.88rem' }}>Organization Contacts</h6>
              <div className="d-flex flex-column gap-3" style={{ fontSize: '0.86rem', color: '#374151' }}>
                <div className="d-flex align-items-center gap-2">
                  <FiMail style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>Official Email</div>
                    <strong>{user.email}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <FiPhone style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>Kathmandu Hotline (Nepal)</div>
                    <strong>{user.phone}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <FiMapPin style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>District / Area</div>
                    <strong>{user.location}</strong>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Column: Uploaded Documents Inspection Panel */}
          <Col lg={8}>
            <div className="d-flex flex-column gap-4">
              <Card style={{ border: '1px solid #E6ECE8', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.08rem', fontFamily: 'Poppins, sans-serif' }} className="d-flex align-items-center gap-2">
                    <FiShield style={{ color: '#185C4A' }} /> Uploaded Verification Documents
                  </h5>
                  <span style={{ fontSize: '0.78rem', color: '#66736D' }}>{user.docs ? user.docs.length : 0} Files Submitted</span>
                </div>

                {user.docs && user.docs.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {user.docs.map((doc, idx) => (
                      <Card key={idx} style={{ border: '1px solid #E6ECE8', borderRadius: '14px', padding: '20px', background: '#ffffff', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)' }}>
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EEF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#185C4A', flexShrink: 0 }}>
                              <FiFileText size={22} />
                            </div>
                            <div>
                              <strong style={{ fontSize: '0.94rem', color: '#12201B', display: 'block', marginBottom: '2px' }}>{doc.name}</strong>
                              <div style={{ fontSize: '0.78rem', color: '#66736D' }}>Category: {doc.type} • PDF Document</div>
                            </div>
                          </div>
                          <StatusBadge status={doc.status} />
                        </div>

                        <div
                          style={{
                            background: '#EEF8F4',
                            border: '1px solid #A7F3D0',
                            borderRadius: '10px',
                            padding: '10px 14px',
                            fontSize: '0.82rem',
                            color: '#065F46',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <FiCheckCircle size={16} style={{ color: '#059669', flexShrink: 0 }} />
                          <span>Legal verification verified by Government Audit Portal (Nepal). Expiry: 2026-12-31.</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded text-center text-muted" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                    <FiAlertTriangle size={24} className="mb-2 text-warning" />
                    <div>No compliance documents submitted for this partner yet.</div>
                  </div>
                )}
              </Card>

              {/* Auditor Notes & Final Sign-Off */}
              <Card style={{ border: '1px solid #E6ECE8', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
                <h5 style={{ fontWeight: 700, color: '#12201B', marginBottom: '14px', fontSize: '1.05rem', fontFamily: 'Poppins, sans-serif' }}>
                  Auditor Inspection Sign-Off Notes
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Inspection Remarks (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter compliance verification comments or safety audit notes..."
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    style={{ fontSize: '0.86rem', borderRadius: '10px' }}
                  />
                </Form.Group>

                <div className="d-flex align-items-center justify-content-end gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleAuditReject(user)}
                    style={{ borderRadius: '20px', fontWeight: 600, padding: '8px 22px', fontSize: '0.84rem' }}
                  >
                    <FiXCircle className="me-1" /> Reject Application
                  </Button>

                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAuditApprove(user)}
                    style={{ background: '#185C4A', borderColor: '#185C4A', borderRadius: '20px', fontWeight: 600, padding: '8px 24px', fontSize: '0.84rem' }}
                  >
                    <FiCheckCircle className="me-1" /> Approve & Verify Partner
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // 2. STANDALONE USER PROFILE PAGE VIEW
  // -------------------------------------------------------------
  if (viewingProfileUser) {
    const user = users.find(u => u.id === viewingProfileUser.id) || viewingProfileUser;
    const isDonorRole = isDonor(user);
    const roleStyle = getRoleBadgeStyle(user.role);

    return (
      <Container fluid className="p-0">
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
          <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide bg="success">
            <Toast.Body className="text-white d-flex align-items-center gap-2">
              <FiCheckCircle size={18} />
              {toastMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>

        {/* Header with Back Button */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setViewingProfileUser(null)}
              style={{
                borderRadius: '20px',
                padding: '6px 16px',
                fontWeight: 600,
                fontSize: '0.84rem',
                borderColor: '#E6ECE8',
                color: '#12201B'
              }}
            >
              <FiArrowLeft className="me-1" /> Back to Users List
            </Button>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
                {user.name}
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#66736D', marginTop: '2px' }}>
                User Profile & Operational Audit Records • <span style={{ fontFamily: 'monospace' }}>#{user.id}</span>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {isNGO(user) && (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => handleOpenAuditPage(user)}
                style={{ borderRadius: '20px', fontWeight: 600, padding: '6px 16px', fontSize: '0.82rem' }}
              >
                <FiUserCheck className="me-1" /> Audit Docs
              </Button>
            )}

            {user.status === 'Active' ? (
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => promptAction('suspend', user)}
                style={{ borderRadius: '20px', fontWeight: 600, padding: '6px 16px', fontSize: '0.82rem' }}
              >
                <FiSlash className="me-1" /> Suspend
              </Button>
            ) : (
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => promptAction('activate', user)}
                style={{ borderRadius: '20px', fontWeight: 600, padding: '6px 16px', fontSize: '0.82rem' }}
              >
                <FiCheckCircle className="me-1" /> Activate
              </Button>
            )}

            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => promptAction('delete', user)}
              style={{ borderRadius: '20px', fontWeight: 600, padding: '6px 16px', fontSize: '0.82rem' }}
            >
              <FiTrash2 className="me-1" /> Delete
            </Button>
          </div>
        </div>

        {/* Profile Details Layout */}
        <Row className="g-4">
          <Col lg={4}>
            <Card style={{ border: '1px solid #E6ECE8', borderRadius: '16px', background: '#ffffff', padding: '24px', height: '100%' }}>
              <div className="text-center mb-4">
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #173F35 0%, #28624D 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  boxShadow: '0 4px 12px rgba(23, 63, 53, 0.2)'
                }}>
                  {user.avatarText || 'US'}
                </div>
                <h4 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.2rem' }}>{user.name}</h4>
                <div style={{ marginTop: '6px' }}>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: roleStyle.bg,
                    color: roleStyle.color,
                    border: roleStyle.border
                  }}>
                    {roleStyle.label}
                  </span>
                </div>
              </div>

              <hr style={{ borderColor: '#E6ECE8' }} />

              <h6 style={{ fontWeight: 700, color: '#12201B', marginBottom: '14px', fontSize: '0.9rem' }}>Contact Details</h6>
              <div className="d-flex flex-column gap-3" style={{ fontSize: '0.86rem', color: '#374151' }}>
                <div className="d-flex align-items-center gap-2">
                  <FiMail style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>Email Address</div>
                    <strong>{user.email}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <FiPhone style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>Phone Number (Nepal)</div>
                    <strong>{(user.phone && user.phone !== '+977 9841234567') ? user.phone : 'Not provided'}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <FiMapPin style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>District / Location</div>
                    <strong>{user.location}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <FiCalendar style={{ color: '#185C4A', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: '#66736D' }}>Joined Platform</div>
                    <strong>{user.joinedDate}</strong>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          <Col lg={8}>
            <div className="d-flex flex-column gap-4">
              <Card style={{ border: '1px solid #E6ECE8', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
                <h5 style={{ fontWeight: 700, color: '#12201B', marginBottom: '16px', fontSize: '1.05rem', fontFamily: 'Poppins, sans-serif' }}>
                  Account Verification & Compliance
                </h5>
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                      <div style={{ fontSize: '0.78rem', color: '#66736D', marginBottom: '4px' }}>Account Status</div>
                      <StatusBadge status={user.status} />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                      <div style={{ fontSize: '0.78rem', color: '#66736D', marginBottom: '4px' }}>Verification Status</div>
                      <StatusBadge status={user.verificationStatus} />
                    </div>
                  </Col>
                </Row>

                {user.docs && user.docs.length > 0 ? (
                  <div>
                    <h6 style={{ fontWeight: 700, color: '#12201B', fontSize: '0.88rem' }} className="d-flex align-items-center gap-2 mb-2">
                      <FiShield style={{ color: '#185C4A' }} /> Submitted Compliance Documents ({user.docs.length})
                    </h6>
                    <ListGroup variant="flush" style={{ borderRadius: '10px', border: '1px solid #E6ECE8' }}>
                      {user.docs.map((doc, idx) => (
                        <ListGroup.Item key={idx} className="d-flex align-items-center justify-content-between py-2.5 px-3" style={{ fontSize: '0.85rem' }}>
                          <div className="d-flex align-items-center gap-2">
                            <FiFileText style={{ color: '#66736D' }} />
                            <span>{doc.name}</span>
                            <span style={{ fontSize: '0.74rem', color: '#66736D' }}>({doc.type})</span>
                          </div>
                          <StatusBadge status={doc.status} />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                ) : (
                  <div className="p-3 rounded text-muted text-center" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8', fontSize: '0.84rem' }}>
                    No submitted verification documents on file for this account.
                  </div>
                )}
              </Card>

              <Card style={{ border: '1px solid #E6ECE8', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
                <h5 style={{ fontWeight: 700, color: '#12201B', marginBottom: '16px', fontSize: '1.05rem', fontFamily: 'Poppins, sans-serif' }}>
                  Platform Surplus Activity Metrics
                </h5>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ background: '#EEF5F2', border: '1px solid #DFF1E9' }}>
                      <div style={{ fontSize: '0.78rem', color: '#185C4A', fontWeight: 600 }}>
                        {isDonorRole ? 'Total Surplus Listings Posted' : 'Total Food Requests Claimed'}
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#173F35', marginTop: '4px' }}>
                        {isDonorRole ? (user.totalDonations ?? 48) : (user.totalRequests ?? 32)}
                      </div>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="p-3 rounded" style={{ background: '#FDF2EE', border: '1px solid rgba(185, 104, 77, 0.2)' }}>
                      <div style={{ fontSize: '0.78rem', color: '#B9684D', fontWeight: 600 }}>
                        Completed Successful Pickups
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#B9684D', marginTop: '4px' }}>
                        {isDonorRole ? (user.completedDonations ?? 45) : (user.completedPickups ?? 28)}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // 3. MAIN USER MANAGEMENT TABLE VIEW
  // -------------------------------------------------------------
  return (
    <Container fluid className="p-0">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide bg="success">
          <Toast.Body className="text-white d-flex align-items-center gap-2">
            <FiCheckCircle size={18} />
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <PageHeader className="mb-0">
          <h2>User & Partner Management</h2>
          <p>Manage Donors, NGOs, and Verification Pipelines.</p>
        </PageHeader>
        <Button
          onClick={handleOpenCreateModal}
          style={{
            backgroundColor: '#173F35',
            borderColor: '#173F35',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '10px',
            fontWeight: '600',
            padding: '10px 18px',
            boxShadow: '0 2px 8px rgba(23,63,53,0.2)'
          }}
        >
          <FiUserPlus size={18} /> Add New User
        </Button>
      </div>

      {/* Main Table Card */}
      <MainCard>
        {/* Navigation Tabs & Search Control */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <Nav variant="pills" activeKey={activeTab} onSelect={handleTabSelect} className="gap-1">
            <Nav.Item>
              <TabButton eventKey="All" $active={activeTab === 'All'}>
                All Users ({users.length})
              </TabButton>
            </Nav.Item>
            <Nav.Item>
              <TabButton eventKey="Donors" $active={activeTab === 'Donors'}>
                Donors ({users.filter(isDonor).length})
              </TabButton>
            </Nav.Item>
            <Nav.Item>
              <TabButton eventKey="Receivers" $active={activeTab === 'Receivers'}>
                Receivers / NGOs ({users.filter(isNGO).length})
              </TabButton>
            </Nav.Item>
            <Nav.Item>
              <TabButton eventKey="Pending" $active={activeTab === 'Pending'}>
                Pending Verification ({users.filter(isPending).length})
              </TabButton>
            </Nav.Item>
            <Nav.Item>
              <TabButton eventKey="Suspended" $active={activeTab === 'Suspended'}>
                Suspended ({users.filter(isSuspended).length})
              </TabButton>
            </Nav.Item>
          </Nav>

          {/* Search Control */}
          <SearchInputWrapper>
            <FiSearch className="search-icon" />
            <StyledFormInput
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInputWrapper>
        </div>

        {/* User Table */}
        <div className="table-responsive">
          <StyledTable align="middle" className="mb-0">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Contact Info</th>
                <th>Location</th>
                <th>Verification</th>
                <th>Account Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <UserAvatar>
                          {user.avatarText || 'US'}
                        </UserAvatar>
                        <div>
                          <strong style={{ color: '#12201B', fontSize: '0.88rem' }}>{user.name}</strong>
                          <div style={{ fontSize: '0.74rem', color: '#66736D', marginTop: '1px' }}>Joined {user.joinedDate}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {(() => {
                        const roleStyle = getRoleBadgeStyle(user.role);
                        return (
                          <span style={{
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            background: roleStyle.bg,
                            color: roleStyle.color,
                            border: roleStyle.border
                          }}>
                            {roleStyle.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td>
                      <div style={{ color: '#12201B', fontWeight: 500 }}>{user.email}</div>
                      {user.phone && (
                        <div style={{ fontSize: '0.76rem', color: '#66736D', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <FiPhone size={12} style={{ color: '#185C4A', flexShrink: 0 }} />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </td>
                    <td style={{ color: '#66736D' }}>{user.location}</td>
                    <td>
                      <StatusBadge status={user.verificationStatus} />
                    </td>
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="text-end">
                      <Dropdown align="end">
                        <Dropdown.Toggle as={ActionIconButton} id={`action-drop-${user.id}`}>
                          <FiMoreVertical size={16} />
                        </Dropdown.Toggle>
                        <StyledDropdownMenu>
                          <StyledDropdownItem onClick={() => handleOpenProfilePage(user)}>
                            <FiEye className="item-icon" style={{ color: '#185C4A' }} /> View Profile Details
                          </StyledDropdownItem>

                          {isNGO(user) && (
                            <StyledDropdownItem onClick={() => handleOpenAuditPage(user)}>
                              <FiUserCheck className="item-icon" style={{ color: '#185C4A' }} /> Audit Verification Docs
                            </StyledDropdownItem>
                          )}

                          {user.status === 'Active' ? (
                            <StyledDropdownItem onClick={() => promptAction('suspend', user)} $variant="warning">
                              <FiSlash className="item-icon" /> Suspend Account
                            </StyledDropdownItem>
                          ) : (
                            <StyledDropdownItem onClick={() => promptAction('activate', user)}>
                              <FiCheckCircle className="item-icon" style={{ color: '#185C4A' }} /> Activate Account
                            </StyledDropdownItem>
                          )}

                          <Dropdown.Divider />
                          <StyledDropdownItem onClick={() => promptAction('delete', user)} $variant="danger">
                            <FiTrash2 className="item-icon" /> Delete Account
                          </StyledDropdownItem>
                        </StyledDropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No user records found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </div>
      </MainCard>

      {/* Add New User Modal */}
      <Modal show={showCreateModal} onHide={() => !isSubmittingUser && setShowCreateModal(false)} centered>
        <Modal.Header closeButton={!isSubmittingUser} style={{ borderBottom: '1px solid #E6ECE8', background: '#F7F8F6' }}>
          <Modal.Title style={{ fontSize: '1.15rem', fontWeight: 600, color: '#12201B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiUserPlus style={{ color: '#173F35' }} /> Add New User
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateUserSubmit}>
          <Modal.Body style={{ padding: '24px' }}>
            {createError && (
              <div className="alert alert-danger py-2 px-3 mb-3" style={{ fontSize: '0.85rem' }}>
                <FiAlertTriangle className="me-2" />
                {createError}
              </div>
            )}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Full Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Ramesh Shrestha"
                value={newUserForm.name}
                onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@example.com"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>
                Phone Number (Nepal Mobile) *
              </Form.Label>
              <Form.Control
                type="tel"
                maxLength={10}
                placeholder="98XXXXXXXX or 97XXXXXXXX"
                value={newUserForm.phone}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setNewUserForm({ ...newUserForm, phone: cleaned });
                }}
                required
              />
              <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>
                Must be a valid 10-digit number (98/97). Each user must have a unique phone number.
              </Form.Text>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Role *</Form.Label>
                  <Form.Select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  >
                    <option value="Donor">Donor</option>
                    <option value="Receiver">Receiver / NGO</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Location / City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kathmandu, Nepal"
                    value={newUserForm.location}
                    onChange={(e) => setNewUserForm({ ...newUserForm, location: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            {newUserForm.role === 'Receiver' && (
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Organization Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Kathmandu Care Foundation"
                  value={newUserForm.organization}
                  onChange={(e) => setNewUserForm({ ...newUserForm, organization: e.target.value })}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-2">
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Minimum 6 characters"
                value={newUserForm.password}
                onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '1px solid #E6ECE8', background: '#F7F8F6' }}>
            <Button variant="outline-secondary" onClick={() => setShowCreateModal(false)} disabled={isSubmittingUser}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmittingUser}
              style={{ backgroundColor: '#173F35', borderColor: '#173F35' }}
            >
              {isSubmittingUser ? 'Creating...' : 'Create User'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Confirm Action Modal */}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.text}
        confirmVariant={confirmConfig.variant}
        onConfirm={confirmConfig.action}
      />
    </Container>
  );
};

export default UserManagement;
