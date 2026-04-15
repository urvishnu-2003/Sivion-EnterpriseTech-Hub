import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import API from "../../../api/axios";

const PAGE_SIZE = 5;

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const response = await API.get("/inquiries");
      setInquiries(response.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load inquiries", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) =>
      `${item.fullName || ""} ${item.email || ""} ${item.subject || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [inquiries, search]);

  const totalPages = Math.ceil(filteredInquiries.length / PAGE_SIZE) || 1;
  const paginatedInquiries = filteredInquiries.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async () => {
    try {
      await API.delete(`/inquiries/${selectedDelete._id}`);
      setToast({ message: "Inquiry deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadInquiries();
    } catch (error) {
      setToast({ message: "Failed to delete inquiry", type: "error" });
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => row.fullName || "-",
    },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
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
        title="Inquiry Details"
      >
        {selectedView && (
          <div className="details-grid">
            <p><strong>Name:</strong> {selectedView.fullName}</p>
            <p><strong>Email:</strong> {selectedView.email}</p>
            <p><strong>Subject:</strong> {selectedView.subject}</p>
            <p><strong>Message:</strong> {selectedView.message}</p>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDelete}
        message={`Delete inquiry of ${selectedDelete?.fullName}?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search inquiries..."
        />
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedInquiries} />
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

export default Inquiry;