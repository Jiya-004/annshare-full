import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoArrowUp } from "react-icons/io5";

/* ==========================================================================
   STYLED COMPONENTS FOR FLOATING SCROLL TO TOP BUTTON
   ========================================================================== */

const FloatingScrollBtn = styled.button`
  position: fixed;
  bottom: 32px;
  right: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 990;
  box-shadow: 0 6px 20px rgba(23, 74, 58, 0.28);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  transform: ${(props) => (props.$isVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)")};
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.2s ease,
              box-shadow 0.2s ease;
  outline: none;
  padding: 0;

  &:hover {
    background: #0F3327;
    transform: translateY(-3px) scale(1.06);
    box-shadow: 0 10px 24px rgba(23, 74, 58, 0.38);

    .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(-8px);
    }
  }

  &:active {
    transform: translateY(0) scale(0.96);
  }

  /* SVG Progress Ring */
  svg.progress-ring {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 52px;
    height: 52px;
    transform: rotate(-90deg);
    pointer-events: none;
  }

  circle.progress-track {
    fill: transparent;
    stroke: rgba(255, 255, 255, 0.15);
    stroke-width: 2.5;
  }

  circle.progress-indicator {
    fill: transparent;
    stroke: #A7F3D0;
    stroke-width: 2.5;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.1s linear;
  }

  .arrow-icon {
    font-size: 1.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: transform 0.2s ease;
  }

  &:hover .arrow-icon {
    transform: translateY(-2px);
  }

  /* Tooltip */
  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: #0F3327;
    color: #FFFFFF;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    padding: 5px 10px;
    border-radius: 6px;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: #0F3327;
    }
  }

  /* Respect Mobile Bottom Navigation Bar */
  @media (max-width: 860px) {
    bottom: 84px;
    right: 20px;
    width: 44px;
    height: 44px;

    svg.progress-ring {
      width: 48px;
      height: 48px;
      top: -2px;
      left: -2px;
    }

    .arrow-icon {
      font-size: 1.2rem;
    }
  }
`;

/**
 * ScrollToTop Component
 *
 * Dual-purpose component:
 * 1. Automatically scrolls to top on route change (pathname).
 * 2. Renders a smooth floating back-to-top button with circular scroll progress indicator.
 */
export default function ScrollToTop({ threshold = 280, showButton = true }) {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Automatic route change scroll restoration
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  // 2. Track scroll position and calculate progress percentage
  useEffect(() => {
    if (!showButton) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollTop > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  // Circular progress stroke calculation (radius = 23 for 52px viewBox)
  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <FloatingScrollBtn
      type="button"
      onClick={scrollToTop}
      $isVisible={isVisible}
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <svg className="progress-ring" viewBox="0 0 52 52">
        <circle
          className="progress-track"
          cx="26"
          cy="26"
          r={radius}
        />
        <circle
          className="progress-indicator"
          cx="26"
          cy="26"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="arrow-icon">
        <IoArrowUp />
      </span>
      <span className="tooltip">Back to top</span>
    </FloatingScrollBtn>
  );
}
