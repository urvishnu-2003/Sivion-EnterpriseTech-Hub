import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import axiosInstance from "../../../api/axios";
import { useAdminAuth } from "../context/AdminAuthContext";
import "../styles/admin.css";
=======
import { useAdminAuth } from "../context/AdminAuthContext";
>>>>>>> origin/branch-backend/h

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAdminAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(formData);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Access your enterprise admin panel</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error ? <span className="error-text">{error}</span> : null}

          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;