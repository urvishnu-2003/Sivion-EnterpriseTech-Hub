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
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <h2>SIVION</h2>
        <p>Enterprise Hub</p>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: "32px" }}>
        <button
          className="admin-nav-link"
          style={{ width: "100%", background: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "none", cursor: "pointer" }}
          type="button"
          onClick={() => {
            localStorage.removeItem("adminInfo");
            window.location.href = "/admin/login";
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;