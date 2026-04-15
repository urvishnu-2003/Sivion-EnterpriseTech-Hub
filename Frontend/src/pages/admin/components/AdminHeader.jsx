import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import ThemeToggle from "./ThemeToggle";

const AdminHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <div className="admin-header-right">
        <ThemeToggle />
        <span className="admin-user-pill">{admin?.email || "Admin"}</span>
        <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;