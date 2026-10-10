import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoArrowForward,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoLeafOutline,
  IoHeartOutline,
  IoBarChartOutline,
  IoGlobeOutline,
  IoChevronDown,
  IoCheckmarkCircle,
  IoBusinessOutline,
  IoSparklesOutline,
  IoBagCheckOutline,
  IoChevronForward,
} from "react-icons/io5";

import DonateFoodModal from "../../layout/Header/DonateFoodModal";
import NeedFoodModal from "../../layout/Header/NeedFoodModal";

import {
  PageWrapper,
  Container,
  EyebrowBadge,
  SectionHeader,
  BreadcrumbSection,
  BreadcrumbNav,
  HeroSection,
  HeroSplitGrid,
  HeroTextCol,
  HeroImageCol,
  FloatingBadge,
  WhoSection,
  WhoGrid,
  WhoCard,
  WhySection,
  WhySplitGrid,
  WhyImageCol,
  WhyContentCol,
  BenefitsList,
  BenefitItem,
  ProcessSection,
  StepsRow,
  StepItem,
  TrustSection,
  PartnerCategoriesGrid,
  PartnerCategoryPill,
  StatsBanner,
  OptionsSection,
  OptionsGrid,
  OptionCard,
  FaqSection,
  FaqAccordionList,
  FaqRow,
  FaqTrigger,
  FaqAnswer,
  FaqBottomLink,
  FormSection,
  FormSplitGrid,
  FormInfoCol,
  FormCard,
  FormGridTwo,
  FormGroup,
  SubmitButton,
  SuccessCard,
} from "./style";

