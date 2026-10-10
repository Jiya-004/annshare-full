import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import ImpactStats from "../../components/ImpactStats";

import {
  PageWrapper,
  Container,
  EyebrowBadge,
  SectionHeaderBlock,
  HeroSectionWrapper,
  HeroContentBox,
  HeroCtaGroup,
  PrimaryCtaButton,
  SecondaryCtaButton,
  HeroStatStrip,
  HeroStatPill,
  StorySectionWrapper,
  StoryContentSide,
  StoryQuoteCard,
  StoryCollageWrapper,
  FloatingStatCard,
  ProcessSectionWrapper,
  ProcessTopHeaderArea,
  ProcessLimeBadge,
  ProcessMainTitle,
  ProcessSubRow,
  ProcessTimingWidget,
  ProcessCascadeGrid,
  ProcessSlot,
  SteppedProcessCard,
  VerticalTimeCapsule,
  CardMainBody,
  CardHeaderRow,
  StepIconSquare,
  CardTitleText,
  CardBodyParagraph,
  ConnectorLineRight,
  ConnectorLineLeft,
  MobileStepConnector,
  RoleSectionWrapper,
  RoleSplitCard,
  RoleCardMedia,
  RoleCardContent,
  RoleCtaButton,
  TrustSectionWrapper,
  TrustCard,
  TrustIconCircle,
  TestimonialSectionWrapper,
  TestimonialCard,
  TestimonialAuthorBox,
  FaqSectionWrapper,
  FaqListWrapper,
  FaqAccordionItem,
  FaqTriggerButton,
  FaqAnswerPanel,
  FinalCtaSectionWrapper,
  FinalCtaCard,
} from "./style";

import {
  IoSparkles,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoArrowForward,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoChevronDown,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoScaleOutline,
  IoHeartOutline,
  IoLockClosedOutline,
  IoFlashOutline,
  IoDocumentTextOutline,
  IoRibbonOutline,
  IoGlobeOutline,
  IoStorefrontOutline,
  IoGitCompareOutline,
  IoBicycleOutline,
} from "react-icons/io5";

// ── 1. Hero Live Stats ──────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "32,450+", label: "Meals Redirected" },
  { value: "24,800 kg", label: "Surplus Rescued" },
  { value: "180+", label: "Verified Partners" },
  { value: "< 25 min", label: "Avg. Match Window" },
];

// ── 2. 4-Step Process Data (ANNShare Steps: Step 1, Step 2, Step 3, Step 4) ─
const STEPPED_PROCESS_DATA = [
  {
    stepNumber: "1",
    timeCapsule: "Step 1",
    isTinted: true,
    icon: <IoRestaurantOutline />,
    title: "1 List Surplus Food",
    description:
      "Commercial kitchens post excess meals in 60 seconds with portion counts, allergens, and pickup times.",
    slotClass: "slot-1",
  },
  {
    stepNumber: "2",
    timeCapsule: "Step 2",
    isTinted: false,
    icon: <IoGitCompareOutline />,
    title: "2 Smart Match",
    description:
      "Our system instantly pairs meals with nearby verified shelters based on dietary need and proximity.",
    slotClass: "slot-2",
  },
  {
    stepNumber: "3",
    timeCapsule: "Step 3",
    isTinted: false,
    icon: <IoBicycleOutline />,
    title: "3 Safe Pickup",
    description:
      "Trained volunteer couriers verify safety checklists and transport food in insulated carriers.",
    slotClass: "slot-3",
  },
  {
    stepNumber: "4",
    timeCapsule: "Step 4",
    isTinted: true,
    icon: <IoHeartOutline />,
    title: "4 Nourish & Track",
    description:
      "Warm meals are served with dignity, and partners receive instant impact receipts with CO₂ saved.",
    slotClass: "slot-4",
  },
];

