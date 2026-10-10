import styled from "styled-components";

// ── Global Page Wrapper & Container ──────────────────────────────────────────
export const PageWrapper = styled.div`
  width: 100%;
  background-color: #FAF7F0;
  color: #1E342E;
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

export const EyebrowBadge = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2E7D5B;
  background: rgba(46, 125, 91, 0.08);
  padding: 5px 14px;
  border-radius: 999px;
  margin-bottom: 14px;
`;

export const SectionHeader = styled.div`
  text-align: ${({ $align }) => ($align === "left" ? "left" : "center")};
  max-width: ${({ $maxWidth }) => $maxWidth || "720px"};
  margin: ${({ $align }) => ($align === "left" ? "0 0 44px" : "0 auto 52px")};

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.4rem, 2.2vw, 1.75rem);
    font-weight: 600;
    color: #173F34;
    line-height: 1.28;
    letter-spacing: -0.02em;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;
  }
`;

// ── 2. Compact Breadcrumb ───────────────────────────────────────────────────
export const BreadcrumbSection = styled.div`
  padding: 104px 0 8px;
  background: transparent;

  @media (max-width: 768px) {
    padding: 92px 0 8px;
  }
`;

export const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 8px;
  font-size: 0.86rem;
  color: #69736E;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 6px;
  }

  a {
    color: #556B64;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s ease;

    &:hover {
      color: #173F34;
      text-decoration: underline;
    }
  }

  .separator {
    font-size: 0.72rem;
    color: #9AA39F;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  .current {
    color: #173F34;
    font-weight: 600;
  }
`;

// ── 3. Partnership Hero (Two-Column Split) ──────────────────────────────────
export const HeroSection = styled.section`
  padding: 130px 0 52px;
  background: transparent;

  @media (max-width: 992px) {
    padding: 110px 0 44px;
  }

  @media (max-width: 768px) {
    padding: 95px 0 36px;
  }

  @media (max-width: 480px) {
    padding: 90px 0 28px;
  }
`;

export const HeroSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const HeroTextCol = styled.div`
  max-width: 540px;

  @media (max-width: 992px) {
    max-width: 100%;
  }

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.6rem, 2.5vw, 2.15rem);
    font-weight: 600;
    color: #173F34;
    line-height: 1.22;
    letter-spacing: -0.025em;
    margin: 0 0 14px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  p {
    font-size: 1.02rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 24px;

    @media (max-width: 480px) {
      font-size: 0.94rem;
      margin: 0 0 18px;
    }
  }

  .cta-group {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }
  }

  .btn-primary-hero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #2E7D5B;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 999px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(46, 125, 91, 0.25);
    transition: all 0.25s ease;

    @media (max-width: 480px) {
      width: 100%;
      padding: 12px 20px;
      font-size: 0.94rem;
    }

    &:hover {
      background-color: #246549;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 125, 91, 0.35);
    }
  }

  .btn-secondary-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #173F34;
    font-size: 0.98rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 8px 0;
    transition: all 0.2s ease;

    @media (max-width: 480px) {
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
    }

    &:hover {
      color: #2E7D5B;
      gap: 10px;
    }
  }
`;

export const HeroImageCol = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  margin-left: auto;

  @media (max-width: 992px) {
    max-width: 100%;
    margin-left: 0;
  }

  .image-wrapper {
    width: 100%;
    height: 330px;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #DDDDD5;
    background: #EAE7DE;
    box-shadow: 0 10px 30px rgba(23, 63, 52, 0.08);

    @media (max-width: 768px) {
      height: 250px;
    }

    @media (max-width: 480px) {
      height: 200px;
      border-radius: 14px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
`;

export const FloatingBadge = styled.div`
  position: absolute;
  bottom: -14px;
  left: 20px;
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    left: 12px;
    bottom: -10px;
    padding: 6px 12px;
    gap: 8px;
  }

  .stat-num {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.35rem;
    font-weight: 700;
    color: #173F34;
    line-height: 1;

    @media (max-width: 480px) {
      font-size: 1.15rem;
    }
  }

  .stat-text {
    font-size: 0.78rem;
    font-weight: 500;
    color: #69736E;
    line-height: 1.3;

    @media (max-width: 480px) {
      font-size: 0.72rem;
    }
  }
`;

