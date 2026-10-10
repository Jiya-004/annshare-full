import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FiLock, FiMail, FiShield } from 'react-icons/fi';
import { loginAdmin, isAuthenticatedAdmin, subscribeToAdminService } from '../services/adminService';

const LoginOverlay = styled.div`
  min-height: 100vh;
  background: #F7F5F0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  max-width: 440px;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  box-shadow: 0 10px 30px rgba(15, 61, 46, 0.08);
  padding: 36px 30px;
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #EEF8F4;
  color: #174A3A;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
  border: 1px solid #DFF1E9;
`;

const SubmitButton = styled(Button)`
  background: #174A3A;
  border-color: #174A3A;
  color: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover, &:focus {
    background: #0F3D2E;
    border-color: #0F3D2E;
    color: #FFFFFF;
  }
`;

const AdminAuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedAdmin());
  const [email, setEmail] = useState('admin@annshare.org');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      setIsAuthenticated(isAuthenticatedAdmin());
    });
    return unsub;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginAdmin(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Invalid credentials or non-admin account');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginOverlay>
        <StyledCard>
          <div className="text-center mb-4">
            <BrandBadge>
              <FiShield size={15} /> ANNShare Operations Portal
            </BrandBadge>
            <h3 style={{ fontWeight: 800, color: '#174A3A', margin: 0 }}>Admin Session Guard</h3>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '6px' }}>
              Sign in with your verified operations credentials to access the internal dashboard.
            </p>
          </div>

          {error && <Alert variant="danger" style={{ fontSize: '0.82rem', borderRadius: '10px' }}>{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>
                <FiMail size={14} className="me-1" /> Admin Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="admin@annshare.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 14px' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>
                <FiLock size={14} className="me-1" /> Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 14px' }}
              />
            </Form.Group>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Authenticating...
                </>
              ) : (
                <>
                  <FiLock size={16} /> Authenticate Admin Session
                </>
              )}
            </SubmitButton>

            <div className="text-center mt-3" style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
              Default Admin Login: <strong style={{ color: '#374151' }}>admin@annshare.org</strong> / <strong style={{ color: '#374151' }}>admin123</strong>
            </div>
          </Form>
        </StyledCard>
      </LoginOverlay>
    );
  }

  return children;
};

export default AdminAuthGuard;
