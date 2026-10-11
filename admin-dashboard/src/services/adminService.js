// ANNShare Admin Dashboard Service Layer
// Connects directly to Express + MongoDB Backend API with real-time state synchronization

import {
  mockAdminUser,
  initialUsersStore,
  initialCategoriesStore,
  initialListingsStore,
  initialRequestsStore,
  initialSchedulesStore,
  initialFeedbackStore,
  initialBlogsStore,
  initialFaqsStore,
  initialBlogCategoriesStore,
  initialFaqCategoriesStore,
  mockSummaryReport,
  initialWorkerDonationsStore,
} from '../data/adminStore';

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:8000/api' : 'https://annshare-backend.onrender.com/api');
const BACKEND_HOST = API_BASE.replace(/\/api\/?$/, '');

// Preset distinct food images per category to avoid identical fallback thumbnails
export const CATEGORY_FALLBACK_IMAGES = {
  'Prepared Meals': [
    '/food/food1.jpg',
    '/food/food3.jpg',
    '/food/food8.jpg',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  ],
  'Bakery & Bread': [
    '/food/food2.jpg',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
  ],
  'Fruits & Veggies': [
    '/food/food4.jpg',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80',
  ],
  'Dairy & Pantry': [
    '/food/food7.jpg',
    'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
  ],
  'Packaged Food': [
    '/food/food5.jpg',
    'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1607349913338-fca6f7429606?auto=format&fit=crop&w=600&q=80',
  ],
  'Rice & Grains': [
    '/food/food3.jpg',
    '/food/food6.jpg',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
  ],
  'Groceries': [
    '/food/food5.jpg',
    '/food/food6.jpg',
    'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=600&q=80',
  ],
};

export const DEFAULT_FOOD_IMAGES = [
  '/food/food1.jpg',
  '/food/food2.jpg',
  '/food/food3.jpg',
  '/food/food4.jpg',
  '/food/food5.jpg',
  '/food/food6.jpg',
  '/food/food7.jpg',
  '/food/food8.jpg',
];

export const getListingFallbackImage = (itemOrCategory, index = 0) => {
  const category = typeof itemOrCategory === 'object' && itemOrCategory !== null
    ? (itemOrCategory.category || '')
    : (typeof itemOrCategory === 'string' ? itemOrCategory : '');

  const idOrTitle = typeof itemOrCategory === 'object' && itemOrCategory !== null
    ? (itemOrCategory.id || itemOrCategory._id || itemOrCategory.title || itemOrCategory.foodName || '')
    : '';

  let seed = index || 0;
  if (idOrTitle && typeof idOrTitle === 'string') {
    for (let i = 0; i < idOrTitle.length; i++) {
      seed = ((seed << 5) - seed + idOrTitle.charCodeAt(i)) | 0;
    }
  }
  const absSeed = Math.abs(seed);

  const catLower = (category || '').toLowerCase();
  const matchedKey = Object.keys(CATEGORY_FALLBACK_IMAGES).find(k =>
    catLower.includes(k.toLowerCase()) || k.toLowerCase().includes(catLower)
  );

  if (matchedKey && CATEGORY_FALLBACK_IMAGES[matchedKey]?.length > 0) {
    const list = CATEGORY_FALLBACK_IMAGES[matchedKey];
    return list[absSeed % list.length];
  }

  return DEFAULT_FOOD_IMAGES[absSeed % DEFAULT_FOOD_IMAGES.length];
};

// Uploaded images are stored on the live Render backend — always resolve /uploads/ there
const RENDER_BACKEND = 'https://annshare-backend.onrender.com';

