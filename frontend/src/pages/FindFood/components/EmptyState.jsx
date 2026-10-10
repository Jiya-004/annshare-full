import React from "react";
import styled from "styled-components";
import { IoSearchOutline, IoRefreshOutline } from "react-icons/io5";

const EmptyWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 60px 32px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 1 / -1;
  box-shadow: 0 8px 24px rgba(23, 74, 58, 0.03);

  @media (max-width: 768px) {
    padding: 36px 16px;
    border-radius: 18px;
  }

  .icon-circle {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #F8F5ED;
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    margin-bottom: 20px;
    border: 1px solid rgba(23, 74, 58, 0.08);

    @media (max-width: 768px) {
      width: 52px;
      height: 52px;
      font-size: 1.6rem;
      margin-bottom: 14px;
    }
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.35rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 8px;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 0.94rem;
    color: #66756F;
    max-width: 440px;
    line-height: 1.55;
    margin: 0 0 24px;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 18px;
    }
  }

  .btn-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;

    .btn-clear {
      background: #174A3A;
      color: #FFFFFF;
      border: none;
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      &:hover {
        background: #2E7D5B;
      }
    }

    .btn-nearby {
      background: transparent;
      color: #174A3A;
      border: 1.5px solid rgba(23, 74, 58, 0.2);
      padding: 11px 22px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(23, 74, 58, 0.05);
      }
    }
  }
`;

export default function EmptyState({ onClearFilters, onExploreNearby }) {
  return (
    <EmptyWrapper>
      <div className="icon-circle">
        <IoSearchOutline />
      </div>
      <h3>No food matches your search yet.</h3>
      <p>
        Try expanding your search radius, selecting a different food category, or changing the pickup time window.
      </p>

      <div className="btn-actions">
        <button type="button" className="btn-clear" onClick={onClearFilters}>
          <IoRefreshOutline />
          <span>Clear Filters</span>
        </button>
        <button type="button" className="btn-nearby" onClick={onExploreNearby}>
          <span>Explore All Nearby</span>
        </button>
      </div>
    </EmptyWrapper>
  );
}
