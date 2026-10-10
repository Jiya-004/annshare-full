import React, { useState } from 'react';
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

const PublicRoute = () => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const renderActivePage = (searchTerm) => {
    switch (activeNav) {
      case 'Users':
        return <UserManagement />;
      case 'Donations':
        return <DonationManagement />;
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
        return <AdminDashboard setActiveNav={setActiveNav} searchTerm={searchTerm} />;
    }
  };

  return (
    <DashboardLayout activeNav={activeNav} setActiveNav={setActiveNav}>
      {({ searchTerm }) => renderActivePage(searchTerm)}
    </DashboardLayout>
  );
};

export default PublicRoute;
