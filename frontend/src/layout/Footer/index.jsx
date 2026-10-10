import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTiktok,
  IoArrowForward,
  IoChevronDown,
  IoCheckmarkCircle,
} from "react-icons/io5";

import {
  FooterRoot,
  FooterContainer,
  ImpactCtaWrapper,
  ImpactCtaContent,
  EyebrowBadge,
  CtaHeading,
  CtaDescription,
  CtaButtonGroup,
  PrimaryCtaButton,
  SecondaryCtaButton,
  ImpactIndicatorStrip,
  MainFooterGrid,
  BrandColumn,
  SocialRow,
  SocialIconBtn,
  ColumnWrapper,
  ColumnHeading,
  MobileAccordionTrigger,
  LinkList,
  FooterLink,
  NewsletterSection,
  NewsletterText,
  NewsletterForm,
  NewsletterInput,
  SubscribeButton,
  SubscribedFeedback,
  BottomBar,
  CopyrightText,
  BottomLinksGroup,
  LocationBadge,
} from "./style";

import ANNShareLogo from "../Header/ANNShareLogo";

const Footer = () => {
  const navigate = useNavigate();
  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Mobile accordion collapse states
  const [openAccordion, setOpenAccordion] = useState({
    discover: false,
    participate: false,
    about: false,
    support: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <FooterRoot>
        <FooterContainer>
          {/* ================================================================
              1. IMPACT CTA PANEL
              ================================================================ */}
          <ImpactCtaWrapper>
            <ImpactCtaContent>
              <EyebrowBadge>TOGETHER, WE CAN DO MORE</EyebrowBadge>
              <CtaHeading>Give surplus food a second journey.</CtaHeading>
              <CtaDescription>
                Connect surplus food with organizations and communities that
                need it — reducing waste while creating meaningful impact.
              </CtaDescription>

              <CtaButtonGroup>
                <PrimaryCtaButton
                  type="button"
                  onClick={() => {
                    navigate("/donate");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  I Have Food <IoArrowForward />
                </PrimaryCtaButton>

                <SecondaryCtaButton
                  type="button"
                  onClick={() => {
                    navigate("/find-food");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  I Need Food <IoArrowForward />
                </SecondaryCtaButton>
              </CtaButtonGroup>

              <ImpactIndicatorStrip>
                <span>25,000+ meals redistributed</span>
                <span className="dot">•</span>
                <span>350+ verified organizations</span>
                <span className="dot">•</span>
                <span>1,200+ food partners</span>
              </ImpactIndicatorStrip>
            </ImpactCtaContent>
          </ImpactCtaWrapper>

          {/* ================================================================
              2. MAIN FOOTER (5-COLUMN GRID)
              ================================================================ */}
          <MainFooterGrid>
            {/* COLUMN 1: ANNShare Brand */}
            <BrandColumn>
              <ANNShareLogo href="#hero" size="footer" />
              <div className="headline">Share food. Share hope.</div>
              <p className="desc">
                ANNShare connects surplus food with trusted organizations and
                communities, giving good food a second journey.
              </p>

              <SocialRow>
                <SocialIconBtn
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow ANNShare on Facebook"
                >
                  <IoLogoFacebook />
                </SocialIconBtn>
                <SocialIconBtn
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow ANNShare on Instagram"
                >
                  <IoLogoInstagram />
                </SocialIconBtn>
                <SocialIconBtn
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with ANNShare on LinkedIn"
                >
                  <IoLogoLinkedin />
                </SocialIconBtn>
                <SocialIconBtn
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch ANNShare on TikTok"
                >
                  <IoLogoTiktok />
                </SocialIconBtn>
              </SocialRow>
            </BrandColumn>

            {/* COLUMN 2: Discover */}
            <ColumnWrapper>
              <ColumnHeading>
                <span>Discover</span>
              </ColumnHeading>
              <MobileAccordionTrigger
                type="button"
                $isOpen={openAccordion.discover}
                onClick={() => toggleAccordion("discover")}
                aria-expanded={openAccordion.discover}
              >
                <span>Discover</span>
                <IoChevronDown className="chevron" />
              </MobileAccordionTrigger>

              <LinkList $isOpen={openAccordion.discover}>
                <li>
                  <FooterLink
                    href="/find-food"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/find-food");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Explore Food
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/donate"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/donate");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Food Donations
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/become-a-partner"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/become-a-partner");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    NGOs & Organizations
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/become-a-partner"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/become-a-partner");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Restaurants
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/find-food"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/find-food");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Bakeries & Cafes
                  </FooterLink>
                </li>
              </LinkList>
            </ColumnWrapper>

            {/* COLUMN 3: Participate */}
            <ColumnWrapper>
              <ColumnHeading>
                <span>Participate</span>
              </ColumnHeading>
              <MobileAccordionTrigger
                type="button"
                $isOpen={openAccordion.participate}
                onClick={() => toggleAccordion("participate")}
                aria-expanded={openAccordion.participate}
              >
                <span>Participate</span>
                <IoChevronDown className="chevron" />
              </MobileAccordionTrigger>

              <LinkList $isOpen={openAccordion.participate}>
                <li>
                  <FooterLink
                    href="/donate"
                    className="highlight-action"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/donate");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    I Have Food
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/find-food"
                    className="highlight-action"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/find-food");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    I Need Food
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/donate"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/donate");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Donate Food
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/find-food"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/find-food");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Request Food
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="/become-a-partner"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/become-a-partner");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Become a Partner
                  </FooterLink>
                </li>
              </LinkList>
            </ColumnWrapper>

            {/* COLUMN 4: About */}
            <ColumnWrapper>
              <ColumnHeading>
                <span>About</span>
              </ColumnHeading>
              <MobileAccordionTrigger
                type="button"
                $isOpen={openAccordion.about}
                onClick={() => toggleAccordion("about")}
                aria-expanded={openAccordion.about}
              >
                <span>About</span>
                <IoChevronDown className="chevron" />
              </MobileAccordionTrigger>

              <LinkList $isOpen={openAccordion.about}>
                <li>
                  <FooterLink
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/about");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    About ANNShare
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/how-it-works"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/how-it-works");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    How It Works
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/blog");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Blogs & Updates
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="/faqs"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/faqs");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    FAQs
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Contact Us
                  </FooterLink>
                </li>
              </LinkList>
            </ColumnWrapper>

            {/* COLUMN 5: Support */}
            <ColumnWrapper>
              <ColumnHeading>
                <span>Support</span>
              </ColumnHeading>
              <MobileAccordionTrigger
                type="button"
                $isOpen={openAccordion.support}
                onClick={() => toggleAccordion("support")}
                aria-expanded={openAccordion.support}
              >
                <span>Support</span>
                <IoChevronDown className="chevron" />
              </MobileAccordionTrigger>

              <LinkList $isOpen={openAccordion.support}>
                <li>
                  <FooterLink
                    href="/help"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/help");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Help Center
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="/donation-guidelines"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/donation-guidelines");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Donation Guidelines
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/pickup-guidelines"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/pickup-guidelines");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Pickup Guidelines
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/privacy");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Privacy
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="/terms"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/terms");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Terms & Conditions
                  </FooterLink>
                </li>
              </LinkList>
            </ColumnWrapper>
          </MainFooterGrid>

          {/* ================================================================
              3. NEWSLETTER / COMMUNITY ROW
              ================================================================ */}
          <NewsletterSection>
            <NewsletterText>
              <h4>Stay connected to the movement.</h4>
              <p>
                Get updates about food rescue, community impact, and new
                ANNShare opportunities.
              </p>
            </NewsletterText>

            {!isSubscribed ? (
              <NewsletterForm onSubmit={handleSubscribe}>
                <NewsletterInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
                <SubscribeButton type="submit">Subscribe</SubscribeButton>
              </NewsletterForm>
            ) : (
              <SubscribedFeedback>
                <IoCheckmarkCircle style={{ fontSize: "1.2rem" }} />
                <span>Thank you for joining the community!</span>
              </SubscribedFeedback>
            )}
          </NewsletterSection>

          {/* ================================================================
              4. BOTTOM FOOTER BAR
              ================================================================ */}
          <BottomBar>
            <CopyrightText>© 2026 ANNShare. All rights reserved.</CopyrightText>

            <BottomLinksGroup>
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/privacy");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Privacy
              </a>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/terms");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Terms
              </a>
              <a href="#cookies">Cookies</a>
            </BottomLinksGroup>

            <LocationBadge>
              <span>🇳🇵</span> Made for communities in Nepal
            </LocationBadge>
          </BottomBar>
        </FooterContainer>
      </FooterRoot>
    </>
  );
};

export default Footer;
