import React from "react";
import Homepage from "../../frontend/Homepage";
import DonatePage from "../../pages/Donate";
import FindFoodPage from "../../pages/FindFood";
import FoodDetailsPage from "../../pages/FoodDetails";
import HowItWorksPage from "../../pages/HowItWorks";
import AboutUsPage from "../../pages/AboutUs";
import FAQsPage from "../../pages/FAQs";
import ContactUsPage from "../../pages/ContactUs";
import HelpCenterPage from "../../pages/HelpCenter";
import PrivacyPolicyPage from "../../pages/Legal/PrivacyPolicy";
import TermsAndConditionsPage from "../../pages/Legal/TermsAndConditions";
import FoodSafetyGuidelinesPage from "../../pages/Legal/FoodSafetyGuidelines";
import CommunityGuidelinesPage from "../../pages/Legal/CommunityGuidelines";
import DonationGuidelinesPage from "../../pages/Legal/DonationGuidelines";
import PickupGuidelinesPage from "../../pages/Legal/PickupGuidelines";
import BlogListingPage from "../../pages/Blog";
import BlogDetailsPage from "../../pages/Blog/BlogDetails";
import BecomePartnerPage from "../../pages/BecomePartner";
import NotFoundPage from "../../pages/NotFound";
import DonorDashboard from "../../pages/donor/DonorDashboard";
import NGODashboard from "../../pages/ngo/NGODashboard";
import WishlistPage from "../../pages/Wishlist";
import ProtectedRoute from "../../routes/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { Route, Routes, Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to={role === "ngo" ? "/ngo/dashboard" : "/donor/dashboard"} replace />;
};

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/faq" element={<FAQsPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/contact" element={<ContactUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/blog" element={<BlogListingPage />} />
      <Route path="/stories" element={<BlogListingPage />} />
      <Route path="/journal" element={<BlogListingPage />} />
      <Route path="/blog/:slug" element={<BlogDetailsPage />} />
      <Route path="/become-a-partner" element={<BecomePartnerPage />} />
      <Route path="/partner" element={<BecomePartnerPage />} />
      <Route path="/partners" element={<BecomePartnerPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/policies" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsAndConditionsPage />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
      <Route path="/food-safety" element={<FoodSafetyGuidelinesPage />} />
      <Route path="/guidelines/food-safety" element={<FoodSafetyGuidelinesPage />} />
      <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
      <Route path="/guidelines/community" element={<CommunityGuidelinesPage />} />
      <Route path="/donation-guidelines" element={<DonationGuidelinesPage />} />
      <Route path="/guidelines/donation" element={<DonationGuidelinesPage />} />
      <Route path="/pickup-guidelines" element={<PickupGuidelinesPage />} />
      <Route path="/guidelines/pickup" element={<PickupGuidelinesPage />} />

      {/* Role-Specific Dashboards */}
      <Route
        path="/donor/dashboard"
        element={
          <ProtectedRoute role="donor">
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ngo/dashboard"
        element={
          <ProtectedRoute role="ngo">
            <NGODashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Marketplace & Food Details */}
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/find-food" element={<FindFoodPage />} />
      <Route path="/food/:id" element={<FoodDetailsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/saved" element={<WishlistPage />} />

      {/* 404 Fallback Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoute;