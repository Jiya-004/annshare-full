import styled, { keyframes } from "styled-components";

const pulseShimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const FindFoodWrapper = styled.div`
  background-color: #F8F5ED;
  min-height: 100vh;
  padding: 24px 0 80px;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 0 90px;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const pulseLive = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

export const SearchHero = styled.div`
  background: #FFFFFF;
  background-image: 
    radial-gradient(circle at 85% 15%, rgba(46, 125, 91, 0.05), transparent 50%),
    radial-gradient(circle at 15% 85%, rgba(217, 119, 6, 0.03), transparent 50%);
  border-radius: 24px;
  border: 1px solid #E6ECE8;
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.04);
  padding: 34px 28px 24px;
  margin-top: 84px;
  margin-bottom: 22px;
  position: relative;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 960px) {
    padding: 26px 20px 20px;
    margin-top: 104px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    padding: 20px 14px 16px;
    margin-top: 98px;
    border-radius: 16px;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #EAF5EF;
    border: 1px solid rgba(46, 125, 91, 0.2);
    color: #174A3A;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 12px;
    letter-spacing: 0.01em;

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      animation: ${pulseLive} 2s infinite;
    }
  }

  .hero-center-header {
    max-width: 640px;
    margin: 0 auto 20px;

    h1 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 2.1rem;
      font-weight: 700;
      color: #174A3A;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin: 0 0 8px;

      .highlight-text {
        color: #2E7D5B;
        position: relative;
        display: inline-block;
      }

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }

      @media (max-width: 480px) {
        font-size: 1.35rem;
      }
    }

    .hero-subtitle {
      font-size: 0.94rem;
      color: #556B64;
      line-height: 1.5;
      margin: 0;
      max-width: 520px;
      margin: 0 auto;

      @media (max-width: 768px) {
        font-size: 0.85rem;
      }
    }
  }

  .searchbar-wrapper {
    margin: 0 auto;
    max-width: 720px;
    position: relative;
    z-index: 2;
  }

  .quick-chips-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;

    .chips-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #7A8E85;
      margin-right: 2px;
    }

    .chip-btn {
      background: #F8F5ED;
      border: 1px solid rgba(23, 74, 58, 0.1);
      color: #2D4A3E;
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.8rem;
      font-weight: 500;
      padding: 5px 12px;
      border-radius: 999px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      .chip-icon {
        font-size: 0.95rem;
        flex-shrink: 0;
        transition: color 0.2s ease, transform 0.2s ease;

        &.icon-meals {
          color: #D97706;
        }

        &.icon-bakery {
          color: #B45309;
        }

        &.icon-produce {
          color: #16A34A;
        }

        &.icon-today {
          color: #EAB308;
        }
      }

      &:hover {
        background: #FFFFFF;
        border-color: #2E7D5B;
        color: #174A3A;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(23, 74, 58, 0.08);

        .chip-icon {
          transform: scale(1.08);
        }
      }

      &.active {
        background: #174A3A;
        border-color: #174A3A;
        color: #FFFFFF;
        font-weight: 600;

        .chip-icon {
          color: #A3E7C9;
        }
      }
    }

    @media (max-width: 640px) {
      gap: 6px;
      margin-top: 12px;

      .chips-label {
        width: 100%;
        text-align: center;
        margin-bottom: 2px;
      }

      .chip-btn {
        font-size: 0.75rem;
        padding: 4px 10px;
      }
    }
  }
`;

export const MarketplaceLayout = styled.div`
 
  gap: 24px;
  align-items: start;
  margin-top: 18px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const ListingsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const ListingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);

  @media (max-width: 768px) {
    gap: 10px;
    padding-bottom: 10px;
  }

  .heading-group {
    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 2px;

      @media (max-width: 768px) {
        font-size: 1.05rem;
      }

      @media (max-width: 480px) {
        font-size: 0.96rem;
      }
    }
    .count-badge {
      font-size: 0.84rem;
      color: #66756F;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 0.74rem;
      }
    }
  }

  .sort-group {
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
      gap: 6px;
    }

    span {
      font-size: 0.84rem;
      color: #66756F;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 0.74rem;
      }
    }

    select {
      background: #FFFFFF;
      border: 1px solid rgba(23, 74, 58, 0.14);
      border-radius: 10px;
      padding: 6px 12px;
      font-size: 0.86rem;
      font-weight: 600;
      color: #174A3A;
      cursor: pointer;
      outline: none;

      @media (max-width: 768px) {
        font-size: 0.76rem;
        padding: 4px 8px;
        border-radius: 8px;
      }

      &:focus {
        border-color: #2E7D5B;
      }
    }
  }
`;

export const TrustBanner = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(46, 125, 91, 0.12);
  border-radius: 12px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(23, 74, 58, 0.02);

  @media (max-width: 768px) {
    padding: 6px 10px;
    gap: 6px;
    border-radius: 10px;
  }

  .trust-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #174A3A;

    @media (max-width: 768px) {
      font-size: 0.72rem;
    }

    svg {
      color: #2E7D5B;
      font-size: 1rem;

      @media (max-width: 768px) {
        font-size: 0.86rem;
      }
    }
  }

  .trust-pills {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.78rem;
    color: #4A5B55;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      gap: 8px;
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;

      svg {
        color: #2E7D5B;
        font-size: 0.88rem;

        @media (max-width: 768px) {
          font-size: 0.78rem;
        }
      }
    }
  }
`;

export const StickyFilterWrapper = styled.div`
  position: sticky;
  top: 70px;
  z-index: 80;
  background: rgba(248, 245, 237, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 8px 0;
  margin-top: 8px;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    top: 60px;
    padding: 6px 0;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
`;

export const MapColumnWrapper = styled.div`
  position: sticky;
  top: 132px;
  height: calc(100vh - 152px);
  min-height: 480px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 8px 24px rgba(23, 74, 58, 0.06);
  background: #FFFFFF;

  @media (max-width: 1080px) {
    display: ${({ $showOnMobile }) => ($showOnMobile ? "block" : "none")};
    position: fixed;
    inset: 0;
    top: 70px;
    height: calc(100vh - 70px);
    z-index: 1000;
    border-radius: 0;
  }
`;

export const MobileMapToggleBtn = styled.button`
  display: none;

  @media (max-width: 1080px) {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    background: #174A3A;
    color: #FFFFFF;
    border: none;
    border-radius: 999px;
    padding: 12px 24px;
    font-size: 0.92rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #2E7D5B;
      transform: translateX(-50%) translateY(-2px);
    }
  }
`;
