import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap-grid.min.css";

import {
  HiOutlineShieldCheck,
  HiOutlineScale,
  HiOutlineSparkles,
} from "react-icons/hi";

import {
  SectionWrapper,
  HeaderArea,
  BadgePill,
  Headline,
  Subheadline,
  StatsContainer,
  StatColumn,
  StatIcon,
  StatNumber,
  StatLabel,
  StatusPill,
} from "./style";

// ── Outlined Utensils & Leaf in Heroicons 24x24 / 1.8 Stroke Style ──────────
const UtensilsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2v20M21 2v6a3 3 0 0 1-3 3M18 2a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3M6 2v7a3 3 0 0 0 6 0V2M9 2v20" />
  </svg>
);

const LeafIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

// ── ANNShare 4 Audited Impact Stats Data ─────────────────────────────────────
const IMPACT_STATS = [
  {
    id: "meals-delivered",
    icon: <UtensilsIcon />,
    numericTarget: 32450,
    decimals: 0,
    prefix: "",
    suffix: "+",
    fallbackText: "32,450+",
    label: "Meals Delivered",
    statusPill: "+28% this month",
  },
  {
    id: "food-rescued",
    icon: <HiOutlineScale />,
    numericTarget: 24800,
    decimals: 0,
    prefix: "",
    suffix: " kg",
    fallbackText: "24,800 kg",
    label: "Food Rescued (kg)",
    statusPill: "Zero Landfill",
  },
  {
    id: "co2e-avoided",
    icon: <LeafIcon />,
    numericTarget: 18.2,
    decimals: 1,
    prefix: "",
    suffix: " Tons",
    fallbackText: "18.2 Tons",
    label: "CO₂e Avoided (Tons)",
    statusPill: "Audited Offsets",
  },
  {
    id: "on-time-deliveries",
    icon: <HiOutlineShieldCheck />,
    numericTarget: 99.1,
    decimals: 1,
    prefix: "",
    suffix: "%",
    fallbackText: "99.1%",
    label: "On-Time Deliveries (%)",
    statusPill: "Traceable Chain",
  },
];

// ── Animated Counter Sub-Component ──────────────────────────────────────────
function AnimatedStatItem({ stat, isVisible }) {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    let animationFrameId = null;
    const duration = 1900; // ms

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = easeOut * stat.numericTarget;
      setCurrentVal(val);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        setCurrentVal(stat.numericTarget);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, stat.numericTarget]);

  // Format animated or fallback text
  const renderNumber = () => {
    if (!isVisible) return stat.fallbackText;
    const formattedNum =
      stat.decimals > 0
        ? currentVal.toFixed(stat.decimals)
        : Math.round(currentVal).toLocaleString("en-US");
    return `${stat.prefix}${formattedNum}${stat.suffix}`;
  };

  return (
    <StatColumn>
      <StatIcon>{stat.icon}</StatIcon>
      <StatNumber>{renderNumber()}</StatNumber>
      <StatLabel>{stat.label}</StatLabel>
      <StatusPill>
        <span>{stat.statusPill}</span>
      </StatusPill>
    </StatColumn>
  );
}

// ── Main ImpactStats Component ──────────────────────────────────────────────
export default function ImpactStats() {
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="impact-stats" ref={sectionRef}>
      <Container>
        {/* Top Centered Header */}
        <HeaderArea>
          <BadgePill>
            <HiOutlineSparkles />
            <span>Audited Impact</span>
          </BadgePill>
          <Headline>Exponential Social Impact</Headline>
          <Subheadline>
            Every meal saved directly alleviates local hunger while keeping
            organic waste out of municipal landfills.
          </Subheadline>
        </HeaderArea>

        {/* 4-Column Bordered Rounded Container */}
        <StatsContainer>
          {IMPACT_STATS.map((stat) => (
            <AnimatedStatItem
              key={stat.id}
              stat={stat}
              isVisible={hasScrolledIntoView}
            />
          ))}
        </StatsContainer>
      </Container>
    </SectionWrapper>
  );
}
