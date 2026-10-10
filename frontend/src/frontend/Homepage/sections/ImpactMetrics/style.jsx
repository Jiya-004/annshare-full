import styled from "styled-components";

export const MetricsWrapper = styled.section`
  padding: 100px 0;
  background: #174A3A;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 0;
  }

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.25) 0%, transparent 70%);
    top: -150px;
    right: -100px;
    pointer-events: none;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  z-index: 2;

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
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin: 0 auto 24px;
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
    margin-bottom: 14px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 12px;
      margin-bottom: 8px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.6rem;
    font-weight: 600;
    color: #F8F5ED;
    margin: 0 0 14px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 6px;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: #C6EAD8;
    line-height: 1.6;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }
  }
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 18px 16px;
    border-radius: 18px;
  }

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(215, 168, 62, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }

  .icon-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      margin-bottom: 14px;
    }

    .icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(46, 125, 91, 0.4);
      color: #A3E7C9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;

      @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        font-size: 1.1rem;
        border-radius: 10px;
      }
    }

    .trend {
      font-size: 0.8rem;
      font-weight: 700;
      color: #D7A83E;
      background: rgba(215, 168, 62, 0.12);
      padding: 4px 10px;
      border-radius: 999px;

      @media (max-width: 768px) {
        font-size: 0.72rem;
        padding: 3px 8px;
      }
    }
  }

  .stat-val {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.5rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.1;
    margin-bottom: 6px;

    @media (max-width: 768px) {
      font-size: 1.45rem;
      margin-bottom: 4px;
    }
  }

  .stat-label {
    font-size: 1.05rem;
    font-weight: 600;
    color: #F8F5ED;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      margin-bottom: 4px;
    }
  }

  .stat-desc {
    font-size: 0.88rem;
    color: #B5C9C2;
    line-height: 1.5;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.74rem;
    }
  }
`;
