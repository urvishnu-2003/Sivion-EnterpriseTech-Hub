import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Shield, Activity } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import ThemeToggle from "./ThemeToggle";

const AdminHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{title || "Admin Dashboard"}</h1>
        <p>{subtitle || "Track platform activity and manage all enterprise modules from one place."}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", color: "#718096" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Activity size={16} className="text-cyan" />
            <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Core: Optimal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Shield size={16} style={{ color: "#10b981" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Security: Active</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ThemeToggle />
          <button 
            className="icon-btn" 
            style={{ 
              background: "transparent", 
              border: "none", 
              color: "#718096", 
              cursor: "pointer"
            }}
          >
            <Bell size={20} />
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "1rem",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#f87171",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;