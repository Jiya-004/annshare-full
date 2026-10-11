import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Row, Col, Dropdown, Badge } from 'react-bootstrap';
import {
  FiFileText,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiCheck,
  FiX,
  FiSlash,
  FiArrowLeft,
  FiUser,
  FiPackage,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiMessageSquare,
  FiShield,
  FiTruck,
  FiRefreshCw
} from 'react-icons/fi';

import StatusBadge from '../../components/StatusBadge';
import ConfirmModal from '../../components/modals/ConfirmModal';

import {
  getRequests,
  updateRequestStatus,
  subscribeToAdminService,
  syncAllFromBackend,
  syncRequestsFromBackend,
  formatToNepaliTime
} from '../../services/adminService';

// Styled Components
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

const DetailCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
  margin-bottom: 20px;
`;

const StyledStatusSelect = styled(Form.Select)`
  border-radius: 20px !important;
  height: 38px !important;
  font-size: 0.84rem !important;
  font-weight: 600 !important;
  border-color: #185C4A !important;
  color: #185C4A !important;
  background-color: #EEF8F4 !important;
  cursor: pointer !important;
  width: auto !important;
  min-width: 130px !important;
  box-shadow: none !important;
  outline: none !important;

  &:focus, &:active {
    border-color: #185C4A !important;
    box-shadow: 0 0 0 3px rgba(24, 92, 74, 0.15) !important;
    outline: none !important;
  }
`;

const BackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.84rem;
  padding: 6px 16px;
  border: 1px solid #E6ECE8;
  background: #ffffff;
  color: #12201B;
  transition: all 0.15s ease;

  &:hover {
    background: #EEF8F4;
    border-color: #185C4A;
    color: #185C4A;
  }
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
      : props.$variant === 'success'
      ? '#065F46'
      : props.$variant === 'warning'
      ? '#92400E'
      : '#12201B'} !important;
  transition: all 0.15s ease !important;
  margin-bottom: 2px !important;

  &:hover {
    background: ${props =>
      props.$variant === 'danger'
        ? '#FEF2F2'
        : props.$variant === 'success'
        ? '#ECFDF5'
        : props.$variant === 'warning'
        ? '#FFFBEB'
        : '#EEF8F4'} !important;
    color: ${props =>
      props.$variant === 'danger'
        ? '#991B1B'
        : props.$variant === 'success'
        ? '#065F46'
        : props.$variant === 'warning'
        ? '#92400E'
        : '#185C4A'} !important;
  }
`;

