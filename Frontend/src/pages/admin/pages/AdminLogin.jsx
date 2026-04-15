import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../context/AdminAuthContext";
import API from "../../../api/axios";
import "../style/admin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/admin/login", formData);
      login(response.data.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <p>Access your enterprise admin panel</p>

        <input
          type="email"
          name="email"
          placeholder="Enter admin email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;