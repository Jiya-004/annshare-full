import React from "react";
import {
  HowWrapper,
  Container,
  HeaderArea,
  StepsGrid,
  StepCard,
} from "./style";
import {
  IoCreateOutline,
  IoGitCompareOutline,
  IoBicycleOutline,
  IoHeartOutline,
  IoTimeOutline,
} from "react-icons/io5";

const STEPS = [
  {
    num: "01",
    icon: <IoCreateOutline />,
    title: "1. List Surplus Food",
    desc: "Restaurants or caterers post available portions in 60 seconds with food category, quantity, and pickup window.",
    badge: "< 60 seconds listing",
  },
  {
    num: "02",
    icon: <IoGitCompareOutline />,
    title: "2. Intelligent Match",
    desc: "Our platform pairs surplus items with nearest verified NGOs and community shelters based on dietary needs and capacity.",
    badge: "Automated routing",
  },
  {
    num: "03",
    icon: <IoBicycleOutline />,
    title: "3. Safe & Timely Pickup",
    desc: "Designated NGO staff or courier partners collect items with secure handoff verification and temperature tracking.",
    badge: "Live delivery status",
  },
  {
    num: "04",
    icon: <IoHeartOutline />,
    title: "4. Direct Nourishment",
    desc: "Food reaches tables within hours, feeding vulnerable families while logging carbon reduction and meal impact reports.",
    badge: "Verified impact stats",
  },
];

export default function HowItWorks() {
  return (
    <HowWrapper id="how-it-works">
      <Container>
        <HeaderArea>
          <span className="badge">Simple 4-Step Process</span>
          <h2>How ANNShare Works</h2>
          <p>
            From commercial kitchen surplus to community dining tables — an automated, dignified, and accountable redistribution pipeline.
          </p>
        </HeaderArea>

        <StepsGrid>
          {STEPS.map((step) => (
            <StepCard key={step.num}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className="time-badge">
                <IoTimeOutline size={14} />
                <span>{step.badge}</span>
              </div>
            </StepCard>
          ))}
        </StepsGrid>
      </Container>
    </HowWrapper>
  );
}
