import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');

  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