// ?? 3. Role Split Data ??????????????????????????????????????????????????????
const ROLE_DATA = [
  {
    category: "For Donors & Kitchens",
    accent: "#173F35",
    image: "/food.png",
    imageAlt: "Restaurant kitchen surplus food ready for donation",
    title: "I Have Surplus Food to Share",
    lead: "Eliminate food disposal costs while transforming untouched kitchen portions, banquets, and commercial bakery excess into community nourishment.",
    features: [
      "Post excess food batches in 60 seconds with no ongoing fees",
      "Direct handoff to 100% vetted local shelters and community homes",
      "Eliminate landfill disposal taxes and food wastage guilt",
      "Receive automated monthly ESG & carbon avoidance certificates",
    ],
    buttonText: "Start Sharing Surplus Food",
    action: "donate",
  },
  {
    category: "For Shelters & Communities",
    accent: "#28624D",
    image: "/foodeating.png",
    imageAlt: "Children and families receiving warm meals at shelter",
    title: "I Need Food For My Community",
    lead: "Access a dependable stream of safe, high-grade surplus meals and pantry essentials from Kathmandu's leading hotels, restaurants, and bakeries.",
    features: [
      "100% free service for verified non-profit organizations",
      "Daily proactive alerts when nearby kitchens list surplus food",
      "Clear allergen disclosures, dietary details, and safe handling logs",
      "Reliable volunteer logistics coordination and prompt deliveries",
    ],
    buttonText: "Request Meals For Your Shelter",
    action: "need",
  },
];

// ?? 4. Trust & Safety Pillars ??????????????????????????????????????????????
const TRUST_ITEMS = [
  {
    icon: <IoShieldCheckmarkOutline />,
    color: "#28624D",
    gradient:
      "linear-gradient(135deg, rgba(40, 98, 77, 0.14) 0%, rgba(52, 122, 97, 0.08) 100%)",
    title: "100% Vetted Recipient Network",
    text: "Every NGO, shelter, and community kitchen submits government registration, hygiene permits, and undergoes on-site facility verification before joining.",
  },
  {
    icon: <IoLeafOutline />,
    color: "#173F35",
    gradient:
      "linear-gradient(135deg, rgba(23, 63, 53, 0.14) 0%, rgba(31, 81, 65, 0.08) 100%)",
    title: "Strict Food Safety & Thermal Rules",
    text: "Only freshly prepared, untouched food is accepted. All listings specify cooking timestamps, allergen profiles, and safe consumption cutoffs.",
  },
  {
    icon: <IoFlashOutline />,
    color: "#8B3A2B",
    gradient:
      "linear-gradient(135deg, rgba(139, 58, 43, 0.14) 0%, rgba(168, 73, 55, 0.08) 100%)",
    title: "Sub-30 Minute Automated Dispatch",
    text: "Hyperlocal algorithmic pairing ensures pairings happen within minutes, so hot meals arrive at dining tables well before any quality deterioration.",
  },
  {
    icon: <IoRibbonOutline />,
    color: "#B4831B",
    gradient:
      "linear-gradient(135deg, rgba(215, 168, 62, 0.18) 0%, rgba(230, 184, 74, 0.1) 100%)",
    title: "Audited ESG & Carbon Metrics",
    text: "Each completed delivery issues an auditable digital certificate with verified kilograms, meal numbers, and CO? offset data ready for CSR reporting.",
  },
  {
    icon: <IoLockClosedOutline />,
    color: "#28624D",
    gradient:
      "linear-gradient(135deg, rgba(40, 98, 77, 0.14) 0%, rgba(52, 122, 97, 0.08) 100%)",
    title: "Dignified, Stigma-Free Distribution",
    text: "We prioritize respect, privacy, and dignity at every stage of collection and feeding, ensuring recipients receive warm hospitality without humiliation.",
  },
  {
    icon: <IoGlobeOutline />,
    color: "#173F35",
    gradient:
      "linear-gradient(135deg, rgba(23, 63, 53, 0.14) 0%, rgba(31, 81, 65, 0.08) 100%)",
    title: "Zero Fees & Mission Transparency",
    text: "ANNShare is free for donors and recipient charities alike. Funded by sustainability grants and forward-thinking corporate partners.",
  },
];


