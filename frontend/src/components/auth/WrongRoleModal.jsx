import React from "react";
import styled, { keyframes } from "styled-components";
import { IoClose, IoWarningOutline, IoArrowForward, IoHeart } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 54, 43, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease-out forwards;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  width: 100%;
  max-width: 440px;
  padding: 32px 28px 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
  position: relative;
  text-align: center;
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 20px 20px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 22px 16px 18px;
    border-radius: 18px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(23, 74, 58, 0.06);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #174A3A;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(23, 74, 58, 0.12);
  }
`;

const IconCircle = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  margin: 0 auto 16px;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
    margin-bottom: 12px;
  }
`;

const Title = styled.h3`
  font-family: var(--font-display, 'Poppins', sans-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: #174A3A;
  margin: 0 0 8px;

  @media (max-width: 768px) {
    font-size: 1.18rem;
    margin-bottom: 6px;
  }
`;

const Description = styled.p`
  font-size: 0.92rem;
  color: #556B64;
  margin: 0 0 20px;
  line-height: 1.45;

  @media (max-width: 768px) {
    font-size: 0.82rem;
    margin-bottom: 14px;
  }
`;

const CurrentRoleBadge = styled.div`
  display: inline-block;
  background: #F4F6F4;
  color: #71827B;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.74rem;
    padding: 3px 10px;
    margin-bottom: 16px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const SwitchButton = styled.button`
  width: 100%;
  height: 46px;
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-size: 0.94rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(23, 74, 58, 0.2);
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    height: 42px;
    font-size: 0.86rem;
    border-radius: 10px;
  }

  &:hover {
    background: #0F3327;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled.button`
  width: 100%;
  height: 42px;
  background: transparent;
  color: #71827B;
  border: 1px solid rgba(23, 74, 58, 0.12);
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    height: 38px;
    font-size: 0.82rem;
    border-radius: 10px;
  }

  &:hover {
    background: #FAFBF9;
    color: #174A3A;
  }
`;

export const WrongRoleModal = () => {
  const { role, wrongRoleState, closeWrongRoleModal, switchRole } = useAuth();

  if (!wrongRoleState.isOpen) return null;

  const requiredRole = wrongRoleState.requiredRole; // "ngo" or "donor"
  const isTargetNGO = requiredRole === "ngo";

  const title = isTargetNGO ? "NGO Account Required" : "Donor Account Required";
  const desc = isTargetNGO
    ? "This action is available to verified NGO partners."
    : "This action is available to registered food donors.";
  const buttonText = isTargetNGO ? "Switch to NGO" : "Switch to Donor";

  const handleSwitch = () => {
    switchRole(requiredRole);
  };

  return (
    <Overlay onClick={closeWrongRoleModal} role="dialog" aria-modal="true">
      <Card onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeWrongRoleModal} aria-label="Cancel">
          <IoClose />
        </CloseBtn>

        <IconCircle>
          <IoWarningOutline />
        </IconCircle>

        <Title>{title}</Title>
        <Description>{desc}</Description>

        <CurrentRoleBadge style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          Currently signed in as:{" "}
          <strong style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            {role === "ngo" ? (
              <>
                <FaHandshake style={{ color: "#2E7D5B" }} /> NGO
              </>
            ) : (
              <>
                <IoHeart style={{ color: "#E11D48" }} /> Donor
              </>
            )}
          </strong>
        </CurrentRoleBadge>

        <ButtonRow>
          <SwitchButton type="button" onClick={handleSwitch}>
            <span>{buttonText}</span>
            <IoArrowForward />
          </SwitchButton>
          <CancelButton type="button" onClick={closeWrongRoleModal}>
            Cancel
          </CancelButton>
        </ButtonRow>
      </Card>
    </Overlay>
  );
};

export default WrongRoleModal;
