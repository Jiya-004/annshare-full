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
      if (userId) {
        const specific = localStorage.getItem(`annshare_wishlist_${userId}`);
        return specific ? JSON.parse(specific) : [];
      }
      const guest = localStorage.getItem("annshare_wishlist_guest");
      return guest ? JSON.parse(guest) : [];
    } catch {
      return [];
    }
  });

  const isInitialSyncDone = useRef(false);

  // When user logs in or switches, load from MongoDB database
  useEffect(() => {
    if (isAuthenticated && userId) {
      // First update state from user's cache immediately if available
      try {
        const cached = localStorage.getItem(`annshare_wishlist_${userId}`);
        if (cached) {
          setWishlist(JSON.parse(cached));
        } else {
          setWishlist([]);
        }
      } catch (e) {
        setWishlist([]);
      }

      // Fetch official wishlist for this user from MongoDB
      api.auth
        .getWishlist()
        .then((res) => {
          if (res?.wishlist && Array.isArray(res.wishlist)) {
            const serverList = res.wishlist.map(String);
            setWishlist(serverList);
            try {
              localStorage.setItem(`annshare_wishlist_${userId}`, JSON.stringify(serverList));
            } catch (e) {}
          }
        })
        .catch(() => {
          // If offline or request fails, keep cached items
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

