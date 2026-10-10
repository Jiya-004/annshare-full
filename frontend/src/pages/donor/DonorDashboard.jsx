import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoRestaurantOutline,
  IoCubeOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoHeartOutline,
  IoHeart,
  IoSparkles,
  IoAddCircleOutline,
  IoBarChartOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoLeafOutline,
  IoLocationOutline,
  IoArrowForward,
  IoShieldCheckmark,
  IoLogOutOutline,
  IoFastFoodOutline,
  IoMenu,
  IoClose,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import AccountSettings from "../../components/dashboard/AccountSettings";
import { getListings, addListing } from "../../data/listingsStore";
import api from "../../services/api";
import ImageUploader from "../Donate/components/ImageUploader";

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
      font-weight: 700;
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

const QuickDonateBtn = styled.button`
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

const SidebarNavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 960px) {
    display: ${(props) => (props.$mobileOpen ? "flex" : "none")};
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
    background: #E3F2FD;
    color: #1565C0;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #BBDEFB;
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
    color: #C62828;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #FFEBEE;
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
    background: radial-gradient(circle at right, rgba(46, 125, 91, 0.08), transparent 70%);
    pointer-events: none;
  }

  .text-side {
    max-width: 680px;

    .badge-donor {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #E8F5E9;
      color: #2E7D5B;
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

/* TAB 1: OVERVIEW METRICS */
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

/* DONATION FORM STYLES */
const FormCard = styled.div`
  background: #FFFFFF;
  border-radius: 22px;
  padding: 32px 34px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.03);

  @media (max-width: 600px) {
    padding: 22px 18px;
  }

  .form-header {
    margin-bottom: 22px;
    padding-bottom: 14px;
    border-bottom: 1px solid #ECEEEA;

    h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #174A3A;
      margin: 0 0 6px;
    }

    p {
      color: #71827B;
      font-size: 0.9rem;
      margin: 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #2E3E37;
    }

    input, select, textarea {
      padding: 12px 14px;
      border-radius: 12px;
      border: 1.5px solid rgba(23, 74, 58, 0.14);
      background: #FAFBF9;
      font-family: inherit;
      font-size: 0.92rem;
      color: #174A3A;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        background: #FFFFFF;
        border-color: #2E7D5B;
        box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
      }
    }

    textarea {
      min-height: 90px;
      resize: vertical;
    }
  }
`;

/* LISTINGS & CARDS */
const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const DonationCard = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  padding: 18px 22px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-main {
    display: flex;
    align-items: center;
    gap: 16px;

    .item-img {
      width: 62px;
      height: 62px;
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
        font-size: 0.82rem;
        color: #71827B;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
    }
  }

  .status-badge {
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 5px;

    &.available {
      background: #E8F5E9;
      color: #2E7D5B;
    }

    &.matched {
      background: #E3F2FD;
      color: #1565C0;
    }

    &.completed {
      background: #F3F4F1;
      color: #556B64;
    }
  }
`;

/* ==========================================================================
   DONOR DASHBOARD COMPONENT
   ========================================================================== */

