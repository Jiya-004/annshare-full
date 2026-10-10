import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  IoArrowForward,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoFacebook,
  IoCheckmarkCircle,
  IoCopyOutline,
  IoChevronForward,
} from "react-icons/io5";

import {
  getPostBySlug,
  getRelatedPosts,
  getNextAndPrevPosts,
  FEATURED_STORY,
} from "./data/blogData";

import { formatImageUrl } from "./index";
import api from "../../services/api";

import {
  PageWrapper,
  Container,
  ReadingProgressBar,
  BreadcrumbNav,
  BlogDetailSection,
  ArticleSplitGrid,
  MainArticleColumn,
  HeroImageFigure,
  ArticleHeaderBlock,
  AuthorBylineStrip,
  ArticleContentBody,
  ArticleContentList,
  ArticleStepList,
  KeyTakeawayCard,
  QuoteCalloutCard,
  AuthorBioBox,
  PrevNextNavigator,
  PrevNextCard,
  StickyArticleSidebar,
  SidebarSection,
  SocialShareRow,
  CommunityBannerSection,
  CommunityBannerCard,
} from "./style";

// Helper to parse plain text/markdown blog content into structured editorial sections
function parseDynamicBlogContent(rawContent) {
  if (!rawContent) return [];
  const lines = rawContent.split(/\r?\n/);
  const sections = [];
  let currentSec = { id: "section-1", heading: "", paragraphs: [], list: [] };
  let secCount = 1;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ") || trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      if (currentSec.paragraphs.length > 0 || currentSec.list.length > 0 || currentSec.heading) {
        sections.push(currentSec);
      }
      secCount++;
      const headingText = trimmed.replace(/^#+\s*/, "");
      const secId = `sec-${headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-") || secCount}`;
      currentSec = {
        id: secId,
        heading: headingText,
        paragraphs: [],
        list: [],
      };
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      currentSec.list.push(trimmed.replace(/^[-*•]\s*/, ""));
    } else {
      currentSec.paragraphs.push(trimmed);
    }
  }

  if (currentSec.paragraphs.length > 0 || currentSec.list.length > 0 || currentSec.heading) {
    sections.push(currentSec);
  }

  return sections;
}

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const defaultPost = getPostBySlug(slug) || FEATURED_STORY;
  const [post, setPost] = useState(defaultPost);
  const [relatedPosts, setRelatedPosts] = useState(() => getRelatedPosts(defaultPost.slug, 3));
  const { prevPost, nextPost } = getNextAndPrevPosts(post.slug);

  const [activeTocId, setActiveTocId] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Fetch live blog post from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      try {
        const liveBlog = await api.blogs.getBySlug(slug);
        if (isMounted && liveBlog) {
          const parsedSections =
            liveBlog.sections && liveBlog.sections.length > 0
              ? liveBlog.sections
              : parseDynamicBlogContent(liveBlog.content);

          // Build TOC from sections or fallback
          const tocItems =
            liveBlog.toc && liveBlog.toc.length > 0
              ? liveBlog.toc
              : parsedSections.filter((s) => s.heading).map((s) => ({
                  id: s.id,
                  label: s.heading,
                }));

          if (tocItems.length === 0) {
            tocItems.push(
              { id: "article-content", label: "Article Content" },
              { id: "key-takeaways", label: "Key Takeaways" }
            );
          }

          const formatted = {
            id: liveBlog.id || liveBlog._id,
            slug: liveBlog.slug,
            category: liveBlog.category || "Community Impact",
            title: liveBlog.title,
            description: liveBlog.excerpt || liveBlog.content?.slice(0, 180) + "...",
            author: liveBlog.authorName || "ANNShare Team",
            authorRole: liveBlog.authorRole || "Community Lead",
            date: liveBlog.publishedDate || "Recently",
            readTime: liveBlog.readTime || "5 min read",
            image: formatImageUrl(liveBlog.image),
            content: liveBlog.content || "",
            sections: parsedSections.length > 0 ? parsedSections : null,
            pullQuote: liveBlog.pullQuote || null,
            toc: tocItems,
          };
          setPost(formatted);
          setActiveTocId(formatted.toc?.[0]?.id || "article-content");
        }
      } catch (err) {
        // Fallback to static data
        const staticMatch = getPostBySlug(slug);
        if (staticMatch) {
          setPost(staticMatch);
          setActiveTocId(staticMatch.toc?.[0]?.id || "");
        }
      }
    };

    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Scroll to top upon navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Reading progress tracker
  useEffect(() => {
    const handleProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleProgress, { passive: true });
    return () => window.removeEventListener("scroll", handleProgress);
  }, []);

  // Scrollspy logic for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      if (post.toc) {
        for (const item of post.toc) {
          const el = document.getElementById(item.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveTocId(item.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const scrollToHeading = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const authorInitials = post.author
    ? post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)
    : "AS";

  return (
    <PageWrapper>
      {/* Reading Progress Bar */}
      <ReadingProgressBar $progress={readingProgress} />

      {/* Unified Article Reading Layout */}
      <BlogDetailSection>
        <Container>
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <IoChevronForward className="separator" />
            <Link to="/blog">Blogs</Link>
            <IoChevronForward className="separator" />
            <span className="current" title={post.title}>
              {post.title}
            </span>
          </BreadcrumbNav>

          <ArticleSplitGrid>
            {/* LEFT / MAIN READING COLUMN */}
            <MainArticleColumn>
              {/* 1. Article Header First */}
              <ArticleHeaderBlock>
                <div className="header-tag-row">
                  <span className="tag-badge">{post.category}</span>
                  <span className="meta-time">{post.readTime}</span>
                </div>
                <h1>{post.title}</h1>
                <p className="intro-lead">{post.description}</p>
              </ArticleHeaderBlock>

              {/* 2. Author Byline Strip */}
              <AuthorBylineStrip>
                <div className="author-left">
                  <div className="author-avatar">{authorInitials}</div>
                  <div className="author-info">
                    <span className="author-name">{post.author || "ANNShare Editorial Team"}</span>
                    <span className="author-meta">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>Field Dispatch</span>
                    </span>
                  </div>
                </div>

                <div className="share-actions">
                  <SocialShareRow>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <IoLogoTwitter />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <IoLogoLinkedin />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <IoLogoFacebook />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      aria-label="Copy link"
                      title={copiedLink ? "Link copied!" : "Copy link"}
                    >
                      {copiedLink ? (
                        <IoCheckmarkCircle style={{ color: "#10B981" }} />
                      ) : (
                        <IoCopyOutline />
                      )}
                    </button>
                  </SocialShareRow>
                </div>
              </AuthorBylineStrip>

              {/* 3. Hero Photograph */}
              <HeroImageFigure>
                <div className="image-wrap">
                  <img src={post.image} alt={post.title} loading="eager" />
                </div>
                {post.imageCaption && (
                  <figcaption>{post.imageCaption}</figcaption>
                )}
              </HeroImageFigure>

              {/* 4. Article Content Body */}
              <ArticleContentBody id="article-content">
                {/* If post has raw formatted content without sections */}
                {post.content && (!post.sections || post.sections.length === 0) && (
                  <div style={{ whiteSpace: "pre-line", fontSize: "1.05rem", lineHeight: "1.8", color: "#2E3E37", marginBottom: "32px" }}>
                    {post.content}
                  </div>
                )}

                {/* Structured Sections if available */}
                {post.sections?.map((sec, sIdx) => (
                  <section key={sec.id || sIdx} id={sec.id}>
                    {sec.heading && <h2>{sec.heading}</h2>}
                    {sec.content?.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                    {sec.paragraphs?.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}

                    {sec.list && sec.list.length > 0 && (
                      <ArticleContentList>
                        {sec.list.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ArticleContentList>
                    )}

                    {sec.steps && sec.steps.length > 0 && (
                      <ArticleStepList>
                        {sec.steps.map((step, idx) => (
                          <li key={idx}>
                            <strong>{step.title}: </strong>
                            <span>{step.text}</span>
                          </li>
                        ))}
                      </ArticleStepList>
                    )}
                  </section>
                ))}

                {/* Key Takeaways Callout Card */}
                <KeyTakeawayCard id="key-takeaways">
                  <span className="takeaway-title">KEY IMPACT TAKEAWAY</span>
                  <p>
                    Timely surplus food recovery transforms potential landfill emissions into neighborhood dignity. Verified routing guarantees safe transport within the critical 2-hour freshness window.
                  </p>
                </KeyTakeawayCard>

                {/* Quote Callout Card */}
                <QuoteCalloutCard>
                  <p>"{post.pullQuote?.quote || post.pullQuote || "The value of food doesn't end when a restaurant closes."}"</p>
                </QuoteCalloutCard>
              </ArticleContentBody>

              {/* Author Bio Box */}
              <AuthorBioBox>
                <div className="bio-avatar">{authorInitials}</div>
                <div className="bio-content">
                  <span className="bio-eyebrow">WRITTEN BY</span>
                  <h4>{post.author || "Bikash Tamang"}</h4>
                  <p>
                    Covering grassroots community stories, urban food redistribution logistics, and sustainable kitchen practices for the ANNShare community journal.
                  </p>
                </div>
              </AuthorBioBox>

              {/* Previous / Next Article Navigation */}
              <PrevNextNavigator>
                {prevPost ? (
                  <PrevNextCard to={`/blog/${prevPost.slug}`} className="prev">
                    <span className="direction-label">← PREVIOUS STORY</span>
                    <h4>{prevPost.title}</h4>
                  </PrevNextCard>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <PrevNextCard to={`/blog/${nextPost.slug}`} className="next">
                    <span className="direction-label">NEXT STORY →</span>
                    <h4>{nextPost.title}</h4>
                  </PrevNextCard>
                ) : (
                  <div />
                )}
              </PrevNextNavigator>
            </MainArticleColumn>

            {/* RIGHT STICKY SIDEBAR */}
            <StickyArticleSidebar>
              {/* 1. In This Article / Table of Contents */}
              {post.toc && post.toc.length > 0 && (
                <SidebarSection>
                  <span className="sidebar-eyebrow">IN THIS ARTICLE</span>
                  <div className="sidebar-card">
                    <nav aria-label="Table of Contents">
                      <ul className="toc-list">
                        {post.toc.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={activeTocId === item.id ? "active" : ""}
                              onClick={(e) => scrollToHeading(e, item.id)}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </SidebarSection>
              )}

              {/* 2. Key Highlights */}
              <SidebarSection>
                <span className="sidebar-eyebrow">KEY HIGHLIGHTS</span>
                <div className="sidebar-card">
                  <ul className="highlights-list">
                    <li>2-hour strict temperature safety window</li>
                    <li>Insulated, food-grade thermal containers</li>
                    <li>Instant geolocation pairing within 5km</li>
                    <li>Digital QR verification for dignity &amp; safety</li>
                  </ul>
                </div>
              </SidebarSection>

              {/* 3. Recommended Stories */}
              <SidebarSection>
                <span className="sidebar-eyebrow">RECOMMENDED STORIES</span>
                <div className="sidebar-card">
                  <div className="recommended-stories-list">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/blog/${rel.slug}`}
                        className="recommended-item"
                      >
                        <div className="recommended-thumb">
                          <img src={formatImageUrl(rel.image)} alt={rel.title} loading="lazy" />
                        </div>
                        <div className="recommended-info">
                          <h4>{rel.title}</h4>
                          <span className="recommended-meta">
                            {rel.category} · {rel.readTime}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </SidebarSection>
            </StickyArticleSidebar>
          </ArticleSplitGrid>
        </Container>
      </BlogDetailSection>
    </PageWrapper>
  );
}
