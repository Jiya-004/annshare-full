import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { FiPackage, FiMapPin, FiClock, FiUser, FiCalendar, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import StatusBadge from '../StatusBadge';
import { formatImageUrl, getListingFallbackImage } from '../../services/adminService';

const DonationDetailModal = ({ show, onHide, donation, onDelete }) => {
  if (!donation) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.2rem' }} className="d-flex align-items-center gap-2">
          <FiPackage style={{ color: '#1B4D3E' }} />
          Food Donation Details #{donation.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '24px' }}>
        <Row className="g-4 mb-4">
          <Col md={5}>
            <img
              src={formatImageUrl(donation.image, donation.category)}
              alt={donation.foodName || donation.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = getListingFallbackImage(donation);
              }}
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #E5E7EB' }}
            />
          </Col>

          <Col md={7}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Badge bg="success" style={{ background: '#E3F5EA', color: '#1B4D3E', fontSize: '0.78rem', fontWeight: 600 }}>
                {donation.category}
              </Badge>
              <StatusBadge status={donation.status} />
            </div>

            <h4 style={{ fontWeight: 700, color: '#111827', fontSize: '1.3rem', marginBottom: '8px' }}>
              {donation.foodName}
            </h4>

            <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: '0.86rem', color: '#374151' }}>
              <div><FiPackage className="me-2 text-secondary" /> <strong>Quantity:</strong> {donation.quantity}</div>
              <div><FiUser className="me-2 text-secondary" /> <strong>Donor:</strong> {donation.donor}</div>
              <div><FiMapPin className="me-2 text-secondary" /> <strong>Location:</strong> {donation.location}</div>
              <div><FiCalendar className="me-2 text-secondary" /> <strong>Posted:</strong> {donation.postedDate}</div>
              <div><FiClock className="me-2 text-secondary" /> <strong>Expiry / Best Before:</strong> {donation.expiryTime}</div>
              {donation.bestBefore && (
                <div style={{ color: "#E65100" }}>
                  <FiClock className="me-2" style={{ color: "#E65100" }} />
                  <strong>Best Before:</strong> {donation.bestBefore} from listing time
                </div>
              )}
            </div>
          </Col>
        </Row>

        <div className="p-3 rounded mb-3" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <h6 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Pickup & Receiver Status</h6>
          {donation.claimedBy ? (
            <div style={{ fontSize: '0.86rem', color: '#1E8449' }}>
              <FiCheckCircle className="me-2" />
              Claimed by <strong>{donation.claimedBy}</strong>
            </div>
          ) : (
            <div style={{ fontSize: '0.86rem', color: '#6B7280' }}>
              Currently unassigned / Available for verified receivers.
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete && onDelete(donation)}>
          <FiTrash2 className="me-1" /> Remove Inappropriate Listing
        </Button>
        <Button variant="secondary" size="sm" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationDetailModal;