export const DonorDashboard = () => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const tabParam = queryParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    navigate(`/donor/dashboard?tab=${tabId}`, { replace: true });
  };

  const loadDonorDonations = React.useCallback(() => {
    const all = getListings();
    const donorOrg = user?.organization;
    const donorId = user?.id;
    const currentName = user?.name;

    const filtered = all.filter((l) => {
      if (donorId && l.donorId === donorId) return true;
      if (donorOrg && l.partner && l.partner.toLowerCase() === donorOrg.toLowerCase()) return true;
      if (currentName && l.contactName && l.contactName.toLowerCase() === currentName.toLowerCase()) return true;
      return false;
    });

    return filtered.map((l) => ({
      ...l,
      quantity: typeof l.quantity === "number" ? `${l.quantity} ${l.unit || "portions"}` : l.quantity,
      date: l.pickupDate || l.date || "Today",
    }));
  }, [user]);

  const [donations, setDonations] = useState(loadDonorDonations);

  useEffect(() => {
    setDonations(loadDonorDonations());
    const handleUpdate = () => {
      setDonations(loadDonorDonations());
    };
    window.addEventListener("annshare_listings_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("annshare_listings_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadDonorDonations]);

  const [categoriesList, setCategoriesList] = useState([
    "Prepared Meals",
    "Bakery & Bread",
    "Fruits & Veggies",
    "Packaged Food",
    "Rice & Grains",
    "Dairy & Pantry",
    "Other Items",
  ]);

  useEffect(() => {
    let isMounted = true;
    api.categories
      .getAll()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const names = data.filter((c) => c.status !== "Inactive").map((c) => c.name);
          if (names.length > 0) {
            setCategoriesList(names);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const [newFood, setNewFood] = useState({
    title: "",
    category: "Prepared Meals",
    quantity: "",
    unit: "portions",
    pickupTime: "Today, 5:00 PM - 7:00 PM",
    instructions: "",
    images: [],
  });

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleCreateDonation = (e) => {
    e.preventDefault();
    if (!newFood.title.trim()) return;

    const fallbackImg = `/food/food${Math.floor(Math.random() * 8) + 1}.jpg`;
    const chosenImage = newFood.images && newFood.images.length > 0 ? newFood.images[0] : fallbackImg;
    const chosenImages = newFood.images && newFood.images.length > 0 ? newFood.images : [fallbackImg];

    const newListing = {
      title: newFood.title,
      category: newFood.category,
      quantity: Number(newFood.quantity) || 20,
      unit: newFood.unit || "portions",
      partner: user?.organization || user?.name || "Your Organization",
      location: user?.location || "Kathmandu Kitchen",
      status: "available",
      pickupDate: "Today",
      pickupTime: newFood.pickupTime || "5:00 PM - 7:00 PM",
      image: chosenImage,
      images: chosenImages,
      description: newFood.instructions || "Fresh surplus food ready for pickup.",
      contactName: user?.name || "Donor",
      contactPhone: "+977 980-1234567",
      donorId: user?.id || `donor-${Date.now()}`,
      matchedWith: null,
    };

    addListing(newListing);
    setDonations(loadDonorDonations());
    setNewFood({
      title: "",
      category: "Prepared Meals",
      quantity: "",
      unit: "portions",
      pickupTime: "Today, 5:00 PM - 7:00 PM",
      instructions: "",
      images: [],
    });

    setIsSuccessMessage(true);
    setTimeout(() => setIsSuccessMessage(false), 4000);
  };

  const donorName = user?.name || "Donor";
  const donorOrg = user?.organization || user?.name || "Your Organization";

  // Sidebar dynamic badge computations
  const opportunitiesCount = getListings().filter(
    (l) => l.status === "available" && l.partner !== (user?.organization || donorName)
  ).length;

  const [notificationsCount, setNotificationsCount] = useState(donations.length > 0 ? 1 : 0);

  // Real data stats computed from user's donations
  const completedListings = donations.filter((d) => d.status === "completed");
  const totalPortionsShared = donations.reduce((sum, d) => {
    const qty = typeof d.quantity === "number" ? d.quantity : parseInt(d.quantity, 10);
    return sum + (Number.isFinite(qty) && qty > 0 ? qty : 0);
  }, 0);
  const peopleReached = Math.round(totalPortionsShared * 0.9);
  const foodSavedKg = Math.round(totalPortionsShared * 0.4);

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
                    alt={donorName}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "14px" }}
                  />
                ) : (
                  user?.avatar || user?.name?.[0]?.toUpperCase() || "D"
                )}
              </div>
              <div className="meta">
                <h4 title={donorName}>{donorName}</h4>
                <span className="role-badge">
                  <IoHeart style={{ color: "#E11D48" }} /> Food Donor
                </span>
              </div>
            </UserProfileCard>

            <QuickDonateBtn onClick={() => handleTabChange("donate")}>
              <IoAddCircleOutline size={18} />
              <span>Donate Food</span>
            </QuickDonateBtn>

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
                $isActive={activeTab === "donate"}
                onClick={() => handleTabChange("donate")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoRestaurantOutline /></span>
                  <span>Donate Food</span>
                </div>
              </NavItem>

              <NavItem
                $isActive={activeTab === "my-donations"}
                onClick={() => handleTabChange("my-donations")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoCubeOutline /></span>
                  <span>My Donations</span>
                </div>
                <span className="badge-count">{donations.length}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "history"}
                onClick={() => handleTabChange("history")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoTimeOutline /></span>
                  <span>Donation History</span>
                </div>
              </NavItem>

              <NavItem
                $isActive={activeTab === "opportunities"}
                onClick={() => handleTabChange("opportunities")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoHeartOutline /></span>
                  <span>Opportunities</span>
                </div>
                <span className="badge-count">{opportunitiesCount}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "impact"}
                onClick={() => handleTabChange("impact")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoBarChartOutline /></span>
                  <span>Impact & Metrics</span>
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
                <span className="badge-count">{notificationsCount}</span>
              </NavItem>

              <NavItem
                $isActive={activeTab === "profile" || activeTab === "settings"}
                onClick={() => handleTabChange("profile")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoSettingsOutline /></span>
                  <span>Profile & Settings</span>
                </div>
              </NavItem>
            </SidebarNavList>

            <SidebarFooter>
              <button
                type="button"
                className="btn-switch"
                onClick={() => switchRole("ngo")}
              >
                <FaHandshake />
                <span>Switch to NGO Partner</span>
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
            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {/* Top Welcome Banner (Overview Only) */}
                <HeaderBanner>
                  <div className="text-side">
                    <div className="badge-donor">
                      <IoRestaurantOutline /> Food Donor Portal
                    </div>
                    <h1>Welcome back, {donorName}</h1>
                    <p>Your generosity gives surplus food a second journey.</p>
                  </div>
                </HeaderBanner>

                <StatsGrid>
                  <StatCard $bg="#E8F5E9" $color="#2E7D5B">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoRestaurantOutline />
                      </div>
                      <span className="stat-change">{donations.length > 0 ? `${donations.length} total listed` : "No donations yet"}</span>
                    </div>
                    <div className="stat-value">{totalPortionsShared}</div>
                    <div className="stat-label">Total Portions Shared</div>
                  </StatCard>

                  <StatCard $bg="#E3F2FD" $color="#1565C0">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoHeartOutline />
                      </div>
                      <span className="stat-change">{totalPortionsShared > 0 ? "~1 portion/person" : "0 reached"}</span>
                    </div>
                    <div className="stat-value">{peopleReached}</div>
                    <div className="stat-label">People Nourished</div>
                  </StatCard>

                  <StatCard $bg="#FFF3E0" $color="#E65100">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoLeafOutline />
                      </div>
                      <span className="stat-change">{foodSavedKg > 0 ? "Direct saving" : "0 kg saved"}</span>
                    </div>
                    <div className="stat-value">{foodSavedKg} kg</div>
                    <div className="stat-label">Food Waste Prevented</div>
                  </StatCard>

                  <StatCard $bg="#F3E5F5" $color="#7B1FA2">
                    <div className="icon-row">
                      <div className="icon-box">
                        <IoShieldCheckmark />
                      </div>
                      <span className="stat-change">{completedListings.length > 0 ? "100% verified" : "No pickups yet"}</span>
                    </div>
                    <div className="stat-value">{completedListings.length}</div>
                    <div className="stat-label">Successful Pickups</div>
                  </StatCard>
                </StatsGrid>

                <SectionTitle $margin="24px 0 14px">
                  Active Donations Status
                </SectionTitle>
                <ItemsList>
                  {donations.slice(0, 2).map((item) => (
                    <DonationCard key={item.id}>
                      <div className="item-main">
                        <img src={item.image} alt={item.title} className="item-img" />
                        <div className="item-info">
                          <h4>{item.title}</h4>
                          <div className="meta">
                            <span>{item.quantity}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                            <span>•</span>
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span className={`status-badge ${item.status}`}>
                          {item.status === "available" ? "Active Listing" : "Matched with NGO"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleTabChange("my-donations")}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#174A3A",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Manage →
                        </button>
                      </div>
                    </DonationCard>
                  ))}
                </ItemsList>
              </div>
            )}

            {/* TAB 2: DONATE FOOD FORM */}
            {activeTab === "donate" && (
              <FormCard>
                <div className="form-header">
                  <h3>List Food For Immediate Community Pickup</h3>
                  <p>
                    Provide details regarding your surplus batch. Verified NGOs nearby will receive instantaneous notifications.
                  </p>
                </div>

                {isSuccessMessage && (
                  <div
                    style={{
                      background: "#E8F5E9",
                      color: "#2E7D32",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      marginBottom: "16px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IoCheckmarkCircle size={20} />
                    <span>Donation successfully listed! It is now visible in the verified NGO marketplace.</span>
                  </div>
                )}

                <form onSubmit={handleCreateDonation}>
                  <div className="field-group">
                    <label>Food Item Title / Description</label>
                    <input
                      type="text"
                      placeholder="e.g. 40 Portions Vegetable Fried Rice & Dal"
                      value={newFood.title}
                      onChange={(e) => setNewFood({ ...newFood, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="row-2">
                    <div className="field-group">
                      <label>Food Category</label>
                      <select
                        value={newFood.category}
                        onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                      >
                        {categoriesList.map((catName) => (
                          <option key={catName} value={catName}>
                            {catName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label>Quantity & Measure</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="number"
                          placeholder="40"
                          value={newFood.quantity}
                          onChange={(e) => setNewFood({ ...newFood, quantity: e.target.value })}
                          required
                        />
                        <select
                          value={newFood.unit}
                          onChange={(e) => setNewFood({ ...newFood, unit: e.target.value })}
                        >
                          <option value="portions">Portions</option>
                          <option value="boxes">Boxes</option>
                          <option value="kg">Kilograms</option>
                          <option value="packs">Packs</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Food Photos / Upload Images</label>
                    <ImageUploader
                      images={newFood.images || []}
                      onImagesChange={(imgs) => setNewFood({ ...newFood, images: imgs })}
                    />
                  </div>

                  <div className="field-group">
                    <label>Pickup Availability Window</label>
                    <input
                      type="text"
                      placeholder="e.g. Today between 5:30 PM - 8:00 PM"
                      value={newFood.pickupTime}
                      onChange={(e) => setNewFood({ ...newFood, pickupTime: e.target.value })}
                    />
                  </div>

                  <div className="field-group">
                    <label>Special Collection Notes / Entry Instructions</label>
                    <textarea
                      placeholder="e.g. Collect directly from back kitchen entrance. Ask for Head Chef Ramesh."
                      value={newFood.instructions}
                      onChange={(e) => setNewFood({ ...newFood, instructions: e.target.value })}
                    />
                  </div>

                  <QuickDonateBtn type="submit" style={{ alignSelf: "flex-start", marginTop: "10px", width: "auto" }}>
                    <span>Publish Donation to Community NGOs</span>
                    <IoArrowForward />
                  </QuickDonateBtn>
                </form>
              </FormCard>
            )}

            {/* TAB 3: MY DONATIONS */}
            {activeTab === "my-donations" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <SectionTitle $margin="0">Active & Pending Donations</SectionTitle>
                  <QuickDonateBtn onClick={() => handleTabChange("donate")} style={{ width: "auto" }}>
                    <IoAddCircleOutline /> New Donation
                  </QuickDonateBtn>
                </div>

                <ItemsList>
                  {donations.map((item) => (
                    <DonationCard key={item.id}>
                      <div className="item-main">
                        <img src={item.image} alt={item.title} className="item-img" />
                        <div className="item-info">
                          <h4>{item.title}</h4>
                          <div className="meta">
                            <span><strong>{item.quantity}</strong></span>
                            <span>•</span>
                            <span>{item.category}</span>
                            <span>•</span>
                            <span><IoLocationOutline /> {item.location}</span>
                          </div>
                          {item.matchedWith && (
                            <div style={{ fontSize: "0.8rem", color: "#1565C0", marginTop: "4px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                              <FaHandshake /> Matched with: {item.matchedWith}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className={`status-badge ${item.status}`}>
                          {item.status === "available"
                            ? "Active · Awaiting NGO"
                            : item.status === "matched"
                            ? "Claimed · Pickup Pending"
                            : "Completed"}
                        </span>
                      </div>
                    </DonationCard>
                  ))}
                </ItemsList>
              </div>
            )}

            {/* TAB 4: DONATION HISTORY */}
            {activeTab === "history" && (
              <div>
                <SectionTitle>Completed Donations Log</SectionTitle>
                <ItemsList>
                  {completedListings.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "#71827B" }}>
                      <p>No completed donations yet. When an NGO completes a pickup, it will appear here.</p>
                    </div>
                  ) : (
                    completedListings.map((item) => (
                    <DonationCard key={item.id}>
                      <div className="item-main">
                        <img src={item.image} alt={item.title} className="item-img" />
                        <div className="item-info">
                          <h4>{item.title}</h4>
                          <div className="meta">
                            <span>{item.quantity}</span>
                            <span>•</span>
                            <span>Delivered to: {item.matchedWith}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className="status-badge completed">
                        <IoCheckmarkCircle /> Verified Delivered
                      </span>
                    </DonationCard>
                  ))
                  )}
                </ItemsList>
              </div>
            )}

            {/* TAB 5: AVAILABLE OPPORTUNITIES */}
            {activeTab === "opportunities" && (
              <div>
                <SectionTitle $margin="0 0 6px">Local Community Needs & Feeding Drives</SectionTitle>
                <p style={{ color: "#71827B", marginBottom: "18px" }}>
                  Verified shelters currently requesting food packages in your area.
                </p>

                <ItemsList>
                  <DonationCard>
                    <div className="item-main">
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "14px",
                          background: "#E8F5E9",
                          color: "#2E7D5B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                        }}
                      >
                        <FaHandshake />
                      </div>
                      <div className="item-info">
                        <h4>Hope Foundation Children's Home (50 Meals Needed)</h4>
                        <div className="meta">
                          <span>Kathmandu Ward 4</span>
                          <span>•</span>
                          <span>Evening Dinner Window (6:30 PM)</span>
                        </div>
                      </div>
                    </div>

                    <QuickDonateBtn onClick={() => handleTabChange("donate")} style={{ width: "auto" }}>
                      Fulfill Request
                    </QuickDonateBtn>
                  </DonationCard>

                  <DonationCard>
                    <div className="item-main">
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "14px",
                          background: "#FFF3E0",
                          color: "#E65100",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.5rem",
                        }}
                      >
                        <IoFastFoodOutline />
                      </div>
                      <div className="item-info">
                        <h4>Elderly Care Home Thamel (Bread & Bakery Supplies)</h4>
                        <div className="meta">
                          <span>Thamel Marg</span>
                          <span>•</span>
                          <span>Morning Breakfast Drive</span>
                        </div>
                      </div>
                    </div>

                    <QuickDonateBtn onClick={() => handleTabChange("donate")} style={{ width: "auto" }}>
                      Fulfill Request
                    </QuickDonateBtn>
                  </DonationCard>
                </ItemsList>
              </div>
            )}

            {/* TAB 6: IMPACT */}
            {activeTab === "impact" && (
              <div>
                <StatsGrid>
                  <StatCard $bg="#E8F5E9" $color="#2E7D5B">
                    <div className="stat-value">{totalPortionsShared}</div>
                    <div className="stat-label">Meals Served To Date</div>
                  </StatCard>
                  <StatCard $bg="#E3F2FD" $color="#1565C0">
                    <div className="stat-value">{foodSavedKg} kg</div>
                    <div className="stat-label">Food Saved (Est.)</div>
                  </StatCard>
                  <StatCard $bg="#FFF3E0" $color="#E65100">
                    <div className="stat-value">Not yet rated</div>
                    <div className="stat-label">NGO Partner Rating</div>
                  </StatCard>
                  <StatCard $bg="#F3E5F5" $color="#7B1FA2">
                    <div className="stat-value">{completedListings.length >= 5 ? "Gold" : completedListings.length >= 1 ? "Silver" : "Community"}</div>
                    <div className="stat-label">Community Partner Tier</div>
                  </StatCard>
                </StatsGrid>

                <FormCard style={{ maxWidth: "100%", marginTop: "20px" }}>
                  <SectionTitle $margin="0 0 8px">
                    <IoLeafOutline /> Audited Impact Certificate
                  </SectionTitle>
                  <p style={{ color: "#556B64", fontSize: "0.92rem", lineHeight: "1.5" }}>
                    Your kitchen operations have consistently converted potential waste into warm meals. All pickups adhere to the ANNShare Food Quality & Hygiene Protocol, verified by receiving NGOs.
                  </p>
                </FormCard>
              </div>
            )}

            {/* TAB 7: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div>
                <SectionTitle>Recent Activity & Pickup Alerts</SectionTitle>
                <ItemsList>
                  <DonationCard>
                    <div className="item-main">
                      <div style={{ fontSize: "1.4rem", color: "#2E7D5B" }}>
                        <IoCheckmarkCircle />
                      </div>
                      <div className="item-info">
                        <h4>Pickup Confirmed by Hope Foundation</h4>
                        <div className="meta">
                          <span>48 Meal portions scheduled for 6:15 PM pickup</span>
                          <span>•</span>
                          <span>15 minutes ago</span>
                        </div>
                      </div>
                    </div>
                  </DonationCard>

                  <DonationCard>
                    <div className="item-main">
                      <div style={{ fontSize: "1.4rem", color: "#1565C0" }}>
                        <IoRestaurantOutline />
                      </div>
                      <div className="item-info">
                        <h4>Donation Published Successfully</h4>
                        <div className="meta">
                          <span>Your bakery items are now available to verified organizations</span>
                          <span>•</span>
                          <span>1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </DonationCard>
                </ItemsList>
              </div>
            )}

            {/* TAB 8: PROFILE & ACCOUNT SETTINGS */}
            {(activeTab === "profile" || activeTab === "settings") && (
              <AccountSettings role="donor" />
            )}
          </MainContent>
        </DashboardGrid>
      </Container>
    </DashboardWrapper>
  );
};

export default DonorDashboard;
