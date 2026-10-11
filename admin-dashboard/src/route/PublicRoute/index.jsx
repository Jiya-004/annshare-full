import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

import AdminDashboard from '../../frontend/AdminDashboard';
import UserManagement from '../../frontend/UserManagement';
import DonationManagement from '../../frontend/DonationManagement';
import RequestManagement from '../../frontend/RequestManagement';
import CategoryManagement from '../../frontend/CategoryManagement';
import Reports from '../../frontend/Reports';
import Feedback from '../../frontend/Feedback';
import Settings from '../../frontend/Settings';
import ContentManagement from '../../frontend/ContentManagement';
import WorkerDonations from '../../frontend/WorkerDonations';

const STORAGE_KEY = 'annshare_admin_active_nav';

const NAV_SLUG_MAP = {
  'dashboard': 'Dashboard',
  'users': 'Users',
  'donations': 'Donations',
  'worker-donations': 'Worker Donations',
  'worker-fund': 'Worker Donations',
  'food-requests': 'Food Requests',
  'requests': 'Food Requests',
  'categories': 'Categories',
  'reports': 'Reports',
  'feedback': 'Feedback / Complaints',
  'complaints': 'Feedback / Complaints',
  'feedback-complaints': 'Feedback / Complaints',
  'blog-manage': 'Blog Manage',
  'blogs': 'Blog Manage',
  'faq-manage': 'Faq Manage',
  'faqs': 'Faq Manage',
  'content-management': 'Content Management',
  'settings': 'Settings',
};

const getSlugFromNav = (name) => {
  if (!name) return 'dashboard';
  const found = Object.keys(NAV_SLUG_MAP).find(k => NAV_SLUG_MAP[k].toLowerCase() === name.toLowerCase());
  if (found) return found;
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

const resolveNav = (raw) => {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim().toLowerCase();
  const normalized = trimmed.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (NAV_SLUG_MAP[normalized]) return NAV_SLUG_MAP[normalized];
  const direct = Object.values(NAV_SLUG_MAP).find(v => v.toLowerCase() === trimmed);
  if (direct) return direct;
  return null;
};

const getInitialNav = () => {
  try {
    // 1. Check URL query parameters (?page=... or ?tab=... or ?nav=...)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get('page') || params.get('tab') || params.get('nav');
      if (fromUrl) {
        const resolved = resolveNav(fromUrl);
        if (resolved) return resolved;
      }

      // 2. Check URL hash (#donations, #users, etc.)
      if (window.location.hash) {
        const fromHash = window.location.hash.replace('#', '');
        const resolved = resolveNav(fromHash);
        if (resolved) return resolved;
      }

      // 3. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const resolved = resolveNav(saved);
        if (resolved) return resolved;
      }
    }
  } catch (e) {
    console.warn('Could not read saved admin navigation:', e);
  }
  return 'Dashboard';
};

const PublicRoute = () => {
  const [activeNav, setActiveNav] = useState(getInitialNav);

  const handleSetActiveNav = useCallback((newNav) => {
    const resolved = resolveNav(newNav) || newNav;
    setActiveNav(resolved);
    try {
      localStorage.setItem(STORAGE_KEY, resolved);
      const slug = getSlugFromNav(resolved);
      const url = new URL(window.location.href);
      url.searchParams.set('page', slug);
      window.history.pushState({ page: slug, nav: resolved }, '', url.toString());
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    window.__annshareSetActiveNav = handleSetActiveNav;
    return () => {
      delete window.__annshareSetActiveNav;
    };
  }, [handleSetActiveNav]);

  // Sync URL on initial mount and when activeNav changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, activeNav);
      const slug = getSlugFromNav(activeNav);
      const url = new URL(window.location.href);
      if (url.searchParams.get('page') !== slug) {
        url.searchParams.set('page', slug);
        window.history.replaceState({ page: slug, nav: activeNav }, '', url.toString());
      }
    } catch (e) {
      // ignore
    }
  }, [activeNav]);

  // Handle browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const restored = getInitialNav();
      setActiveNav(restored);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderActivePage = (searchTerm) => {
    switch (activeNav) {
      case 'Users':
        return <UserManagement />;
      case 'Donations':
        return <DonationManagement />;
      case 'Worker Donations':
      case 'Worker Fund':
        return <WorkerDonations />;
      case 'Food Requests':
        return <RequestManagement />;
      case 'Categories':
        return <CategoryManagement />;
      case 'Reports':
        return <Reports />;
      case 'Feedback / Complaints':
      case 'Feedback':
      case 'Contact':
      case 'Inquiries':
        return <Feedback />;
      case 'Blog Manage':
        return <ContentManagement mode="blogs" initialTab="Blog Posts" />;
      case 'Faq Manage':
        return <ContentManagement mode="faqs" initialTab="Faq List" />;
      case 'Content Management':
        return <ContentManagement mode="blogs" initialTab="Blog Posts" />;
      case 'Settings':
        return <Settings />;
      case 'Dashboard':
      default:
        return <AdminDashboard setActiveNav={handleSetActiveNav} searchTerm={searchTerm} />;
    }
  };

  return (
    <DashboardLayout activeNav={activeNav} setActiveNav={handleSetActiveNav}>
      {({ searchTerm }) => renderActivePage(searchTerm)}
    </DashboardLayout>
  );
};

export default PublicRoute;