const RequestManagement = () => {
  const [requests, setRequests] = useState(getRequests());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(getRequests().length === 0);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [targetStatus, setTargetStatus] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (getRequests().length === 0) {
      setIsLoading(true);
    }

    syncRequestsFromBackend().finally(() => {
      if (isMounted) setIsLoading(false);
    });

    // Real-time live polling every 4 seconds
    const pollTimer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        syncRequestsFromBackend();
      }
    }, 4000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncRequestsFromBackend();
      }
    };
    window.addEventListener('focus', onVisibility);
    document.addEventListener('visibilitychange', onVisibility);

    const unsub = subscribeToAdminService(() => {
      if (!isMounted) return;
      const updated = getRequests();
      setRequests(updated);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      clearInterval(pollTimer);
      window.removeEventListener('focus', onVisibility);
      document.removeEventListener('visibilitychange', onVisibility);
      unsub();
    };
  }, []);

  // Keep viewingRequest updated when requests change
  useEffect(() => {
    if (viewingRequest) {
      const current = requests.find(r => r.id === viewingRequest.id || (r._id && r._id === (viewingRequest._id || viewingRequest.id)));
      if (current) setViewingRequest(current);
    }
  }, [requests]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await syncRequestsFromBackend();
    setIsRefreshing(false);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch =
      searchTerm === '' ||
      (req.foodName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.receiverName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.donorName || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'All') {
      const s = (req.status || '').toLowerCase();
      const f = statusFilter.toLowerCase();
      if (f.includes('pending') && !s.includes('pending')) return false;
      if (f.includes('approved') && !s.includes('approved')) return false;
      if (f.includes('confirmed') && !s.includes('confirmed') && !s.includes('matched')) return false;
      if (f.includes('completed') && !s.includes('completed')) return false;
      if (f.includes('rejected') && !s.includes('rejected')) return false;
      if (f.includes('declined') && !s.includes('declined')) return false;
      if (f.includes('cancelled') && !s.includes('cancelled')) return false;
    }

    return true;
  });

  const handleOpenDetail = (req) => {
    setViewingRequest(req);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActionClick = (newStatus, req) => {
    setSelectedRequest(req);
    setTargetStatus(newStatus);
    setShowConfirmModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedRequest && targetStatus) {
      updateRequestStatus(selectedRequest.id, targetStatus);
      if (viewingRequest && viewingRequest.id === selectedRequest.id) {
        setViewingRequest(prev => prev ? { ...prev, status: targetStatus } : null);
      }
      setSelectedRequest(null);
    }
  };

  const handleStatusSelectChange = (newStatus) => {
    if (viewingRequest) {
      updateRequestStatus(viewingRequest.id, newStatus);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: STANDALONE FOOD REQUEST DETAILS PAGE VIEW
  // -------------------------------------------------------------
  if (viewingRequest) {
    const req = viewingRequest;
    const reqStatusLower = (req.status || '').toLowerCase();

    const getTimelineStep = (status) => {
      const s = (status || '').toLowerCase();
      if (s.includes('completed')) return 4;
      if (
        s.includes('confirmed') ||
        s.includes('matched') ||
        s.includes('transit') ||
        s.includes('accepted') ||
        s.includes('unlocked') ||
        s.includes('share contact') ||
        s.includes('contact shared')
      ) return 3;
      if (s.includes('approved')) return 2;
      return 1;
    };

    const currentStep = getTimelineStep(req.status);
    const isPendingAdmin = reqStatusLower.includes('pending');

    return (
      <Container fluid className="p-0">
        {/* Page Header Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <BackButton variant="light" onClick={() => setViewingRequest(null)}>
              <FiArrowLeft size={16} /> Back to Requests List
            </BackButton>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.4rem' }} className="d-flex align-items-center gap-2">
                Food Request Details
                <span style={{ fontSize: '0.86rem', color: '#66736D', fontWeight: 500 }}>
                  #{(req.id || req._id || '').length > 8 ? `REQ-${(req.id || req._id).slice(-5).toUpperCase()}` : (req.id || 'REQ-000')}
                </span>
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <Button
              variant="light"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              style={{
                borderRadius: '20px',
                height: '38px',
                padding: '0 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: '1px solid #E6ECE8',
                color: '#185C4A',
                background: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FiRefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
              {isRefreshing ? 'Syncing...' : 'Sync Live'}
            </Button>

            <StyledStatusSelect
              value={req.status}
              onChange={(e) => handleStatusSelectChange(e.target.value)}
            >
              <option value="Pending Admin Approval">Pending Admin Approval (Step 1)</option>
              <option value="Approved by Admin">Approved by Admin (Step 2)</option>
              <option value="Confirmed">Confirmed / Matched (Step 3: Donor Accepted)</option>
              <option value="Completed">Completed (Step 4: Transferred)</option>
              <option value="Rejected">Rejected by Admin</option>
              <option value="Declined">Declined by Donor</option>
              <option value="Cancelled">Cancelled</option>
            </StyledStatusSelect>

            {isPendingAdmin && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  style={{
                    borderRadius: '20px',
                    height: '38px',
                    padding: '0 16px',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    background: '#185C4A',
                    borderColor: '#185C4A',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={() => handleActionClick('Approved by Admin', req)}
                >
                  <FiCheck size={15} /> Approve Request
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{
                    borderRadius: '20px',
                    height: '38px',
                    padding: '0 16px',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={() => handleActionClick('Rejected', req)}
                >
                  <FiX size={15} /> Reject
                </Button>
              </>
            )}
          </div>
        </div>

        <Row className="g-4">
          {/* Left Column: Request Overview & NGO/Donor Details */}
          <Col lg={7}>
            <DetailCard>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="success" style={{ background: '#EEF8F4', color: '#185C4A', fontSize: '0.82rem', padding: '6px 14px', borderRadius: '20px', fontWeight: 700 }}>
                    <FiPackage className="me-1" /> {req.requestedQuantity}
                  </Badge>
                  <StatusBadge status={req.status} />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#66736D' }} className="d-flex align-items-center gap-1">
                  <FiCalendar size={14} /> Submitted: {formatToNepaliTime(req.requestDate)}
                </div>
              </div>

              <h4 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.3rem', marginBottom: '20px' }}>
                {req.foodName}
              </h4>

              {/* Parties Details Card */}
              <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                <h6 style={{ fontWeight: 700, color: '#12201B', marginBottom: '14px' }} className="d-flex align-items-center gap-2">
                  <FiUser style={{ color: '#185C4A' }} /> Request Parties & Contact Details
                </h6>

                <Row className="g-3" style={{ fontSize: '0.86rem' }}>
                  <Col md={6}>
                    <div style={{ color: '#66736D', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600 }}>
                      Receiver NGO / Shelter
                    </div>
                    <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.98rem', marginTop: '2px' }}>
                      {req.receiverName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#185C4A', fontWeight: 600, marginTop: '2px' }}>
                      📞 {req.ngoPhone || '+977 984-1234567'}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D', marginTop: '2px' }}>
                      Account ID: {req.receiverId || 'USR-102'}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div style={{ color: '#66736D', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 600 }}>
                      Food Donor Facility
                    </div>
                    <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.98rem', marginTop: '2px' }}>
                      {req.donorName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#185C4A', fontWeight: 600, marginTop: '2px' }}>
                      📞 {req.donorPhone || '+977 980-1234567'}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D', marginTop: '2px' }}>
                      Listing Ref: #{req.donationId || 'DON-501'}
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Justification & Stated Need */}
              <div className="p-3 rounded mb-2" style={{ background: '#ffffff', border: '1px solid #E6ECE8' }}>
                <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.9rem', marginBottom: '8px' }} className="d-flex align-items-center gap-2">
                  <FiMessageSquare style={{ color: '#185C4A' }} /> Stated Need / Justification
                </div>
                <p style={{ margin: 0, color: '#4B5563', fontSize: '0.86rem', lineHeight: '1.5', fontStyle: 'italic' }}>
                  "{req.reason || 'No additional justification notes submitted with request.'}"
                </p>
              </div>
            </DetailCard>
          </Col>

          {/* Right Column: Workflow Timeline & Decision Controls */}
          <Col lg={5}>
            <DetailCard>
              <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.1rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                <FiTruck style={{ color: '#185C4A' }} /> 3-Step Approval & Match Lifecycle
              </h5>

              <div className="d-flex flex-column gap-3 position-relative ps-2">
                {/* Step 1 */}
                <div className="d-flex gap-3 align-items-start">
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: currentStep >= 1 ? '#185C4A' : '#E5E7EB',
                      color: currentStep >= 1 ? '#ffffff' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      flexShrink: 0
                    }}
                  >
                    1
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: currentStep >= 1 ? '#12201B' : '#9CA3AF', fontSize: '0.88rem' }}>
                      Step 1: Request Submitted by NGO
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      Logged by {req.receiverName} on {req.requestDate}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="d-flex gap-3 align-items-start">
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: currentStep >= 2 ? '#185C4A' : reqStatusLower.includes('rejected') ? '#DC2626' : '#E5E7EB',
                      color: currentStep >= 2 || reqStatusLower.includes('rejected') ? '#ffffff' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      flexShrink: 0
                    }}
                  >
                    2
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: currentStep >= 2 ? '#12201B' : reqStatusLower.includes('rejected') ? '#DC2626' : '#9CA3AF', fontSize: '0.88rem' }}>
                      Step 2: Admin Moderation & Approval
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      {currentStep >= 2
                        ? 'Request approved by platform moderator · Notification dispatched to Donor'
                        : reqStatusLower.includes('rejected')
                        ? 'Request rejected during admin review'
                        : 'Awaiting administrative verification'}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="d-flex gap-3 align-items-start">
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: currentStep >= 3 ? '#185C4A' : reqStatusLower.includes('declined') ? '#DC2626' : '#E5E7EB',
                      color: currentStep >= 3 || reqStatusLower.includes('declined') ? '#ffffff' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      flexShrink: 0
                    }}
                  >
                    3
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: currentStep >= 3 ? '#12201B' : '#9CA3AF', fontSize: '0.88rem' }}>
                      Step 3: Donor Acceptance & Contact Unlock
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      {currentStep >= 3
                        ? 'Donor accepted request · Direct phone contacts exchanged for pickup'
                        : reqStatusLower.includes('declined')
                        ? 'Declined by donor'
                        : 'Pending donor confirmation in Donor Portal'}
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="d-flex gap-3 align-items-start">
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: currentStep >= 4 ? '#185C4A' : '#E5E7EB',
                      color: currentStep >= 4 ? '#ffffff' : '#9CA3AF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      flexShrink: 0
                    }}
                  >
                    4
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: currentStep >= 4 ? '#12201B' : '#9CA3AF', fontSize: '0.88rem' }}>
                      Completed & Food Transferred
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      Food successfully picked up and distributed to community
                    </div>
                  </div>
                </div>
              </div>
            </DetailCard>

            {/* Quick Status Override Card */}
            <DetailCard>
              <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', marginBottom: '12px' }}>
                Moderator Quick Actions
              </h5>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant="outline-success"
                  size="sm"
                  style={{ borderRadius: '20px', fontWeight: 600, fontSize: '0.8rem' }}
                  onClick={() => handleActionClick('Approved by Admin', req)}
                  disabled={reqStatusLower.includes('approved') || currentStep >= 2}
                >
                  <FiCheck className="me-1" /> Approve & Forward to Donor
                </Button>
                {currentStep >= 3 && currentStep < 4 && (
                  <Button
                    variant="success"
                    size="sm"
                    style={{ borderRadius: '20px', fontWeight: 600, fontSize: '0.8rem', background: '#185C4A', borderColor: '#185C4A' }}
                    onClick={() => handleActionClick('Completed', req)}
                  >
                    <FiCheck className="me-1" /> Mark Transferred & Completed (Step 4)
                  </Button>
                )}
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ borderRadius: '20px', fontWeight: 600, fontSize: '0.8rem' }}
                  onClick={() => handleActionClick('Rejected', req)}
                  disabled={reqStatusLower.includes('rejected') || currentStep >= 4}
                >
                  <FiX className="me-1" /> Mark Rejected
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  style={{ borderRadius: '20px', fontWeight: 600, fontSize: '0.8rem' }}
                  onClick={() => handleActionClick('Cancelled', req)}
                  disabled={reqStatusLower.includes('cancelled') || reqStatusLower.includes('completed')}
                >
                  <FiSlash className="me-1" /> Mark Cancelled
                </Button>
              </div>
            </DetailCard>
          </Col>
        </Row>

        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          title={`Confirm Request ${targetStatus}`}
          message={`Are you sure you want to mark Request #${selectedRequest?.id} as ${targetStatus}?`}
          confirmText={`Confirm ${targetStatus}`}
          confirmVariant={targetStatus.includes('Approved') || targetStatus.includes('Completed') ? 'success' : 'danger'}
          onConfirm={handleConfirmStatusChange}
        />
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: MAIN FOOD REQUESTS TABLE VIEW
  // -------------------------------------------------------------
  return (
    <Container fluid className="p-0">
      <PageHeader className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <h2>Food Request Management</h2>
          <p>Review and approve NGO food requests before forwarding to donors for contact exchange.</p>
        </div>
        <Button
          variant="light"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            borderRadius: '20px',
            fontSize: '0.84rem',
            fontWeight: 600,
            border: '1px solid #E6ECE8',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#185C4A',
            background: '#ffffff',
            padding: '7px 16px'
          }}
        >
          <FiRefreshCw size={14} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Requests'}
        </Button>
      </PageHeader>

      <MainCard>
        {/* Filters */}
        <Row className="g-3 mb-3">
          <Col md={6}>
            <div style={{ position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#66736D', fontSize: '0.92rem' }} />
              <Form.Control
                type="text"
                placeholder="Search by receiver NGO, food item, donor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '38px', borderRadius: '20px', height: '38px', fontSize: '0.84rem', background: '#F7F8F6', border: '1px solid #E6ECE8' }}
              />
            </div>
          </Col>

          <Col md={4}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ borderRadius: '20px', height: '38px', fontSize: '0.84rem', background: '#F7F8F6', border: '1px solid #E6ECE8' }}
            >
              <option value="All">Filter Status: All</option>
              <option value="Pending Admin Approval">Pending Admin Approval</option>
              <option value="Approved by Admin">Approved by Admin</option>
              <option value="Confirmed">Confirmed / Matched</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Declined">Declined</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Col>

          <Col md={2} className="text-end">
            <Button
              variant="outline-secondary"
              size="sm"
              style={{ borderRadius: '20px', height: '38px', fontSize: '0.82rem', width: '100%', borderColor: '#E6ECE8' }}
              onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
            >
              Reset Filters
            </Button>
          </Col>
        </Row>

        {/* Request Table */}
        <div className="table-responsive">
          <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ fontSize: '0.74rem', color: '#66736D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Request ID</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Receiver / NGO</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Food Item</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Donor</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Quantity</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Request Date</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Status</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }} className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    <div className="spinner-border spinner-border-sm text-success me-2" role="status" />
                    Loading food requests from server...
                  </td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map(req => {
                  const sLower = (req.status || '').toLowerCase();
                  const isPending = sLower.includes('pending');
                  const displayId = (req.id || req._id || '').length > 8 ? `REQ-${(req.id || req._id).slice(-5).toUpperCase()}` : (req.id || 'REQ-000');

                  return (
                    <tr key={req.id}>
                      <td>
                        <strong style={{ color: '#185C4A' }}>#{displayId}</strong>
                      </td>
                      <td>
                        <strong style={{ color: '#12201B' }}>{req.receiverName}</strong>
                      </td>
                      <td style={{ color: '#12201B', fontWeight: 500 }}>{req.foodName}</td>
                      <td style={{ color: '#66736D' }}>{req.donorName}</td>
                      <td style={{ fontWeight: 600, color: '#12201B' }}>{req.requestedQuantity}</td>
                      <td style={{ color: '#66736D', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{formatToNepaliTime(req.requestDate)}</td>
                      <td>
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="text-end">
                        <Dropdown align="end">
                          <Dropdown.Toggle as={ActionIconButton}>
                            <FiMoreVertical size={16} />
                          </Dropdown.Toggle>
                          <StyledDropdownMenu>
                            <StyledDropdownItem onClick={() => handleOpenDetail(req)}>
                              <FiEye className="me-2 text-primary" size={15} /> View Request Timeline
                            </StyledDropdownItem>

                            {isPending && (
                              <>
                                <Dropdown.Divider />
                                <StyledDropdownItem onClick={() => handleActionClick('Approved by Admin', req)} $variant="success">
                                  <FiCheck className="me-2" size={15} /> Approve Request
                                </StyledDropdownItem>
                                <StyledDropdownItem onClick={() => handleActionClick('Rejected', req)} $variant="danger">
                                  <FiX className="me-2" size={15} /> Reject Request
                                </StyledDropdownItem>
                              </>
                            )}

                            {!sLower.includes('cancelled') && !sLower.includes('completed') && (
                              <>
                                <Dropdown.Divider />
                                <StyledDropdownItem onClick={() => handleActionClick('Cancelled', req)} $variant="warning">
                                  <FiSlash className="me-2" size={15} /> Cancel Request
                                </StyledDropdownItem>
                              </>
                            )}
                          </StyledDropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    No food requests found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </MainCard>

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title={`Confirm Request ${targetStatus}`}
        message={`Are you sure you want to mark Request #${(selectedRequest?.id || selectedRequest?._id || '').length > 8 ? `REQ-${(selectedRequest.id || selectedRequest._id).slice(-5).toUpperCase()}` : (selectedRequest?.id || '')} as ${targetStatus}?`}
        confirmText={`Confirm ${targetStatus}`}
        confirmVariant={targetStatus.includes('Approved') ? 'success' : 'danger'}
        onConfirm={handleConfirmStatusChange}
      />
    </Container>
  );
};

export default RequestManagement;
