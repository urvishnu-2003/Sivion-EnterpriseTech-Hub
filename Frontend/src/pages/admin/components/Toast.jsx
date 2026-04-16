import React, { useEffect } from "react";

const Toast = ({ message, type = "success", show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  const bgColor =
    type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#f59e0b";

  return (
    <div
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        padding: "0.75rem 1.25rem",
        borderRadius: "0.5rem",
        color: "#fff",
        backgroundColor: bgColor,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 9999,
        animation: "fadeIn 0.3s ease",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
