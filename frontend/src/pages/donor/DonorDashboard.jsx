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
  IoDocumentTextOutline,
  IoCallOutline,
  IoMailOutline,
  IoCheckmarkDoneCircleOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import AccountSettings from "../../components/dashboard/AccountSettings";
import { getListings, addListing, updateListingStatus, formatCurrentTime, normalizeCategory } from "../../data/listingsStore";
import { getRequests, updateRequestStatus } from "../../data/requestsStore";
import api from "../../services/api";
import ImageUploader from "../Donate/components/ImageUploader";
import { isValidPhone, formatPhoneNumber } from "../../utils/validation";

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

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  background: #FFFFFF;
  border-left: 5px solid #10B981;
  border-radius: 14px;
  padding: 14px 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(16, 185, 129, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 380px;
  animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  .toast-icon {
    color: #10B981;
    font-size: 1.6rem;
    flex-shrink: 0;
  }

  .toast-body {
    flex: 1;
    min-width: 0;

    h5 {
      margin: 0 0 2px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #174A3A;
    }

    p {
      margin: 0;
      font-size: 0.8rem;
      color: #556B64;
      line-height: 1.35;
    }
  }

  .toast-close {
    background: transparent;
    border: none;
    color: #94A3B8;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;

    &:hover {
      color: #174A3A;
    }
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const SuccessModalCard = styled.div`
  background: #FFFFFF;
  width: 100%;
  max-width: 480px;
  border-radius: 28px;
  padding: 32px 28px 28px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(23, 74, 58, 0.08);
  position: relative;
  text-align: center;
  animation: popUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes popUp {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(16px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .modal-close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #F8F5ED;
    color: #556B64;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease;

    &:hover {
      background: #174A3A;
      color: #FFFFFF;
    }
  }

  .success-badge-circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #ECFDF5;
    border: 3px solid #A7F3D0;
    color: #10B981;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.8rem;
    margin: 0 auto 18px;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.18);
  }

  h3 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 1.4rem;
    font-weight: 700;
    color: #174A3A;
    margin: 0 0 8px;
  }

  .modal-subtitle {
    font-size: 0.88rem;
    color: #556B64;
    line-height: 1.5;
    margin: 0 0 20px;
  }

  .summary-preview-box {
    background: #F8F5ED;
    border: 1px solid rgba(23, 74, 58, 0.1);
    border-radius: 16px;
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
    margin-bottom: 24px;

    .summary-img {
      width: 58px;
      height: 58px;
      border-radius: 12px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .summary-info {
      flex: 1;
      min-width: 0;

      h4 {
        margin: 0 0 4px;
        font-size: 0.95rem;
        font-weight: 700;
        color: #174A3A;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        margin: 0;
        font-size: 0.8rem;
        color: #556B64;
      }

      .summary-status-pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.72rem;
        font-weight: 600;
        color: #B45309;
        background: #FEF3C7;
        padding: 2px 8px;
        border-radius: 999px;
        margin-top: 5px;

        svg {
          font-size: 0.82rem;
        }
      }
    }
  }

  .modal-actions-row {
    display: flex;
    gap: 10px;

    button {
      flex: 1;
      padding: 12px 16px;
      border-radius: 14px;
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary-view {
      background: #174A3A;
      color: #FFFFFF;
      border: 1px solid #174A3A;
      box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);

      &:hover {
        background: #2E7D5B;
        border-color: #2E7D5B;
        transform: translateY(-1px);
      }
    }

    .btn-secondary-another {
      background: #FFFFFF;
      color: #174A3A;
      border: 1.5px solid rgba(23, 74, 58, 0.2);

      &:hover {
        background: #F8F5ED;
        border-color: #174A3A;
      }
    }
  }
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
    const donorOrg = user?.organization ? user.organization.trim().toLowerCase() : "";
    const donorOrgName = user?.orgName ? user.orgName.trim().toLowerCase() : "";
    const donorId = user?.id || user?._id;
    const currentName = user?.name ? user.name.trim().toLowerCase() : "";
    const currentEmail = user?.email ? user.email.trim().toLowerCase() : "";

    const filtered = all.filter((l) => {
      // Direct ID match
      if (donorId && l.donorId && String(l.donorId) === String(donorId)) return true;
      if (l.donorId === "donor-user" || l.donorId === "current-donor") return true;
      // Direct Email match
      if (currentEmail && l.donorEmail && l.donorEmail.toLowerCase() === currentEmail) return true;
      // Organization / Partner name match
      if (donorOrg && l.partner && (l.partner.toLowerCase() === donorOrg || l.partner.toLowerCase().includes(donorOrg) || donorOrg.includes(l.partner.toLowerCase()))) return true;
      if (donorOrgName && l.partner && (l.partner.toLowerCase() === donorOrgName || l.partner.toLowerCase().includes(donorOrgName) || donorOrgName.includes(l.partner.toLowerCase()))) return true;
      // Name match with contactName or partner
      if (currentName && l.contactName && (l.contactName.toLowerCase() === currentName || l.contactName.toLowerCase().includes(currentName) || currentName.includes(l.contactName.toLowerCase()))) return true;
      if (currentName && l.partner && (l.partner.toLowerCase().includes(currentName) || currentName.includes(l.partner.toLowerCase()))) return true;
      // Any custom donation created in this session that is not seeded
      if (l.isCustomDonation || (l.id && String(l.id).startsWith("listing-"))) return true;
      return false;
    });

    return filtered.map((l) => ({
      ...l,
      quantity: typeof l.quantity === "number" ? `${l.quantity} ${l.unit || "portions"}` : l.quantity,
      date: l.pickupDate || l.date || "Today",
    }));
  }, [user]);

  const [donations, setDonations] = useState(loadDonorDonations);

  const loadDonorRequests = React.useCallback(() => {
    const all = getRequests();
    const donorOrg = user?.organization ? user.organization.trim().toLowerCase() : "";
    const donorOrgName = user?.orgName ? user.orgName.trim().toLowerCase() : "";
    const donorId = user?.id || user?._id;
    const currentName = user?.name ? user.name.trim().toLowerCase() : "";
    const currentEmail = user?.email ? user.email.trim().toLowerCase() : "";

    const currentListings = getListings().filter((l) => {
      if (donorId && l.donorId && String(l.donorId) === String(donorId)) return true;
      if (l.donorId === "donor-user" || l.donorId === "current-donor") return true;
      if (currentEmail && l.donorEmail && l.donorEmail.toLowerCase() === currentEmail) return true;
      if (donorOrg && l.partner && (l.partner.toLowerCase() === donorOrg || l.partner.toLowerCase().includes(donorOrg) || donorOrg.includes(l.partner.toLowerCase()))) return true;
      if (donorOrgName && l.partner && (l.partner.toLowerCase() === donorOrgName || l.partner.toLowerCase().includes(donorOrgName) || donorOrgName.includes(l.partner.toLowerCase()))) return true;
      if (currentName && l.contactName && (l.contactName.toLowerCase() === currentName || l.contactName.toLowerCase().includes(currentName) || currentName.includes(l.contactName.toLowerCase()))) return true;
      if (currentName && l.partner && (l.partner.toLowerCase().includes(currentName) || currentName.includes(l.partner.toLowerCase()))) return true;
      if (l.isCustomDonation || (l.id && String(l.id).startsWith("listing-"))) return true;
      return false;
    });
    const donorListingIds = new Set(currentListings.map((l) => String(l.id)));

    const filtered = all.filter((r) => {
      if (donorId && r.donorId && String(r.donorId) === String(donorId)) return true;
      if (r.donorId === "donor-user" || r.donorId === "current-donor") return true;
      if (donorOrg && r.donorName && (r.donorName.toLowerCase() === donorOrg || r.donorName.toLowerCase().includes(donorOrg) || donorOrg.includes(r.donorName.toLowerCase()))) return true;
      if (donorOrgName && r.donorName && (r.donorName.toLowerCase() === donorOrgName || r.donorName.toLowerCase().includes(donorOrgName) || donorOrgName.includes(r.donorName.toLowerCase()))) return true;
      if (currentName && r.donorName && (r.donorName.toLowerCase().includes(currentName) || currentName.includes(r.donorName.toLowerCase()))) return true;
      if (r.listingId && donorListingIds.has(String(r.listingId))) return true;
      return false;
    });

    return filtered;
  }, [user]);

  const [requests, setRequests] = useState(loadDonorRequests);

  useEffect(() => {
    setDonations(loadDonorDonations());
    setRequests(loadDonorRequests());

    const handleListingsUpdate = () => {
      setDonations(loadDonorDonations());
      setRequests(loadDonorRequests());
    };
    const handleRequestsUpdate = () => {
      setRequests(loadDonorRequests());
    };

    window.addEventListener("annshare_listings_updated", handleListingsUpdate);
    window.addEventListener("annshare_requests_updated", handleRequestsUpdate);
    window.addEventListener("storage", handleListingsUpdate);
    return () => {
      window.removeEventListener("annshare_listings_updated", handleListingsUpdate);
      window.removeEventListener("annshare_requests_updated", handleRequestsUpdate);
      window.removeEventListener("storage", handleListingsUpdate);
    };
  }, [loadDonorDonations, loadDonorRequests]);

  const handleAcceptRequest = (req) => {
    const donorPhone = user?.phone || "+977 980-1234567";
    const donorLocation = user?.location || "Kathmandu";
    updateRequestStatus(req.id, "Confirmed", {
      donorPhone,
      donorLocation,
    });
    if (req.listingId) {
      updateListingStatus(req.listingId, "matched", req.ngoName || req.receiverName || "Verified NGO Partner");
    }
    setRequests(loadDonorRequests());
    setDonations(loadDonorDonations());
  };

  const handleDeclineRequest = (req) => {
    updateRequestStatus(req.id, "Declined");
    if (req.listingId) {
      updateListingStatus(req.listingId, "available", null);
    }
    setRequests(loadDonorRequests());
    setDonations(loadDonorDonations());
  };

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

  const getInitialPickupSlot = () => {
    const now = new Date();
    const startTime = formatCurrentTime(now);
    const endTime = formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000));
    return `Today, ${startTime} – ${endTime}`;
  };

  const [newFood, setNewFood] = useState({
    title: "",
    category: "Prepared Meals",
    quantity: "",
    unit: "portions",
    pickupTime: getInitialPickupSlot(),
    instructions: "",
    images: [],
  });

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastCreatedListing, setLastCreatedListing] = useState(null);
  const [createDonationError, setCreateDonationError] = useState("");

  const handleCreateDonation = (e) => {
    e.preventDefault();
    setCreateDonationError("");

    if (!newFood.title.trim()) {
      setCreateDonationError("Food title or dish name is required.");
      return;
    }

    if (!newFood.quantity || Number(newFood.quantity) <= 0) {
      setCreateDonationError("Please enter a valid quantity greater than 0.");
      return;
    }

    const now = new Date();
    const currentFormattedTime = formatCurrentTime(now);
    const fallbackImg = `/food/food${Math.floor(Math.random() * 8) + 1}.jpg`;
    const chosenImage = newFood.images && newFood.images.length > 0 ? newFood.images[0] : fallbackImg;
    const chosenImages = newFood.images && newFood.images.length > 0 ? newFood.images : [fallbackImg];
    const pickupWindow = newFood.pickupTime || `Today, ${currentFormattedTime} – ${formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000))}`;
    const donorPhone = user?.phone ? formatPhoneNumber(user.phone) : "+977 980-1234567";

    const newListing = {
      title: newFood.title.trim(),
      category: normalizeCategory(newFood.category),
      quantity: Number(newFood.quantity) || 20,
      unit: newFood.unit || "portions",
      condition: "Freshly Prepared",
      partner: user?.organization || user?.name || "Your Organization",
      location: user?.location || "Kathmandu Kitchen",
      area: user?.location ? user?.location.split(",")[0].trim() : "Kathmandu",
      distance: "1.2 km",
      status: "available",
      pickupDate: "Today",
      pickupTime: pickupWindow,
      postedTime: currentFormattedTime,
      createdAt: now.toISOString(),
      image: chosenImage,
      images: chosenImages,
      description: newFood.instructions || "Fresh surplus food ready for pickup.",
      safetyInfo: `Prepared at ${currentFormattedTime} today under food hygiene safety standards.`,
      contactName: user?.name || "Donor",
      contactPhone: donorPhone,
      donorId: user?.id || `donor-${Date.now()}`,
      matchedWith: null,
    };

    addListing(newListing);
    setDonations(loadDonorDonations());
    setLastCreatedListing(newListing);
    setNewFood({
      title: "",
      category: "Prepared Meals",
      quantity: "",
      unit: "portions",
      pickupTime: getInitialPickupSlot(),
      instructions: "",
      images: [],
    });

    setIsSuccessMessage(true);
    setShowToast(true);

    setTimeout(() => {
      setIsSuccessMessage(false);
      setShowToast(false);
    }, 5000);
  };

  const donorName = user?.name || "Donor";
  const donorOrg = user?.organization || user?.name || "Your Organization";

  // Filter requests by 3-step lifecycle
  const adminApprovedRequests = requests.filter((r) => {
    const s = (r.status || "").toLowerCase();
    return s.includes("approved") && !s.includes("declined") && !s.includes("rejected");
  });

  const confirmedRequests = requests.filter((r) => {
    const s = (r.status || "").toLowerCase();
    return s.includes("confirmed") || s.includes("matched");
  });

  // Dynamic Notifications Management
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const fetchDonorNotifications = React.useCallback(async () => {
    try {
      setNotificationsLoading(true);
      const data = await api.notifications.getAll({ role: "donor", userId: user?.id || "" });
      if (Array.isArray(data) && data.length > 0) {
        setNotificationsList(data);
      } else {
        // Build dynamic contextual fallback notifications
        const list = [];
        if (adminApprovedRequests.length > 0) {
          adminApprovedRequests.forEach((req, idx) => {
            list.push({
              id: `req-app-${req.id || idx}`,
              title: "Action Required: NGO Request Verified by Admin",
              desc: `${req.ngoOrg || req.ngoName || "Verified NGO"} requested "${req.foodName || "your listing"}". Accept to exchange contacts for pickup!`,
              time: req.requestTime || req.createdAt || "Just now",
              read: false,
              linkTab: "requests",
              category: "match",
            });
          });
        }
        if (confirmedRequests.length > 0) {
          confirmedRequests.forEach((req, idx) => {
            list.push({
              id: `req-conf-${req.id || idx}`,
              title: "Match Confirmed & Contact Shared",
              desc: `Direct contact shared with ${req.ngoOrg || req.ngoName || "NGO"}. Pickup scheduled for ${req.pickupWindow || "today"}.`,
              time: "Recent",
              read: true,
              linkTab: "requests",
              category: "match",
            });
          });
        }
        if (donations.length > 0) {
          donations.slice(0, 4).forEach((don, idx) => {
            list.push({
              id: `don-${don.id || idx}`,
              title: don.status === "available" ? "Donation Approved & Live" : "Donation Listed",
              desc: `"${don.title}" (${don.quantity}) is ${don.status === "available" ? "active and visible to verified community shelters." : "currently under admin review."}`,
              time: don.postedTime || "Today",
              read: true,
              linkTab: "my-donations",
              category: "listing",
            });
          });
        }
        setNotificationsList(list);
      }
    } catch (err) {
      console.warn("Using contextual local notifications:", err);
    } finally {
      setNotificationsLoading(false);
    }
  }, [user, adminApprovedRequests, confirmedRequests, donations]);

  useEffect(() => {
    fetchDonorNotifications();
  }, [fetchDonorNotifications]);

  const handleMarkNotificationRead = async (notif) => {
    setNotificationsList((prev) =>
      prev.map((n) => ((n.id && n.id === notif.id) || (n._id && n._id === notif.id) ? { ...n, read: true } : n))
    );
    try {
      if (notif._id) {
        await api.notifications.markRead(notif._id);
      }
    } catch {}
    if (notif.linkTab) {
      const target = notif.linkTab.toLowerCase();
      if (target.includes("request")) handleTabChange("requests");
      else if (target.includes("donation") || target.includes("listing")) handleTabChange("my-donations");
      else handleTabChange(target);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await api.notifications.markAllRead({ role: "donor", userId: user?.id || "" });
    } catch {}
  };

  const unreadNotificationsCount = notificationsList.filter((n) => !n.read).length;

  // Sidebar dynamic badge computations
  const opportunitiesCount = getListings().filter(
    (l) => l.status === "available" && l.partner !== (user?.organization || donorName)
  ).length;

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
                $isActive={activeTab === "requests" || activeTab === "incoming-requests"}
                onClick={() => handleTabChange("requests")}
              >
                <div className="left-cluster">
                  <span className="icon"><IoDocumentTextOutline /></span>
                  <span>Incoming Requests</span>
                </div>
                <span
                  className="badge-count"
                  style={{
                    background: adminApprovedRequests.length > 0 ? "#E65100" : undefined,
                    color: adminApprovedRequests.length > 0 ? "#FFFFFF" : undefined,
                    fontWeight: 700,
                  }}
                >
                  {adminApprovedRequests.length > 0 ? `${adminApprovedRequests.length} new` : requests.length}
                </span>
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
                <span
                  className="badge-count"
                  style={{
                    background: unreadNotificationsCount > 0 ? "#E11D48" : undefined,
                    color: unreadNotificationsCount > 0 ? "#FFFFFF" : undefined,
                  }}
                >
                  {unreadNotificationsCount}
                </span>
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

                {/* Admin Approved Request Action Notice */}
                {adminApprovedRequests.length > 0 && (
                  <div
                    style={{
                      background: "#FFFBEB",
                      border: "1.5px solid #FCD34D",
                      borderRadius: "18px",
                      padding: "18px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <IoAlertCircleOutline style={{ color: "#D97706", fontSize: "1.8rem", flexShrink: 0 }} />
                      <div>
                        <strong style={{ color: "#92400E", fontSize: "1.02rem" }}>
                          {adminApprovedRequests.length} Food Request{adminApprovedRequests.length > 1 ? "s" : ""} Approved by Admin!
                        </strong>
                        <div style={{ color: "#78350F", fontSize: "0.86rem", marginTop: "2px" }}>
                          Verified NGOs are waiting for your confirmation. Accept to unlock & exchange direct contact numbers for pickup coordination.
                        </div>
                      </div>
                    </div>
                    <QuickDonateBtn
                      onClick={() => handleTabChange("requests")}
                      style={{ width: "auto", background: "#D97706", borderColor: "#D97706" }}
                    >
                      <span>Review & Share Contact →</span>
                    </QuickDonateBtn>
                  </div>
                )}

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

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "24px 0 14px" }}>
                  <SectionTitle $margin="0">
                    Incoming NGO Requests ({requests.length})
                  </SectionTitle>
                  <button
                    type="button"
                    onClick={() => handleTabChange("requests")}
                    style={{ background: "none", border: "none", color: "#174A3A", fontWeight: 700, cursor: "pointer" }}
                  >
                    View all requests →
                  </button>
                </div>

                <ItemsList>
                  {requests.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "24px 20px", color: "#71827B", background: "#FFFFFF", borderRadius: "18px", border: "1px solid rgba(23, 74, 58, 0.08)" }}>
                      <p style={{ margin: 0 }}>No food requests received yet. When an NGO requests your donations, they will appear here after Admin verification.</p>
                    </div>
                  ) : (
                    requests.slice(0, 3).map((req) => {
                      const s = (req.status || "").toLowerCase();
                      const isAdminApproved = s.includes("approved") && !s.includes("declined") && !s.includes("rejected");
                      const isConfirmed = s.includes("confirmed") || s.includes("matched");

                      return (
                        <DonationCard key={req.id}>
                          <div className="item-main">
                            <img src={req.image || "/food.png"} alt={req.foodTitle} className="item-img" />
                            <div className="item-info">
                              <h4>{req.foodTitle}</h4>
                              <div className="meta">
                                <span><strong>{req.portions}</strong> requested</span>
                                <span>•</span>
                                <span>NGO: <strong>{req.ngoName || req.receiverName}</strong></span>
                                <span>•</span>
                                <span><IoLocationOutline /> {req.location}</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span
                              className="status-badge"
                              style={{
                                background: isConfirmed ? "#E8F5E9" : isAdminApproved ? "#FEF3C7" : "#F3F4F1",
                                color: isConfirmed ? "#166534" : isAdminApproved ? "#B45309" : "#4B5563",
                              }}
                            >
                              {isConfirmed
                                ? "✓ Matched & Confirmed"
                                : isAdminApproved
                                ? "🔔 Admin Verified · Action Required"
                                : s.includes("pending")
                                ? "⏳ Pending Admin Approval"
                                : s.includes("declined")
                                ? "Declined"
                                : "Under Review"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleTabChange("requests")}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#174A3A",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Details →
                            </button>
                          </div>
                        </DonationCard>
                      );
                    })
                  )}
                </ItemsList>
              </div>
            )}

            {/* TAB: INCOMING REQUESTS (ADMIN APPROVED & WORKFLOW) */}
            {(activeTab === "requests" || activeTab === "incoming-requests") && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <div>
                    <SectionTitle $margin="0 0 4px">Incoming Food Requests & Matches</SectionTitle>
                    <p style={{ color: "#71827B", margin: 0, fontSize: "0.9rem" }}>
                      Review claim requests verified by platform moderators. Accepting unlocks and exchanges direct contact phone numbers.
                    </p>
                  </div>
                </div>

                <ItemsList>
                  {requests.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 20px", color: "#71827B", background: "#FFFFFF", borderRadius: "18px", border: "1px solid rgba(23, 74, 58, 0.08)" }}>
                      <IoDocumentTextOutline size={40} style={{ color: "#174A3A", marginBottom: "12px" }} />
                      <h4 style={{ color: "#174A3A", marginBottom: "6px" }}>No Food Requests Yet</h4>
                      <p style={{ margin: 0 }}>
                        When verified NGOs request food from your listings, Admin moderators verify them first. Approved requests will show here for your confirmation.
                      </p>
                    </div>
                  ) : (
                    requests.map((req) => {
                      const s = (req.status || "").toLowerCase();
                      const isAdminApproved = s.includes("approved") && !s.includes("declined") && !s.includes("rejected");
                      const isConfirmed = s.includes("confirmed") || s.includes("matched");
                      const isPendingAdmin = s.includes("pending");
                      const isDeclined = s.includes("declined");

                      return (
                        <div
                          key={req.id}
                          style={{
                            background: "#FFFFFF",
                            borderRadius: "18px",
                            padding: "22px",
                            border: isAdminApproved ? "1.5px solid #FCD34D" : "1px solid rgba(23, 74, 58, 0.08)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                              <img
                                src={req.image || "/food.png"}
                                alt={req.foodTitle}
                                style={{ width: "68px", height: "68px", borderRadius: "14px", objectFit: "cover", flexShrink: 0 }}
                              />
                              <div>
                                <h4 style={{ margin: "0 0 4px", fontSize: "1.08rem", color: "#174A3A" }}>{req.foodTitle}</h4>
                                <div style={{ fontSize: "0.84rem", color: "#71827B", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                  <span><strong>{req.portions}</strong> requested</span>
                                  <span>•</span>
                                  <span>Requested by: <strong style={{ color: "#174A3A" }}>{req.ngoName || req.receiverName}</strong></span>
                                  <span>•</span>
                                  <span><IoLocationOutline /> {req.location}</span>
                                </div>
                                {req.reason && (
                                  <div style={{ fontSize: "0.82rem", color: "#4B5563", marginTop: "6px", fontStyle: "italic", background: "#F8F5ED", padding: "6px 12px", borderRadius: "8px", display: "inline-block" }}>
                                    "{req.reason}"
                                  </div>
                                )}
                              </div>
                            </div>

                            <span
                              className="status-badge"
                              style={{
                                padding: "6px 14px",
                                borderRadius: "20px",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                background: isConfirmed ? "#E8F5E9" : isAdminApproved ? "#FEF3C7" : isDeclined ? "#FEE2E2" : "#F3F4F1",
                                color: isConfirmed ? "#166534" : isAdminApproved ? "#B45309" : isDeclined ? "#991B1B" : "#4B5563",
                              }}
                            >
                              {isConfirmed
                                ? "✓ Matched · Contact Exchanged"
                                : isAdminApproved
                                ? "🔔 Admin Approved · Awaiting Your Confirmation"
                                : isPendingAdmin
                                ? "⏳ Pending Admin Moderation"
                                : isDeclined
                                ? "Declined by You"
                                : "Under Review"}
                            </span>
                          </div>

                          {/* ACTION BUTTONS WHEN ADMIN HAS APPROVED */}
                          {isAdminApproved && (
                            <div
                              style={{
                                background: "#FFFBEB",
                                padding: "16px 18px",
                                borderRadius: "14px",
                                border: "1px solid #FDE68A",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "14px",
                                flexWrap: "wrap",
                              }}
                            >
                              <div style={{ fontSize: "0.88rem", color: "#92400E" }}>
                                <strong>Admin Moderator Verified: </strong>
                                This request has been approved by ANNShare. Accept to share your phone and pickup address with <strong>{req.ngoName || req.receiverName}</strong>.
                              </div>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                  type="button"
                                  onClick={() => handleAcceptRequest(req)}
                                  style={{
                                    background: "#185C4A",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "10px 18px",
                                    borderRadius: "12px",
                                    fontSize: "0.88rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    boxShadow: "0 2px 8px rgba(24, 92, 74, 0.2)",
                                  }}
                                >
                                  <IoCheckmarkCircle size={18} /> Accept & Share Contact
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeclineRequest(req)}
                                  style={{
                                    background: "transparent",
                                    color: "#DC2626",
                                    border: "1.5px solid #FCA5A5",
                                    padding: "10px 16px",
                                    borderRadius: "12px",
                                    fontSize: "0.88rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                  }}
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          )}

                          {/* UNLOCKED CONTACT DETAILS WHEN MATCHED / CONFIRMED */}
                          {isConfirmed && (
                            <div
                              style={{
                                background: "#F0FDF4",
                                padding: "16px 18px",
                                borderRadius: "14px",
                                border: "1.5px solid #BBF7D0",
                              }}
                            >
                              <div style={{ fontWeight: 700, color: "#166534", fontSize: "0.92rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                                <IoShieldCheckmark size={18} /> Contact Info Exchanged for Pickup Coordination
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "0.86rem" }}>
                                <div>
                                  <span style={{ color: "#6B7280", fontSize: "0.78rem", textTransform: "uppercase" }}>NGO Contact Phone</span>
                                  <div style={{ fontWeight: 700, color: "#166534", marginTop: "2px" }}>
                                    📞 {req.ngoPhone || req.contact || "+977 984-1234567"}
                                  </div>
                                </div>
                                <div>
                                  <span style={{ color: "#6B7280", fontSize: "0.78rem", textTransform: "uppercase" }}>Organization Name</span>
                                  <div style={{ fontWeight: 700, color: "#12201B", marginTop: "2px" }}>
                                    {req.ngoOrg || req.ngoName || "Verified NGO Partner"}
                                  </div>
                                </div>
                                <div>
                                  <span style={{ color: "#6B7280", fontSize: "0.78rem", textTransform: "uppercase" }}>Designated Window</span>
                                  <div style={{ fontWeight: 700, color: "#12201B", marginTop: "2px" }}>
                                    ⏱️ {req.pickupWindow || "Today, Flexible"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
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
                    <span>Donation submitted! It is now pending Admin approval before appearing publicly in the NGO marketplace.</span>
                  </div>
                )}

                {createDonationError && (
                  <div
                    style={{
                      background: "#FEF2F2",
                      color: "#B91C1C",
                      border: "1px solid #FCA5A5",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      marginBottom: "16px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IoAlertCircleOutline size={20} />
                    <span>{createDonationError}</span>
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
                  {donations.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px 20px", background: "#FFFFFF", borderRadius: "18px", border: "1px solid rgba(23,74,58,0.08)" }}>
                      <IoRestaurantOutline size={44} style={{ color: "#9CA3AF", marginBottom: "10px" }} />
                      <h3 style={{ margin: "0 0 6px", color: "#174A3A" }}>No active donations yet</h3>
                      <p style={{ margin: "0 0 18px", color: "#71827B", fontSize: "0.9rem" }}>
                        List your excess portions to share with verified community shelters across Kathmandu.
                      </p>
                      <QuickDonateBtn onClick={() => handleTabChange("donate")} style={{ width: "auto", margin: "0 auto" }}>
                        <IoAddCircleOutline size={18} /> Create Donation
                      </QuickDonateBtn>
                    </div>
                  ) : (
                    donations.map((item) => (
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
                          <span className={`status-badge ${(item.status || "").toLowerCase().replace(/\s+/g, '-')}`}>
                            {(item.status || "").toLowerCase().includes("pending")
                              ? "Pending Admin Approval"
                              : item.status === "available" || item.status === "Available"
                              ? "Active · Awaiting NGO"
                              : item.status === "rejected" || item.status === "Rejected"
                              ? "Rejected by Admin"
                              : item.status === "matched"
                              ? "Claimed · Pickup Pending"
                              : "Completed"}
                          </span>
                        </div>
                      </DonationCard>
                    ))
                  )}
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                  <SectionTitle $margin="0">Activity, Requests & Pickup Alerts</SectionTitle>
                  {unreadNotificationsCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllNotificationsRead}
                      style={{
                        background: "#E8F5E9",
                        color: "#2E7D5B",
                        border: "1px solid #A7F3D0",
                        padding: "8px 14px",
                        borderRadius: "10px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <IoCheckmarkDoneCircleOutline size={16} /> Mark All as Read
                    </button>
                  )}
                </div>

                <ItemsList>
                  {notificationsList.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 20px", color: "#71827B", background: "#FFFFFF", borderRadius: "18px", border: "1px solid rgba(23,74,58,0.08)" }}>
                      <IoNotificationsOutline size={40} style={{ color: "#9CA3AF", marginBottom: "8px" }} />
                      <h4 style={{ margin: "0 0 4px", color: "#174A3A" }}>No notifications yet</h4>
                      <p style={{ margin: 0, fontSize: "0.88rem" }}>You'll be notified immediately when an NGO requests your food or an admin approves your listing.</p>
                    </div>
                  ) : (
                    notificationsList.map((item) => {
                      const isUnread = !item.read;
                      const isMatch = item.category === "match" || (item.title && item.title.includes("Request"));
                      const isListing = item.category === "listing" || (item.title && item.title.includes("Donation"));

                      return (
                        <DonationCard
                          key={item.id || item._id}
                          style={{
                            background: isUnread ? "#FAFDFB" : "#FFFFFF",
                            borderColor: isUnread ? "#86EFAC" : "rgba(23, 74, 58, 0.08)",
                            boxShadow: isUnread ? "0 4px 14px rgba(46, 125, 91, 0.08)" : undefined,
                            cursor: "pointer",
                          }}
                          onClick={() => handleMarkNotificationRead(item)}
                        >
                          <div className="item-main">
                            <div
                              style={{
                                fontSize: "1.4rem",
                                color: isMatch ? "#D97706" : isListing ? "#2E7D5B" : "#1565C0",
                                background: isMatch ? "#FEF3C7" : isListing ? "#E8F5E9" : "#E3F2FD",
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {isMatch ? <IoAlertCircleOutline /> : isListing ? <IoRestaurantOutline /> : <IoCheckmarkCircle />}
                            </div>
                            <div className="item-info">
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <h4 style={{ margin: 0, color: "#174A3A" }}>{item.title}</h4>
                                {isUnread && (
                                  <span
                                    style={{
                                      background: "#E11D48",
                                      color: "#FFFFFF",
                                      fontSize: "0.68rem",
                                      fontWeight: 800,
                                      padding: "2px 6px",
                                      borderRadius: "6px",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    New
                                  </span>
                                )}
                              </div>
                              <p style={{ margin: "4px 0 6px", fontSize: "0.88rem", color: "#4A5D54", lineHeight: "1.4" }}>
                                {item.desc || item.message}
                              </p>
                              <div className="meta">
                                <span>{item.time || "Recent"}</span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <QuickDonateBtn
                              type="button"
                              style={{
                                width: "auto",
                                padding: "8px 14px",
                                fontSize: "0.82rem",
                                background: isMatch ? "#D97706" : "#174A3A",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkNotificationRead(item);
                              }}
                            >
                              <span>{isMatch ? "Review Request →" : "View Details →"}</span>
                            </QuickDonateBtn>
                          </div>
                        </DonationCard>
                      );
                    })
                  )}
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

      {/* SUCCESS TOAST NOTIFICATION */}
      {showToast && (
        <ToastContainer>
          <IoCheckmarkCircle className="toast-icon" />
          <div className="toast-body">
            <h5>Submitted Successfully! 🎉</h5>
            <p>Your listing was created and sent for Admin approval.</p>
          </div>
          <button className="toast-close" onClick={() => setShowToast(false)}>
            <IoClose />
          </button>
        </ToastContainer>
      )}
    </DashboardWrapper>
  );
};

export default DonorDashboard;
