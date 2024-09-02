// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin_login" />;
  }

  return children;
};

export default ProtectedRoute;
