import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Row, Col, Dropdown, Badge } from 'react-bootstrap';
import {
  FiPackage,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiClock,
  FiArrowLeft,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiCheckCircle,
  FiTruck,
  FiThermometer,
  FiShield,
  FiAlertCircle,
  FiRefreshCw
} from 'react-icons/fi';

import StatusBadge from '../../components/StatusBadge';
import ConfirmModal from '../../components/modals/ConfirmModal';

import {
  getDonations,
  getCategories,
  getRequests,
  deleteDonation,
  updateDonationStatus,
  updateRequestStatus,
  subscribeToAdminService,
  syncListingsFromBackend,
  formatToNepaliTime
} from '../../services/adminService';

// Styled Components for Dropdown and Page Layout
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
      : props.$variant === 'warning'
      ? '#92400E'
      : '#12201B'} !important;
  transition: all 0.15s ease !important;
  margin-bottom: 2px !important;

  &:hover {
    background: ${props =>
      props.$variant === 'danger'
        ? '#FEF2F2'
        : props.$variant === 'warning'
        ? '#FFFBEB'
        : '#EEF8F4'} !important;
    color: ${props =>
      props.$variant === 'danger'
        ? '#991B1B'
        : props.$variant === 'warning'
        ? '#92400E'
        : '#185C4A'} !important;
  }
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

// Helper for Category Storage Temperature Requirements
const getTempStorageSpec = (category) => {
  switch (category) {
    case 'Prepared Meals':
      return { label: 'Thermal Insulation Required', detail: 'Maintain Hot Storage (>60°C) or Serve Immediate', bg: '#FFF7ED', color: '#C2410C' };
    case 'Bakery & Bread':
      return { label: 'Ambient Storage (18°C - 22°C)', detail: 'Keep Dry, Sealed, Away from Direct Moisture', bg: '#FEF3C7', color: '#92400E' };
    case 'Fruits & Veggies':
      return { label: 'Cool Storage (8°C - 12°C)', detail: 'Ventilated Produce Crates, Shielded from Direct Sun', bg: '#ECFDF5', color: '#065F46' };
    case 'Dairy & Pantry':
    case 'Packaged Food':
      return { label: 'Refrigerated Storage (2°C - 4°C)', detail: 'Cold-Chain Maintenance Required for Sealed Packaging', bg: '#EFF6FF', color: '#1E40AF' };
    default:
      return { label: 'Standard Food Storage', detail: 'Follow standard safe handling & storage protocols', bg: '#F3F4F6', color: '#374151' };
  }
};

