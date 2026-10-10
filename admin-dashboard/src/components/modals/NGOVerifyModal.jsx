import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { FiShield, FiFileText, FiCheckCircle, FiXCircle, FiHelpCircle } from 'react-icons/fi';
import StatusBadge from '../StatusBadge';

const NGOVerifyModal = ({ show, onHide, user, onApprove, onReject }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!user) return null;

  const handleConfirmReject = () => {
    if (onReject) {
      onReject(user, rejectReason || 'Document audit non-compliance.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.2rem' }} className="d-flex align-items-center gap-2">
          <FiShield style={{ color: '#1B4D3E' }} />
          NGO Verification Audit - {user.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '24px' }}>
        <div className="p-3 rounded mb-4" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <h6 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Submitted Application Info</h6>
          <div className="d-flex flex-column gap-1" style={{ fontSize: '0.86rem', color: '#374151' }}>
            <div><strong>Organization:</strong> {user.orgName || user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Location:</strong> {user.location}</div>
            <div><strong>Current Verification Status:</strong> <StatusBadge status={user.verificationStatus} /></div>
          </div>
        </div>

        <h6 style={{ fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
          Uploaded Verification Documents
        </h6>

        {user.docs && user.docs.length > 0 ? (
          <ListGroup variant="flush" style={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} className="mb-4">
            {user.docs.map((doc, idx) => (
              <ListGroup.Item key={idx} className="d-flex align-items-center justify-content-between py-3" style={{ fontSize: '0.86rem' }}>
                <div className="d-flex align-items-center gap-2">
                  <FiFileText style={{ color: '#1B4D3E' }} size={18} />
                  <div>
                    <strong style={{ color: '#111827' }}>{doc.name}</strong>
                    <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>Document Type: {doc.type}</div>
                  </div>
                </div>
                <Button size="sm" variant="outline-primary" style={{ fontSize: '0.76rem' }}>
                  View Document
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted" style={{ fontSize: '0.84rem' }}>No verification documents uploaded.</p>
        )}

        {showRejectInput && (
          <div className="p-3 rounded mb-3" style={{ background: '#FCE8E6', border: '1px solid rgba(231,76,60,0.3)' }}>
            <Form.Group>
              <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#C0392B' }}>
                Reason for Rejection / Additional Info Needed:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="e.g. 501(c)(3) tax exemption document expired..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{ fontSize: '0.84rem' }}
              />
            </Form.Group>
            <div className="mt-2 text-end">
              <Button size="sm" variant="danger" onClick={handleConfirmReject}>
                Confirm Rejection
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
        <Button
          variant="success"
          size="sm"
          style={{ background: '#1B4D3E', borderColor: '#1B4D3E' }}
          onClick={() => onApprove && onApprove(user)}
        >
          <FiCheckCircle className="me-1" /> Approve NGO Verification
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setShowRejectInput(!showRejectInput)}
        >
          <FiXCircle className="me-1" /> Reject Application
        </Button>

        <Button variant="secondary" size="sm" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NGOVerifyModal;