// ── 4. Who Can Partner With Us ──────────────────────────────────────────────
export const WhoSection = styled.section`
  padding: 80px 0 88px;
  background-color: #FFFFFF;
  border-top: 1px solid #ECE9E0;
  border-bottom: 1px solid #ECE9E0;

  @media (max-width: 768px) {
    padding: 48px 0 56px;
  }
`;

export const WhoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const WhoCard = styled.div`
  background: #FAF7F0;
  border: 1px solid #DDDDD5;
  border-radius: 16px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #2E7D5B;
    box-shadow: 0 12px 28px rgba(23, 63, 52, 0.06);
  }

  .card-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #FFFFFF;
    border: 1px solid #DDDDD5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2E7D5B;
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #173F34;
    margin: 0 0 10px;
    line-height: 1.3;
  }

  p {
    font-size: 0.95rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0 0 24px;
    flex-grow: 1;
  }

  .example-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8C9994;
    margin-bottom: 10px;
    display: block;
  }

  .chips-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    font-size: 0.82rem;
    color: #28443B;
    background: #FFFFFF;
    border: 1px solid #E2DFC8;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 500;
  }
`;

// ── 5. Why Partner With ANNShare (Split Section) ────────────────────────────
export const WhySection = styled.section`
  padding: 88px 0;
  background-color: #FAF7F0;
`;

export const WhySplitGrid = styled.div`
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const WhyImageCol = styled.div`
  width: 100%;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #DDDDD5;
  background: #EAE7DE;
  box-shadow: 0 12px 32px rgba(23, 63, 52, 0.06);

  @media (max-width: 768px) {
    height: 320px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const WhyContentCol = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.4rem, 2.2vw, 1.75rem);
    font-weight: 600;
    color: #173F34;
    line-height: 1.28;
    letter-spacing: -0.02em;
    margin: 0 0 24px;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

export const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  .benefit-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(46, 125, 91, 0.1);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .benefit-content {
    h4 {
      font-size: 1.05rem;
      font-weight: 600;
      color: #173F34;
      margin: 0 0 4px;
    }

    p {
      font-size: 0.94rem;
      color: #556B64;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

// ── 6. How Partnership Works (Horizontal 4-Step Process) ────────────────────
export const ProcessSection = styled.section`
  padding: 88px 0 96px;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;
`;

export const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;
  margin-top: 16px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const StepItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .step-num {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.15rem;
    font-weight: 700;
    color: #2E7D5B;
    background: #FFFFFF;
    border: 1px solid #DDDDD5;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-line {
    flex-grow: 1;
    height: 1px;
    background: #C4C4BC;

    @media (max-width: 992px) {
      display: none;
    }
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.15rem;
    font-weight: 600;
    color: #173F34;
    margin: 0 0 8px;
  }

  p {
    font-size: 0.92rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0;
  }
`;

// ── 7. Partnership Stories / Trust Section ──────────────────────────────────
export const TrustSection = styled.section`
  padding: 80px 0 88px;
  background-color: #FFFFFF;
`;

export const PartnerCategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 48px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PartnerCategoryPill = styled.div`
  background: #FAF7F0;
  border: 1px solid #DDDDD5;
  border-radius: 10px;
  padding: 16px 12px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2E7D5B;
    background: #FFFFFF;
    box-shadow: 0 4px 12px rgba(23, 63, 52, 0.05);
  }

  .cat-icon {
    font-size: 1.25rem;
    color: #2E7D5B;
    margin-bottom: 6px;
  }

  .cat-name {
    font-size: 0.84rem;
    font-weight: 600;
    color: #173F34;
    line-height: 1.3;
  }
`;

export const StatsBanner = styled.div`
  background: #FAF7F0;
  border: 1px solid #DDDDD5;
  border-radius: 16px;
  padding: 28px 36px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 24px;

  @media (max-width: 680px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .stat-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .stat-val {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.75rem;
    font-weight: 700;
    color: #173F34;
    line-height: 1.1;
  }

  .stat-desc {
    font-size: 0.88rem;
    color: #556B64;
    font-weight: 500;
  }

  .stat-divider {
    width: 1px;
    height: 36px;
    background: #DDDDD5;

    @media (max-width: 680px) {
      display: none;
    }
  }
`;

// ── 8. Partnership Options (Three Horizontal Cards) ─────────────────────────
export const OptionsSection = styled.section`
  padding: 84px 0;
  background-color: #FAF7F0;
  border-top: 1px solid #ECE9E0;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const OptionCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 14px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #2E7D5B;
    box-shadow: 0 10px 24px rgba(23, 63, 52, 0.06);
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #173F34;
    margin: 0 0 12px;
  }

  p {
    font-size: 0.95rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 24px;
    flex-grow: 1;
  }

  .card-action-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.94rem;
    font-weight: 600;
    color: #2E7D5B;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: all 0.2s ease;

    &:hover {
      color: #173F34;
      gap: 10px;
    }
  }