export default function BecomePartnerPage() {
  // Modal states for direct action triggers
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isNeedModalOpen, setIsNeedModalOpen] = useState(false);

  // FAQ Accordion active state (single open or multiple toggle)
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    orgType: "Restaurant / Hotel",
    partnerType: "Donate Food",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate lightweight network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      orgName: "",
      contactName: "",
      email: "",
      phone: "",
      orgType: "Restaurant / Hotel",
      partnerType: "Donate Food",
      message: "",
    });
    setIsSubmitted(false);
  };

  const handleSelectPartnerOption = (type) => {
    setFormData((prev) => ({ ...prev, partnerType: type }));
    scrollToSection("partner-form");
  };

  const faqData = [
    {
      q: "Who can become an ANNShare partner?",
      a: "Any food business, commercial kitchen, restaurant, bakery, community organization, registered NGO, or corporate sponsor committed to safe food handling and community nourishment is welcome to apply.",
    },
    {
      q: "Is there a cost to join?",
      a: "No. Joining ANNShare as a food donor, community distributor, or non-profit partner is 100% free of charge. Our mission is to eliminate barriers so good surplus food always finds a home.",
    },
    {
      q: "How does organization verification work?",
      a: "Once you submit an inquiry, our community operations team conducts a quick review of your operational details, hygiene standards, and logistics capacity. This ensures safe, seamless, and dignified handoffs for everyone involved.",
    },
    {
      q: "Can we partner with ANNShare long-term?",
      a: "Absolutely. Many of our hotel, restaurant, and community kitchen partners establish recurring daily or weekly pickup schedules, as well as joint seasonal community food drives and CSR initiatives.",
    },
  ];

  return (
    <PageWrapper>
   

      {/* ── 3. Partnership Hero (Two-Column Split) ───────────────────────── */}
      <HeroSection>
        <Container>
          <HeroSplitGrid>
            <HeroTextCol>
              <EyebrowBadge>PARTNER WITH ANNSHARE</EyebrowBadge>
              <h1>Better together, for less food waste.</h1>
              <p>
                ANNShare works with businesses, organizations, and communities to
                make sure good surplus food reaches the people who can use it.
              </p>

              <div className="cta-group">
                <button
                  type="button"
                  className="btn-primary-hero"
                  onClick={() => scrollToSection("partner-form")}
                >
                  Become a Partner <IoArrowForward />
                </button>
                <button
                  type="button"
                  className="btn-secondary-link"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  Learn how it works <IoArrowForward />
                </button>
              </div>
            </HeroTextCol>

            <HeroImageCol>
              <div className="image-wrapper">
                <img
                  src="nepali-partner-city-modern.jpg"
                  alt="ANNShare community partners handing over freshly packed meals"
                  loading="eager"
                />
              </div>

              <FloatingBadge>
                <div className="stat-num">350+</div>
                <div className="stat-text">
                  Verified community
                  <br />
                  partners
                </div>
              </FloatingBadge>
            </HeroImageCol>
          </HeroSplitGrid>
        </Container>
      </HeroSection>

      {/* ── 4. Who Can Partner With Us ───────────────────────────────────── */}
      <WhoSection id="who-can-partner">
        <Container>
          <SectionHeader>
            <EyebrowBadge>WHO WE WORK WITH</EyebrowBadge>
            <h2>There is a place for every kind of partner.</h2>
            <p>ANNShare brings together different parts of the food ecosystem.</p>
          </SectionHeader>

          <WhoGrid>
            {/* Card 1: Food Businesses */}
            <WhoCard>
              <div className="card-icon">
                <IoRestaurantOutline />
              </div>
              <h3>Restaurants & Food Businesses</h3>
              <p>
                Turn surplus meals and ingredients into meaningful community support.
              </p>
              <span className="example-label">Examples</span>
              <div className="chips-wrap">
                <span className="chip">Restaurants</span>
                <span className="chip">Hotels</span>
                <span className="chip">Cafés</span>
                <span className="chip">Bakeries</span>
                <span className="chip">Caterers</span>
              </div>
            </WhoCard>

            {/* Card 2: Community Organizations */}
            <WhoCard>
              <div className="card-icon">
                <IoPeopleOutline />
              </div>
              <h3>NGOs & Community Groups</h3>
              <p>
                Help connect available food with communities and people who need it.
              </p>
              <span className="example-label">Examples</span>
              <div className="chips-wrap">
                <span className="chip">NGOs</span>
                <span className="chip">Shelters</span>
                <span className="chip">Community kitchens</span>
                <span className="chip">Social organizations</span>
              </div>
            </WhoCard>

            {/* Card 3: Impact Partners */}
            <WhoCard>
              <div className="card-icon">
                <IoShieldCheckmarkOutline />
              </div>
              <h3>Corporate & Impact Partners</h3>
              <p>
                Support food redistribution through resources, networks, funding, or collaboration.
              </p>
              <span className="example-label">Examples</span>
              <div className="chips-wrap">
                <span className="chip">CSR teams</span>
                <span className="chip">Companies</span>
                <span className="chip">Local institutions</span>
                <span className="chip">Development orgs</span>
              </div>
            </WhoCard>
          </WhoGrid>
        </Container>
      </WhoSection>

      {/* ── 5. Why Partner With ANNShare ─────────────────────────────────── */}
      <WhySection>
        <Container>
          <WhySplitGrid>
            <WhyImageCol>
              <img
                src="/community-meal.jpg"
                alt="Community members gathering for a wholesome shared meal"
                loading="lazy"
              />
            </WhyImageCol>

            <WhyContentCol>
              <EyebrowBadge>WHY PARTNER</EyebrowBadge>
              <h2>Turn everyday surplus into lasting impact.</h2>

              <BenefitsList>
                <BenefitItem>
                  <div className="benefit-icon-box">
                    <IoLeafOutline />
                  </div>
                  <div className="benefit-content">
                    <h4>Reduce Food Waste</h4>
                    <p>Give good food another purpose instead of sending it to waste.</p>
                  </div>
                </BenefitItem>

                <BenefitItem>
                  <div className="benefit-icon-box">
                    <IoHeartOutline />
                  </div>
                  <div className="benefit-content">
                    <h4>Support Communities</h4>
                    <p>Help food reach organizations and people who can use it.</p>
                  </div>
                </BenefitItem>

                <BenefitItem>
                  <div className="benefit-icon-box">
                    <IoBarChartOutline />
                  </div>
                  <div className="benefit-content">
                    <h4>Track Your Impact</h4>
                    <p>Understand the difference your contributions are making.</p>
                  </div>
                </BenefitItem>

                <BenefitItem>
                  <div className="benefit-icon-box">
                    <IoGlobeOutline />
                  </div>
                  <div className="benefit-content">
                    <h4>Build Meaningful Connections</h4>
                    <p>Become part of a growing local food-sharing network.</p>
                  </div>
                </BenefitItem>
              </BenefitsList>
            </WhyContentCol>
          </WhySplitGrid>
        </Container>
      </WhySection>

      {/* ── 6. How Partnership Works ─────────────────────────────────────── */}
      <ProcessSection id="how-it-works">
        <Container>
          <SectionHeader>
            <EyebrowBadge>A SIMPLE PROCESS</EyebrowBadge>
            <h2>Getting started is straightforward.</h2>
            <p>We make partnering easy, transparent, and respectful of your daily operations.</p>
          </SectionHeader>

          <StepsRow>
            {/* Step 01 */}
            <StepItem>
              <div className="step-header">
                <div className="step-num">01</div>
                <div className="step-line" />
              </div>
              <h3>Connect</h3>
              <p>Tell us about your organization and how you'd like to help.</p>
            </StepItem>

            {/* Step 02 */}
            <StepItem>
              <div className="step-header">
                <div className="step-num">02</div>
                <div className="step-line" />
              </div>
              <h3>Get Verified</h3>
              <p>We learn about your role and partnership fit.</p>
            </StepItem>

            {/* Step 03 */}
            <StepItem>
              <div className="step-header">
                <div className="step-num">03</div>
                <div className="step-line" />
              </div>
              <h3>Start Sharing</h3>
              <p>Begin donating or supporting the network.</p>
            </StepItem>

            {/* Step 04 */}
            <StepItem>
              <div className="step-header">
                <div className="step-num">04</div>
              </div>
              <h3>Grow Together</h3>
              <p>Track impact and explore more ways to collaborate.</p>
            </StepItem>
          </StepsRow>
        </Container>
      </ProcessSection>

   

      {/* ── 8. Partnership Options ───────────────────────────────────────── */}
      <OptionsSection>
        <Container>
          <SectionHeader>
            <h2>More than one way to make a difference.</h2>
            <p>Choose the partnership pathway that best matches your organization's goals.</p>
          </SectionHeader>

          <OptionsGrid>
            {/* Option 1 */}
            <OptionCard>
              <h3>Donate Surplus Food</h3>
              <p>For businesses with prepared meals, ingredients, or food inventory.</p>
              <button
                type="button"
                className="card-action-link"
                onClick={() => handleSelectPartnerOption("Donate Food")}
              >
                Learn about donating <IoArrowForward />
              </button>
            </OptionCard>

            {/* Option 2 */}
            <OptionCard>
              <h3>Become a Distribution Partner</h3>
              <p>For organizations that help receive and distribute food.</p>
              <button
                type="button"
                className="card-action-link"
                onClick={() => handleSelectPartnerOption("Receive / Distribute Food")}
              >
                Learn about receiving food <IoArrowForward />
              </button>
            </OptionCard>

            {/* Option 3 */}
            <OptionCard>
              <h3>Support the Movement</h3>
              <p>
                For companies and institutions interested in long-term partnerships or CSR initiatives.
              </p>
              <button
                type="button"
                className="card-action-link"
                onClick={() => handleSelectPartnerOption("CSR Partnership")}
              >
                Talk to our team <IoArrowForward />
              </button>
            </OptionCard>
          </OptionsGrid>
        </Container>
      </OptionsSection>

   

      {/* ── 10. Become a Partner Form ────────────────────────────────────── */}
      <FormSection id="partner-form">
        <Container>
          <FormSplitGrid>
            {/* Left Side: Editorial context & What happens next */}
            <FormInfoCol>
              <EyebrowBadge>LET'S WORK TOGETHER</EyebrowBadge>
              <h2>Tell us how you'd like to get involved.</h2>
              <p>
                Share a few details about your organization and our team will help
                you explore the right partnership.
              </p>

              <div className="what-next-box">
                <h4>What happens next?</h4>
                <div className="steps-mini-list">
                  <div className="step-mini-item">
                    <div className="num">1</div>
                    <span>We review your information.</span>
                  </div>
                  <div className="step-mini-item">
                    <div className="num">2</div>
                    <span>Our team gets in touch.</span>
                  </div>
                  <div className="step-mini-item">
                    <div className="num">3</div>
                    <span>We discuss the best way to collaborate.</span>
                  </div>
                </div>
              </div>
            </FormInfoCol>

            {/* Right Side: Partnership Inquiry Form */}
            <FormCard>
              {isSubmitted ? (
                <SuccessCard>
                  <IoCheckmarkCircle className="check-icon" />
                  <h3>Thank you for reaching out!</h3>
                  <p>
                    We've received your partnership inquiry for{" "}
                    <strong>{formData.orgName || "your organization"}</strong>. Our
                    community partnerships coordinator will reach out via email
                    shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-reset"
                    onClick={handleResetForm}
                  >
                    Submit another inquiry
                  </button>
                </SuccessCard>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormGridTwo>
                    <FormGroup>
                      <label htmlFor="orgName">Organization Name *</label>
                      <input
                        id="orgName"
                        type="text"
                        name="orgName"
                        required
                        placeholder="e.g. Kathmandu Heritage Kitchen"
                        value={formData.orgName}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="contactName">Your Name *</label>
                      <input
                        id="contactName"
                        type="text"
                        name="contactName"
                        required
                        placeholder="e.g. Aarav Shrestha"
                        value={formData.contactName}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </FormGridTwo>

                  <FormGridTwo>
                    <FormGroup>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. aarav@kitchen.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="e.g. +977 9801234567"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </FormGridTwo>

                  <FormGridTwo>
                    <FormGroup>
                      <label htmlFor="orgType">Organization Type *</label>
                      <select
                        id="orgType"
                        name="orgType"
                        value={formData.orgType}
                        onChange={handleInputChange}
                      >
                        <option value="Restaurant / Hotel">Restaurant / Hotel</option>
                        <option value="Bakery / Café">Bakery / Café</option>
                        <option value="NGO">NGO</option>
                        <option value="Community Organization">Community Organization</option>
                        <option value="Corporate / CSR">Corporate / CSR</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="partnerType">How would you like to partner? *</label>
                      <select
                        id="partnerType"
                        name="partnerType"
                        value={formData.partnerType}
                        onChange={handleInputChange}
                      >
                        <option value="Donate Food">Donate Food</option>
                        <option value="Receive / Distribute Food">Receive / Distribute Food</option>
                        <option value="CSR Partnership">CSR Partnership</option>
                        <option value="Community Collaboration">Community Collaboration</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormGroup>
                  </FormGridTwo>

                  <FormGroup>
                    <label htmlFor="message">Tell us more</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Share details about your typical surplus frequency, dietary types, or partnership aspirations..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"} <IoArrowForward />
                  </SubmitButton>
                </form>
              )}
            </FormCard>
          </FormSplitGrid>
        </Container>
      </FormSection>

      {/* Modals for donation and receiving requests if triggered */}
      <DonateFoodModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
      <NeedFoodModal
        isOpen={isNeedModalOpen}
        onClose={() => setIsNeedModalOpen(false)}
      />
    </PageWrapper>
  );
}
