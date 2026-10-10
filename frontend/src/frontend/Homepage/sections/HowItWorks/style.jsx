import styled from "styled-components";

export const HowWrapper = styled.section`
  padding: 100px 0;
  background-color: #FFFFFF;

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
  max-width: 680px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin: 0 auto 24px;
  }

  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.08);
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
    font-size: 2.5rem;
    font-weight: 600;
    color: #174A3A;
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
    color: #556B64;
    line-height: 1.6;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  position: relative;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const StepCard = styled.div`
  background: #F8F5ED;
  border-radius: 24px;
  padding: 32px 24px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: 18px 16px;
    border-radius: 18px;
  }

  &:hover {
    transform: translateY(-5px);
    background: #FFFFFF;
    box-shadow: 0 16px 36px rgba(23, 74, 58, 0.08);
    border-color: rgba(46, 125, 91, 0.25);
  }

  .step-num {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.1rem;
    font-weight: 800;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.1);
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 0.88rem;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      margin-bottom: 10px;
    }
  }

  .step-icon {
    font-size: 2rem;
    color: #174A3A;
    margin-bottom: 16px;
    display: flex;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 8px;
    }
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 10px;

    @media (max-width: 768px) {
      font-size: 1.0rem;
      margin-bottom: 4px;
    }
  }

  p {
    font-size: 0.92rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0 0 18px;
    flex-grow: 1;

    @media (max-width: 768px) {
      font-size: 0.78rem;
      margin-bottom: 12px;
    }
  }

  .time-badge {
    font-size: 0.78rem;
    font-weight: 700;
    color: #174A3A;
    background: rgba(23, 74, 58, 0.06);
    padding: 6px 12px;
    border-radius: 8px;
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 6px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 8px;
    }
  }
`;