`;

// ── 9. FAQ Accordion Rows ───────────────────────────────────────────────────
export const FaqSection = styled.section`
  padding: 84px 0 92px;
  background-color: #FFFFFF;
  border-top: 1px solid #ECE9E0;
`;

export const FaqAccordionList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border-top: 1px solid #DDDDD5;
`;

export const FaqRow = styled.div`
  border-bottom: 1px solid #DDDDD5;
`;

export const FaqTrigger = styled.button`
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  font-family: inherit;

  .faq-q {
    font-size: 1.08rem;
    font-weight: 600;
    color: #173F34;
    line-height: 1.4;
  }

  .faq-icon {
    font-size: 1.2rem;
    color: #69736E;
    transition: transform 0.25s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
    flex-shrink: 0;
  }

  &:hover .faq-q {
    color: #2E7D5B;
  }
`;

export const FaqAnswer = styled.div`
  padding: 0 0 22px;
  font-size: 0.96rem;
  color: #556B64;
  line-height: 1.65;
`;

export const FaqBottomLink = styled.div`
  text-align: center;
  margin-top: 36px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.96rem;
    font-weight: 600;
    color: #2E7D5B;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #173F34;
      gap: 10px;
    }
  }
`;

// ── 10. Become a Partner Form Section ───────────────────────────────────────
export const FormSection = styled.section`
  padding: 92px 0 100px;
  background-color: #FAF7F0;
  border-top: 1px solid #ECE9E0;

  @media (max-width: 768px) {
    padding: 64px 0 72px;
  }
`;

export const FormSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 44px;
  }
`;

export const FormInfoCol = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.4rem, 2.2vw, 1.75rem);
    font-weight: 600;
    color: #173F34;
    line-height: 1.28;
    letter-spacing: -0.02em;
    margin: 0 0 14px;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 36px;
  }

  .what-next-box {
    background: #FFFFFF;
    border: 1px solid #DDDDD5;
    border-radius: 14px;
    padding: 28px;

    h4 {
      font-size: 0.88rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #173F34;
      margin: 0 0 16px;
    }
  }

  .steps-mini-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .step-mini-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    .num {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(46, 125, 91, 0.1);
      color: #2E7D5B;
      font-size: 0.82rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    span {
      font-size: 0.94rem;
      color: #556B64;
      line-height: 1.45;
    }
  }
`;

export const FormCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 18px;
  padding: 36px 32px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.04);

  @media (max-width: 560px) {
    padding: 28px 20px;
  }
`;

export const FormGridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 18px;

  label {
    font-size: 0.88rem;
    font-weight: 600;
    color: #1E342E;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #D5D5CC;
    background: #FAF7F0;
    color: #1E342E;
    font-family: inherit;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #2E7D5B;
      background: #FFFFFF;
      box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
    }

    &::placeholder {
      color: #9AA5A0;
    }
  }

  select {
    cursor: pointer;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #2E7D5B;
  color: #FFFFFF;
  font-size: 1.02rem;
  font-weight: 600;
  padding: 15px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(46, 125, 91, 0.2);

  &:hover:not(:disabled) {
    background-color: #246549;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(46, 125, 91, 0.28);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SuccessCard = styled.div`
  text-align: center;
  padding: 40px 24px;

  .check-icon {
    font-size: 3rem;
    color: #2E7D5B;
    margin-bottom: 16px;
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.5rem;
    font-weight: 600;
    color: #173F34;
    margin: 0 0 10px;
  }

  p {
    font-size: 0.98rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 24px;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-reset {
    background: #FAF7F0;
    border: 1px solid #DDDDD5;
    color: #173F34;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 10px 22px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #FFFFFF;
      border-color: #2E7D5B;
    }
  }
`;