// ── 6. Testimonials ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    category: "FOOD DONOR",
    quote:
      "ANNShare helps us make sure good food from late events reaches people instead of ending up in the bin.",
    name: "Priya Maharjan",
    role: "Executive Chef",
    organization: "The Dwarika's Hotel, Kathmandu",
    initials: "PM",
    accentColor: "#173F34",
    bg: "#FFFFFF",
    avatarBg: "#173F34",
  },
  {
    category: "NGO PARTNER",
    quote:
      "Reliable access to fresh food has made a meaningful difference for the children and families we support.",
    name: "Sita Tamang",
    role: "Director",
    organization: "Baal Ghar Children's Home",
    initials: "ST",
    accentColor: "#407B5E",
    bg: "#FAF9F4",
    avatarBg: "#28624D",
  },
  {
    category: "CORPORATE PARTNER",
    quote:
      "ANNShare gives us a practical and transparent way to turn surplus food into measurable community impact.",
    name: "Aakash Thapa",
    role: "Sustainability & CSR Lead",
    organization: "Yak & Yeti",
    initials: "AT",
    accentColor: "#5A6B5C",
    bg: "#F9F7F2",
    avatarBg: "#3A5C4C",
  },
];

// ?? 7. FAQ Items ???????????????????????????????????????????????????????????
const FAQ_ITEMS = [
  {
    id: 1,
    question:
      "What categories of surplus food can commercial businesses donate?",
    answer:
      "We accept prepared hot and cold buffet dishes, unserved banquet trays, commercial bakery products, dairy, fresh vegetables and fruits, and packaged dry inventory. All donations must be prepared in licensed commercial kitchens, untouched by patrons, and properly stored within municipal hygiene standards.",
  },
  {
    id: 2,
    question: "How does ANNShare verify recipient organizations and shelters?",
    answer:
      "Every prospective receiving shelter or community kitchen must submit proof of legal non-profit registration, food safety permits, and kitchen facility photos. Our local ground coordinators conduct an in-person site review to verify refrigeration and clean dining facilities before granting platform access.",
  },
  {
    id: 3,
    question: "How fast is food picked up once posted on the platform?",
    answer:
      "Our hyperlocal dispatch algorithm notifies verified shelters within an immediate 3?8 kilometer perimeter. In Kathmandu Valley, pairings average under 18 minutes, and physical pickup is completed well before the stated freshness cutoff window.",
  },
  {
    id: 4,
    question:
      "Is there any cost for hotels, restaurants, or charities to use ANNShare?",
    answer:
      "No. ANNShare is 100% free for both food donors and community relief non-profits. Our platform operations, matching infrastructure, and logistics coordination are supported by sustainability impact grants, CSR sponsorships, and green innovation funds.",
  },
  {
    id: 5,
    question:
      "How do donors receive certificates for their CSR and ESG reporting?",
    answer:
      "Once an authorized shelter volunteer confirms delivery via digital QR handoff, a blockchain-verifiable impact certificate is instantly generated in the donor dashboard. It includes total kilograms, meal portions, CO? equivalents averted, and receiving organization details for official disclosures.",
  },
];

