import styled, { keyframes } from "styled-components";

const floatSlow = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
`;

const pulseSubtle = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(1.08);
  }
`;

export const PageWrapper = styled.main`
  background-color: #FAF7F0;
  color: #1E342E;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  padding: 130px 0 88px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 108px 0 64px;
  }
`;

export const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const NotFoundCard = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BadgePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(46, 125, 91, 0.1);
  border: 1px solid rgba(46, 125, 91, 0.2);
  color: #2E7D5B;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

export const BigVisualBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .glow-ring {
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.18) 0%, rgba(250, 247, 240, 0) 70%);
    animation: ${pulseSubtle} 4s ease-in-out infinite;
    pointer-events: none;
  }

  .number-display {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(5rem, 11vw, 8rem);
    font-weight: 700;
    color: #173F34;
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;

    .digit {
      display: inline-block;
    }

    .icon-plate {
      width: clamp(70px, 9vw, 96px);
      height: clamp(70px, 9vw, 96px);
      border-radius: 50%;
      background: #FFFFFF;
      border: 3px solid #174A3A;
      box-shadow: 0 10px 24px rgba(23, 74, 58, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2E7D5B;
      font-size: clamp(2rem, 3.8vw, 3rem);
      animation: ${floatSlow} 5s ease-in-out infinite;
      flex-shrink: 0;
    }
  }
`;

export const Title = styled.h1`
  font-family: var(--font-display, 'Poppins', sans-serif);
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  font-weight: 600;
  color: #173F34;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin: 0 0 14px;

  @media (max-width: 480px) {
    font-size: 1.45rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.05rem;
  color: #556B64;
  line-height: 1.62;
  margin: 0 0 32px;
  max-width: 580px;

  @media (max-width: 768px) {
    font-size: 0.96rem;
    margin-bottom: 28px;
  }
`;

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 48px;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #2E7D5B;
    color: #FFFFFF;
    font-size: 0.96rem;
    font-weight: 600;
    padding: 13px 28px;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(46, 125, 91, 0.25);
    transition: all 0.25s ease;

    @media (max-width: 480px) {
      width: 100%;
    }

    &:hover {
      background-color: #246549;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(46, 125, 91, 0.35);
    }
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #FFFFFF;
    color: #173F34;
    border: 1px solid #DDDDD5;
    font-size: 0.96rem;
    font-weight: 600;
    padding: 13px 26px;
    border-radius: 999px;
    text-decoration: none;
    transition: all 0.2s ease;

    @media (max-width: 480px) {
      width: 100%;
    }

    &:hover {
      background: #ECE9E0;
      border-color: #173F34;
      transform: translateY(-2px);
    }
  }
`;

export const QuickLinksSection = styled.div`
  width: 100%;
  margin-top: 16px;
  border-top: 1px solid #DDDDD5;
  padding-top: 40px;

  .section-label {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #69736E;
    margin-bottom: 20px;
    display: block;
    text-align: center;
  }
`;

export const QuickLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const QuickLinkCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 18px 20px;
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(23, 74, 58, 0.03);

  &:hover {
    transform: translateY(-3px);
    border-color: #174A3A;
    box-shadow: 0 10px 22px rgba(23, 74, 58, 0.08);

    .card-icon {
      background: #174A3A;
      color: #FAF7F0;
    }

    .card-title {
      color: #2E7D5B;
    }
  }

  .card-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(46, 125, 91, 0.1);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: 12px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 0.94rem;
    font-weight: 600;
    color: #173F34;
    margin: 0 0 4px;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .card-desc {
    font-size: 0.82rem;
    color: #69736E;
    line-height: 1.45;
    margin: 0;
  }
`;
