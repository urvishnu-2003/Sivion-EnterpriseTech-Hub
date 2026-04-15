import React from "react";

const StatusBadge = ({ status }) => {
  const normalizedStatus = String(status || "").toLowerCase();

  return (
    <span className={`status-badge ${normalizedStatus}`}>
      {status}
    </span>
  );
};

export default StatusBadge;