import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Blogs", to: "/admin/blogs" },
  { label: "Projects", to: "/admin/projects" },
  { label: "Quotes", to: "/admin/quotes" },
  { label: "Jobs", to: "/admin/jobs" },
  { label: "Applications", to: "/admin/applications" },
  { label: "Newsletter", to: "/admin/newsletter" },
  { label: "Inquiry", to: "/admin/inquiry" },
  { label: "Contact", to: "/admin/contact" },
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-badge">S</div>
        <div>
          <h2>Sivion Admin</h2>
          <p>Management Panel</p>
        </div>
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
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;