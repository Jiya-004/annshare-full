import React, { useState, useEffect, useRef } from "react";
import {
  IoNotificationsOutline,
  IoHeartOutline,
  IoChevronDown,
  IoClose,
  IoPersonOutline,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoHelpCircleOutline,
  IoBarChartOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoCheckmarkCircle,
  IoMenu,
  IoShieldCheckmark,
  IoHeart,
  IoPerson,
  IoPersonAddOutline,
  IoLogInOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";

import {
  HeaderWrapper,
  HeaderContainer,
  BrandZone,
  CenterNavZone,
  FloatingPillBar,
  PillNavItem,
  PillDivider,
  RightActionsZone,
  ActionButtonWrapper,
  IconButton,
  SavedPillButton,
  LoginTextButton,
  SignUpPillButton,
  VisitorAvatarButton,
  VisitorMenuDropdown,
  VisitorMenuItem,
  ProfilePillButton,
  ProfileMenuDropdown,
  ProfileMenuItem,
  MenuDivider,
  NotificationDropdownCard,
  MobileHeaderTopRow,
  MobileActionsCluster,
  MobileScrollablePillNav,
  MobilePill,
  MobileDrawer,
  DrawerBackdrop,
} from "./style";


import ANNShareLogo from "./ANNShareLogo";
import DonateFoodModal from "./DonateFoodModal";
import NeedFoodModal from "./NeedFoodModal";
import SavedDropdown from "./SavedDropdown";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDonatePage = location.pathname === "/donate" || location.pathname.startsWith("/donor/dashboard");
  const isFindFoodPage = location.pathname === "/find-food" || location.pathname.startsWith("/food/") || location.pathname.startsWith("/ngo/dashboard");
  const isHowItWorksPage = location.pathname === "/how-it-works";

  const {
    user,
    role,
    isAuthenticated,
    requireAuth,
    logout,
    switchRole,
  } = useAuth();

  const { wishlist } = useWishlist();

  // Scroll state for dynamic morphing (reduced height & shadow on scroll)
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown states
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVisitorOpen, setIsVisitorOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Active pill selection in floating center nav
  const [activeNavPill, setActiveNavPill] = useState(null);

  // Modal flows for primary marketplace actions
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isNeedFoodModalOpen, setIsNeedFoodModalOpen] = useState(false);

  // Initial notifications required by prompt
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New food donation nearby",
      desc: "30 meal portions available · Himalayan Kitchen (Thamel).",
      time: "10m ago",
      unread: true,
      icon: <IoRestaurantOutline />,
    },
    {
      id: 2,
      title: "Pickup confirmed",
      desc: "Your donation has been accepted by Hope Foundation.",
      time: "25m ago",
      unread: true,
      icon: <IoCheckmarkCircle style={{ color: "#2E7D5B" }} />,
    },
    {
      id: 3,
      title: "New request",
      desc: "A verified organization requested your bakery surplus.",
      time: "1h ago",
      unread: true,
      icon: <IoPeopleOutline />,
    },
  ]);

  const notifRef = useRef(null);
  const savedRef = useRef(null);
  const profileRef = useRef(null);
  const visitorRef = useRef(null);

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (savedRef.current && !savedRef.current.contains(e.target)) {
        setIsSavedOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (visitorRef.current && !visitorRef.current.contains(e.target)) {
        setIsVisitorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Nav Handlers
  const handleHaveFoodClick = () => {
    setActiveNavPill("have-food");
    navigate("/donate");
  };

  const handleNeedFoodClick = () => {
    setActiveNavPill("need-food");
    navigate("/find-food");
  };

  const handleExploreClick = () => {
    setActiveNavPill("explore");
    if (location.pathname !== "/") {
      navigate("/#food-discovery");
    } else {
      const el = document.getElementById("food-discovery") || document.getElementById("network") || document.getElementById("who-is-it-for") || document.getElementById("hero");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHowItWorksClick = () => {
    setActiveNavPill("how-it-works");
    navigate("/how-it-works");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <HeaderWrapper $isScrolled={isScrolled}>
        {/* DESKTOP & TABLET HEADER ROW */}
        <HeaderContainer>
          {/* 1. LEFT: BRAND LOGO FROM PUBLIC */}
          <BrandZone>
            <ANNShareLogo href="/" />
          </BrandZone>

          {/* 2. CENTER: AIRBNB-INSPIRED FLOATING PILL NAVIGATION */}
          <CenterNavZone>
            <FloatingPillBar role="navigation" aria-label="Main Marketplace Actions">
              {/* Pill 1: I Have Food */}
              <PillNavItem
                type="button"
                $isActive={activeNavPill === "have-food" || isDonatePage}
                onClick={handleHaveFoodClick}
                title="Restaurants, Hotels, Cafés, Bakeries, Food Donors"
              >
                <span className="pill-icon">
                  <IoRestaurantOutline />
                </span>
                <span className="pill-label">I Have Food</span>
              </PillNavItem>

              <PillDivider />

              {/* Pill 2: I Need Food */}
              <PillNavItem
                type="button"
                $isActive={activeNavPill === "need-food" || isFindFoodPage}
                onClick={handleNeedFoodClick}
                title="NGOs, Community Shelters, Relief Organizations"
              >
                <span className="pill-icon">
                  <IoPeopleOutline />
                </span>
                <span className="pill-label">I Need Food</span>
              </PillNavItem>

              <PillDivider />

              {/* Pill 3: Explore */}
              <PillNavItem
                type="button"
                $isActive={activeNavPill === "explore"}
                onClick={handleExploreClick}
                title="Browse available food donations and partner organizations"
              >
                <span className="pill-icon">
                  <IoSearchOutline />
                </span>
                <span className="pill-label">Explore</span>
              </PillNavItem>

              <PillDivider />

              {/* Pill 4: How It Works */}
              <PillNavItem
                type="button"
                $isActive={activeNavPill === "how-it-works" || isHowItWorksPage}
                onClick={handleHowItWorksClick}
                title="Explain the ANNShare service workflow"
              >
                <span className="pill-icon">
                  <IoHelpCircleOutline />
                </span>
                <span className="pill-label">How It Works</span>
              </PillNavItem>
            </FloatingPillBar>
          </CenterNavZone>

          {/* 3. RIGHT SIDE: NOTIFICATIONS, SAVED, AUTH / PROFILE */}
          <RightActionsZone>
            {/* Notification Bell */}
            <ActionButtonWrapper ref={notifRef}>
              <IconButton
                type="button"
                $isOpen={isNotifOpen}
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsSavedOpen(false);
                  setIsProfileOpen(false);
                  setIsVisitorOpen(false);
                }}
                aria-label="View notifications"
              >
                <IoNotificationsOutline />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </IconButton>

              {/* Notifications Dropdown */}
              <NotificationDropdownCard $isOpen={isNotifOpen}>
                <div className="notif-header">
                  <h4>
                    <IoNotificationsOutline /> Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      className="mark-read-btn"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="notif-list">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${n.unread ? "unread" : ""}`}
                      onClick={() => handleNotificationClick(n.id)}
                    >
                      <div className="notif-icon">{n.icon}</div>
                      <div className="notif-content">
                        <span className="title">{n.title}</span>
                        <span className="desc">{n.desc}</span>
                        <span className="time">{n.time}</span>
                      </div>
                      {n.unread && <span className="unread-indicator" />}
                    </div>
                  ))}
                </div>
              </NotificationDropdownCard>
            </ActionButtonWrapper>

            {/* Saved Bookmarks */}
            <ActionButtonWrapper ref={savedRef}>
              <SavedPillButton
                type="button"
                $isOpen={isSavedOpen}
                onClick={() => {
                  setIsSavedOpen(!isSavedOpen);
                  setIsNotifOpen(false);
                  setIsProfileOpen(false);
                  setIsVisitorOpen(false);
                }}
                aria-label="Saved items"
              >
                <IoHeartOutline className="heart-icon" />
                <span>Saved</span>
                {wishlist.length > 0 && <span className="saved-badge">{wishlist.length}</span>}
              </SavedPillButton>

              {/* Saved Dropdown */}
              <SavedDropdown
                isOpen={isSavedOpen}
                onClose={() => setIsSavedOpen(false)}
              />
            </ActionButtonWrapper>

            {/* Authenticated / Visitor Switch */}
            {!isAuthenticated ? (
              <ActionButtonWrapper ref={visitorRef}>
                <VisitorAvatarButton
                  type="button"
                  $isOpen={isVisitorOpen}
                  onClick={() => {
                    setIsVisitorOpen(!isVisitorOpen);
                    setIsNotifOpen(false);
                    setIsSavedOpen(false);
                    setIsProfileOpen(false);
                  }}
                  aria-label="User account menu"
                >
                  <IoMenuOutline className="menu-icon" />
                  <div className="visitor-avatar">
                    <IoPerson />
                  </div>
                </VisitorAvatarButton>

                {/* Visitor Account Dropdown */}
                <VisitorMenuDropdown $isOpen={isVisitorOpen}>
                  <div className="visitor-header-card">
                    <span className="greeting-title">Welcome to ANNShare</span>
                    <span className="greeting-sub">Join Kathmandu's food rescue community</span>
                  </div>

                  <VisitorMenuItem
                    type="button"
                    $isPrimary
                    onClick={() => {
                      setIsVisitorOpen(false);
                      requireAuth({ role: "donor", intent: "overview", mode: "signup" });
                    }}
                  >
                    <span className="item-icon">
                      <IoPersonAddOutline />
                    </span>
                    <div className="item-text">
                      <span className="item-title">Sign up / Create account</span>
                      <span className="item-hint">Join as Food Donor or NGO</span>
                    </div>
                  </VisitorMenuItem>

                  <VisitorMenuItem
                    type="button"
                    onClick={() => {
                      setIsVisitorOpen(false);
                      requireAuth({ role: "donor", intent: "overview", mode: "signin" });
                    }}
                  >
                    <span className="item-icon">
                      <IoLogInOutline />
                    </span>
                    <div className="item-text">
                      <span className="item-title">Log in</span>
                      <span className="item-hint">Access your partner dashboard</span>
                    </div>
                  </VisitorMenuItem>

                  <MenuDivider />

                  <VisitorMenuItem
                    type="button"
                    onClick={() => {
                      setIsVisitorOpen(false);
                      handleHaveFoodClick();
                    }}
                  >
                    <span className="item-icon">
                      <IoRestaurantOutline />
                    </span>
                    <div className="item-text">
                      <span className="item-title">List Surplus Food</span>
                      <span className="item-hint">For restaurants & food businesses</span>
                    </div>
                  </VisitorMenuItem>

                  <VisitorMenuItem
                    type="button"
                    onClick={() => {
                      setIsVisitorOpen(false);
                      handleNeedFoodClick();
                    }}
                  >
                    <span className="item-icon">
                      <IoPeopleOutline />
                    </span>
                    <div className="item-text">
                      <span className="item-title">Find Available Food</span>
                      <span className="item-hint">For verified NGOs & shelters</span>
                    </div>
                  </VisitorMenuItem>

                  <VisitorMenuItem
                    type="button"
                    onClick={() => {
                      setIsVisitorOpen(false);
                      handleHowItWorksClick();
                    }}
                  >
                    <span className="item-icon">
                      <IoHelpCircleOutline />
                    </span>
                    <div className="item-text">
                      <span className="item-title">How It Works</span>
                      <span className="item-hint">Learn our safety & verification steps</span>
                    </div>
                  </VisitorMenuItem>
                </VisitorMenuDropdown>
              </ActionButtonWrapper>
            ) : (
              /* LOGGED-IN STATE: [Avatar] Name ▾ */
              <ActionButtonWrapper ref={profileRef}>
                <ProfilePillButton
                  type="button"
                  $isOpen={isProfileOpen}
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotifOpen(false);
                    setIsSavedOpen(false);
                    setIsVisitorOpen(false);
                  }}
                  aria-label="User account menu"
                >
                  <div className="avatar" style={{ overflow: "hidden" }}>
                    {user?.avatarPhoto ? (
                      <img
                        src={user.avatarPhoto}
                        alt="Profile"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      user?.avatar || (role === "ngo" ? "H" : "R")
                    )}
                  </div>
                  <span className="user-name">{user?.name ? user.name.split(" ")[0] : (role === "ngo" ? "Hope" : "Ramesh")}</span>
                  <span className="chevron">
                    <IoChevronDown />
                  </span>
                </ProfilePillButton>

                {/* Profile Marketplace Menu */}
                <ProfileMenuDropdown $isOpen={isProfileOpen}>
                  <div className="user-header-card">
                    <span className="full-name">{user?.name || "ANNShare Partner"}</span>
                    <span className="verified-role" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <IoShieldCheckmark />
                      {role === "ngo" ? (
                        <>
                          <FaHandshake style={{ color: "#2E7D5B" }} /> Verified NGO Partner
                        </>
                      ) : (
                        <>
                          <IoHeart style={{ color: "#E11D48" }} /> Verified Food Donor
                        </>
                      )}
                    </span>
                  </div>

                  <ProfileMenuItem
                    as="button"
                    $isBold
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate(role === "ngo" ? "/ngo/dashboard" : "/donor/dashboard");
                    }}
                    style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
                  >
                    <span className="item-icon">
                      <IoPersonOutline />
                    </span>
                    {role === "ngo" ? "NGO Dashboard" : "Donor Dashboard"}
                  </ProfileMenuItem>

                  {role === "donor" ? (
                    <ProfileMenuItem
                      as="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/donor/dashboard?tab=my-donations");
                      }}
                      style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
                    >
                      <span className="item-icon">
                        <IoRestaurantOutline />
                      </span>
                      My Donations
                    </ProfileMenuItem>
                  ) : (
                    <ProfileMenuItem
                      as="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/ngo/dashboard?tab=requests");
                      }}
                      style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
                    >
                      <span className="item-icon">
                        <IoPeopleOutline />
                      </span>
                      Food Requests
                    </ProfileMenuItem>
                  )}

                  <ProfileMenuItem
                    as="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate(role === "ngo" ? "/ngo/dashboard?tab=notifications" : "/donor/dashboard?tab=notifications");
                    }}
                    style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
                  >
                    <span className="item-icon">
                      <IoNotificationsOutline />
                    </span>
                    Notifications
                  </ProfileMenuItem>

                  <ProfileMenuItem
                    as="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate(role === "ngo" ? "/ngo/dashboard?tab=overview" : "/donor/dashboard?tab=impact");
                    }}
                    style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
                  >
                    <span className="item-icon">
                      <IoBarChartOutline />
                    </span>
                    Impact & Metrics
                  </ProfileMenuItem>

                  <ProfileMenuItem
                    as="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate(role === "ngo" ? "/ngo/dashboard?tab=profile" : "/donor/dashboard?tab=profile");
                    }}
                    style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
                  >
                    <span className="item-icon">
                      <IoSettingsOutline />
                    </span>
                    Settings & Profile
                  </ProfileMenuItem>

                  {/* Switch Role Option */}
                  <ProfileMenuItem
                    as="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      switchRole(role === "donor" ? "ngo" : "donor");
                    }}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      color: "#1565C0",
                      fontWeight: 600,
                    }}
                  >
                    <span className="item-icon" style={{ fontSize: "1.1rem" }}>
                      {role === "donor" ? <FaHandshake /> : <IoHeart style={{ color: "#E11D48" }} />}
                    </span>
                    Switch to {role === "donor" ? "NGO Partner" : "Food Donor"}
                  </ProfileMenuItem>

                  <MenuDivider />

                  <ProfileMenuItem
                    as="button"
                    $isDanger
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                    }}
                  >
                    <span className="item-icon">
                      <IoLogOutOutline />
                    </span>
                    Log out
                  </ProfileMenuItem>
                </ProfileMenuDropdown>
              </ActionButtonWrapper>
            )}
          </RightActionsZone>
        </HeaderContainer>

        {/* DEDICATED MOBILE HEADER: Top Row */}
        <MobileHeaderTopRow>
          <ANNShareLogo href="#hero" />

          <MobileActionsCluster>
            {/* Mobile Notification */}
            <IconButton
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}
              aria-label="Notifications"
            >
              <IoNotificationsOutline />
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </IconButton>

            {/* Mobile Saved */}
            <IconButton
              type="button"
              onClick={() => setIsSavedOpen(!isSavedOpen)}
              style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}
              aria-label="Saved Bookmarks"
            >
              <IoHeartOutline style={{ color: "#E11D48" }} />
            </IconButton>

            {/* Mobile Menu / Profile Hamburger */}
            <IconButton
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              style={{ width: "38px", height: "38px", fontSize: "1.2rem" }}
              aria-label="Open menu"
            >
              {isAuthenticated ? (
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "#174A3A",
                    color: "#F8F5ED",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  U
                </div>
              ) : (
                <IoMenu />
              )}
            </IconButton>
          </MobileActionsCluster>
        </MobileHeaderTopRow>

        {/* DEDICATED MOBILE HEADER: Horizontally Scrollable Pills */}
        <MobileScrollablePillNav>
          <MobilePill
            type="button"
            $isActive={activeNavPill === "have-food"}
            onClick={handleHaveFoodClick}
          >
            <IoRestaurantOutline /> I Have Food
          </MobilePill>

          <MobilePill
            type="button"
            $isActive={activeNavPill === "need-food"}
            onClick={handleNeedFoodClick}
          >
            <IoPeopleOutline /> I Need Food
          </MobilePill>

          <MobilePill
            type="button"
            $isActive={activeNavPill === "explore"}
            onClick={handleExploreClick}
          >
            <IoSearchOutline /> Explore
          </MobilePill>

          <MobilePill
            type="button"
            $isActive={activeNavPill === "how-it-works" || isHowItWorksPage}
            onClick={handleHowItWorksClick}
          >
            <IoHelpCircleOutline /> How It Works
          </MobilePill>
        </MobileScrollablePillNav>
      </HeaderWrapper>

      {/* MOBILE SLIDING DRAWER */}
      <DrawerBackdrop
        $isOpen={isMobileDrawerOpen}
        onClick={() => setIsMobileDrawerOpen(false)}
      />
      <MobileDrawer $isOpen={isMobileDrawerOpen}>
        <div className="drawer-header">
          <ANNShareLogo href="#hero" />
          <IconButton
            type="button"
            onClick={() => setIsMobileDrawerOpen(false)}
            style={{ width: "34px", height: "34px" }}
          >
            <IoClose />
          </IconButton>
        </div>

        <div className="drawer-body">
          {isAuthenticated && (
            <div
              style={{
                padding: "12px 14px",
                background: "#F8F5ED",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#174A3A",
                  color: "#F8F5ED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  overflow: "hidden",
                }}
              >
                {user?.avatarPhoto ? (
                  <img
                    src={user.avatarPhoto}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  user?.avatar || (role === "ngo" ? "H" : "R")
                )}
              </div>
              <div>
                <strong style={{ display: "block", color: "#174A3A" }}>
                  {user?.name || "ANNShare Member"}
                </strong>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#2E7D5B",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {role === "ngo" ? (
                    <>
                      <FaHandshake /> Verified NGO
                    </>
                  ) : (
                    <>
                      <IoHeart style={{ color: "#E11D48" }} /> Verified Donor
                    </>
                  )}
                </span>
              </div>
            </div>
          )}

          {isAuthenticated && (
            <a
              href="#dashboard"
              className="drawer-link"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileDrawerOpen(false);
                navigate(role === "ngo" ? "/ngo/dashboard" : "/donor/dashboard");
              }}
              style={{ fontWeight: 700, color: "#174A3A" }}
            >
              <IoPersonOutline /> My Dashboard
            </a>
          )}

          <a
            href="#hero"
            className="drawer-link"
            onClick={() => {
              setIsMobileDrawerOpen(false);
              handleHaveFoodClick();
            }}
          >
            <IoRestaurantOutline /> I Have Food (Donate)
          </a>

          <a
            href="#hero"
            className="drawer-link"
            onClick={() => {
              setIsMobileDrawerOpen(false);
              handleNeedFoodClick();
            }}
          >
            <IoPeopleOutline /> I Need Food (NGO Request)
          </a>

          <a
            href="#explore"
            className="drawer-link"
            onClick={() => {
              setIsMobileDrawerOpen(false);
              handleExploreClick();
            }}
          >
            <IoSearchOutline /> Explore Marketplace
          </a>

          <a
            href="/how-it-works"
            className="drawer-link"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileDrawerOpen(false);
              handleHowItWorksClick();
            }}
          >
            <IoHelpCircleOutline /> How It Works
          </a>

          <a
            href="#impact"
            className="drawer-link"
            onClick={() => setIsMobileDrawerOpen(false)}
          >
            <IoBarChartOutline /> Impact Metrics
          </a>

          <a
            href="/wishlist"
            className="drawer-link"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileDrawerOpen(false);
              navigate("/wishlist");
            }}
          >
            <IoHeartOutline /> Saved Wishlist ({wishlist.length})
          </a>

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                setIsMobileDrawerOpen(false);
                switchRole(role === "donor" ? "ngo" : "donor");
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(21, 101, 192, 0.08)",
                color: "#1565C0",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.88rem",
                marginTop: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {role === "donor" ? (
                <>
                  <FaHandshake /> Switch to NGO Partner
                </>
              ) : (
                <>
                  <IoHeart style={{ color: "#E11D48" }} /> Switch to Food Donor
                </>
              )}
            </button>
          )}

          <div className="auth-stack">
            {!isAuthenticated ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    requireAuth({ role: "donor", intent: "overview", mode: "signin" });
                  }}
                  style={{
                    padding: "12px",
                    borderRadius: "999px",
                    background: "rgba(23, 74, 58, 0.08)",
                    color: "#174A3A",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Log in
                </button>
                <SignUpPillButton
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    requireAuth({ role: "donor", intent: "overview", mode: "signup" });
                  }}
                  style={{ justifyContent: "center" }}
                >
                  Sign up
                </SignUpPillButton>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  logout();
                }}
                style={{
                  padding: "12px",
                  borderRadius: "999px",
                  background: "rgba(220, 38, 38, 0.08)",
                  color: "#DC2626",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </MobileDrawer>

      {/* MODAL FLOWS */}
      <DonateFoodModal
        isOpen={isDonateModalOpen}
        onClose={() => {
          setIsDonateModalOpen(false);
          setActiveNavPill(null);
        }}
      />

      <NeedFoodModal
        isOpen={isNeedFoodModalOpen}
        onClose={() => {
          setIsNeedFoodModalOpen(false);
          setActiveNavPill(null);
        }}
      />
    </>
  );
};

export default Header;
