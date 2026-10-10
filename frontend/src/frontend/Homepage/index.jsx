import React, { useState } from "react";
import HeroSection from "./sections/HeroSection";
import DiscoveryBar from "./sections/DiscoveryBar";
import ImpactStrip from "./sections/ImpactStrip";
import RoleSection from "./sections/RoleSection";
import FoodDiscovery from "./sections/FoodDiscovery";
import LiveActivityHub from "./sections/LiveActivityHub";
import HowItWorks from "./sections/HowItWorks";
import ForRestaurants from "./sections/ForRestaurants";
import ImpactMetrics from "./sections/ImpactMetrics";
import SuccessStory from "./sections/SuccessStory";
import VerifiedPartners from "./sections/VerifiedPartners";
import CommunityCTA from "./sections/CommunityCTA";
import FAQSection from "./sections/FAQSection";

import { DonateFoodModal } from "../../layout/Header/DonateFoodModal";
import { NeedFoodModal } from "../../layout/Header/NeedFoodModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isNeedFoodModalOpen, setIsNeedFoodModalOpen] = useState(false);

  const handleOpenDonate = () => {
    navigate("/donate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenNeedFood = () => {
    navigate("/find-food");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExplore = () => {
    navigate("/find-food");
  };

  return (
    <main style={{ backgroundColor: "#F8F5ED", minHeight: "100vh", overflowX: "hidden" }}>
      {/* 1. Hero Section */}
      <HeroSection
        onOpenDonate={handleOpenDonate}
        onOpenNeedFood={handleOpenNeedFood}
        onExploreClick={handleExplore}
      />

      {/* 2. Floating Marketplace Discovery Bar */}
      <DiscoveryBar
        onOpenDonate={handleOpenDonate}
        onOpenNeedFood={handleOpenNeedFood}
        onExplore={handleExplore}
      />

      {/* 3. Social Proof & Impact Strip */}
      <ImpactStrip />

      {/* 4. Role Split (Restaurants vs NGOs) */}
      <RoleSection
        onOpenDonate={handleOpenDonate}
        onOpenNeedFood={handleOpenNeedFood}
      />

      {/* 5. Food Discovery / Live Listings Marketplace */}
      <FoodDiscovery onOpenNeedFood={handleOpenNeedFood} />

      {/* 6. Live Activity Hub (Map & Live Telemetry) */}
      <LiveActivityHub />

      {/* 7. How It Works (4-Step Process) */}
      <HowItWorks />

      {/* 8. Dedicated Restaurant Value Section */}
      <ForRestaurants onOpenDonate={handleOpenDonate} />

      {/* 9. Audited Environmental & Social Impact Metrics */}
      <ImpactMetrics />

      {/* 10. Success Story Spotlight */}
      <SuccessStory />

      {/* 11. Verified Partners Grid */}
      <VerifiedPartners />

      {/* 12. Final Community Call To Action */}
      <CommunityCTA
        onOpenDonate={handleOpenDonate}
        onOpenNeedFood={handleOpenNeedFood}
      />

      {/* 13. Interactive FAQ Accordion */}
      <FAQSection />

      {/* Modal Dialogs */}
      <DonateFoodModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
      <NeedFoodModal
        isOpen={isNeedFoodModalOpen}
        onClose={() => setIsNeedFoodModalOpen(false)}
      />
    </main>
  );
};

export default HomePage;