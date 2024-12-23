import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem('email'); // Get the email from localStorage
  const role = localStorage.getItem('role'); // Get the role (assuming it's stored in localStorage)

  // If the user is not logged in (email is not found), redirect to the login page
  if (!email) {
    return <Navigate to="/login" replace />;
  }

  // If the user is not an admin, redirect to the user dashboard
  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children; // Render the children components if the user is an admin
};

export default ProtectedRoute;
