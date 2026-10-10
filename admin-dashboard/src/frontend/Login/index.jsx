import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiArrowRight,
  FiShield
} from 'react-icons/fi';
import { loginAdmin } from '../../services/adminService';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F4F6F3;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(23, 63, 53, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(40, 98, 77, 0.05) 0%, transparent 40%);
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #12201B;
`;

const LoginCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E2E8E4;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  padding: 40px 36px;
  box-shadow: 0 12px 36px rgba(18, 32, 27, 0.06), 0 2px 6px rgba(18, 32, 27, 0.03);
  animation: ${fadeIn} 0.35s ease-out;

  @media (max-width: 480px) {
    padding: 32px 24px;
  }
`;

const BrandHeader = styled.div`
  text-align: center;
  margin-bottom: 28px;

  .logo-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #173F35;
    color: #FFFFFF;
    font-size: 1.5rem;
    margin-bottom: 16px;
    box-shadow: 0 6px 16px rgba(23, 63, 53, 0.25);
  }

  .badge-pill {
    display: inline-block;
    background: #E8F2EC;
    color: #1E6B52;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 1.45rem;
    font-weight: 700;
    color: #12201B;
    margin: 0 0 6px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 0.88rem;
    color: #66736D;
    margin: 0;
    line-height: 1.45;
  }
`;

const ErrorAlert = styled.div`
  background: #FDF2F2;
  border: 1px solid #F8B4B4;
  color: #9B1C1C;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 0.84rem;
  line-height: 1.4;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  animation: ${shake} 0.35s ease;

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.84rem;
    font-weight: 600;
    color: #12201B;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .input-icon {
    position: absolute;
    left: 14px;
    color: #788780;
    font-size: 1.05rem;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  input {
    width: 100%;
    height: 46px;
    padding: 0 42px 0 42px;
    background: #FFFFFF;
    border: 1.5px solid #D9E2DC;
    border-radius: 10px;
    font-size: 0.92rem;
    color: #12201B;
    font-family: inherit;
    transition: all 0.2s ease;

    &::placeholder {
      color: #9AA8A1;
    }

    &:focus {
      outline: none;
      border-color: #173F35;
      box-shadow: 0 0 0 3px rgba(23, 63, 53, 0.12);
    }
  }

  .toggle-pwd {
    position: absolute;
    right: 12px;
    background: transparent;
    border: none;
    color: #788780;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    transition: color 0.15s ease;

    &:hover {
      color: #12201B;
    }
  }

  &:focus-within .input-icon {
    color: #173F35;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  background: #173F35;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 0.94rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(23, 63, 53, 0.2);

  &:hover:not(:disabled) {
    background: #205346;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(23, 63, 53, 0.28);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #FFFFFF;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginAdmin(email.trim(), password.trim());
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <BrandHeader>
          <div className="logo-box">
            <FiShield />
          </div>
          <div>
            <span className="badge-pill">Admin Portal</span>
          </div>
          <h1>Sign in to Dashboard</h1>
          <p>Enter your authorized credentials to access the ANNShare operations portal.</p>
        </BrandHeader>

        {error && (
          <ErrorAlert>
            <FiAlertCircle />
            <span>{error}</span>
          </ErrorAlert>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="admin-email">Email Address</label>
            <InputWrapper>
              <FiMail className="input-icon" />
              <input
                id="admin-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <label htmlFor="admin-password">Password</label>
            <InputWrapper>
              <FiLock className="input-icon" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </InputWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <FiArrowRight />
              </>
            )}
          </SubmitButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}
