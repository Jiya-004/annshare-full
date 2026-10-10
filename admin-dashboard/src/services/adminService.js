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
} from '../data/adminStore';

const API_BASE = 'http://localhost:8000/api';

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
// 0. ASYNC INITIAL BACKEND SYNC
// ==========================================
export const syncAllFromBackend = async () => {
  try {
    // 1. Fetch Users
    const usersRes = await fetch(`${API_BASE}/auth/users`, { headers: getAuthHeaders() }).catch(() => null);
    if (usersRes && usersRes.ok) {
      const usersData = await usersRes.json();
      if (Array.isArray(usersData) && usersData.length > 0) {
        usersState = usersData.map((u) => ({
          id: u.id || u._id,
          _id: u._id,
          name: u.name,
          email: u.email,
          phone: u.phone || '+977 9841234567',
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
      }
    }

    // 2. Fetch Donations / Listings
    const listingsRes = await fetch(`${API_BASE}/listings`, { headers: getAuthHeaders() }).catch(() => null);
    if (listingsRes && listingsRes.ok) {
      const listingsData = await listingsRes.json();
      if (Array.isArray(listingsData) && listingsData.length > 0) {
        listingsState = listingsData.map((d) => ({
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
          postedDate: d.postedDate || 'Today',
          expiryTime: d.expiryTime || 'Today at 8:00 PM',
          expires_at: d.expires_at || '',
          status: d.status || 'Available',
          claimedBy: d.claimedBy || null,
          image: d.image || '/food.png',
        }));
      }
    }

    // 3. Fetch Requests
    const reqRes = await fetch(`${API_BASE}/requests`, { headers: getAuthHeaders() }).catch(() => null);
    if (reqRes && reqRes.ok) {
      const reqData = await reqRes.json();
      if (Array.isArray(reqData) && reqData.length > 0) {
        requestsState = reqData.map((r) => ({
          id: r.id || r._id,
          _id: r._id,
          receiverName: r.receiverName || r.ngoName || 'Community Shelter',
          receiverId: r.receiverId || r.ngoId || '',
          foodName: r.foodName || r.foodTitle || 'Requested Food',
          donationId: r.donationId || r.listingId || '',
          donorName: r.donorName || 'Food Partner',
          requestedQuantity: r.requestedQuantity || r.portions || '1 batch',
          requestDate: r.requestDate || r.requestedAt || 'Today',
          status: r.status === 'confirmed' ? 'Confirmed' : r.status === 'pending' ? 'Pending' : r.status || 'Confirmed',
          reason: r.reason || 'Community food distribution',
        }));
      }
    }

    // 4. Fetch Categories
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
      }
    }

    // 5. Fetch Feedback / Complaints
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
      }
    }

    // 6. Fetch Blogs & FAQs
    const blogRes = await fetch(`${API_BASE}/blogs`, { headers: getAuthHeaders() }).catch(() => null);
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
          image: b.image || '/food.png',
          excerpt: b.excerpt || '',
          content: b.content || '',
          isFeatured: b.isFeatured || false,
          status: b.status || 'Published',
        }));
      }
    }

    const faqRes = await fetch(`${API_BASE}/faqs`, { headers: getAuthHeaders() }).catch(() => null);
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

    // 7. Fetch Stats
    const statsRes = await fetch(`${API_BASE}/stats/summary`, { headers: getAuthHeaders() }).catch(() => null);
    if (statsRes && statsRes.ok) {
      const statsData = await statsRes.json();
      dashboardStatsState = { ...dashboardStatsState, ...statsData };
    }

    // 8. Fetch Notifications
    const notifRes = await fetch(`${API_BASE}/notifications`, { headers: getAuthHeaders() }).catch(() => null);
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
      }
    }

    notifyListeners();
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

  fetch(`${API_BASE}/auth/users/${userId}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus, verificationStatus: newVerification }),
  }).catch(() => {});

  notifyListeners();
};

export const verifyNGO = (ngoId) => {
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

  fetch(`${API_BASE}/auth/users/${ngoId}/verify`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  }).catch(() => {});

  notifyListeners();
};

export const deleteUser = (userId) => {
  usersState = usersState.filter((u) => u.id !== userId && u._id !== userId);
  fetch(`${API_BASE}/auth/users/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const updateDonationStatus = (donationId, newStatus) => {
  listingsState = listingsState.map((d) => {
    if (d.id === donationId || d._id === donationId) {
      return { ...d, status: newStatus };
    }
    return d;
  });

  fetch(`${API_BASE}/listings/${donationId}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus }),
  }).catch(() => {});

  notifyListeners();
};

export const deleteDonation = (donationId) => {
  listingsState = listingsState.filter((d) => d.id !== donationId && d._id !== donationId);
  fetch(`${API_BASE}/listings/${donationId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
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

export const updateAdminProfile = (data) => {
  if (currentAdminSession) {
    currentAdminSession.user = { ...currentAdminSession.user, ...data };
    localStorage.setItem('annshare_admin_session', JSON.stringify(currentAdminSession));
  }
  notifyListeners();
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

export const saveBlog = (blogData) => {
  if (blogData.id || blogData._id) {
    const targetId = blogData.id || blogData._id;
    blogsState = blogsState.map((b) => (b.id === targetId || b._id === targetId ? { ...b, ...blogData } : b));
    fetch(`${API_BASE}/blogs/${targetId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData),
    }).catch(() => {});
  } else {
    const newBlog = {
      ...blogData,
      id: `BLG-${100 + blogsState.length + 1}`,
      slug: blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      publishedDate: blogData.publishedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: blogData.status || 'Published',
      isFeatured: blogData.isFeatured || false,
    };
    blogsState.unshift(newBlog);
    fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(newBlog),
    }).catch(() => {});
  }
  notifyListeners();
};

export const deleteBlog = (blogId) => {
  blogsState = blogsState.filter((b) => b.id !== blogId && b._id !== blogId);
  fetch(`${API_BASE}/blogs/${blogId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const toggleBlogStatus = (blogId) => {
  blogsState = blogsState.map((b) => {
    if (b.id === blogId || b._id === blogId) {
      return { ...b, status: b.status === 'Published' ? 'Draft' : 'Published' };
    }
    return b;
  });

  fetch(`${API_BASE}/blogs/${blogId}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  }).catch(() => {});

  notifyListeners();
};

export const saveFaq = (faqData) => {
  if (faqData.id || faqData._id) {
    const targetId = faqData.id || faqData._id;
    faqsState = faqsState.map((f) => (f.id === targetId || f._id === targetId ? { ...f, ...faqData } : f));
    fetch(`${API_BASE}/faqs/${targetId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(faqData),
    }).catch(() => {});
  } else {
    const newFaq = {
      ...faqData,
      id: `FAQ-${200 + faqsState.length + 1}`,
      displayOrder: faqData.displayOrder || faqsState.length + 1,
      status: faqData.status || 'Active',
    };
    faqsState.push(newFaq);
    fetch(`${API_BASE}/faqs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(newFaq),
    }).catch(() => {});
  }
  notifyListeners();
};

export const deleteFaq = (faqId) => {
  faqsState = faqsState.filter((f) => f.id !== faqId && f._id !== faqId);
  fetch(`${API_BASE}/faqs/${faqId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).catch(() => {});
  notifyListeners();
};

export const toggleFaqStatus = (faqId) => {
  faqsState = faqsState.map((f) => {
    if (f.id === faqId || f._id === faqId) {
      return { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' };
    }
    return f;
  });

  fetch(`${API_BASE}/faqs/${faqId}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  }).catch(() => {});

  notifyListeners();
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
