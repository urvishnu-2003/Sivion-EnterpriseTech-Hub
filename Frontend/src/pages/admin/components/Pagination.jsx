import React from "react";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
      <button
        className="admin-btn admin-btn-secondary"
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        style={{ minWidth: "36px", padding: "8px 12px" }}
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`admin-btn ${page === currentPage ? "admin-btn-primary" : "admin-btn-secondary"}`}
          onClick={() => onPageChange && onPageChange(page)}
          style={{ minWidth: "36px", padding: "8px 12px" }}
        >
          {page}
        </button>
      ))}
      <button
        className="admin-btn admin-btn-secondary"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        style={{ minWidth: "36px", padding: "8px 12px" }}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
