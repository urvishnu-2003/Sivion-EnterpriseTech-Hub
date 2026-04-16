import React from "react";

const SkeletonTable = () => {
  return (
    <div className="skeleton-table">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell" />
          <div className="skeleton-cell" />
          <div className="skeleton-cell" />
          <div className="skeleton-cell" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
