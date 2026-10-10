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
  border-radius: 28px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 14px 40px rgba(23, 74, 58, 0.04);
  padding: 26px 36px 22px;
  margin-top: 86px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #174A3A 0%, #2E7D5B 45%, #10B981 100%);
  }

  &::after {
    content: "";
    position: absolute;
    right: -40px;
    top: -40px;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: 960px) {
    padding: 20px 18px 18px;
    margin-top: 118px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px 14px 14px;
    margin-top: 118px;
    border-radius: 18px;
  }

  .hero-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 18px;

    @media (max-width: 768px) {
      gap: 8px;
      margin-bottom: 12px;
    }
  }

  .live-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #E8F5E9;
    color: #2E7D5B;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    box-shadow: 0 2px 6px rgba(46, 125, 91, 0.08);

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 10px;
      gap: 6px;
      letter-spacing: 0.03em;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      display: inline-block;
      animation: ${pulseLive} 2s infinite;

      @media (max-width: 768px) {
        width: 6px;
        height: 6px;
      }
    }
  }

  .hero-meta-badges {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 6px;
    }
  }

  .hero-trust-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #556B64;
    background: #F8F5ED;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid rgba(23, 74, 58, 0.06);

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 3px 8px;
      gap: 4px;
    }

    svg {
      color: #2E7D5B;
      font-size: 0.92rem;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  }

  .hero-content-center {
    text-align: center;
    max-width: 740px;
    margin: 0 auto 20px;

    @media (max-width: 768px) {
      margin: 0 auto 12px;
    }

    h1 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 2.1rem;
      font-weight: 700;
      color: #174A3A;
      line-height: 1.22;
      letter-spacing: -0.02em;
      margin: 0;

      .highlight-text {
        background: linear-gradient(135deg, #174A3A 0%, #2E7D5B 50%, #10B981 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
      }

      @media (max-width: 768px) {
        font-size: 1.35rem;
        line-height: 1.25;
      }

      @media (max-width: 480px) {
        font-size: 1.22rem;
      }
    }
  }

  .searchbar-wrapper {
    margin: 0 auto 4px;
    max-width: 880px;
    position: relative;
    z-index: 2;
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
