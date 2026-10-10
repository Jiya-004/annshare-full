import styled from "styled-components";

// ── Global Canvas ───────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  background-color: rgb(248, 245, 237);
  color: #1E342E;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  overflow-x: clip;
`;

export const Container = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || "1280px"};
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

// ── Eyebrow Badge (Matching About Us & Contact Us exactly) ───────────────────
export const EyebrowBadge = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? "#B8DD72" : "#2E7D5B")};
  background: ${({ $light }) =>
    $light ? "rgba(184, 221, 114, 0.14)" : "rgba(46, 125, 91, 0.09)"};
  padding: 5px 14px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 14px;
`;

// ── Section 1: Hero Banner (COLOR 1: Cream rgb(248, 245, 237)) ──────────────
export const FaqHeroSection = styled.section`
  padding: 130px 0 68px;
  background-color: rgb(248, 245, 237);
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 44px 0 44px;
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
    font-size: 3.1rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.16;
    letter-spacing: -0.02em;
    margin: 0 0 18px;

    @media (max-width: 768px) {
      font-size: 2.35rem;
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
    gap: 18px;
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
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);

  @media (max-width: 992px) {
    height: 320px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }

  .image-caption-pill {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(23, 74, 58, 0.9);
    backdrop-filter: blur(8px);
    color: #F8F5ED;
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 0.84rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

    svg {
      color: #B8DD72;
      font-size: 1.1rem;
    }

    .dot-icon {
      color: #B8DD72;
      font-size: 0.9rem;
      line-height: 1;
    }
  }
`;

// ── Section 2: Questions by Who You Are (COLOR 2: White #FFFFFF) ────────────
export const StartWithYouSection = styled.section`
  padding: 80px 0 88px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: ${({ $maxWidth }) => $maxWidth || "640px"};
  margin: 0 auto ${({ $marginBottom }) => $marginBottom || "48px"};

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.3rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.22;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.85rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;
  }
`;

export const RoleColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const RoleColumn = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 18px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.25s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-3px);
    border-color: #174A3A;
    box-shadow: 0 10px 24px rgba(23, 74, 58, 0.06);
  }

  .number-label {
    font-family: inherit;
    font-size: 1.8rem;
    font-weight: 700;
    color: #174A3A;
    line-height: 1;
    margin-bottom: 16px;
  }

  h3 {
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 700;
    color: #174A3A;
    margin: 0 0 8px;
    line-height: 1.3;
  }

  .audience {
    font-size: 0.88rem;
    color: #64748B;
    line-height: 1.5;
    margin: 0 0 22px;
  }

  .role-action-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #174A3A;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    margin-top: auto;
    transition: color 0.2s ease, gap 0.2s ease;

    &:hover {
      color: #2E7D5B;
      gap: 12px;
    }
  }
`;

export const RoleQuestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export const RoleQuestionBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: transparent;
  border: none;
  padding: 4px 0;
  text-align: left;
  font-family: inherit;
  font-size: 0.88rem;
  color: #354E46;
  line-height: 1.45;
  cursor: pointer;
  transition: all 0.2s ease;

  .q-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;

    &::before {
      content: '•';
      color: #2E7D5B;
      font-size: 1.15rem;
      line-height: 1;
    }
  }

  svg {
    color: #64748B;
    font-size: 0.9rem;
    flex-shrink: 0;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover {
    color: #174A3A;

    svg {
      color: #174A3A;
      transform: translateX(3px);
    }
  }
`;

// ── Section 3: Most Asked Questions (COLOR 1: Cream rgb(248, 245, 237)) ─────
export const MostAskedSection = styled.section`
  padding: 96px 0 110px;
  background-color: rgb(248, 245, 237);
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 68px;
  }
`;

export const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const AccordionItem = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  border: 1px solid #EAEAEA;
  overflow: hidden;
  transition: all 0.22s ease;
  scroll-margin-top: 120px;

  &.open {
    border: 1.5px solid #174A3A;
    box-shadow: 0 4px 16px rgba(23, 74, 58, 0.05);

    .question-btn {
      padding: 22px 28px 12px 28px;

      .q-title-box h3 {
        font-weight: 700;
        color: #174A3A;
      }

      .icon-toggle {
        background: #174A3A;
        color: #FFFFFF;
        transform: rotate(180deg);
      }
    }
  }

  .question-btn {
    width: 100%;
    padding: 20px 28px;
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

    .q-title-box {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;

      .num-tag {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 700;
        color: #174A3A;
      }

      h3 {
        font-family: inherit;
        font-size: 1.05rem;
        font-weight: 600;
        color: #174A3A;
        margin: 0;
        line-height: 1.38;

        @media (max-width: 640px) {
          font-size: 1rem;
        }
      }
    }

    .icon-toggle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #F1F4F2;
      color: #64748B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
    }
  }

  .answer-panel {
    padding: 0 28px 22px 64px;
    font-size: 0.92rem;
    color: #556B64;
    line-height: 1.65;

    @media (max-width: 640px) {
      padding: 0 20px 20px 20px;
      font-size: 0.9rem;
    }

    p {
      margin: 0;
    }
  }