export const formatImageUrl = (url, fallbackCategory = '', index = 0) => {
  if (!url || url === '/food.png') return getListingFallbackImage(fallbackCategory, index);
  if (url.startsWith('data:')) {
    // base64 image — render inline
    return url;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    // Uploads are persisted on Render — always point there even in local dev
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${RENDER_BACKEND}${cleanPath}`;
  }
  if (url.startsWith('/food/') || url.startsWith('food/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }
  return url;
};

export const formatToNepaliTime = (dateInput) => {
  if (!dateInput) return 'Today';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return dateInput;
    return d.toLocaleString('en-US', {
      timeZone: 'Asia/Kathmandu',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (e) {
    return String(dateInput);
  }
};

let listeners = [];

// Local In-Memory State Cache
let usersState = [...initialUsersStore];
let categoriesState = [...initialCategoriesStore];
let listingsState = [...initialListingsStore];
let requestsState = [...initialRequestsStore];
let schedulesState = [...initialSchedulesStore];
let feedbackState = [...initialFeedbackStore];
let blogsState = [...initialBlogsStore];
let faqsState = [...initialFaqsStore];
let blogCategoriesState = [...initialBlogCategoriesStore];
let faqCategoriesState = [...initialFaqCategoriesStore];
let notificationsState = [
  { id: "NT-1", title: "NGO Verification Request", desc: "Mercy Community Food Pantry submitted verification audit.", time: "10m ago", read: false, linkTab: "Users" },
  { id: "NT-2", title: "New Food Request", desc: "St. Jude Shelter requested Bakery Surplus.", time: "45m ago", read: false, linkTab: "Requests" },
  { id: "NT-3", title: "Donation Expiring Soon", desc: "Green Kitchen 50 Warm Meal Boxes expires in 2 hours.", time: "1h ago", read: false, linkTab: "Donations" },
  { id: "NT-4", title: "New Complaint Logged", desc: "High priority ticket logged for Pickup #DON-505.", time: "2h ago", read: true, linkTab: "Feedback" }
];

let dashboardStatsState = { ...mockSummaryReport };
let currentAdminSession = JSON.parse(localStorage.getItem('annshare_admin_session') || 'null');
if (currentAdminSession?.user) {
  if (currentAdminSession.user.phone === '+977 9841234567' || currentAdminSession.user.phone === '+977 9841000001') {
    currentAdminSession.user.phone = '';
  } else if (currentAdminSession.user.phone && /[a-zA-Z]/.test(currentAdminSession.user.phone)) {
    let digits = currentAdminSession.user.phone.replace(/\D/g, '');
    if (digits.startsWith('977')) digits = digits.slice(3);
    digits = digits.slice(0, 10);
    currentAdminSession.user.phone = digits ? `+977 ${digits}` : '';
  }
  try {
    localStorage.setItem('annshare_admin_session', JSON.stringify(currentAdminSession));
  } catch (e) {}
}

const getAuthHeaders = () => {
  const token = currentAdminSession?.token || localStorage.getItem('annshare_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error("Listener error:", e);
    }
  });
};

export const subscribeToAdminService = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

// ==========================================
// 0. ASYNC INITIAL BACKEND SYNC (MODULAR & PARALLEL)
// ==========================================

export const syncProfileFromBackend = async () => {
  const token = currentAdminSession?.token || (typeof localStorage !== 'undefined' ? localStorage.getItem('annshare_admin_token') : null);
  if (!token) return;
  try {
    const meRes = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeaders() }).catch(() => null);
    if (meRes && meRes.ok) {
      const meData = await meRes.json();
      if (currentAdminSession) {
        currentAdminSession.user = {
          ...currentAdminSession.user,
          id: meData.id || meData._id || currentAdminSession.user.id,
          name: meData.name || currentAdminSession.user.name,
          email: meData.email || currentAdminSession.user.email,
          phone: meData.phone !== undefined ? meData.phone : (currentAdminSession.user.phone || ''),
          organization: meData.organization || meData.orgName || currentAdminSession.user.organization,
        };
        localStorage.setItem('annshare_admin_session', JSON.stringify(currentAdminSession));
        notifyListeners();
      }
    }
  } catch (e) {}
};

export const syncRequestsFromBackend = async () => {
  try {
    const reqRes = await fetch(`${API_BASE}/requests`, { headers: getAuthHeaders() }).catch(() => null);
    if (reqRes && reqRes.ok) {
      const reqData = await reqRes.json();
      if (Array.isArray(reqData)) {
        requestsState = reqData.map((r) => {
          let cleanedNgoPhone = r.ngoPhone || '';
          if (!cleanedNgoPhone && r.contact) {
            const match = r.contact.match(/\+?\d[\d\s-]{8,}/);
            cleanedNgoPhone = match ? match[0].trim() : r.contact;
          }
          if (cleanedNgoPhone === '+977 984-1234567' || cleanedNgoPhone === '+977 9841234567') {
            cleanedNgoPhone = '';
          }

          let cleanedDonorPhone = r.donorPhone || '';
          if (cleanedDonorPhone === '+977 980-1234567' || cleanedDonorPhone === '+977 9801234567') {
            cleanedDonorPhone = '';
          }

          return {
            id: r.id || r._id,
            _id: r._id,
            receiverName: r.receiverName || r.ngoName || 'Community Shelter',
            receiverId: r.receiverId || r.ngoId || '',
            foodName: r.foodName || r.foodTitle || 'Requested Food',
            foodTitle: r.foodTitle || r.foodName || 'Requested Food',
            donationId: r.donationId || r.listingId || '',
            donorName: r.donorName || 'Food Partner',
            donorPhone: cleanedDonorPhone,
            ngoPhone: cleanedNgoPhone,
            requestedQuantity: r.requestedQuantity || r.portions || '1 batch',
            requestDate: r.createdAt ? formatToNepaliTime(r.createdAt) : formatToNepaliTime(r.requestDate || r.requestedAt || 'Today'),
            status: r.status || 'Pending Admin Approval',
            reason: r.reason || 'Community food distribution',
            pickupWindow: r.pickupWindow || '',
            location: r.location || '',
            image: formatImageUrl(r.image || '/food.png'),
          };
        });
        notifyListeners();
        return requestsState;
      }
    }
  } catch (err) {
    console.warn("syncRequestsFromBackend notice:", err.message);
  }
  return requestsState;
};

export const syncUsersFromBackend = async () => {
  try {
    const usersRes = await fetch(`${API_BASE}/auth/users`, { headers: getAuthHeaders() }).catch(() => null);
    if (usersRes && usersRes.ok) {
      const usersData = await usersRes.json();
      if (Array.isArray(usersData) && usersData.length > 0) {
        usersState = usersData.map((u) => ({
          id: u.id || u._id,
          _id: u._id,
          name: u.name,
          email: u.email,
          phone: u.phone || '',
          role: u.role,
          orgName: u.orgName || u.organization || u.name,
          location: u.location || 'Kathmandu',
          joinedDate: u.joinedDate || 'Jan 12, 2026',
          verificationStatus: u.verificationStatus || 'verified',
          status: u.status || 'Active',
          avatarText: u.avatarText || (u.name ? u.name[0].toUpperCase() : 'U'),
          totalDonations: u.totalDonations || 0,
          completedDonations: u.completedDonations || 0,
          activeDonations: u.activeDonations || 0,
          totalRequests: u.totalRequests || 0,
          completedPickups: u.completedPickups || 0,
          docs: u.docs || [],
        }));
        notifyListeners();
      }
    }
  } catch (e) {}
};

export const syncListingsFromBackend = async () => {
  try {
    const listingsRes = await fetch(`${API_BASE}/listings`, { headers: getAuthHeaders() }).catch(() => null);
    if (listingsRes && listingsRes.ok) {
      const listingsData = await listingsRes.json();
      if (Array.isArray(listingsData)) {
        listingsState = listingsData.map((d, idx) => ({
          id: d.id || d._id,
          _id: d._id,
          title: d.title || d.foodName,
          foodName: d.foodName || d.title,
          category: d.category || 'Prepared Meals',
          donor: d.donor || d.restaurantName || 'Food Partner',
          donorId: d.donorId || '',
          quantity: d.quantity || '1 batch',
          weight_kg: Number(d.weight_kg) || 5,
          location: d.location || 'Kathmandu',
          postedDate: d.createdAt ? formatToNepaliTime(d.createdAt) : formatToNepaliTime(d.postedDate || 'Today'),
          expiryTime: d.expiryTime || 'Today at 8:00 PM',
          expires_at: d.expires_at || '',
          bestBefore: d.bestBefore || '',
          condition: d.condition || '',
          status: d.status || 'Available',
          claimedBy: d.claimedBy || null,
          image: formatImageUrl(d.image || (d.images && d.images[0]), d.category, idx),
        }));
        notifyListeners();
        return listingsState;
      }
    }
  } catch (e) {
    console.warn("syncListingsFromBackend error:", e.message);
  }
  return listingsState;
};

export const syncCategoriesFromBackend = async () => {
  try {
    const catRes = await fetch(`${API_BASE}/categories`, { headers: getAuthHeaders() }).catch(() => null);
    if (catRes && catRes.ok) {
      const catData = await catRes.json();
      if (Array.isArray(catData) && catData.length > 0) {
        categoriesState = catData.map((c) => ({
          id: c.id || c._id,
          _id: c._id,
          name: c.name,
          slug: c.slug,
          icon: c.icon || 'utensils',
          description: c.description || '',
          color: c.color || '#173F35',
          itemCount: c.itemCount || 0,
          status: c.status || 'Active',
        }));
        notifyListeners();
      }
    }
  } catch (e) {}
};

export const syncFeedbackFromBackend = async () => {
  try {
    const feedRes = await fetch(`${API_BASE}/feedback`, { headers: getAuthHeaders() }).catch(() => null);
    if (feedRes && feedRes.ok) {
      const feedData = await feedRes.json();
      if (Array.isArray(feedData) && feedData.length > 0) {
        feedbackState = feedData.map((f) => ({
          id: f.id || f._id,
          _id: f._id,
          fullName: f.fullName || f.userName,
          userName: f.userName || f.fullName,
          userRole: f.userRole || 'User',
          email: f.email,
          phone: f.phone || '',
          organization: f.organization || '',
          topic: f.topic || f.type || 'General',
          type: f.type || 'Inquiry',
          subject: f.subject || f.topic || 'Inquiry',
          message: f.message || f.description || '',
          description: f.description || f.message || '',
          date: f.date || 'Today',
          priority: f.priority || 'Medium',
          status: f.status || 'Open',
          response: f.response || '',
        }));
        notifyListeners();
      }
    }
  } catch (e) {}
};

export const syncBlogsAndFaqsFromBackend = async () => {
  try {
    const [blogRes, faqRes] = await Promise.all([
      fetch(`${API_BASE}/blogs`, { headers: getAuthHeaders() }).catch(() => null),
      fetch(`${API_BASE}/faqs`, { headers: getAuthHeaders() }).catch(() => null),
    ]);
    if (blogRes && blogRes.ok) {
      const blogData = await blogRes.json();
      if (Array.isArray(blogData) && blogData.length > 0) {
        blogsState = blogData.map((b) => ({
          id: b.id || b._id,
          _id: b._id,
          title: b.title,
          slug: b.slug,
          authorName: b.authorName || 'ANNShare Lead',
          authorRole: b.authorRole || 'Lead',
          authorAvatar: b.authorAvatar || 'AS',
          category: b.category || 'Community Impact',
          readTime: b.readTime || '5 min read',
          publishedDate: b.publishedDate || 'Today',
          image: formatImageUrl(b.image || '/food.png'),
          excerpt: b.excerpt || '',
          content: b.content || '',
          isFeatured: b.isFeatured || false,
          status: b.status || 'Published',
        }));
      }
    }
    if (faqRes && faqRes.ok) {
      const faqData = await faqRes.json();
      if (Array.isArray(faqData) && faqData.length > 0) {
        faqsState = faqData.map((f) => ({
          id: f.id || f._id,
          _id: f._id,
          question: f.question,
          answer: f.answer,
          category: f.category || 'General',
          displayOrder: f.displayOrder || 1,
          status: f.status || 'Active',
        }));
      }
    }
    notifyListeners();
  } catch (e) {}
};

export const syncStatsFromBackend = async () => {
  try {
    const statsRes = await fetch(`${API_BASE}/stats/summary`, { headers: getAuthHeaders() }).catch(() => null);
    if (statsRes && statsRes.ok) {
      const statsData = await statsRes.json();
      dashboardStatsState = { ...dashboardStatsState, ...statsData };
      notifyListeners();
    }
  } catch (e) {}
};

export const syncNotificationsFromBackend = async () => {
  try {
    const notifRes = await fetch(`${API_BASE}/notifications?role=admin`, { headers: getAuthHeaders() }).catch(() => null);
    if (notifRes && notifRes.ok) {
      const notifData = await notifRes.json();
      if (Array.isArray(notifData) && notifData.length > 0) {
        notificationsState = notifData.map((n) => ({
          id: n.id || n._id,
          _id: n._id,
          title: n.title,
          desc: n.desc,
          time: n.time || 'Just now',
          read: n.read || false,
          linkTab: n.linkTab || 'Dashboard',
        }));
        notifyListeners();
      }
    }
  } catch (e) {}
};

export const syncAllFromBackend = async () => {
  try {
    await syncProfileFromBackend();
    await Promise.allSettled([
      syncRequestsFromBackend(),
      syncUsersFromBackend(),
      syncListingsFromBackend(),
      syncCategoriesFromBackend(),
      syncFeedbackFromBackend(),
      syncBlogsAndFaqsFromBackend(),
      syncStatsFromBackend(),
      syncNotificationsFromBackend(),
    ]);
  } catch (err) {
    console.warn("Backend sync notice:", err.message);
  }
};

// Trigger auto sync on load
if (typeof window !== "undefined") {
  setTimeout(() => syncAllFromBackend(), 200);
}

// ==========================================
// 1. AUTHENTICATION & SESSION GUARD
// ==========================================

export const loginAdmin = async (email, password) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail || !cleanPassword) {
    throw new Error('Please enter both email and password.');
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
    });

    if (res.ok) {
      const data = await res.json();

      // Enforce strict admin role authorization
      if (data.role !== 'admin') {
        throw new Error('Access denied: Only system administrators are authorized to access this dashboard.');
      }

      const session = {
        token: data.token,
        user: {
          id: data.id || data._id,
          name: data.name || 'Admin User',
          email: data.email || cleanEmail,
          phone: data.phone || '',
          role: data.role || 'admin',
          organization: data.organization || data.orgName || 'ANNShare Operations',
          badge: data.badge || 'System Admin',
          avatarText: data.avatarText || (data.name ? data.name[0].toUpperCase() : 'A'),
        },
      };

      currentAdminSession = session;
      localStorage.setItem('annshare_admin_session', JSON.stringify(session));
      if (data.token) {
        localStorage.setItem('annshare_admin_token', data.token);
      }
      notifyListeners();
      syncAllFromBackend();
      return session;
    } else {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Invalid email or password. Please check your credentials.');
    }
  } catch (err) {
    if (err.message) {
      throw err;
    }
    throw new Error('Unable to connect to authentication server. Please ensure the backend is running.');
  }
};

export const logoutAdmin = () => {
  currentAdminSession = null;
  localStorage.removeItem('annshare_admin_session');
  localStorage.removeItem('annshare_admin_token');
  notifyListeners();
};

export const isAuthenticatedAdmin = () => {
  return !!localStorage.getItem('annshare_admin_session');
};

export const getAdminProfile = () => {
  return currentAdminSession ? currentAdminSession.user : mockAdminUser;
};

// ==========================================
// 2. DASHBOARD READERS & DATA ACCESSORS
// ==========================================

export const getDashboardStats = () => {
  const totalDonors = usersState.filter((u) => u.role === 'donor' || u.role === 'restaurant').length;
  const totalReceivers = usersState.filter((u) => u.role === 'ngo').length;
  const activeDonations = listingsState.filter((d) => d.status === 'Available' || d.status === 'Requested' || d.status === 'available').length;

  return {
    ...dashboardStatsState,
    activeDonations: activeDonations || dashboardStatsState.activeDonations || 5,
    totalDonors: totalDonors || dashboardStatsState.totalDonors || 14,
    totalReceivers: totalReceivers || dashboardStatsState.totalReceivers || 9,
    totalNgos: totalReceivers || dashboardStatsState.totalNgos || 9,
  };
};

export const getUsers = () => [...usersState];
export const getDonations = () => [...listingsState];
export const getRequests = () => [...requestsState];
export const getCategories = () => [...categoriesState];
export const getSchedules = () => [...schedulesState];
export const getComplaints = () => [...feedbackState];
export const getBlogs = () => [...blogsState];
export const getFaqs = () => [...faqsState];
export const getBlogCategories = () => [...blogCategoriesState];
export const getFaqCategories = () => [...faqCategoriesState];
export const getNotifications = () => [...notificationsState];

export const markNotificationRead = (notifId) => {
  notificationsState = notificationsState.map((n) => (n.id === notifId ? { ...n, read: true } : n));
  fetch(`${API_BASE}/notifications/${notifId}/read`, { method: 'PATCH', headers: getAuthHeaders() }).catch(() => {});
  notifyListeners();
};

export const markAllNotificationsRead = () => {
  notificationsState = notificationsState.map((n) => ({ ...n, read: true }));
  fetch(`${API_BASE}/notifications/read-all`, { method: 'PATCH', headers: getAuthHeaders() }).catch(() => {});
  notifyListeners();
};

// ==========================================
// 3. WIDGET ACTIONS & STATE MUTATIONS
// ==========================================

export const updateUserStatus = (userId, newStatus, newVerification) => {
  const targetUser = usersState.find((u) => u.id === userId || u._id === userId);
  const realId = targetUser?._id || targetUser?.id || userId;
  const email = targetUser?.email;

  usersState = usersState.map((u) => {
    if (u.id === userId || u._id === userId) {
      return {
        ...u,
        ...(newStatus ? { status: newStatus } : {}),
        ...(newVerification ? { verificationStatus: newVerification } : {}),
      };
    }
    return u;
  });

  fetch(`${API_BASE}/auth/users/${realId}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus, verificationStatus: newVerification, email }),
  }).catch(() => {});

  notifyListeners();
};

