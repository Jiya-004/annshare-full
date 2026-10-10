import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  IoSearchOutline,
  IoClose,
  IoArrowForward,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoBusinessOutline,
  IoHelpCircleOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoBicycleOutline,
  IoKeyOutline,
  IoMailOutline,
  IoCallOutline,
  IoSparkles,
  IoDocumentTextOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";

import DonateFoodModal from "../../layout/Header/DonateFoodModal";
import NeedFoodModal from "../../layout/Header/NeedFoodModal";

import {
  QUICK_ACTIONS,
  HELP_TOPICS,
  FEATURED_GUIDES,
  POPULAR_ARTICLES,
  SUPPORT_STEPS,
  COMMUNITY_RESOURCES,
} from "./data/helpData";

import {
  PageWrapper,
  Container,
  EyebrowBadge,
  HelpHeroSection,
  HeroSplitGrid,
  HeroContentSide,
  HeroVisualSide,
  SupportGraphicCluster,
  ClusterCard,
  SearchBarBox,
  SearchInputContainer,
  SuggestedTagsRow,
  QuickActionsSection,
  QuickActionsGrid,
  QuickActionCard,
  BrowseTopicsSection,
  SectionHeader,
  TopicsGrid,
  TopicCategoryCard,
  FeaturedGuidesSection,
  GuidesLayoutGrid,
  MainVisualGuideCard,
  CompanionGuidesStack,
  CompanionGuideCard,
  PopularArticlesSection,
  NumberedListWrapper,
  ArticleRowItem,
  StepsSupportSection,
  StepsCardsGrid,
  StepCardBox,
  ContactSupportSection,
  ContactSplitGrid,
  ContactLeftText,
  ContactRightInfo,
  SupportInfoCard,
  CommunityResourcesSection,
  ResourcesGrid,
  ResourceLinkCard,
  FinalCtaSection,
  DarkBannerCard,
  ModalBackdrop,
  GuideModalCard,
} from "./style";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGuide, setActiveGuide] = useState(null);

  // CTA Modals
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isNeedFoodModalOpen, setIsNeedFoodModalOpen] = useState(false);

  // Icon Resolver
  const renderIcon = (name) => {
    switch (name) {
      case "IoRestaurantOutline":
        return <IoRestaurantOutline />;
      case "IoPeopleOutline":
        return <IoPeopleOutline />;
      case "IoBusinessOutline":
        return <IoBusinessOutline />;
      case "IoHelpCircleOutline":
        return <IoHelpCircleOutline />;
      case "IoRocketOutline":
        return <IoRocketOutline />;
      case "IoShieldCheckmarkOutline":
        return <IoShieldCheckmarkOutline />;
      case "IoBicycleOutline":
        return <IoBicycleOutline />;
      case "IoKeyOutline":
        return <IoKeyOutline />;
      default:
        return <IoDocumentTextOutline />;
    }
  };

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Live filtered topic categories
  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return HELP_TOPICS;
    return HELP_TOPICS.filter((topic) => {
      const matchTitle = topic.title.toLowerCase().includes(q);
      const matchDesc = topic.desc.toLowerCase().includes(q);
      const matchArticles = topic.articles.some((art) =>
        art.title.toLowerCase().includes(q)
      );
      return matchTitle || matchDesc || matchArticles;
    });
  }, [searchQuery]);

  // Live filtered popular articles
  const filteredPopularArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return POPULAR_ARTICLES;
    return POPULAR_ARTICLES.filter((art) => {
      return (
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleTagClick = (tagText) => {
    setSearchQuery(tagText);
    scrollToSection("browse-topics");
  };

  return (
    <PageWrapper>
      {/* ── Section 1: Hero Header & Search (Split Layout) ─────────────── */}
      <HelpHeroSection>
        <Container>
          <HeroSplitGrid>
            {/* Left Side: Badge, Title, Subtext, Search Bar, Suggested Tags */}
            <HeroContentSide>
              <EyebrowBadge>
                <IoSparkles style={{ marginRight: 6, verticalAlign: "-1px" }} />
                Help Center & Resource Hub
              </EyebrowBadge>
              <h1>How can we help you today?</h1>
              <p className="subtext">
                Find answers, step-by-step donation guides, safety protocols, and
                operational resources to make surplus food sharing seamless and safe.
              </p>

              {/* Search Input Box */}
              <SearchBarBox>
                <SearchInputContainer>
                  <IoSearchOutline className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search articles, temperature rules, donor guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-btn"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <IoClose />
                    </button>
                  )}
                </SearchInputContainer>
              </SearchBarBox>

              {/* Suggested Search Tags */}
              <SuggestedTagsRow>
                <span className="label">Popular searches:</span>
                <button
                  type="button"
                  className="tag-pill"
                  onClick={() => handleTagClick("Food Donations")}
                >
                  Donating food
                </button>
                <button
                  type="button"
                  className="tag-pill"
                  onClick={() => handleTagClick("Requesting Food")}
                >
                  Requesting food
                </button>
                <button
                  type="button"
                  className="tag-pill"
                  onClick={() => handleTagClick("Food Safety")}
                >
                  Food safety
                </button>
                <button
                  type="button"
                  className="tag-pill"
                  onClick={() => handleTagClick("Verification")}
                >
                  Account verification
                </button>
                <button
                  type="button"
                  className="tag-pill"
                  onClick={() => handleTagClick("Pickups")}
                >
                  Pickup logistics
                </button>
              </SuggestedTagsRow>
            </HeroContentSide>

            {/* Right Side: Supporting Visual (2 Spaced Floating Cards) */}
            <HeroVisualSide>
              <SupportGraphicCluster>
                {/* Floating Card 1: Chat & Live Help */}
                <ClusterCard
                  $marginLeft="14px"
                  style={{ cursor: "pointer" }}
                  onClick={() => scrollToSection("contact-support-section")}
                >
                  <div className="card-icon-box">
                    <IoChatbubbleEllipsesOutline />
                  </div>
                  <div className="card-info">
                    <div className="top-meta">
                      <span className="badge-text">SUPPORT DESK</span>
                      <span className="status-indicator">Active • 24/7</span>
                    </div>
                    <h4>Direct Support & Chat</h4>
                    <p>Immediate coordination for pickups, logistics & active queries</p>
                  </div>
                </ClusterCard>

                {/* Floating Card 2: Operational SOPs */}
                <ClusterCard
                  $marginLeft="0px"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveGuide(FEATURED_GUIDES[0])}
                >
                  <div className="card-icon-box">
                    <IoDocumentTextOutline />
                  </div>
                  <div className="card-info">
                    <div className="top-meta">
                      <span className="badge-text">KNOWLEDGE BASE</span>
                      <span className="secondary-tag">Verified Standards • 6 SOPs</span>
                    </div>
                    <h4>Operational SOPs</h4>
                    <p>Food safety checklists, packaging rules & temperature benchmarks</p>
                  </div>
                </ClusterCard>
              </SupportGraphicCluster>
            </HeroVisualSide>
          </HeroSplitGrid>
        </Container>
      </HelpHeroSection>

      {/* ── Section 2: Quick Actions (4 Cards) ────────────────────────────── */}
      <QuickActionsSection>
        <Container>
          <QuickActionsGrid>
            {QUICK_ACTIONS.map((action) => (
              <QuickActionCard key={action.id}>
                <div className="card-top">
                  <div className="icon-box">{renderIcon(action.iconName)}</div>
                  <span className="num-tag">{action.num}</span>
                </div>
                <h3>{action.title}</h3>
                <p>{action.desc}</p>
                <button
                  type="button"
                  className="action-arrow"
                  onClick={() => scrollToSection(action.targetSection)}
                >
                  {action.linkText} <IoArrowForward />
                </button>
              </QuickActionCard>
            ))}
          </QuickActionsGrid>
        </Container>
      </QuickActionsSection>

      {/* ── Section 3: Browse Help Topics (6 Category Cards) ──────────────── */}
      <BrowseTopicsSection id="browse-topics">
        <Container>
          <SectionHeader>
            <EyebrowBadge>Documentation</EyebrowBadge>
            <h2>Browse Help Topics</h2>
            <p>
              Explore structured documentation organized by role, safety standard,
              and logistics coordination.
            </p>
          </SectionHeader>

          <TopicsGrid>
            {filteredTopics.map((topic) => (
              <TopicCategoryCard key={topic.id} id={topic.id}>
                <div className="icon-heading-row">
                  <div className="cat-icon">{renderIcon(topic.iconName)}</div>
                  <h3>{topic.title}</h3>
                </div>
                <p className="category-desc">{topic.desc}</p>

                <ul className="articles-list">
                  {topic.articles.map((art) => (
                    <li key={art.id}>
                      <button
                        type="button"
                        onClick={() => {
                          // Open corresponding guide or generic guide modal
                          const matchedGuide =
                            FEATURED_GUIDES.find(
                              (g) =>
                                g.title.toLowerCase().includes(art.title.toLowerCase().slice(0, 8)) ||
                                g.badge.toLowerCase().includes(topic.title.toLowerCase().slice(0, 4))
                            ) || FEATURED_GUIDES[0];
                          setActiveGuide(matchedGuide);
                        }}
                      >
                        <span>{art.title}</span>
                        <span className="read-time">{art.readTime}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="view-all-link"
                  onClick={() => setActiveGuide(FEATURED_GUIDES[0])}
                >
                  View all articles <IoArrowForward />
                </button>
              </TopicCategoryCard>
            ))}
          </TopicsGrid>
        </Container>
      </BrowseTopicsSection>

      {/* ── Section 4: Featured Guides (Editorial Layout) ─────────────────── */}
      <FeaturedGuidesSection id="featured-guides">
        <Container>
          <SectionHeader>
            <EyebrowBadge>Step-by-Step SOPs</EyebrowBadge>
            <h2>Featured Guides</h2>
            <p>
              In-depth operational walkthroughs designed for kitchen staff,
              shelter directors, and volunteer drivers.
            </p>
          </SectionHeader>

          <GuidesLayoutGrid>
            {/* Main Visual Guide Card (Guide 01) */}
            <MainVisualGuideCard>
              <div className="image-wrapper">
                <img
                  src={FEATURED_GUIDES[0].image}
                  alt={FEATURED_GUIDES[0].title}
                  loading="lazy"
                />
                <span className="badge-overlay">{FEATURED_GUIDES[0].badge}</span>
              </div>
              <div className="content-wrap">
                <span className="guide-num">{FEATURED_GUIDES[0].num}</span>
                <h3>{FEATURED_GUIDES[0].title}</h3>
                <p>{FEATURED_GUIDES[0].desc}</p>
                <button
                  type="button"
                  className="read-btn"
                  onClick={() => setActiveGuide(FEATURED_GUIDES[0])}
                >
                  {FEATURED_GUIDES[0].linkText} <IoArrowForward />
                </button>
              </div>
            </MainVisualGuideCard>

            {/* Companion Guides Stack (Guide 02 & 03) */}
            <CompanionGuidesStack>
              {FEATURED_GUIDES.slice(1).map((guide) => (
                <CompanionGuideCard key={guide.id}>
                  <div className="top-row">
                    <span className="guide-num">{guide.num}</span>
                    <span className="guide-tag">{guide.badge}</span>
                  </div>
                  <h3>{guide.title}</h3>
                  <p>{guide.desc}</p>
                  <button
                    type="button"
                    className="read-btn"
                    onClick={() => setActiveGuide(guide)}
                  >
                    {guide.linkText} <IoArrowForward />
                  </button>
                </CompanionGuideCard>
              ))}
            </CompanionGuidesStack>
          </GuidesLayoutGrid>
        </Container>
      </FeaturedGuidesSection>

      {/* ── Section 5: Most Popular Articles (Numbered List) ──────────────── */}
      <PopularArticlesSection>
        <Container>
          <SectionHeader>
            <EyebrowBadge>Knowledge Base</EyebrowBadge>
            <h2>Most Popular Articles</h2>
            <p>
              Quick answers to the questions our donors and recipient partners
              consult most frequently.
            </p>
          </SectionHeader>

          <NumberedListWrapper>
            {filteredPopularArticles.map((art) => (
              <ArticleRowItem
                key={art.id}
                href={art.linkTo}
                as={Link}
                to={art.linkTo}
              >
                <div className="article-num">{art.num}</div>
                <div className="article-info">
                  <h3>{art.title}</h3>
                  <p>{art.summary}</p>
                </div>
                <IoArrowForward className="arrow-icon" />
              </ArticleRowItem>
            ))}
          </NumberedListWrapper>
        </Container>
      </PopularArticlesSection>

      {/* ── Section 6: Step-by-Step Support Walkthrough ───────────────────── */}
      <StepsSupportSection>
        <Container>
          <SectionHeader>
            <EyebrowBadge>How Support Works</EyebrowBadge>
            <h2>Getting Help in 3 Simple Steps</h2>
            <p>
              Follow our clear resolution pathway to find answers quickly or connect
              with our local support team.
            </p>
          </SectionHeader>

          <StepsCardsGrid>
            {SUPPORT_STEPS.map((step) => (
              <StepCardBox key={step.num}>
                <div className="step-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </StepCardBox>
            ))}
          </StepsCardsGrid>
        </Container>
      </StepsSupportSection>

  

      {/* ── Section 8: Community Resources & Legal Guidelines ─────────────── */}
      <CommunityResourcesSection>
        <Container>
          <SectionHeader>
            <EyebrowBadge>Policies & Standards</EyebrowBadge>
            <h2>Community Resources</h2>
            <p>
              Read our full policies, safety benchmarks, and platform rules to
              ensure safe, equitable food redistribution.
            </p>
          </SectionHeader>

          <ResourcesGrid>
            {COMMUNITY_RESOURCES.map((resource, idx) => (
              <ResourceLinkCard
                key={idx}
                as={Link}
                to={resource.linkTo}
              >
                <h4>{resource.title}</h4>
                <p>{resource.desc}</p>
                <span className="bottom-arrow">
                  Read policy <IoArrowForward />
                </span>
              </ResourceLinkCard>
            ))}
          </ResourcesGrid>
        </Container>
      </CommunityResourcesSection>



      {/* ── Guide Detail Modal ────────────────────────────────────────────── */}
      {activeGuide && (
        <ModalBackdrop onClick={() => setActiveGuide(null)}>
          <GuideModalCard onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setActiveGuide(null)}
              aria-label="Close modal"
            >
              <IoClose />
            </button>

            <span className="modal-badge">{activeGuide.badge}</span>
            <h2>{activeGuide.title}</h2>

            {activeGuide.image && (
              <img
                src={activeGuide.image}
                alt={activeGuide.title}
                className="guide-modal-img"
              />
            )}

            <div className="guide-body">
              <p>{activeGuide.content?.overview || activeGuide.desc}</p>

              {activeGuide.content?.steps && (
                <>
                  <h4>Step-by-Step Procedure:</h4>
                  <ol>
                    {activeGuide.content.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </>
              )}

              {activeGuide.content?.tip && (
                <div className="callout-box">
                  <strong>ANNShare Operational Tip:</strong>{" "}
                  {activeGuide.content.tip}
                </div>
              )}
            </div>
          </GuideModalCard>
        </ModalBackdrop>
      )}

      {/* ── Global Header Modals ─────────────────────────────────────────── */}
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
