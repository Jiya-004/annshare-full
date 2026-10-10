import styled from "styled-components";

export const HeroWrapper = styled.section`
  background-color: #F8F5ED;
  padding: 0 0 32px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 0 4px;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 105px 32px 24px;

  @media (max-width: 992px) {
    padding: 100px 24px 20px;
  }

  @media (max-width: 860px) {
    padding: 124px 20px 18px;
  }

  @media (max-width: 480px) {
    padding: 120px 16px 16px;
  }
`;

export const SliderCardWrapper = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(23, 74, 58, 0.08);
  border: 1px solid rgba(23, 74, 58, 0.09);
  background: #FFFFFF;

  @media (max-width: 768px) {
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(23, 74, 58, 0.08);
  }

  .swiper {
    width: 100%;
    height: 450px;
    position: relative;

    @media (max-width: 768px) {
      height: 250px;
    }

    @media (max-width: 480px) {
      height: 220px;
    }
  }

  .swiper-slide {
    display: flex;
    align-items: stretch;
    height: 100%;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 22px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    z-index: 10;
    display: flex !important;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: auto !important;

    .swiper-pagination-bullet {
      width: 9px;
      height: 9px;
      background: rgba(23, 74, 58, 0.35) !important;
      border-radius: 50%;
      margin: 0 !important;
      opacity: 1 !important;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background: rgba(23, 74, 58, 0.7) !important;
      }
    }

    .swiper-pagination-bullet-active {
      width: 30px !important;
      border-radius: 999px !important;
      background: #174A3A !important;
      box-shadow: 0 2px 6px rgba(23, 74, 58, 0.3);
    }
  }
`;

export const SlideCard = styled.div`
  width: 100%;
  height: 450px;
  min-height: 450px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: ${({ $bg }) => $bg || "#F9F6F0"};
  cursor: pointer;

  @media (max-width: 960px) {
    min-height: 450px;
    height: 450px;
  }

  @media (max-width: 768px) {
    min-height: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    min-height: 220px;
    height: 220px;
  }

  /* Right-side hero photograph */
  .slide-bg-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 62%;
    height: 100%;
    object-fit: cover;
    object-position: center right;
    z-index: 1;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);

    @media (max-width: 960px) {
      width: 70%;
    }

    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      object-position: center;
      opacity: 1;
    }
  }

  /* Soft gradient overlay matching reference image */
  .slide-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: ${({ $overlay }) =>
      $overlay ||
      "linear-gradient(90deg, #F9F6F0 0%, #F9F6F0 42%, rgba(249, 246, 240, 0.88) 58%, rgba(249, 246, 240, 0.25) 75%, transparent 100%)"};

    @media (max-width: 768px) {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.22) 100%
      );
    }
  }

  /* Ambient light particle effect */
  .ambient-glow {
    position: absolute;
    top: -50px;
    left: 20%;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(215, 168, 62, 0.18) 0%, transparent 70%);
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      display: none;
    }
  }

  /* Left-aligned Typography and CTA block */
  .slide-content {
    position: relative;
    z-index: 3;
    padding: 60px 60px;
    max-width: 580px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 960px) {
      padding: 44px 40px;
      max-width: 500px;
    }

    @media (max-width: 768px) {
      display: none;
    }

    .eyebrow-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${({ $accentColor }) => $accentColor || "#174A3A"};
      margin-bottom: 14px;
    }

    .slide-headline {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1rem;
      font-weight: 600;
      color: #174A3A;
      line-height: 1.18;
      letter-spacing: -0.02em;
      margin: 0 0 16px;

      @media (max-width: 960px) {
        font-size: 2.3rem;
      }

      @media (max-width: 640px) {
        font-size: 1.95rem;
      }
    }

    .slide-description {
      font-size: 1.05rem;
      color: #556B64;
      line-height: 1.6;
      margin: 0 0 28px;

      @media (max-width: 640px) {
        font-size: 0.95rem;
        margin-bottom: 22px;
      }
    }

    .actions-row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;

      .btn-primary-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background-color: ${({ $ctaBg }) => $ctaBg || "#174A3A"};
        color: #FFFFFF;
        font-family: var(--font-sans, 'Inter', sans-serif);
        font-size: 0.88rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 13px 28px;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        box-shadow: 0 6px 18px rgba(23, 74, 58, 0.2);
        transition: all 0.25s ease;

        &:hover {
          background-color: #2E7D5B;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(46, 125, 91, 0.28);
        }
      }

      .btn-secondary-cta {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background-color: transparent;
        color: #174A3A;
        font-size: 0.92rem;
        font-weight: 600;
        padding: 12px 20px;
        border-radius: 999px;
        border: 1.5px solid rgba(23, 74, 58, 0.2);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: rgba(23, 74, 58, 0.06);
          border-color: #174A3A;
        }
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  pointer-events: auto;

  @media (max-width: 768px) {
    bottom: 14px;
  }
`;

export const PaginationDot = styled.button`
  border: none;
  outline: none;
  padding: 0;
  height: 9px;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  width: ${({ $isActive }) => ($isActive ? "32px" : "9px")};
  background: ${({ $isActive }) =>
    $isActive ? "#174A3A" : "rgba(23, 74, 58, 0.35)"};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 2px 8px rgba(23, 74, 58, 0.35)" : "none"};

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? "#174A3A" : "rgba(23, 74, 58, 0.7)"};
  }

  @media (max-width: 768px) {
    background: ${({ $isActive }) =>
      $isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)"};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }
`;

export const NavArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $prev }) => ($prev ? "left: 18px;" : "right: 18px;")}
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(23, 74, 58, 0.1);
  color: #174A3A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transition: all 0.25s ease;

  ${SliderCardWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #FFFFFF;
    color: #2E7D5B;
    transform: translateY(-50%) scale(1.08);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