export const verifyNGO = (ngoId) => {
  const targetUser = usersState.find((u) => u.id === ngoId || u._id === ngoId || u.id === `USR-${ngoId}`);
  const realId = targetUser?._id || targetUser?.id || ngoId;

  usersState = usersState.map((u) => {
    if (u.id === ngoId || u._id === ngoId || u.id === `USR-${ngoId}`) {
      return {
        ...u,
        verificationStatus: 'verified',
        docs: u.docs ? u.docs.map((d) => ({ ...d, status: 'verified' })) : [],
      };
    }
    return u;
  });

  fetch(`${API_BASE}/auth/users/${realId}/verify`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  }).catch(() => {});

  notifyListeners();
};

export const deleteUser = (userId) => {
  const targetUser = usersState.find((u) => u.id === userId || u._id === userId);
  const realId = targetUser?._id || targetUser?.id || userId;
  const email = targetUser?.email;

  usersState = usersState.filter((u) => u.id !== userId && u._id !== userId);
  fetch(`${API_BASE}/auth/users/${realId}${email ? `?email=${encodeURIComponent(email)}` : ''}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const createUser = async (userData) => {
  const { name, email, phone, role, password, organization, location } = userData;
  let cleanPhone = (phone || '').replace(/\D/g, '');
  if (cleanPhone.startsWith('977') && cleanPhone.length >= 13) {
    cleanPhone = cleanPhone.slice(3);
  }

  if (!cleanPhone || cleanPhone.length !== 10 || !/^(98|97)/.test(cleanPhone)) {
    throw new Error('Please enter a valid 10-digit mobile number starting with 98 or 97.');
  }

  // Check email and phone uniqueness in local state
  if (usersState.some((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase())) {
    throw new Error('User with this email already exists.');
  }
  if (usersState.some((u) => {
    let uPhone = (u.phone || '').replace(/\D/g, '');
    if (uPhone.startsWith('977') && uPhone.length >= 13) uPhone = uPhone.slice(3);
    return uPhone === cleanPhone;
  })) {
    throw new Error('This phone number is already registered to another account. Each user must have a unique phone number.');
  }

  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: cleanPhone || phone,
        role: role || 'donor',
        password: password || 'password123',
        organization: organization || name,
        location: location || 'Kathmandu, Nepal',
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to create user');
    }
    await syncUsersFromBackend();
    return data;
  } catch (err) {
    if (err.message && (err.message.includes('already exists') || err.message.includes('already registered'))) {
      throw err;
    }
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone: cleanPhone || phone,
      role: role || 'donor',
      orgName: organization || name,
      location: location || 'Kathmandu, Nepal',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      verificationStatus: role === 'ngo' ? 'pending' : 'verified',
      status: 'Active',
      avatarText: (name && name[0] ? name[0] : 'U').toUpperCase(),
      totalDonations: 0,
      completedDonations: 0,
      activeDonations: 0,
      totalRequests: 0,
      completedPickups: 0,
      docs: [],
    };
    usersState.unshift(newUser);
    notifyListeners();
    return newUser;
  }
};

export const updateDonationStatus = async (donationId, newStatus) => {
  listingsState = listingsState.map((d) => {
    if (d.id === donationId || d._id === donationId) {
      return { ...d, status: newStatus };
    }
    return d;
  });
  notifyListeners();

  try {
    await fetch(`${API_BASE}/listings/${donationId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: newStatus }),
    });
    await syncListingsFromBackend();
  } catch (e) {
    console.warn("updateDonationStatus error:", e);
  }
};

