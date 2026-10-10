import styled from "styled-components";

// ── Global Canvas ───────────────────────────────────────────────────────────
export const PageWrapper = styled.div`
  background-color: #F8F5ED;
  color: #1E342E;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  overflow-x: clip;
`;

export const Container = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || "1280px"};
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

// ── Small Uppercase Eyebrow Badge ───────────────────────────────────────────
export const EyebrowBadge = styled.span`
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1B4332;
  background: rgba(184, 221, 114, 0.35);
  border: 1px solid rgba(40, 98, 77, 0.14);
  padding: 4px 12px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 12px;
`;

// ── Section 1: Help Center Hero (Split Layout with Light Airy Radial Gradient) ──
export const HelpHeroSection = styled.header`
  padding: 130px 0 72px;
  background: radial-gradient(
      circle at 88% 18%,
      rgba(184, 221, 114, 0.22) 0%,
      rgba(230, 184, 74, 0.08) 35%,
      transparent 65%
    ),
    #FAF7F0;
  border-bottom: 1px solid #E8E5DD;
  color: #1E342E;
  position: relative;
  overflow: hidden;

  /* Ambient soft warm bloom from top-right */
  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -40px;
    width: 500px;
    height: 380px;
    background: radial-gradient(
      ellipse at center,
      rgba(184, 221, 114, 0.16) 0%,
      rgba(230, 184, 74, 0.06) 45%,
      transparent 70%
    );
    pointer-events: none;
    filter: blur(50px);
  }

  @media (max-width: 768px) {
    padding: 48px 0 40px;
  }
`;

export const HeroSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: 56px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const HeroContentSide = styled.div`
  text-align: left;
  max-width: 600px;

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.25rem;
    font-weight: 600;
    color: #1B4332;
    letter-spacing: -0.025em;
    line-height: 1.22;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.85rem;
    }
  }

  .subtext {
    font-size: 0.98rem;
    color: #5A6B63;
    line-height: 1.6;
    margin: 0 0 24px;
    max-width: 520px;

    @media (max-width: 768px) {
      font-size: 0.92rem;
      margin-bottom: 20px;
    }
  }
`;

export const SearchBarBox = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 0 16px;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FFFFFF;
  border: 1px solid #D8D6CC;
  border-radius: 12px;
  padding: 13px 18px;
  box-shadow: 0 4px 20px rgba(27, 67, 50, 0.06);
  transition: all 0.25s ease;

  &:focus-within {
    border-color: #28624D;
    box-shadow: 0 6px 24px rgba(27, 67, 50, 0.12);
  }

  .search-icon {
    font-size: 1.25rem;
    color: #28624D;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.96rem;
    color: #1E342E;
    width: 100%;
    background: transparent;

    &::placeholder {
      color: #8C9993;
    }
  }

  .clear-btn {
    background: transparent;
    border: none;
    color: #8C9993;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;

    &:hover {
      color: #173F34;
    }
  }
`;

export const SuggestedTagsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.84rem;
  color: #5A6B63;

  .label {
    opacity: 0.9;
    margin-right: 4px;
    font-size: 0.82rem;
    color: #5A6B63;
    font-weight: 500;
  }

  .tag-pill {
    background: #FFFFFF;
    border: 1px solid #D8D6CC;
    border-radius: 999px;
    padding: 4px 12px;
    color: #1B4332;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;

    &:hover {
      background: #1B4332;
      color: #FFFFFF;
      border-color: #1B4332;
      transform: translateY(-1px);
    }
  }
`;

export const HeroVisualSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  @media (max-width: 992px) {
    justify-content: flex-start;
    margin-top: 14px;
  }
`;

export const SupportGraphicCluster = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 992px) {
    max-width: 100%;
    gap: 20px;
  }
`;

