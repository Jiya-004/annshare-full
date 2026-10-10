import React, { useState } from "react";
import styled from "styled-components";
import {
  IoClose,
  IoLocationOutline,
  IoTimeOutline,
  IoSearchOutline,
  IoHeartOutline,
} from "react-icons/io5";

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

  .org-types {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
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

const ResultView = styled.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #174A3A;
      margin: 0;
    }
    .badge {
      font-size: 0.75rem;
      background: rgba(46, 125, 91, 0.12);
      color: #2E7D5B;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
    }
  }

  .donation-card {
    border: 1px solid rgba(23, 74, 58, 0.12);
    border-radius: 16px;
    padding: 14px 16px;
    background: #F8F5ED;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    .card-info {
      strong {
        display: block;
        color: #174A3A;
        font-size: 0.96rem;
      }
      span {
        font-size: 0.8rem;
        color: #556B64;
      }
    }

    .claim-btn {
      background: #174A3A;
      color: #FFFFFF;
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: #2E7D5B;
      }
    }
  }

  .finish-btn {
    align-self: center;
    margin-top: 8px;
    background: transparent;
    color: #174A3A;
    border: 1.5px solid rgba(23, 74, 58, 0.2);
    padding: 10px 24px;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: rgba(23, 74, 58, 0.05);
    }
  }
`;

export const NeedFoodModal = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState("Kathmandu Center");
  const [foodType, setFoodType] = useState("🍱 Prepared Meals");
  const [quantity, setQuantity] = useState(45);
  const [deadline, setDeadline] = useState("Today before 7 PM");
  const [orgType, setOrgType] = useState("NGO");
  const [isSearched, setIsSearched] = useState(false);

  if (!isOpen) return null;

  const foodTypes = [
    "🍱 Prepared Meals",
    "🥐 Bakery & Bread",
    "🥗 Raw Groceries & Veggies",
    "🥛 Dairy & Nutrition",
    "✨ Any Wholesome Food",
  ];

  const orgTypes = [
    "NGO",
    "Community Org",
    "Relief Shelter",
    "Orphanage Care",
    "Elderly Home",
    "Disaster Relief",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearched(true);
  };

  const handleClose = () => {
    setIsSearched(false);
    onClose();
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        {!isSearched ? (
          <>
            <ModalHeader>
              <div className="header-info">
                <span className="badge">
                  <IoHeartOutline /> Community Food Access
                </span>
                <h2>Find food for your community</h2>
                <p>
                  Connect your shelter or feeding program with available surplus.
                </p>
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

            <form onSubmit={handleSearch}>
              <ModalBody>
                {/* Organization Type */}
                <div className="form-group">
                  <label>
                    Requesting as:
                    <span className="hint">Verified beneficiary entity</span>
                  </label>
                  <div className="chips-grid">
                    {orgTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`chip-btn ${orgType === type ? "active" : ""}`}
                        onClick={() => setOrgType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="form-group">
                  <label>Your Service Location</label>
                  <div className="input-with-icon">
                    <IoLocationOutline className="icon" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="Kathmandu Center">Kathmandu Center (Within 5 km)</option>
                      <option value="Lalitpur & Patan">Lalitpur & Patan</option>
                      <option value="Thamel / Lazimpat">Thamel / Lazimpat</option>
                      <option value="Baneshwor / Koteshwor">Baneshwor / Koteshwor</option>
                      <option value="Bhaktapur Valley">Bhaktapur Valley</option>
                    </select>
                  </div>
                </div>

                {/* Food Type */}
                <div className="form-group">
                  <label>Food Type Needed</label>
                  <div className="chips-grid">
                    {foodTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`chip-btn ${foodType === type ? "active" : ""}`}
                        onClick={() => setFoodType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="form-group">
                  <label>
                    Estimated Beneficiaries / Portions Needed
                    <span className="hint">People count</span>
                  </label>
                  <div className="counter-row">
                    <button
                      type="button"
                      className="portion-btn"
                      onClick={() => setQuantity((q) => Math.max(10, q - 5))}
                    >
                      -
                    </button>
                    <div className="count-display">
                      {quantity} portions
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

                {/* Pickup Deadline */}
                <div className="form-group">
                  <label>Pickup Deadline</label>
                  <div className="input-with-icon">
                    <IoTimeOutline className="icon" />
                    <select
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    >
                      <option value="Urgent (Next 2 Hours)">Urgent (Next 2 Hours)</option>
                      <option value="Today before 7 PM">Today before 7 PM</option>
                      <option value="Today before 10 PM">Today before 10 PM</option>
                      <option value="Tomorrow Morning">Tomorrow Morning</option>
                    </select>
                  </div>
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
                  <IoSearchOutline /> Find Available Food
                </button>
              </ModalFooter>
            </form>
          </>
        ) : (
          <ResultView>
            <div className="results-header">
              <h3>Available Surplus Matches</h3>
              <span className="badge">3 Matches Found Nearby</span>
            </div>

            <div className="donation-card">
              <div className="card-info">
                <strong>Green Kitchen — 50 Cooked Meals</strong>
                <span>Thamel · Ready for immediate dispatch · Warm curry & rice</span>
              </div>
              <button
                type="button"
                className="claim-btn"
                onClick={handleClose}
              >
                Request Pickup
              </button>
            </div>

            <div className="donation-card">
              <div className="card-info">
                <strong>Bakehouse Patisserie — 35 Croissants & Breads</strong>
                <span>Jhamsikhel · Ready by 6 PM · Freshly baked surplus</span>
              </div>
              <button
                type="button"
                className="claim-btn"
                onClick={handleClose}
              >
                Request Pickup
              </button>
            </div>

            <div className="donation-card">
              <div className="card-info">
                <strong>Annapurna Kitchen — 25 Meal Boxes</strong>
                <span>Lazimpat · Ready within 1 hour · Nutritious veg combo</span>
              </div>
              <button
                type="button"
                className="claim-btn"
                onClick={handleClose}
              >
                Request Pickup
              </button>
            </div>

            <button
              type="button"
              className="finish-btn"
              onClick={handleClose}
            >
              Close & View Map
            </button>
          </ResultView>
        )}
      </ModalCard>
    </ModalOverlay>
  );
};

export default NeedFoodModal;
