import styled from "styled-components";
import { Link } from "react-router-dom";

// ── Global Canvas & Container ───────────────────────────────────────────────
export const PageWrapper = styled.div`
  background-color: #FAF7F0;
  color: #1E342E;
  font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  min-height: 100vh;
  overflow-x: clip;
`;

export const Container = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || "1280px"};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 32px;

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

// ── Reading Progress Bar (Fixed at top of screen for reading pages) ─────────
export const ReadingProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #28624D 0%, #173F34 100%);
  width: ${({ $progress }) => `${$progress || 0}%`};
  z-index: 9999;
  transition: width 0.08s ease-out;
  pointer-events: none;
`;

// ── Eyebrow Label (Small Uppercase, Muted Green) ─────────────────────────────
export const EyebrowLabel = styled.span`
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #28624D;
  display: inline-block;
  margin-bottom: 12px;
`;

// ── 0. Editorial Masthead & Breadcrumb Header ───────────────────────────────
export const BlogMasthead = styled.header`
  padding: 110px 0 28px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 95px 0 20px;
  }

  .masthead-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #DDDDD5;

    @media (max-width: 860px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }
  }

  .masthead-copy {
    max-width: 680px;

    .eyebrow {
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #28624D;
      display: inline-block;
      margin-bottom: 8px;
    }

    h1 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: clamp(2rem, 3.2vw, 2.75rem);
      font-weight: 600;
      color: #173F34;
      line-height: 1.2;
      letter-spacing: -0.025em;
      margin: 0 0 10px;
    }

    p {
      font-size: 1.05rem;
      color: #556B64;
      line-height: 1.55;
      margin: 0;
    }
  }

  .masthead-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 999px;
    background: #ECE9E0;
    border: 1px solid #DDDDD5;
    font-size: 0.82rem;
    font-weight: 600;
    color: #173F34;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

export const BreadcrumbSection = styled.div`
  padding: 112px 0 16px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 96px 0 12px;
  }

  nav {
    margin-bottom: 0;
  }
`;

export const CompactBreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;

  a {
    color: #69736E;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #173F34;
      text-decoration: underline;
    }
  }

  .separator {
    color: #A5AEA9;
    font-size: 0.82rem;
    user-select: none;
  }

  .current {
    color: #173F34;
    font-weight: 600;
  }
`;

// ── 1. Blog Hero Section (Legacy Reference) ─────────────────────────────────
export const BlogHeroSection = styled.header`
  padding: 130px 0 64px;
  border-bottom: 1px solid #DDDDD5;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 100px 0 40px;
  }
`;

export const HeroTextWrap = styled.div`
  max-width: 680px;

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.25rem;
    font-weight: 600;
    color: #173F34;
    letter-spacing: -0.025em;
    line-height: 1.2;
    margin: 0 0 12px;

    @media (max-width: 768px) {
      font-size: 1.85rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.5;
    margin: 0;
    max-width: 580px;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

// ── 2. Featured Story (Editorial Two-Column Magazine Feature) ───────────────
export const FeaturedStorySection = styled.section`
  padding: 12px 0 64px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 8px 0 44px;
  }
`;

export const FeaturedSplitGrid = styled.article`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const FeaturedImageWrap = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #DDDDD5;
  position: relative;
  background: #ECE9E0;

  @media (max-width: 768px) {
    height: 260px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  /* Subtle overlay gradient at bottom-left corner for caption/text legibility */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top right,
      rgba(23, 63, 52, 0.38) 0%,
      rgba(23, 63, 52, 0.12) 30%,
      transparent 60%
    );
    pointer-events: none;
    border-radius: inherit;
  }

  &:hover img {
    transform: scale(1.02);
  }
`;

export const FeaturedContentSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .featured-category {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #28624D;
    margin-bottom: 12px;
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.85rem, 2.6vw, 2.35rem);
    font-weight: 600;
    color: #173F34;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin: 0 0 14px;
    transition: color 0.2s ease;

    @media (max-width: 768px) {
      font-size: 1.45rem;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #28624D;
      }
    }
  }

  p {
    font-size: 1.02rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0 0 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }

  .meta-row {
    font-size: 0.88rem;
    color: #69736E;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .read-story-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #173F34;
    text-decoration: none;
    transition: all 0.2s ease;
    width: fit-content;

    &:hover {
      color: #28624D;
      text-decoration: underline;
      text-underline-offset: 4px;
      gap: 12px;
    }
  }
