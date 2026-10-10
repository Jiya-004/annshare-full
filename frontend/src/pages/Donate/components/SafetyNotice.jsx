import React from "react";
import styled from "styled-components";
import { IoShieldCheckmark, IoCheckmarkCircle } from "react-icons/io5";

const NoticeCard = styled.div`
  background: #F4F7F5;
  border-radius: 14px;
  padding: 16px 18px;
  border: 1px solid rgba(46, 125, 91, 0.18);
  margin-top: 8px;

  @media (max-width: 768px) {
    padding: 12px 10px;
    border-radius: 12px;
  }

  .notice-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;

    .shield-icon {
      color: #2E7D5B;
      font-size: 1.15rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    h4 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 0.92rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.84rem;
      }
    }
  }

  p {
    font-size: 0.8rem;
    color: #556B64;
    line-height: 1.45;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 0.74rem;
      margin-bottom: 8px;
    }
  }

  .checklist-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;

    @media (max-width: 580px) {
      grid-template-columns: 1fr;
      gap: 6px;
    }

    .check-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.78rem;
      color: #174A3A;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 0.72rem;
      }

      svg {
        color: #2E7D5B;
        font-size: 0.95rem;
        flex-shrink: 0;

        @media (max-width: 768px) {
          font-size: 0.85rem;
        }
      }
    }
  }
`;

export default function SafetyNotice() {
  return (
    <NoticeCard>
      <div className="notice-header">
        <IoShieldCheckmark className="shield-icon" />
        <h4>Before you share</h4>
      </div>
      <p>
        Please ensure the surplus food is wholesome, safe for community redistribution, and properly stored.
      </p>

      <div className="checklist-grid">
        <div className="check-item">
          <IoCheckmarkCircle />
          <span>Suitable for human consumption</span>
        </div>
        <div className="check-item">
          <IoCheckmarkCircle />
          <span>Kept at safe storage temperature</span>
        </div>
        <div className="check-item">
          <IoCheckmarkCircle />
          <span>Clearly labeled where necessary</span>
        </div>
        <div className="check-item">
          <IoCheckmarkCircle />
          <span>Accurate pickup window provided</span>
        </div>
      </div>
    </NoticeCard>
  );
}
