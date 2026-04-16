import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import StatusSelector from "../components/StatusSelector";
import {
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../services/applicationService";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const loadApplications = async () => {
    try {
      const { data } = await getApplications();
      setApplications(data?.data || data || []);
    } catch (error) {
      console.log("Error loading applications:", error);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    const previousApplications = [...applications];

    setApplications((prev) =>
      prev.map((application) =>
        application._id === id ? { ...application, status } : application
      )
    );

    setUpdatingStatusId(id);

    try {
      const response = await updateApplicationStatus(id, { status });
      const updatedApplication = response?.data?.data;

      if (updatedApplication) {
        setApplications((prev) =>
          prev.map((application) =>
            application._id === id ? updatedApplication : application
          )
        );
      }
    } catch (error) {
      console.log("Error updating application status:", error);
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
      console.log("Error deleting application:", error);
    }
  };

  const getResumeViewerUrl = (resumeUrl) => {
    if (!resumeUrl) return "#";

    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
      resumeUrl
    )}`;
  };

  const formatSkills = (skills) => {
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return "-";
    }
    return skills.join(", ");
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns = [
    {
      header: "S.No",
      key: "serial",
      render: (_, i) => i + 1,
    },
    {
      header: "Candidate",
      key: "fullName",
      render: (row) => row.fullName || "-",
    },
    {
      header: "Email",
      key: "email",
      render: (row) => row.email || "-",
    },
    {
      header: "Phone",
      key: "phone",
      render: (row) => row.phone || "-",
    },
    {
      header: "Job",
      key: "jobId",
      render: (row) => row.jobId?.title || "-",
    },
    {
      header: "Experience",
      key: "experience",
      render: (row) => row.experience || "-",
    },
    {
      header: "Skills",
      key: "skills",
      render: (row) => formatSkills(row.skills),
    },
    {
      header: "Applied On",
      key: "appliedAt",
      render: (row) => formatDate(row.appliedAt),
    },
    {
      header: "Resume",
      key: "resumeUrl",
      render: (row) =>
        row.resumeUrl ? (
          <a
            href={getResumeViewerUrl(row.resumeUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            View Resume
          </a>
        ) : (
          <span>-</span>
        ),
    },
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
        <button
          className="admin-btn admin-btn-danger"
          onClick={() => setDeleteId(row._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Manage Applications"
      subtitle="Review candidate applications, resumes, and status updates."
    >
      <DataTable
        columns={columns}
        rows={applications}
        emptyText="No applications available"
      />

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