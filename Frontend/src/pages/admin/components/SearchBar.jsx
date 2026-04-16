import React from "react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      className="admin-search-bar"
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        background: "var(--bg-tertiary)",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
      }}
    />
  );
};

export default SearchBar;
