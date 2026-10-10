import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  IoArrowForward,
  IoSearchOutline,
  IoCloseCircle,
  IoCalendarOutline,
  IoTimeOutline,
  IoShieldCheckmarkOutline,
  IoHeartOutline,
  IoChevronForward,
} from "react-icons/io5";

import {
  BLOG_CATEGORIES as DEFAULT_CATEGORIES,
  FEATURED_STORY as DEFAULT_FEATURED,
  LATEST_STORIES as DEFAULT_STORIES,
} from "./data/blogData";

import api from "../../services/api";

import {
  PageWrapper,
  Container,
  BreadcrumbSection,
  BreadcrumbNav,
  FeaturedStorySection,
  FeaturedCard,
  FilterSearchToolbar,
  FilterPillsList,
  FilterPillButton,
  SearchBarBox,
  Stories3ColGrid,
  GrocyCard,
  EmptyStateBox,
  TrustFeaturesStrip,
  Features3Grid,
  FeaturePillItem,
  CommunityBannerSection,
  CommunityBannerCard,
} from "./style";

export const formatImageUrl = (url) => {
  if (!url) return "/food.png";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `http://localhost:8000${url}`;
  }
  return url;
};

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState(DEFAULT_STORIES);
  const [featuredStory, setFeaturedStory] = useState(DEFAULT_FEATURED);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  // Fetch live published blogs from backend
  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const liveBlogs = await api.blogs.getAll({ status: "Published" });
        if (isMounted && Array.isArray(liveBlogs) && liveBlogs.length > 0) {
          const formattedList = liveBlogs.map((b) => ({
            id: b.id || b._id,
            slug: b.slug,
            title: b.title,
            description: b.excerpt || b.content?.slice(0, 150) + "...",
            category: b.category || "Community",
            author: b.authorName || "ANNShare Team",
            date: b.publishedDate || "Recently",
            readTime: b.readTime || "5 min read",
            image: formatImageUrl(b.image),
          }));

          // Preserve all previous dummy stories and merge new ones on top
          const existingSlugs = new Set(formattedList.map((item) => item.slug));
          const combinedStories = [
            ...formattedList,
            ...DEFAULT_STORIES.filter((item) => !existingSlugs.has(item.slug)),
          ];
          setStories(combinedStories);

          // If a new post is marked isFeatured, use it; otherwise preserve DEFAULT_FEATURED
          const featured = liveBlogs.find((b) => b.isFeatured);
          if (featured) {
            setFeaturedStory({
              id: featured.id || featured._id,
              slug: featured.slug,
              category: (featured.category || "Community Impact").toUpperCase(),
              title: featured.title,
              description: featured.excerpt || featured.content?.slice(0, 180) + "...",
              author: featured.authorName || "ANNShare Team",
              date: featured.publishedDate || "Recently",
              readTime: featured.readTime || "5 min read",
              image: formatImageUrl(featured.image),
            });
          } else {
            setFeaturedStory(DEFAULT_FEATURED);
          }

          // Combine categories
          const dynamicCats = liveBlogs.map((b) => b.category).filter(Boolean);
          const mergedCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...dynamicCats]));
          setCategories(mergedCategories);
        }
      } catch (err) {
        console.warn("Using default static blogs:", err.message);
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Combined real-time filter: active category + live search query
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesCategory =
        selectedCategory === "All Stories" ||
        story.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.description.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q) ||
        (story.author && story.author.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchQuery]);

  return (
    <PageWrapper>
      {/* ── 1. Compact Breadcrumb Header ───────────────── */}
      <BreadcrumbSection>
        <Container>
          <BreadcrumbNav aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <IoChevronForward className="separator" />
            {selectedCategory && selectedCategory !== "All Stories" ? (
              <>
                <Link
                  to="/blog"
                  onClick={() => setSelectedCategory("All Stories")}
                >
                  Journal & Stories
                </Link>
                <IoChevronForward className="separator" />
                <span className="current">{selectedCategory}</span>
              </>
            ) : (
              <span className="current">Blogs</span>
            )}
          </BreadcrumbNav>
        </Container>
      </BreadcrumbSection>

      {/* ── 2. The Features (Featured Post Split Card) ──────────────────── */}
      {featuredStory && (
        <FeaturedStorySection style={{ padding: "0 0 16px" }}>
          <Container>
            <FeaturedCard>
              {/* Left: Documentary photograph */}
              <div className="featured-img-wrap">
                <Link to={`/blog/${featuredStory.slug}`}>
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    loading="eager"
                  />
                </Link>
              </div>

              {/* Right: Featured story editorial metadata & call to read */}
              <div className="featured-content">
                <span className="featured-tag">
                  FEATURED STORY / {featuredStory.category}
                </span>
                <h2>
                  <Link to={`/blog/${featuredStory.slug}`}>
                    {featuredStory.title}
                  </Link>
                </h2>
                <p>{featuredStory.description}</p>

                <div className="featured-meta">
                  <span className="meta-item">
                    <IoCalendarOutline /> {featuredStory.date}
                  </span>
                  <span className="meta-item">
                    <IoTimeOutline /> {featuredStory.readTime}
                  </span>
                </div>

                <Link
                  to={`/blog/${featuredStory.slug}`}
                  className="btn-read-article"
                >
                  Read Article <IoArrowForward />
                </Link>
              </div>
            </FeaturedCard>
          </Container>
        </FeaturedStorySection>
      )}

      {/* ── 3. Filters & Search Bar Row + Below Cards ───────────────────── */}
      <section style={{ padding: "0 0 72px" }}>
        <Container>
          {/* Row with Category Filters on left and Search Bar on right */}
          <FilterSearchToolbar>
            {/* Left side: Category pill filters */}
            <FilterPillsList>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const label =
                  category === "All Stories" ? "All Posts" : category;
                return (
                  <FilterPillButton
                    key={category}
                    type="button"
                    $isActive={isActive}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span>{label}</span>
                  </FilterPillButton>
                );
              })}
            </FilterPillsList>

            {/* Right side: Search bar */}
            <SearchBarBox>
              <IoSearchOutline className="search-icon" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <IoCloseCircle />
                </button>
              )}
            </SearchBarBox>
          </FilterSearchToolbar>

          {/* ── 4. The 3-Column Cards Grid ─────────────────────────────── */}
          {filteredStories.length === 0 ? (
            <EmptyStateBox>
              <h4>No articles found</h4>
              <p>
                No stories match "{searchQuery}"{" "}
                {selectedCategory !== "All Stories"
                  ? `in ${selectedCategory}`
                  : ""}
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Stories");
                }}
              >
                Reset filters
              </button>
            </EmptyStateBox>
          ) : (
            <Stories3ColGrid>
              {filteredStories.map((story) => (
                <GrocyCard key={story.id}>
                  {/* Card Thumbnail with floating category pill badge */}
                  <div className="card-thumb">
                    <Link to={`/blog/${story.slug}`}>
                      <img src={story.image} alt={story.title} loading="lazy" />
                    </Link>
                    <span className="badge-pill">{story.category}</span>
                  </div>

                  {/* Card Content: Meta date/time, title, description, read more */}
                  <div className="card-content">
                    <div className="card-meta-row">
                      <span>
                        <IoCalendarOutline /> {story.date}
                      </span>
                      <span>
                        <IoTimeOutline /> {story.readTime}
                      </span>
                    </div>

                    <h3>
                      <Link to={`/blog/${story.slug}`}>{story.title}</Link>
                    </h3>

                    <p>{story.description}</p>

                    <Link to={`/blog/${story.slug}`} className="read-more-btn">
                      Read More <IoArrowForward />
                    </Link>
                  </div>
                </GrocyCard>
              ))}
            </Stories3ColGrid>
          )}

          {/* Features/Trust strip at bottom */}
          <TrustFeaturesStrip>
            <Features3Grid>
              <FeaturePillItem>
                <div className="feature-icon-circle">
                  <IoTimeOutline />
                </div>
                <div className="feature-text">
                  <h4>2-Hour Redistribution Window</h4>
                  <p>
                    Safe thermal window guarantees hot & chilled meal freshness
                  </p>
                </div>
              </FeaturePillItem>

              <FeaturePillItem>
                <div className="feature-icon-circle">
                  <IoShieldCheckmarkOutline />
                </div>
                <div className="feature-text">
                  <h4>Verified Hygiene & Food Safety</h4>
                  <p>
                    Strict quality protocol for all participating commercial
                    kitchens
                  </p>
                </div>
              </FeaturePillItem>

              <FeaturePillItem>
                <div className="feature-icon-circle">
                  <IoHeartOutline />
                </div>
                <div className="feature-text">
                  <h4>Zero-Waste Community Promise</h4>
                  <p>
                    25,000+ meals shared with complete transparency and dignity
                  </p>
                </div>
              </FeaturePillItem>
            </Features3Grid>
          </TrustFeaturesStrip>
        </Container>
      </section>
    </PageWrapper>
  );
}
