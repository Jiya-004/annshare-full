import React from "react";
import styled from "styled-components";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoShieldCheckmark,
  IoFastFoodOutline,
  IoCallOutline,
  IoPersonOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

const SummaryCard = styled.div`
  background: #F8F5ED;
  border-radius: 22px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;

  @media (max-width: 768px) {
    padding: 18px 14px;
    border-radius: 16px;
    gap: 14px;
  }

  .main-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
    padding-bottom: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
      padding-bottom: 14px;
    }

    .title-block {
      .badge-cat {
        font-size: 0.76rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #2E7D5B;
        background: rgba(46, 125, 91, 0.12);
        padding: 4px 10px;
        border-radius: 999px;
        display: inline-block;
        margin-bottom: 8px;

        @media (max-width: 768px) {
          font-size: 0.68rem;
          padding: 3px 8px;
          margin-bottom: 6px;
        }
      }

      h3 {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 1.45rem;
        font-weight: 600;
        color: #174A3A;
        margin: 0 0 6px;

        @media (max-width: 768px) {
          font-size: 1.15rem;
          margin: 0 0 4px;
        }
      }

      .condition-tag {
        font-size: 0.82rem;
        color: #66756F;

        @media (max-width: 768px) {
          font-size: 0.74rem;
        }
      }
    }

    .portions-pill {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.15rem;
      font-weight: 700;
      color: #174A3A;
      background: #FFFFFF;
      padding: 10px 18px;
      border-radius: 14px;
      border: 1px solid rgba(23, 74, 58, 0.1);
      box-shadow: 0 4px 12px rgba(23, 74, 58, 0.04);
      white-space: nowrap;

      @media (max-width: 768px) {
        font-size: 0.92rem;
        padding: 6px 12px;
        align-self: flex-start;
      }
    }
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 580px) {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .detail-item {
      background: #FFFFFF;
      border-radius: 14px;
      padding: 14px 16px;
      border: 1px solid rgba(23, 74, 58, 0.06);

      @media (max-width: 768px) {
        padding: 10px 12px;
        border-radius: 12px;
      }

      .label {
        font-size: 0.74rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #8C9E98;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;

        @media (max-width: 768px) {
          font-size: 0.68rem;
        }
      }

      .val {
        font-size: 0.92rem;
        font-weight: 600;
        color: #174A3A;

        @media (max-width: 768px) {
          font-size: 0.84rem;
        }
      }

      .sub-val {
        font-size: 0.8rem;
        color: #66756F;
        margin-top: 2px;

        @media (max-width: 768px) {
          font-size: 0.74rem;
        }
      }
    }
  }

  .description-box {
    background: #FFFFFF;
    border-radius: 14px;
    padding: 16px;
    border: 1px solid rgba(23, 74, 58, 0.06);

    @media (max-width: 768px) {
      padding: 12px;
      border-radius: 12px;
    }

    .label {
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #8C9E98;
      margin-bottom: 6px;

      @media (max-width: 768px) {
        font-size: 0.68rem;
      }
    }

    p {
      font-size: 0.9rem;
      color: #556B64;
      line-height: 1.55;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  }

  .instructions-box {
    background: rgba(46, 125, 91, 0.06);
    border-radius: 14px;
    padding: 14px 16px;
    border-left: 3px solid #2E7D5B;
    font-size: 0.88rem;
    color: #174A3A;

    @media (max-width: 768px) {
      padding: 10px 12px;
      font-size: 0.78rem;
    }
  }
`;

export default function ReviewSummary({ formData }) {
  const {
    foodName,
    category,
    quantity,
    unit,
    condition,
    description,
    businessName,
    location,
    pickupDate,
    pickupFromTime,
    pickupToTime,
    contactName,
    contactPhone,
    instructions,
  } = formData;

  return (
    <SummaryCard>
      <div className="main-head">
        <div className="title-block">
          <span className="badge-cat">{category || "Prepared Meals"}</span>
          <h3>{foodName || "Fresh Cooked Meals"}</h3>
          <span className="condition-tag">
            Condition: <strong>{condition || "Freshly Prepared"}</strong>
          </span>
        </div>

        <div className="portions-pill">
          {quantity || 48} {unit || "portions"}
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span className="label">
            <IoShieldCheckmark style={{ color: "#2E7D5B" }} />
            Business Partner
          </span>
          <div className="val">{businessName || "Green Leaf Café"}</div>
          <div className="sub-val">✓ Verified Partner</div>
        </div>

        <div className="detail-item">
          <span className="label">
            <IoLocationOutline style={{ color: "#2E7D5B" }} />
            Pickup Location
          </span>
          <div className="val">{location || "Thamel, Kathmandu"}</div>
          <div className="sub-val">Within Valley Network</div>
        </div>

        <div className="detail-item">
          <span className="label">
            <IoTimeOutline style={{ color: "#2E7D5B" }} />
            Pickup Window
          </span>
          <div className="val">{pickupDate || "Today"}</div>
          <div className="sub-val">
            {pickupFromTime || "5:00 PM"} – {pickupToTime || "7:30 PM"}
          </div>
        </div>

        <div className="detail-item">
          <span className="label">
            <IoPersonOutline style={{ color: "#2E7D5B" }} />
            Contact Person
          </span>
          <div className="val">{contactName || "Kitchen Manager"}</div>
          <div className="sub-val">{contactPhone || "+977 980-0000000"}</div>
        </div>
      </div>

      {description && (
        <div className="description-box">
          <div className="label">Food Details & Packaging</div>
          <p>{description}</p>
        </div>
      )}

      {instructions && (
        <div className="instructions-box">
          <strong>Pickup Note for Organization:</strong> {instructions}
        </div>
      )}
    </SummaryCard>
  );
}
