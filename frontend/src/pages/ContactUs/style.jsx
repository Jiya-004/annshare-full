import styled from "styled-components";

// ── Global Page Canvas ──────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  background-color: #F8F5ED;
  color: #18352D;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  overflow-x: hidden;
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

// Common Small Uppercase Eyebrow Badge (Matching Homepage sub-tags)
export const EyebrowBadge = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2E7D5B;
  background: rgba(46, 125, 91, 0.09);
  padding: 5px 14px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 14px;
`;

// ── 1. Hero Section (Editorial Two-Column with Real Food Photography) ───────
export const ContactHeroSection = styled.section`
  padding: 130px 0 64px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 32px 0 44px;
  }
`;

export const HeroSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const HeroContentSide = styled.div`
  max-width: 600px;

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.5rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0 0 16px;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.12rem;
    color: #556B64;
    line-height: 1.65;
    margin: 0 0 32px;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 24px;
    }
  }

  .hero-actions-row {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 26px;
      border-radius: 999px;
      background: #174A3A;
      color: #F8F5ED;
      font-family: inherit;
      font-size: 0.94rem;
      font-weight: 600;
      border: 1px solid #174A3A;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        background: #2E7D5B;
        border-color: #2E7D5B;
        transform: translateY(-2px);
      }
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 24px;
      border-radius: 999px;
      background: transparent;
      color: #174A3A;
      font-family: inherit;
      font-size: 0.94rem;
      font-weight: 600;
      border: 1px solid rgba(23, 74, 58, 0.2);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        background: rgba(23, 74, 58, 0.05);
        border-color: #174A3A;
      }
    }
  }
`;

export const HeroImageSide = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);

  @media (max-width: 992px) {
    height: 300px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }

  .image-caption-pill {
    position: absolute;
    bottom: 16px;
    left: 16px;
    background: rgba(23, 74, 58, 0.88);
    backdrop-filter: blur(8px);
    color: #F8F5ED;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

// ── 2. Contact Options Section (Matching "How ANNShare Works" Cards) ────────
export const ContactOptionsSection = styled.section`
  padding: 80px 0;
  background-color: #FFFFFF;
  border-top: 1px solid rgba(23, 74, 58, 0.07);
  border-bottom: 1px solid rgba(23, 74, 58, 0.07);
`;

export const SectionHeaderArea = styled.div`
  text-align: center;
  max-width: 660px;
  margin: 0 auto 44px;

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.85rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.01em;
    margin: 0 0 10px;

    @media (max-width: 640px) {
      font-size: 1.55rem;
    }
  }

  p {
    font-size: 1rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;
  }
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const OptionCard = styled.div`
  background: #F8F5ED;
  border-radius: 24px;
  padding: 34px 28px;
  border: 1px solid rgba(23, 74, 58, 0.09);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    background: #FFFFFF;
    box-shadow: 0 16px 36px rgba(23, 74, 58, 0.08);
    border-color: rgba(46, 125, 91, 0.25);
  }

  .card-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;

    .icon-box {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: rgba(46, 125, 91, 0.1);
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
    }

    .num-indicator {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.05rem;
      font-weight: 800;
      color: #2E7D5B;
      background: rgba(46, 125, 91, 0.1);
      padding: 4px 10px;
      border-radius: 999px;
    }
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 10px;
  }

  p {
    font-size: 0.95rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 24px;
    flex-grow: 1;
  }

  .action-arrow-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.94rem;
    font-weight: 700;
    color: #2E7D5B;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;

    &:hover {
      color: #174A3A;
      transform: translateX(3px);
    }
  }
`;

// ── 3. Main Contact Area (Two Columns: Form + Structured Info) ──────────────
export const MainContactAreaSection = styled.section`
  padding: 80px 0;
  background-color: #F8F5ED;
`;

export const ContactSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 48px;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 44px;
    align-items: start;
  }
`;

// Left Side: Clean Integrated Form
export const FormSide = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  padding: 40px 36px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 8px 30px rgba(23, 74, 58, 0.04);
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 28px 20px;
    border-radius: 20px;
  }

  .form-header-group {
    margin-bottom: 22px;

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.65rem;
      font-weight: 600;
      color: #174A3A;
      letter-spacing: -0.01em;
      margin: 0;

      @media (max-width: 640px) {
        font-size: 1.45rem;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.88rem;
    font-weight: 600;
    color: #18352D;

    .optional {
      font-weight: 400;
      color: #556B64;
      font-size: 0.82rem;
      margin-left: 4px;
    }
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid rgba(23, 74, 58, 0.16);
    background-color: #FAF8F5;
    font-family: inherit;
    font-size: 0.94rem;
    color: #18352D;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: #8D9993;
    }

    &:focus {
      background-color: #FFFFFF;
      border-color: #2E7D5B;
      box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
    }
  }

  textarea {
    min-height: 125px;
    resize: vertical;
    line-height: 1.55;
  }
`;

