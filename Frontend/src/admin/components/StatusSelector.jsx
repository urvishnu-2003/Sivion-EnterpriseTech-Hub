import React, { useState, useRef, useEffect } from "react";
import "../styles/status-selector.css";

const statusOptions = [
  {
    label: "Pending",
    value: "pending",
    icon: "⏳",
    colorClass: "status-option-pending",
  },
  {
    label: "Reviewed",
    value: "reviewed",
    icon: "👁️",
    colorClass: "status-option-reviewed",
  },
  {
    label: "Rejected",
    value: "rejected",
    icon: "✗",
    colorClass: "status-option-rejected",
  },
  {
    label: "Hired",
    value: "hired",
    icon: "✓",
    colorClass: "status-option-hired",
  },
];

const StatusSelector = ({ value, onSave, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(value || "pending");
  const containerRef = useRef(null);

  useEffect(() => {
    setSelectedStatus(value || "pending");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const currentStatus =
    statusOptions.find((option) => option.value === value) || statusOptions[0];

  const openSelector = () => {
    if (disabled || isSaving) return;
    setIsOpen(true);
  };

  const handleSave = async (newStatus) => {
    if (disabled || isSaving || newStatus === value) {
      setIsOpen(false);
      return;
    }

    setSelectedStatus(newStatus);
    setIsSaving(true);

    try {
      await onSave(newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update status", error);
      setSelectedStatus(value || "pending");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="status-selector-root" ref={containerRef}>
      <button
        type="button"
        className={`status-selector-trigger status-${currentStatus.value}`}
        onClick={openSelector}
        disabled={disabled || isSaving}
      >
        <span className="status-selector-pill">
          <span className="status-selector-icon">{currentStatus.icon}</span>
          <span>{currentStatus.label}</span>
        </span>
        <span className="status-selector-arrow">▾</span>
      </button>

      {isOpen && (
        <div className="status-selector-backdrop">
          <div className="status-selector-modal">
            <div className="status-selector-header">
              <h3>Update application status</h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close status selector"
              >
                ×
              </button>
            </div>

            <div className="status-selector-body">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`status-option-item ${option.colorClass} ${
                    option.value === selectedStatus ? "active" : ""
                  }`}
                  onClick={() => handleSave(option.value)}
                  disabled={isSaving}
                >
                  <span className="status-option-icon">{option.icon}</span>
                  <span className="status-option-text">{option.label}</span>
                  {option.value === value && (
                    <span className="status-option-current">Current</span>
                  )}
                </button>
              ))}
            </div>

            <div className="status-selector-note">
              {isSaving
                ? "Updating status..."
                : "Select a new status to save changes."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelector;