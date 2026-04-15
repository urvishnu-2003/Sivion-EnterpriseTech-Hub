import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";

import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import Blogs from "../pages/Blogs";
import Projects from "../pages/Projects";
import Quotes from "../pages/Quotes";
import Jobs from "../pages/Jobs";
import Applications from "../pages/Application";
import Newsletter from "../pages/Newsettler";
import Inquiry from "../pages/Inquiry";
import Contact from "../pages/Contact";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="blogs"
        element={
          <AdminProtectedRoute>
            <Blogs />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="projects"
        element={
          <AdminProtectedRoute>
            <Projects />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="quotes"
        element={
          <AdminProtectedRoute>
            <Quotes />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="jobs"
        element={
          <AdminProtectedRoute>
            <Jobs />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="applications"
        element={
          <AdminProtectedRoute>
            <Applications />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="newsletter"
        element={
          <AdminProtectedRoute>
            <Newsletter />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="inquiry"
        element={
          <AdminProtectedRoute>
            <Inquiry />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="contact"
        element={
          <AdminProtectedRoute>
            <Contact />
          </AdminProtectedRoute>
        }
      />

      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;

