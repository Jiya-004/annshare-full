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
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext";

const AirbnbCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 18px;
  padding: 10px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 2px 8px rgba(23, 74, 58, 0.04);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 480px) {
    padding: 8px;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(23, 74, 58, 0.1);
    border-color: rgba(46, 125, 91, 0.28);

    .carousel-nav-btn {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }

  /* AIRBNB MEDIA CAROUSEL */
  .media-box {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    max-height: 220px;
    border-radius: 14px;
    overflow: hidden;
    background: #EFECE5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }

    /* PREV / NEXT ARROWS */
    .carousel-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) scale(0.9);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #174A3A;
      font-size: 0.95rem;
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
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.24);
      }
    }

    /* PAGINATION DOTS */
    .dots-strip {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 5px;
      z-index: 6;
      pointer-events: auto;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.65);
        transition: all 0.2s ease;
        cursor: pointer;

        &.active {
          background: #FFFFFF;
          width: 7px;
          height: 7px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
      }
    }

    /* AIRBNB GUEST FAVORITE STYLE BADGE */
    .badge-top-left {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(8px);
      padding: 4px 10px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.72rem;
      font-weight: 700;
      color: #174A3A;
      display: flex;
      align-items: center;
      gap: 5px;
      z-index: 6;

      &.urgent {
        color: #B45309;
        background: rgba(254, 243, 199, 0.96);
      }

      svg {
        font-size: 0.85rem;
      }
    }

    /* WISHLIST HEART */
    .btn-wishlist {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      height: 34px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      color: ${({ $isSaved }) => ($isSaved ? "#FF385C" : "#FFFFFF")};
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 6;

      &:hover {
        transform: scale(1.15);
      }

      &:active {
        transform: scale(0.88);
      }
    }
  }

  /* AIRBNB CONTENT TYPOGRAPHY */
  .details-box {
    padding: 8px 4px 2px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;

    /* ROW 1: TITLE & RATING */
    .row-title-rating {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
      min-width: 0;

      .title {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 0.96rem;
        font-weight: 600;
        color: #174A3A;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        min-width: 0;

        @media (max-width: 768px) {
          font-size: 0.9rem;
        }
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 3px;
        font-family: var(--font-sans, 'Inter', sans-serif);
        font-size: 0.86rem;
        font-weight: 600;
        color: #174A3A;
        flex-shrink: 0;

        @media (max-width: 768px) {
          font-size: 0.8rem;
        }

        .star-icon {
          color: #174A3A;
          font-size: 0.8rem;
        }
      }
    }

    /* ROW 2: DONOR & CATEGORY */
    .row-donor {
      font-size: 0.84rem;
      color: #556B64;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      min-width: 0;

      @media (max-width: 768px) {
        font-size: 0.78rem;
      }
    }

    /* ROW 3: DISTANCE & PICKUP WINDOW */
    .row-distance-time {
      font-size: 0.82rem;
      color: #71827B;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      min-width: 0;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }

    /* ROW 4: AIRBNB PRICE LINE (PORTIONS & FREE BADGE) */
    .row-price-portions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px dashed rgba(23, 74, 58, 0.08);
      width: 100%;
      min-width: 0;

      .portion-amount {
        font-size: 0.9rem;
        color: #174A3A;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 768px) {
          font-size: 0.82rem;
        }

        strong {
          font-weight: 700;
          color: #174A3A;
          font-size: 0.94rem;

          @media (max-width: 768px) {
            font-size: 0.86rem;
          }
        }
      }

      .free-badge {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #2E7D5B;
        background: rgba(46, 125, 91, 0.08);
        padding: 2px 7px;
        border-radius: 4px;
        flex-shrink: 0;
        white-space: nowrap;

        @media (max-width: 768px) {
          font-size: 0.65rem;
          padding: 2px 5px;
        }
      }
    }
  }
`;

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

  const rating = item.rating ? item.rating.toFixed(2) : "4.95";

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

  return (
    <AirbnbCardWrapper
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

        {/* PREV & NEXT ARROWS (Visible on hover) */}
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

        {/* AIRBNB GUEST FAVORITE STYLE BADGE */}
        <div className={`badge-top-left ${isUrgent ? "urgent" : ""}`}>
          {isUrgent ? (
            <>
              <IoTimeOutline />
              <span>Urgent Pickup</span>
            </>
          ) : (
            <>
              <IoShieldCheckmark style={{ color: "#2E7D5B" }} />
              <span>Verified Partner</span>
            </>
          )}
        </div>

        {/* WISHLIST HEART BUTTON */}
        <button
          type="button"
          className="btn-wishlist"
          onClick={handleSaveClick}
          title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
        >
          {isSaved ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>

      {/* AIRBNB METADATA DETAILS */}
      <div className="details-box">
        <div className="row-title-rating">
          <span className="title" title={item.title}>
            {item.title}
          </span>
          <span className="rating">
            <IoStar className="star-icon" />
            <span>{rating}</span>
          </span>
        </div>

        <div className="row-donor">
          {item.partner} · {item.category}
        </div>

        <div className="row-distance-time">
          {item.distance} away · {item.pickupDate}, {item.pickupTime}
        </div>

        <div className="row-price-portions">
          <span className="portion-amount">
            <strong>{item.quantity} {item.unit}</strong> surplus
          </span>
          <span className="free-badge">Free for NGOs</span>
        </div>
      </div>
    </AirbnbCardWrapper>
  );
}