const DonationManagement = () => {
  const [donations, setDonations] = useState(getDonations());
  const [categories, setCategories] = useState(getCategories());
  const [requests, setRequests] = useState(getRequests());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(getDonations().length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [viewingDonation, setViewingDonation] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (getDonations().length === 0) {
      setIsLoading(true);
    }

    // Direct initial sync
    syncListingsFromBackend().finally(() => {
      if (isMounted) setIsLoading(false);
    });

    // Real-time live polling every 2 seconds for instant new listings appearance
    const pollTimer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        syncListingsFromBackend();
      }
    }, 2000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncListingsFromBackend();
      }
    };
    window.addEventListener('focus', onVisibility);
    document.addEventListener('visibilitychange', onVisibility);

    const unsub = subscribeToAdminService(() => {
      if (!isMounted) return;
      const updated = getDonations();
      setDonations(updated);
      setCategories(getCategories());
      setRequests(getRequests());
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

  // Keep viewingDonation updated
  useEffect(() => {
    if (viewingDonation) {
      const current = donations.find(d => d.id === viewingDonation.id || (d._id && d._id === (viewingDonation._id || viewingDonation.id)));
      if (current) setViewingDonation(current);
    }
  }, [donations]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await syncListingsFromBackend();
    setIsRefreshing(false);
  };

  const filteredDonations = donations.filter(item => {
    const itemName = item.title || item.foodName || '';
    const matchesSearch =
      searchTerm === '' ||
      itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.donor && item.donor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;

    return true;
  });

  const handleOpenDetail = (don) => {
    setViewingDonation(don);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const promptDelete = (item) => {
    setSelectedDonation(item);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDonation) {
      deleteDonation(selectedDonation.id);
      if (viewingDonation && viewingDonation.id === selectedDonation.id) {
        setViewingDonation(null);
      }
      setSelectedDonation(null);
    }
  };

  const handleStatusChange = (newStatus) => {
    if (viewingDonation) {
      updateDonationStatus(viewingDonation.id, newStatus);
      const targetReq = requests.find(r => 
        (r.donationId && String(r.donationId) === String(viewingDonation.id || viewingDonation._id)) ||
        (r.listingId && String(r.listingId) === String(viewingDonation.id || viewingDonation._id)) ||
        (r.foodTitle && viewingDonation.title && r.foodTitle.toLowerCase() === viewingDonation.title.toLowerCase())
      );
      if (targetReq) {
        if (newStatus === 'Completed') {
          updateRequestStatus(targetReq.id, 'Completed');
        } else if (newStatus === 'Picked Up') {
          updateRequestStatus(targetReq.id, 'confirmed');
        } else if (newStatus === 'Available') {
          updateRequestStatus(targetReq.id, 'Cancelled');
        }
      }
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: STANDALONE DONATION LISTING DETAILS PAGE VIEW
  // -------------------------------------------------------------
  if (viewingDonation) {
    const don = viewingDonation;
    const tempSpec = getTempStorageSpec(don.category);
    const cleanQty = don.quantity ? don.quantity.replace(/\s*\([^)]*\)/g, '') : 'N/A';

    // Find linked food request by donation ID / listing ID or title
    const relatedRequest = requests.find(r => 
      (r.donationId && String(r.donationId) === String(don.id || don._id)) ||
      (r.listingId && String(r.listingId) === String(don.id || don._id)) ||
      (r.foodTitle && don.title && r.foodTitle.toLowerCase() === don.title.toLowerCase())
    );

    const donStatusLower = (don.status || '').toLowerCase();
    const reqStatusLower = (relatedRequest?.status || '').toLowerCase();
    const assignedNgoName = don.claimedBy || relatedRequest?.receiverName || relatedRequest?.ngoName || null;

    // Dynamically calculate accurate 4-step logistics lifecycle
    let currentStep = 1;
    if (
      donStatusLower.includes('completed') || 
      donStatusLower.includes('distributed') || 
      reqStatusLower.includes('completed') ||
      reqStatusLower.includes('received')
    ) {
      currentStep = 4;
    } else if (
      donStatusLower.includes('picked') || 
      donStatusLower.includes('transit') || 
      reqStatusLower.includes('confirmed') || 
      reqStatusLower.includes('matched') ||
      reqStatusLower.includes('pickup') ||
      reqStatusLower.includes('in transit')
    ) {
      currentStep = 3;
    } else if (
      donStatusLower.includes('requested') || 
      donStatusLower.includes('claimed') || 
      reqStatusLower.includes('pending') || 
      reqStatusLower.includes('approved') || 
      assignedNgoName
    ) {
      currentStep = 2;
    } else {
      currentStep = 1;
    }

    return (
      <Container fluid className="p-0">
        {/* Page Header Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <BackButton variant="light" onClick={() => setViewingDonation(null)}>
              <FiArrowLeft size={16} /> Back to Donations List
            </BackButton>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.4rem' }} className="d-flex align-items-center gap-2">
                {don.title || don.foodName}
                <span style={{ fontSize: '0.86rem', color: '#66736D', fontWeight: 500 }}>#{don.id}</span>
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {don.status?.toLowerCase().includes('pending') && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  style={{
                    borderRadius: '20px',
                    height: '38px',
                    padding: '0 16px',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    background: '#185C4A',
                    borderColor: '#185C4A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onClick={() => handleStatusChange('Available')}
                >
                  <FiCheckCircle size={16} />
                  <span>Approve & Publish</span>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{
                    borderRadius: '20px',
                    height: '38px',
                    padding: '0 14px',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onClick={() => handleStatusChange('Rejected')}
                >
                  <FiAlertCircle size={15} />
                  <span>Reject</span>
                </Button>
              </>
            )}

            <StyledStatusSelect
              value={don.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="Pending Approval">Pending Approval</option>
              <option value="Available">Available</option>
              <option value="Requested">Requested</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Expired">Expired</option>
            </StyledStatusSelect>

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
                justifyContent: 'center',
                gap: '6px',
                flexShrink: 0
              }}
              onClick={() => promptDelete(don)}
            >
              <FiTrash2 size={15} />
              <span>Remove Listing</span>
            </Button>
          </div>
        </div>

        <Row className="g-4">
          {/* Left Column: Image, Food Details & Donor Info */}
          <Col lg={7}>
            <DetailCard>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <img
                  src={don.image || '/food.png'}
                  alt={don.title || don.foodName}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid #E6ECE8'
                  }}
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  <Badge bg="success" style={{ background: '#185C4A', fontSize: '0.8rem', padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                    {don.category}
                  </Badge>
                  <StatusBadge status={don.status} />
                </div>
              </div>

              <h4 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.25rem', marginBottom: '16px' }}>
                Listing Overview & Specifications
              </h4>

              <Row className="g-3 mb-4">
                <Col md={6}>
                  <div className="p-3 rounded" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                    <div style={{ fontSize: '0.76rem', color: '#66736D', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                      Clean Quantity
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#12201B' }} className="d-flex align-items-center gap-2">
                      <FiPackage style={{ color: '#185C4A' }} /> {cleanQty}
                    </div>
                    {don.weight_kg && (
                      <div style={{ fontSize: '0.78rem', color: '#66736D', marginTop: '2px' }}>
                        Est. Weight: <strong>{don.weight_kg} kg</strong>
                      </div>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="p-3 rounded" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                    <div style={{ fontSize: '0.76rem', color: '#66736D', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                      Expiry Window
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#12201B' }} className="d-flex align-items-center gap-2">
                      <FiClock style={{ color: '#C2410C' }} /> {don.expiryTime || don.expiresIn || 'Not specified'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#66736D', marginTop: '2px' }}>
                      Posted: <strong>{formatToNepaliTime(don.postedDate || don.createdAt)}</strong>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Donor & Location Block */}
              <div className="p-3 rounded mb-4" style={{ background: '#ffffff', border: '1px solid #E6ECE8' }}>
                <h6 style={{ fontWeight: 700, color: '#12201B', marginBottom: '12px' }} className="d-flex align-items-center gap-2">
                  <FiUser style={{ color: '#185C4A' }} /> Donor Organization & Pickup Location
                </h6>
                <Row className="g-3" style={{ fontSize: '0.86rem' }}>
                  <Col md={6}>
                    <div style={{ color: '#66736D', fontSize: '0.78rem' }}>Donor Name / Facility</div>
                    <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.95rem' }}>{don.donor}</div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>Account ID: {don.donorId || 'USR-101'}</div>
                  </Col>
                  <Col md={6}>
                    <div style={{ color: '#66736D', fontSize: '0.78rem' }}>Pickup District & Location</div>
                    <div style={{ fontWeight: 600, color: '#12201B' }} className="d-flex align-items-center gap-1">
                      <FiMapPin style={{ color: '#E11D48' }} /> {don.location}
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Storage & Safety Specs */}
              <div className="p-3 rounded" style={{ background: tempSpec.bg, border: `1px solid ${tempSpec.color}30` }}>
                <div style={{ color: tempSpec.color, fontWeight: 700, fontSize: '0.9rem' }} className="d-flex align-items-center gap-2 mb-1">
                  <FiThermometer size={18} /> Storage & Handling Specification
                </div>
                <div style={{ color: tempSpec.color, fontWeight: 600, fontSize: '0.84rem' }}>
                  {tempSpec.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#4B5563', marginTop: '3px' }}>
                  {tempSpec.detail}
                </div>
                <div className="d-flex align-items-center gap-2 mt-2 pt-2 border-top" style={{ borderColor: `${tempSpec.color}20`, fontSize: '0.76rem', color: '#065F46', fontWeight: 600 }}>
                  <FiShield size={16} /> Kitchen Sanitation & Food Hygiene Certified
                </div>
              </div>
            </DetailCard>
          </Col>

          {/* Right Column: Claimed NGO Info & Logistics Timeline */}
          <Col lg={5}>
            {/* Receiver / NGO Assignment Status */}
            <DetailCard>
              <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.1rem', marginBottom: '16px' }}>
                Receiver & Distribution Assignment
              </h5>

              {currentStep === 4 ? (
                <div className="p-3 rounded mb-3" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                  <div style={{ color: '#065F46', fontWeight: 700, fontSize: '0.92rem' }} className="d-flex align-items-center gap-2 mb-1">
                    <FiCheckCircle size={18} /> Redistribution Completed & Verified
                  </div>
                  <div style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', margin: '4px 0' }}>
                    {assignedNgoName || 'Verified Community Shelter'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                    Food safely received and distributed to recipients.
                  </div>
                </div>
              ) : currentStep === 3 ? (
                <div className="p-3 rounded mb-3" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                  <div style={{ color: '#1D4ED8', fontWeight: 700, fontSize: '0.92rem' }} className="d-flex align-items-center gap-2 mb-1">
                    <FiTruck size={18} /> Pickup Active / In Transit
                  </div>
                  <div style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', margin: '4px 0' }}>
                    {assignedNgoName || 'Verified NGO Shelter'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#1E40AF' }}>
                    Donor contact unlocked & verified. Pickup transfer in progress.
                  </div>
                </div>
              ) : currentStep === 2 ? (
                <div className="p-3 rounded mb-3" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                  <div style={{ color: '#065F46', fontWeight: 700, fontSize: '0.92rem' }} className="d-flex align-items-center gap-2 mb-1">
                    <FiCheckCircle size={18} /> Assigned to Receiver NGO
                  </div>
                  <div style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', margin: '4px 0' }}>
                    {assignedNgoName || 'Verified NGO Shelter'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                    Surplus claimed. Awaiting pickup coordination.
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded mb-3" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <div style={{ color: '#92400E', fontWeight: 700, fontSize: '0.9rem' }} className="d-flex align-items-center gap-2 mb-1">
                    <FiAlertCircle size={18} /> Unmatched / Available
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#78350F' }}>
                    This surplus listing is currently open for claim by all verified food distribution shelters.
                  </div>
                </div>
              )}
            </DetailCard>

            {/* 4-Step Logistics Progress Timeline */}
            <DetailCard>
              <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.1rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                <FiTruck style={{ color: '#185C4A' }} /> Food Redistribution Logistics Lifecycle
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
                      Listed & Inspected
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      Posted by donor on {formatToNepaliTime(don.postedDate || don.createdAt)}
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
                      background: currentStep >= 2 ? '#185C4A' : '#E5E7EB',
                      color: currentStep >= 2 ? '#ffffff' : '#9CA3AF',
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
                    <div style={{ fontWeight: 700, color: currentStep >= 2 ? '#12201B' : '#9CA3AF', fontSize: '0.88rem' }}>
                      Matched / Claimed
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      {assignedNgoName ? `Claimed & reserved by ${assignedNgoName}` : 'Awaiting NGO request match'}
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
                      background: currentStep >= 3 ? '#185C4A' : '#E5E7EB',
                      color: currentStep >= 3 ? '#ffffff' : '#9CA3AF',
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
                      In Transit / Pickup Active
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      {currentStep >= 3 ? `Donor accepted. Pickup transfer in progress with ${assignedNgoName || 'receiver'}` : 'Transport & cold-chain transfer scheduled'}
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
                      Completed & Distributed
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#66736D' }}>
                      {currentStep >= 4 ? `Completed: Food delivered to community recipients by ${assignedNgoName || 'receiver'}` : 'Food delivered to community shelter recipients'}
                    </div>
                  </div>
                </div>
              </div>
            </DetailCard>
          </Col>
        </Row>

        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          title="Remove Food Listing"
          message={`Are you sure you want to remove listing #${selectedDonation?.id} (${selectedDonation?.foodName || selectedDonation?.title})?`}
          confirmText="Remove Listing"
          confirmVariant="danger"
          onConfirm={handleConfirmDelete}
        />
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: MAIN FOOD DONATION TABLE VIEW
  // -------------------------------------------------------------
  return (
    <Container fluid className="p-0">
      <PageHeader className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div>
          <h2>Food Donation Management</h2>
          <p>Monitor and moderate all surplus food listings across network donors.</p>
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
          {isRefreshing ? 'Refreshing...' : 'Refresh Donations'}
        </Button>
      </PageHeader>

      <MainCard>
        {/* Filters & Search Header */}
        <Row className="g-3 mb-3">
          <Col lg={4} md={6}>
            <div style={{ position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#66736D', fontSize: '0.92rem' }} />
              <Form.Control
                type="text"
                placeholder="Search food item, donor, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '38px', borderRadius: '20px', height: '38px', fontSize: '0.84rem', background: '#F7F8F6', border: '1px solid #E6ECE8' }}
              />
            </div>
          </Col>

          <Col lg={3} md={6}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ borderRadius: '20px', height: '38px', fontSize: '0.84rem', background: '#F7F8F6', border: '1px solid #E6ECE8' }}
            >
              <option value="All">Filter Status: All</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Available">Available</option>
              <option value="Requested">Requested</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Expired">Expired</option>
            </Form.Select>
          </Col>

          <Col lg={3} md={6}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ borderRadius: '20px', height: '38px', fontSize: '0.84rem', background: '#F7F8F6', border: '1px solid #E6ECE8' }}
            >
              <option value="All">Filter Category: All</option>
              {categories.map(c => (
                <option key={c.id || c.name} value={c.name}>{c.name}</option>
              ))}
            </Form.Select>
          </Col>

          <Col lg={2} md={6} className="text-end">
            <Button
              variant="outline-secondary"
              size="sm"
              style={{ borderRadius: '20px', height: '38px', fontSize: '0.82rem', width: '100%', borderColor: '#E6ECE8' }}
              onClick={() => { setSearchTerm(''); setStatusFilter('All'); setCategoryFilter('All'); }}
            >
              Reset Filters
            </Button>
          </Col>
        </Row>

        {/* Donations Table */}
        <div className="table-responsive">
          <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ fontSize: '0.74rem', color: '#66736D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Food Item</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Category</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Donor</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Quantity</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Location</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Expiry Window</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Status</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }} className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    <div className="spinner-border spinner-border-sm text-success me-2" role="status" />
                    Loading food donations from server...
                  </td>
                </tr>
              ) : filteredDonations.length > 0 ? (
                filteredDonations.map(don => {
                  const cleanQuantity = don.quantity ? don.quantity.replace(/\s*\([^)]*\)/g, '') : '';
                  const isPending = (don.status || '').toLowerCase().includes('pending');
                  const displayId = (don.id || don._id || '').length > 8 ? `DON-${(don.id || don._id).slice(-5).toUpperCase()}` : (don.id || 'DON-000');

                  return (
                    <tr key={don.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={don.image || '/food.png'}
                            alt={don.title || don.foodName}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80';
                            }}
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E6ECE8' }}
                          />
                          <div>
                            <strong style={{ color: '#12201B' }}>{don.title || don.foodName}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#66736D' }}>#{displayId}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.76rem', fontWeight: 600, padding: '3px 10px', borderRadius: '12px', background: '#EEF8F4', color: '#185C4A' }}>
                          {don.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500, color: '#12201B' }}>{don.donor}</td>
                      <td style={{ fontWeight: 600, color: '#12201B' }}>{cleanQuantity}</td>
                      <td style={{ color: '#66736D' }}>{don.location}</td>
                      <td style={{ fontSize: '0.8rem', color: '#66736D' }}>
                        <FiClock className="me-1 text-secondary" />
                        {don.expiryTime || don.expiresIn}
                      </td>
                      <td>
                        <StatusBadge status={don.status} />
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center gap-1">
                          {isPending && (
                            <Button
                              variant="success"
                              size="sm"
                              style={{
                                borderRadius: '14px',
                                fontSize: '0.74rem',
                                padding: '3px 10px',
                                fontWeight: 700,
                                background: '#185C4A',
                                borderColor: '#185C4A',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                              onClick={() => updateDonationStatus(don.id, 'Available')}
                              title="Approve and make available for community pickup"
                            >
                              <FiCheckCircle size={13} /> Approve
                            </Button>
                          )}

                          <Dropdown align="end">
                            <Dropdown.Toggle as={ActionIconButton}>
                              <FiMoreVertical size={16} />
                            </Dropdown.Toggle>
                            <StyledDropdownMenu>
                              {isPending && (
                                <>
                                  <StyledDropdownItem onClick={() => updateDonationStatus(don.id, 'Available')} style={{ color: '#185C4A', fontWeight: 600 }}>
                                    <FiCheckCircle className="me-2 text-success" size={15} /> Approve & Publish
                                  </StyledDropdownItem>
                                  <StyledDropdownItem onClick={() => updateDonationStatus(don.id, 'Rejected')} $variant="danger">
                                    <FiAlertCircle className="me-2 text-danger" size={15} /> Reject Listing
                                  </StyledDropdownItem>
                                  <Dropdown.Divider />
                                </>
                              )}
                              <StyledDropdownItem onClick={() => handleOpenDetail(don)}>
                                <FiEye className="me-2 text-primary" size={15} /> View Listing Details
                              </StyledDropdownItem>
                              <Dropdown.Divider />
                              <StyledDropdownItem onClick={() => promptDelete(don)} $variant="danger">
                                <FiTrash2 className="me-2" size={15} /> Remove Listing
                              </StyledDropdownItem>
                            </StyledDropdownMenu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    No food donations found matching criteria.
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
        title="Remove Food Listing"
        message={`Are you sure you want to remove listing #${selectedDonation?.id} (${selectedDonation?.foodName || selectedDonation?.title})?`}
        confirmText="Remove Listing"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default DonationManagement;
