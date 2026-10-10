import React, { useState } from "react";
import styled from "styled-components";
import {
  IoHeartOutline,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoFastFoodOutline,
  IoArrowForward,
} from "react-icons/io5";

const DropdownWrapper = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 360px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid rgba(23, 74, 58, 0.12);
  box-shadow: 0 16px 40px rgba(23, 74, 58, 0.16);
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

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    right: -70px;
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
      font-size: 1.15rem;
    }

    h4 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 700;
      color: #174A3A;
    }

    .count-pill {
      font-size: 0.72rem;
      font-weight: 700;
      background: rgba(225, 29, 72, 0.1);
      color: #E11D48;
      padding: 2px 8px;
      border-radius: 999px;
    }
  }
`;

const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);
  background: #FFFFFF;
  padding: 4px 12px 0;
  gap: 4px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 8px 4px;
  font-size: 0.78rem;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  color: ${({ $isActive }) => ($isActive ? "#174A3A" : "#6B7D77")};
  border-bottom: 2px solid ${({ $isActive }) => ($isActive ? "#174A3A" : "transparent")};
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
  max-height: 320px;
  overflow-y: auto;
  padding: 8px 0;
`;

const SavedItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: #F8F5ED;
  }

  .item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(46, 125, 91, 0.1);
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .item-details {
    flex: 1;
    min-width: 0;

    .name {
      display: block;
      font-size: 0.88rem;
      font-weight: 700;
      color: #174A3A;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sub {
      display: block;
      font-size: 0.76rem;
      color: #6B7D77;
      margin-top: 2px;
    }
  }

  .status-badge {
    font-size: 0.7rem;
    font-weight: 600;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.1);
    padding: 3px 8px;
    border-radius: 999px;
    white-space: nowrap;
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
    donor: `${item.partner || "Donor"} · ${item.location || "Kathmandu"}`,
    time: item.pickupTime ? `Pickup ${item.pickupTime}` : "Available today",
    type: item.category || "meal",
  }));

  const organizations = [
    {
      id: 1,
      title: "Bal Mandir Children Center",
      location: "Naxal, Kathmandu",
      verified: "Verified NGO",
    },
    {
      id: 2,
      title: "Kathmandu Valley Food Relief",
      location: "Patan, Lalitpur",
      verified: "Relief Partner",
    },
  ];

  const restaurants = [
    {
      id: 1,
      title: "Green Kitchen Organic",
      location: "Thamel · 320 Meals Donated",
      status: "Top Donor",
    },
    {
      id: 2,
      title: "The Bakery Cafe",
      location: "Pulchowk · 180 Meals Donated",
      status: "Active",
    },
  ];

  return (
    <DropdownWrapper $isOpen={isOpen}>
      <HeaderRow>
        <div className="title-group">
          <IoHeartOutline className="icon" />
          <h4>Saved Bookmarks</h4>
          <span className="count-pill">
            {donations.length + organizations.length + restaurants.length} items
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
        <TabButton
          $isActive={activeTab === "orgs"}
          onClick={() => setActiveTab("orgs")}
        >
          NGOs ({organizations.length})
        </TabButton>
        <TabButton
          $isActive={activeTab === "places"}
          onClick={() => setActiveTab("places")}
        >
          Donors ({restaurants.length})
        </TabButton>
      </TabBar>

      <ListContainer>
        {activeTab === "donations" && (
          donations.length === 0 ? (
            <div style={{ padding: "24px 16px", textAlign: "center", color: "#71827B", fontSize: "0.85rem" }}>
              No saved donations yet. Click the heart icon on any food listing to bookmark it here!
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
                <div className="item-avatar">
                  <IoFastFoodOutline />
                </div>
                <div className="item-details">
                  <span className="name">{d.title}</span>
                  <span className="sub">{d.donor}</span>
                </div>
                <span className="status-badge">{d.time}</span>
              </SavedItemCard>
            ))
          )
        )}

        {activeTab === "orgs" &&
          organizations.map((org) => (
            <SavedItemCard key={org.id} onClick={onClose}>
              <div className="item-avatar">
                <IoPeopleOutline />
              </div>
              <div className="item-details">
                <span className="name">{org.title}</span>
                <span className="sub">{org.location}</span>
              </div>
              <span className="status-badge">{org.verified}</span>
            </SavedItemCard>
          ))}

        {activeTab === "places" &&
          restaurants.map((r) => (
            <SavedItemCard key={r.id} onClick={onClose}>
              <div className="item-avatar">
                <IoRestaurantOutline />
              </div>
              <div className="item-details">
                <span className="name">{r.title}</span>
                <span className="sub">{r.location}</span>
              </div>
              <span className="status-badge">{r.status}</span>
            </SavedItemCard>
          ))}
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
