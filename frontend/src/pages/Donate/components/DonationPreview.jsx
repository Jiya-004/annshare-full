import React, { useState } from "react";
import styled from "styled-components";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoHeartOutline,
  IoHeart,
  IoCheckmarkCircle,
  IoSparkles,
} from "react-icons/io5";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const PreviewCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(23, 74, 58, 0.1);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    border-radius: 20px;
  }

  .image-box {
    position: relative;
    height: 240px;
    background: #EFECE5;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 190px;
    }

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

    .badge-available {
      position: absolute;
      top: 18px;
      left: 18px;
      background: rgba(23, 74, 58, 0.92);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 6px 12px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 6px;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #2E7D5B;
      }
    }

    .btn-save {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: ${({ $isSaved }) => ($isSaved ? "#E11D48" : "#174A3A")};
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
        background: #FFFFFF;
      }
    }
  }

  .content-box {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 768px) {
      padding: 16px 14px;
      gap: 12px;
    }

    .top-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .category-tag {
        font-size: 0.78rem;
        font-weight: 700;
        color: #2E7D5B;
        text-transform: uppercase;
        letter-spacing: 0.08em;

        @media (max-width: 768px) {
          font-size: 0.72rem;
        }
      }

      .portions-badge {
        font-size: 0.82rem;
        font-weight: 700;
        color: #174A3A;
        background: #F8F5ED;
        padding: 4px 12px;
        border-radius: 999px;
        border: 1px solid rgba(23, 74, 58, 0.08);

        @media (max-width: 768px) {
          font-size: 0.76rem;
          padding: 3px 10px;
        }
      }
    }

    .food-title {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;
      line-height: 1.3;

      @media (max-width: 768px) {
        font-size: 1.05rem;
      }
    }

    .donor-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      color: #174A3A;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 0.82rem;
      }

      svg {
        color: #2E7D5B;
        font-size: 1rem;

        @media (max-width: 768px) {
          font-size: 0.9rem;
        }
      }
    }

    .meta-details {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-top: 12px;
      border-top: 1px solid rgba(23, 74, 58, 0.06);
      font-size: 0.82rem;
      color: #556B64;

      .meta-line {
        display: flex;
        align-items: center;
        gap: 6px;

        svg {
          color: #2E7D5B;
          font-size: 0.95rem;
        }
      }
    }
  }
`;

const LivePreviewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 0.78rem;
  color: #66756F;
  font-weight: 600;

  .live-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #2E7D5B;
  }
`;

export default function DonationPreview({ formData }) {
  const [isSaved, setIsSaved] = useState(false);

  const {
    foodName,
    category,
    quantity,
    unit,
    images,
    businessName,
    location,
    pickupDate,
    pickupFromTime,
    pickupToTime,
  } = formData;

  const displayImage = images && images.length > 0 ? images[0] : "/food.png";
  const displayTitle = foodName || "Fresh Cooked Meals";
  const displayQuantity = `${quantity || 48} ${unit || "portions"}`;
  const displayBusiness = businessName || "Green Leaf Café";
  const displayLocation = location || "Thamel, Kathmandu";
  const displayTime = `Pickup ${pickupDate || "Today"} · ${pickupFromTime || "5:00 PM"} – ${pickupToTime || "7:30 PM"}`;

  return (
    <PreviewContainer>
      <LivePreviewTag>
        <span className="live-badge">
          <IoSparkles /> Live Donation Preview
        </span>
        <span>Updates in real-time</span>
      </LivePreviewTag>

      <PreviewCard $isSaved={isSaved}>
        <div className="image-box">
          <img src={displayImage} alt={displayTitle} />
          <div className="badge-available">
            <span className="dot" />
            <span>Available</span>
          </div>
          <button
            type="button"
            className="btn-save"
            onClick={() => setIsSaved(!isSaved)}
            title="Save item"
          >
            {isSaved ? <IoHeart /> : <IoHeartOutline />}
          </button>
        </div>

        <div className="content-box">
          <div className="top-meta">
            <span className="category-tag">{category || "Prepared Meals"}</span>
            <span className="portions-badge">{displayQuantity}</span>
          </div>

          <h3 className="food-title">{displayTitle}</h3>

          <div className="donor-info">
            <span>{displayBusiness}</span>
            <IoCheckmarkCircle title="Verified Food Partner" />
          </div>

          <div className="meta-details">
            <div className="meta-line">
              <IoLocationOutline />
              <span>{displayLocation}</span>
            </div>
            <div className="meta-line">
              <IoTimeOutline />
              <span>{displayTime}</span>
            </div>
          </div>
        </div>
      </PreviewCard>
    </PreviewContainer>
  );
}
