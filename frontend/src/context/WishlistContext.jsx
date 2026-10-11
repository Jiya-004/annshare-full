import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id || user?._id || user?.email || null;
  const storageKey = userId ? `annshare_wishlist_${userId}` : "annshare_wishlist_guest";

  const [wishlist, setWishlist] = useState(() => {
    try {
      // First check user-specific key, then fall back to generic key
      const specific = userId ? localStorage.getItem(`annshare_wishlist_${userId}`) : null;
      if (specific) return JSON.parse(specific);

      const saved = localStorage.getItem("annshare_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isInitialSyncDone = useRef(false);

  // When user logs in or switches, fetch real wishlist from backend MongoDB
  useEffect(() => {
    if (isAuthenticated && userId) {
      api.auth
        .getWishlist()
        .then((res) => {
          if (res?.wishlist && Array.isArray(res.wishlist)) {
            // Merge with local items if user saved something before logging in
            setWishlist((prev) => {
              const combined = Array.from(new Set([...prev, ...res.wishlist.map(String)]));
              try {
                localStorage.setItem(`annshare_wishlist_${userId}`, JSON.stringify(combined));
              } catch (e) {}

              // If client had local items that backend didn't have, sync to backend
              if (combined.length > res.wishlist.length) {
                api.auth.syncWishlist(combined).catch(() => {});
              }
              return combined;
            });
          }
        })
        .catch(() => {
          // If offline or request fails, load from user-specific localStorage
          try {
            const saved = localStorage.getItem(`annshare_wishlist_${userId}`);
            if (saved) setWishlist(JSON.parse(saved));
          } catch (e) {}
        })
        .finally(() => {
          isInitialSyncDone.current = true;
        });
    } else if (!isAuthenticated) {
      // When logged out, load guest wishlist
      try {
        const saved = localStorage.getItem("annshare_wishlist_guest");
        setWishlist(saved ? JSON.parse(saved) : []);
      } catch (e) {
        setWishlist([]);
      }
      isInitialSyncDone.current = true;
    }
  }, [isAuthenticated, userId]);

  // Persist locally for immediate responsive UI
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
      localStorage.setItem("annshare_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist, storageKey]);

  const toggleWishlistItem = async (listingId) => {
    const idStr = String(listingId);
    const willBeSaved = !wishlist.includes(idStr);

    // Optimistic local update
    setWishlist((prev) =>
      prev.includes(idStr) ? prev.filter((id) => id !== idStr) : [...prev, idStr]
    );

    // If authenticated, persist to MongoDB backend
    if (isAuthenticated) {
      try {
        await api.auth.toggleWishlist(idStr);
      } catch (err) {
        console.warn("Failed to toggle wishlist in database:", err.message);
      }
    }
  };

  const isInWishlist = (listingId) => wishlist.includes(String(listingId));

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlistItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;

