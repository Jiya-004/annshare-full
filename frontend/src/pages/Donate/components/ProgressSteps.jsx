import React from "react";
import styled from "styled-components";
import { IoCheckmark } from "react-icons/io5";

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 40px;
    right: 40px;
    height: 2px;
    background: rgba(23, 74, 58, 0.1);
    z-index: 1;

    @media (max-width: 600px) {
      top: 16px;
      left: 20px;
      right: 20px;
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 22px;
  }
`;

const StepItem = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: ${({ $isPassed }) => ($isPassed ? "pointer" : "default")};

  @media (max-width: 600px) {
    gap: 4px;
  }

  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.88rem;
    font-weight: 700;
    transition: all 0.3s ease;

    @media (max-width: 600px) {
      width: 32px;
      height: 32px;
      font-size: 0.78rem;
    }

    background: ${({ $isActive, $isPassed }) =>
      $isActive
        ? "#174A3A"
        : $isPassed
        ? "#2E7D5B"
        : "#FFFFFF"};

    color: ${({ $isActive, $isPassed }) =>
      $isActive || $isPassed ? "#FFFFFF" : "#8C9E98"};

    border: 2px solid
      ${({ $isActive, $isPassed }) =>
        $isActive
          ? "#174A3A"
          : $isPassed
          ? "#2E7D5B"
          : "rgba(23, 74, 58, 0.15)"};

    box-shadow: ${({ $isActive }) =>
      $isActive ? "0 4px 14px rgba(23, 74, 58, 0.3)" : "none"};
  }

  .step-label {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.84rem;
    font-weight: ${({ $isActive }) => ($isActive ? "700" : "600")};
    color: ${({ $isActive, $isPassed }) =>
      $isActive ? "#174A3A" : $isPassed ? "#2E7D5B" : "#8C9E98"};
    white-space: nowrap;

    @media (max-width: 600px) {
      font-size: 0.68rem;
    }

    @media (max-width: 380px) {
      font-size: 0.62rem;
    }
  }
`;

const STEPS = [
  { step: 1, label: "01 Food Details" },
  { step: 2, label: "02 Pickup Details" },
  { step: 3, label: "03 Review & Publish" },
];

export default function ProgressSteps({ currentStep, onStepClick }) {
  return (
    <StepsContainer>
      {STEPS.map((s) => {
        const isActive = currentStep === s.step;
        const isPassed = currentStep > s.step;

        return (
          <StepItem
            key={s.step}
            $isActive={isActive}
            $isPassed={isPassed}
            onClick={() => isPassed && onStepClick?.(s.step)}
          >
            <div className="step-circle">
              {isPassed ? <IoCheckmark size={18} /> : s.step}
            </div>
            <span className="step-label">{s.label}</span>
          </StepItem>
        );
      })}
    </StepsContainer>
  );
}