`;

// ── 3. Browse Topics (Editorial Horizontal Text Navigation) ─────────────────
export const TopicsNavSection = styled.div`
  padding: 18px 0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;
  background-color: rgba(250, 247, 240, 0.95);
  position: sticky;
  top: 70px;
  z-index: 15;
  backdrop-filter: blur(10px);
`;

export const TopicsNavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .topics-label {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #69736E;
    flex-shrink: 0;
    margin-right: 8px;
  }
`;

export const TopicNavLink = styled.button`
  background: transparent;
  border: none;
  padding: 6px 0;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  color: ${({ $isActive }) => ($isActive ? "#173F34" : "#556B64")};
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #173F34;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #173F34;
    border-radius: 2px;
    opacity: ${({ $isActive }) => ($isActive ? "1" : "0")};
    transform: ${({ $isActive }) => ($isActive ? "scaleX(1)" : "scaleX(0)")};
    transition: all 0.2s ease;
  }
`;

// ── 4. Latest Stories (Clean 3-Column Editorial Grid) ───────────────────────
export const LatestStoriesSection = styled.section`
  padding: 68px 0 84px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 48px 0 60px;
  }
`;

export const SectionTitleBlock = styled.div`
  text-align: center;
  margin-bottom: 44px;

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(2rem, 3.2vw, 2.5rem);
    font-weight: 600;
    color: #111827;
    letter-spacing: -0.025em;
    line-height: 1.25;
    margin: 0 0 12px;
  }

  p {
    font-size: 1.02rem;
    color: #64748B;
    line-height: 1.6;
    max-width: 660px;
    margin: 0 auto;
  }
`;

export const LatestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ArticleCard = styled.article`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border: 1px solid #EAEAE6;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.035);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border-color: #D1D5DB;

    .card-img-wrap img {
      transform: scale(1.03);
    }

    h3 a {
      color: #173F34;
    }
  }

  .card-img-wrap {
    width: 100%;
    aspect-ratio: 16 / 10.5;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background: #F1EFEA;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 14px;
  }

  h3 {
    font-family: inherit;
    font-size: 0.98rem;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.4;
    margin: 0 0 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 42px;

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;
    }
  }

  .meta-footer {
    font-size: 0.8rem;
    color: #94A3B8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;

    .author-name {
      font-weight: 400;
      color: #94A3B8;
    }

    .date-text {
      color: #94A3B8;
      font-weight: 400;
    }
  }
`;

export const StoryCard = ArticleCard;

export const StoryImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10.5;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background: #F1EFEA;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
`;

export const PaginationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;

  .page-btn {
    min-width: 38px;
    height: 38px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid #E2E8F0;
    background: #FFFFFF;
    color: #64748B;
    font-family: inherit;
    font-size: 0.88rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      border-color: #173F34;
      color: #173F34;
    }

    &.active {
      border-color: #173F34;
      color: #173F34;
      font-weight: 600;
      box-shadow: 0 0 0 1px #173F34;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .page-dots {
    color: #94A3B8;
    font-size: 0.88rem;
    padding: 0 4px;
    user-select: none;
  }
`;

