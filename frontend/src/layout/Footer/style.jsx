import styled from "styled-components";

/* ==========================================================================
   ANNShare Premium Airbnb-Style Footer Styled Components
   Palette:
   Deep Forest Green: #174A3A
   Emerald:           #2E7D5B
   Warm Cream:        #F8F5ED
   White:             #FFFFFF
   Soft Text:         #66756F
   Border:            rgba(23, 74, 58, 0.10)
   ========================================================================== */

export const FooterRoot = styled.footer`
  background-color: #F8F5ED;
  color: #174A3A;
  font-family: var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  padding: 80px 0 36px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(23, 74, 58, 0.08);

  @media (max-width: 768px) {
    padding: 60px 0 28px;
  }
`;

export const FooterContainer = styled.div`
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

/* ==========================================================================
   1. IMPACT CTA PANEL
   ========================================================================== */
export const ImpactCtaWrapper = styled.div`
  background: #174A3A;
  border-radius: 28px;
  padding: 56px 48px;
  margin-bottom: 72px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(23, 74, 58, 0.2);
  color: #FFFFFF;

  /* Subtle organic background glows */
  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -40px;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.4) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -80px;
    left: 10%;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(248, 245, 237, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 36px 24px;
    border-radius: 22px;
    margin-bottom: 50px;
  }
`;

export const ImpactCtaContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
`;

export const EyebrowBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #A3E3C7;
  background: rgba(46, 125, 91, 0.25);
  border: 1px solid rgba(163, 227, 199, 0.2);
  padding: 5px 14px;
  border-radius: 999px;
  margin-bottom: 18px;
`;

export const CtaHeading = styled.h2`
  font-family: var(--font-display, 'Poppins', sans-serif);
  font-size: 2.5rem;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 16px;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

export const CtaDescription = styled.p`
  font-size: 1.05rem;
  color: rgba(248, 245, 237, 0.85);
  line-height: 1.6;
  max-width: 620px;
  margin: 0 0 32px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
`;

export const CtaButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
`;

export const PrimaryCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #F8F5ED;
  color: #174A3A;
  border: none;
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 700;
  padding: 13px 26px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #FFFFFF;
    color: #0F3327;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: #F8F5ED;
  border: 1.5px solid rgba(248, 245, 237, 0.45);
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: rgba(248, 245, 237, 0.12);
    border-color: #F8F5ED;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ImpactIndicatorStrip = styled.div`
  font-size: 0.84rem;
  font-weight: 500;
  color: rgba(248, 245, 237, 0.7);
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;

  span.dot {
    opacity: 0.5;
  }

  @media (max-width: 600px) {
    font-size: 0.78rem;
    line-height: 1.5;
  }
`;

/* ==========================================================================
   2. MAIN FOOTER MULTI-COLUMN GRID
   ========================================================================== */
export const MainFooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 64px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
`;

export const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 20px;

  @media (max-width: 1040px) {
    grid-column: span 2;
    padding-right: 0;
  }

  .headline {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.15rem;
    font-weight: 600;
    color: #174A3A;
    margin: 4px 0 0;
  }

  .desc {
    font-size: 0.92rem;
    color: #66756F;
    line-height: 1.6;
    max-width: 320px;
    margin: 0;
  }
`;

export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
`;

export const SocialIconBtn = styled.a`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #FFFFFF;
  border: 1px solid rgba(23, 74, 58, 0.12);
  color: #174A3A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(23, 74, 58, 0.04);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #174A3A;
    color: #FFFFFF;
    border-color: #174A3A;
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(23, 74, 58, 0.18);
  }

  &:focus-visible {
    outline: 2px solid #2E7D5B;
    outline-offset: 2px;
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
    padding-bottom: 12px;
  }
`;

export const ColumnHeading = styled.h4`
  font-size: 0.94rem;
  font-weight: 600;
  color: #174A3A;
  letter-spacing: -0.01em;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin: 0;
    padding: 8px 0;
    cursor: pointer;
    user-select: none;
  }
`;

export const MobileAccordionTrigger = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    padding: 6px 0;
    font-family: inherit;
    font-size: 0.96rem;
    font-weight: 700;
    color: #174A3A;
    cursor: pointer;
    text-align: left;

    .chevron {
      font-size: 1rem;
      color: #66756F;
      transition: transform 0.25s ease;
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    }
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    padding: 10px 0 6px;
    gap: 10px;
  }
`;

export const FooterLink = styled.a`
  font-size: 0.91rem;
  font-weight: 500;
  color: #66756F;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  font-family: inherit;

  &:hover {
    color: #2E7D5B;
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid #2E7D5B;
    outline-offset: 2px;
  }

  &.highlight-action {
    font-weight: 600;
    color: #174A3A;

    &:hover {
      color: #2E7D5B;
    }
  }
`;

/* ==========================================================================
   3. NEWSLETTER / COMMUNITY ROW
   ========================================================================== */
export const NewsletterSection = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(23, 74, 58, 0.1);
  border-radius: 20px;
  padding: 32px 36px;
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.04);

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
    gap: 20px;
  }
`;

export const NewsletterText = styled.div`
  max-width: 480px;

  h4 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: #174A3A;
    margin: 0 0 6px;
  }

  p {
    font-size: 0.88rem;
    color: #66756F;
    line-height: 1.5;
    margin: 0;
  }
`;

export const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 440px;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 12px 18px;
  border-radius: 999px;
  background-color: #F8F5ED;
  border: 1px solid rgba(23, 74, 58, 0.14);
  font-family: inherit;
  font-size: 0.9rem;
  color: #174A3A;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #8C9E98;
  }

  &:focus {
    background-color: #FFFFFF;
    border-color: #2E7D5B;
    box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
  }
`;

export const SubscribeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 22px;
  border-radius: 999px;
  background-color: #174A3A;
  color: #FFFFFF;
  border: none;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 3px 10px rgba(23, 74, 58, 0.15);
  transition: all 0.22s ease;

  &:hover {
    background-color: #2E7D5B;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(46, 125, 91, 0.24);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SubscribedFeedback = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2E7D5B;
  background: rgba(46, 125, 91, 0.1);
  padding: 10px 18px;
  border-radius: 999px;
`;

/* ==========================================================================
   4. BOTTOM FOOTER BAR
   ========================================================================== */
export const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 28px;
  border-top: 1px solid rgba(23, 74, 58, 0.1);
  font-size: 0.85rem;
  color: #66756F;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding-top: 24px;
  }
`;

export const CopyrightText = styled.span`
  color: #66756F;
`;

export const BottomLinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    color: #66756F;
    text-decoration: none;
    transition: color 0.18s ease;

    &:hover {
      color: #174A3A;
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    gap: 14px;
    font-size: 0.82rem;
  }
`;

export const LocationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #556B64;
  background: rgba(23, 74, 58, 0.05);
  padding: 4px 10px;
  border-radius: 999px;
`;
