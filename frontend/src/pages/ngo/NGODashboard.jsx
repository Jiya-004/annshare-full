import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequests, addRequest } from "../../data/requestsStore";
import { getListings, updateListingStatus } from "../../data/listingsStore";
import {
  IoPeopleOutline,
  IoSearchOutline,
  IoDocumentTextOutline,
  IoBagCheckOutline,
  IoCarOutline,
  IoCheckmarkDoneCircleOutline,
  IoNotificationsOutline,
  IoBusinessOutline,
  IoSparkles,
  IoLocationOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoShieldCheckmark,
  IoArrowForward,
  IoCallOutline,
  IoHeart,
  IoLogOutOutline,
  IoMenu,
  IoClose,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import AccountSettings from "../../components/dashboard/AccountSettings";

/* ==========================================================================
   STYLED COMPONENTS: MODERN SIDEBAR + CONTENT LAYOUT
   ========================================================================== */

const DashboardWrapper = styled.div`
  background: #F8F5ED;
  min-height: calc(100vh - 80px);
  padding: 120px 24px 80px;

  @media (max-width: 768px) {
    padding: 16px 14px 60px;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: 28px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

/* ----------------- SIDEBAR ----------------- */

const SidebarCard = styled.aside`
  background: #FFFFFF;
  border-radius: 22px;
  padding: 24px 20px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.04);
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 960px) {
    position: static;
    padding: 18px 16px;
  }
`;

const UserProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid #ECEEEA;

  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: #174A3A;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .meta {
    overflow: hidden;

    h4 {
      margin: 0 0 2px;
      font-size: 1rem;
      font-weight: 600;
      color: #174A3A;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .role-badge {
      font-size: 0.76rem;
      font-weight: 600;
      color: #2E7D5B;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

const QuickActionBtn = styled.button`
  background: #174A3A;
  color: #FFFFFF;
  padding: 12px 18px;
  border-radius: 14px;
  border: none;
  font-size: 0.92rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: #0F3327;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(23, 74, 58, 0.26);
  }
`;

const MobileToggleBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  background: #F8F5ED;
  border: 1px solid rgba(23, 74, 58, 0.1);
  border-radius: 12px;
  font-weight: 700;
  color: #174A3A;
  cursor: pointer;

  @media (max-width: 960px) {
    display: flex;
  }
`;

const SidebarNavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 960px) {
    display: ${(props) => (props.$mobileOpen ? "flex" : "none")};
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  background: ${(props) => (props.$isActive ? "#174A3A" : "transparent")};
  color: ${(props) => (props.$isActive ? "#FFFFFF" : "#4A5D54")};
  font-size: 0.88rem;
  font-weight: ${(props) => (props.$isActive ? "700" : "600")};
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;

  .left-cluster {
    display: flex;
    align-items: center;
    gap: 10px;

    .icon {
      font-size: 1.15rem;
      display: flex;
      align-items: center;
      color: ${(props) => (props.$isActive ? "#A7F3D0" : "#71827B")};
    }
  }

  &:hover {
    background: ${(props) => (props.$isActive ? "#174A3A" : "#F4F6F4")};
    color: ${(props) => (props.$isActive ? "#FFFFFF" : "#174A3A")};

    .left-cluster .icon {
      color: ${(props) => (props.$isActive ? "#A7F3D0" : "#174A3A")};
    }
  }

  .badge-count {
    background: ${(props) => (props.$isActive ? "rgba(255, 255, 255, 0.22)" : "#ECEEEA")};
    color: ${(props) => (props.$isActive ? "#FFFFFF" : "#174A3A")};
    padding: 2px 7px;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 700;
  }
`;

const SidebarFooter = styled.div`
  border-top: 1px solid #ECEEEA;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .btn-switch {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    border: none;
    background: #FFEBEE;
    color: #C62828;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #FFCDD2;
    }
  }

  .btn-logout {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #556B64;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #F4F6F4;
    }
  }
`;

/* ----------------- MAIN CONTENT AREA ----------------- */

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #174A3A;
  margin: ${(props) => props.$margin || "0 0 14px"};
  letter-spacing: -0.2px;
`;

