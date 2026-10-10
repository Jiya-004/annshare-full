import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoRestaurantOutline,
  IoShieldCheckmarkOutline,
  IoPeopleOutline,
  IoArrowForward,
  IoHeartOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

import DonateFoodModal from "../../layout/Header/DonateFoodModal";
import NeedFoodModal from "../../layout/Header/NeedFoodModal";

import {
  PageWrapper,
  Container,
  EyebrowBadge,
  SectionHeaderArea,
  AboutHeroSection,
  HeroSplitGrid,
  HeroContentSide,
  HeroImageSide,
  PurposeSection,
  PurposeSplitGrid,
  PurposeTextSide,
  PurposeStatsSide,
  PurposeStatCard,
  StorySection,
  StorySplitGrid,
  StoryImageSide,
  StoryContentSide,
  ImpactModelSection,
  ThreeCardsGrid,
  ImpactModelCard,
  ValuesDarkSection,
  ValuesFourGrid,
  ValueColumn,
  CommunityActionSection,
  CollageGrid,
  CollagePhotoCard,
  CommunityNarrativeBox,
  ImpactStripSection,
  StatsGrid,
  StatItem,
  VisionSection,
  VisionSplitGrid,
  VisionTextSide,
  VisionImageSide,
  GetInvolvedSection,
  BannerCard,
} from "./style";

