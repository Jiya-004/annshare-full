import { LISTINGS_DATA } from "../pages/FindFood/data/listingsData";
import api from "../services/api";

const STORAGE_KEY = "annshare_listings";

/**
 * Standardize category strings across app so filters and cards always match.
 */
export function normalizeCategory(cat = "") {
  if (!cat) return "Prepared Meals";
  const c = String(cat).toLowerCase().trim();
  if (c.includes("bakery") || c.includes("bread") || c.includes("pastr") || c.includes("croissant")) return "Bakery & Bread";
  if (c.includes("fruit") || c.includes("veg") || c.includes("produce") || c.includes("salad") || c.includes("greens")) return "Fruits & Veggies";
  if (c.includes("prepared") || c.includes("cooked") || c.includes("meal") || c.includes("bento") || c.includes("rice meals")) return "Prepared Meals";
  if (c.includes("grain") || c.includes("rice &") || c.includes("lentil") || c.includes("beans")) return "Rice & Grains";
  if (c.includes("dairy") || c.includes("milk") || c.includes("paneer") || c.includes("cheese") || c.includes("pantry")) return "Dairy & Pantry";
  if (c.includes("packaged") || c.includes("grocer") || c.includes("canned")) return "Packaged Food";
  if (c.includes("other")) return "Other Items";
  return cat;
}

/**
 * Flexible category comparison helper
 */
export function matchCategory(itemCat = "", filterCat = "") {
  if (!filterCat || filterCat === "all") return true;
  if (itemCat === filterCat) return true;
  return normalizeCategory(itemCat).toLowerCase() === normalizeCategory(filterCat).toLowerCase();
}

/**
 * Format timestamp into readable current time (e.g. 4:15 PM) in Nepal Time
 */
