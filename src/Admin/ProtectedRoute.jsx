import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Check if it's 'true'

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin_login" />; // Redirect if not logged in
  }

  return children; // Render protected content if logged in
};

export default ProtectedRoute;
