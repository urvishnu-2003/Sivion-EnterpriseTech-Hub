import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Shield, Activity } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import ThemeToggle from "./ThemeToggle";

/**
 * Modernized Admin Header — Neo-Holographic Design
 * Features system status indicators and premium profile controls.
 */
const AdminHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header
      className="admin-header glass"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 2.5rem",
        background: "rgba(5, 13, 26, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--glass-border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--white)" }}>
            {title || "Admin Panel"}
          </h1>
          {subtitle ? (
            <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.9rem" }}>{subtitle}</p>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-dim)", fontSize: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Activity size={14} className="text-cyan" />
            <span>Core: Optimal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Shield size={14} className="text-green" />
            <span>Security: Active</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <button className="icon-btn" style={{ background: "transparent", border: "none", color: "var(--text-dim)", cursor: "pointer" }}>
          <Bell size={20} />
        </button>

        <ThemeToggle />

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "#f87171",
            padding: "0.55rem 1rem",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;