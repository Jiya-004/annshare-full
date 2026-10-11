import api from "../services/api";

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:8000/api' : 'https://annshare-backend.onrender.com/api');
const BACKEND_HOST = API_BASE.replace(/\/api\/?$/, '');

export const formatImageUrl = (url) => {
  if (!url) return '/food.png';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    return `${BACKEND_HOST}${url}`;
  }
  if (url.startsWith('uploads/')) {
    return `${BACKEND_HOST}/${url}`;
  }
  return url;
};

export const formatToNepaliTime = (dateInput = new Date()) => {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return String(dateInput);
  }
};

const REQUESTS_STORAGE_KEY = "annshare_requests";

const INITIAL_REQUESTS = [
  {
    id: "req-101",
    listingId: 1,
    foodTitle: "Fresh Vegetable Rice Meals",
    donorName: "Green Leaf Café",
    portions: "48 portions",
    location: "Thamel, Kathmandu",
    pickupWindow: "Today · 5:00 PM - 7:30 PM",
    status: "confirmed",
    requestedAt: "15m ago",
    image: "/food.png",
    contact: "Sunil Shrestha (+977 984-1234567)",
    ngoId: "ngo-202",
    ngoName: "Hope Foundation Nepal",
    ngoOrg: "Hope Foundation",
  },
  {
    id: "req-102",
    listingId: 2,
    foodTitle: "Fresh Bakery & Croissant Assortment",
    donorName: "Himalayan Bakehouse",
    portions: "32 packs",
    location: "Lazimpat, Kathmandu",
    pickupWindow: "Today · 6:00 PM – 8:00 PM",
    status: "pending",
    requestedAt: "45m ago",
    image: "/foodeating.png",
    contact: "Pooja Gurung (+977 980-2345678)",
    ngoId: "ngo-202",
    ngoName: "Hope Foundation Nepal",
    ngoOrg: "Hope Foundation",
  },
];

/**
 * Retrieve all food requests from localStorage.
 */
export function getRequests() {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      syncRequestsFromBackend();
      return [...INITIAL_REQUESTS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      syncRequestsFromBackend();
      return [...INITIAL_REQUESTS];
    }
    return parsed.map((item) => ({
      ...item,
      image: formatImageUrl(item.image),
    }));
  } catch (err) {
    console.error("Failed to read requests from localStorage:", err);
    return [...INITIAL_REQUESTS];
  }
}

/**
 * Save requests array to localStorage.
 */
function saveRequests(requests) {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
    window.dispatchEvent(new Event("annshare_requests_updated"));
  } catch (err) {
    console.error("Failed to save requests to localStorage:", err);
  }
}

/**
 * Background sync with MongoDB Backend
 */
export async function syncRequestsFromBackend() {
  try {
    const backendRequests = await api.requests.getAll();
    if (Array.isArray(backendRequests) && backendRequests.length > 0) {
      const normalized = backendRequests.map((r) => ({
        id: r._id || r.id,
        _id: r._id,
        listingId: r.listingId,
        donationId: r.donationId || r.listingId,
        foodTitle: r.foodTitle || r.foodName || "Requested Food Item",
        donorName: r.donorName || "Community Food Partner",
        donorId: r.donorId,
        donorPhone: r.donorPhone || "",
        donorEmail: r.donorEmail || "",
        donorLocation: r.donorLocation || r.location || "Kathmandu",
        ngoPhone: r.ngoPhone || r.contact || "+977 984-1234567",
        ngoEmail: r.ngoEmail || "",
        ngoLocation: r.ngoLocation || "",
        portions: r.portions || r.requestedQuantity || "Standard Portions",
        location: r.location || "Kathmandu, Nepal",
        pickupWindow: r.pickupWindow || "Flexible Pickup",
        status: r.status || "Pending Admin Approval",
        requestDate: r.requestDate || (r.createdAt ? formatToNepaliTime(r.createdAt) : formatToNepaliTime()),
        requestedAt: r.requestDate || (r.createdAt ? formatToNepaliTime(r.createdAt) : "Recently"),
        image: formatImageUrl(r.image || "/food.png"),
        contact: r.contact || "+977 9841234567",
        ngoId: r.ngoId || r.receiverId,
        ngoName: r.ngoName || r.receiverName || "Hope Foundation Nepal",
        ngoOrg: r.ngoOrg || "Hope Foundation",
        createdAt: r.createdAt || new Date().toISOString(),
      }));

      saveRequests(normalized);
    }
  } catch (err) {
    console.warn("Could not sync requests from live backend, using local store:", err.message);
  }
}

