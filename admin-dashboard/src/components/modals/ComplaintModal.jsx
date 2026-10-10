import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { FiMessageSquare, FiUser, FiCalendar, FiSend } from 'react-icons/fi';
import StatusBadge from '../StatusBadge';

const ComplaintModal = ({ show, onHide, complaint, onSave }) => {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('In Review');

  useEffect(() => {
    if (complaint) {
      setResponse(complaint.response || '');
      setStatus(complaint.status || 'In Review');
    }
  }, [complaint, show]);

  if (!complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(complaint.id, response, status);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.15rem' }} className="d-flex align-items-center gap-2">
          <FiMessageSquare style={{ color: '#1B4D3E' }} />
          Ticket #{complaint.id} - {complaint.subject}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body style={{ padding: '24px' }}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <Badge bg={complaint.priority === 'High' ? 'danger' : 'warning'}>Priority: {complaint.priority}</Badge>
              <Badge bg="secondary">{complaint.type}</Badge>
            </div>
            <StatusBadge status={complaint.status} />
          </div>

          <div className="p-3 rounded mb-4" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
            <div className="d-flex align-items-center justify-content-between mb-2" style={{ fontSize: '0.84rem', color: '#6B7280' }}>
              <span><FiUser className="me-1" /> Reported by: <strong>{complaint.userName}</strong> ({complaint.userRole})</span>
              <span><FiCalendar className="me-1" /> {complaint.date}</span>
            </div>
            <h6 style={{ fontWeight: 700, color: '#111827', marginBottom: '6px' }}>{complaint.subject}</h6>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#374151' }}>{complaint.description}</p>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Update Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ fontSize: '0.88rem' }}
            >
              <option value="Open">Open</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Admin Response / Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter official resolution or response to user..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              style={{ fontSize: '0.88rem' }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
          <Button type="submit" variant="success" size="sm" style={{ background: '#1B4D3E', borderColor: '#1B4D3E' }}>
            <FiSend className="me-1" /> Update Ticket Response
          </Button>
          <Button variant="secondary" size="sm" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ComplaintModal;
