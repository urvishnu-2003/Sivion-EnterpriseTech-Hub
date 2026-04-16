import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Admin Entry Component — SRS AR-01
 * Acts as the default gateway for /admin route.
 * In a real app, this would check auth state and redirect to dashboard if logged in,
 * otherwise to login. Temporarily redirects to /admin/login.
 */
const Admin = () => {
  // Simple check — if we wanted to check auth we could use context/localStorage
  // For now, satisfy the route requirement by providing a gateway point.
  return <Navigate to="/admin/login" replace />;
};

export default Admin;
