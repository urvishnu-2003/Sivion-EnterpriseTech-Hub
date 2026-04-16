import React from 'react';
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  Settings,
  LogOut 
} from "lucide-react";

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

const SidebarLink = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `admin-link ${isActive ? 'active' : ''}`}
    style={({ isActive }) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '12px',
      color: isActive ? 'var(--white)' : 'var(--text-dim)',
      background: isActive ? 'rgba(0, 200, 255, 0.1)' : 'transparent',
      border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
      transition: 'var(--transition)',
      textDecoration: 'none'
    })}
  >
    <span style={{ color: 'inherit' }}>{icon}</span>
    <span style={{ fontWeight: 600 }}>{label}</span>
  </NavLink>
);

export default AdminSidebar;