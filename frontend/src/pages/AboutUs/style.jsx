import styled from "styled-components";

// ── Global Canvas ───────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  background-color: #F8F5ED;
  color: #1E342E;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  overflow-x: hidden;
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

// Small Uppercase Eyebrow Badge (Matching Homepage sub-tags exactly)
export const EyebrowBadge = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $light }) => ($light ? "#B8DD72" : "#2E7D5B")};
  background: ${({ $light }) =>
    $light ? "rgba(184, 221, 114, 0.12)" : "rgba(46, 125, 91, 0.09)"};
  padding: 5px 14px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 14px;
`;

export const SectionHeaderArea = styled.div`
  text-align: ${({ $align }) => $align || "center"};
  max-width: ${({ $maxWidth }) => $maxWidth || "680px"};
  margin: ${({ $margin }) => $margin || "0 auto 52px"};

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.3rem;
    font-weight: 600;
    color: ${({ $light }) => ($light ? "#F8F5ED" : "#174A3A")};
    letter-spacing: -0.02em;
    margin: 0 0 14px;
    line-height: 1.25;

    @media (max-width: 640px) {
      font-size: 1.85rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: ${({ $light }) => ($light ? "#C6EAD8" : "#556B64")};
    line-height: 1.6;
    margin: 0;
  }
`;

// ── 2. About Hero Section (Editorial Two-Column with Real Food Photography) ──
export const AboutHeroSection = styled.section`
  padding: 130px 0 68px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 36px 0 44px;
  }
`;

export const HeroSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const HeroContentSide = styled.div`
  max-width: 600px;

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 3.1rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.16;
    letter-spacing: -0.02em;
    margin: 0 0 18px;

    @media (max-width: 768px) {
      font-size: 2.35rem;
    }
  }

  p {
    font-size: 1.12rem;
    color: #556B64;
    line-height: 1.65;
    margin: 0 0 32px;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 24px;
    }
  }

  .hero-actions-row {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 26px;
      border-radius: 999px;
      background: #174A3A;
      color: #F8F5ED;
      font-family: inherit;
      font-size: 0.94rem;
      font-weight: 600;
      border: 1px solid #174A3A;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        background: #2E7D5B;
        border-color: #2E7D5B;
        transform: translateY(-2px);
      }
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 24px;
      border-radius: 999px;
      background: transparent;
      color: #174A3A;
      font-family: inherit;
      font-size: 0.94rem;
      font-weight: 600;
      border: 1px solid rgba(23, 74, 58, 0.2);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        background: rgba(23, 74, 58, 0.05);
        border-color: #174A3A;
      }
    }
  }
`;

export const HeroImageSide = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);

  @media (max-width: 992px) {
    height: 320px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }

  .image-caption-pill {
    position: absolute;
    bottom: 16px;
    left: 16px;
    background: rgba(23, 74, 58, 0.88);
    backdrop-filter: blur(8px);
    color: #F8F5ED;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

// ── 3. Our Purpose Section (Muted Beige Background) ─────────────────────────
export const PurposeSection = styled.section`
  padding: 88px 0;
  background-color: #ECE9E0;
 
`;

export const PurposeSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const PurposeTextSide = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.35rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.22;
    margin: 0 0 18px;

    @media (max-width: 640px) {
      font-size: 1.85rem;
    }
  }

  p {
    font-size: 1.08rem;
    color: #556B64;
    line-height: 1.7;
    margin: 0;
  }
`;

export const PurposeStatsSide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const PurposeStatCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 28px 24px;
  border: 1px solid #DDDDD5;
  display: flex;
  flex-direction: column;

  .stat-big {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.5rem;
    font-weight: 800;
    color: #174A3A;
    line-height: 1.1;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  .stat-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #69736E;
    line-height: 1.45;
  }
`;

// ── 4. Our Story Section (Two-Column Story + Photo) ─────────────────────────
export const StorySection = styled.section`
  padding: 96px 0;
  background-color: #FFFFFF;
`;

export const StorySplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const StoryImageSide = styled.div`
  width: 100%;
  height: 460px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);

  @media (max-width: 960px) {
    height: 320px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const StoryContentSide = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.35rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.22;
    margin: 0 0 20px;

    @media (max-width: 640px) {
      font-size: 1.85rem;
    }
  }

  .story-paragraphs {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 28px;

    p {
      font-size: 1.05rem;
      color: #556B64;
      line-height: 1.7;
      margin: 0;
    }
  }

  .story-timeline {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-top: 1px solid #DDDDD5;
    padding-top: 24px;

    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;

      .timeline-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #2E7D5B;
        margin-top: 6px;
        flex-shrink: 0;
      }

      div {
        strong {
          display: block;
          font-size: 0.96rem;
          color: #174A3A;
          margin-bottom: 2px;
        }
        span {
          font-size: 0.88rem;
          color: #69736E;
          line-height: 1.45;
        }
      }
    }
  }
