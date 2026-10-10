import styled, { keyframes } from "styled-components";

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
`;

export const DonatePageWrapper = styled.div`
  background-color: #F8F5ED;
  min-height: 100vh;
  padding: 28px 0 80px;

  @media (max-width: 768px) {
    padding: 16px 0 90px;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 32px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 16px 24px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
  }
`;

export const IntroHero = styled.div`
  background: #FFFFFF;
  border-radius: 26px;
  padding: 36px 42px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 10px 32px rgba(23, 74, 58, 0.04);
  margin-top: 86px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 320px;
    background: radial-gradient(circle at 85% 30%, rgba(46, 125, 91, 0.07), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 26px 22px;
    margin-top: 96px;
    gap: 18px;
  }

  @media (max-width: 768px) {
    margin-top: 118px;
    padding: 20px 18px;
    border-radius: 20px;
    gap: 14px;
  }

  .hero-content {
    max-width: 720px;
    position: relative;
    z-index: 2;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: #E8F5E9;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 14px;
    box-shadow: 0 2px 6px rgba(46, 125, 91, 0.08);

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 10px;
      margin-bottom: 8px;
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

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.25rem;
    font-weight: 700;
    color: #174A3A;
    line-height: 1.22;
    letter-spacing: -0.02em;
    margin: 0 0 12px;

    .highlight-text {
      background: linear-gradient(135deg, #174A3A 0%, #2E7D5B 55%, #10B981 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      display: inline-block;
    }

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 8px;
      line-height: 1.25;
    }

    @media (max-width: 480px) {
      font-size: 1.24rem;
    }
  }

  p {
    font-size: 1rem;
    color: #556B64;
    max-width: 640px;
    line-height: 1.6;
    margin: 0 0 22px;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      line-height: 1.45;
      margin-bottom: 16px;
    }
  }

  .trust-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 8px;
    }

    .trust-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #174A3A;
      background: #F8F5ED;
      padding: 7px 14px;
      border-radius: 12px;
      border: 1px solid rgba(23, 74, 58, 0.08);
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        font-size: 0.72rem;
        padding: 5px 10px;
        gap: 5px;
        border-radius: 10px;
      }

      svg {
        color: #2E7D5B;
        font-size: 1.05rem;

        @media (max-width: 768px) {
          font-size: 0.88rem;
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
    border-radius: 20px;
    padding: 22px 28px;
    min-width: 220px;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(23, 74, 58, 0.04);
    position: relative;
    z-index: 2;

    @media (max-width: 960px) {
      display: none;
    }

    .metric-icon-circle {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: #E8F5E9;
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      margin-bottom: 10px;
    }

    .metric-value {
      font-size: 1.55rem;
      font-weight: 800;
      color: #174A3A;
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .metric-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #71827B;
      margin-bottom: 12px;
    }

    .metric-live-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      color: #2E7D5B;
      background: #E8F5E9;
      padding: 3px 10px;
      border-radius: 999px;

      .pulse-indicator {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #2E7D5B;
        box-shadow: 0 0 0 2px rgba(46, 125, 91, 0.2);
      }
    }
  }
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1.18fr 0.82fr;
  gap: 36px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const FormCard = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 34px 36px;
  border: 1px solid rgba(23, 74, 58, 0.09);
  box-shadow: 0 14px 36px rgba(23, 74, 58, 0.05);

  @media (max-width: 768px) {
    padding: 20px 16px;
    border-radius: 18px;
  }

  .step-header {
    margin-bottom: 26px;

    @media (max-width: 768px) {
      margin-bottom: 18px;
    }

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.35rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 6px;

      @media (max-width: 768px) {
        font-size: 1.15rem;
        margin-bottom: 4px;
      }
    }

    p {
      font-size: 0.88rem;
      color: #66756F;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.78rem;
      }
    }
  }
`;

export const FormSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    gap: 18px;
    margin-bottom: 24px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  label {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.9rem;
    font-weight: 600;
    color: #174A3A;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }

    .optional-tag {
      font-size: 0.78rem;
      font-weight: 500;
      color: #8C9E98;

      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
    }
  }

  .helper-text {
    font-size: 0.8rem;
    color: #66756F;
    margin-top: 4px;

    @media (max-width: 768px) {
      font-size: 0.72rem;
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
    padding: 14px 18px;
    border-radius: 14px;
    border: 1.5px solid rgba(23, 74, 58, 0.14);
    background: #F8F5ED;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.95rem;
    color: #174A3A;
    transition: all 0.2s ease;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 10px 14px;
      font-size: 0.84rem;
      border-radius: 12px;
    }

    &:focus {
      outline: none;
      background: #FFFFFF;
      border-color: #2E7D5B;
      box-shadow: 0 0 0 4px rgba(46, 125, 91, 0.12);
    }

    &::placeholder {
      color: #9AA8A2;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;

    @media (max-width: 768px) {
      min-height: 80px;
    }
  }
`;

