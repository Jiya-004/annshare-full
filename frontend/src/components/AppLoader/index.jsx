import React, { useState, useEffect } from "react";
import {
  LoaderOverlay,
  LoaderContent,
  LogoWrapper,
  LogoImage,
  BrandTagline,
  ProgressIndicator,
} from "./style";

/**
 * Premium Full-Screen Brand Loader for ANNShare
 * Displays the official monogram and brand mark (logo-old.png) during initial load.
 *
 * @param {boolean} [isLoading] - Optional external loading state. If omitted, manages initial app mount loading.
 * @param {number} [minDuration=800] - Graceful minimum display duration in milliseconds to prevent flickering.
 * @param {Function} [onLoaded] - Callback when loader completely fades out.
 */
const AppLoader = ({ isLoading: externalLoading, minDuration = 800, onLoaded }) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // If externalLoading is provided, respect it; otherwise use internal initial mount tracker
  const activeLoading =
    typeof externalLoading === "boolean" ? externalLoading : internalLoading;

  // Handle internal initial application load
  useEffect(() => {
    if (typeof externalLoading === "boolean") return;

    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [externalLoading, minDuration]);

  // Handle exit transition when loading finishes
  useEffect(() => {
    if (!activeLoading && isVisible && !isExiting) {
      setIsExiting(true);

      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        if (typeof onLoaded === "function") {
          onLoaded();
        }
      }, 480); // Matches the 0.45s CSS transition

      return () => clearTimeout(exitTimer);
    }
  }, [activeLoading, isVisible, isExiting, onLoaded]);

  // Lock background scroll and interactions while loader is active
  useEffect(() => {
    if (isVisible && !isExiting) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible, isExiting]);

  if (!isVisible) return null;

  return (
    <LoaderOverlay
      $isExiting={isExiting}
      $isVisible={isVisible}
      role="progressbar"
      aria-busy="true"
      aria-label="Loading ANNShare platform"
    >
      <LoaderContent>
        <LogoWrapper>
          <LogoImage
            src="/logo-old.png"
            alt="अन्नShare - Food Sharing & Redistribution Platform"
            loading="eager"
          />
        </LogoWrapper>

        <BrandTagline>Giving surplus food a second journey.</BrandTagline>

        <ProgressIndicator />
      </LoaderContent>
    </LoaderOverlay>
  );
};

export default AppLoader;
