import React, { useState } from "react";
import styled from "styled-components";
import {
  IoHeartOutline,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoFastFoodOutline,
  IoArrowForward,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";

const DropdownWrapper = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 440px;
  background: #FFFFFF;
  border-radius: 22px;
  border: 1px solid rgba(23, 74, 58, 0.12);
  box-shadow: 0 20px 48px rgba(23, 74, 58, 0.18), 0 4px 16px rgba(0, 0, 0, 0.04);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  overflow: hidden;
  z-index: 1100;
  animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 520px) {
    width: calc(100vw - 28px);
    right: -60px;
  }
`;

const HeaderRow = styled.div`
  padding: 16px 20px 12px;
  background: #F8F5ED;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);

  .title-group {
    display: flex;
    align-items: center;
    gap: 8px;

    .icon {
      color: #E11D48;
      font-size: 1.2rem;
    }

    h4 {
      margin: 0;
      font-size: 0.98rem;
      font-weight: 700;
      color: #174A3A;
    }

    .count-pill {
      font-size: 0.74rem;
      font-weight: 700;
      background: rgba(225, 29, 72, 0.1);
      color: #E11D48;
      padding: 2px 10px;
      border-radius: 999px;
    }
  }
`;

const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);
  background: #FFFFFF;
  padding: 6px 14px 0;
  gap: 8px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 8px 6px;
  font-size: 0.8rem;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  color: ${({ $isActive }) => ($isActive ? "#174A3A" : "#6B7D77")};
  border-bottom: 2.5px solid ${({ $isActive }) => ($isActive ? "#174A3A" : "transparent")};
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    color: #174A3A;
  }
`;

const ListContainer = styled.div`
  max-height: 360px;
  overflow-y: auto;
  padding: 6px 0;
`;

const SavedItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  cursor: pointer;
  transition: all 0.18s ease;
  border-bottom: 1px solid rgba(23, 74, 58, 0.04);

  &:hover {
    background: #F9F7F1;
  }

  &:last-child {
    border-bottom: none;
  }

  .item-thumb {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid rgba(23, 74, 58, 0.08);
  }

  .item-avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(46, 125, 91, 0.1);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    flex-shrink: 0;
  }

  .item-details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;

    .name {
      display: block;
      font-size: 0.92rem;
      font-weight: 700;
      color: #174A3A;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sub {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.76rem;
      color: #6B7D77;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.72rem;
      font-weight: 600;
      color: #2E7D5B;
      background: rgba(46, 125, 91, 0.08);
      padding: 2px 8px;
      border-radius: 6px;
      width: fit-content;
      margin-top: 2px;
    }
  }
`;

import { useWishlist } from "../../context/WishlistContext";
import { getListings } from "../../data/listingsStore";
import { useNavigate } from "react-router-dom";

const FooterLink = styled.button`
  padding: 12px 20px;
  background: #F8F5ED;
  border-top: 1px solid rgba(23, 74, 58, 0.08);
  border-left: none;
  border-right: none;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #174A3A;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  transition: color 0.2s ease;

  &:hover {
    color: #2E7D5B;
  }
`;

export const SavedDropdown = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("donations");
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const allListings = getListings();
  const savedListings = allListings.filter((item) =>
    wishlist.some((savedId) => String(savedId) === String(item.id))
  );

  const donations = savedListings.map((item) => ({
    id: item.id,
    title: item.title,
    partner: item.partner || "Food Partner",
    location: item.location || "Kathmandu, Nepal",
    donor: `${item.partner || "Food Partner"} · ${item.location ? item.location.split(',')[0].trim() : "Kathmandu"}`,
    time: item.pickupTime ? `Pickup: ${item.pickupTime}` : (item.expiresIn ? `Expires in ${item.expiresIn}` : "Available Today"),
    type: item.category || "Prepared Meals",
    image: item.image || (Array.isArray(item.images) && item.images[0]) || null,
  }));

  const organizations = [];
  const restaurants = [];

  const totalCount = donations.length;

  return (
    <DropdownWrapper $isOpen={isOpen}>
      <HeaderRow>
        <div className="title-group">
          <IoHeartOutline className="icon" />
          <h4>Saved Bookmarks</h4>
          <span className="count-pill">
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </span>
        </div>
      </HeaderRow>

      <TabBar>
        <TabButton
          $isActive={activeTab === "donations"}
          onClick={() => setActiveTab("donations")}
        >
          Donations ({donations.length})
        </TabButton>
      </TabBar>

      <ListContainer>
        {activeTab === "donations" && (
          donations.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "#71827B", fontSize: "0.85rem" }}>
              <IoHeartOutline style={{ fontSize: "2rem", color: "#C4D0CC", marginBottom: "8px" }} />
              <div>No saved food listings yet.</div>
              <div style={{ fontSize: "0.78rem", color: "#9AA7A1", marginTop: "4px" }}>
                Click the heart icon on any surplus food to save it to your account!
              </div>
            </div>
          ) : (
            donations.map((d) => (
              <SavedItemCard
                key={d.id}
                onClick={() => {
                  onClose();
                  navigate(`/food/${d.id}`);
                }}
              >
                {d.image ? (
                  <img src={d.image} alt={d.title} className="item-thumb" />
                ) : (
                  <div className="item-avatar">
                    <IoFastFoodOutline />
                  </div>
                )}
                <div className="item-details">
                  <span className="name" title={d.title}>{d.title}</span>
                  <span className="sub">
                    <IoLocationOutline style={{ flexShrink: 0 }} />
                    {d.donor}
                  </span>
                  <span className="time-tag">
                    <IoTimeOutline style={{ flexShrink: 0 }} />
                    {d.time}
                  </span>
                </div>
              </SavedItemCard>
            ))
          )
        )}
      </ListContainer>

      <FooterLink
        type="button"
        onClick={() => {
          onClose();
          navigate("/wishlist");
        }}
      >
        View Full Wishlist <IoArrowForward />
      </FooterLink>
    </DropdownWrapper>
  );
};

export default SavedDropdown;