export const TwoColInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const QuantityInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 12px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export const ConditionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

export const ConditionOption = styled.button`
  background: ${({ $selected }) => ($selected ? "#174A3A" : "#F8F5ED")};
  color: ${({ $selected }) => ($selected ? "#FFFFFF" : "#174A3A")};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#174A3A" : "rgba(23, 74, 58, 0.12)")};
  padding: 14px 16px;
  border-radius: 14px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.92rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.82rem;
    border-radius: 10px;
  }

  &:hover {
    border-color: #2E7D5B;
  }

  .condition-check {
    font-size: 1.1rem;
    color: ${({ $selected }) => ($selected ? "#D7A83E" : "#8C9E98")};

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

export const LocationSearchBox = styled.div`
  position: relative;

  .input-with-icon {
    position: relative;

    .loc-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #2E7D5B;
      font-size: 1.2rem;

      @media (max-width: 768px) {
        left: 12px;
        font-size: 1.05rem;
      }
    }

    input {
      padding-left: 46px;

      @media (max-width: 768px) {
        padding-left: 38px;
      }
    }
  }

  .btn-gps {
    margin-top: 10px;
    background: transparent;
    border: none;
    color: #2E7D5B;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 8px;

    @media (max-width: 768px) {
      font-size: 0.78rem;
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
  padding-top: 24px;
  border-top: 1px solid rgba(23, 74, 58, 0.08);
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding-top: 16px;
    gap: 10px;
  }

  .left-buttons {
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 768px) {
      gap: 8px;
    }
  }

  .btn-back {
    background: transparent;
    border: 1.5px solid rgba(23, 74, 58, 0.2);
    color: #174A3A;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 12px 22px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;

    @media (max-width: 768px) {
      padding: 9px 16px;
      font-size: 0.8rem;
    }

    &:hover {
      background: rgba(23, 74, 58, 0.06);
    }
  }

  .btn-draft {
    background: transparent;
    border: none;
    color: #66756F;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 8px;

    @media (max-width: 768px) {
      font-size: 0.78rem;
      padding: 6px 10px;
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
    font-size: 0.96rem;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 6px 20px rgba(23, 74, 58, 0.25);
    transition: all 0.25s ease;

    @media (max-width: 768px) {
      padding: 10px 20px;
      font-size: 0.84rem;
      gap: 6px;
    }

    &:hover {
      background: #2E7D5B;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(46, 125, 91, 0.32);
    }
  }
`;

export const PreviewCardWrapper = styled.div`
  position: sticky;
  top: 100px;

  @media (max-width: 1024px) {
    position: static;
  }
`;

export const SuccessStateWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 32px;
  padding: 60px 40px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 20px 50px rgba(23, 74, 58, 0.08);
  text-align: center;
  max-width: 680px;
  margin: 64px auto 40px;

  @media (max-width: 768px) {
    padding: 32px 18px;
    border-radius: 20px;
    margin: 24px auto 20px;
  }

  .check-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(46, 125, 91, 0.12);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    margin: 0 auto 24px;

    @media (max-width: 768px) {
      width: 58px;
      height: 58px;
      font-size: 2.2rem;
      margin-bottom: 16px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.3rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 8px;
    }
  }

  .success-desc {
    font-size: 1.08rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 32px;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      margin-bottom: 20px;
      line-height: 1.45;
    }
  }

  .status-radar-box {
    background: #F8F5ED;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 36px;
    border: 1px solid rgba(23, 74, 58, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 16px;

    @media (max-width: 768px) {
      padding: 14px;
      margin-bottom: 24px;
      border-radius: 14px;
      gap: 10px;
    }

    .radar-indicator {
      display: flex;
      align-items: center;
      gap: 10px;

      .pulsing-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #2E7D5B;
        animation: ${pulseGlow} 1.6s infinite ease-in-out;
      }

      .radar-text {
        font-size: 0.95rem;
        font-weight: 700;
        color: #174A3A;

        @media (max-width: 768px) {
          font-size: 0.8rem;
        }
      }
    }

    .portions-badge {
      font-size: 0.9rem;
      font-weight: 700;
      color: #8B3A2B;
      background: rgba(139, 58, 43, 0.1);
      padding: 6px 14px;
      border-radius: 999px;

      @media (max-width: 768px) {
        font-size: 0.78rem;
        padding: 4px 10px;
      }
    }
  }

  .success-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }

    button {
      padding: 14px 28px;
      border-radius: 999px;
      font-size: 0.96rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;

      @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        padding: 11px 18px;
        font-size: 0.84rem;
      }
    }

    .btn-view-donation {
      background: #174A3A;
      color: #FFFFFF;
      border: none;
      box-shadow: 0 6px 18px rgba(23, 74, 58, 0.2);

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
