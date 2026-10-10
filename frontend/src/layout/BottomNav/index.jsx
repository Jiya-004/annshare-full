import React, { useState } from "react";
import {
  IoHomeOutline,
  IoHome,
  IoCubeOutline,
  IoCube,
  IoPeopleOutline,
  IoPeople,
  IoBarChartOutline,
  IoBarChart,
  IoSearchOutline,
  IoSearch,
  IoDocumentTextOutline,
  IoDocumentText,
  IoAdd,
  IoHelpCircleOutline,
  IoHelpCircle,
  IoRestaurantOutline,
  IoCarOutline,
} from "react-icons/io5";
import { BottomNavWrapper, NavButton, FloatingActionButton } from "./style";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, role, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const isDonor = role === "donor";

  if (!isAuthenticated) {
    return (
      <BottomNavWrapper>
        {/* 1. Home */}
        <NavButton
          as="button"
          $isActive={activeTab === "home" && location.pathname === "/"}
          onClick={() => {
            setActiveTab("home");
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="nav-icon">
            {activeTab === "home" && location.pathname === "/" ? <IoHome /> : <IoHomeOutline />}
          </span>
          <span>Home</span>
        </NavButton>

        {/* 2. I Have Food (Donate) */}
        <NavButton
          as="button"
          $isActive={activeTab === "donate" || location.pathname === "/donate"}
          onClick={() => {
            setActiveTab("donate");
            navigate("/donate");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="nav-icon">
            <IoRestaurantOutline />
          </span>
          <span>Donate</span>
        </NavButton>

        {/* 3. Center Floating Action: Donate Food */}
        <FloatingActionButton
          onClick={() => {
            navigate("/donate");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Donate Food"
          title="Donate Surplus Food"
        >
          <IoAdd />
        </FloatingActionButton>

        {/* 4. I Need Food (Find Food) */}
        <NavButton
          as="button"
          $isActive={activeTab === "find" || location.pathname === "/find-food"}
          onClick={() => {
            setActiveTab("find");
            navigate("/find-food");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="nav-icon">
            <IoPeopleOutline />
          </span>
          <span>Find Food</span>
        </NavButton>

        {/* 5. How It Works */}
        <NavButton
          as="button"
          $isActive={activeTab === "how" || location.pathname === "/how-it-works"}
          onClick={() => {
            setActiveTab("how");
            navigate("/how-it-works");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="nav-icon">
            {location.pathname === "/how-it-works" ? <IoHelpCircle /> : <IoHelpCircleOutline />}
          </span>
          <span>How It Works</span>
        </NavButton>
      </BottomNavWrapper>
    );
  }

  return (
    <BottomNavWrapper>
      {/* 1. Home */}
      <NavButton
        as="button"
        $isActive={location.pathname === "/"}
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="nav-icon">
          {location.pathname === "/" ? <IoHome /> : <IoHomeOutline />}
        </span>
        <span>Home</span>
      </NavButton>

      {/* 2. Donations / Find Food */}
      {isDonor ? (
        <NavButton
          as="button"
          $isActive={location.search.includes("my-donations")}
          onClick={() => navigate("/donor/dashboard?tab=my-donations")}
        >
          <span className="nav-icon">
            <IoCubeOutline />
          </span>
          <span>Donations</span>
        </NavButton>
      ) : (
        <NavButton
          as="button"
          $isActive={location.search.includes("find-food")}
          onClick={() => navigate("/ngo/dashboard?tab=find-food")}
        >
          <span className="nav-icon">
            <IoSearchOutline />
          </span>
          <span>Find Food</span>
        </NavButton>
      )}

      {/* 3. Center Floating Action: + Donate Food (Donor) / + Food Requests (NGO) */}
      <FloatingActionButton
        onClick={() => {
          if (isDonor) {
            navigate("/donor/dashboard?tab=donate");
          } else {
            navigate("/ngo/dashboard?tab=requests");
          }
        }}
        aria-label={isDonor ? "Donate Food" : "Order Requests"}
        title={isDonor ? "Donate Food" : "Order Requests"}
      >
        <IoAdd />
      </FloatingActionButton>

      {/* 4. Opportunities / Active Pickups */}
      {isDonor ? (
        <NavButton
          as="button"
          $isActive={location.search.includes("opportunities")}
          onClick={() => navigate("/donor/dashboard?tab=opportunities")}
        >
          <span className="nav-icon">
            <IoPeopleOutline />
          </span>
          <span>Community</span>
        </NavButton>
      ) : (
        <NavButton
          as="button"
          $isActive={location.search.includes("pickups")}
          onClick={() => navigate("/ngo/dashboard?tab=pickups")}
        >
          <span className="nav-icon">
            <IoCarOutline />
          </span>
          <span>Pickups</span>
        </NavButton>
      )}

      {/* 5. Dashboard Overview */}
      <NavButton
        as="button"
        $isActive={location.pathname.includes("/dashboard") && !location.search}
        onClick={() => navigate(isDonor ? "/donor/dashboard" : "/ngo/dashboard")}
      >
        <span className="nav-icon">
          <IoBarChartOutline />
        </span>
        <span>Dashboard</span>
      </NavButton>
    </BottomNavWrapper>
  );
};

export default BottomNav;