export const FormSubmitBtn = styled.button`
  align-self: flex-start;
  padding: 14px 30px;
  background-color: #174A3A;
  color: #F8F5ED;
  border: 1px solid #174A3A;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.18);
  transition: all 0.25s ease;

  &:hover {
    background-color: #2E7D5B;
    border-color: #2E7D5B;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(23, 74, 58, 0.24);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

export const FormSuccessMessage = styled.div`
  background: #F8F5ED;
  border: 1px solid #2E7D5B;
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 8px;
  }

  p {
    font-size: 0.94rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0 0 18px;
  }

  button {
    background: #174A3A;
    color: #F8F5ED;
    border: none;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 10px 22px;
    border-radius: 999px;
    cursor: pointer;

    &:hover {
      background: #2E7D5B;
    }
  }
`;

// Right Side: Structured Contact Information + Photo
export const InfoSide = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .info-header-group {
    margin-bottom: 20px;

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.65rem;
      font-weight: 600;
      color: #174A3A;
      letter-spacing: -0.01em;
      margin: 0;

      @media (max-width: 640px) {
        font-size: 1.45rem;
      }
    }
  }

  .info-list {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
  }

  .info-block {
    padding: 16px 0;
    border-top: 1px solid rgba(23, 74, 58, 0.1);

    &:last-child {
      border-bottom: 1px solid rgba(23, 74, 58, 0.1);
    }

    .meta-label {
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #2E7D5B;
      margin-bottom: 4px;
    }

    .main-text {
      font-size: 1.05rem;
      font-weight: 700;
      color: #174A3A;
      margin: 0 0 2px;
      text-decoration: none;
      display: inline-block;

      &:hover {
        color: #2E7D5B;
      }
    }

    .desc-text {
      font-size: 0.88rem;
      color: #556B64;
      line-height: 1.45;
      margin: 0;
    }
  }

  .info-photo-card {
    width: 100%;
    flex: 1;
    min-height: 220px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(23, 74, 58, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .photo-tag {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background: rgba(23, 74, 58, 0.85);
      backdrop-filter: blur(6px);
      color: #F8F5ED;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.76rem;
      font-weight: 600;
    }
  }
`;

// ── 4. Quick Help / FAQ Section (Exact Homepage Style) ───────────────────────
export const FAQSectionWrapper = styled.section`
  padding: 90px 0;
  background-color: #FFFFFF;
  border-top: 1px solid rgba(23, 74, 58, 0.07);
`;

export const AccordionList = styled.div`
  max-width: 900px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AccordionItem = styled.div`
  background: #F8F5ED;
  border-radius: 18px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  overflow: hidden;
  transition: all 0.25s ease;

  &.open {
    border-color: #2E7D5B;
    background: #FFFFFF;
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

    @media (max-width: 500px) {
      padding: 18px 20px;
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;
      line-height: 1.4;
    }

    .icon-toggle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #FFFFFF;
      color: #174A3A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;

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

    @media (max-width: 500px) {
      padding: 0 20px 20px;
    }
  }
`;

export const ViewAllFaqsBtn = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 999px;
  background: transparent;
  color: #174A3A;
  border: 1px solid rgba(23, 74, 58, 0.2);
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #174A3A;
    color: #F8F5ED;
    border-color: #174A3A;
    transform: translateY(-1px);
  }
`;

// ── 5. Direct Support Banner (Matching Homepage CommunityCTA Banner) ────────
export const UrgentSupportWrapper = styled.section`
  padding: 80px 0;
  background-color: #F8F5ED;
`;

export const UrgentBannerCard = styled.div`
  background: #174A3A;
  border-radius: 36px;
  padding: 68px 48px;
  color: #FFFFFF;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(23, 74, 58, 0.2);

  @media (max-width: 768px) {
    padding: 50px 24px;
    border-radius: 28px;
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
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.1rem;
    font-weight: 600;
    color: #F8F5ED;
    line-height: 1.25;
    margin: 0 0 16px;

    @media (max-width: 640px) {
      font-size: 1.7rem;
    }
  }

  p {
    font-size: 1.15rem;
    color: #C6EAD8;
    line-height: 1.6;
    margin: 0 0 36px;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    button, a {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-pickup {
      background: #B9F072;
      color: #174A3A;
      border: none;

      &:hover {
        background: #ccf88b;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(185, 240, 114, 0.3);
      }
    }

    .btn-call {
      background: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);

      &:hover {
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);
      }
    }
  }
`;