export const deleteDonation = (donationId) => {
  listingsState = listingsState.filter((d) => d.id !== donationId && d._id !== donationId);
  fetch(`${API_BASE}/listings/${donationId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const deleteRequest = async (requestId, requestObj = null) => {
  const mongoId = requestObj?._id || (typeof requestId === 'object' && requestId !== null ? (requestId._id || requestId.id) : requestId) || requestObj?.id;
  const targetId = String(mongoId || '').trim();

  if (!targetId || targetId === 'undefined' || targetId === '[object Object]') {
    console.error("deleteRequest: Invalid requestId provided:", requestId, requestObj);
    return false;
  }

  // Optimistically remove from local state
  requestsState = requestsState.filter((r) => String(r.id) !== targetId && String(r._id) !== targetId);
  notifyListeners();

  try {
    const res = await fetch(`${API_BASE}/requests/${targetId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn(`DELETE /api/requests/${targetId} failed with status ${res.status}:`, errData.message || res.statusText);
      await syncRequestsFromBackend();
      return false;
    }

    await syncRequestsFromBackend();
    return true;
  } catch (err) {
    console.warn("deleteRequest network error:", err.message);
    await syncRequestsFromBackend();
    return false;
  }
};

export const updateRequestStatus = (requestId, newStatus) => {
  requestsState = requestsState.map((r) => {
    if (r.id === requestId || r._id === requestId) {
      return { ...r, status: newStatus };
    }
    return r;
  });

  fetch(`${API_BASE}/requests/${requestId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus }),
  }).catch(() => {});

  notifyListeners();
};

export const saveCategory = (categoryData) => {
  if (categoryData.id || categoryData._id) {
    const targetId = categoryData.id || categoryData._id;
    categoriesState = categoriesState.map((c) => (c.id === targetId || c._id === targetId ? { ...c, ...categoryData } : c));
    fetch(`${API_BASE}/categories/${targetId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    }).catch(() => {});
  } else {
    const newCat = {
      ...categoryData,
      id: `CAT-${categoriesState.length + 1}`,
      itemCount: 0,
      color: categoryData.color || '#173F35',
    };
    categoriesState.push(newCat);
    fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(newCat),
    }).catch(() => {});
  }
  notifyListeners();
};

