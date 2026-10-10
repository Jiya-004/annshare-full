import styled from "styled-components";

export const FAQWrapper = styled.section`
  padding: 100px 0 120px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 40px 0 50px;
  }
`;

export const Container = styled.div`
  max-width: 1000px;
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
    margin: 0 auto 20px;
  }

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
    margin-bottom: 14px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 10px;
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
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }
  }
`;

export const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const AccordionItem = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  overflow: hidden;
  transition: all 0.25s ease;

  @media (max-width: 768px) {
    border-radius: 14px;
  }

  &.open {
    border-color: #2E7D5B;
    box-shadow: 0 8px 24px rgba(23, 74, 58, 0.08);
  }

  .question-btn {
    width: 100%;
    padding: 22px 28px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    text-align: left;

    @media (max-width: 768px) {
      padding: 14px 16px;
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;
      line-height: 1.4;

      @media (max-width: 768px) {
        font-size: 0.88rem;
      }
    }

    .icon-toggle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #F8F5ED;
      color: #174A3A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;

      @media (max-width: 768px) {
        width: 26px;
        height: 26px;
        font-size: 0.9rem;
      }

      &.rotated {
        transform: rotate(180deg);
        background: #174A3A;
        color: #FFFFFF;
      }
    }
  }

  .answer-panel {
    padding: 0 28px 24px;
    font-size: 0.96rem;
    color: #556B64;
    line-height: 1.65;

    @media (max-width: 768px) {
      padding: 0 16px 14px;
      font-size: 0.78rem;
      line-height: 1.5;
    }
  }
`;