// ?? Main Page Component ????????????????????????????????????????????????????
export default function HowItWorks() {
  const navigate = useNavigate();
  // Clean accordion state ? no default-open clutter
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleDonate = () => navigate("/donate");
  const handleFindFood = () => navigate("/find-food");

  return (
    <PageWrapper>
      {/* ?? 2. Narrative Story & Image Collage ???????????????????????? */}
      <StorySectionWrapper>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <StoryContentSide>
                <EyebrowBadge>
                  <IoLeafOutline />
                  <span>The Human Connection</span>
                </EyebrowBadge>

                <h2>
                  Closing the two-kilometer gap between excess and hunger.
                </h2>

                <p className="story-lead">
                  At 10:00 PM in Kathmandu, a hotel banquet finishes with fifty
                  portions of warm, untouched biryani and lentils. Two
                  kilometers down the road, an eldercare home wonders how to
                  fund tomorrow's breakfast.
                </p>

                <p className="story-body">
                  Food insecurity is rarely a problem of food scarcity ? it is a
                  problem of fragmented logistics, lack of trust, and timing.
                  ANNShare replaces awkward phone calls and ad-hoc arrangements
                  with a modern platform that handles verification, dispatch,
                  and safety checklists in minutes.
                </p>
              </StoryContentSide>
            </Col>

            <Col lg={6}>
              <StoryCollageWrapper>
                <img
                  src="nepali-food-sharing-group.jpg"
                  alt="Quality prepared surplus food"
                  className="img-primary"
                  loading="lazy"
                />
                <img
                  src="nepali-kitchen-serving.jpg"
                  alt="Community members enjoying a nutritious warm meal"
                  className="img-secondary"
                  loading="lazy"
                />
                <FloatingStatCard>
                  <div className="live-dot" />
                  <div className="stat-info">
                    <span className="stat-main">Live Redistribution</span>
                    <span className="stat-sub">
                      14 kitchens active in Kathmandu Valley
                    </span>
                  </div>
                </FloatingStatCard>
              </StoryCollageWrapper>
            </Col>
          </Row>
        </Container>
      </StorySectionWrapper>

      {/* ── 3. 4-Step Process (Matching User Image Layout) ───────────── */}
      <ProcessSectionWrapper id="process-steps">
        <Container>
          <ProcessTopHeaderArea>
            <ProcessLimeBadge>
              <IoLeafOutline />
              <span>How It Works</span>
            </ProcessLimeBadge>
            <ProcessMainTitle>
              How ANNShare Works in 4 Steps
            </ProcessMainTitle>
            <ProcessSubRow>
              <p className="process-lead">
                A seamless food recovery pipeline connecting commercial kitchens
                to local shelters—ensuring fresh meals arrive safely and with dignity.
              </p>
            </ProcessSubRow>
          </ProcessTopHeaderArea>

          <ProcessCascadeGrid>
            {/* Step 1 */}
            <ProcessSlot className="slot-1">
              <SteppedProcessCard $isTinted={STEPPED_PROCESS_DATA[0].isTinted}>
                <VerticalTimeCapsule>
                  <span>{STEPPED_PROCESS_DATA[0].timeCapsule}</span>
                </VerticalTimeCapsule>
                <CardMainBody>
                  <CardHeaderRow>
                    <StepIconSquare
                      $isTinted={STEPPED_PROCESS_DATA[0].isTinted}
                    >
                      {STEPPED_PROCESS_DATA[0].icon}
                    </StepIconSquare>
                    <CardTitleText>
                      {STEPPED_PROCESS_DATA[0].title}
                    </CardTitleText>
                  </CardHeaderRow>
                  <CardBodyParagraph>
                    {STEPPED_PROCESS_DATA[0].description}
                  </CardBodyParagraph>
                </CardMainBody>
              </SteppedProcessCard>

              {/* Dotted curve connecting Step 1 to Step 2 */}
              <ConnectorLineRight>
                <svg width="140" height="74" viewBox="0 0 140 74" fill="none">
                  <path
                    d="M 0 2 H 116 Q 128 2 128 14 V 65"
                    stroke="#8BAE8E"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <polygon points="124,63 128,73 132,63" fill="#8BAE8E" />
                </svg>
              </ConnectorLineRight>
            </ProcessSlot>

            <MobileStepConnector>
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="26"
                  stroke="#8BAE8E"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
                <polygon points="8,26 12,34 16,26" fill="#8BAE8E" />
              </svg>
            </MobileStepConnector>

            {/* Step 2 */}
            <ProcessSlot className="slot-2">
              <SteppedProcessCard $isTinted={STEPPED_PROCESS_DATA[1].isTinted}>
                <VerticalTimeCapsule>
                  <span>{STEPPED_PROCESS_DATA[1].timeCapsule}</span>
                </VerticalTimeCapsule>
                <CardMainBody>
                  <CardHeaderRow>
                    <StepIconSquare
                      $isTinted={STEPPED_PROCESS_DATA[1].isTinted}
                    >
                      {STEPPED_PROCESS_DATA[1].icon}
                    </StepIconSquare>
                    <CardTitleText>
                      {STEPPED_PROCESS_DATA[1].title}
                    </CardTitleText>
                  </CardHeaderRow>
                  <CardBodyParagraph>
                    {STEPPED_PROCESS_DATA[1].description}
                  </CardBodyParagraph>
                </CardMainBody>
              </SteppedProcessCard>

              {/* Dotted curve connecting Step 2 to Step 3 */}
              <ConnectorLineLeft>
                <svg width="140" height="76" viewBox="0 0 140 76" fill="none">
                  <path
                    d="M 140 2 H 24 Q 12 2 12 14 V 67"
                    stroke="#8BAE8E"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <polygon points="8,65 12,75 16,65" fill="#8BAE8E" />
                </svg>
              </ConnectorLineLeft>
            </ProcessSlot>

            <MobileStepConnector>
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="26"
                  stroke="#8BAE8E"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
                <polygon points="8,26 12,34 16,26" fill="#8BAE8E" />
              </svg>
            </MobileStepConnector>

            {/* Step 3 */}
            <ProcessSlot className="slot-3">
              <SteppedProcessCard $isTinted={STEPPED_PROCESS_DATA[2].isTinted}>
                <VerticalTimeCapsule>
                  <span>{STEPPED_PROCESS_DATA[2].timeCapsule}</span>
                </VerticalTimeCapsule>
                <CardMainBody>
                  <CardHeaderRow>
                    <StepIconSquare
                      $isTinted={STEPPED_PROCESS_DATA[2].isTinted}
                    >
                      {STEPPED_PROCESS_DATA[2].icon}
                    </StepIconSquare>
                    <CardTitleText>
                      {STEPPED_PROCESS_DATA[2].title}
                    </CardTitleText>
                  </CardHeaderRow>
                  <CardBodyParagraph>
                    {STEPPED_PROCESS_DATA[2].description}
                  </CardBodyParagraph>
                </CardMainBody>
              </SteppedProcessCard>

              {/* Dotted curve connecting Step 3 to Step 4 */}
              <ConnectorLineRight>
                <svg width="140" height="74" viewBox="0 0 140 74" fill="none">
                  <path
                    d="M 0 2 H 116 Q 128 2 128 14 V 65"
                    stroke="#8BAE8E"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <polygon points="124,63 128,73 132,63" fill="#8BAE8E" />
                </svg>
              </ConnectorLineRight>
            </ProcessSlot>

            <MobileStepConnector>
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="26"
                  stroke="#8BAE8E"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
                <polygon points="8,26 12,34 16,26" fill="#8BAE8E" />
              </svg>
            </MobileStepConnector>

            {/* Step 4 */}
            <ProcessSlot className="slot-4">
              <SteppedProcessCard $isTinted={STEPPED_PROCESS_DATA[3].isTinted}>
                <VerticalTimeCapsule>
                  <span>{STEPPED_PROCESS_DATA[3].timeCapsule}</span>
                </VerticalTimeCapsule>
                <CardMainBody>
                  <CardHeaderRow>
                    <StepIconSquare
                      $isTinted={STEPPED_PROCESS_DATA[3].isTinted}
                    >
                      {STEPPED_PROCESS_DATA[3].icon}
                    </StepIconSquare>
                    <CardTitleText>
                      {STEPPED_PROCESS_DATA[3].title}
                    </CardTitleText>
                  </CardHeaderRow>
                  <CardBodyParagraph>
                    {STEPPED_PROCESS_DATA[3].description}
                  </CardBodyParagraph>
                </CardMainBody>
              </SteppedProcessCard>
            </ProcessSlot>
          </ProcessCascadeGrid>
        </Container>
      </ProcessSectionWrapper>

      {/* ?? 4. Role Split Cards (Which Role Fits You) ????????????????? */}
      <RoleSectionWrapper>
        <Container>
          <SectionHeaderBlock>
            <EyebrowBadge>
              <IoStorefrontOutline />
              <span>Choose Your Journey</span>
            </EyebrowBadge>
            <h2>Which role fits you?</h2>
            <p>
              Whether donating surplus meals or receiving food for your community,
              ANNShare makes the entire process seamless.
            </p>
          </SectionHeaderBlock>

          <Row className="g-4">
            {ROLE_DATA.map((role, idx) => (
              <Col lg={6} key={idx}>
                <RoleSplitCard>
                  <RoleCardMedia $accent={role.accent}>
                    <img src={role.image} alt={role.imageAlt} loading="lazy" />
                    <span className="role-category-tag">{role.category}</span>
                  </RoleCardMedia>

                  <RoleCardContent $accent={role.accent}>
                    <h3>{role.title}</h3>
                    <p className="role-lead">{role.lead}</p>

                    <ul className="feature-list">
                      {role.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <IoCheckmarkCircle />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <RoleCtaButton
                      type="button"
                      $accent={role.accent}
                      onClick={
                        role.action === "donate" ? handleDonate : handleFindFood
                      }
                    >
                      <span>{role.buttonText}</span>
                      <IoArrowForward />
                    </RoleCtaButton>
                  </RoleCardContent>
                </RoleSplitCard>
              </Col>
            ))}
          </Row>
        </Container>
      </RoleSectionWrapper>

      {/* ── 5. Trust & Safety Grid ──────────────────────────────────── */}
      <TrustSectionWrapper>
        <Container>
          <SectionHeaderBlock>
            <EyebrowBadge>
              <IoShieldCheckmarkOutline />
              <span>Safety, Hygiene & Ethics</span>
            </EyebrowBadge>
            <h2>Institutional Trust & Hygiene</h2>
            <p>
              Uncompromising food safety, strict temperature compliance, and
              complete traceability at every step.
            </p>
          </SectionHeaderBlock>

          <Row className="g-4">
            {TRUST_ITEMS.map((item, idx) => (
              <Col md={6} lg={4} key={idx}>
                <TrustCard>
                  <TrustIconCircle
                    $color={item.color}
                    $gradient={item.gradient}
                  >
                    {item.icon}
                  </TrustIconCircle>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </TrustCard>
              </Col>
            ))}
          </Row>
        </Container>
      </TrustSectionWrapper>

      {/* ── 6. Impact Stats Band (Dark Premium Stats) ─────────────── */}
      <ImpactStats />

      {/* ── 7. Testimonials ────────────────────────────────────────── */}
      <TestimonialSectionWrapper>
        <Container>
          <SectionHeaderBlock>
            <EyebrowBadge>
              <IoHeartOutline />
              <span>COMMUNITY VOICES</span>
            </EyebrowBadge>
            <h2>Trusted by people making a difference.</h2>
            <p>
              From food donors to community organizations, see how ANNShare is
              helping good food reach the right places.
            </p>
          </SectionHeaderBlock>

          <Row className="g-4">
            {TESTIMONIALS.map((t, idx) => (
              <Col md={6} lg={4} key={idx}>
                <TestimonialCard $accent={t.accentColor} $bg={t.bg}>
                  <div className="card-body-area">
                    <div className="card-top-row">
                      <span className="category-tag">{t.category}</span>
                      <span className="quote-icon" aria-hidden="true">
                        &ldquo;
                      </span>
                    </div>
                    <p className="quote-text">&ldquo;{t.quote}&rdquo;</p>
                  </div>

                  <TestimonialAuthorBox $bg={t.avatarBg}>
                    <div className="author-avatar">{t.initials}</div>
                    <div className="author-details">
                      <span className="name">{t.name}</span>
                      <span className="role">{t.role}</span>
                      {t.organization && (
                        <span className="org">{t.organization}</span>
                      )}
                    </div>
                  </TestimonialAuthorBox>
                </TestimonialCard>
              </Col>
            ))}
          </Row>
        </Container>
      </TestimonialSectionWrapper>


    </PageWrapper>
  );
}
