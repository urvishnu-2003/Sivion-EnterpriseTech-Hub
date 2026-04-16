import React from "react";

const ConfirmModal = ({ open, title, message, onConfirm, onClose }) => {
  if (!open) return null;

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="admin-modal-actions">
          <button className="admin-btn admin-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;