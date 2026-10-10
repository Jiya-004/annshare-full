import styled, { keyframes } from "styled-components";

const floatBreathe = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
  }
`;

const auraPulse = keyframes`
  0%, 100% {
    transform: scale(0.96);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.85;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const LoaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background: radial-gradient(
    circle at 50% 48%,
    #FFFDF9 0%,
    #F8F5ED 65%,
    #F2ECE1 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  touch-action: none;
  pointer-events: ${({ $isExiting }) => ($isExiting ? "none" : "auto")};
  opacity: ${({ $isExiting }) => ($isExiting ? 0 : 1)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  transform: translateY(-12px);
`;

export const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${floatBreathe} 3.2s ease-in-out infinite;

  /* Ambient emerald & gold aura behind the brand monogram */
  &::before {
    content: "";
    position: absolute;
    width: 220px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(
      ellipse,
      rgba(46, 125, 91, 0.14) 0%,
      rgba(245, 158, 11, 0.08) 50%,
      transparent 75%
    );
    z-index: -1;
    pointer-events: none;
    animation: ${auraPulse} 4s ease-in-out infinite;
  }
`;

export const LogoImage = styled.img`
  width: 290px;
  max-width: 82vw;
  height: auto;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;
  filter: drop-shadow(0 6px 20px rgba(23, 74, 58, 0.07));
  transition: transform 0.3s ease;

  @media (max-width: 480px) {
    width: 240px;
  }
`;

export const BrandTagline = styled.p`
  font-family: var(--font-sans, "Inter", -apple-system, BlinkMacSystemFont, sans-serif);
  font-size: 0.94rem;
  font-weight: 500;
  color: #4E675C;
  margin: 16px 0 0;
  letter-spacing: -0.01em;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.84rem;
    margin-top: 14px;
  }
`;

export const ProgressIndicator = styled.div`
  width: 150px;
  height: 3px;
  background: rgba(23, 74, 58, 0.1);
  border-radius: 999px;
  margin-top: 20px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 60%;
    background: linear-gradient(
      90deg,
      transparent,
      #2E7D5B,
      #F59E0B,
      transparent
    );
    background-size: 200% 100%;
    border-radius: 999px;
    animation: ${shimmer} 1.4s ease-in-out infinite;
  }
`;