const HeaderBanner = styled.div`
  background: #FFFFFF;
  border-radius: 22px;
  padding: 28px 32px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 240px;
    background: radial-gradient(circle at right, rgba(21, 101, 192, 0.06), transparent 70%);
    pointer-events: none;
  }

  .text-side {
    max-width: 680px;

    .badge-ngo {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #E3F2FD;
      color: #1565C0;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    h1 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.7rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 4px;
    }

    p {
      font-size: 0.94rem;
      color: #556B64;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 22px 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  padding: 20px;
  border: 1px solid rgba(23, 74, 58, 0.08);

  .icon-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: ${(props) => props.$bg || "#E8F5E9"};
      color: ${(props) => props.$color || "#2E7D5B"};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .stat-change {
      font-size: 0.74rem;
      font-weight: 700;
      color: #2E7D5B;
    }
  }

  .stat-value {
    font-size: 1.6rem;
    font-weight: 800;
    color: #174A3A;
    margin-bottom: 3px;
  }

  .stat-label {
    font-size: 0.82rem;
    color: #71827B;
    font-weight: 500;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ItemCard = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  padding: 18px 22px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-main {
    display: flex;
    align-items: center;
    gap: 16px;

    .item-img {
      width: 64px;
      height: 64px;
      border-radius: 14px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .item-info {
      h4 {
        margin: 0 0 4px;
        font-size: 1.02rem;
        color: #174A3A;
      }
      .meta {
        font-size: 0.84rem;
        color: #71827B;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .partner-line {
        font-size: 0.82rem;
        color: #2E7D5B;
        font-weight: 600;
        margin-top: 4px;
      }
    }
  }

  .actions-cluster {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 720px) {
      width: 100%;
      justify-content: flex-end;
    }
  }

  .status-pill {
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &.pending {
      background: #FFF8E1;
      color: #F57F17;
    }

    &.confirmed {
      background: #E8F5E9;
      color: #2E7D5B;
    }

    &.active {
      background: #E3F2FD;
      color: #1565C0;
    }

    &.done {
      background: #F3F4F1;
      color: #556B64;
    }
  }
`;

const ClaimButton = styled.button`
  background: #174A3A;
  color: #FFFFFF;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0F3327;
  }
`;

const ContactButton = styled.button`
  background: transparent;
  color: #174A3A;
  border: 1.5px solid rgba(23, 74, 58, 0.18);
  padding: 7px 14px;
  border-radius: 10px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #FAFBF9;
    border-color: #174A3A;
  }
`;

const IntentHighlight = styled.div`
  background: #E8F5E9;
  border: 1.5px solid #A5D6A7;
  border-radius: 18px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .notice-text {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1B5E20;
    font-weight: 600;
    font-size: 0.92rem;
  }
`;

/* ==========================================================================
   NGO DASHBOARD COMPONENT
   ========================================================================== */

