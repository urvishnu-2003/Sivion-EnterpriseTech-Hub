import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import axiosInstance from "../../../api/axios";
import StatusSelector from "../components/StatusSelector";
import { getApplications, updateApplication, deleteApplication } from "../services/applicationService";

const PAGE_SIZE = 5;

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const loadApplications = async () => {
    try {
      const { data } = await getApplications();
      setApplications(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    const previousApplications = applications;

    setApplications((prev) =>
      prev.map((application) =>
        application._id === id ? { ...application, status } : application
      )
    );

    setUpdatingStatusId(id);

    try {
      await updateApplication(id, { status });
    } catch (error) {
      console.log(error);
      setApplications(previousApplications);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteApplication(deleteId);
      setDeleteId(null);
      loadApplications();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Candidate", key: "name" },
    { header: "Email", key: "email" },
    { header: "Job", key: "jobTitle", render: (row) => row.jobTitle || row.job?.title || "-" },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <StatusSelector
          value={row.status || "pending"}
          onSave={(newStatus) => handleStatusChange(row._id, newStatus)}
          disabled={updatingStatusId === row._id}
        />
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <button className="admin-btn admin-btn-danger" onClick={() => setDeleteId(row._id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <AdminLayout title="Manage Applications" subtitle="Review candidate applications and update their status.">
      <DataTable columns={columns} rows={applications} emptyText="No applications available" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Applications;