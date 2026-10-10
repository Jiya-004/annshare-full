import styled, { keyframes, css } from "styled-components";

// ?? Animations ?????????????????????????????????????????????????????????????
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const floatSoft = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

export const badgePulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(110, 231, 183, 0.45);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba(110, 231, 183, 0);
  }
`;

// ?? Page Wrapper ???????????????????????????????????????????????????????????
export const PageWrapper = styled.div`
  background-color: #f8f5ed;
  color: #202824;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: var(--font-sans, "Inter", -apple-system, sans-serif);
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 32px;

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

// ── Common Typography & Badges ─────────────────────────────────────────────
export const EyebrowBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(props) => (props.$light ? "#E6B84A" : "#28624D")};
  background: ${(props) =>
    props.$light ? "rgba(230, 184, 74, 0.14)" : "rgba(40, 98, 77, 0.08)"};
  border: 1px solid
    ${(props) =>
      props.$light ? "rgba(230, 184, 74, 0.35)" : "rgba(40, 98, 77, 0.18)"};
  padding: 8px 18px;
  border-radius: 999px;
  margin-bottom: 20px;
`;

export const SectionHeaderBlock = styled.div`
  text-align: ${(props) => props.$align || "center"};
  max-width: ${(props) => props.$maxWidth || "720px"};
  margin: ${(props) => props.$margin || "0 auto 60px"};

  h2 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: clamp(1.65rem, 2.5vw, 2.15rem);
    font-weight: 600;
    color: ${(props) => (props.$light ? "#FFFFFF" : "#173F35")};
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }

  p {
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    color: ${(props) =>
      props.$light ? "rgba(255, 255, 255, 0.8)" : "#556B64"};
    line-height: 1.68;
    margin: 0;
  }
`;

// ?? 1. Hero Section ????????????????????????????????????????????????????????
export const HeroSectionWrapper = styled.section`
  position: relative;
  background: linear-gradient(145deg, #0f2b24 0%, #173f35 48%, #1f5141 100%);
  padding: 110px 0 95px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -180px;
    right: -100px;
    width: 650px;
    height: 650px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(215, 168, 62, 0.14) 0%,
      transparent 68%
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -150px;
    left: -100px;
    width: 550px;
    height: 550px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(52, 122, 97, 0.25) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 75px 0 65px;
  }
`;

export const HeroContentBox = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease-out both;

  h1 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: clamp(2rem, 3.8vw, 2.85rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin: 0 auto 24px;

    span.accent {
      color: #e6b84a;
      position: relative;
      display: inline-block;
    }
  }

  p.hero-sub {
    font-size: clamp(1.08rem, 1.8vw, 1.25rem);
    color: rgba(255, 255, 255, 0.84);
    line-height: 1.68;
    max-width: 680px;
    margin: 0 auto 40px;
  }
`;

export const HeroCtaGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 56px;
`;

export const PrimaryCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #e6b84a 0%, #d7a83e 100%);
  color: #173f35;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 16px 34px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(215, 168, 62, 0.35);

  &:hover {
    background: linear-gradient(135deg, #f0c45c 0%, #e6b84a 100%);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(215, 168, 62, 0.48);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const SecondaryCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 15px 32px;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

export const HeroStatStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
`;

export const HeroStatPill = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(14px);
  border-radius: 999px;
  padding: 10px 22px;
  color: #ffffff;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(230, 184, 74, 0.45);
    transform: translateY(-2px);
  }

  .pill-num {
    font-size: 1.06rem;
    font-weight: 800;
    color: #e6b84a;
  }

  .pill-lbl {
    font-size: 0.84rem;
    color: rgba(255, 255, 255, 0.78);
    font-weight: 500;
  }
`;

// ?? 2. Story Section ???????????????????????????????????????????????????????
export const StorySectionWrapper = styled.section`
  padding: 140px 0;
  background-color: #f8f5ed;
  position: relative;

  @media (max-width: 768px) {
    padding: 75px 0;
  }