export const NGODashboard = () => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const incomingState = location.state;
  const requestedItem = incomingState?.payload;

  useEffect(() => {
    const tabParam = queryParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    navigate(`/ngo/dashboard?tab=${tabId}`, { replace: true });
  };

  const loadNgoRequests = React.useCallback(() => {
    const all = getRequests();
    const currentName = user?.name;
    const currentOrg = user?.organization;
    const currentId = user?.id;

    const filtered = all.filter((r) => {
      if (currentId && r.ngoId === currentId) return true;
      if (currentName && r.ngoName && r.ngoName.toLowerCase() === currentName.toLowerCase()) return true;
      if (currentOrg && r.ngoOrg && r.ngoOrg.toLowerCase() === currentOrg.toLowerCase()) return true;
      return false;
    });

    return filtered;
  }, [user]);

  const [requests, setRequests] = useState(loadNgoRequests);

  const loadAvailableListings = React.useCallback(() => {
    return getListings().filter((l) => l.status === "available");
  }, []);

  const [availableListings, setAvailableListings] = useState(loadAvailableListings);

  useEffect(() => {
    const handleListingsUpdate = () => {
      setAvailableListings(loadAvailableListings());
    };
    const handleRequestsUpdate = () => {
      setRequests(loadNgoRequests());
    };

    window.addEventListener("annshare_listings_updated", handleListingsUpdate);
    window.addEventListener("annshare_requests_updated", handleRequestsUpdate);
    window.addEventListener("storage", () => {
      handleListingsUpdate();
      handleRequestsUpdate();
    });

    return () => {
      window.removeEventListener("annshare_listings_updated", handleListingsUpdate);
      window.removeEventListener("annshare_requests_updated", handleRequestsUpdate);
      window.removeEventListener("storage", handleListingsUpdate);
    };
  }, [loadAvailableListings, loadNgoRequests]);

  const [itemClaimedBanner, setItemClaimedBanner] = useState(Boolean(requestedItem));

  const handleClaimListing = (listing) => {
    if (!listing) return;
    const currentNgoName = user?.name || "NGO Partner";
    const currentNgoOrg = user?.organization || user?.name || "Your Organization";
    const currentNgoId = user?.id || `ngo-${Date.now()}`;

    const newReq = {
      id: `req-${Date.now()}`,
      listingId: listing.id,
      foodTitle: listing.title,
      donorName: listing.partner,
      portions: `${listing.quantity} ${listing.unit || "portions"}`,
      location: listing.location,
      pickupWindow: `${listing.pickupDate || "Today"} · ${listing.pickupTime || "Flexible"}`,
      status: "confirmed",
      requestedAt: "Just now",
      image: listing.image || "/food.png",
      contact: listing.contactName ? `${listing.contactName} (${listing.contactPhone || ""})` : "Contact donor via chat",
      ngoId: currentNgoId,
      ngoName: currentNgoName,
      ngoOrg: currentNgoOrg,
    };

    addRequest(newReq);
    updateListingStatus(listing.id, "matched", currentNgoName);
    setRequests(loadNgoRequests());
    setAvailableListings(loadAvailableListings());
    handleTabChange("requests");
  };

  const ngoName = user?.name || "NGO Partner";

  // Dynamic real stats computed from NGO requests
  const confirmedRequests = requests.filter((r) => r.status === "confirmed");
  const completedRequests = requests.filter((r) => r.status === "completed");

  const mealsReceived = requests.reduce((sum, r) => {
    const portionsNum = parseInt(r.portions, 10) || 0;
    return sum + portionsNum;
  }, 0);

  const familiesSupported = Math.round(mealsReceived * 0.3) || (requests.length > 0 ? requests.length * 2 : 0);
  const activePickupsCount = confirmedRequests.length;

  return (
    <DashboardWrapper>
      <Container>
        <DashboardGrid>
          {/* 1. LEFT VERTICAL SIDEBAR */}
          <SidebarCard>
            <UserProfileCard>
              <div className="avatar" style={{ overflow: "hidden" }}>
                {user?.avatarPhoto ? (
                  <img
                    src={user.avatarPhoto}
                    alt={ngoName}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "14px" }}
                  />
                ) : (
                  user?.avatar || user?.name?.[0]?.toUpperCase() || "N"
                )}
              </div>
              <div className="meta">
                <h4 title={ngoName}>{ngoName}</h4>
                <span className="role-badge">
                  <FaHandshake /> Verified NGO
                </span>
              </div>
            </UserProfileCard>

            <QuickActionBtn onClick={() => handleTabChange("find-food")}>
              <IoSearchOutline size={18} />
              <span>Find Available Food</span>
            </QuickActionBtn>

            {/* Mobile collapsible toggle */}
            <MobileToggleBtn onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span>Navigation ({activeTab})</span>
              {mobileMenuOpen ? <IoClose size={18} /> : <IoMenu size={18} />}
            </MobileToggleBtn>

            {/* Vertical Nav List */}
            <SidebarNavList $mobileOpen={mobileMenuOpen}>
              <NavItem
                $isActive={activeTab === "overview"}
                onClick={() => handleTabChange("overview")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoSparkles /></span>
                  <span>Overview</span>
                </div>
              </NavItem>

              <NavItem
                $isActive={activeTab === "find-food"}
                onClick={() => handleTabChange("find-food")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoSearchOutline /></span>
                  <span>Find Food</span>
                </div>
                <span className="badge-count">{availableListings.length}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "requests"}
                onClick={() => handleTabChange("requests")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoDocumentTextOutline /></span>
                  <span>Food Requests</span>
                </div>
                <span className="badge-count">{requests.length}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "claims"}
                onClick={() => handleTabChange("claims")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoBagCheckOutline /></span>
                  <span>My Claims</span>
                </div>
                <span className="badge-count">{requests.length}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "pickups"}
                onClick={() => handleTabChange("pickups")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoCarOutline /></span>
                  <span>Active Pickups</span>
                </div>
                <span className="badge-count">{activePickupsCount}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "redistributions"}
                onClick={() => handleTabChange("redistributions")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoCheckmarkDoneCircleOutline /></span>
                  <span>Redistributions</span>
                </div>
              </NavItem>

              <NavItem
                $isActive={activeTab === "notifications"}
                onClick={() => handleTabChange("notifications")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoNotificationsOutline /></span>
                  <span>Notifications</span>
                </div>
                <span className="badge-count">{requests.length > 0 ? 1 : 0}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "profile" || activeTab === "settings"}
                onClick={() => handleTabChange("profile")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoSettingsOutline /></span>
                  <span>Org Profile & Settings</span>
                </div>
              </NavItem>
            </SidebarNavList>

            <SidebarFooter>
              <button
                type="button"
                className="btn-switch"
                onClick={() => switchRole("donor")}
              >
                <IoHeart style={{ color: "#E11D48" }} />
                <span>Switch to Food Donor</span>
              </button>

              <button
                type="button"
                className="btn-logout"
                onClick={logout}
              >
                <IoLogOutOutline size={16} />
                <span>Log out</span>
              </button>
            </SidebarFooter>
          </SidebarCard>

          {/* 2. RIGHT MAIN CONTENT */}
          <MainContent>
            {/* Highlight Banner for Context-Preserved Request */}
            {itemClaimedBanner && requestedItem && (
              <IntentHighlight>
                <div className="notice-text">
                  <IoCheckmarkCircle size={24} />
                  <div>
                    <strong>Action Preserved: </strong>
                    Ready to submit request for: <em>"{requestedItem.title}"</em> from {requestedItem.partner}.
                  </div>
                </div>
                <ClaimButton
                  onClick={() => {
                    handleClaimListing(requestedItem);
                    setItemClaimedBanner(false);
                  }}
                >
                  Confirm Food Request →
                </ClaimButton>
              </IntentHighlight>
            )}

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {/* Top Welcome Banner (Overview Only) */}
                <HeaderBanner>
                  <div className="text-side">
                    <div className="badge-ngo">
                      <IoPeopleOutline /> Verified NGO Partner Portal
                    </div>
                    <h1>Welcome back, {ngoName}</h1>
                    <p>Empowering community nourishment through surplus food rescue.</p>
                  </div>
                </HeaderBanner>

                <StatsGrid>
                  <StatCard $bg="#E8F5E9" $color="#2E7D5B">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoDocumentTextOutline />
                      </div>
                      <span className="stat-change">{requests.length > 0 ? `${requests.length} active` : "No requests"}</span>
                    </div>
                    <div className="stat-value">{requests.length}</div>
                    <div className="stat-label">Active Food Requests</div>
                  </StatCard>

                  <StatCard $bg="#E3F2FD" $color="#1565C0">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoPeopleOutline />
                      </div>
                      <span className="stat-change">{mealsReceived > 0 ? `~${familiesSupported} families supported` : "0 distributed"}</span>
                    </div>
                    <div className="stat-value">{mealsReceived}</div>
                    <div className="stat-label">Rescued Meals Distributed</div>
                  </StatCard>

                  <StatCard $bg="#FFF3E0" $color="#E65100">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoCarOutline />
                      </div>
                      <span className="stat-change">{activePickupsCount > 0 ? "Scheduled" : "None active"}</span>
                    </div>
                    <div className="stat-value">{activePickupsCount}</div>
                    <div className="stat-label">Pickup in Progress</div>
                  </StatCard>

                  <StatCard $bg="#F3E5F5" $color="#7B1FA2">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoShieldCheckmark />
                      </div>
                      <span className="stat-change">{requests.length > 0 ? "Verified protocol" : "No claims yet"}</span>
                    </div>
                    <div className="stat-value">{completedRequests.length > 0 ? completedRequests.length : requests.length > 0 ? "100%" : "—"}</div>
                    <div className="stat-label">{completedRequests.length > 0 ? "Successful Rescues" : "Safety Compliance Score"}</div>
                  </StatCard>
                </StatsGrid>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "24px 0 14px" }}>
                  <SectionTitle $margin="0">Latest Food Requests & Approvals</SectionTitle>
                  <button
                    type="button"
                    onClick={() => handleTabChange("requests")}
                    style={{ background: "none", border: "none", color: "#174A3A", fontWeight: 700, cursor: "pointer" }}
                  >
                    View all ({requests.length}) →
                  </button>
                </div>

                <ItemsList>
                  {requests.map((req) => (
                    <ItemCard key={req.id}>
                      <div className="item-main">
                        <img src={req.image} alt={req.foodTitle} className="item-img" />
                        <div className="item-info">
                          <h4>{req.foodTitle}</h4>
                          <div className="meta">
                            <span><strong>{req.portions}</strong></span>
                            <span>•</span>
                            <span><IoLocationOutline /> {req.location}</span>
                            <span>•</span>
                            <span><IoTimeOutline /> {req.pickupWindow}</span>
                          </div>
                          <div className="partner-line">
                            Provided by: {req.donorName}
                          </div>
                        </div>
                      </div>

                      <div className="actions-cluster">
                        <span className={`status-pill ${req.status}`}>
                          {req.status === "confirmed" ? "✓ Pickup Confirmed" : "⏳ Awaiting Donor"}
                        </span>
                        <ContactButton onClick={() => alert(`Contacting donor: ${req.contact}`)}>
                          <IoCallOutline /> Contact Donor
                        </ContactButton>
                      </div>
                    </ItemCard>
                  ))}
                </ItemsList>
              </div>
            )}

            {/* TAB 2: FIND FOOD */}
            {activeTab === "find-food" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <div>
                    <SectionTitle $margin="0 0 4px">Surplus Food Marketplace</SectionTitle>
                    <p style={{ color: "#71827B", margin: 0, fontSize: "0.9rem" }}>
                      Claim or request fresh batches listed by verified hotels and restaurants in Kathmandu Valley.
                    </p>
                  </div>
                </div>

                <ItemsList>
                  {availableListings.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "#71827B" }}>
                      <p>No available listings at the moment. Check back soon!</p>
                    </div>
                  ) : (
                    availableListings.map((item) => (
                      <ItemCard key={item.id}>
                        <div className="item-main">
                          <img src={item.image || "/food.png"} alt={item.title} className="item-img" />
                          <div className="item-info">
                            <h4>{item.title}</h4>
                            <div className="meta">
                              <span><strong>{item.quantity} {item.unit || "portions"}</strong> available</span>
                              <span>•</span>
                              <span>{item.category}</span>
                              <span>•</span>
                              <span><IoLocationOutline /> {item.location} {item.distance ? `(${item.distance})` : ""}</span>
                            </div>
                            <div className="partner-line">
                              Donor: {item.partner} · Pickup: {item.pickupDate || "Today"}, {item.pickupTime || "Flexible"}
                            </div>
                          </div>
                        </div>

                        <div className="actions-cluster">
                          <ContactButton onClick={() => alert(`Donor contact: ${item.contactName || item.partner || "Donor"} - ${item.contactPhone || "+977 980-1234567"}`)}>
                            <IoCallOutline /> Donor Info
                          </ContactButton>

                          <ClaimButton onClick={() => handleClaimListing(item)}>
                            Request This Food →
                          </ClaimButton>
                        </div>
                      </ItemCard>
                    ))
                  )}
                </ItemsList>

              </div>
            )}

            {/* TAB 3: FOOD REQUESTS / ORDER REQUESTS */}
            {activeTab === "requests" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <div>
                    <SectionTitle $margin="0 0 4px">Order Requests & Match Pipeline</SectionTitle>
                    <p style={{ color: "#71827B", margin: 0, fontSize: "0.9rem" }}>
                      All outgoing food requests made by your organization.
                    </p>
                  </div>
                  <QuickActionBtn onClick={() => handleTabChange("find-food")} style={{ width: "auto" }}>
                    <IoSearchOutline /> Request More Food
                  </QuickActionBtn>
                </div>

                <ItemsList>
                  {requests.map((req) => (
                    <ItemCard key={req.id}>
                      <div className="item-main">
                        <img src={req.image} alt={req.foodTitle} className="item-img" />
                        <div className="item-info">
                          <h4>{req.foodTitle}</h4>
                          <div className="meta">
                            <span><strong>{req.portions}</strong></span>
                            <span>•</span>
                            <span><IoLocationOutline /> {req.location}</span>
                            <span>•</span>
                            <span>Requested {req.requestedAt}</span>
                          </div>
                          <div className="partner-line">
                            Donor: {req.donorName} · {req.contact}
                          </div>
                        </div>
                      </div>

                      <div className="actions-cluster">
                        <span className={`status-pill ${req.status}`}>
                          {req.status === "confirmed" ? "✓ Matched & Confirmed" : "⏳ Pending Approval"}
                        </span>
                        <ClaimButton onClick={() => handleTabChange("pickups")}>
                          View Pickup Details →
                        </ClaimButton>
                      </div>
                    </ItemCard>
                  ))}
                </ItemsList>
              </div>
            )}

            {/* TAB 4: MY CLAIMS */}
            {activeTab === "claims" && (
              <div>
                <SectionTitle>Active Claimed Batches</SectionTitle>
                <ItemsList>
                  {requests.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "#71827B" }}>
                      <p>No claimed batches yet. Browse Find Food to request available surplus food.</p>
                    </div>
                  ) : (
                    requests.map((claim) => (
                      <ItemCard key={claim.id}>
                        <div className="item-main">
                          <img src={claim.image || "/food.png"} alt={claim.foodTitle} className="item-img" />
                          <div className="item-info">
                            <h4>{claim.foodTitle}</h4>
                            <div className="meta">
                              <span><strong>{claim.portions}</strong></span>
                              <span>•</span>
                              <span>Status: {claim.status}</span>
                            </div>
                            <div className="partner-line">
                              Donor: {claim.donorName} · {claim.pickupWindow || "Today"}
                            </div>
                          </div>
                        </div>

                        <div className="actions-cluster">
                          <span className={`status-pill ${claim.status === "confirmed" ? "active" : "pending"}`}>
                            {claim.status === "confirmed" ? "Ready for Pickup" : "Awaiting Donor"}
                          </span>
                          <ClaimButton onClick={() => handleTabChange("pickups")}>
                            View Logistics →
                          </ClaimButton>
                        </div>
                      </ItemCard>
                    ))
                  )}
                </ItemsList>
              </div>
            )}

            {/* TAB 5: ACTIVE PICKUPS */}
            {activeTab === "pickups" && (
              <div>
                <SectionTitle>Pickup Logistics & Volunteer Dispatch</SectionTitle>
                <ItemCard style={{ flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <h4 style={{ margin: "0 0 4px", color: "#174A3A", fontSize: "1.15rem" }}>
                        Pickup Route #PK-492: Green Leaf Café → Hope Shelter
                      </h4>
                      <span style={{ fontSize: "0.85rem", color: "#71827B" }}>
                        Estimated distance: 3.2 km · Scheduled slot: Today, 6:00 PM - 7:00 PM
                      </span>
                    </div>
                    <span className="status-pill confirmed">
                      Volunteer Driver Assigned
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                      width: "100%",
                      background: "#FAFBF9",
                      padding: "16px",
                      borderRadius: "14px",
                      border: "1px solid #EBECE8",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#71827B", textTransform: "uppercase" }}>Donor Contact</div>
                      <strong style={{ color: "#174A3A" }}>Chef Ramesh</strong>
                      <div style={{ fontSize: "0.85rem", color: "#556B64" }}>+977 980-1234567</div>
                    </div>

                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#71827B", textTransform: "uppercase" }}>Driver / Courier</div>
                      <strong style={{ color: "#174A3A" }}>Bikash Thapa (Volunteer)</strong>
                      <div style={{ fontSize: "0.85rem", color: "#556B64" }}>Van #BA 2 CHA 4412</div>
                    </div>

                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#71827B", textTransform: "uppercase" }}>Pickup Instructions</div>
                      <strong style={{ color: "#174A3A" }}>Back Kitchen Entrance</strong>
                      <div style={{ fontSize: "0.85rem", color: "#556B64" }}>Insulated thermal boxes required</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", alignSelf: "flex-end" }}>
                    <ContactButton onClick={() => alert("Calling driver Bikash...")}>
                      <IoCallOutline /> Call Driver
                    </ContactButton>
                    <ClaimButton onClick={() => alert("Pickup marked as completed!")}>
                      Mark Received & Safe
                    </ClaimButton>
                  </div>
                </ItemCard>
              </div>
            )}

            {/* TAB 6: COMPLETED REDISTRIBUTIONS */}
            {activeTab === "redistributions" && (
              <div>
                <SectionTitle>Redistribution History & Impact Logs</SectionTitle>
                <ItemsList>
                  {[
                    {
                      id: "redist-1",
                      title: "60 Portions Steamed Rice & Veg Curry",
                      donor: "Himalayan Kitchen",
                      recipients: "Pashupati Area Senior Community",
                      date: "Yesterday",
                      meals: "60 meals",
                    },
                    {
                      id: "redist-2",
                      title: "45 Portions Bakery Buns & Bread",
                      donor: "Baker's Choice",
                      recipients: "Lalitpur Child Care Shelter",
                      date: "Sep 3, 2026",
                      meals: "45 meals",
                    },
                    {
                      id: "redist-3",
                      title: "110 Meal Packs Corporate Buffet Surplus",
                      donor: "Summit Hotel Kitchen",
                      recipients: "Kathmandu Community Center",
                      date: "Aug 30, 2026",
                      meals: "110 meals",
                    },
                  ].map((log) => (
                    <ItemCard key={log.id}>
                      <div className="item-main">
                        <div style={{ fontSize: "1.4rem", color: "#2E7D5B" }}>
                          <IoCheckmarkCircle />
                        </div>
                        <div className="item-info">
                          <h4>{log.title}</h4>
                          <div className="meta">
                            <span><strong>{log.meals}</strong> distributed</span>
                            <span>•</span>
                            <span>Beneficiary: {log.recipients}</span>
                            <span>•</span>
                            <span>{log.date}</span>
                          </div>
                          <div className="partner-line">
                            Donated by: {log.donor}
                          </div>
                        </div>
                      </div>
                      <span className="status-pill done">
                        Verified Distributed
                      </span>
                    </ItemCard>
                  ))}
                </ItemsList>
              </div>
            )}

            {/* TAB 7: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div>
                <SectionTitle>Surplus Alerts & Request Updates</SectionTitle>
                <ItemsList>
                  <ItemCard>
                    <div className="item-main">
                      <div style={{ fontSize: "1.4rem", color: "#1565C0" }}>
                        <IoSearchOutline />
                      </div>
                      <div className="item-info">
                        <h4>New Surplus Batch Available Nearby</h4>
                        <div className="meta">
                          <span>40 Fresh Meals posted by Himalayan Kitchen (1.2 km away)</span>
                          <span>•</span>
                          <span>10m ago</span>
                        </div>
                      </div>
                    </div>
                    <ClaimButton onClick={() => handleTabChange("find-food")}>
                      View Listing
                    </ClaimButton>
                  </ItemCard>

                  <ItemCard>
                    <div className="item-main">
                      <div style={{ fontSize: "1.4rem", color: "#2E7D5B" }}>
                        <IoCheckmarkCircle />
                      </div>
                      <div className="item-info">
                        <h4>Request Accepted by Green Leaf Café</h4>
                        <div className="meta">
                          <span>Your order request #REQ-101 has been confirmed for collection</span>
                          <span>•</span>
                          <span>25m ago</span>
                        </div>
                      </div>
                    </div>
                    <ClaimButton onClick={() => handleTabChange("pickups")}>
                      View Logistics
                    </ClaimButton>
                  </ItemCard>
                </ItemsList>
              </div>
            )}

            {/* TAB 8: ORGANIZATION PROFILE & ACCOUNT SETTINGS */}
            {(activeTab === "profile" || activeTab === "settings") && (
              <AccountSettings role="ngo" />
            )}
          </MainContent>
        </DashboardGrid>
      </Container>
    </DashboardWrapper>
  );
};

export default NGODashboard;
