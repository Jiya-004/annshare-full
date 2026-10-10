/**
 * ANNShare Unified Frontend API Client
 * Connects Frontend directly to Express + MongoDB Backend API
 */

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:8000/api' : 'https://annshare-backend.onrender.com/api');

const getAuthHeaders = () => {
  const token = localStorage.getItem('annshare_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.warn(`[API] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Authentication & Users
  auth: {
    login: async (email, password) => {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.token) {
        localStorage.setItem('annshare_token', data.token);
      }
      return data;
    },
    register: async (userData) => {
      const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      if (data.token) {
        localStorage.setItem('annshare_token', data.token);
      }
      return data;
    },
    getMe: () => request('/auth/me'),
    updateProfile: (profileData) =>
      request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
  },

  // Food Listings / Donations
  listings: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/listings${query ? `?${query}` : ''}`);
    },
    getById: (id) => request(`/listings/${id}`),
    create: (listingData) =>
      request('/listings', {
        method: 'POST',
        body: JSON.stringify(listingData),
      }),
    update: (id, listingData) =>
      request(`/listings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(listingData),
      }),
    updateStatus: (id, status, claimedBy = null, claimedById = null) =>
      request(`/listings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, claimedBy, claimedById }),
      }),
    delete: (id) =>
      request(`/listings/${id}`, {
        method: 'DELETE',
      }),
  },

  // Food Requests & Claims
  requests: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/requests${query ? `?${query}` : ''}`);
    },
    getById: (id) => request(`/requests/${id}`),
    create: (requestData) =>
      request('/requests', {
        method: 'POST',
        body: JSON.stringify(requestData),
      }),
    updateStatus: (id, status) =>
      request(`/requests/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    delete: (id) =>
      request(`/requests/${id}`, {
        method: 'DELETE',
      }),
  },

  // Categories
  categories: {
    getAll: () => request('/categories'),
    create: (catData) =>
      request('/categories', {
        method: 'POST',
        body: JSON.stringify(catData),
      }),
  },

  // Contact / Feedback / Support
  feedback: {
    create: (feedbackData) =>
      request('/feedback', {
        method: 'POST',
        body: JSON.stringify(feedbackData),
      }),
  },

  // Content Management: Blogs & FAQs
  blogs: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/blogs${query ? `?${query}` : ''}`);
    },
    getBySlug: (slug) => request(`/blogs/${slug}`),
    create: (blogData) =>
      request('/blogs', {
        method: 'POST',
        body: JSON.stringify(blogData),
      }),
  },

  faqs: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/faqs${query ? `?${query}` : ''}`);
    },
    create: (faqData) =>
      request('/faqs', {
        method: 'POST',
        body: JSON.stringify(faqData),
      }),
  },

  // Image Upload
  upload: {
    image: async (fileOrBase64, name = 'upload.jpg') => {
      let payload = fileOrBase64;
      if (typeof window !== 'undefined' && (fileOrBase64 instanceof File || fileOrBase64 instanceof Blob)) {
        payload = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(fileOrBase64);
        });
      }
      return request('/upload', {
        method: 'POST',
        body: JSON.stringify({ image: payload, name }),
      });
    },
  },

  // Dashboard Stats
  stats: {
    getSummary: () => request('/stats/summary'),
  },
};

export default api;
