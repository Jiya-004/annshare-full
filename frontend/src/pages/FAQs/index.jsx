import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoArrowForward,
  IoChevronDown,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

import {
  ROLE_SECTIONS,
  MOST_ASKED_FAQS as DEFAULT_MOST_ASKED,
  SAFETY_PRINCIPLES,
  MORE_ANSWERS_COLUMNS as DEFAULT_MORE_ANSWERS,
  COMMUNITY_METRICS,
} from "./data";

import api from "../../services/api";

import {
  PageWrapper,
  Container,
  EyebrowBadge,
  FaqHeroSection,
  HeroSplitGrid,
  HeroContentSide,
  HeroImageSide,
  StartWithYouSection,
  SectionHeader,
  RoleColumnsGrid,
  RoleColumn,
  RoleQuestionsList,
  RoleQuestionBtn,
  MostAskedSection,
  AccordionList,
  AccordionItem,
  SafetyFeatureSection,
  SafetySplitGrid,
  SafetyImageWrap,
  SafetyContentWrap,
  MoreAnswersSection,
  TwoColumnFaqGrid,
  FaqGroupBlock,
  SimpleAccordionItem,
  CommunityImpactSection,
  ImpactSplitGrid,
  ImpactTextSide,
  ImpactStatsSide,
  FinalSupportSection,
  SupportContentBox,
} from "./style";

