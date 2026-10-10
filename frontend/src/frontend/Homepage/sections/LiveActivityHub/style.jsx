import styled from "styled-components";

export const HubWrapper = styled.section`
  padding: 90px 0;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 40px 0;
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

export const HeaderArea = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 50px;

  @media (max-width: 768px) {
    margin: 0 auto 24px;
  }

  .badge {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.1);
    padding: 5px 14px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 10px;
      margin-bottom: 8px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.4rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 6px;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }
  }
`;

export const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 32px;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const MapVisualCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 8px 30px rgba(23, 74, 58, 0.06);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 440px;
  position: relative;
  overflow: hidden;

  .map-grid-bg {
    position: absolute;
    inset: 0;
    background-color: #F8FAF7;
    background-image:
      radial-gradient(#C6EAD8 1.5px, transparent 1.5px),
      linear-gradient(to right, rgba(23, 74, 58, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(23, 74, 58, 0.04) 1px, transparent 1px);
    background-size: 24px 24px, 60px 60px, 60px 60px;
    z-index: 1;
  }

  .map-content-overlay {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .map-header-pill {
    align-self: flex-start;
    background: #FFFFFF;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 0.84rem;
    font-weight: 700;
    color: #174A3A;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    gap: 8px;

    .live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2E7D5B;
    }
  }

  .pin-node {
    position: absolute;
    background: #174A3A;
    color: #FFFFFF;
    border-radius: 14px;
    padding: 8px 14px;
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 6px 18px rgba(23, 74, 58, 0.25);

    &.donor-pin {
      top: 25%;
      left: 18%;
      background: #174A3A;
    }

    &.ngo-pin {
      bottom: 30%;
      right: 18%;
      background: #2E7D5B;
    }

    &.route-pin {
      top: 52%;
      left: 48%;
      background: #D7A83E;
      color: #1F2933;
    }
  }

  .route-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .map-legend {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0.8rem;
    font-weight: 600;
    color: #174A3A;
    border: 1px solid rgba(23, 74, 58, 0.08);

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot-legend {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      &.c1 { background: #174A3A; }
      &.c2 { background: #D7A83E; }
      &.c3 { background: #2E7D5B; }
    }
  }
`;

export const LiveMetricsCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 8px 30px rgba(23, 74, 58, 0.06);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    border-radius: 20px;
    gap: 16px;
  }

  .card-top {
    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 4px;

      @media (max-width: 768px) {
        font-size: 1.05rem;
      }
    }
    span {
      font-size: 0.82rem;
      color: #66756F;

      @media (max-width: 768px) {
        font-size: 0.74rem;
      }
    }
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;

    @media (max-width: 768px) {
      gap: 10px;
    }

    .metric-box {
      background: #F8F5ED;
      border-radius: 16px;
      padding: 14px 16px;
      border: 1px solid rgba(23, 74, 58, 0.06);

      @media (max-width: 768px) {
        padding: 10px 12px;
        border-radius: 12px;
      }

      .num {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 1.6rem;
        font-weight: 800;
        color: #174A3A;
        line-height: 1.1;

        @media (max-width: 768px) {
          font-size: 1.22rem;
        }
      }
      .lbl {
        font-size: 0.78rem;
        font-weight: 600;
        color: #556B64;
        margin-top: 4px;

        @media (max-width: 768px) {
          font-size: 0.7rem;
        }
      }
    }
  }

  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(23, 74, 58, 0.08);

    .timeline-title {
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #2E7D5B;

      @media (max-width: 768px) {
        font-size: 0.74rem;
      }
    }

    .step-node {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.88rem;
      color: #174A3A;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 0.78rem;
        gap: 8px;
      }

      .node-bullet {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: rgba(46, 125, 91, 0.14);
        color: #2E7D5B;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        flex-shrink: 0;
      }
    }

    .step-arrow {
      color: #8C9E98;
      font-size: 0.85rem;
      margin-left: 6px;
    }
  }
`;
