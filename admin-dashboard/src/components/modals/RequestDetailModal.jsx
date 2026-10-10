import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FiFileText, FiUser, FiPackage, FiCalendar, FiCheck, FiX } from 'react-icons/fi';
import StatusBadge from '../StatusBadge';

const RequestDetailModal = ({ show, onHide, request, onAction }) => {
  if (!request) return null;

  return (
    <Modal show={show} onHide={onHide} centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.15rem' }} className="d-flex align-items-center gap-2">
          <FiFileText style={{ color: '#1B4D3E' }} />
          Food Request #{request.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '24px' }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <Badge bg="secondary">{request.requestedQuantity}</Badge>
          <StatusBadge status={request.status} />
        </div>

        <h5 style={{ fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
          {request.foodName}
        </h5>

        <div className="d-flex flex-column gap-2 mb-3" style={{ fontSize: '0.86rem', color: '#374151' }}>
          <div><FiUser className="me-2 text-secondary" /> <strong>Receiver / NGO:</strong> {request.receiverName}</div>
          <div><FiPackage className="me-2 text-secondary" /> <strong>Food Donor:</strong> {request.donorName}</div>
          <div><FiCalendar className="me-2 text-secondary" /> <strong>Request Date:</strong> {request.requestDate}</div>
        </div>

        {request.reason && (
          <div className="p-3 rounded mb-3" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '0.84rem' }}>
            <strong style={{ color: '#111827' }}>Stated Need / Reason:</strong>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>{request.reason}</p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
        {request.status === 'Pending' && (
          <>
            <Button variant="success" size="sm" style={{ background: '#1B4D3E', borderColor: '#1B4D3E' }} onClick={() => onAction && onAction('Approved', request)}>
              <FiCheck className="me-1" /> Approve Request
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onAction && onAction('Rejected', request)}>
              <FiX className="me-1" /> Reject Request
            </Button>
          </>
        )}
        <Button variant="secondary" size="sm" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestDetailModal;
