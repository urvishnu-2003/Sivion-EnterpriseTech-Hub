import React from "react";

const SummaryCard = ({ icon, label, count }) => {
  return (
    <div className="summary-card">
      <div className="summary-icon">{icon}</div>

      <div>
        <p className="summary-label">{label}</p>
        <h3 className="summary-count">{count}</h3>
      </div>
    </div>
  );
};

export default SummaryCard;