// ── GrocyHub-Matched Editorial Components with ANNShare Homepage Colors ───
export const FeaturedCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(23, 74, 58, 0.04);
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 36px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 16px;
    gap: 16px;
  }

  .featured-img-wrap {
    width: 100%;
    height: 350px;
    border-radius: 14px;
    overflow: hidden;
    background: #FAF7F0;
    border: 1px solid #E8E5DC;
    position: relative;

    @media (max-width: 768px) {
      height: 240px;
    }

    @media (max-width: 480px) {
      height: 200px;
      border-radius: 12px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.025);
    }
  }

  .featured-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .featured-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(46, 125, 91, 0.1);
      border: 1px solid rgba(46, 125, 91, 0.2);
      color: #2E7D5B;
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
      width: fit-content;

      @media (max-width: 480px) {
        font-size: 0.68rem;
        padding: 4px 10px;
        margin-bottom: 10px;
      }
    }

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: clamp(1.3rem, 2.2vw, 1.95rem);
      font-weight: 600;
      color: #174A3A;
      line-height: 1.25;
      margin: 0 0 14px;

      @media (max-width: 480px) {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      a {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: #2E7D5B;
        }
      }
    }

    p {
      font-size: 0.98rem;
      color: #556B64;
      line-height: 1.6;
      margin: 0 0 20px;

      @media (max-width: 768px) {
        font-size: 0.92rem;
        margin-bottom: 14px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .featured-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 0.84rem;
      color: #69736E;
      margin-bottom: 24px;
      flex-wrap: wrap;

      @media (max-width: 480px) {
        gap: 12px;
        font-size: 0.78rem;
        margin-bottom: 18px;
      }

      .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    }

    .btn-read-article {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #174A3A;
      font-size: 0.96rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      width: fit-content;

      @media (max-width: 480px) {
        font-size: 0.9rem;
      }

      &:hover {
        color: #2E7D5B;
        gap: 12px;
      }
    }
  }
`;

export const FilterSearchToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 40px 0 32px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    margin: 28px 0 24px;
  }
`;

export const FilterPillsList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 2px 2px 8px;
    margin: 0 -2px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const FilterPillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  background: ${({ $isActive }) => ($isActive ? "#174A3A" : "#FFFFFF")};
  color: ${({ $isActive }) => ($isActive ? "#F8F5ED" : "#174A3A")};
  border: 1px solid ${({ $isActive }) => ($isActive ? "#174A3A" : "#DDDDD5")};
  cursor: pointer;
  box-shadow: ${({ $isActive }) => ($isActive ? "0 4px 12px rgba(23, 74, 58, 0.2)" : "none")};
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding: 7px 14px;
    font-size: 0.82rem;
  }

  &:hover {
    border-color: #174A3A;
    background: ${({ $isActive }) => ($isActive ? "#174A3A" : "rgba(23, 74, 58, 0.04)")};
    color: ${({ $isActive }) => ($isActive ? "#F8F5ED" : "#174A3A")};
  }
`;

export const SearchBarBox = styled.div`
  position: relative;
  width: 290px;

  @media (max-width: 900px) {
    width: 100%;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #69736E;
    font-size: 1.15rem;
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 44px;
    padding: 0 38px 0 42px;
    border-radius: 999px;
    border: 1px solid #DDDDD5;
    background: #FFFFFF;
    color: #174A3A;
    font-family: inherit;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #174A3A;
      box-shadow: 0 0 0 3px rgba(23, 74, 58, 0.12);
    }

    &::placeholder {
      color: #8C9994;
    }
  }

  .clear-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    color: #8C9994;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #174A3A;
    }
  }
`;

export const Stories3ColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const GrocyCard = styled.article`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border: 1px solid #DDDDD5;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(23, 74, 58, 0.035);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  @media (max-width: 480px) {
    border-radius: 14px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(23, 74, 58, 0.08);
    border-color: #174A3A;

    .card-thumb img {
      transform: scale(1.04);
    }

    h3 a {
      color: #2E7D5B;
    }
  }

  .card-thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #FAF7F0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }

    .badge-pill {
      position: absolute;
      top: 14px;
      left: 14px;
      z-index: 2;
      background: #174A3A;
      color: #F8F5ED;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      @media (max-width: 480px) {
        top: 10px;
        left: 10px;
        font-size: 0.68rem;
        padding: 3px 10px;
      }
    }
  }

  .card-content {
    padding: 20px 22px 22px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media (max-width: 480px) {
      padding: 16px;
    }

    .card-meta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 0.82rem;
      color: #69736E;
      margin-bottom: 10px;
      flex-wrap: wrap;

      @media (max-width: 480px) {
        gap: 10px;
        font-size: 0.76rem;
      }

      span {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
    }

    h3 {
      font-family: inherit;
      font-size: 1.08rem;
      font-weight: 600;
      color: #174A3A;
      line-height: 1.38;
      margin: 0 0 10px;
      min-height: 44px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @media (max-width: 640px) {
        min-height: auto;
        font-size: 1.02rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;
      }
    }

    p {
      font-size: 0.9rem;
      color: #556B64;
      line-height: 1.55;
      margin: 0 0 18px;
      min-height: 40px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      @media (max-width: 640px) {
        min-height: auto;
        font-size: 0.86rem;
        margin-bottom: 14px;
      }
    }

    .read-more-btn {
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #174A3A;
      text-decoration: none;
      transition: all 0.2s ease;

      &:hover {
        color: #2E7D5B;
        gap: 10px;
      }
    }
  }
