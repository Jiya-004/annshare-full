import React, { useState } from "react";
import styled from "styled-components";
import {
  IoHeartOutline,
  IoHeart,
  IoShieldCheckmark,
  IoTimeOutline,
  IoStar,
  IoChevronBack,
  IoChevronForward,
  IoLocationOutline,
  IoRestaurantOutline,
  IoFlameOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext";

const CardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 12px;
  border: 1px solid rgba(23, 74, 58, 0.09);
  box-shadow: 0 4px 16px rgba(23, 74, 58, 0.04);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(23, 74, 58, 0.12);
    border-color: rgba(46, 125, 91, 0.35);

    .carousel-nav-btn {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }

  /* MEDIA CAROUSEL BOX */
  .media-box {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    max-height: 210px;
    border-radius: 14px;
    overflow: hidden;
    background: #F4F1EA;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover img {
      transform: scale(1.05);
    }

    /* PREV / NEXT ARROWS */
    .carousel-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) scale(0.88);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #174A3A;
      font-size: 0.9rem;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 6;

      &.left {
        left: 8px;
      }

      &.right {
        right: 8px;
      }

      &:hover {
        background: #FFFFFF;
        transform: translateY(-50%) scale(1.08);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
      }
    }

    /* PAGINATION DOTS */
    .dots-strip {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
      z-index: 6;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.65);
        transition: all 0.2s ease;
        cursor: pointer;

        &.active {
          background: #FFFFFF;
          width: 8px;
          height: 8px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
      }
    }

    /* TOP BADGE (Frosted Pill Overlay) */
    .badge-top-left {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 4px 10px;
      border-radius: 999px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.6);
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.73rem;
      font-weight: 600;
      color: #174A3A;
      display: flex;
      align-items: center;
      gap: 5px;
      z-index: 6;

      &.urgent {
        color: #92400E;
        background: rgba(254, 243, 199, 0.94);
        border-color: rgba(251, 191, 36, 0.5);
      }

      svg {
        font-size: 0.85rem;
      }
    }

    /* WISHLIST HEART BUTTON (Frosted Glass Circle) */
    .btn-wishlist {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
      color: ${({ $isSaved }) => ($isSaved ? "#E11D48" : "#374151")};
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 6;

      &:hover {
        transform: scale(1.12);
        background: #FFFFFF;
        color: ${({ $isSaved }) => ($isSaved ? "#E11D48" : "#174A3A")};
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  /* DETAILS CONTENT CONTAINER */
  .details-box {
    padding: 10px 4px 2px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;

    /* ROW 1: TITLE & RATING */
    .row-title-rating {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      min-width: 0;

      .title {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 0.98rem;
        font-weight: 700;
        color: #174A3A;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        min-width: 0;

        @media (max-width: 768px) {
          font-size: 0.92rem;
        }
      }

      .rating-chip {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        background: #FFFBEB;
        border: 1px solid #FDE68A;
        padding: 2px 7px;
        border-radius: 999px;
        font-family: var(--font-sans, 'Inter', sans-serif);
        font-size: 0.78rem;
        font-weight: 700;
        color: #92400E;
        flex-shrink: 0;

        .star-icon {
          color: #F59E0B;
          font-size: 0.82rem;
        }
      }
    }

    /* ROW 2: DONOR & CATEGORY BADGE */
    .row-donor-cat {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      min-width: 0;
      flex-wrap: nowrap;
      overflow: hidden;

      .partner-name {
        font-size: 0.83rem;
        font-weight: 600;
        color: #374151;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-shrink: 1;
        min-width: 0;

        svg {
          color: #2E7D5B;
          font-size: 0.88rem;
          flex-shrink: 0;
        }
      }

      .dot-sep {
        color: #CBD5E1;
        font-size: 0.7rem;
        flex-shrink: 0;
      }

      .category-pill {
        font-size: 0.74rem;
        font-weight: 600;
        color: #2E7D5B;
        background: rgba(46, 125, 91, 0.08);
        padding: 2px 8px;
        border-radius: 6px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .condition-tag {
        font-size: 0.72rem;
        font-weight: 600;
        color: #047857;
        background: #ECFDF5;
        padding: 2px 6px;
        border-radius: 4px;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }

    /* ROW 3: LOCATION & DISTANCE & TIME */
    .row-meta-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      color: #64748B;
      font-weight: 400;
      width: 100%;
      min-width: 0;

      .meta-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;

        svg {
          font-size: 0.85rem;
          color: #2E7D5B;
          flex-shrink: 0;
        }

        &.location {
          font-weight: 500;
          color: #475569;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &.time {
          color: #475569;
          font-weight: 500;
        }
      }

      .dot-sep {
        color: #CBD5E1;
        font-size: 0.7rem;
        flex-shrink: 0;
      }
    }

    /* ROW 4: PORTION QUANTITY & FREE BADGE */
    .row-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px dashed rgba(23, 74, 58, 0.1);
      width: 100%;
      min-width: 0;

      .portion-wrap {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.84rem;
        color: #475569;
        min-width: 0;

        .portion-icon {
          color: #2E7D5B;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .portion-amount {
          font-weight: 700;
          color: #174A3A;
          font-size: 0.94rem;
        }

        .portion-label {
          color: #64748B;
          font-size: 0.8rem;
        }
      }

      .free-badge {
        font-size: 0.71rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #15803D;
        background: #DCFCE7;
        border: 1px solid #A7F3D0;
        padding: 3px 8px;
        border-radius: 6px;
        flex-shrink: 0;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 4px;

        svg {
          font-size: 0.82rem;
        }
      }
    }
  }
`;

function formatTimeLabel(postedTime) {
  if (!postedTime) return null;
  if (postedTime.includes(",")) {
    const parts = postedTime.split(",");
    const timeOnly = parts[parts.length - 1].trim();
    if (timeOnly) return timeOnly;
  }
  return postedTime;
}

export default function FoodCard({
  item,
  isSelected,
  onSelect,
  onHover,
  onLeave,
}) {
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const navigate = useNavigate();

  const isSaved = isInWishlist(item.id);

  const images =
    item.images && item.images.length > 0
      ? item.images
      : [item.image, "/serve.jpg", "/foodeating.png"];

  const rating = item.rating ? item.rating.toFixed(2) : "5.00";

  const handleCardClick = () => {
    onSelect?.(item);
    navigate(`/food/${item.id}`);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleWishlistItem(item.id);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setActiveImgIndex(index);
  };

  const isUrgent = item.status === "pickup_soon";
  const displayTime = formatTimeLabel(item.postedTime);

  return (
    <CardWrapper
      $isSelected={isSelected}
      $isSaved={isSaved}
      onClick={handleCardClick}
      onMouseEnter={() => onHover?.(item)}
      onMouseLeave={() => onLeave?.()}
    >
      {/* MEDIA PHOTO CAROUSEL */}
      <div className="media-box">
        <img
          src={images[activeImgIndex]}
          alt={item.title}
          loading="lazy"
        />

        {/* PREV & NEXT ARROWS */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="carousel-nav-btn left"
              onClick={handlePrev}
              title="Previous photo"
            >
              <IoChevronBack />
            </button>
            <button
              type="button"
              className="carousel-nav-btn right"
              onClick={handleNext}
              title="Next photo"
            >
              <IoChevronForward />
            </button>
          </>
        )}

        {/* PAGINATION DOTS */}
        {images.length > 1 && (
          <div className="dots-strip">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === activeImgIndex ? "active" : ""}`}
                onClick={(e) => handleDotClick(e, idx)}
              />
            ))}
          </div>
        )}

        {/* FROSTED TOP BADGE */}
        <div className={`badge-top-left ${isUrgent ? "urgent" : ""}`}>
          {isUrgent ? (
            <>
              <IoFlameOutline style={{ color: "#D97706" }} />
              <span>Urgent Pickup</span>
            </>
          ) : displayTime ? (
            <>
              <IoTimeOutline style={{ color: "#2E7D5B" }} />
              <span>Listed {displayTime}</span>
            </>
          ) : (
            <>
              <IoShieldCheckmark style={{ color: "#2E7D5B" }} />
              <span>Verified Partner</span>
            </>
          )}
        </div>

        {/* FROSTED WISHLIST HEART BUTTON */}
        <button
          type="button"
          className="btn-wishlist"
          onClick={handleSaveClick}
          title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
        >
          {isSaved ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>

      {/* CARD METADATA DETAILS */}
      <div className="details-box">
        {/* ROW 1: TITLE & RATING CHIP */}
        <div className="row-title-rating">
          <span className="title" title={item.title}>
            {item.title}
          </span>
          <span className="rating-chip">
            <IoStar className="star-icon" />
            <span>{rating}</span>
          </span>
        </div>

        {/* ROW 2: DONOR & CATEGORY */}
        <div className="row-donor-cat">
          <span className="partner-name">
            <IoStorefrontOutline />
            {item.partner}
          </span>
          <span className="dot-sep">·</span>
          <span className="category-pill">{item.category}</span>
          {item.condition && (
            <>
              <span className="dot-sep">·</span>
              <span className="condition-tag">{item.condition}</span>
            </>
          )}
        </div>

        {/* ROW 3: LOCATION & TIME */}
        <div className="row-meta-info">
          <span className="meta-item location">
            <IoLocationOutline />
            {item.area || (item.location ? item.location.split(",")[0].trim() : "Kathmandu")} ({item.distance || "1.5 km"} away)
          </span>
          {item.pickupTime && (
            <>
              <span className="dot-sep">·</span>
              <span className="meta-item time">
                <IoTimeOutline />
                {item.pickupTime}
              </span>
            </>
          )}
        </div>

        {/* ROW 4: PORTIONS & FREE BADGE */}
        <div className="row-footer">
          <div className="portion-wrap">
            <IoRestaurantOutline className="portion-icon" />
            <span className="portion-amount">{item.quantity} {item.unit || "portions"}</span>
            <span className="portion-label">surplus</span>
          </div>
          <span className="free-badge">
            <IoShieldCheckmark />
            Free for NGOs
          </span>
        </div>
      </div>
    </CardWrapper>
  );
}