export const toggleCategoryStatus = (catId) => {
  categoriesState = categoriesState.map((c) => {
    if (c.id === catId || c._id === catId) {
      return { ...c, status: c.status === "Active" ? "Inactive" : "Active" };
    }
    return c;
  });

  fetch(`${API_BASE}/categories/${catId}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  }).catch(() => {});

  notifyListeners();
};

export const deleteCategory = (catId) => {
  categoriesState = categoriesState.filter((c) => c.id !== catId && c._id !== catId);
  fetch(`${API_BASE}/categories/${catId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const addSupportTicket = (ticketData) => {
  const newTicket = {
    id: `CMP-${300 + feedbackState.length + 1}`,
    userName: ticketData.fullName || "System Admin",
    fullName: ticketData.fullName || "System Admin",
    userRole: "Admin",
    type: "Support Ticket",
    subject: ticketData.subject,
    message: ticketData.message,
    description: ticketData.message,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    priority: "Medium",
    status: "Open",
    response: "",
  };
  feedbackState.unshift(newTicket);

  fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(newTicket),
  }).catch(() => {});

  notifyListeners();
  return newTicket;
};

export const updateComplaint = (complaintId, responseText, newStatus) => {
  feedbackState = feedbackState.map((c) => {
    if (c.id === complaintId || c._id === complaintId) {
      return {
        ...c,
        response: responseText,
        status: newStatus || "In Review",
      };
    }
    return c;
  });

  fetch(`${API_BASE}/feedback/${complaintId}/respond`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ response: responseText, status: newStatus || 'In Review' }),
  }).catch(() => {});

  notifyListeners();
};