`;

export const EmptyStateBox = styled.div`
  text-align: center;
  padding: 64px 20px;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #DDDDD5;
  margin: 20px 0;

  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 8px;
  }

  p {
    font-size: 0.96rem;
    color: #556B64;
    margin: 0 0 20px;
  }

  button {
    background: #174A3A;
    color: #F8F5ED;
    border: none;
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #2E7D5B;
    }
  }
`;

export const TrustFeaturesStrip = styled.section`
  margin-top: 56px;
  padding: 32px 36px;
  border: 1px solid #DDDDD5;
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(23, 74, 58, 0.03);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 24px 20px;
    margin-top: 40px;
  }

  @media (max-width: 480px) {
    padding: 18px 16px;
    border-radius: 14px;
    margin-top: 32px;
  }
`;

export const Features3Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FeaturePillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }

  .feature-icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(46, 125, 91, 0.1);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;

    @media (max-width: 480px) {
      width: 42px;
      height: 42px;
      font-size: 1.25rem;
    }
  }

  .feature-text {
    h4 {
      font-size: 0.98rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 3px;

      @media (max-width: 480px) {
        font-size: 0.92rem;
      }
    }

    p {
      font-size: 0.84rem;
      color: #556B64;
      margin: 0;
      line-height: 1.4;

      @media (max-width: 480px) {
        font-size: 0.8rem;
      }
    }
  }
`;

// ── 5. Impact Story Section (Soft Beige with Visual Collage) ────────────────
export const ImpactStorySection = styled.section`
  padding: 84px 0 92px;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;

  @media (max-width: 768px) {
    padding: 56px 0 64px;
  }
`;

export const ImpactSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 52px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const ImpactTextSide = styled.div`
  max-width: 520px;

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.6rem, 2.4vw, 2rem);
    font-weight: 600;
    color: #173F34;
    letter-spacing: -0.02em;
    line-height: 1.28;
    margin: 0 0 14px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
    }
  }

  p {
    font-size: 1.02rem;
    color: #556B64;
    line-height: 1.65;
    margin: 0 0 28px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .btn-impact-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 26px;
    border-radius: 999px;
    background: #173F34;
    color: #FAF7F0;
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid #173F34;
    transition: all 0.25s ease;

    &:hover {
      background: #28624D;
      border-color: #28624D;
      gap: 12px;
    }
  }
`;

export const ImpactCollageWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .collage-item-main {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    height: 340px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #DDDDD5;

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
  }

  .collage-item-sub {
    height: 162px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #DDDDD5;

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
  }
`;

// ── 6. More Stories (Horizontal Article Rows with Thin Dividers) ────────────
export const MoreStoriesSection = styled.section`
  padding: 76px 0 84px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 50px 0 58px;
  }
`;

export const ArticleRowsList = styled.div`
  max-width: 840px;
  margin: 0 auto;
  border-top: 1px solid #DDDDD5;
`;

export const ArticleRowItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 14px;
  border-bottom: 1px solid #DDDDD5;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border-radius: 8px;

  @media (max-width: 640px) {
    padding: 16px 8px;
  }

  &:hover {
    background-color: rgba(40, 98, 77, 0.04);

    .row-bottom h4 {
      color: #28624D;
    }

    .row-bottom .row-arrow {
      transform: translateX(4px);
      color: #28624D;
    }
  }

  .row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .row-cat {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #28624D;
    }

    .row-read-time {
      font-size: 0.82rem;
      color: #69736E;
      font-weight: 500;
    }
  }

  .row-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    h4 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.15rem;
      font-weight: 600;
      color: #173F34;
      margin: 0;
      line-height: 1.35;
      transition: color 0.2s ease;

      @media (max-width: 640px) {
        font-size: 1.02rem;
      }
    }

    .row-arrow {
      font-size: 1.2rem;
      color: #173F34;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
  }
`;

