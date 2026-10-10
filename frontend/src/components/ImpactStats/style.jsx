import styled, { keyframes } from "styled-components";

// ── Glow & Pulse Keyframes ─────────────────────────────────────────────────
const subtleGlow = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.85;
  }
`;

// ── 1. Main Full-Width Dark Section ─────────────────────────────────────────
export const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 110px 0 120px;
  background: radial-gradient(
    75% 55% at 50% 0%,
    #1b4332 0%,
    #133827 42%,
    #0f2e1e 70%,
    #091d13 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  overflow: hidden;

  /* Ambient radial bloom from top-center */
  &::before {
    content: "";
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 620px;
    height: 300px;
    background: radial-gradient(
      ellipse at center,
      rgba(185, 240, 114, 0.08) 0%,
      rgba(230, 184, 74, 0.06) 45%,
      transparent 75%
    );
    pointer-events: none;
    filter: blur(40px);
    animation: ${subtleGlow} 6s ease-in-out infinite;
  }

  @media (max-width: 991px) {
    padding: 85px 0 95px;
  }

  @media (max-width: 576px) {
    padding: 65px 0 75px;
  }
`;

// ── 2. Top Header Block ─────────────────────────────────────────────────────
export const HeaderArea = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 56px;
  position: relative;
  z-index: 2;

  @media (max-width: 576px) {
    margin-bottom: 40px;
  }
`;

export const BadgePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e6b84a;
  background: rgba(230, 184, 74, 0.08);
  border: 1px solid rgba(230, 184, 74, 0.28);
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 20px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  svg {
    font-size: 0.95rem;
    color: #e6b84a;
  }
`;

export const Headline = styled.h2`
  font-family: var(--font-display, "Poppins", sans-serif);
  font-size: clamp(1.5rem, 2.2vw, 1.85rem);
  font-weight: 600;
  color: #ffffff;
  line-height: 1.22;
  letter-spacing: -0.02em;
  margin: 0 auto 14px;
  text-align: center;
`;

export const Subheadline = styled.p`
  font-size: 1.02rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.65;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  font-weight: 400;

  @media (max-width: 576px) {
    font-size: 0.94rem;
  }
`;

// ── 3. Bordered Rounded Stats Container (rounded-2xl) ───────────────────────
export const StatsContainer = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
  overflow: hidden;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    border-radius: 20px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    border-radius: 18px;
  }
`;

// ── 4. Equal Stat Column with dividers & hover glow ─────────────────────────
export const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 38px 20px;
  position: relative;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);

  /* Desktop vertical dividers */
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  &:last-child {
    border-right: none;
  }

  /* Hover micro-interaction */
  &:hover {
    background: rgba(255, 255, 255, 0.045);
    transform: translateY(-2px);
  }

  /* Tablet: 2x2 grid dividers */
  @media (max-width: 991px) and (min-width: 577px) {
    padding: 30px 16px;

    /* Column 1 and 3 have right border */
    &:nth-child(odd) {
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
    &:nth-child(even) {
      border-right: none;
    }

    /* Top 2 items have bottom border */
    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    &:nth-child(3),
    &:nth-child(4) {
      border-bottom: none;
    }
  }

  /* Mobile: single stacked column with horizontal dividers */
  @media (max-width: 576px) {
    padding: 26px 14px;
    border-right: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &:last-child {
      border-bottom: none;
    }
  }
`;

// ── 5. Column Inner Elements ────────────────────────────────────────────────
export const StatIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(230, 184, 74, 0.1);
  border: 1px solid rgba(230, 184, 74, 0.22);
  color: #e6b84a;
  font-size: 1.25rem;
  margin-bottom: 14px;
  transition: all 0.3s ease;

  svg {
    stroke-width: 1.8;
  }

  ${StatColumn}:hover & {
    transform: scale(1.08);
    background: rgba(230, 184, 74, 0.16);
    border-color: rgba(230, 184, 74, 0.45);
    box-shadow: 0 4px 18px rgba(230, 184, 74, 0.24);
  }
`;

export const StatNumber = styled.div`
  font-family: var(--font-display, "Poppins", sans-serif);
  font-size: clamp(1.5rem, 2.2vw, 1.95rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
  font-variant-numeric: tabular-nums;
`;

export const StatLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.58);
  margin-bottom: 16px;
`;

export const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #b9f072;
  background: rgba(185, 240, 114, 0.1);
  border: 1px solid rgba(185, 240, 114, 0.24);
  padding: 5px 13px;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.25s ease;

  ${StatColumn}:hover & {
    background: rgba(185, 240, 114, 0.16);
    border-color: rgba(185, 240, 114, 0.4);
  }
`;