export const ClusterCard = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(27, 67, 50, 0.08);
  border-radius: 16px;
  padding: 24px 26px;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: 0 10px 30px rgba(27, 67, 50, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
  margin-left: ${({ $marginLeft }) => $marginLeft || "0px"};
  transition: all 0.28s ease;

  @media (max-width: 992px) {
    margin-left: 0 !important;
    padding: 20px 22px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(27, 67, 50, 0.1);
    border-color: rgba(40, 98, 77, 0.25);
  }

  .card-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(40, 98, 77, 0.08);
    color: #1B4332;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.45rem;
    flex-shrink: 0;
  }

  .card-info {
    flex: 1;

    .top-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;

      .badge-text {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #1B4332;
        background: rgba(40, 98, 77, 0.08);
        padding: 3px 8px;
        border-radius: 999px;
      }

      .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.74rem;
        color: #059669;
        font-weight: 600;

        &::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }
      }

      .secondary-tag {
        font-size: 0.74rem;
        color: #69736E;
        font-weight: 600;
      }
    }

    h4 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.06rem;
      font-weight: 600;
      color: #1B4332;
      margin: 0 0 4px;
    }

    p {
      font-size: 0.86rem;
      color: #5A6B63;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

// ── Section 2: Quick Actions (4 Cards) ──────────────────────────────────────
export const QuickActionsSection = styled.section`
  padding: 64px 0 72px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 44px 0 52px;
  }
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickActionCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 14px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 12px 28px rgba(23, 74, 58, 0.07);

    .action-arrow {
      transform: translateX(4px);
      color: #174A3A;
    }
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .icon-box {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(46, 125, 91, 0.08);
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
    }

    .num-tag {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 0.88rem;
      font-weight: 700;
      color: #8C9993;
    }
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.18rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 8px;
  }

  p {
    font-size: 0.92rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0 0 20px;
    flex: 1;
  }

  .action-arrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #2E7D5B;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
  }
`;

// ── Section 3: Browse Help Topics (6 Category Cards) ────────────────────────
export const BrowseTopicsSection = styled.section`
  padding: 80px 0 88px;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const SectionHeader = styled.div`
  text-align: ${({ $align }) => $align || "center"};
  max-width: ${({ $maxWidth }) => $maxWidth || "640px"};
  margin: ${({ $margin }) => $margin || "0 auto 48px"};

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.3rem;
    font-weight: 600;
    color: ${({ $light }) => ($light ? "#F8F5ED" : "#174A3A")};
    letter-spacing: -0.02em;
    line-height: 1.22;
    margin: 0 0 10px;

    @media (max-width: 768px) {
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

export const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const TopicCategoryCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.28s ease;
  scroll-margin-top: 120px;

  &:hover {
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 10px 24px rgba(23, 74, 58, 0.06);
  }

  .icon-heading-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;

    .cat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(46, 125, 91, 0.08);
      color: #2E7D5B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.2rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;
    }
  }

  .category-desc {
    font-size: 0.9rem;
    color: #69736E;
    line-height: 1.5;
    margin: 0 0 18px;
  }

  .articles-list {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    flex: 1;

    li {
      padding: 6px 0;
      border-top: 1px solid rgba(221, 221, 213, 0.6);

      button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: transparent;
        border: none;
        padding: 0;
        font-family: inherit;
        font-size: 0.9rem;
        color: #354E46;
        text-align: left;
        cursor: pointer;
        transition: color 0.2s ease;

        &:hover {
          color: #2E7D5B;
        }

        .read-time {
          font-size: 0.78rem;
          color: #8C9993;
          flex-shrink: 0;
        }
      }
    }
  }

  .view-all-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #2E7D5B;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: gap 0.2s ease, color 0.2s ease;

    &:hover {
      color: #174A3A;
      gap: 10px;
    }
  }
`;

// ── Section 4: Featured Guides (Editorial Layout with Photography) ──────────
export const FeaturedGuidesSection = styled.section`
  padding: 88px 0 96px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const GuidesLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const MainVisualGuideCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 14px 36px rgba(23, 74, 58, 0.08);

    img {
      transform: scale(1.02);
    }
  }

  .image-wrapper {
    height: 260px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    .badge-overlay {
      position: absolute;
      top: 16px;
      left: 16px;
      background: #174A3A;
      color: #B8DD72;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 999px;
    }
  }

  .content-wrap {
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    flex: 1;

    .guide-num {
      font-size: 0.8rem;
      font-weight: 700;
      color: #2E7D5B;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.4rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 12px;
      line-height: 1.3;
    }

    p {
      font-size: 0.98rem;
      color: #556B64;
      line-height: 1.6;
      margin: 0 0 24px;
      flex: 1;
    }

    .read-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.92rem;
      font-weight: 600;
      color: #174A3A;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #2E7D5B;
        gap: 12px;
      }
    }
  }
