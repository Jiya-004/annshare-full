import styled from "styled-components";

export const DetailsWrapper = styled.div`
  background-color: #F8F5ED;
  min-height: 100vh;
  padding: 102px 0 90px;
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 992px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const BackNav = styled.button`
  background: transparent;
  border: none;
  color: #174A3A;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 6px 0;
  transition: all 0.2s ease;

  &:hover {
    color: #2E7D5B;
    transform: translateX(-3px);
  }
`;

export const DetailsLayout = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const GalleryCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 14px 36px rgba(23, 74, 58, 0.05);

  .main-image {
    height: 380px;
    width: 100%;
    position: relative;
    background: #EFECE5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .badge-status {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(23, 74, 58, 0.9);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 6px;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2E7D5B;
      }
    }
  }

  .gallery-content {
    padding: 32px;

    @media (max-width: 600px) {
      padding: 24px 20px;
    }

    .category-badge {
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #2E7D5B;
      background: rgba(46, 125, 91, 0.1);
      padding: 4px 12px;
      border-radius: 999px;
      display: inline-block;
      margin-bottom: 12px;
    }

    h1 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 2.1rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 16px;
      line-height: 1.22;

      @media (max-width: 600px) {
        font-size: 1.7rem;
      }
    }

    .description-text {
      font-size: 1rem;
      color: #556B64;
      line-height: 1.65;
      margin: 0 0 28px;
    }

    .safety-block {
      background: #F4F7F5;
      border-radius: 18px;
      padding: 20px;
      border: 1px solid rgba(46, 125, 91, 0.18);
      margin-top: 10px;

      h4 {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 0.96rem;
        font-weight: 600;
        color: #174A3A;
        margin: 0 0 6px;
        display: flex;
        align-items: center;
        gap: 6px;

        svg {
          color: #2E7D5B;
          font-size: 1.1rem;
        }
      }

      p {
        font-size: 0.88rem;
        color: #556B64;
        line-height: 1.55;
        margin: 0;
      }
    }
  }
`;

export const RequestPanelCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  padding: 32px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);
  position: sticky;
  top: 95px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 600px) {
    padding: 24px 20px;
    position: static;
  }

  .panel-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);

    .portions-num {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.8rem;
      font-weight: 700;
      color: #174A3A;
      line-height: 1.1;
    }
    .portions-sub {
      font-size: 0.8rem;
      color: #66756F;
      font-weight: 500;
    }

    .btn-save {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #F8F5ED;
      border: 1px solid rgba(23, 74, 58, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: ${({ $isSaved }) => ($isSaved ? "#E11D48" : "#174A3A")};
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #FFFFFF;
        transform: scale(1.08);
      }
    }
  }

  .partner-card-box {
    background: #F8F5ED;
    border-radius: 16px;
    padding: 16px;
    border: 1px solid rgba(23, 74, 58, 0.06);

    .partner-title {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1rem;
      font-weight: 600;
      color: #174A3A;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;

      svg {
        color: #2E7D5B;
        font-size: 1rem;
      }
    }

    .partner-type {
      font-size: 0.8rem;
      color: #66756F;
    }
  }

  .logistics-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .log-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.88rem;

      svg {
        color: #2E7D5B;
        font-size: 1.15rem;
        margin-top: 2px;
        flex-shrink: 0;
      }

      .log-content {
        .log-label {
          font-weight: 700;
          color: #174A3A;
        }
        .log-sub {
          color: #66756F;
          font-size: 0.82rem;
          margin-top: 1px;
        }
      }
    }
  }

  .btn-request-primary {
    background: #174A3A;
    color: #FFFFFF;
    border: none;
    border-radius: 999px;
    padding: 16px 28px;
    font-size: 0.98rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 6px 20px rgba(23, 74, 58, 0.22);
    transition: all 0.25s ease;

    &:hover {
      background: #2E7D5B;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(46, 125, 91, 0.3);
    }
  }

  .request-note {
    text-align: center;
    font-size: 0.78rem;
    color: #8C9E98;
    line-height: 1.45;
  }
`;
