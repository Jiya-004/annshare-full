import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmModal = ({ show, onHide, title = 'Confirm Action', message, confirmText = 'Confirm', confirmVariant = 'danger', onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '18px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.15rem' }} className="d-flex align-items-center gap-2">
          <FiAlertTriangle style={{ color: confirmVariant === 'danger' ? '#DC2626' : '#D97706' }} />
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '24px', fontSize: '0.9rem', color: '#374151' }}>
        <p style={{ margin: 0 }}>{message || 'Are you sure you want to proceed with this action?'}</p>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
        <Button
          variant={confirmVariant}
          size="sm"
          onClick={() => {
            if (onConfirm) onConfirm();
            onHide();
          }}
        >
          {confirmText}
        </Button>
        <Button variant="secondary" size="sm" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