export const deleteFeedback = (feedbackId) => {
  feedbackState = feedbackState.filter((c) => c.id !== feedbackId && c._id !== feedbackId);
  fetch(`${API_BASE}/feedback/${feedbackId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const deleteComplaint = deleteFeedback;

export const updateAdminProfile = async (data) => {
  if (currentAdminSession) {
    currentAdminSession.user = { ...currentAdminSession.user, ...data };
    localStorage.setItem('annshare_admin_session', JSON.stringify(currentAdminSession));
  }

  const token = currentAdminSession?.token || localStorage.getItem('annshare_admin_token');
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.message || 'Failed to update profile in database.');
      }

      if (currentAdminSession && resData) {
        currentAdminSession.user = {
          ...currentAdminSession.user,
          ...resData,
          id: resData.id || resData._id || currentAdminSession.user.id,
        };
        localStorage.setItem('annshare_admin_session', JSON.stringify(currentAdminSession));
      }
    } catch (err) {
      console.warn('Backend profile update failed:', err);
      throw err;
    }
  }

  notifyListeners();
  return currentAdminSession?.user;
};

export const changeAdminPassword = async (currentPassword, newPassword) => {
  const token = currentAdminSession?.token || localStorage.getItem('annshare_admin_token');
  if (token) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update password.');
    }
  }

  if (currentAdminSession) {
    currentAdminSession.password = newPassword;
    localStorage.setItem('annshare_admin_session', JSON.stringify(currentAdminSession));
  }
  notifyListeners();
  return { message: 'Password updated successfully' };
};

export const searchAll = (query) => {
  if (!query || query.trim() === '') return { users: [], donations: [], requests: [], ngos: [] };
  const q = query.toLowerCase();
  return {
    users: usersState.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)),
    donations: listingsState.filter((d) => (d.title || d.foodName || '').toLowerCase().includes(q) || (d.donor || '').toLowerCase().includes(q)),
    requests: requestsState.filter((r) => (r.foodName || r.foodTitle || '').toLowerCase().includes(q) || (r.receiverName || '').toLowerCase().includes(q)),
  };
};

// ==========================================
// 4. BLOGS & FAQS CONTENT MANAGEMENT & UPLOADS
// ==========================================

export const uploadImage = async (fileOrBase64, name = 'upload.jpg') => {
  try {
    let payload = fileOrBase64;
    if (typeof window !== 'undefined' && (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob)) {
      payload = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(fileOrBase64);
      });
    }

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: payload, name }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.url || data.path;
    }
    return payload;
  } catch (err) {
    console.warn("Upload fallback notice:", err.message);
    return fileOrBase64;
  }
};

export const saveBlog = async (blogData) => {
  const targetId = blogData._id || blogData.id;
  if (targetId) {
    // 1. Optimistic local update
    blogsState = blogsState.map((b) =>
      b.id === targetId || b._id === targetId ? { ...b, ...blogData } : b
    );
    notifyListeners();

    // 2. Persist to backend
    try {
      const res = await fetch(`${API_BASE}/blogs/${targetId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData),
      });
      if (res.ok) {
        const updated = await res.json();
        const realId = updated.id || updated._id || targetId;
        blogsState = blogsState.map((b) =>
          b.id === targetId || b._id === targetId
            ? { ...b, ...updated, id: realId, _id: updated._id }
            : b
        );
        notifyListeners();
        return updated;
      }
    } catch (e) {
      console.warn("Failed to update blog on backend:", e);
    }
  } else {
    // 1. Create new blog with temporary local ID
    const tempId = `BLG-${Date.now()}`;
    const newBlog = {
      ...blogData,
      id: tempId,
      slug: blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      publishedDate: blogData.publishedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: blogData.status || 'Published',
      isFeatured: blogData.isFeatured || false,
    };
    blogsState.unshift(newBlog);
    notifyListeners();

    // 2. Persist to backend and swap temp ID with real DB ID
    try {
      const res = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newBlog),
      });
      if (res.ok) {
        const created = await res.json();
        const realId = created.id || created._id;
        blogsState = blogsState.map((b) =>
          b.id === tempId
            ? { ...b, ...created, id: realId, _id: created._id }
            : b
        );
        notifyListeners();
        return created;
      }
    } catch (e) {
      console.warn("Failed to create blog on backend:", e);
    }
  }
};