if (typeof window !== "undefined") {
  setTimeout(() => syncRequestsFromBackend(), 400);
}

/**
 * Add a new request to the store and backend.
 */
export function addRequest(request) {
  const current = getRequests();
  const newId = request.id || `req-${Date.now()}`;
  const nepaliNow = formatToNepaliTime(request.createdAt || new Date());

  const formattedRequest = {
    id: newId,
    listingId: request.listingId || null,
    foodTitle: request.foodTitle || request.foodName || "Requested Food Item",
    donorName: request.donorName || "Community Food Partner",
    donorId: request.donorId || null,
    donorPhone: request.donorPhone || "",
    donorEmail: request.donorEmail || "",
    donorLocation: request.donorLocation || request.location || "Kathmandu",
    ngoPhone: request.ngoPhone || request.contact || "+977 984-1234567",
    ngoEmail: request.ngoEmail || "",
    ngoLocation: request.ngoLocation || "",
    portions: request.portions || "Standard Portions",
    location: request.location || "Kathmandu, Nepal",
    pickupWindow: request.pickupWindow || "Flexible Pickup",
    status: request.status || "Pending Admin Approval",
    requestDate: request.requestDate || nepaliNow,
    requestedAt: request.requestedAt && request.requestedAt !== "Just now" ? request.requestedAt : nepaliNow,
    image: formatImageUrl(request.image || "/food.png"),
    contact: request.contact || "Contact through platform",
    ngoId: request.ngoId || null,
    ngoName: request.ngoName || "Verified NGO Partner",
    ngoOrg: request.ngoOrg || "Community Shelter",
    createdAt: request.createdAt || new Date().toISOString(),
  };

  const updated = [formattedRequest, ...current];
  saveRequests(updated);

  // Send to backend API
  api.requests
    .create({
      listingId: formattedRequest.listingId ? String(formattedRequest.listingId) : null,
      foodTitle: formattedRequest.foodTitle,
      foodName: formattedRequest.foodTitle,
      donorName: formattedRequest.donorName,
      donorId: formattedRequest.donorId,
      donorPhone: formattedRequest.donorPhone,
      donorLocation: formattedRequest.donorLocation,
      ngoPhone: formattedRequest.ngoPhone,
      ngoEmail: formattedRequest.ngoEmail,
      requestedQuantity: formattedRequest.portions,
      portions: formattedRequest.portions,
      location: formattedRequest.location,
      pickupWindow: formattedRequest.pickupWindow,
      status: formattedRequest.status,
      requestDate: formattedRequest.requestDate,
      requestedAt: formattedRequest.requestedAt,
      image: formattedRequest.image,
      contact: formattedRequest.contact,
      ngoName: formattedRequest.ngoName,
      ngoOrg: formattedRequest.ngoOrg,
      receiverName: formattedRequest.ngoName,
    })
    .catch((err) => console.warn("Backend request post error (fallback active):", err.message));

  return formattedRequest;
}

/**
 * Update request status in store and backend
 */
export function updateRequestStatus(id, status, extraData = {}) {
  const current = getRequests();
  const updated = current.map((r) => {
    if (String(r.id) === String(id) || (r._id && String(r._id) === String(id))) {
      return { ...r, status, ...extraData };
    }
    return r;
  });

  saveRequests(updated);

  if (id) {
    api.requests.updateStatus(id, status, extraData).catch((err) => {
      console.warn("Failed to persist request status to backend:", err.message);
    });
  }

  return updated;
}

/**
 * Delete a request from the store and backend
 */
export function deleteRequest(id) {
  const current = getRequests();
  const updated = current.filter((r) => String(r.id) !== String(id) && String(r._id) !== String(id));
  saveRequests(updated);

  if (id) {
    api.requests.delete(id).catch((err) => {
      console.warn("Failed to delete request from backend:", err.message);
    });
  }

  return updated;
}
