import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoChevronDown,
  IoArrowForward,
  IoInformationCircleOutline,
} from "react-icons/io5";

import {
  PageWrapper,
  Container,
  PolicyHeroSection,
  PolicyHeroContent,
  MainPolicyLayout,
  DocSplitGrid,
  StickyTocSidebar,
  TocLink,
  MobileTocWrapper,
  MobileTocItem,
  PolicyArticle,
  CalloutBox,
  RelatedPoliciesSection,
  RelatedHeader,
  RelatedCardsGrid,
  RelatedCard,
  NeedHelpSection,
  NeedHelpBox,
} from "./style";

import { POLICIES_INDEX } from "./data/policiesData";

export default function PolicyPageLayout({ policy }) {
  const [activeSection, setActiveSection] = useState(
    policy.sections[0]?.id || ""
  );
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const section of policy.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [policy]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter 2 or 4 related policies excluding current
  const relatedPolicies = POLICIES_INDEX.filter((p) => p.id !== policy.id).slice(
    0,
    4
  );

  return (
    <PageWrapper>
      {/* ── 1. Policy Hero ─────────────────────────────────────────── */}
      <PolicyHeroSection>
        <Container>
          <PolicyHeroContent>
            <span className="eyebrow">ANNSHARE POLICIES</span>
            <h1>{policy.title}</h1>
            <p className="description">{policy.description}</p>
            <div className="meta-updated">
              <span>{policy.lastUpdated}</span>
            </div>
          </PolicyHeroContent>
        </Container>
      </PolicyHeroSection>

      {/* ── 2. Main Two-Column Layout ──────────────────────────────── */}
      <MainPolicyLayout>
        <Container>
          {/* Mobile TOC Dropdown */}
          <MobileTocWrapper $isOpen={isMobileTocOpen}>
            <button
              type="button"
              className="mobile-toc-btn"
              onClick={() => setIsMobileTocOpen((prev) => !prev)}
              aria-expanded={isMobileTocOpen}
            >
              <span>On this page</span>
              <IoChevronDown className="icon-chevron" />
            </button>
            <div className="mobile-toc-menu">
              {policy.sections.map((sec) => (
                <MobileTocItem
                  key={sec.id}
                  href={`#${sec.id}`}
                  $isActive={activeSection === sec.id}
                  onClick={(e) => scrollToSection(e, sec.id)}
                >
                  {sec.title}
                </MobileTocItem>
              ))}
            </div>
          </MobileTocWrapper>

          <DocSplitGrid>
            {/* Desktop Sticky Sidebar */}
            <StickyTocSidebar>
              <div className="toc-heading">ON THIS PAGE</div>
              <nav aria-label="Table of contents">
                {policy.sections.map((sec) => (
                  <TocLink
                    key={sec.id}
                    href={`#${sec.id}`}
                    $isActive={activeSection === sec.id}
                    onClick={(e) => scrollToSection(e, sec.id)}
                  >
                    {sec.title}
                  </TocLink>
                ))}
              </nav>
            </StickyTocSidebar>

            {/* Content Article */}
            <PolicyArticle>
              <p className="policy-intro">
                This document outlines the official {policy.title.toLowerCase()} for the ANNShare food-sharing network. Please review these details carefully to ensure compliant and dignified participation across our community.
              </p>

              {policy.sections.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="policy-section"
                >
                  <h2>{sec.title}</h2>

                  {sec.paragraphs &&
                    sec.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}

                  {sec.bullets && (
                    <ul>
                      {sec.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Inject callout box under section 2 */}
                  {idx === 1 && policy.callout && (
                    <CalloutBox>
                      <div className="callout-icon">
                        <IoInformationCircleOutline />
                      </div>
                      <div className="callout-body">
                        <strong>{policy.callout.title}</strong>
                        <p>{policy.callout.text}</p>
                      </div>
                    </CalloutBox>
                  )}
                </section>
              ))}
            </PolicyArticle>
          </DocSplitGrid>
        </Container>
      </MainPolicyLayout>

      {/* ── 3. Related Policies Section ────────────────────────────── */}
      <RelatedPoliciesSection>
        <Container>
          <RelatedHeader>
            <span className="eyebrow">RELATED INFORMATION</span>
            <h2>Explore other ANNShare policies.</h2>
          </RelatedHeader>

          <RelatedCardsGrid>
            {relatedPolicies.map((rel) => {
              const isGuideline = rel.title.toLowerCase().includes("guidelines");
              return (
                <RelatedCard key={rel.id}>
                  <div>
                    <h3>{rel.title}</h3>
                    <p>{rel.description}</p>
                  </div>
                  <Link
                    to={rel.path}
                    className="link-btn"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <span>{isGuideline ? "Read Guidelines" : "Read Policy"}</span>
                    <IoArrowForward />
                  </Link>
                </RelatedCard>
              );
            })}
          </RelatedCardsGrid>
        </Container>
      </RelatedPoliciesSection>

      {/* ── 4. Need Help Section (Compact Support Panel) ───────────── */}
      <NeedHelpSection>
        <Container>
          <NeedHelpBox>
            <h2>Still have questions?</h2>
            <p>
              If you need clarification about any ANNShare policy, our support team is here to help.
            </p>
            <Link
              to="/contact"
              className="contact-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>Contact Support</span>
              <IoArrowForward />
            </Link>
          </NeedHelpBox>
        </Container>
      </NeedHelpSection>
    </PageWrapper>
  );
}
