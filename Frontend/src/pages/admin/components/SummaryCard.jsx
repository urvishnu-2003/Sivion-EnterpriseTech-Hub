import React from "react";

const SummaryCard = ({ label, count, icon }) => {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <span className="summary-card-label">{label}</span>
        <span className="summary-card-icon">{icon}</span>
      </div>
      <h3>{count}</h3>
    </div>
  );
};

export default SummaryCard;