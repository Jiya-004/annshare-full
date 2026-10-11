import styled, { keyframes } from "styled-components";

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
`;

export const DonatePageWrapper = styled.div`
  background-color: #F8F5ED;
  min-height: 100vh;
  padding: 20px 0 70px;

  @media (max-width: 768px) {
    padding: 12px 0 80px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 16px 24px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 14px 18px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
  }
`;

export const IntroHero = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px 30px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 6px 24px rgba(23, 74, 58, 0.04);
  margin-top: 76px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 260px;
    background: radial-gradient(circle at 85% 30%, rgba(46, 125, 91, 0.06), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 18px;
    margin-top: 86px;
    gap: 14px;
  }

  @media (max-width: 768px) {
    margin-top: 96px;
    padding: 16px 14px;
    border-radius: 16px;
    gap: 12px;
  }

  .hero-content {
    max-width: 680px;
    position: relative;
    z-index: 2;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: #E8F5E9;
    padding: 4px 11px;
    border-radius: 999px;
    margin-bottom: 10px;
    box-shadow: 0 1px 4px rgba(46, 125, 91, 0.06);

    @media (max-width: 768px) {
      font-size: 0.65rem;
      padding: 3px 8px;
      margin-bottom: 6px;
      gap: 4px;
    }

    svg {
      font-size: 0.85rem;
      color: #2E7D5B;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.7rem;
    font-weight: 700;
    color: #174A3A;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: 0 0 8px;

    .highlight-text {
      background: linear-gradient(135deg, #174A3A 0%, #2E7D5B 55%, #10B981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      display: inline-block;
    }

    @media (max-width: 768px) {
      font-size: 1.22rem;
      margin-bottom: 6px;
      line-height: 1.25;
    }

    @media (max-width: 480px) {
      font-size: 1.12rem;
    }
  }

  p {
    font-size: 0.88rem;
    color: #556B64;
    max-width: 600px;
    line-height: 1.5;
    margin: 0 0 16px;

    @media (max-width: 768px) {
      font-size: 0.78rem;
      line-height: 1.4;
      margin-bottom: 12px;
    }
  }

  .trust-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 6px;
    }

    .trust-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #174A3A;
      background: #F8F5ED;
      padding: 5px 11px;
      border-radius: 10px;
      border: 1px solid rgba(23, 74, 58, 0.08);
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        font-size: 0.68rem;
        padding: 4px 8px;
        gap: 4px;
        border-radius: 8px;
      }

      svg {
        color: #2E7D5B;
        font-size: 0.95rem;

        @media (max-width: 768px) {
          font-size: 0.8rem;
        }
      }

      &:hover {
        background: #ECEEEA;
        border-color: rgba(46, 125, 91, 0.25);
      }
    }
  }

  /* Right-side quick impact micro-card */
  .hero-metric-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: #FAFBF9;
    border: 1.5px solid rgba(23, 74, 58, 0.1);
    border-radius: 16px;
    padding: 16px 22px;
    min-width: 190px;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(23, 74, 58, 0.03);
    position: relative;
    z-index: 2;

    @media (max-width: 960px) {
      display: none;
    }

    .metric-icon-circle {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #E8F5E9;
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      margin-bottom: 8px;
    }

    .metric-value {
      font-size: 1.35rem;
      font-weight: 800;
      color: #174A3A;
      line-height: 1.1;
      margin-bottom: 3px;
    }

    .metric-label {
      font-size: 0.74rem;
      font-weight: 600;
      color: #71827B;
      margin-bottom: 8px;
    }

    .metric-live-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.68rem;
      font-weight: 700;
      color: #2E7D5B;
      background: #E8F5E9;
      padding: 2px 8px;
      border-radius: 999px;

      .pulse-indicator {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2E7D5B;
        box-shadow: 0 0 0 2px rgba(46, 125, 91, 0.2);
      }
    }
  }
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const FormCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 26px 28px;
  border: 1px solid rgba(23, 74, 58, 0.09);
  box-shadow: 0 8px 24px rgba(23, 74, 58, 0.04);

  @media (max-width: 768px) {
    padding: 16px 14px;
    border-radius: 16px;
  }

  .step-header {
    margin-bottom: 20px;

    @media (max-width: 768px) {
      margin-bottom: 14px;
    }

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.2rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 4px;

      @media (max-width: 768px) {
        font-size: 1.05rem;
        margin-bottom: 3px;
      }
    }

    p {
      font-size: 0.82rem;
      color: #66756F;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.76rem;
      }
    }
  }
`;

export const FormSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 26px;

  @media (max-width: 768px) {
    gap: 14px;
    margin-bottom: 18px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }

  label {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.84rem;
    font-weight: 600;
    color: #174A3A;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      font-size: 0.78rem;
    }

    .optional-tag {
      font-size: 0.74rem;
      font-weight: 500;
      color: #8C9E98;

      @media (max-width: 768px) {
        font-size: 0.68rem;
      }
    }
  }

  .helper-text {
    font-size: 0.75rem;
    color: #66756F;
    margin-top: 3px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
    }
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  input[type="time"],
  input[type="tel"],
  select,
  textarea {
    width: 100%;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1.5px solid rgba(23, 74, 58, 0.14);
    background: #F8F5ED;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.86rem;
    color: #174A3A;
    transition: all 0.2s ease;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 8px 12px;
      font-size: 0.8rem;
      border-radius: 10px;
    }

    &:focus {
      outline: none;
      background: #FFFFFF;
      border-color: #2E7D5B;
      box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
    }

    &::placeholder {
      color: #9AA8A2;
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;

    @media (max-width: 768px) {
      min-height: 65px;
    }
  }