export const deleteBlog = async (blogId) => {
  blogsState = blogsState.filter((b) => b.id !== blogId && b._id !== blogId);
  notifyListeners();

  try {
    await fetch(`${API_BASE}/blogs/${blogId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (e) {
    console.warn("Failed to delete blog on backend:", e);
  }
};

export const toggleBlogStatus = async (blogId) => {
  blogsState = blogsState.map((b) => {
    if (b.id === blogId || b._id === blogId) {
      return { ...b, status: b.status === 'Published' ? 'Draft' : 'Published' };
    }
    return b;
  });
  notifyListeners();

  try {
    await fetch(`${API_BASE}/blogs/${blogId}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
  } catch (e) {
    console.warn("Failed to toggle blog status on backend:", e);
  }
};

export const saveFaq = async (faqData) => {
  const targetId = faqData._id || faqData.id;
  if (targetId) {
    // 1. Optimistic update
    faqsState = faqsState.map((f) =>
      f.id === targetId || f._id === targetId ? { ...f, ...faqData } : f
    );
    notifyListeners();

    // 2. Persist to backend
    try {
      const res = await fetch(`${API_BASE}/faqs/${targetId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(faqData),
      });
      if (res.ok) {
        const updated = await res.json();
        const realId = updated.id || updated._id || targetId;
        faqsState = faqsState.map((f) =>
          f.id === targetId || f._id === targetId
            ? { ...f, ...updated, id: realId, _id: updated._id }
            : f
        );
        notifyListeners();
        return updated;
      }
    } catch (e) {
      console.warn("Failed to update FAQ on backend:", e);
    }
  } else {
    // 1. Create with temp ID
    const tempId = `FAQ-${Date.now()}`;
    const newFaq = {
      ...faqData,
      id: tempId,
      displayOrder: faqData.displayOrder || faqsState.length + 1,
      status: faqData.status || 'Active',
    };
    faqsState.push(newFaq);
    notifyListeners();

    // 2. Persist to backend and swap temp ID with real DB ID
    try {
      const res = await fetch(`${API_BASE}/faqs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newFaq),
      });
      if (res.ok) {
        const created = await res.json();
        const realId = created.id || created._id;
        faqsState = faqsState.map((f) =>
          f.id === tempId
            ? { ...f, ...created, id: realId, _id: created._id }
            : f
        );
        notifyListeners();
        return created;
      }
    } catch (e) {
      console.warn("Failed to create FAQ on backend:", e);
    }
  }
};

export const deleteFaq = async (faqId) => {
  faqsState = faqsState.filter((f) => f.id !== faqId && f._id !== faqId);
  notifyListeners();

  try {
    await fetch(`${API_BASE}/faqs/${faqId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (e) {
    console.warn("Failed to delete FAQ on backend:", e);
  }
};

export const toggleFaqStatus = async (faqId) => {
  faqsState = faqsState.map((f) => {
    if (f.id === faqId || f._id === faqId) {
      return { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' };
    }
    return f;
  });
  notifyListeners();

  try {
    await fetch(`${API_BASE}/faqs/${faqId}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
  } catch (e) {
    console.warn("Failed to toggle FAQ status on backend:", e);
  }
};

export const saveBlogCategory = (catData) => {
  if (catData.id || catData._id) {
    const targetId = catData.id || catData._id;
    blogCategoriesState = blogCategoriesState.map((c) => (c.id === targetId || c._id === targetId ? { ...c, ...catData } : c));
  } else {
    const newCat = {
      ...catData,
      id: `BCAT-${blogCategoriesState.length + 1}`,
      postCount: 0,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Active',
    };
    blogCategoriesState.push(newCat);
  }
  fetch(`${API_BASE}/category-extra/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(catData),
  }).catch(() => {});
  notifyListeners();
};

export const toggleBlogCategoryStatus = (catId) => {
  blogCategoriesState = blogCategoriesState.map((c) => (c.id === catId || c._id === catId ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
  fetch(`${API_BASE}/category-extra/blogs/${catId}/toggle`, { method: 'PATCH', headers: getAuthHeaders() }).catch(() => {});
  notifyListeners();
};

export const deleteBlogCategory = (catId) => {
  blogCategoriesState = blogCategoriesState.filter((c) => c.id !== catId && c._id !== catId);
  fetch(`${API_BASE}/category-extra/blogs/${catId}`, { method: 'DELETE', headers: getAuthHeaders() }).catch(() => {});
  notifyListeners();
};

export const saveFaqCategory = (catData) => {
  if (catData.id || catData._id) {
    const targetId = catData.id || catData._id;
    faqCategoriesState = faqCategoriesState.map((c) => (c.id === targetId || c._id === targetId ? { ...c, ...catData } : c));
  } else {
    const newCat = {
      ...catData,
      id: `FCAT-${faqCategoriesState.length + 1}`,
      faqCount: 0,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Active',
    };
    faqCategoriesState.push(newCat);
  }
  fetch(`${API_BASE}/category-extra/faqs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(catData),
  }).catch(() => {});
  notifyListeners();
};

