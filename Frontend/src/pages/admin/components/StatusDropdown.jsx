import React, { useState, useRef, useEffect } from "react";
import "../style/status-dropdown.css";

const StatusDropdown = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = [
    { label: "Pending", value: "pending", icon: "⏳" },
    { label: "Reviewed", value: "reviewed", icon: "👁️" },
    { label: "Rejected", value: "rejected", icon: "✗" },
    { label: "Hired", value: "hired", icon: "✓" },
  ];

  const currentStatus = statusOptions.find((opt) => opt.value === value) || statusOptions[0];

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`status-dropdown ${isOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
      ref={dropdownRef}
    >
      <button
        className={`status-dropdown-trigger status-${value}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        type="button"
      >
        <span className="status-dropdown-content">
          <span className="status-icon">{currentStatus.icon}</span>
          <span className="status-label">{currentStatus.label}</span>
        </span>
        <span className={`status-dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && !disabled && (
        <div className="status-dropdown-menu">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`status-dropdown-item status-${option.value} ${
                option.value === value ? "active" : ""
              }`}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              <span className="status-option-icon">{option.icon}</span>
              <span className="status-option-label">{option.label}</span>
              {option.value === value && <span className="status-checkmark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