`;

export const StoryContentSide = styled.div`
  padding-right: 24px;

  @media (max-width: 991px) {
    padding-right: 0;
    margin-bottom: 48px;
  }

  h2 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: clamp(1.65rem, 2.5vw, 2.15rem);
    font-weight: 600;
    color: #173f35;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
  }

  p.story-lead {
    font-size: 1.12rem;
    color: #202824;
    line-height: 1.7;
    margin-bottom: 16px;
    font-weight: 500;
  }

  p.story-body {
    font-size: 1rem;
    color: #556b64;
    line-height: 1.72;
    margin-bottom: 26px;
  }
`;

export const StoryQuoteCard = styled.div`
  background: #ffffff;
  border-left: 4px solid #d7a83e;
  border-radius: 0 16px 16px 0;
  padding: 22px 26px;
  box-shadow: 0 10px 28px rgba(23, 63, 53, 0.05);

  p {
    font-size: 0.98rem;
    font-style: italic;
    color: #173f35;
    line-height: 1.65;
    margin: 0 0 12px;
  }

  .author {
    font-size: 0.85rem;
    font-weight: 700;
    color: #28624d;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const StoryCollageWrapper = styled.div`
  position: relative;
  min-height: 480px;

  @media (max-width: 768px) {
    min-height: 400px;
  }

  .img-primary {
    position: absolute;
    top: 0;
    left: 0;
    width: 76%;
    height: 78%;
    object-fit: cover;
    border-radius: 22px;
    box-shadow: 0 20px 48px rgba(15, 43, 36, 0.16);
    border: 4px solid #ffffff;
  }

  .img-secondary {
    position: absolute;
    bottom: 10px;
    right: 0;
    width: 58%;
    height: 58%;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 16px 40px rgba(15, 43, 36, 0.18);
    border: 4px solid #ffffff;
  }
`;

export const FloatingStatCard = styled.div`
  position: absolute;
  top: 36px;
  right: -12px;
  background: #173f35;
  color: #ffffff;
  border-radius: 16px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 14px 34px rgba(15, 43, 36, 0.28);
  border: 1px solid rgba(230, 184, 74, 0.35);
  animation: ${floatSoft} 3.4s ease-in-out infinite;
  z-index: 3;

  @media (max-width: 480px) {
    right: 4px;
    top: 16px;
  }

  .live-dot {
    width: 10px;
    height: 10px;
    background: #6ee7b7;
    border-radius: 50%;
    animation: ${badgePulse} 1.6s ease-in-out infinite;
  }

  .stat-info {
    display: flex;
    flex-direction: column;

    .stat-main {
      font-size: 0.92rem;
      font-weight: 700;
      color: #ffffff;
    }
    .stat-sub {
      font-size: 0.74rem;
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;

// ?? 3. 4-Step Process Section (Stepped Cascading Cards) ????????????????
export const ProcessSectionWrapper = styled.section`
  padding: 120px 0 140px;
  background: #ffffff;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 75px 0 90px;
  }
`;

export const ProcessTopHeaderArea = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 56px;
`;

export const ProcessLimeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #28624d;
  background: rgba(40, 98, 77, 0.08);
  border: 1px solid rgba(40, 98, 77, 0.18);
  padding: 8px 18px;
  border-radius: 999px;
  margin: 0 auto 20px;

  svg {
    font-size: 1rem;
    color: #28624d;
  }
`;

export const ProcessMainTitle = styled.h2`
  font-family: var(--font-display, "Poppins", sans-serif);
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  font-weight: 600;
  color: #173F35;
  line-height: 1.18;
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0 auto 20px;
`;

export const ProcessSubRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p.process-lead {
    font-size: 1.05rem;
    color: #556b64;
    line-height: 1.68;
    max-width: 640px;
    margin: 0 auto;
    text-align: center;
  }
`;

export const ProcessTimingWidget = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);

  .timing-label {
    background: #f4f6f4;
    color: #556b64;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 14px 22px;
  }

  .timing-highlight {
    background: #b9f072;
    color: #173f35;
    font-size: 0.88rem;
    font-weight: 800;
    padding: 14px 22px;
  }
`;

export const ProcessCascadeGrid = styled.div`
  position: relative;
  margin-top: 65px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 0px;

  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 45px;
  }
`;

export const ProcessSlot = styled.div`
  position: relative;

  &.slot-1 {
    grid-column: 1;
    margin-bottom: 50px;
  }

  &.slot-2 {
    grid-column: 2;
    margin-top: 110px;
    margin-bottom: 50px;
  }

  &.slot-3 {
    grid-column: 1;
    margin-bottom: 20px;
  }

  &.slot-4 {
    grid-column: 2;
    margin-top: 110px;
  }

  @media (max-width: 991px) {
    &.slot-1,
    &.slot-2,
    &.slot-3,
    &.slot-4 {
      grid-column: auto;
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`;

export const SteppedProcessCard = styled.div`
  display: flex;
  align-items: stretch;
  gap: 20px;
  background: ${(props) => (props.$isTinted ? "#F2F8ED" : "#FFFFFF")};
  border-radius: 26px;
  padding: 24px 28px 24px 20px;
  border: 1px solid
    ${(props) =>
      props.$isTinted ? "rgba(185, 240, 114, 0.45)" : "rgba(23, 63, 53, 0.08)"};
  box-shadow: 0 10px 32px rgba(23, 63, 53, 0.04);
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 44px rgba(23, 63, 53, 0.09);
    border-color: rgba(40, 98, 77, 0.28);
  }

  @media (max-width: 576px) {
    padding: 18px 18px 18px 14px;
    gap: 14px;
    border-radius: 20px;
  }
`;

export const VerticalTimeCapsule = styled.div`
  width: 38px;
  min-width: 38px;
  border-radius: 999px;
  background: #0e2e24;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px 0;
  box-shadow: 0 4px 14px rgba(14, 46, 36, 0.25);

  span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  @media (max-width: 576px) {
    width: 32px;
    min-width: 32px;
    padding: 16px 0;

    span {
      font-size: 0.65rem;
    }
  }
`;

export const CardMainBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
`;

export const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StepIconSquare = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${(props) =>
    props.$isTinted ? "rgba(255, 255, 255, 0.85)" : "#F4F6F4"};
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #173f35;
  font-size: 1.15rem;
  flex-shrink: 0;
`;

export const CardTitleText = styled.h3`
  font-family: var(--font-display, "Poppins", sans-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: #173f35;
  margin: 0;
  letter-spacing: -0.01em;

  @media (max-width: 576px) {
    font-size: 1.15rem;
  }
`;

export const CardBodyParagraph = styled.p`
  font-size: 0.94rem;
  color: #556b64;
  line-height: 1.64;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 0.88rem;
  }
`;

export const ConnectorLineRight = styled.div`
  position: absolute;
  left: 100%;
  top: 36px;
  width: 140px;
  height: 74px;
  pointer-events: none;
  z-index: 3;

  @media (max-width: 991px) {
    display: none;
  }
`;

export const ConnectorLineLeft = styled.div`
  position: absolute;
  right: 100%;
  top: 119px;
  width: 140px;
  height: 76px;
  pointer-events: none;
  z-index: 3;

  @media (max-width: 991px) {
    display: none;
  }
`;

export const MobileStepConnector = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 16px 0;

  @media (max-width: 991px) {
    display: flex;
  }
`;

// ?? 4. Role Split Cards Section ????????????????????????????????????????????
export const RoleSectionWrapper = styled.section`
  padding: 115px 0;
  background-color: #f8f5ed;

  @media (max-width: 768px) {
    padding: 75px 0;
  }
`;

export const RoleSplitCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(23, 63, 53, 0.08);
  box-shadow: 0 10px 32px rgba(23, 63, 53, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 52px rgba(23, 63, 53, 0.12);
    border-color: rgba(40, 98, 77, 0.28);
  }
`;

export const RoleCardMedia = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${RoleSplitCard}:hover & img {
    transform: scale(1.05);
  }

  .role-category-tag {
    position: absolute;
    top: 18px;
    left: 18px;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    background: ${(props) => props.$accent || "#173F35"};
    padding: 6px 14px;
    border-radius: 999px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  }
`;

export const RoleCardContent = styled.div`
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 480px) {
    padding: 26px 20px;
  }

  h3 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: 1.55rem;
    font-weight: 700;
    color: #173f35;
    margin: 0 0 12px;
  }

  p.role-lead {
    font-size: 0.98rem;
    color: #556b64;
    line-height: 1.65;
    margin: 0 0 24px;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;

    li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.93rem;
      color: #202824;
      line-height: 1.48;

      svg {
        color: ${(props) => props.$accent || "#28624D"};
        font-size: 1.25rem;
        flex-shrink: 0;
        margin-top: 1px;
      }
    }
  }