// ── 7. Suggest Topic / Share Story Prompt Card (Replaces duplicate newsletter) ─
export const SuggestTopicSection = styled.section`
  padding: 32px 0 88px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 20px 0 60px;
  }
`;

export const SuggestTopicCard = styled.div`
  max-width: 840px;
  margin: 0 auto;
  background: #ECE9E0;
  border: 1px solid #DDDDD5;
  border-radius: 16px;
  padding: 32px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  box-shadow: 0 2px 10px rgba(23, 63, 52, 0.03);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
    gap: 20px;
  }

  .text-side {
    flex: 1;

    .prompt-badge {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #28624D;
      display: inline-block;
      margin-bottom: 6px;
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.22rem;
      font-weight: 600;
      color: #173F34;
      margin: 0 0 6px;
      line-height: 1.35;
    }

    p {
      font-size: 0.95rem;
      color: #556B64;
      line-height: 1.5;
      margin: 0;
    }
  }

  .cta-side {
    flex-shrink: 0;

    .btn-share-story {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 22px;
      border-radius: 999px;
      background: #173F34;
      color: #FAF7F0;
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      border: 1px solid #173F34;
      transition: all 0.25s ease;

      &:hover {
        background: #28624D;
        border-color: #28624D;
        gap: 12px;
      }
    }
  }
`;

// ── 8. Newsletter Section (Retained for Blog Details and backward compatibility) ──
export const NewsletterSection = styled.section`
  padding: 68px 0 76px;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  text-align: center;

  @media (max-width: 768px) {
    padding: 50px 0 56px;
  }
`;

export const NewsletterBox = styled.div`
  max-width: 560px;
  margin: 0 auto;

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.45rem;
    font-weight: 600;
    color: #173F34;
    letter-spacing: -0.015em;
    margin: 0 0 10px;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0 0 26px;
  }
`;

