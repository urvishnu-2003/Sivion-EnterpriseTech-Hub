import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import API from "../../../api/axios";

const PAGE_SIZE = 5;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [selectedDelete, setSelectedDelete] = useState(null);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jobs/admin/all");
      setJobs(res.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load jobs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      `${job.title} ${job.department} ${job.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [jobs, search]);

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE) || 1;
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleToggle = async (id) => {
    try {
      await API.patch(`/jobs/${id}/toggle`);
      setToast({ message: "Job status updated successfully", type: "success" });
      loadJobs();
    } catch (error) {
      setToast({ message: "Failed to update job status", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/jobs/${selectedDelete._id}`);
      setToast({ message: "Job deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadJobs();
    } catch (error) {
      setToast({ message: "Failed to delete job", type: "error" });
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge status={row.isActive ? "Active" : "Inactive"} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="action-group">
          <button className="secondary-btn" onClick={() => handleToggle(row._id)}>
            Toggle
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

      <ConfirmModal
        open={!!selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete ${selectedDelete?.title}?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search jobs..."
        />
        <button className="primary-btn">Add New Job</button>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedJobs} />
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

export default Jobs;