import styled from "styled-components";

export const RoleWrapper = styled.section`
  padding: 80px 0 90px;
  background-color: #F8F5ED;
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 0 50px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 28px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const HeaderArea = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 36px;

  @media (max-width: 768px) {
    margin: 0 auto 22px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: #E8F5E9;
    padding: 6px 16px;
    border-radius: 999px;
    border: 1px solid rgba(46, 125, 91, 0.14);
    box-shadow: 0 2px 6px rgba(46, 125, 91, 0.08);
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 12px;
      margin-bottom: 10px;
      gap: 5px;
    }

    svg {
      font-size: 0.95rem;
      color: #2E7D5B;

      @media (max-width: 768px) {
        font-size: 0.82rem;
      }
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.35rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.22;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.38rem;
      margin-bottom: 8px;
    }

    @media (max-width: 480px) {
      font-size: 1.26rem;
    }
  }

  p {
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.98rem;
    color: #4E675C;
    line-height: 1.55;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      line-height: 1.45;
    }

    @media (max-width: 480px) {
      font-size: 0.78rem;
    }
  }
`;

export const PanelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  align-items: stretch;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ImagePanel = styled.div`
  position: relative;
  height: 460px;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 12px 36px rgba(15, 36, 30, 0.08);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(15, 36, 30, 0.16);

    .panel-image {
      transform: scale(1.025);
    }

    .gradient-overlay {
      background: linear-gradient(
        180deg,
        rgba(15, 36, 30, 0.05) 0%,
        rgba(15, 36, 30, 0.28) 45%,
        rgba(15, 36, 30, 0.92) 100%
      );
    }

    .panel-cta {
      background: #FFFFFF;

      svg {
        transform: translateX(4px);
      }
    }
  }

  @media (max-width: 640px) {
    height: 340px;
    border-radius: 18px;
  }

  .panel-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(25, 31, 29, 0.03) 0%,
      rgba(23, 29, 27, 0.22) 45%,
      rgba(15, 36, 30, 0.88) 100%
    );
    transition: background 0.35s ease;
    z-index: 1;
  }

  .panel-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 36px 34px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 640px) {
      padding: 18px 18px;
    }

    .panel-label {
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 8px;

      @media (max-width: 640px) {
        font-size: 0.65rem;
        margin-bottom: 4px;
      }
    }

    .panel-title {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.75rem;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.25;
      letter-spacing: -0.015em;
      margin: 0 0 8px;
      white-space: pre-line;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

      @media (max-width: 640px) {
        font-size: 1.22rem;
        margin-bottom: 6px;
      }
    }

    .panel-desc {
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.94rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.5;
      margin: 0 0 20px;
      max-width: 440px;

      @media (max-width: 640px) {
        font-size: 0.78rem;
        line-height: 1.4;
        margin-bottom: 14px;
      }
    }

    .panel-cta {
      background: #F8F5ED;
      color: #173F35;
      border: none;
      padding: 10px 22px;
      border-radius: 999px;
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.88rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      transition: background 0.25s ease, transform 0.25s ease;

      @media (max-width: 640px) {
        font-size: 0.78rem;
        padding: 8px 16px;
        gap: 6px;
      }

      svg {
        font-size: 1rem;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

        @media (max-width: 640px) {
          font-size: 0.88rem;
        }
      }
    }
  }
`;

