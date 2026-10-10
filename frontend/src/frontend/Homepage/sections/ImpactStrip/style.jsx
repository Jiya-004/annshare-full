import styled from "styled-components";

export const StripWrapper = styled.section`
  width: 100%;
  padding: 34px 0;
  background: #173F35;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 18px;
    align-items: center;
    padding: 2px 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;

  @media (min-width: 1025px) {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: -16px;
      top: 15%;
      height: 70%;
      width: 1px;
      background: rgba(255, 255, 255, 0.12);
    }
  }

  @media (max-width: 768px) {
    flex-shrink: 0;
    gap: 10px;
    padding-right: 18px;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 15%;
      height: 70%;
      width: 1px;
      background: rgba(255, 255, 255, 0.12);
    }
  }
`;

export const IconBadge = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: ${({ $bg }) => $bg || "rgba(255, 255, 255, 0.08)"};
  color: ${({ $color }) => $color || "#A3E7C9"};
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    font-size: 1rem;
  }
`;

export const StatText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  .stat-number {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.55rem;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 1.15;
    letter-spacing: -0.015em;

    @media (max-width: 768px) {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.1;
    }
  }

  .stat-label {
    font-size: 0.86rem;
    font-weight: 600;
    color: #D2E3DB;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 0.72rem;
      font-weight: 600;
    }
  }

  .sub-note {
    font-size: 0.74rem;
    color: #8FA89C;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 0.62rem;
    }
  }
`;

