import React from 'react';
import { Modal, Button, Badge, Row, Col, ListGroup } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield, FiCheckCircle, FiFileText } from 'react-icons/fi';
import StatusBadge from '../StatusBadge';

const UserDetailModal = ({ show, onHide, user, onAction }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.2rem' }} className="d-flex align-items-center gap-2">
          <FiUser style={{ color: '#1B4D3E' }} />
          User Profile Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '24px' }}>
        <Row className="g-4 mb-4">
          <Col md={6}>
            <div className="p-3 rounded" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#1B4D3E',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {user.avatarText || 'US'}
                </div>
                <div>
                  <h5 style={{ margin: 0, fontWeight: 700, color: '#111827' }}>{user.name}</h5>
                  <Badge bg="secondary" style={{ fontSize: '0.72rem', marginTop: '4px' }}>{user.role}</Badge>
                </div>
              </div>

              <div className="d-flex flex-column gap-2" style={{ fontSize: '0.86rem', color: '#374151' }}>
                <div><FiMail className="me-2 text-secondary" /> <strong>Email:</strong> {user.email}</div>
                <div><FiPhone className="me-2 text-secondary" /> <strong>Phone:</strong> {user.phone}</div>
                <div><FiMapPin className="me-2 text-secondary" /> <strong>Location:</strong> {user.location}</div>
                <div><FiCalendar className="me-2 text-secondary" /> <strong>Joined:</strong> {user.joinedDate}</div>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-3 rounded" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <h6 style={{ fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Account & Verification</h6>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span style={{ fontSize: '0.86rem', color: '#6B7280' }}>Account Status:</span>
                <StatusBadge status={user.status} />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span style={{ fontSize: '0.86rem', color: '#6B7280' }}>Verification:</span>
                <StatusBadge status={user.verificationStatus} />
              </div>

              <hr style={{ borderColor: '#E5E7EB' }} />

              <h6 style={{ fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Activity Summary</h6>
              {(() => {
                const isDonor = user.role?.toLowerCase() === 'donor';
                return (
                  <>
                    <div className="d-flex justify-content-between" style={{ fontSize: '0.84rem' }}>
                      <span>{isDonor ? 'Total Donations:' : 'Total Requests:'}</span>
                      <strong>{isDonor ? (user.totalDonations ?? 0) : (user.totalRequests ?? 0)}</strong>
                    </div>
                    <div className="d-flex justify-content-between" style={{ fontSize: '0.84rem' }}>
                      <span>Completed Pickups:</span>
                      <strong style={{ color: '#1E8449' }}>{isDonor ? (user.completedDonations ?? 0) : (user.completedPickups ?? 0)}</strong>
                    </div>
                  </>
                );
              })()}
            </div>
          </Col>
        </Row>

        {user.docs && user.docs.length > 0 && (
          <div className="mb-3">
            <h6 style={{ fontWeight: 700, color: '#111827' }} className="d-flex align-items-center gap-2 mb-2">
              <FiShield style={{ color: '#1B4D3E' }} /> Submitted Documents
            </h6>
            <ListGroup variant="flush" style={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              {user.docs.map((doc, idx) => (
                <ListGroup.Item key={idx} className="d-flex align-items-center justify-content-between py-2" style={{ fontSize: '0.84rem' }}>
                  <div className="d-flex align-items-center gap-2">
                    <FiFileText className="text-secondary" />
                    <span>{doc.name}</span>
                  </div>
                  <StatusBadge status={doc.status} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
        {user.status === 'Active' ? (
          <Button variant="outline-warning" size="sm" onClick={() => onAction && onAction('suspend', user)}>
            Suspend Account
          </Button>
        ) : (
          <Button variant="outline-success" size="sm" onClick={() => onAction && onAction('activate', user)}>
            Activate Account
          </Button>
        )}

        {user.verificationStatus !== 'Verified' && (
          <Button variant="success" size="sm" style={{ background: '#1B4D3E', borderColor: '#1B4D3E' }} onClick={() => onAction && onAction('verify', user)}>
            <FiCheckCircle className="me-1" /> Verify User
          </Button>
        )}

        <Button variant="outline-danger" size="sm" onClick={() => onAction && onAction('delete', user)}>
          Delete User
        </Button>
        <Button variant="secondary" size="sm" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;
