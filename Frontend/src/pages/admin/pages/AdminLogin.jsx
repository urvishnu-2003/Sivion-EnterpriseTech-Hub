import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { useAdminAuth } from "../context/AdminAuthContext";
import "../style/admin.css";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAdminAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

        <div className="login-footer">
          <button
            type="button"
            className="forgot-password-link"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default AdminLogin;