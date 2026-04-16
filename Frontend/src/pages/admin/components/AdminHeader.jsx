import React from 'react';
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Shield, Activity } from "lucide-react";

/**
 * Modernized Admin Header — Neo-Holographic Design
 * Features system status indicators and premium profile controls.
 */
const AdminHeader = () => {   
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import ThemeToggle from "./ThemeToggle";

const AdminHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="admin-header glass" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.25rem 2.5rem',
      background: 'rgba(5, 13, 26, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--white)' }}>
          Command Center
        </h1>
        <div className="system-status" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={14} className="text-cyan" />
            <span>Core: Optimal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={14} className="text-green" />
            <span>Security: Active</span>
          </div>
        </div>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button className="icon-btn" style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
          <Bell size={20} />
        </button>
        
        <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }} />
        
        <div className="admin-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="avatar" style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            background: 'var(--gradient-primary)',
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            fontWeight: 700
          }}>
            A
          </div>
          <div className="profile-info">
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>SysAdmin</p>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Access</p>
          </div>
        </div>
=======
    <header className="admin-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

        <button 
          onClick={handleLogout}
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            color: '#f87171',
            padding: '0.4rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;