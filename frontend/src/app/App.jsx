import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { PlatformProvider } from "../context/PlatformContext";
import { WishlistProvider } from "../context/WishlistContext";
import PublicLayout from "../layout";
import PublicRoute from "../route/PublicRoute";
import LoginModal from "../components/auth/LoginModal";
import WrongRoleModal from "../components/auth/WrongRoleModal";
import ScrollToTop from "../components/ScrollToTop";
import AppLoader from "../components/AppLoader";

function App() {
  return (
    <AuthProvider>
      <PlatformProvider>
        <WishlistProvider>
          {/* Premium Full-Screen Lottie Loader */}
          <AppLoader />
          <PublicLayout>
            <PublicRoute />
          </PublicLayout>
          {/* Global Context-Aware Auth & Role Modals */}
          <LoginModal />
          <WrongRoleModal />
          {/* Scroll To Top: Route Restoration & Floating Action Button */}
          <ScrollToTop />
        </WishlistProvider>
      </PlatformProvider>
    </AuthProvider>
  );
}

export default App;