`;

// ── 5. How ANNShare Makes a Difference (Matching Homepage HowItWorks Cards) ──
export const ImpactModelSection = styled.section`
  padding: 88px 0;
  background-color: #F8F5ED;
 
`;

export const ThreeCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ImpactModelCard = styled.div`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 34px 28px;
  border: 1px solid rgba(23, 74, 58, 0.09);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(23, 74, 58, 0.08);
    border-color: rgba(46, 125, 91, 0.25);
  }

  .card-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .icon-box {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: rgba(46, 125, 91, 0.1);
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
    }

    .step-number {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.05rem;
      font-weight: 800;
      color: #2E7D5B;
      background: rgba(46, 125, 91, 0.1);
      padding: 4px 10px;
      border-radius: 999px;
    }
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 10px;
  }

  p {
    font-size: 0.95rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;
  }
`;

// ── 6. Our Values Section (Dark Forest Green Full-Width Band) ───────────────
export const ValuesDarkSection = styled.section`
  padding: 96px 0;
  background-color: #174A3A;
  color: #F8F5ED;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.25) 0%, transparent 70%);
    top: -120px;
    right: -100px;
    pointer-events: none;
  }
`;

export const ValuesFourGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: 16px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const ValueColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #F8F5ED;
    margin: 0 0 10px;
  }

  p {
    font-size: 0.95rem;
    color: #C6EAD8;
    line-height: 1.6;
    margin: 0;
  }

  @media (min-width: 993px) {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: -16px;
      top: 10%;
      height: 80%;
      width: 1px;
      background: rgba(255, 255, 255, 0.12);
    }
  }
`;

// ── 7. Community in Action (Photo Collage + Short Editorial) ────────────────
export const CommunityActionSection = styled.section`
  padding: 96px 0;
  background-color: #FFFFFF;
`;

export const CollageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: center;
  margin-bottom: 36px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const CollagePhotoCard = styled.div`
  border-radius: 20px;
  overflow: hidden;
  height: ${({ $tall }) => ($tall ? "340px" : "280px")};
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 8px 24px rgba(23, 74, 58, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

export const CommunityNarrativeBox = styled.div`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;

  p {
    font-size: 1.1rem;
    color: #556B64;
    line-height: 1.7;
    margin: 0;
  }
`;

// ── 8. Impact Statistics Section (Clean Horizontal Grid Matching Homepage) ──
export const ImpactStripSection = styled.section`
  padding: 64px 0;
  background-color: #F8F5ED;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 24px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .stat-number {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.6rem;
    font-weight: 800;
    color: #174A3A;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #556B64;
    margin-bottom: 2px;
  }

  .sub-note {
    font-size: 0.8rem;
    color: #8C9E98;
  }

  @media (min-width: 901px) {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: -18px;
      top: 15%;
      height: 70%;
      width: 1px;
      background: rgba(23, 74, 58, 0.1);
    }
  }
`;

// ── 9. Our Vision Section (Split Editorial) ─────────────────────────────────
export const VisionSection = styled.section`
  padding: 96px 0;
  background-color: #ECE9E0;
  border-bottom: 1px solid #DDDDD5;
`;

export const VisionSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const VisionTextSide = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.35rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.22;
    margin: 0 0 18px;

    @media (max-width: 640px) {
      font-size: 1.85rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: #556B64;
    line-height: 1.7;
    margin: 0;
  }
`;

export const VisionImageSide = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #DDDDD5;
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);

  @media (max-width: 960px) {
    height: 300px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// ── 10. Get Involved Section (Exact Homepage CommunityCTA Component Style) ──
export const GetInvolvedSection = styled.section`
  padding: 88px 0;
  background-color: #FFFFFF;
`;

export const BannerCard = styled.div`
  background: #174A3A;
  border-radius: 36px;
  padding: 70px 48px;
  color: #FFFFFF;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(23, 74, 58, 0.2);

  @media (max-width: 768px) {
    padding: 50px 24px;
    border-radius: 28px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.35) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(215, 168, 62, 0.2) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    pointer-events: none;
  }

  .content-inner {
    position: relative;
    z-index: 2;
    max-width: 720px;
    margin: 0 auto;
  }

  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #D7A83E;
    background: rgba(215, 168, 62, 0.15);
    padding: 6px 16px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 20px;
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.8rem;
    font-weight: 600;
    color: #F8F5ED;
    line-height: 1.2;
    margin: 0 0 18px;

    @media (max-width: 640px) {
      font-size: 2.1rem;
    }
  }

  p {
    font-size: 1.15rem;
    color: #C6EAD8;
    line-height: 1.6;
    margin: 0 0 36px;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    button {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }

    .btn-donate {
      background: #B9F072;
      color: #174A3A;

      &:hover {
        background: #ccf88b;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(185, 240, 114, 0.3);
      }
    }

    .btn-need {
      background: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);

      &:hover {
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);
      }
    }
  }
`;
