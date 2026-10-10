import styled from "styled-components";

// ── Global Canvas ───────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  background-color: #F8F5ED;
  color: #1E342E;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  overflow-x: clip;
`;

export const Container = styled.div`
  max-width: 1240px;
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

// ── Compact Policy Hero ─────────────────────────────────────────────────────
export const PolicyHeroSection = styled.header`
  padding: 120px 0 48px;
  background-color: #ECE9E0;
  border-bottom: 1px solid #DDDDD5;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 0 36px;
  }
`;

export const PolicyHeroContent = styled.div`
  max-width: 720px;
  margin: 0 auto;

  .eyebrow {
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
  }

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.85rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.025em;
    line-height: 1.25;
    margin: 0 0 12px;

    @media (max-width: 640px) {
      font-size: 1.45rem;
    }
  }

  .description {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 18px;
  }

  .meta-updated {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #69736E;
    background: #FFFFFF;
    border: 1px solid #DDDDD5;
    padding: 4px 14px;
    border-radius: 999px;
  }
`;

// ── Main Two-Column Documentation Grid ──────────────────────────────────────
export const MainPolicyLayout = styled.main`
  padding: 56px 0 88px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 32px 0 64px;
  }
`;

export const DocSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 56px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// ── Left: Sticky Table of Contents ──────────────────────────────────────────
export const StickyTocSidebar = styled.aside`
  position: -webkit-sticky;
  position: sticky;
  top: 96px;
  align-self: start;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-right: 12px;
  z-index: 10;

  @media (max-width: 992px) {
    display: none; /* Replaced by MobileTocDropdown */
  }

  /* Thin minimalist scrollbar */
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(23, 74, 58, 0.15);
    border-radius: 999px;
  }

  .toc-heading {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #69736E;
    margin-bottom: 16px;
    padding-left: 12px;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const TocLink = styled.a`
  display: block;
  padding: 7px 12px;
  font-size: 0.88rem;
  line-height: 1.45;
  text-decoration: none;
  border-radius: 0 6px 6px 0;
  border-left: 2px solid ${({ $isActive }) => ($isActive ? "#2E7D5B" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#174A3A" : "#556B64")};
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  background: ${({ $isActive }) => ($isActive ? "rgba(46, 125, 91, 0.06)" : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: #174A3A;
    background: rgba(46, 125, 91, 0.04);
  }
`;

// ── Mobile Table of Contents Accordion / Dropdown ───────────────────────────
export const MobileTocWrapper = styled.div`
  display: none;
  margin-bottom: 24px;
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 992px) {
    display: block;
  }

  .mobile-toc-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: transparent;
    border: none;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    color: #174A3A;
    cursor: pointer;

    .icon-chevron {
      transition: transform 0.25s ease;
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
      color: #2E7D5B;
    }
  }

  .mobile-toc-menu {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    padding: 8px 12px 14px;
    border-top: 1px solid #DDDDD5;
    background: #FAFAFA;
    gap: 4px;
  }
`;

export const MobileTocItem = styled.a`
  padding: 8px 12px;
  font-size: 0.88rem;
  color: ${({ $isActive }) => ($isActive ? "#174A3A" : "#556B64")};
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  text-decoration: none;
  border-radius: 6px;
  background: ${({ $isActive }) => ($isActive ? "rgba(46, 125, 91, 0.08)" : "transparent")};
`;

// ── Right: Policy Content Article ───────────────────────────────────────────
export const PolicyArticle = styled.article`
  max-width: 800px;
  width: 100%;

  .policy-intro {
    font-size: 1.1rem;
    color: #40544E;
    line-height: 1.75;
    margin: 0 0 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid #DDDDD5;
  }

  .policy-section {
    margin-bottom: 48px;
    padding-bottom: 40px;
    border-bottom: 1px solid #DDDDD5;

    &:last-of-type {
      margin-bottom: 56px;
      padding-bottom: 0;
      border-bottom: none;
    }

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.55rem;
      font-weight: 600;
      color: #174A3A;
      letter-spacing: -0.015em;
      margin: 0 0 16px;
      line-height: 1.3;
      scroll-margin-top: 100px;

      @media (max-width: 640px) {
        font-size: 1.35rem;
      }
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.18rem;
      font-weight: 600;
      color: #1E342E;
      margin: 22px 0 10px;
    }

    p {
      font-size: 1.02rem;
      color: #3B4E47;
      line-height: 1.75;
      margin: 0 0 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ul, ol {
      margin: 12px 0 18px;
      padding-left: 22px;
      color: #3B4E47;

      li {
        font-size: 1rem;
        line-height: 1.7;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

// ── Subtle Callout Component ("Good to know") ───────────────────────────────
export const CalloutBox = styled.aside`
  background-color: #F4F7EE;
  border-left: 3.5px solid #2E7D5B;
  border-radius: 0 8px 8px 0;
  padding: 18px 20px;
  margin: 24px 0;
  display: flex;
  gap: 14px;
  align-items: flex-start;

  .callout-icon {
    font-size: 1.25rem;
    color: #2E7D5B;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .callout-body {
    strong {
      display: block;
      font-size: 0.94rem;
      font-weight: 700;
      color: #174A3A;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.94rem !important;
      color: #3B4E47 !important;
      line-height: 1.65 !important;
      margin: 0 !important;
    }
  }
`;

// ── Related Policies Section ────────────────────────────────────────────────
export const RelatedPoliciesSection = styled.section`
  padding: 72px 0;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
`;

export const RelatedHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 40px;

  .eyebrow {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.09);
    padding: 5px 14px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 12px;
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.1rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0;
    line-height: 1.25;

    @media (max-width: 640px) {
      font-size: 1.7rem;
    }
  }
`;

export const RelatedCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const RelatedCard = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  padding: 26px 24px;
  border: 1px solid #DDDDD5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(23, 74, 58, 0.03);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(46, 125, 91, 0.3);
    box-shadow: 0 10px 24px rgba(23, 74, 58, 0.07);
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.2rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 8px;
  }

  p {
    font-size: 0.94rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 20px;
  }

  .link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.92rem;
    font-weight: 600;
    color: #2E7D5B;
    text-decoration: none;
    transition: gap 0.2s ease;

    &:hover {
      gap: 10px;
      color: #174A3A;
    }
  }
`;

// ── Need Help Section (Compact Support Panel) ────────────────────────────────
export const NeedHelpSection = styled.section`
  padding: 60px 0;
  background-color: #F8F5ED;
  border-top: 1px solid #DDDDD5;
  text-align: center;
`;

export const NeedHelpBox = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.85rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 10px;
  }

  p {
    font-size: 1.02rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 24px;
  }

  .contact-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 26px;
    border-radius: 999px;
    background: #174A3A;
    color: #F8F5ED;
    font-family: inherit;
    font-size: 0.94rem;
    font-weight: 600;
    border: 1px solid #174A3A;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: #2E7D5B;
      border-color: #2E7D5B;
      transform: translateY(-2px);
    }
  }
`;

