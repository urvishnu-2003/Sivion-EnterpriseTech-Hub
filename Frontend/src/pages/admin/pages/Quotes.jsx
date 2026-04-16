import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axios";

const PAGE_SIZE = 5;

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/quotes");
      setQuotes(response.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load quotes", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) =>
      `${quote.fullName || ""} ${quote.email || ""} ${quote.serviceType || quote.service || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [quotes, search]);

  const totalPages = Math.ceil(filteredQuotes.length / PAGE_SIZE) || 1;
  const paginatedQuotes = filteredQuotes.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/quotes/${selectedDelete._id}`);
      setToast({ message: "Quote deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadQuotes();
    } catch (error) {
      setToast({ message: "Failed to delete quote", type: "error" });
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => row.fullName || "-",
    },
    { key: "email", label: "Email" },
    {
      key: "service",
      label: "Service",
      render: (row) => row.serviceType || row.service || "-",
    },
    {
      key: "budget",
      label: "Budget",
      render: (row) => row.budget || "-",
    },
    {
      key: "date",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="action-group">
          <button className="secondary-btn" onClick={() => setSelectedView(row)}>
            View
          </button>
          <button className="danger-btn" onClick={() => setSelectedDelete(row)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Toast toast={toast} onClose={() => setToast({ message: "", type: "" })} />

      <Modal
        open={!!selectedView}
        onClose={() => setSelectedView(null)}
        title="Quote Details"
      >
        {selectedView && (
          <div className="details-grid">
            <p><strong>Name:</strong> {selectedView.fullName}</p>
            <p><strong>Email:</strong> {selectedView.email}</p>
            <p><strong>Phone:</strong> {selectedView.phone}</p>
            <p><strong>Company:</strong> {selectedView.company}</p>
            <p><strong>Service:</strong> {selectedView.serviceType || selectedView.service}</p>
            <p><strong>Budget:</strong> {selectedView.budget}</p>
            <p><strong>Timeline:</strong> {selectedView.timeline}</p>
            <p><strong>Project Details:</strong> {selectedView.projectDetails}</p>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDelete}
        message={`Delete quote of ${selectedDelete?.fullName}?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search quotes..."
        />
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedQuotes} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default Quotes;