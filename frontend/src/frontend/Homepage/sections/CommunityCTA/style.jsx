import styled from "styled-components";

export const CTAWrapper = styled.section`
  padding: 80px 0;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    padding: 35px 0;
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

export const BannerCard = styled.div`
  background: #174A3A;
  border-radius: 36px;
  padding: 70px 48px;
  color: #FFFFFF;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(23, 74, 58, 0.2);

  @media (max-width: 768px) {
    padding: 32px 18px;
    border-radius: 22px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.35) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(215, 168, 62, 0.2) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    pointer-events: none;
  }

  .content-inner {
    position: relative;
    z-index: 2;
    max-width: 720px;
    margin: 0 auto;
  }

  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #D7A83E;
    background: rgba(215, 168, 62, 0.15);
    padding: 6px 16px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 12px;
      margin-bottom: 10px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.8rem;
    font-weight: 600;
    color: #F8F5ED;
    line-height: 1.2;
    margin: 0 0 18px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 10px;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1.15rem;
    color: #C6EAD8;
    line-height: 1.6;
    margin: 0 0 36px;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      margin-bottom: 20px;
    }
  }

  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 10px;
    }

    button {
      padding: 16px 32px;
      border-radius: 999px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s ease;

      @media (max-width: 768px) {
        font-size: 0.82rem;
        padding: 10px 20px;
        gap: 6px;
      }
    }

    .btn-donate {
      background: #2E7D5B;
      color: #FFFFFF;
      border: none;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

      &:hover {
        background: #38956e;
        transform: translateY(-2px);
      }
    }

    .btn-need {
      background: transparent;
      color: #F8F5ED;
      border: 2px solid rgba(248, 245, 237, 0.4);

      &:hover {
        background: rgba(248, 245, 237, 0.1);
        border-color: #F8F5ED;
        transform: translateY(-2px);
      }
    }
  }
`;