export const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;

  @media (max-width: 540px) {
    flex-direction: column;
    width: 100%;
  }

  input {
    flex: 1;
    border: 1px solid #DDDDD5;
    background: #FFFFFF;
    border-radius: 999px;
    padding: 12px 20px;
    font-family: inherit;
    font-size: 0.94rem;
    color: #1E342E;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #28624D;
    }

    &::placeholder {
      color: #8C9993;
    }

    @media (max-width: 540px) {
      width: 100%;
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #173F34;
    color: #FAF7F0;
    border: 1px solid #173F34;
    border-radius: 999px;
    padding: 12px 24px;
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.25s ease;

    &:hover {
      background: #28624D;
      border-color: #28624D;
      gap: 10px;
    }

    @media (max-width: 540px) {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const SubscribedSuccessAlert = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #173F34;
  background: rgba(184, 221, 114, 0.35);
  border: 1px solid rgba(40, 98, 77, 0.2);
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
`;

// ═════════════════════════════════════════════════════════════════════════════
// ── BLOG DETAILS SPECIFIC STYLES ────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

export const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 8px;
  font-size: 0.86rem;
  color: #69736E;
  margin-bottom: 28px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 6px;
  }

  a {
    color: #556B64;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s ease;

    &:hover {
      color: #173F34;
      text-decoration: underline;
    }
  }

  .separator {
    font-size: 0.72rem;
    color: #9AA39F;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  .category-link {
    color: #28624D;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .current {
    color: #173F34;
    font-weight: 600;
    max-width: 420px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      max-width: 240px;
    }

    @media (max-width: 480px) {
      max-width: 140px;
    }
  }
`;

export const BlogDetailSection = styled.article`
  padding-top: 110px;
  padding-bottom: 72px;
  background-color: #FAF7F0;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (max-width: 768px) {
    padding-top: 96px;
    padding-bottom: 48px;
  }

  @media (max-width: 480px) {
    padding-top: 88px;
    padding-bottom: 36px;
  }
`;

export const ArticleSplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 52px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 300px;
    gap: 32px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const MainArticleColumn = styled.main`
  width: 100%;
  color: #1E342E;
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 820px;
`;

export const ArticleHeaderBlock = styled.div`
  margin-bottom: 24px;

  .header-tag-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    flex-wrap: wrap;

    .tag-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(40, 98, 77, 0.12);
      color: #173F34;
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .meta-time {
      font-size: 0.84rem;
      color: #69736E;
    }
  }

  h1 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.45rem, 2.2vw, 1.85rem);
    font-weight: 600;
    color: #174A3A;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin: 0 0 16px;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  .intro-lead {
    font-size: 1.15rem;
    color: #496057;
    line-height: 1.68;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.02rem;
    }
  }
`;

export const AuthorBylineStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid #E5E2D8;
  border-bottom: 1px solid #E5E2D8;
  margin-bottom: 28px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .author-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .author-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #173F34;
      color: #FAF7F0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.92rem;
      border: 2px solid #FAF7F0;
      box-shadow: 0 2px 6px rgba(23, 63, 52, 0.12);
      flex-shrink: 0;
    }

    .author-info {
      display: flex;
      flex-direction: column;

      .author-name {
        font-size: 0.95rem;
        font-weight: 600;
        color: #173F34;
      }

      .author-meta {
        font-size: 0.82rem;
        color: #69736E;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .share-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const HeroImageFigure = styled.figure`
  margin: 0 0 36px;
  width: 100%;

  @media (max-width: 480px) {
    margin: 0 0 24px;
  }

  .image-wrap {
    width: 100%;
    height: 460px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #DDDDD5;
    background: #ECE9E0;
    position: relative;

    @media (max-width: 992px) {
      height: 360px;
    }

    @media (max-width: 768px) {
      height: 270px;
    }

    @media (max-width: 480px) {
      height: 200px;
      border-radius: 12px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  figcaption {
    font-size: 0.84rem;
    color: #69736E;
    margin-top: 10px;
    padding: 0 4px;
    line-height: 1.5;
    font-style: italic;
  }
`;

// Retain legacy export for backward compatibility
export const ArticleTopImageWrap = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #DDDDD5;
  background: #ECE9E0;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 440px;
    object-fit: cover;
    display: block;

    @media (max-width: 768px) {
      height: 260px;
    }
  }

  .image-caption {
    font-size: 0.82rem;
    color: #69736E;
    padding: 10px 16px;
    background: #FAF7F0;
    border-top: 1px solid #DDDDD5;
    font-style: italic;
  }
`;

export const ArticleMetaStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  color: #69736E;
  margin-bottom: 16px;
  flex-wrap: wrap;

  .meta-category {
    color: #28624D;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  strong {
    color: #1E342E;
    font-weight: 600;
  }

  .meta-dot {
    color: #9AA39F;
  }
`;

export const ArticleContentBody = styled.div`
  font-size: 1.08rem;
  line-height: 1.82;
  color: #2F423B;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.35rem;
    font-weight: 600;
    color: #173F34;
    letter-spacing: -0.015em;
    line-height: 1.35;
    margin: 40px 0 16px;
    scroll-margin-top: 110px;

    &:first-of-type {
      margin-top: 0;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin: 32px 0 14px;
    }

    @media (max-width: 480px) {
      font-size: 1.12rem;
      margin: 26px 0 12px;
    }
  }

  p {
    margin: 0 0 20px;
    color: #2F423B;
    word-break: break-word;

    @media (max-width: 480px) {
      margin: 0 0 16px;
    }
  }

  blockquote {
    margin: 32px 0;
    padding: 20px 24px;
    border-left: 3px solid #28624D;
    background: #ECE9E0;
    border-radius: 0 10px 10px 0;
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.22rem;
    font-weight: 500;
    color: #173F34;
    line-height: 1.45;

    @media (max-width: 768px) {
      font-size: 1.08rem;
      padding: 16px 18px;
      margin: 24px 0;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      padding: 14px 16px;
    }
  }
`;

export const KeyTakeawayCard = styled.div`
  background: #ECE9E0;
  border: 1px solid #DDDDD5;
  border-left: 4px solid #173F34;
  border-radius: 0 12px 12px 0;
  padding: 20px 24px;
  margin: 28px 0;

  @media (max-width: 480px) {
    padding: 16px 18px;
    margin: 22px 0;
  }

  .takeaway-title {
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #173F34;
    display: block;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.98rem;
    color: #2F423B;
    line-height: 1.6;
    margin: 0;
  }
`;

export const ArticleContentList = styled.ul`
  padding-left: 22px;
  margin: 16px 0 24px;
  list-style-type: disc;

  li {
    font-size: 1.02rem;
    color: #2F423B;
    line-height: 1.7;
    margin-bottom: 10px;

    &::marker {
      color: #28624D;
    }
  }
`;

export const ArticleStepList = styled.ol`
  padding-left: 22px;
  margin: 16px 0 24px;

  li {
    font-size: 1.02rem;
    color: #2F423B;
    line-height: 1.7;
    margin-bottom: 12px;

    &::marker {
      color: #173F34;
      font-weight: 600;
    }

    strong {
      color: #173F34;
    }
  }
`;

export const StickyArticleSidebar = styled.aside`
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;

  @media (max-width: 992px) {
    position: static;
    border-top: 1px solid #DDDDD5;
    padding-top: 32px;
  }
`;

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;

  .sidebar-eyebrow {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748B;
    margin-bottom: 12px;
    display: block;
  }

  .sidebar-card {
    background: #FFFFFF;
    border: 1px solid #EAEAEA;
    border-radius: 18px;
    padding: 22px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  }

  /* Table of contents inside card */
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      margin: 0;
    }

    li a {
      font-size: 0.92rem;
      color: #556B64;
      text-decoration: none;
      transition: all 0.2s ease;
      display: block;
      padding: 4px 0 4px 14px;
      border-left: 2.5px solid transparent;
      line-height: 1.4;

      &:hover {
        color: #174A3A;
      }

      &.active {
        color: #174A3A;
        font-weight: 700;
        font-size: 0.94rem;
        border-left-color: #174A3A;
      }
    }
  }

  /* Key Highlights bullet list */
  .highlights-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;

    li {
      font-size: 0.9rem;
      color: #475569;
      line-height: 1.45;
      padding-left: 20px;
      position: relative;

      &::before {
        content: "•";
        color: #2E7D5B;
        font-size: 1.4rem;
        font-weight: 800;
        line-height: 1;
        position: absolute;
        left: 0;
        top: -1px;
      }
    }
  }

  /* Recommended Stories list */
  .recommended-stories-list {
    display: flex;
    flex-direction: column;
    gap: 18px;

    .recommended-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      text-decoration: none;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateX(3px);

        .recommended-thumb img {
          transform: scale(1.06);
        }

        .recommended-info h4 {
          color: #2E7D5B;
        }
      }

      .recommended-thumb {
        width: 68px;
        height: 68px;
        border-radius: 12px;
        overflow: hidden;
        flex-shrink: 0;
        background: #FAF7F0;
        border: 1px solid #EAEAEA;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
      }

      .recommended-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;

        h4 {
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 700;
          color: #174A3A;
          line-height: 1.35;
          margin: 0 0 6px;
          transition: color 0.2s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .recommended-meta {
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
        }
      }
    }
  }
`;

export const QuoteCalloutCard = styled.div`
  background: #EFECE6;
  border-left: 3.5px solid #174A3A;
  border-radius: 0 14px 14px 0;
  padding: 22px 26px;
  margin: 28px 0 32px;

  p, blockquote {
    font-family: inherit;
    font-size: 1.05rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.5;
    margin: 0;
    font-style: normal;
  }
`;

export const AuthorBioBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 18px;
  padding: 24px 28px;
  margin: 32px 0 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 14px;
  }

  .bio-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #173F34;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .bio-content {
    flex: 1;

    .bio-eyebrow {
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #174A3A;
      display: block;
      margin-bottom: 4px;
    }

    h4 {
      font-family: inherit;
      font-size: 1.15rem;
      font-weight: 700;
      color: #174A3A;
      margin: 0 0 6px;
    }

    p {
      font-size: 0.88rem;
      color: #64748B;
      line-height: 1.55;
      margin: 0;
    }
  }
`;

export const PrevNextNavigator = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 32px;
  padding-top: 28px;
  border-top: 1px solid #EAEAEA;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const PrevNextCard = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 18px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  &.next {
    text-align: right;
    align-items: flex-end;
  }

  &.prev {
    text-align: left;
    align-items: flex-start;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(23, 74, 58, 0.07);
    border-color: #174A3A;

    h4 {
      color: #2E7D5B;
    }
  }

  .direction-label {
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #174A3A;
    margin-bottom: 8px;
    display: inline-block;
  }

  h4 {
    font-family: inherit;
    font-size: 1rem;
    font-weight: 700;
    color: #174A3A;
    line-height: 1.4;
    margin: 0;
    transition: color 0.2s ease;
  }
`;

export const SocialShareRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 8px;
  }

  button,
  a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 1px solid #DDDDD5;
    color: #173F34;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;

    @media (max-width: 480px) {
      width: 38px;
      height: 38px;
      font-size: 1.05rem;
    }

    &:hover {
      background: #173F34;
      color: #FAF7F0;
      border-color: #173F34;
    }
  }
