import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../api/axiosInstance";

const PAGE_SIZE = 5;

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [selectedDelete, setSelectedDelete] = useState(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/applications");
      setApplications(res.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load applications", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((item) =>
      `${item.fullName} ${item.email} ${item.jobId?.title || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [applications, search]);

  const totalPages = Math.ceil(filteredApplications.length / PAGE_SIZE) || 1;
  const paginatedApplications = filteredApplications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleStatusChange = async (id, status) => {
    try {
      await axiosInstance.patch(`/applications/${id}/status`, { status });
      setToast({ message: "Status updated successfully", type: "success" });
      loadApplications();
    } catch (error) {
      setToast({ message: "Failed to update status", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/applications/${selectedDelete._id}`);
      setToast({ message: "Application deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadApplications();
    } catch (error) {
      setToast({ message: "Failed to delete application", type: "error" });
    }
  };

  const columns = [
    { key: "fullName", label: "Applicant Name" },
    { key: "email", label: "Email" },
    {
      key: "job",
      label: "Job Applied",
      render: (row) => row.jobId?.title || "-",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="status-cell">
          <StatusBadge status={row.status} />
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row._id, e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="reviewed">reviewed</option>
            <option value="rejected">rejected</option>
            <option value="hired">hired</option>
          </select>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) =>
        new Date(row.createdAt || row.appliedAt).toLocaleDateString(),
    },
    {
      key: "resume",
      label: "Resume",
      render: (row) =>
        row.resumeUrl ? (
          <a href={row.resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
        ) : (
          "-"
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button className="danger-btn" onClick={() => setSelectedDelete(row)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Toast toast={toast} onClose={() => setToast({ message: "", type: "" })} />

      <ConfirmModal
        open={!!selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete application of ${selectedDelete?.fullName}?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search applications..."
        />
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedApplications} />
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

export default Applications;