export default function AboutUsPage() {
  const navigate = useNavigate();

  // Modals for donating & finding food
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isNeedFoodModalOpen, setIsNeedFoodModalOpen] = useState(false);

  const scrollToImpactModel = (e) => {
    e.preventDefault();
    const el = document.getElementById("impact-model");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToGetInvolved = (e) => {
    e.preventDefault();
    const el = document.getElementById("get-involved");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageWrapper>
      {/* ── 1. About Hero Section (Editorial Two-Column with Authentic Food Photography) ── */}
      <AboutHeroSection>
        <Container>
          <HeroSplitGrid>
            <HeroContentSide>
              <EyebrowBadge>ABOUT ANNSHARE</EyebrowBadge>
              <h1>Good food deserves a second journey.</h1>
              <p>
                ANNShare is a community food-sharing platform built to connect surplus meals
                with shelters, orphanages, and families who need them most. By turning excess
                food into shared nourishment, we reduce waste, strengthen neighborhoods, and
                ensure no good meal goes unserved.
              </p>
              <div className="hero-actions-row">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={scrollToImpactModel}
                >
                  <span>Explore How It Works</span>
                  <IoArrowForward />
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={scrollToGetInvolved}
                >
                  <span>Join Our Community</span>
                </button>
              </div>
            </HeroContentSide>

            <HeroImageSide>
              <img
                src="/food.png"
                alt="Fresh wholesome meals prepared in commercial kitchen for redistribution"
                loading="eager"
              />
              <div className="image-caption-pill">
                <IoCheckmarkCircleOutline />
                <span>Verified Fresh Kitchen Surplus</span>
              </div>
            </HeroImageSide>
          </HeroSplitGrid>
        </Container>
      </AboutHeroSection>

      {/* ── 2. Our Purpose Section (Muted Beige Background) ── */}
      <PurposeSection>
        <Container>
          <PurposeSplitGrid>
            <PurposeTextSide>
              <EyebrowBadge>OUR PURPOSE</EyebrowBadge>
              <h2>Bridging the gap between surplus and hunger</h2>
              <p>
                Every day, fresh and untouched food from restaurants, bakeries, caterers,
                and events goes uneaten, while local organizations struggle to secure enough
                meals for those they care for. ANNShare was created to bridge that gap through
                simple technology, coordinated logistics, and transparent community trust.
              </p>
            </PurposeTextSide>

            <PurposeStatsSide>
              <PurposeStatCard>
                <span className="stat-big">1/3</span>
                <span className="stat-text">Of all food produced is lost or wasted globally</span>
              </PurposeStatCard>

              <PurposeStatCard>
                <span className="stat-big">1 in 9</span>
                <span className="stat-text">Individuals face daily food insecurity in our communities</span>
              </PurposeStatCard>

              <PurposeStatCard>
                <span className="stat-big">&lt;25m</span>
                <span className="stat-text">Average response time from listing to volunteer match</span>
              </PurposeStatCard>

              <PurposeStatCard>
                <span className="stat-big">100%</span>
                <span className="stat-text">Free and community-funded platform for donors and shelters</span>
              </PurposeStatCard>
            </PurposeStatsSide>
          </PurposeSplitGrid>
        </Container>
      </PurposeSection>

      {/* ── 3. Our Story Section (Two-Column Story with Authentic Photo) ── */}
      <StorySection>
        <Container>
          <StorySplitGrid>
            <StoryImageSide>
              <img
                src="/serve.jpg"
                alt="Volunteers serving warm meals at a community center"
                loading="lazy"
              />
            </StoryImageSide>

            <StoryContentSide>
              <EyebrowBadge>OUR STORY</EyebrowBadge>
              <h2>How a simple idea grew into a community movement</h2>
              <div className="story-paragraphs">
                <p>
                  It started with a simple observation: restaurants and event halls in our city
                  often had delicious, freshly prepared food left over at the end of the day, yet
                  shelters just minutes away were short on daily meals.
                </p>
                <p>
                  The challenge was never a lack of food or goodwill—it was logistics, safety
                  verification, and speed. ANNShare was founded to create an immediate, reliable link
                  that makes food rescue as simple as posting an update.
                </p>
              </div>

              <div className="story-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <strong>2024 — Grassroots Beginnings</strong>
                    <span>Started with 5 local restaurants and a single community shelter in Kathmandu.</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <strong>2025 — Building the Platform</strong>
                    <span>Launched digital food safety checklists, volunteer dispatch, and instant pickup windows.</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <strong>Today — Valley-Wide Movement</strong>
                    <span>Connecting dozens of daily donors with verified NGO feeding partners across neighborhoods.</span>
                  </div>
                </div>
              </div>
            </StoryContentSide>
          </StorySplitGrid>
        </Container>
      </StorySection>

      {/* ── 4. How ANNShare Makes a Difference (Matching Homepage HowItWorks) ── */}
      <ImpactModelSection id="impact-model">
        <Container>
          <SectionHeaderArea>
            <EyebrowBadge>HOW IT WORKS</EyebrowBadge>
            <h2>A simple, transparent food-sharing network</h2>
            <p>
              We provide the coordination and verification that enables good food to reach
              the right people quickly and safely.
            </p>
          </SectionHeaderArea>

          <ThreeCardsGrid>
            <ImpactModelCard>
              <div className="card-top-row">
                <div className="icon-box">
                  <IoRestaurantOutline />
                </div>
                <span className="step-number">01</span>
              </div>
              <h3>Food is Listed</h3>
              <p>
                Restaurants, caterers, and grocers post surplus food details, quantity,
                and pickup windows in under two minutes via the platform.
              </p>
            </ImpactModelCard>

            <ImpactModelCard>
              <div className="card-top-row">
                <div className="icon-box">
                  <IoShieldCheckmarkOutline />
                </div>
                <span className="step-number">02</span>
              </div>
              <h3>Partners Connect</h3>
              <p>
                Verified shelters and community organizations are notified instantly and matched
                based on proximity, capacity, and dietary requirements.
              </p>
            </ImpactModelCard>

            <ImpactModelCard>
              <div className="card-top-row">
                <div className="icon-box">
                  <IoPeopleOutline />
                </div>
                <span className="step-number">03</span>
              </div>
              <h3>Food Reaches Communities</h3>
              <p>
                Volunteers and partners pick up the food following strict safety protocols
                and deliver fresh, warm meals directly to dining tables.
              </p>
            </ImpactModelCard>
          </ThreeCardsGrid>
        </Container>
      </ImpactModelSection>

      {/* ── 5. Our Values Section (Dark Forest Green Full-Width Band) ── */}
      <ValuesDarkSection>
        <Container>
          <SectionHeaderArea $light>
            <EyebrowBadge $light>OUR VALUES</EyebrowBadge>
            <h2>The principles guiding our work</h2>
            <p>
              Everything we do is anchored in respect, safety, and community responsibility.
            </p>
          </SectionHeaderArea>

          <ValuesFourGrid>
            <ValueColumn>
              <h3>Community First</h3>
              <p>
                We prioritize local grassroots organizations, ensuring support reaches the
                people who need it most without barriers or delays.
              </p>
            </ValueColumn>

            <ValueColumn>
              <h3>Responsible Sharing</h3>
              <p>
                Food rescue must be safe. We enforce strict hygiene guidelines, allergen labels,
                and temperature protocols for every donation.
              </p>
            </ValueColumn>

            <ValueColumn>
              <h3>Trust & Safety</h3>
              <p>
                Every donor and recipient organization is vetted to build a dependable,
                accountable ecosystem you can rely on.
              </p>
            </ValueColumn>

            <ValueColumn>
              <h3>Real Impact</h3>
              <p>
                We track meals rescued and landfill waste prevented so every partner can see
                their direct environmental and human contribution.
              </p>
            </ValueColumn>
          </ValuesFourGrid>
        </Container>
      </ValuesDarkSection>

      {/* ── 6. Community in Action Section (Photo Collage + Short Editorial) ── */}
      <CommunityActionSection>
        <Container>
          <SectionHeaderArea>
            <EyebrowBadge>THE PEOPLE BEHIND THE MOVEMENT</EyebrowBadge>
            <h2>Real hands, real neighbors, real impact</h2>
            <p>
              From kitchen staff packing surplus with care, to volunteer drivers,
              to shelter coordinators serving warm dinners.
            </p>
          </SectionHeaderArea>

          <CollageGrid>
            <CollagePhotoCard $tall>
              <img
                src="/community-volunteers.jpg"
                alt="Volunteers actively distributing fresh food supplies in the community"
                loading="lazy"
              />
            </CollagePhotoCard>

            <CollagePhotoCard>
              <img
                src="/eating.png"
                alt="Freshly prepared surplus meals packed neatly for swift delivery"
                loading="lazy"
              />
            </CollagePhotoCard>

            <CollagePhotoCard $tall>
              <img
                src="/community-meal.jpg"
                alt="Volunteers serving warm nutritious meals with care and compassion"
                loading="lazy"
              />
            </CollagePhotoCard>
          </CollageGrid>

          <CommunityNarrativeBox>
            <p>
              Behind every meal saved is a network of compassionate individuals who believe that
              wholesome food should feed people, not landfills. Together, our donors, volunteers,
              and shelter partners are creating a more resilient, caring city.
            </p>
          </CommunityNarrativeBox>
        </Container>
      </CommunityActionSection>

      {/* ── 7. Impact Statistics Section (Clean Horizontal Grid Matching Homepage) ── */}
      <ImpactStripSection>
        <Container>
          <SectionHeaderArea $margin="0 auto 40px">
            <EyebrowBadge>BY THE NUMBERS</EyebrowBadge>
            <h2>Every meal makes an undeniable difference</h2>
          </SectionHeaderArea>

          <StatsGrid>
            <StatItem>
              <span className="stat-number">25,000+</span>
              <span className="stat-label">Meals Shared</span>
              <span className="sub-note">Directly to verified community centers</span>
            </StatItem>

            <StatItem>
              <span className="stat-number">350+</span>
              <span className="stat-label">Community Partners</span>
              <span className="sub-note">Restaurants, bakeries, and caterers</span>
            </StatItem>

            <StatItem>
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Active Volunteers</span>
              <span className="sub-note">Dedicated neighborhood responders</span>
            </StatItem>

            <StatItem>
              <span className="stat-number">18 Tons</span>
              <span className="stat-label">Food Rescued</span>
              <span className="sub-note">Prevented from reaching landfills</span>
            </StatItem>
          </StatsGrid>
        </Container>
      </ImpactStripSection>

      {/* ── 8. Our Vision Section (Split Editorial) ── */}
      <VisionSection>
        <Container>
          <VisionSplitGrid>
            <VisionTextSide>
              <EyebrowBadge>OUR VISION</EyebrowBadge>
              <h2>A future where food waste is obsolete</h2>
              <p>
                We envision thriving cities where surplus food never goes to waste, and where
                community care is woven into daily urban life. By combining rapid coordination
                with grassroots trust, ANNShare is establishing a replicable blueprint for
                sustainable urban food ecosystems across the region.
              </p>
            </VisionTextSide>

            <VisionImageSide>
              <img
                src="/community-sharing2.jpg"
                alt="A thriving community sharing a wholesome communal meal together"
                loading="lazy"
              />
            </VisionImageSide>
          </VisionSplitGrid>
        </Container>
      </VisionSection>

      {/* ── Interactive Modals ──────────────────────────────────────── */}
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
