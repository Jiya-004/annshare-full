import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 100px 0;
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

export const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;

  .image-box {
    position: relative;
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(23, 74, 58, 0.12);
    border: 4px solid #FFFFFF;
    height: 480px;

    @media (max-width: 768px) {
      height: 260px;
      border-radius: 20px;
      border-width: 2px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  .floating-cert-badge {
    position: absolute;
    top: 24px;
    left: 24px;
    background: rgba(23, 74, 58, 0.9);
    backdrop-filter: blur(10px);
    color: #FFFFFF;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .monthly-impact-card {
    position: absolute;
    bottom: -25px;
    right: -20px;
    background: #FFFFFF;
    border-radius: 20px;
    padding: 20px 24px;
    box-shadow: 0 16px 36px rgba(23, 74, 58, 0.15);
    border: 1px solid rgba(23, 74, 58, 0.08);
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: 280px;

    @media (max-width: 540px) {
      right: 10px;
      bottom: -15px;
      padding: 16px;
    }

    .icon-circle {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(46, 125, 91, 0.12);
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      flex-shrink: 0;
    }

    .impact-text {
      .num {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 1.35rem;
        font-weight: 800;
        color: #174A3A;
        line-height: 1.1;
      }
      .lbl {
        font-size: 0.78rem;
        color: #66756F;
        margin-top: 3px;
        font-weight: 600;
      }
    }
  }
`;

export const TextContent = styled.div`
  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.1);
    padding: 6px 16px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 12px;
      margin-bottom: 10px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.5rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.25;
    margin: 0 0 18px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 8px;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  .desc {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.65;
    margin: 0 0 28px;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      line-height: 1.45;
      margin-bottom: 18px;
    }
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;

    @media (max-width: 768px) {
      gap: 12px;
      margin-bottom: 24px;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;

      @media (max-width: 768px) {
        gap: 10px;
      }

      .check-icon {
        color: #2E7D5B;
        font-size: 1.35rem;
        margin-top: 2px;
        flex-shrink: 0;

        @media (max-width: 768px) {
          font-size: 1.1rem;
        }
      }

      .text-block {
        h4 {
          font-family: var(--font-display, 'Poppins', sans-serif);
          font-size: 1.05rem;
          font-weight: 600;
          color: #174A3A;
          margin: 0 0 4px;

          @media (max-width: 768px) {
            font-size: 0.9rem;
            margin-bottom: 2px;
          }
        }
        p {
          font-size: 0.9rem;
          color: #66756F;
          line-height: 1.5;
          margin: 0;

          @media (max-width: 768px) {
            font-size: 0.78rem;
          }
        }
      }
    }
  }

  .btn-partner {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #174A3A;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 1rem;
    padding: 16px 32px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(23, 74, 58, 0.25);
    transition: all 0.25s ease;

    @media (max-width: 768px) {
      font-size: 0.84rem;
      padding: 10px 20px;
      gap: 6px;
    }

    &:hover {
      background: #2E7D5B;
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(46, 125, 91, 0.35);
    }
  }
`;