`;

export const CompanionGuidesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CompanionGuideCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 18px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: all 0.28s ease;

  &:hover {
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 12px 28px rgba(23, 74, 58, 0.06);

    .read-btn {
      color: #2E7D5B;
      gap: 12px;
    }
  }

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .guide-num {
      font-size: 0.8rem;
      font-weight: 700;
      color: #2E7D5B;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .guide-tag {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      background: rgba(46, 125, 91, 0.09);
      color: #2E7D5B;
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
    line-height: 1.35;
  }

  p {
    font-size: 0.93rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 20px;
    flex: 1;
  }

  .read-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #174A3A;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`;

// ── Section 5: Most Popular Articles (Numbered List) ────────────────────────
export const PopularArticlesSection = styled.section`
  padding: 80px 0 88px;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const NumberedListWrapper = styled.div`
  max-width: 920px;
  margin: 0 auto;
  border-top: 1px solid #DDDDD5;
`;

export const ArticleRowItem = styled.a`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 8px;
  border-bottom: 1px solid #DDDDD5;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  @media (max-width: 640px) {
    gap: 16px;
    padding: 18px 4px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    padding-left: 16px;

    .article-num {
      color: #2E7D5B;
    }

    .arrow-icon {
      transform: translateX(4px);
      color: #174A3A;
    }
  }

  .article-num {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.3rem;
    font-weight: 700;
    color: #8C9993;
    width: 36px;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }

  .article-info {
    flex: 1;

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.15rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 4px;

      @media (max-width: 640px) {
        font-size: 1.02rem;
      }
    }

    p {
      font-size: 0.92rem;
      color: #69736E;
      margin: 0;
      line-height: 1.5;
    }
  }

  .arrow-icon {
    color: #2E7D5B;
    font-size: 1.25rem;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
`;

// ── Section 6: Step-by-Step Support Walkthrough ──────────────────────────────
export const StepsSupportSection = styled.section`
  padding: 88px 0 96px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const StepsCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const StepCardBox = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 16px;
  padding: 36px 30px;
  display: flex;
  flex-direction: column;
  transition: all 0.28s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 12px 28px rgba(23, 74, 58, 0.06);
  }

  .step-number {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.2rem;
    font-weight: 700;
    color: #2E7D5B;
    line-height: 1;
    margin-bottom: 18px;
    letter-spacing: -0.04em;
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.25rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 10px;
    line-height: 1.35;
  }

  p {
    font-size: 0.95rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;
  }
`;

// ── Section 7: Contact Support Section (Two-Column Layout) ──────────────────
export const ContactSupportSection = styled.section`
  padding: 88px 0 96px;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const ContactSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 56px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const ContactLeftText = styled.div`
  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.4rem;
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.24;
    margin: 0 0 16px;

    @media (max-width: 768px) {
      font-size: 1.95rem;
    }
  }

  p {
    font-size: 1.08rem;
    color: #556B64;
    line-height: 1.65;
    margin: 0 0 32px;
    max-width: 500px;
  }

  .btn-contact-main {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 999px;
    background: #174A3A;
    color: #F8F5ED;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    border: 1px solid #174A3A;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
      background: #2E7D5B;
      border-color: #2E7D5B;
      gap: 12px;
    }
  }
`;

export const ContactRightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SupportInfoCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 14px;
  padding: 26px 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 8px 20px rgba(23, 74, 58, 0.05);
  }

  .icon-holder {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: rgba(46, 125, 91, 0.08);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .info-content {
    flex: 1;

    h4 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 4px;
    }

    .email-link {
      font-size: 0.95rem;
      font-weight: 600;
      color: #2E7D5B;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 4px;

      &:hover {
        text-decoration: underline;
      }
    }

    .sub-note {
      font-size: 0.86rem;
      color: #69736E;
      line-height: 1.45;
      margin: 0;
    }

    .urgent-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #B94A48;
      text-decoration: none;
      margin-top: 6px;
      transition: gap 0.2s ease;

      &:hover {
        gap: 10px;
      }
    }
  }
