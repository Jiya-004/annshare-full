import React, { useState } from "react";
import styled from "styled-components";
import {
  IoClose,
  IoTimeOutline,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoSparkles,
  IoRestaurantOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { addListing, formatCurrentTime, normalizeCategory } from "../../data/listingsStore";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(23, 74, 58, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalCard = styled.div`
  background: #FFFFFF;
  width: 100%;
  max-width: 560px;
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(23, 74, 58, 0.22);
  border: 1px solid rgba(23, 74, 58, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(12px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 24px 28px 18px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid rgba(23, 74, 58, 0.07);
  background: #F8F5ED;

  .header-info {
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #2E7D5B;
      background: rgba(46, 125, 91, 0.12);
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 6px;
    }

    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.5rem;
      font-weight: 700;
      color: #174A3A;
      margin: 0;
    }

    p {
      font-size: 0.88rem;
      color: #556B64;
      margin: 4px 0 0;
    }
  }

  .close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(23, 74, 58, 0.06);
    color: #174A3A;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.15rem;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(23, 74, 58, 0.12);
      transform: rotate(90deg);
    }
  }
`;

const ModalBody = styled.div`
  padding: 24px 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 0.86rem;
      font-weight: 700;
      color: #174A3A;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span.hint {
        font-size: 0.76rem;
        font-weight: 500;
        color: #7A8E87;
      }
    }
  }

  .chips-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip-btn {
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 0.84rem;
    font-weight: 600;
    border: 1px solid rgba(23, 74, 58, 0.15);
    background: #FFFFFF;
    color: #174A3A;
    cursor: pointer;
    transition: all 0.18s ease;

    &:hover {
      border-color: #2E7D5B;
      background: rgba(46, 125, 91, 0.04);
    }

    &.active {
      background: #174A3A;
      color: #F8F5ED;
      border-color: #174A3A;
      box-shadow: 0 2px 8px rgba(23, 74, 58, 0.2);
    }
  }

  .input-with-icon {
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: 14px;
      color: #2E7D5B;
      font-size: 1.15rem;
      pointer-events: none;
    }

    input, select {
      width: 100%;
      padding: 12px 14px 12px 42px;
      border-radius: 14px;
      border: 1px solid rgba(23, 74, 58, 0.16);
      font-family: inherit;
      font-size: 0.92rem;
      color: #174A3A;
      background: #FFFFFF;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:focus {
        border-color: #2E7D5B;
        box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
      }
    }
  }

  .counter-row {
    display: flex;
    align-items: center;
    gap: 12px;

    .portion-btn {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: 1px solid rgba(23, 74, 58, 0.18);
      background: #FFFFFF;
      font-size: 1.25rem;
      font-weight: 700;
      color: #174A3A;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.18s ease;

      &:hover {
        background: #F8F5ED;
        border-color: #2E7D5B;
      }
    }

    .count-display {
      flex: 1;
      text-align: center;
      padding: 10px;
      background: #F8F5ED;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1.1rem;
      color: #174A3A;
    }
  }

  .guarantee-note {
    background: rgba(46, 125, 91, 0.08);
    border: 1px solid rgba(46, 125, 91, 0.2);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.82rem;
    color: #174A3A;
    line-height: 1.4;

    svg {
      font-size: 1.4rem;
      color: #2E7D5B;
      flex-shrink: 0;
    }
  }
`;

const ModalFooter = styled.div`
  padding: 16px 28px 22px;
  border-top: 1px solid rgba(23, 74, 58, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;

  .cancel-link {
    font-size: 0.9rem;
    font-weight: 600;
    color: #6B7D77;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;

    &:hover {
      color: #174A3A;
      text-decoration: underline;
    }
  }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #174A3A;
    color: #F8F5ED;
    border: none;
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(23, 74, 58, 0.22);
    transition: all 0.2s ease;

    &:hover {
      background: #2E7D5B;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(46, 125, 91, 0.28);
    }
  }
`;

const SuccessView = styled.div`
  padding: 48px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  .success-icon {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: rgba(46, 125, 91, 0.12);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.45rem;
    font-weight: 700;
    color: #174A3A;
    margin: 0;
  }

  p {
    font-size: 0.92rem;
    color: #556B64;
    max-width: 380px;
    line-height: 1.5;
    margin: 0;
  }

  .action-btn {
    margin-top: 12px;
    background: #174A3A;
    color: #F8F5ED;
    padding: 12px 28px;
    border-radius: 999px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #2E7D5B;
    }
  }
`;

export const DonateFoodModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState("Cooked Meals");
  const [quantity, setQuantity] = useState(30);
  const [location, setLocation] = useState("Thamel, Kathmandu");
  const [pickupTime, setPickupTime] = useState("Within 2 hours");
  const [donorType, setDonorType] = useState("Restaurant");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const categories = [
    "🍱 Cooked Meals",
    "🥐 Bakery & Bread",
    "🥗 Fresh Produce",
    "🥛 Dairy & Pantry",
    "📦 Packaged Goods",
  ];

  const donorTypes = [
    "Restaurant",
    "Hotel",
    "Café",
    "Bakery",
    "Business",
    "Food Donor",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const currentFormattedTime = formatCurrentTime(now);
    const cleanCat = category.replace(/^[^\w\s]+/, "").trim();
    const mappedCat = normalizeCategory(cleanCat);
    const newListing = {
      title: `Surplus ${mappedCat}`,
      category: mappedCat,
      quantity: Number(quantity) || 20,
      unit: "portions",
      condition: "Freshly Prepared",
      partner: `${donorType} Partner`,
      partnerType: `${donorType} · Verified Donor`,
      verified: true,
      location: location || "Thamel, Kathmandu",
      area: location ? location.split(",")[0].trim() : "Kathmandu",
      distance: "1.2 km",
      pickupDate: "Today",
      pickupTime: `Today, ${currentFormattedTime} – ${formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000))}`,
      postedTime: currentFormattedTime,
      createdAt: now.toISOString(),
      status: "available",
      description: `Surplus portions ready for immediate collection by verified shelters and community kitchens.`,
      safetyInfo: `Prepared at ${currentFormattedTime} today according to food safety protocols.`,
      contactName: `${donorType} Kitchen Manager`,
      contactPhone: "+977 980-1234567",
    };

    try {
      await addListing(newListing);
      setIsSubmitted(true);
    } catch (err) {
      alert(err.message || "Failed to publish donation. Please check your account status.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        {!isSubmitted ? (
          <>
            <ModalHeader>
              <div className="header-info">
                <span className="badge">
                  <IoSparkles /> Instant Redistribution
                </span>
                <h2>What do you have?</h2>
                <p>List surplus portions directly for verified shelters & NGOs.</p>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <IoClose />
              </button>
            </ModalHeader>

            <form onSubmit={handleSubmit}>
              <ModalBody>
                {/* Donor Role Type */}
                <div className="form-group">
                  <label>
                    I am donating as:
                    <span className="hint">Verified partner badge</span>
                  </label>
                  <div className="chips-grid">
                    {donorTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`chip-btn ${donorType === type ? "active" : ""}`}
                        onClick={() => setDonorType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food Category */}
                <div className="form-group">
                  <label>
                    Food Category
                    <span className="hint">Select food nature</span>
                  </label>
                  <div className="chips-grid">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`chip-btn ${category === cat ? "active" : ""}`}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="form-group">
                  <label>
                    Estimated Quantity
                    <span className="hint">Meal portions</span>
                  </label>
                  <div className="counter-row">
                    <button
                      type="button"
                      className="portion-btn"
                      onClick={() => setQuantity((q) => Math.max(5, q - 5))}
                    >
                      -
                    </button>
                    <div className="count-display">
                      {quantity} portions (serves ~{quantity} people)
                    </div>
                    <button
                      type="button"
                      className="portion-btn"
                      onClick={() => setQuantity((q) => q + 5)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="form-group">
                  <label>Pickup Location</label>
                  <div className="input-with-icon">
                    <IoLocationOutline className="icon" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="Thamel, Kathmandu">Thamel, Kathmandu</option>
                      <option value="Jhamsikhel, Lalitpur">Jhamsikhel, Lalitpur</option>
                      <option value="Lazimpat, Kathmandu">Lazimpat, Kathmandu</option>
                      <option value="Baneshwor, Kathmandu">Baneshwor, Kathmandu</option>
                      <option value="Pulchowk, Lalitpur">Pulchowk, Lalitpur</option>
                      <option value="Durbar Marg, Kathmandu">Durbar Marg, Kathmandu</option>
                      <option value="Bhaktapur City Center">Bhaktapur City Center</option>
                    </select>
                  </div>
                </div>

                {/* Pickup Availability */}
                <div className="form-group">
                  <label>Pickup Availability</label>
                  <div className="input-with-icon">
                    <IoTimeOutline className="icon" />
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    >
                      <option value="Within 2 hours">Available within 2 hours</option>
                      <option value="Immediately (Next 30 mins)">Immediately (Next 30 mins)</option>
                      <option value="Today Evening (5 PM - 8 PM)">Today Evening (5 PM - 8 PM)</option>
                      <option value="Tomorrow Morning">Tomorrow Morning</option>
                    </select>
                  </div>
                </div>

                {/* Safety Guarantee */}
                <div className="guarantee-note">
                  <IoShieldCheckmarkOutline />
                  <span>
                    Your listing will be instantly dispatched to verified NGOs
                    nearby with cold/hygiene transport protocols.
                  </span>
                </div>
              </ModalBody>

              <ModalFooter>
                <button
                  type="button"
                  className="cancel-link"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <IoRestaurantOutline /> Donate Food
                </button>
              </ModalFooter>
            </form>
          </>
        ) : (
          <SuccessView>
            <div className="success-icon">
              <IoCheckmarkCircle />
            </div>
            <h3>Donation Listing Live!</h3>
            <p>
              Your <strong>{quantity} portions</strong> of {category} in{" "}
              <strong>{location}</strong> have been broadcast to matched
              shelters. We will notify you once pickup is locked.
            </p>
            <button
              type="button"
              className="action-btn"
              onClick={handleClose}
            >
              Done
            </button>
          </SuccessView>
        )}
      </ModalCard>
    </ModalOverlay>
  );
};

export default DonateFoodModal;