`;

export const TwoColInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const QuantityInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

export const ConditionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

export const ConditionOption = styled.button`
  background: ${({ $selected }) => ($selected ? "#174A3A" : "#F8F5ED")};
  color: ${({ $selected }) => ($selected ? "#FFFFFF" : "#174A3A")};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#174A3A" : "rgba(23, 74, 58, 0.12)")};
  padding: 10px 14px;
  border-radius: 12px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.82rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 0.78rem;
    border-radius: 10px;
  }

  &:hover {
    border-color: #2E7D5B;
  }

  .condition-check {
    font-size: 0.95rem;
    color: ${({ $selected }) => ($selected ? "#D7A83E" : "#8C9E98")};

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;

export const LocationSearchBox = styled.div`
  position: relative;

  .input-with-icon {
    position: relative;

    .loc-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #2E7D5B;
      font-size: 1.1rem;

      @media (max-width: 768px) {
        left: 10px;
        font-size: 0.95rem;
      }
    }

    input {
      padding-left: 42px;

      @media (max-width: 768px) {
        padding-left: 34px;
      }
    }
  }

  .btn-gps {
    margin-top: 8px;
    background: transparent;
    border: none;
    color: #2E7D5B;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 6px;
    border-radius: 6px;

    @media (max-width: 768px) {
      font-size: 0.74rem;
    }

    &:hover {
      background: rgba(46, 125, 91, 0.08);
      text-decoration: underline;
    }
  }
`;

export const FormActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid rgba(23, 74, 58, 0.08);
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding-top: 14px;
    gap: 8px;
  }

  .left-buttons {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
      gap: 6px;
    }
  }

  .btn-back {
    background: transparent;
    border: 1.5px solid rgba(23, 74, 58, 0.2);
    color: #174A3A;
    font-size: 0.84rem;
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s ease;

    @media (max-width: 768px) {
      padding: 7px 14px;
      font-size: 0.76rem;
    }

    &:hover {
      background: rgba(23, 74, 58, 0.06);
    }
  }

  .btn-draft {
    background: transparent;
    border: none;
    color: #66756F;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 6px;

    @media (max-width: 768px) {
      font-size: 0.74rem;
      padding: 5px 8px;
    }

    &:hover {
      color: #174A3A;
      text-decoration: underline;
    }
  }

  .btn-primary {
    background: #174A3A;
    color: #FFFFFF;
    border: none;
    font-size: 0.86rem;
    font-weight: 600;
    padding: 11px 24px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);
    transition: all 0.25s ease;

    @media (max-width: 768px) {
      padding: 8px 16px;
      font-size: 0.78rem;
      gap: 5px;
    }

    &:hover {
      background: #2E7D5B;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(46, 125, 91, 0.28);
    }
  }
`;

export const PreviewCardWrapper = styled.div`
  position: sticky;
  top: 96px;

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const SuccessStateWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 44px 36px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 12px 36px rgba(23, 74, 58, 0.06);
  text-align: center;
  max-width: 600px;
  margin: 110px auto 50px;

  @media (max-width: 992px) {
    margin: 120px auto 40px;
    padding: 36px 28px;
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    border-radius: 20px;
    margin: 115px auto 30px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
    border-radius: 18px;
    margin: 105px auto 24px;
  }

  .check-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(46, 125, 91, 0.12);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4rem;
    margin: 0 auto 18px;

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
      font-size: 1.8rem;
      margin-bottom: 12px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.45rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 8px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 6px;
    }
  }

  .success-desc {
    font-size: 0.88rem;
    color: #556B64;
    line-height: 1.5;
    margin: 0 0 24px;

    @media (max-width: 768px) {
      font-size: 0.78rem;
      margin-bottom: 16px;
      line-height: 1.4;
    }
  }

  .status-radar-box {
    background: #F8F5ED;
    border-radius: 16px;
    padding: 18px;
    margin-bottom: 26px;
    border: 1px solid rgba(23, 74, 58, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 12px;

    @media (max-width: 768px) {
      padding: 12px;
      margin-bottom: 18px;
      border-radius: 12px;
      gap: 8px;
    }

    .radar-indicator {
      display: flex;
      align-items: center;
      gap: 8px;

      .pulsing-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #2E7D5B;
        animation: ${pulseGlow} 1.6s infinite ease-in-out;
      }

      .radar-text {
        font-size: 0.84rem;
        font-weight: 700;
        color: #174A3A;

        @media (max-width: 768px) {
          font-size: 0.76rem;
        }
      }
    }

    .portions-badge {
      font-size: 0.8rem;
      font-weight: 700;
      color: #8B3A2B;
      background: rgba(139, 58, 43, 0.1);
      padding: 4px 12px;
      border-radius: 999px;

      @media (max-width: 768px) {
        font-size: 0.72rem;
        padding: 3px 8px;
      }
    }
  }

  .success-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }

    button {
      padding: 11px 22px;
      border-radius: 999px;
      font-size: 0.86rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        padding: 9px 14px;
        font-size: 0.78rem;
      }
    }

    .btn-view-donation {
      background: #174A3A;
      color: #FFFFFF;
      border: none;
      box-shadow: 0 4px 14px rgba(23, 74, 58, 0.18);

      &:hover {
        background: #2E7D5B;
        transform: translateY(-2px);
      }
    }

    .btn-list-another {
      background: transparent;
      color: #174A3A;
      border: 1.5px solid rgba(23, 74, 58, 0.2);

      &:hover {
        background: rgba(23, 74, 58, 0.05);
      }
    }
  }
`;
