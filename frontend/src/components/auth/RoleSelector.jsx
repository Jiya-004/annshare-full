import React from "react";
import styled from "styled-components";
import { FaHandshake } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";

const SelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #F3F4F1;
  padding: 5px;
  border-radius: 16px;
  gap: 6px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  margin-bottom: 22px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 4px;
    border-radius: 14px;
    gap: 4px;
    margin-bottom: 14px;
  }
`;

const RolePill = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 12px 18px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: ${(props) => (props.$isActive ? "700" : "600")};
  border: none;
  cursor: pointer;
  background: ${(props) => (props.$isActive ? "#174A3A" : "transparent")};
  color: ${(props) => (props.$isActive ? "#FFFFFF" : "#556B64")};
  box-shadow: ${(props) =>
    props.$isActive
      ? "0 4px 12px rgba(23, 74, 58, 0.22)"
      : "none"};
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  position: relative;
  z-index: 2;

  * {
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 9px 12px;
    font-size: 0.84rem;
    border-radius: 10px;
    gap: 6px;
  }

  &:hover {
    color: ${(props) => (props.$isActive ? "#FFFFFF" : "#174A3A")};
    background: ${(props) => (props.$isActive ? "#174A3A" : "rgba(23, 74, 58, 0.05)")};
  }

  .role-icon {
    font-size: 1.18rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, color 0.2s ease;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .ngo-icon {
    color: ${(props) => (props.$isActive ? "#A7F3D0" : "#2E7D5B")};
  }

  .donor-icon {
    color: ${(props) => (props.$isActive ? "#FCA5A5" : "#E11D48")};
  }

  &:hover .role-icon {
    transform: scale(1.12);
  }
`;

export const RoleSelector = ({ selectedRole, onSelectRole }) => {
  return (
    <SelectorContainer role="tablist" aria-label="Select role">
      <RolePill
        type="button"
        role="tab"
        aria-selected={selectedRole === "ngo"}
        $isActive={selectedRole === "ngo"}
        onClick={() => onSelectRole("ngo")}
      >
        <span className="role-icon ngo-icon">
          <FaHandshake />
        </span>
        <span>NGO</span>
      </RolePill>

      <RolePill
        type="button"
        role="tab"
        aria-selected={selectedRole === "donor"}
        $isActive={selectedRole === "donor"}
        onClick={() => onSelectRole("donor")}
      >
        <span className="role-icon donor-icon">
          <IoHeart />
        </span>
        <span>Donor</span>
      </RolePill>
    </SelectorContainer>
  );
};

export default RoleSelector;
