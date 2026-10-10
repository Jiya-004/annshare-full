import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  IoArrowForward,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoBusinessOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoChevronDown,
  IoSparkles,
  IoTimeOutline,
} from "react-icons/io5";

import DonateFoodModal from "../../layout/Header/DonateFoodModal";
import NeedFoodModal from "../../layout/Header/NeedFoodModal";

import {
  PageWrapper,
  Container,
  EyebrowBadge,
  ContactHeroSection,
  HeroSplitGrid,
  HeroContentSide,
  HeroImageSide,
  ContactOptionsSection,
  SectionHeaderArea,
  OptionsGrid,
  OptionCard,
  MainContactAreaSection,
  ContactSplitGrid,
  FormSide,
  FormRow,
  FormGroup,
  FormSubmitBtn,
  FormSuccessMessage,
  InfoSide,
  FAQSectionWrapper,
  AccordionList,
  AccordionItem,
  ViewAllFaqsBtn,
  UrgentSupportWrapper,
  UrgentBannerCard,
} from "./style";

// Homepage-matching FAQ Dataset
const CONTACT_FAQS = [
  {
    id: 1,
    q: "How quickly can ANNShare collect surplus food?",
    a: "Our automated dispatch notifies nearby verified partner shelters instantly within a 3–8 km radius. On average across Kathmandu Valley, pairings happen within 18 minutes, and volunteer couriers complete the pickup in under 45 minutes.",
  },
  {
    id: 2,
    q: "Who can donate food?",
    a: "We welcome commercial food operators, hotels, wedding banquet venues, event caterers, bakeries, and cafes. Items must be freshly cooked or packaged, unserved, and stored according to municipal food hygiene guidelines.",
  },
  {
    id: 3,
    q: "How do NGOs receive food?",
    a: "Verified community non-profits, shelters, children's homes, and eldercare centers can browse live surplus listings or receive automated alerts matching their dietary criteria (e.g. Vegetarian, Halal). Pickups can be coordinated via volunteer EV couriers directly to your facility.",
  },
  {
    id: 4,
    q: "Is there a cost to use ANNShare?",
    a: "No. ANNShare is 100% free for community non-profits and feeding partners. Basic donation listing, volunteer matching, and carbon impact reporting for restaurants are also completely free as part of our circular sustainability pledge.",
  },
  {
    id: 5,
    q: "How do I become a verified partner?",
    a: "Submit your basic registration via our platform or reach out through the form above. Our local team will verify your municipal or SWC registration and conduct a brief food safety walkthrough within 24 hours.",
  },
];

