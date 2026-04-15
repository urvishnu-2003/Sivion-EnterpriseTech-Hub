import React from "react";
import Modal from "./Modal";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure?",
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p>{message}</p>

      <div className="modal-actions">
        <button className="secondary-btn" onClick={onClose}>
          Cancel
        </button>

        <button className="danger-btn" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;