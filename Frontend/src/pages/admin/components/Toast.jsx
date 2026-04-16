import React, { useEffect } from "react";

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast?.message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast?.message) return null;

  return <div className={`toast ${toast.type}`}>{toast.message}</div>;
};

export default Toast;