export default function ContactUsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    topic: "Food Donation",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Auto pre-fill if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
        organization: prev.organization || user.organization || user.orgName || "",
      }));
    }
  }, [user]);

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState(1);

  // Modal dialog states
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isNeedFoodModalOpen, setIsNeedFoodModalOpen] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await api.contact.send({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
        topic: formData.topic,
        subject: formData.topic,
        message: formData.message.trim(),
        type: "Contact Inquiry",
        userRole: user?.role || "Visitor",
        status: "Open",
        priority: "Medium",
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact message:", err);
      setSubmitError(err.message || "Failed to send your message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      organization: user?.organization || user?.orgName || "",
      topic: "Food Donation",
      message: "",
    });
    setSubmitError("");
    setIsSubmitted(false);
  };

  return (
    <PageWrapper>
      {/* ── 1. Contact Hero Section (Editorial Two-Column with Real Food Photography) ── */}
      <ContactHeroSection>
        <Container>
          <HeroSplitGrid>
            <HeroContentSide>
              <EyebrowBadge>GET IN TOUCH</EyebrowBadge>
              <h1>Let's make food go further.</h1>
              <p>
                Have surplus food to share, need support for your community, or
                want to partner with ANNShare? Our team in Kathmandu is here to
                help.
              </p>

              <div className="hero-actions-row">
                <a
                  href="#contact-form-section"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact-form-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact Us <IoArrowForward />
                </a>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    navigate("/help");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  View Help Center <IoArrowForward />
                </button>
              </div>
            </HeroContentSide>

            {/* Documentary-style food & community photo matching homepage */}
            <HeroImageSide>
              <img
                src="nepali-office-kitchen-donation.jpg"
                alt="Volunteer and commercial kitchen team preparing surplus food trays"
                loading="lazy"
              />
              <div className="image-caption-pill">
                <IoSparkles /> Kathmandu Valley Food Redistribution
              </div>
            </HeroImageSide>
          </HeroSplitGrid>
        </Container>
      </ContactHeroSection>

      {/* ── 2. Contact Options Section (Matching "How ANNShare Works" Cards) ── */}
      <ContactOptionsSection>
        <Container>
          <SectionHeaderArea>
            <EyebrowBadge>HOW CAN WE HELP?</EyebrowBadge>
            <h2>Choose the right way to reach us</h2>
            <p>
              Connect directly with our dedicated teams across the Kathmandu
              food-sharing ecosystem.
            </p>
          </SectionHeaderArea>

          <OptionsGrid>
            {/* Card 01: Food Donations */}
            <OptionCard>
              <div className="card-top-row">
                <div className="icon-box">
                  <IoRestaurantOutline />
                </div>
                <span className="num-indicator">01</span>
              </div>
              <h3>Food Donations</h3>
              <p>
                For restaurants, hotels, caterers, banquet events, and
                individuals with freshly prepared surplus food.
              </p>
              <button
                type="button"
                className="action-arrow-link"
                onClick={() => setIsDonateModalOpen(true)}
              >
                <span>Donate Food</span>
                <IoArrowForward />
              </button>
            </OptionCard>

            {/* Card 02: Community & NGOs */}
            <OptionCard>
              <div className="card-top-row">
                <div className="icon-box">
                  <IoPeopleOutline />
                </div>
                <span className="num-indicator">02</span>
              </div>
              <h3>Community & NGOs</h3>
              <p>
                For verified organizations, shelters, and care homes looking to
                receive and distribute wholesome meals.
              </p>
              <button
                type="button"
                className="action-arrow-link"
                onClick={() => setIsNeedFoodModalOpen(true)}
              >
                <span>Request Food</span>
                <IoArrowForward />
              </button>
            </OptionCard>

            {/* Card 03: Partnerships */}
            <OptionCard>
              <div className="card-top-row">
                <div className="icon-box">
                  <IoBusinessOutline />
                </div>
                <span className="num-indicator">03</span>
              </div>
              <h3>Partnerships</h3>
              <p>
                For businesses, municipal institutions, and CSR partners
                interested in circular sustainability with ANNShare.
              </p>
              <button
                type="button"
                className="action-arrow-link"
                onClick={() => {
                  document
                    .getElementById("contact-form-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Partner With Us</span>
                <IoArrowForward />
              </button>
            </OptionCard>
          </OptionsGrid>
        </Container>
      </ContactOptionsSection>

      {/* ── 3. Main Contact Area (Two Columns: Form + Structured Info) ── */}
      <MainContactAreaSection id="contact-form-section">
        <Container>
          <ContactSplitGrid>
            {/* Left Side: Contact Form */}
            <FormSide>
              <div className="form-header-group">
                <EyebrowBadge>SEND A MESSAGE</EyebrowBadge>
                <h2>Tell us what's on your mind.</h2>
              </div>

              {isSubmitted ? (
                <FormSuccessMessage>
                  <h3>Thank you for reaching out</h3>
                  <p>
                    We’ve received your inquiry and a coordinator will get back
                    to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button type="button" onClick={handleReset}>
                    Send Another Message
                  </button>
                </FormSuccessMessage>
              ) : (
                <form onSubmit={handleSubmit}>
                  {submitError && (
                    <div
                      style={{
                        padding: "12px 16px",
                        background: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        color: "#991B1B",
                        borderRadius: "10px",
                        marginBottom: "18px",
                        fontSize: "0.88rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {submitError}
                    </div>
                  )}
                  <FormRow>
                    <FormGroup>
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        placeholder="Your full name"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+977 98XXXXXXXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="organization">
                        Organization <span className="optional">(Optional)</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        name="organization"
                        placeholder="Hotel, NGO or Business"
                        value={formData.organization}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <label htmlFor="topic">What can we help you with?</label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                    >
                      <option value="Food Donation">Food Donation</option>
                      <option value="Food Request">Food Request</option>
                      <option value="NGO Verification">NGO Verification</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General Question">General Question</option>
                      <option value="Technical Support">Technical Support</option>
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Share details regarding your food surplus, shelter community, or question..."
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormSubmitBtn type="submit" disabled={isSubmitting}>
                    <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                    <IoArrowForward />
                  </FormSubmitBtn>
                </form>
              )}
            </FormSide>

            {/* Right Side: Structured Contact Info + Field Photo */}
            <InfoSide>
              <div className="info-header-group">
                <EyebrowBadge>OTHER WAYS TO CONNECT</EyebrowBadge>
                <h2>Reach our team directly</h2>
              </div>

              <div className="info-list">
                <div className="info-block">
                  <div className="meta-label">Email</div>
                  <a href="mailto:hello@annshare.org" className="main-text">
                    hello@annshare.org
                  </a>
                  <p className="desc-text">For general questions and support.</p>
                </div>

                <div className="info-block">
                  <div className="meta-label">Phone</div>
                  <a href="tel:+9779801234567" className="main-text">
                    +977 980-1234567
                  </a>
                  <p className="desc-text">Sunday–Friday · 9:00 AM – 5:00 PM</p>
                </div>

                <div className="info-block">
                  <div className="meta-label">Location</div>
                  <span className="main-text" style={{ textDecoration: "none" }}>
                    Kathmandu, Nepal
                  </span>
                  <p className="desc-text">
                    Serving communities across the Kathmandu Valley.
                  </p>
                </div>
              </div>

              {/* Real Food Redistribution Photo Matching Homepage */}
              <div className="info-photo-card">
                <img
                  src="/contact.png"
                  alt="Community meal distribution and volunteers"
                  loading="lazy"
                />
                <span className="photo-tag">Volunteers & Community Relief</span>
              </div>
            </InfoSide>
          </ContactSplitGrid>
        </Container>
      </MainContactAreaSection>

      {/* ── 4. Quick Help / FAQ Section (Exact Homepage Style) ── */}
      <FAQSectionWrapper>
        <Container>
          <SectionHeaderArea>
            <EyebrowBadge>HELP CENTER</EyebrowBadge>
            <h2>Clear answers, faster action.</h2>
            <p>
              Common questions about surplus food donation, hygiene protocols,
              and NGO matching.
            </p>
          </SectionHeaderArea>

          <AccordionList>
            {CONTACT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <AccordionItem key={faq.id} className={isOpen ? "open" : ""}>
                  <button
                    className="question-btn"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <h3>{faq.q}</h3>
                    <div className={`icon-toggle ${isOpen ? "rotated" : ""}`}>
                      <IoChevronDown />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </AccordionItem>
              );
            })}
          </AccordionList>

          <ViewAllFaqsBtn
            type="button"
            onClick={() => {
              navigate("/faqs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span>View All FAQs</span>
            <IoArrowForward />
          </ViewAllFaqsBtn>
        </Container>
      </FAQSectionWrapper>


      {/* Modals for donation & requests */}
      <DonateFoodModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
      <NeedFoodModal
        isOpen={isNeedFoodModalOpen}
        onClose={() => setIsNeedFoodModalOpen(false)}
      />
    </PageWrapper>
  );
}