export const toggleFaqCategoryStatus = (catId) => {
  faqCategoriesState = faqCategoriesState.map((c) => (c.id === catId || c._id === catId ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
  fetch(`${API_BASE}/category-extra/faqs/${catId}/toggle`, { method: 'PATCH', headers: getAuthHeaders() }).catch(() => {});
  notifyListeners();
};

export const deleteFaqCategory = (catId) => {
  faqCategoriesState = faqCategoriesState.filter((c) => c.id !== catId && c._id !== catId);
  fetch(`${API_BASE}/category-extra/faqs/${catId}`, { method: 'DELETE', headers: getAuthHeaders() }).catch(() => {});
  notifyListeners();
};

// ==========================================
// 5. CLIENT-SIDE EXPORT ACTION
// ==========================================

export const exportReportCSV = () => {
  let csvContent = 'Listing ID,Title,Category,Donor,Weight (kg),Status,Posted Date\n';
  listingsState.forEach((l) => {
    csvContent += `"${l.id || l._id}","${l.title || l.foodName}","${l.category}","${l.donor}",${l.weight_kg || 0},"${l.status}","${l.postedDate}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'ANNShare_Operational_Report_2026.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ==========================================
// 6. WORKER WELFARE FUND DONATIONS SERVICE
// ==========================================

const readStoredWorkerDonations = () => {
  try {
    const saved = localStorage.getItem('annshare_worker_donations');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return initialWorkerDonationsStore || [];
};

let workerDonationsState = readStoredWorkerDonations();

// Save state to localStorage
const persistWorkerDonations = (list) => {
  workerDonationsState = list;
  try {
    localStorage.setItem('annshare_worker_donations', JSON.stringify(list));
  } catch (e) {
    // ignore
  }
  notifyListeners();
};

// Sync worker donations from Backend MongoDB
export const syncWorkerDonationsFromBackend = async () => {
  try {
    const res = await fetch(`${API_BASE}/worker-donations`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && Array.isArray(json?.data) && json.data.length > 0) {
        persistWorkerDonations(json.data);
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[AdminService] Could not sync worker donations from backend:', err.message);
  }
  return workerDonationsState;
};

// Auto-sync on load
if (typeof window !== 'undefined') {
  syncWorkerDonationsFromBackend().catch(() => {});
  window.addEventListener('annshare_storage_update', () => {
    workerDonationsState = readStoredWorkerDonations();
    notifyListeners();
  });
}

export const getWorkerDonations = () => {
  return [...workerDonationsState];
};

export const getWorkerDonationStats = () => {
  const list = workerDonationsState;
  const totalRaised = list.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalCount = list.length;
  const verifiedCount = list.filter((d) => d.status === 'Verified' || d.status === 'Completed').length;
  const average = totalCount ? Math.round(totalRaised / totalCount) : 0;

  const methodBreakdown = {
    esewa: list.filter((d) => d.paymentMethod === 'esewa').reduce((s, d) => s + (Number(d.amount) || 0), 0),
    khalti: list.filter((d) => d.paymentMethod === 'khalti').reduce((s, d) => s + (Number(d.amount) || 0), 0),
    fonepay: list.filter((d) => d.paymentMethod === 'fonepay').reduce((s, d) => s + (Number(d.amount) || 0), 0),
    bank: list.filter((d) => d.paymentMethod === 'bank').reduce((s, d) => s + (Number(d.amount) || 0), 0),
  };

  return {
    totalRaised,
    totalCount,
    verifiedCount,
    average,
    methodBreakdown,
  };
};

export const updateWorkerDonationStatus = async (id, status, note = '') => {
  const updated = workerDonationsState.map((d) =>
    d.id === id || d._id === id || d.transactionId === id ? { ...d, status, ...(note ? { note } : {}) } : d
  );
  persistWorkerDonations(updated);

  try {
    const target = workerDonationsState.find((d) => d.id === id || d._id === id || d.transactionId === id);
    const targetId = target?._id || target?.id || id;
    await fetch(`${API_BASE}/worker-donations/${targetId}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, note }),
    });
  } catch (err) {
    // ignore
  }
};

export const deleteWorkerDonation = async (id) => {
  const updated = workerDonationsState.filter((d) => d.id !== id && d._id !== id && d.transactionId !== id);
  persistWorkerDonations(updated);

  try {
    await fetch(`${API_BASE}/worker-donations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (err) {
    // ignore
  }
};