`;

export const RoleCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: ${(props) => props.$accent || "#173F35"};
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 15px 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: all 0.28s ease;
  box-shadow: 0 6px 20px
    ${(props) =>
      props.$accent ? props.$accent + "36" : "rgba(23, 63, 53, 0.2)"};

  &:hover {
    filter: brightness(1.12);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px
      ${(props) =>
        props.$accent ? props.$accent + "55" : "rgba(23, 63, 53, 0.3)"};
  }
`;

// ?? 5. Trust & Safety Grid ?????????????????????????????????????????????????
export const TrustSectionWrapper = styled.section`
  padding: 115px 0;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 75px 0;
  }
`;

export const TrustCard = styled.div`
  background: #f8f5ed;
  border-radius: 20px;
  padding: 34px 28px;
  border: 1px solid rgba(23, 63, 53, 0.08);
  height: 100%;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #ffffff;
    transform: translateY(-6px);
    box-shadow: 0 16px 38px rgba(23, 63, 53, 0.08);
    border-color: rgba(40, 98, 77, 0.22);
  }

  h4 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: 1.15rem;
    font-weight: 700;
    color: #173f35;
    margin: 0 0 10px;
  }

  p {
    font-size: 0.92rem;
    color: #556b64;
    line-height: 1.62;
    margin: 0;
  }
`;

