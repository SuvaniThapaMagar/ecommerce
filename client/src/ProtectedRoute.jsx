import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Assuming you store the user data in localStorage with a token
  const isAuthenticated = localStorage.getItem('token'); 

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedRoute;
