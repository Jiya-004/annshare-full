import { LISTINGS_DATA } from "../pages/FindFood/data/listingsData";
import api from "../services/api";

const STORAGE_KEY = "annshare_listings";

/**
 * Retrieve all listings from localStorage / local state.
 * Seeds with LISTINGS_DATA if localStorage is empty.
 */
export function getListings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(LISTINGS_DATA));
      // Trigger background sync with backend
      syncListingsFromBackend();
      return [...LISTINGS_DATA];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(LISTINGS_DATA));
      syncListingsFromBackend();
      return [...LISTINGS_DATA];
    }

    return parsed;
  } catch (err) {
    console.error("Failed to read listings from localStorage:", err);
    return [...LISTINGS_DATA];
  }
}

/**
 * Save listings array to localStorage and notify UI components.
 */
function saveListings(listings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    window.dispatchEvent(new Event("annshare_listings_updated"));
  } catch (err) {
    console.error("Failed to save listings to localStorage:", err);
  }
}

/**
 * Background sync with MongoDB Backend
 */
export async function syncListingsFromBackend() {
  try {
    const backendListings = await api.listings.getAll();
    if (Array.isArray(backendListings) && backendListings.length > 0) {
      const normalized = backendListings.map((b) => ({
        id: b._id || b.id,
        _id: b._id,
        title: b.title || b.foodName,
        category: b.category || "Prepared Meals",
        quantity: b.quantity ? (typeof b.quantity === "number" ? b.quantity : parseInt(b.quantity, 10) || 10) : 10,
        unit: b.portions ? b.portions.replace(/[0-9]/g, "").trim() || "portions" : "portions",
        partner: b.donor || b.restaurantName || "Community Food Donor",
        partnerType: "Verified Food Donor",
        verified: true,
        location: b.location || "Kathmandu, Nepal",
        area: b.location ? b.location.split(",")[0].trim() : "Kathmandu",
        distance: "1.5 km",
        pickupDate: "Today",
        pickupTime: b.pickupWindow || "5:00 PM – 7:30 PM",
        image: b.image || "/food/food1.jpg",
        images: b.images && b.images.length > 0 ? b.images : [b.image || "/food/food1.jpg"],
        rating: 5.0,
        reviewsCount: 12,
        status: (b.status || "available").toLowerCase(),
        badgeColor: "#2E7D5B",
        description: b.description || "",
        safetyInfo: b.safetyInfo || "Maintained according to food hygiene safety standards.",
        expiresIn: b.expiryTime || "4 hours",
        contactName: b.contactName || b.donor || "Partner",
        contactPhone: b.contactPhone || "+977 9841234567",
        donorId: b.donorId,
        matchedWith: b.claimedBy || null,
        createdAt: b.createdAt || new Date().toISOString(),
      }));

      // Combine with local mock listings if desired, or replace
      saveListings(normalized);
    }
  } catch (err) {
    console.warn("Could not sync listings from live backend, using local store:", err.message);
  }
}

// Initial trigger
if (typeof window !== "undefined") {
  setTimeout(() => syncListingsFromBackend(), 300);
}

/**
 * Add a new listing to the store and backend.
 */
export function addListing(listing) {
  const current = getListings();
  const newId = listing.id || `listing-${Date.now()}`;

  const formattedListing = {
    id: newId,
    title: listing.title || listing.foodName || "Untitled Surplus Food",
    category: listing.category || "Prepared Meals",
    quantity: Number(listing.quantity) || 1,
    unit: listing.unit || "portions",
    partner: listing.partner || listing.donor || "Community Food Donor",
    partnerType: listing.partnerType || "Verified Food Donor",
    verified: listing.verified ?? true,
    location: listing.location || "Kathmandu, Nepal",
    area: listing.area || (listing.location ? listing.location.split(",")[0].trim() : "Kathmandu"),
    distance: listing.distance || "1.5 km",
    pickupDate: listing.pickupDate || "Today",
    pickupTime: listing.pickupTime || "5:00 PM – 7:30 PM",
    image: listing.image || `/food/food${(current.length % 8) + 1}.jpg`,
    images: listing.images && listing.images.length > 0 ? listing.images : [listing.image || `/food/food${(current.length % 8) + 1}.jpg`],
    rating: listing.rating || 5.0,
    reviewsCount: listing.reviewsCount || 1,
    status: (listing.status || "Pending Approval").toLowerCase(),
    badgeColor: "#C2410C",
    mapCoords: listing.mapCoords || { x: 45, y: 35 },
    description: listing.description || "",
    safetyInfo: listing.safetyInfo || "Maintained according to food hygiene safety standards.",
    expiresIn: listing.expiresIn || "4 hours",
    contactName: listing.contactName || "Donor Contact",
    contactPhone: listing.contactPhone || "+977 980-1234567",
    donorId: listing.donorId || null,
    matchedWith: listing.matchedWith || null,
    createdAt: listing.createdAt || new Date().toISOString(),
  };

  const updated = [formattedListing, ...current];
  saveListings(updated);

  // Send to backend in background
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
      pickupWindow: `${formattedListing.pickupDate} · ${formattedListing.pickupTime}`,
      expiryTime: formattedListing.expiresIn,
      status: "Pending Approval",
      image: formattedListing.image,
      images: formattedListing.images,
      description: formattedListing.description,
      handlingInstructions: formattedListing.safetyInfo,
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
