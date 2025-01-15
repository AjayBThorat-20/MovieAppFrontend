import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token and check user's role
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    // Check if user's role is included in the allowedRoles array
    if (!allowedRoles.includes(userRole)) {
      // If user's role is not allowed, redirect to unauthorized page
      return <Navigate to="/unauthorized" />;
    }

    // If role is allowed, render the protected content
    return children;
    
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;