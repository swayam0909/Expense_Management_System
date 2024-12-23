import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const email = localStorage.getItem('email'); // Check for email in localStorage
  
  // If the user is not logged in (email is not found), redirect to the login page
  if (!email) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children components if the user is authenticated
};

export default PrivateRoute;
