import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast.message) return null;

  const icons = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <AlertCircle className="text-rose-400" size={20} />,
    warning: <AlertTriangle className="text-amber-400" size={20} />,
    info: <Info className="text-cyan-400" size={20} />,
  };

  const colors = {
    success: "rgba(16, 185, 129, 0.1)",
    error: "rgba(225, 29, 72, 0.1)",
    warning: "rgba(245, 158, 11, 0.1)",
    info: "rgba(6, 182, 212, 0.1)",
  };

  const borders = {
    success: "rgba(16, 185, 129, 0.3)",
    error: "rgba(225, 29, 72, 0.3)",
    warning: "rgba(245, 158, 11, 0.3)",
    info: "rgba(6, 182, 212, 0.3)",
  };

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 9999,
      minWidth: '320px',
      animation: 'slideInRight 0.3s ease-out forwards',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '1rem 1.25rem',
      borderRadius: '16px',
      background: colors[toast.type] || 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${borders[toast.type] || 'var(--glass-border)'}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    }}>
      <div style={{ flexShrink: 0 }}>
        {icons[toast.type] || icons.info}
      </div>
      <div style={{ flexGrow: 1 }}>
        <p style={{ 
          margin: 0, 
          color: 'var(--white)', 
          fontSize: '0.9rem', 
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif'
        }}>
          {toast.message}
        </p>
      </div>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-dim)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
      >
        <X size={16} />
      </button>
      
      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        backgroundColor: borders[toast.type]?.replace('0.3', '0.8') || 'var(--cyan)',
        width: '100%',
        animation: 'progress 5s linear forwards',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      }} />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