`;

// ── Section 8: Community Support Section ────────────────────────────────────
export const CommunityResourcesSection = styled.section`
  padding: 80px 0 88px;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 52px 0 60px;
  }
`;

export const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ResourceLinkCard = styled.a`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 12px;
  padding: 22px 20px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 8px 20px rgba(23, 74, 58, 0.05);

    h4 {
      color: #2E7D5B;
    }

    .bottom-arrow {
      transform: translateX(4px);
    }
  }

  h4 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.05rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 6px;
    transition: color 0.2s ease;
  }

  p {
    font-size: 0.88rem;
    color: #556B64;
    line-height: 1.5;
    margin: 0 0 14px;
    flex: 1;
  }

  .bottom-arrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #2E7D5B;
    transition: transform 0.2s ease;
  }
`;

// ── Section 9: Final Homepage Dark Green CTA ────────────────────────────────
export const FinalCtaSection = styled.section`
  padding: 80px 0;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 56px 0;
  }
`;

export const DarkBannerCard = styled.div`
  background: #174A3A;
  border-radius: 28px;
  padding: 64px 40px;
  color: #FFFFFF;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(23, 74, 58, 0.18);

  @media (max-width: 768px) {
    padding: 48px 24px;
    border-radius: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46, 125, 91, 0.3) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184, 221, 114, 0.15) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    pointer-events: none;
  }

  .content-inner {
    position: relative;
    z-index: 2;
    max-width: 680px;
    margin: 0 auto;
  }

  .cta-badge {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #B8DD72;
    background: rgba(184, 221, 114, 0.15);
    padding: 5px 14px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 18px;
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.5rem;
    font-weight: 600;
    color: #F8F5ED;
    line-height: 1.25;
    margin: 0 0 16px;

    @media (max-width: 640px) {
      font-size: 1.95rem;
    }
  }

  p {
    font-size: 1.08rem;
    color: #C6EAD8;
    line-height: 1.6;
    margin: 0 0 32px;
  }

  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-donate {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #B8DD72;
    color: #12352C;
    border: none;
    border-radius: 999px;
    padding: 13px 26px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: #C8E88E;
      transform: translateY(-2px);
    }
  }

  .btn-need {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.12);
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    padding: 13px 26px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
`;

// ── Guide Detail Modal ──────────────────────────────────────────────────────
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 53, 44, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const GuideModalCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  max-width: 680px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.28);
  border: 1px solid #DDDDD5;

  /* Hide scrollbar while keeping scroll functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
    width: 0;
    height: 0;
  }

  @media (max-width: 640px) {
    padding: 28px 20px;
  }

  .close-modal-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #F8F5ED;
    border: 1px solid #DDDDD5;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #174A3A;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #174A3A;
      color: #FFFFFF;
    }
  }

  .modal-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.09);
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 12px;
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.6rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.3;
    margin: 0 0 16px;
  }

  .guide-modal-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .guide-body {
    p {
      font-size: 0.98rem;
      color: #556B64;
      line-height: 1.65;
      margin-bottom: 20px;
    }

    h4 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: #174A3A;
      margin: 24px 0 12px;
    }

    ol, ul {
      padding-left: 20px;
      margin-bottom: 24px;

      li {
        font-size: 0.95rem;
        color: #354E46;
        line-height: 1.6;
        margin-bottom: 10px;
      }
    }

    .callout-box {
      background: #F8F5ED;
      border-left: 4px solid #2E7D5B;
      padding: 16px 20px;
      border-radius: 0 10px 10px 0;
      font-size: 0.92rem;
      color: #174A3A;
      line-height: 1.55;
      margin-top: 20px;

      strong {
        color: #174A3A;
      }
    }
  }
`;