export const TrustIconCircle = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: ${(props) =>
    props.$gradient ||
    "linear-gradient(135deg, rgba(40, 98, 77, 0.12) 0%, rgba(215, 168, 62, 0.12) 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.55rem;
  color: ${(props) => props.$color || "#28624D"};
  margin-bottom: 22px;
  border: 1px solid rgba(23, 63, 53, 0.06);
`;

// ?? 6. Impact Stats Band ???????????????????????????????????????????????????
export const ImpactSectionWrapper = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #0f2b24 0%, #173f35 60%, #1b4332 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -120px;
    left: 20%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(230, 184, 74, 0.12) 0%,
      transparent 68%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 75px 0;
  }
`;

export const ImpactStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  z-index: 2;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const ImpactStatItem = styled.div`
  background: rgba(15, 43, 36, 0.55);
  backdrop-filter: blur(10px);
  padding: 42px 28px;
  text-align: center;
  transition: all 0.28s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .stat-icon {
    font-size: 2rem;
    color: #e6b84a;
    margin-bottom: 14px;
    display: inline-block;
  }

  .stat-num {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: clamp(2rem, 3.2vw, 2.65rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .stat-lbl {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
  }

  .stat-trend {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #6ee7b7;
    background: rgba(110, 231, 183, 0.12);
    padding: 3px 10px;
    border-radius: 999px;
  }
`;

// ── 7. Testimonials ────────────────────────────────────────────────────────
export const TestimonialSectionWrapper = styled.section`
  padding: 105px 0 110px;
  background-color: #f8f5ed;

  @media (max-width: 768px) {
    padding: 72px 0 75px;
  }
`;

export const TestimonialCard = styled.div`
  background: ${(props) => props.$bg || "#ffffff"};
  border-radius: 16px;
  border: 1px solid #ddddd5;
  box-shadow: 0 4px 18px rgba(23, 63, 53, 0.04);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(23, 63, 53, 0.08);
    border-color: rgba(40, 98, 77, 0.24);
  }

  .card-body-area {
    padding: 30px 28px 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media (max-width: 576px) {
      padding: 24px 20px 16px;
    }
  }

  .card-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .category-tag {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${(props) => props.$accent || "#28624D"};
  }

  .quote-icon {
    font-size: 2.2rem;
    line-height: 0.8;
    font-family: Georgia, serif;
    color: rgba(23, 63, 53, 0.18);
    font-weight: 700;
    user-select: none;
  }

  .quote-text {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: 1.05rem;
    font-weight: 500;
    color: #173f34;
    line-height: 1.58;
    font-style: normal;
    margin: 0;
    flex-grow: 1;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const TestimonialAuthorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  border-top: 1px solid #ece9e0;
  padding: 18px 28px 24px;

  @media (max-width: 576px) {
    padding: 16px 20px 20px;
  }

  .author-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${(props) => props.$bg || "#173F35"};
    color: #faf7f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }

  .author-details {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 0.94rem;
      font-weight: 700;
      color: #173f34;
      line-height: 1.3;
    }

    .role {
      font-size: 0.8rem;
      color: #69736e;
      line-height: 1.35;
      margin-top: 2px;
    }

    .org {
      font-size: 0.78rem;
      color: #8a948f;
      line-height: 1.3;
    }
  }
`;

// ?? 8. FAQ Accordion ???????????????????????????????????????????????????????
export const FaqSectionWrapper = styled.section`
  padding: 115px 0;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 75px 0;
  }
`;

export const FaqListWrapper = styled.div`
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FaqAccordionItem = styled.div`
  background: #f8f5ed;
  border-radius: 18px;
  border: 1px solid
    ${(props) =>
      props.$isOpen ? "rgba(40, 98, 77, 0.28)" : "rgba(23, 63, 53, 0.08)"};
  overflow: hidden;
  transition: all 0.28s ease;

  ${(props) =>
    props.$isOpen &&
    css`
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(23, 63, 53, 0.08);
    `}
`;

export const FaqTriggerButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 24px 28px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  h3 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: 1.08rem;
    font-weight: 600;
    color: #173f35;
    margin: 0;
    line-height: 1.42;
  }

  .chevron-icon {
    font-size: 1.25rem;
    color: #28624d;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    flex-shrink: 0;
    transform: ${(props) =>
      props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }

  @media (max-width: 576px) {
    padding: 18px 20px;
  }
`;

export const FaqAnswerPanel = styled.div`
  padding: 0 28px 24px;

  p {
    font-size: 0.96rem;
    color: #556b64;
    line-height: 1.72;
    margin: 0;
  }

  @media (max-width: 576px) {
    padding: 0 20px 20px;
  }
`;

// ?? 9. Final CTA Banner ????????????????????????????????????????????????????
export const FinalCtaSectionWrapper = styled.section`
  padding: 100px 0 110px;
  background-color: #f8f5ed;

  @media (max-width: 768px) {
    padding: 70px 0 85px;
  }
`;

export const FinalCtaCard = styled.div`
  background: linear-gradient(135deg, #0f2b24 0%, #173f35 50%, #1f5141 100%);
  border-radius: 32px;
  padding: 85px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(15, 43, 36, 0.22);
  border: 1px solid rgba(230, 184, 74, 0.22);

  &::before {
    content: "";
    position: absolute;
    top: -90px;
    left: -90px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(230, 184, 74, 0.16) 0%,
      transparent 68%
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -100px;
    right: -80px;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(52, 122, 97, 0.3) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  h2 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: clamp(1.75rem, 2.8vw, 2.35rem);
    font-weight: 600;
    color: #ffffff;
    margin: 0 auto 18px;
    line-height: 1.18;
    max-width: 780px;
    position: relative;
    z-index: 2;
  }

  p.final-sub {
    font-size: clamp(1rem, 1.7vw, 1.16rem);
    color: rgba(255, 255, 255, 0.82);
    max-width: 620px;
    margin: 0 auto 42px;
    line-height: 1.68;
    position: relative;
    z-index: 2;
  }

  .cta-buttons-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 640px) {
    padding: 55px 24px;
    border-radius: 24px;
  }
`;