export default function FAQsPage() {
  const [openMostAskedId, setOpenMostAskedId] = useState("ma-1");
  const [mostAskedFaqs, setMostAskedFaqs] = useState(DEFAULT_MOST_ASKED);
  const [moreAnswers, setMoreAnswers] = useState(DEFAULT_MORE_ANSWERS);

  const [openMoreFaqs, setOpenMoreFaqs] = useState({
    "dn-list": true,
    "org-join": true,
  });

  // Helper to map dynamic category names to the 4 main layout groups
  const mapCategoryToGroupKey = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("pickup") || c.includes("logistic") || c.includes("delivery")) return { side: "left", groupKey: "pickups-group" };
    if (c.includes("org") || c.includes("ngo") || c.includes("shelter") || c.includes("partner")) return { side: "right", groupKey: "organizations-group" };
    if (c.includes("account") || c.includes("general") || c.includes("user") || c.includes("profile")) return { side: "right", groupKey: "accounts-group" };
    return { side: "left", groupKey: "donations-group" };
  };

  // Fetch live FAQs from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchFaqs = async () => {
      try {
        const liveFaqs = await api.faqs.getAll({ status: "Active" });
        if (isMounted && Array.isArray(liveFaqs) && liveFaqs.length > 0) {
          // Identify existing default question texts to prevent duplicates
          const existingQuestionTexts = new Set(
            DEFAULT_MOST_ASKED.map((f) => (f.question || "").toLowerCase().trim())
          );
          DEFAULT_MORE_ANSWERS.left.forEach((g) =>
            g.items.forEach((it) => existingQuestionTexts.add((it.question || "").toLowerCase().trim()))
          );
          DEFAULT_MORE_ANSWERS.right.forEach((g) =>
            g.items.forEach((it) => existingQuestionTexts.add((it.question || "").toLowerCase().trim()))
          );

          // Find newly added FAQs from backend
          const newBackendFaqs = liveFaqs.filter(
            (f) => !existingQuestionTexts.has((f.question || "").toLowerCase().trim())
          );

          if (newBackendFaqs.length > 0) {
            // Clone default groups
            const newLeft = DEFAULT_MORE_ANSWERS.left.map((g) => ({ ...g, items: [...g.items] }));
            const newRight = DEFAULT_MORE_ANSWERS.right.map((g) => ({ ...g, items: [...g.items] }));

            newBackendFaqs.forEach((f, idx) => {
              const item = {
                id: f.id || f._id || `faq-new-${idx}`,
                question: f.question,
                answer: f.answer,
                category: f.category || "General",
              };

              const { side, groupKey } = mapCategoryToGroupKey(f.category);
              if (side === "left") {
                const targetGroup = newLeft.find((g) => g.groupKey === groupKey) || newLeft[0];
                targetGroup.items.push(item);
              } else {
                const targetGroup = newRight.find((g) => g.groupKey === groupKey) || newRight[0];
                targetGroup.items.push(item);
              }
            });

            setMoreAnswers({
              left: newLeft,
              right: newRight,
            });
          }
        }
      } catch (err) {
        console.warn("Using default static FAQs:", err.message);
      }
    };

    fetchFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleMostAsked = (id) => {
    setOpenMostAskedId((prev) => (prev === id ? null : id));
  };

  const toggleMoreFaq = (id) => {
    setOpenMoreFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Jump-to-question handler
  const jumpToQuestion = (targetId) => {
    const isMostAsked = mostAskedFaqs.some((f) => f.id === targetId);
    if (isMostAsked) {
      setOpenMostAskedId(targetId);
    } else {
      setOpenMoreFaqs((prev) => ({
        ...prev,
        [targetId]: true,
      }));
    }

    setTimeout(() => {
      const el = document.getElementById(`faq-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 60);
  };

  const scrollToAnchor = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageWrapper>
      {/* ── 1. Hero Banner ───────── */}
      <FaqHeroSection>
        <Container>
          <HeroSplitGrid>
            <HeroContentSide>
              <EyebrowBadge>HELP & SUPPORT</EyebrowBadge>
              <h1>Questions? We've got answers.</h1>
              <p>
                Whether you're donating surplus food, representing an organization,
                or looking for community support, here are the things people ask us
                most.
              </p>
              <div className="hero-actions-row">
                <Link to="/donate" className="btn-primary">
                  <span>Make a Donation</span>
                  <IoArrowForward />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  <span>Contact Support</span>
                </Link>
              </div>
            </HeroContentSide>

            <HeroImageSide>
              <img
                src="/nepali-community-food.jpg"
                alt="Community members sharing a warm nutritious meal together"
                loading="eager"
              />
              <div className="image-caption-pill">
                <span className="dot-icon">●</span>
                <span>10,000+ meals connected this month</span>
              </div>
            </HeroImageSide>
          </HeroSplitGrid>
        </Container>
      </FaqHeroSection>

      {/* ── 2. "What brings you here?" 3-Column Role Cards ───────────── */}
      <StartWithYouSection>
        <Container>
          <SectionHeader>
            <EyebrowBadge>QUICK START GUIDE</EyebrowBadge>
            <h2>What brings you here?</h2>
            <p>Choose your role for quick answers, step-by-step guidance, and direct links.</p>
          </SectionHeader>

          <RoleColumnsGrid>
            {ROLE_SECTIONS.map((role, rIdx) => (
              <RoleColumn key={role.num || role.id || rIdx}>
                <div className="number-label">{role.num || `0${rIdx + 1}`}</div>
                <h3>{role.title}</h3>
                <p className="audience">{role.audience || role.description}</p>

                <RoleQuestionsList>
                  {(role.questions || role.quickQuestions || []).map((q, qIdx) => (
                    <li key={q.targetId || qIdx}>
                      <RoleQuestionBtn
                        type="button"
                        onClick={() => jumpToQuestion(q.targetId)}
                      >
                        <span className="q-left">{q.text || q.label}</span>
                        <IoArrowForward />
                      </RoleQuestionBtn>
                    </li>
                  ))}
                </RoleQuestionsList>

                {role.linkLabel && (
                  <button
                    type="button"
                    className="role-action-link"
                    onClick={() => scrollToAnchor(role.targetSection || "more-answers-section")}
                  >
                    <span>{role.linkLabel}</span>
                    <IoArrowForward />
                  </button>
                )}
              </RoleColumn>
            ))}
          </RoleColumnsGrid>
        </Container>
      </StartWithYouSection>

      {/* ── 3. The Big Accordion ("Most Asked") ─────────────────────────── */}
      <MostAskedSection id="most-asked-section">
        <Container $maxWidth="1000px">
          <SectionHeader $maxWidth="680px" $marginBottom="52px">
            <EyebrowBadge>MOST ASKED</EyebrowBadge>
            <h2>The questions we hear most.</h2>
            <p>
              Essential fundamentals about how our surplus food sharing network operates.
            </p>
          </SectionHeader>

          <AccordionList>
            {mostAskedFaqs.map((faq) => {
              const isOpen = openMostAskedId === faq.id;
              return (
                <AccordionItem
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={isOpen ? "open" : ""}
                >
                  <button
                    type="button"
                    className="question-btn"
                    onClick={() => toggleMostAsked(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="q-title-box">
                      <span className="num-tag">{faq.num}</span>
                      <h3>{faq.question}</h3>
                    </div>
                    <div className={`icon-toggle ${isOpen ? "rotated" : ""}`}>
                      <IoChevronDown />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="answer-panel">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </AccordionItem>
              );
            })}
          </AccordionList>
        </Container>
      </MostAskedSection>

      {/* ── 4. Food Safety Feature Section ──────────────────────────────── */}
      <SafetyFeatureSection>
        <Container>
          <SafetySplitGrid>
            <SafetyImageWrap>
              <img
                src="/nepali-food-safety.jpg"
                alt="Fresh, hygienically prepared meals being portioned"
                loading="lazy"
              />
            </SafetyImageWrap>

            <SafetyContentWrap>
              <EyebrowBadge>SAFETY & TRUST</EyebrowBadge>
              <h2>Good food should always be shared responsibly.</h2>
              <p className="lead-text">
                Food safety is our top priority. We verify all donors and have strict
                handling, storage, and transport guidelines. Here's how we keep everyone safe.
              </p>

              <div className="principles-grid">
                {SAFETY_PRINCIPLES.map((principle, idx) => (
                  <div key={idx} className="principle-item">
                    <h4>{principle.title}</h4>
                    <p>{principle.description}</p>
                  </div>
                ))}
              </div>

              <Link to="/food-safety" className="btn-safety">
                <span>Explore Food Safety Guidelines</span>
                <IoArrowForward />
              </Link>
            </SafetyContentWrap>
          </SafetySplitGrid>
        </Container>
      </SafetyFeatureSection>

      {/* ── 5. Simple FAQ List ("More Answers") ──────────────────────────── */}
      <MoreAnswersSection id="more-answers-section" style={{ borderBottom: "none", paddingBottom: "72px" }}>
        <Container>
          <SectionHeader $maxWidth="680px" $marginBottom="52px">
            <EyebrowBadge>EVERYTHING ELSE</EyebrowBadge>
            <h2>Still curious?</h2>
            <p>
              Detailed questions covering donations, logistics, and account
              management.
            </p>
          </SectionHeader>

          <TwoColumnFaqGrid>
            {/* Left Column: Donations & Pickups */}
            <div>
              {moreAnswers.left.map((group) => (
                <FaqGroupBlock key={group.groupKey} id={group.groupKey}>
                  <div className="group-title">
                    <span>{group.groupTitle}</span>
                  </div>

                  {group.items.map((item) => {
                    const isOpen = !!openMoreFaqs[item.id];
                    return (
                      <SimpleAccordionItem
                        key={item.id}
                        id={`faq-${item.id}`}
                        className={isOpen ? "open" : ""}
                      >
                        <button
                          type="button"
                          className="simple-trigger"
                          onClick={() => toggleMoreFaq(item.id)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.question}</span>
                          <div
                            className={`icon-toggle ${isOpen ? "rotated" : ""}`}
                          >
                            <IoChevronDown />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="simple-answer">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </SimpleAccordionItem>
                    );
                  })}
                </FaqGroupBlock>
              ))}
            </div>

            {/* Right Column: Organizations & Food Safety */}
            <div>
              {moreAnswers.right.map((group) => (
                <FaqGroupBlock key={group.groupKey} id={group.groupKey}>
                  <div className="group-title">
                    <span>{group.groupTitle}</span>
                  </div>

                  {group.items.map((item) => {
                    const isOpen = !!openMoreFaqs[item.id];
                    return (
                      <SimpleAccordionItem
                        key={item.id}
                        id={`faq-${item.id}`}
                        className={isOpen ? "open" : ""}
                      >
                        <button
                          type="button"
                          className="simple-trigger"
                          onClick={() => toggleMoreFaq(item.id)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.question}</span>
                          <div
                            className={`icon-toggle ${isOpen ? "rotated" : ""}`}
                          >
                            <IoChevronDown />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="simple-answer">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </SimpleAccordionItem>
                    );
                  })}
                </FaqGroupBlock>
              ))}
            </div>
          </TwoColumnFaqGrid>
        </Container>
      </MoreAnswersSection>
    </PageWrapper>
  );
}