export function formatCurrentTime(d = new Date()) {
  const dateObj = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return dateObj.toLocaleTimeString([], {
    timeZone: "Asia/Kathmandu",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format timestamp into readable date and time in Nepal Time (e.g. Oct 10, 2026, 08:15 PM)
 */
export function formatToNepaliDate(d = new Date()) {
  const dateObj = typeof d === "string" || typeof d === "number" ? new Date(d) : d;
  return dateObj.toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Current pickup window helper (+2.5 hours)
 */
export function getCurrentPickupWindow() {
  const now = new Date();
  const startTime = formatCurrentTime(now);
  const endTime = formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000));
  return `${startTime} – ${endTime}`;
}

// In-memory cache holding full-fidelity live listings and actual images (bypasses localStorage 5MB quota)
let inMemoryListingsCache = null;

const PRESET_FALLBACK_IMAGES = [
  "/food/food1.jpg",
  "/food/food2.jpg",
  "/food/food3.jpg",
  "/food/food4.jpg",
  "/food/food5.jpg",
  "/food/food6.jpg",
  "/food/food7.jpg",
  "/food/food8.jpg",
];

/**
 * Retrieve all listings from in-memory cache or localStorage / local state.
 * Seeds with LISTINGS_DATA if empty.
 */
export function getListings() {
  if (Array.isArray(inMemoryListingsCache) && inMemoryListingsCache.length > 0) {
    return inMemoryListingsCache;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list = [];
    if (!raw) {
      list = [...LISTINGS_DATA];
      syncListingsFromBackend();
    } else {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        list = [...LISTINGS_DATA];
        syncListingsFromBackend();
      } else {
        list = parsed;
      }
    }

    // Normalize each listing so category, time, and images always display cleanly
    const normalized = list.map((item, idx) => {
      const normalizedCat = normalizeCategory(item.category);
      const area = item.area || (item.location ? item.location.split(",")[0].trim() : "Kathmandu");
      const postedTime =
        item.postedTime ||
        (item.createdAt ? formatCurrentTime(item.createdAt) : "2:30 PM");

      const defaultImg = PRESET_FALLBACK_IMAGES[idx % PRESET_FALLBACK_IMAGES.length];
      const finalImg = item.image || defaultImg;
      const finalImages = Array.isArray(item.images) && item.images.length > 0 ? item.images : [finalImg];

      return {
        ...item,
        category: normalizedCat,
        area,
        postedTime,
        image: finalImg,
        images: finalImages,
        pickupTime: item.pickupTime || `Today, ${postedTime}`,
      };
    });

    inMemoryListingsCache = normalized;
    return normalized;
  } catch (err) {
    console.error("Failed to read listings from localStorage:", err);
    return [...LISTINGS_DATA];
  }
}

/**
 * Save listings array to in-memory state and localStorage, notifying UI components.
 * Guarantees in-memory fidelity so real images are NEVER replaced with food1.jpg.
 */
function saveListings(listings) {
  // Always update in-memory cache with pristine records and real images
  inMemoryListingsCache = listings;
  window.dispatchEvent(new Event("annshare_listings_updated"));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (err) {
    console.warn("Storage quota exceeded for localStorage cache. In-memory cache preserved with real images.", err);
    try {
      // Offline localStorage fallback ONLY: use diverse preset placeholders without mutating inMemoryListingsCache
      const pruned = listings.map((item, idx) => {
        const isBase64 = (str) => typeof str === "string" && str.startsWith("data:image/");
        const fallbackImg = PRESET_FALLBACK_IMAGES[idx % PRESET_FALLBACK_IMAGES.length];
        const safeImage = isBase64(item.image) ? fallbackImg : item.image || fallbackImg;
        const safeImages = Array.isArray(item.images)
          ? item.images.map((img, i) => (isBase64(img) ? PRESET_FALLBACK_IMAGES[(idx + i) % PRESET_FALLBACK_IMAGES.length] : img))
          : [safeImage];
        return {
          ...item,
          image: safeImage,
          images: safeImages,
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
    } catch (fallbackErr) {
      console.warn("Could not save to localStorage even with distinct placeholders:", fallbackErr);
    }
  }
}

/**
 * Background sync with MongoDB Backend
 */
export async function syncListingsFromBackend() {
  try {
    const backendListings = await api.listings.getAll();
    if (Array.isArray(backendListings) && backendListings.length > 0) {
      const normalized = backendListings.map((b, idx) => {
        const cat = normalizeCategory(b.category);
        const postedTime = b.postedDate || (b.createdAt ? formatCurrentTime(b.createdAt) : formatCurrentTime());
        const defaultImg = PRESET_FALLBACK_IMAGES[idx % PRESET_FALLBACK_IMAGES.length];
        const itemImage = b.image || (Array.isArray(b.images) && b.images[0]) || defaultImg;
        const itemImages = Array.isArray(b.images) && b.images.length > 0 ? b.images : [itemImage];

        return {
          id: b._id || b.id,
          _id: b._id,
          title: b.title || b.foodName,
          category: cat,
          quantity: b.quantity ? (typeof b.quantity === "number" ? b.quantity : parseInt(b.quantity, 10) || 1) : 1,
          unit: b.portions
            ? b.portions.replace(/[0-9]/g, "").trim() || "portions"
            : typeof b.quantity === "string"
            ? b.quantity.replace(/[0-9]/g, "").trim() || "portions"
            : "portions",
          partner: b.donor || b.restaurantName || "Community Food Donor",
          partnerType: "Verified Food Donor",
          verified: true,
          location: b.location || "Kathmandu, Nepal",
          area: b.location ? b.location.split(",")[0].trim() : "Kathmandu",
          distance: "1.5 km",
          pickupDate: "Today",
          pickupTime: b.pickupWindow || `Today · ${postedTime}`,
          postedTime,
          image: itemImage,
          images: itemImages,
          rating: 5.0,
          reviewsCount: 12,
          status: (b.status || "available").toLowerCase(),
          badgeColor: "#2E7D5B",
          description: b.description || "",
          safetyInfo: b.safetyInfo || `Prepared at ${postedTime}. Maintained according to food hygiene safety standards.`,
          expiresIn: b.expiryTime || "4 hours",
          contactName: b.contactName || b.donor || "Partner",
          contactPhone: b.contactPhone || "+977 9841234567",
          donorId: b.donorId,
          matchedWith: b.claimedBy || null,
          createdAt: b.createdAt || new Date().toISOString(),
        };
      });

      // Preserve local custom donations that have not yet synced to the backend
      const currentListings = getListings();
      const normalizedIds = new Set(normalized.map((b) => String(b.id || b._id)));
      const localOnly = currentListings.filter((l) => {
        const idStr = String(l.id || l._id);
        if (normalizedIds.has(idStr)) return false;
        const matchingBackend = normalized.find(
          (b) =>
            b.title?.toLowerCase() === l.title?.toLowerCase() &&
            b.partner?.toLowerCase() === l.partner?.toLowerCase()
        );
        if (matchingBackend) {
          return false;
        }
        return l.isCustomDonation || idStr.startsWith("listing-");
      });

      const mergedMap = new Map();
      [...localOnly, ...normalized].forEach((item) => {
        mergedMap.set(String(item.id || item._id), item);
      });

      const finalMerged = Array.from(mergedMap.values());
      saveListings(finalMerged);
      return finalMerged;
    }
  } catch (err) {
    console.warn("Could not sync listings from live backend, using local store:", err.message);
  }
  return getListings();
}

// Initial background sync trigger on module load
if (typeof window !== "undefined") {
  syncListingsFromBackend();
}

/**
 * Add a new listing to the store and backend.
 */
export function addListing(listing) {
  const current = getListings();
  const newId = listing.id || `listing-${Date.now()}`;
  const now = new Date();
  const currentTimeStr = formatCurrentTime(now);
  const normalizedCategory = normalizeCategory(listing.category || "Prepared Meals");
  const area = listing.area || (listing.location ? listing.location.split(",")[0].trim() : "Kathmandu");
  const pickupWindow = listing.pickupTime || `Today, ${currentTimeStr} – ${formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000))}`;

  const formattedListing = {
    id: newId,
    title: listing.title || listing.foodName || "Untitled Surplus Food",
    category: normalizedCategory,
    quantity: Number(listing.quantity) || 1,
    unit: listing.unit || "portions",
    condition: listing.condition || "Freshly Prepared",
    partner: listing.partner || listing.donor || "Utsha Cafe",
    partnerType: listing.partnerType || "Verified Food Donor",
    verified: listing.verified ?? true,
    location: listing.location || "Kathmandu, Nepal",
    area,
    distance: listing.distance || "1.2 km",
    pickupDate: listing.pickupDate || "Today",
    pickupTime: pickupWindow,
    postedTime: listing.postedTime || currentTimeStr,
    postedDate: listing.postedDate || formatToNepaliDate(now),
    createdAt: listing.createdAt || now.toISOString(),
    image: listing.image || `/food/food${(current.length % 8) + 1}.jpg`,
    images: listing.images && listing.images.length > 0 ? listing.images : [listing.image || `/food/food${(current.length % 8) + 1}.jpg`],
    rating: listing.rating || 5.0,
    reviewsCount: listing.reviewsCount || 1,
    status: (listing.status || "pending approval").toLowerCase(),
    badgeColor: listing.badgeColor || "#2E7D5B",
    mapCoords: listing.mapCoords || { x: 45, y: 35 },
    description: listing.description || "",
    safetyInfo: listing.safetyInfo || `Prepared fresh today at ${currentTimeStr}. Maintained according to food hygiene safety standards.`,
    expiresIn: listing.expiresIn || "4 hours",
    contactName: listing.contactName || "Utsha",
    contactPhone: listing.contactPhone || "",
    donorId: listing.donorId || "donor-user",
    donorEmail: listing.donorEmail || "",
    isCustomDonation: true,
    matchedWith: listing.matchedWith || null,
  };

  const updated = [formattedListing, ...current];
  saveListings(updated);

  // Send to backend in background and update local record with returned MongoDB _id
  api.listings
    .create({
      title: formattedListing.title,
      foodName: formattedListing.title,
      category: formattedListing.category,
      quantity: `${formattedListing.quantity} ${formattedListing.unit}`,
      portions: `${formattedListing.quantity} ${formattedListing.unit}`,
      weight_kg: Number(formattedListing.quantity) * 0.3 || 5,
      donor: formattedListing.partner,
      restaurantName: formattedListing.partner,
      location: formattedListing.location,
      address: formattedListing.location,
      contactPhone: formattedListing.contactPhone,
      postedDate: formattedListing.postedDate,
      pickupWindow: formattedListing.pickupTime,
      expiryTime: formattedListing.expiresIn,
      status: "Pending Approval",
      image: formattedListing.image,
      images: formattedListing.images,
      description: formattedListing.description,
      handlingInstructions: formattedListing.safetyInfo,
    })
    .then((created) => {
      if (created && (created._id || created.id)) {
        const cur = getListings();
        const realId = String(created._id || created.id);
        const replaced = cur.map((item) => {
          if (String(item.id) === String(newId)) {
            return {
              ...item,
              id: realId,
              _id: realId,
              status: (created.status || item.status || "Pending Approval").toLowerCase(),
            };
          }
          return item;
        });
        saveListings(replaced);
      }
    })
    .catch((e) => console.warn("Backend listing post error (fallback active):", e.message));

  return formattedListing;
}

/**
 * Update the status and matched partner of an existing listing.
 */
export function updateListingStatus(id, status, matchedWith = null) {
  const current = getListings();
  const updated = current.map((item) => {
    if (String(item.id) === String(id) || (item._id && String(item._id) === String(id))) {
      return {
        ...item,
        status,
        matchedWith: matchedWith !== undefined ? matchedWith : item.matchedWith,
      };
    }
    return item;
  });

  saveListings(updated);

  // Sync status to backend
  if (id) {
    const backendStatus = status === "available" ? "Available" : status === "claimed" ? "Claimed" : "Picked Up";
    api.listings.updateStatus(id, backendStatus, matchedWith).catch(() => {});
  }

  return updated;
}

/**
 * Retrieve a single listing by its ID.
 */
export function getListingById(id) {
  const current = getListings();
  return current.find((item) => String(item.id) === String(id) || (item._id && String(item._id) === String(id))) || null;
}
