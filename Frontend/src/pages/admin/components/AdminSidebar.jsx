import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Briefcase, Users, FileText, Settings, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Blogs", to: "/admin/blogs", icon: <FileText size={18} /> },
  { label: "Projects", to: "/admin/projects", icon: <Briefcase size={18} /> },
  { label: "Quotes", to: "/admin/quotes", icon: <FileText size={18} /> },
  { label: "Jobs", to: "/admin/jobs", icon: <Briefcase size={18} /> },
  { label: "Applications", to: "/admin/applications", icon: <Users size={18} /> },
  { label: "Newsletter", to: "/admin/newsletter", icon: <Users size={18} /> },
  { label: "Inquiry", to: "/admin/inquiry", icon: <FileText size={18} /> },
  { label: "Contact", to: "/admin/contact", icon: <FileText size={18} /> },
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar glass" style={{
      width: "260px",
      minHeight: "100vh",
      padding: "2rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      background: "rgba(5, 13, 26, 0.8)",
      borderRight: "1px solid var(--glass-border)",
    }}>
      <div className="sidebar-brand" style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ margin: 0, color: "var(--white)", fontSize: "1.5rem" }}>
          SIVION<span style={{ color: "var(--cyan)" }}>.OS</span>
        </h2>
        <p style={{ margin: "0.5rem 0 0", color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Enterprise Hub
        </p>
      </div>

      <nav className="admin-nav" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              padding: "0.95rem 1rem",
              borderRadius: "12px",
              color: "var(--white)",
              textDecoration: "none",
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: "auto" }}>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("adminInfo");
            window.location.href = "/admin/login";
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.95rem 1rem",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            color: "#f87171",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            cursor: "pointer",
          }}
        >
          <LogOut size={18} />
          Secure Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;