`;

// ── Full-Width Image Break ───────────────────────────────────────────────────
export const ImageBreakSection = styled.div`
  max-width: 960px;
  margin: 48px auto;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #DDDDD5;

  img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    display: block;

    @media (max-width: 768px) {
      height: 260px;
    }
  }

  .caption {
    font-size: 0.82rem;
    color: #69736E;
    padding: 10px 16px;
    background: #ECE9E0;
    font-style: italic;
  }
`;

// ── Pull Quote / Editorial Highlight Section ────────────────────────────────
export const PullQuoteSection = styled.section`
  padding: 64px 0;
  background-color: #ECE9E0;
  border-top: 1px solid #DDDDD5;
  border-bottom: 1px solid #DDDDD5;
  text-align: center;

  @media (max-width: 768px) {
    padding: 44px 0;
  }
`;

export const PullQuoteWrap = styled.div`
  max-width: 740px;
  margin: 0 auto;

  blockquote {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.35rem;
    font-weight: 500;
    color: #173F34;
    line-height: 1.4;
    letter-spacing: -0.015em;
    margin: 0 0 14px;

    @media (max-width: 768px) {
      font-size: 1.15rem;
    }

    @media (max-width: 480px) {
      font-size: 1.05rem;
    }
  }

  cite {
    font-size: 0.92rem;
    color: #556B64;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    @media (max-width: 480px) {
      font-size: 0.82rem;
    }
  }
