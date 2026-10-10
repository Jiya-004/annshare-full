import React, { useState, useEffect } from 'react';
import PublicLayout from '../layouts';
import PublicRoute from '../route/PublicRoute';
import Login from '../frontend/Login';
import { isAuthenticatedAdmin, subscribeToAdminService } from '../services/adminService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isAuthenticatedAdmin());

  useEffect(() => {
    // Listen for session updates (login, logout, token refresh)
    const unsubscribe = subscribeToAdminService(() => {
      setIsAuthenticated(isAuthenticatedAdmin());
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <PublicLayout>
      <PublicRoute />
    </PublicLayout>
  );
};

export default App;