`;

// ── Section 4: Food Safety Feature Section (COLOR 2: White #FFFFFF) ─────────
export const SafetyFeatureSection = styled.section`
  padding: 88px 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0;
  }
`;

export const SafetySplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const SafetyImageWrap = styled.div`
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);

  img {
    width: 100%;
    height: 440px;
    object-fit: cover;
    display: block;

    @media (max-width: 768px) {
      height: 300px;
    }
  }
`;

export const SafetyContentWrap = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.4rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.24;
    margin: 0 0 16px;

    @media (max-width: 768px) {
      font-size: 1.95rem;
    }
  }

  .lead-text {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.68;
    margin: 0 0 32px;
  }

  .principles-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }

  .principle-item {
    border-left: 3px solid #2E7D5B;
    padding-left: 16px;

    h4 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.08rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 4px;
    }

    p {
      font-size: 0.92rem;
      color: #556B64;
      line-height: 1.55;
      margin: 0;
    }
  }

  .btn-safety {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: transparent;
    color: #174A3A;
    border: 1.5px solid #174A3A;
    border-radius: 999px;
    font-size: 0.94rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: #174A3A;
      color: #F8F5ED;
      gap: 12px;
    }
  }
`;

// ── Section 5: Simple FAQ List (COLOR 1: Cream rgb(248, 245, 237)) ──────────
export const MoreAnswersSection = styled.section`
  padding: 96px 0 100px;
  background-color: rgb(248, 245, 237);
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 68px;
  }
`;

export const TwoColumnFaqGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const FaqGroupBlock = styled.div`
  margin-bottom: 38px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .group-title {
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 700;
    color: #174A3A;
    letter-spacing: -0.01em;
    margin-bottom: 18px;
    display: block;
  }
`;

export const SimpleAccordionItem = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  border: 1px solid #EAEAEA;
  margin-bottom: 14px;
  overflow: hidden;
  transition: all 0.22s ease;
  scroll-margin-top: 120px;

  &.open {
    border: 1.5px solid #174A3A;
    box-shadow: 0 4px 16px rgba(23, 74, 58, 0.05);

    .accordion-toggle,
    .simple-trigger {
      padding: 22px 24px 12px 24px;

      h4 {
        font-weight: 700;
        color: #174A3A;
      }

      .toggle-icon,
      .icon-toggle {
        background: #174A3A;
        color: #FFFFFF;
        transform: rotate(180deg);
      }
    }
  }

  .accordion-toggle,
  .simple-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s ease;

    h4 {
      font-family: inherit;
      font-size: 1.02rem;
      font-weight: 600;
      color: #174A3A;
      line-height: 1.38;
      margin: 0;
      flex: 1;
    }

    .toggle-icon,
    .icon-toggle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #F1F4F2;
      color: #64748B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
    }
  }

  .accordion-body,
  .simple-answer {
    padding: 0 24px 22px 24px;
    font-size: 0.92rem;
    color: #556B64;
    line-height: 1.65;

    p {
      margin: 0;
    }
  }
`;

// ── Section 6: Community Impact Break (COLOR 2: White #FFFFFF) ───────────────
export const CommunityImpactSection = styled.section`
  background-color: #FFFFFF;
  color: #174A3A;
  padding: 68px 0;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 48px 0;
  }
`;

export const ImpactSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const ImpactTextSide = styled.div`
  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.1rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.25;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.65rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;
  }
`;

export const ImpactStatsSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgb(248, 245, 237);
  border: 1px solid rgba(23, 74, 58, 0.1);
  border-radius: 18px;
  padding: 24px 28px;
  box-shadow: 0 8px 24px rgba(23, 74, 58, 0.05);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .stat-item {
    .num {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.65rem;
      font-weight: 700;
      color: #2E7D5B;
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .label {
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #174A3A;
      font-weight: 600;
    }
  }
`;

// ── Section 7: Final Support Section (COLOR 1: Cream rgb(248, 245, 237)) ────
export const FinalSupportSection = styled.section`
  padding: 96px 0 110px;
  background-color: rgb(248, 245, 237);
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 64px 0 80px;
  }
`;

export const SupportContentBox = styled.div`
  max-width: 620px;
  margin: 0 auto;

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.3rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin: 0 0 14px;

    @media (max-width: 640px) {
      font-size: 1.85rem;
    }
  }

  p {
    font-size: 1.08rem;
    color: #556B64;
    line-height: 1.65;
    margin: 0 0 32px;
  }

  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;

    .btn-contact-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 28px;
      background: #174A3A;
      color: #F8F5ED;
      border: 1px solid #174A3A;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        background: #2E7D5B;
        border-color: #2E7D5B;
        transform: translateY(-2px);
      }
    }

    .btn-help-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #174A3A;
      text-decoration: none;
      padding: 12px 22px;
      border-radius: 999px;
      border: 1px solid rgba(23, 74, 58, 0.2);
      transition: all 0.25s ease;

      &:hover {
        background: rgba(23, 74, 58, 0.05);
        border-color: #174A3A;
      }
    }
  }
`;
