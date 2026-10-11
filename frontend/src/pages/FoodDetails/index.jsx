import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DetailsWrapper,
  Container,
  BackNav,
  DetailsLayout,
  GalleryCard,
  RequestPanelCard,
} from "./style";

import { getListingById } from "../../data/listingsStore";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

import {
  IoArrowBack,
  IoHeartOutline,
  IoHeart,
  IoShieldCheckmark,
  IoLocationOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCallOutline,
  IoHourglassOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const [isRequested, setIsRequested] = useState(false);

  // Find item by ID or fallback with reactive state
  const [item, setItem] = useState(() => getListingById(id) || getListingById(1) || {
    id: id || "1",
    title: "Food Donation",
    partner: "Local Partner",
    category: "General",
    quantity: 1,
    unit: "package",
    location: "Kathmandu",
    pickupDate: "Today",
    pickupTime: "Flexible",
    image: "/food.png",
    status: "available",
  });

  React.useEffect(() => {
    const found = getListingById(id);
    if (found) setItem(found);

    const onUpdate = () => {
      const updated = getListingById(id);
      if (updated) setItem(updated);
    };
    window.addEventListener("annshare_listings_updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("annshare_listings_updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [id]);

  const handleRequest = () => {
    requireAuth({
      role: "ngo",
      intent: "request_food",
      payload: item,
      onAuthorized: () => {
        setIsRequested(true);
        setTimeout(() => {
          navigate("/ngo/dashboard?tab=requests", {
            state: { intent: "request_food", payload: item },
          });
        }, 700);
      },
    });
  };

  return (
    <DetailsWrapper>
      <Container>
        <BackNav type="button" onClick={() => navigate("/find-food")}>
          <IoArrowBack />
          <span>Back to Marketplace</span>
        </BackNav>

        <DetailsLayout>
          {/* LEFT: MAIN IMAGE & DETAIL BREAKDOWN */}
          <GalleryCard>
            <div className="main-image">
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  if (e.target.src !== '/food.png') {
                    e.target.src = '/food.png';
                  }
                }}
              />
              <div className="badge-status">
                <span className="dot" />
                <span>
                  {item.status === "pickup_soon" ? "Pickup Soon" : "Available"}
                </span>
              </div>
            </div>

            <div className="gallery-content">
              <span className="category-badge">{item.category}</span>
              <h1>{item.title}</h1>
              <p className="description-text">{item.description}</p>

              {/* Food Safety Information Block */}
              <div className="safety-block">
                <h4>
                  <IoShieldCheckmark />
                  <span>Food Safety & Handling Standards</span>
                </h4>
                <p>{item.safetyInfo}</p>
              </div>
            </div>
          </GalleryCard>

          {/* RIGHT: ACTION & LOGISTICS PANEL */}
          <RequestPanelCard $isSaved={isInWishlist(item.id)}>
            <div className="panel-header">
              <div>
                <div className="portions-num">
                  {item.quantity} {item.unit}
                </div>
                <div className="portions-sub">Ready for community pickup</div>
              </div>

              <button
                type="button"
                className="btn-save"
                onClick={() => toggleWishlistItem(item.id)}
                title={isInWishlist(item.id) ? "Remove from wishlist" : "Save to wishlist"}
              >
                {isInWishlist(item.id) ? <IoHeart /> : <IoHeartOutline />}
              </button>
            </div>

            {/* Partner Info */}
            <div className="partner-card-box">
              <div className="partner-title">
                <span>{item.partner}</span>
                <IoShieldCheckmark title="ANNShare Verified" />
              </div>
              <div className="partner-type">{item.partnerType} • Verified Donor</div>
            </div>

            {/* Logistics Breakdown */}
            <div className="logistics-list">
              <div className="log-item">
                <IoLocationOutline />
                <div className="log-content">
                  <div className="log-label">{item.location}</div>
                  <div className="log-sub">{item.distance} from center</div>
                </div>
              </div>

              <div className="log-item">
                <IoTimeOutline />
                <div className="log-content">
                  <div className="log-label">
                    {item.pickupDate} · {item.pickupTime}
                  </div>
                  <div className="log-sub">
                    {item.postedTime ? `Listed today at ${item.postedTime}` : "Designated collection window"}
                  </div>
                </div>
              </div>

              <div className="log-item">
                <IoHourglassOutline />
                <div className="log-content">
                  <div className="log-label">Expires in {item.expiresIn}</div>
                  <div className="log-sub">Time sensitive food rescue</div>
                </div>
              </div>

              {item.bestBefore && (
                <div className="log-item">
                  <IoTimeOutline style={{ color: "#E65100" }} />
                  <div className="log-content">
                    <div className="log-label" style={{ color: "#E65100", fontWeight: 700 }}>
                      Best Before: {item.bestBefore}
                    </div>
                    <div className="log-sub">Consume before this time for best quality</div>
                  </div>
                </div>
              )}

              <div className="log-item">
                <IoPersonOutline />
                <div className="log-content">
                  <div className="log-label">{item.contactName}</div>
                  <div className="log-sub">{item.contactPhone}</div>
                </div>
              </div>
            </div>

            {/* Request Action Button */}
            {isRequested ? (
              <button
                type="button"
                className="btn-request-primary"
                style={{ background: "#2E7D5B" }}
                disabled
              >
                <IoCheckmarkCircle size={20} />
                <span>Request Submitted!</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-request-primary"
                onClick={handleRequest}
              >
                <span>Request This Food →</span>
              </button>
            )}

            <div className="request-note">
              No fee or charges. Food is distributed freely to verified community organizations.
            </div>
          </RequestPanelCard>
        </DetailsLayout>
      </Container>
    </DetailsWrapper>
  );
}
