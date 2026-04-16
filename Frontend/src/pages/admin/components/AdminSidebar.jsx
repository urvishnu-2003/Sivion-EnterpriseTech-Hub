import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Modernized Admin Sidebar — Neo-Holographic Design
 * Uses brand design tokens and glassmorphism for a premium enterprise feel.
 */
const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar glass" style={{ 
      width: '280px', 
      height: '100vh', 
      position: 'sticky', 
      top: 0, 
      display: 'flex', 
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      borderRight: '1px solid var(--glass-border)',
      background: 'rgba(5, 13, 26, 0.5)'
    }}>
      <div className="sidebar-brand" style={{ marginBottom: '3rem', padding: '0 0.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.5px' }}>
          SIVION<span style={{ color: 'var(--cyan)' }}>.OS</span>
        </h2>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>
          Enterprise Hub
        </p>
      </div>

      <nav className="admin-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarLink to="/admin/jobs" icon={<Briefcase size={20} />} label="Global Careers" />
        <SidebarLink to="/admin/applications" icon={<Users size={20} />} label="Talent Pipeline" />
        <SidebarLink to="/admin/blogs" icon={<FileText size={20} />} label="Intelligence Hub" />
        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1.5rem 0' }} />
        <SidebarLink to="/admin/settings" icon={<Settings size={20} />} label="Configurations" />
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
    <div className="sidebar-footer" style={{ marginTop: 'auto' }}>
        <button 
          onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/admin/login"; }}
          className="admin-link danger" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem', 
            width: '100%', 
            borderRadius: '12px',
            color: '#ff4d6d',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'var(--transition)',
            textAlign: 'left'
          }}
        >
          <LogOut size={20} />
          <span style={{ fontWeight: 600 }}>Secure Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;