`;

// ── Related Stories Section ─────────────────────────────────────────────────
export const RelatedStoriesSection = styled.section`
  padding: 80px 0 88px;
  background-color: #FAF7F0;

  @media (max-width: 768px) {
    padding: 56px 0 60px;
  }
`;

// ── Global Community CTA Banner ─────────────────────────────────────────────
export const CommunityBannerSection = styled.section`
  padding: 40px 0 80px;

  @media (max-width: 768px) {
    padding: 30px 0 60px;
  }
`;

export const CommunityBannerCard = styled.div`
  background: #173F35;
  border-radius: 28px;
  padding: 60px 32px 48px;
  text-align: center;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(23, 63, 53, 0.16);

  @media (max-width: 768px) {
    padding: 40px 20px 36px;
    border-radius: 20px;
  }

  .pill-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.12);
    color: #A8D5C2;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: clamp(1.8rem, 3.4vw, 2.6rem);
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
  }

  p.subtitle {
    font-size: clamp(0.95rem, 1.2vw, 1.08rem);
    color: #D3E5DE;
    max-width: 620px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }

  .btn-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 36px;

    .btn-white {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      color: #173F35;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 14px 28px;
      border-radius: 30px;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #EAF4EE;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
    }

    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 14px 28px;
      border-radius: 30px;
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.16);
        border-color: #FFFFFF;
        transform: translateY(-2px);
      }
    }
  }

  .metrics-strip {
    font-size: 0.85rem;
    color: #B5D4C7;
    letter-spacing: 0.02em;
    font-weight: 500;
  }
`;

