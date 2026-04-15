import React from "react";

const SkeletonTable = () => {
  return (
    <div className="skeleton-table">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="skeleton-row" key={item}></div>
      ))}
    </div>
  );
};

export default SkeletonTable;