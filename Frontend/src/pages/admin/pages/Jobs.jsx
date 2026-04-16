import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getJobs, createJob, updateJob, deleteJob } from "../services/jobService";

const initialForm = {
  title: "",
  department: "",
  location: "",
  type: "full-time",
  description: "",
  requirements: "",
  isActive: true,
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    try {
      const { data } = await getJobs();
      setJobs(data?.data || data || []);
    } catch (error) {
      console.log("Error loading jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOpenCreate = () => {
    setEditId(null);
    setFormData(initialForm);
    setOpenForm(true);
  };

  const handleOpenEdit = (job) => {
    setEditId(job._id);
    setFormData({
      title: job.title || "",
      department: job.department || "",
      location: job.location || "",
      type: job.type || "full-time",
      description: job.description || "",
      requirements: Array.isArray(job.requirements)
        ? job.requirements.join(", ")
        : "",
      isActive: typeof job.isActive === "boolean" ? job.isActive : true,
    });
    setOpenForm(true);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditId(null);
    setOpenForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: formData.title.trim(),
        department: formData.department.trim(),
        location: formData.location.trim(),
        type: formData.type,
        description: formData.description.trim(),
        requirements: formData.requirements,
        isActive: formData.isActive,
      };

      if (editId) {
        await updateJob(editId, payload);
      } else {
        await createJob(payload);
      }

      resetForm();
      loadJobs();
    } catch (error) {
      console.log("Error submitting job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(deleteId);
      setDeleteId(null);
      loadJobs();
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  };

  const formatRequirements = (requirements) => {
    if (!requirements || !Array.isArray(requirements) || requirements.length === 0) {
      return "-";
    }
    return requirements.join(", ");
  };

  const columns = [
    {
      header: "S.No",
      key: "serial",
      render: (_, i) => i + 1,
    },
    {
      header: "Title",
      key: "title",
      render: (row) => row.title || "-",
    },
    {
      header: "Department",
      key: "department",
      render: (row) => row.department || "-",
    },
    {
      header: "Location",
      key: "location",
      render: (row) => row.location || "-",
    },
    {
      header: "Type",
      key: "type",
      render: (row) => row.type || "-",
    },
    {
      header: "Requirements",
      key: "requirements",
      render: (row) => formatRequirements(row.requirements),
    },
    {
      header: "Status",
      key: "isActive",
      render: (row) => (row.isActive ? "Active" : "Inactive"),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-action-group">
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => handleOpenEdit(row)}
            type="button"
          >
            Edit
          </button>
          <button
            className="admin-btn admin-btn-danger"
            onClick={() => setDeleteId(row._id)}
            type="button"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Manage Jobs"
      subtitle="Create, update, and remove job openings."
    >
      <div className="admin-action-bar">
        <button
          className="admin-btn admin-btn-primary"
          onClick={handleOpenCreate}
          type="button"
        >
          Add Job
        </button>
      </div>

      <DataTable columns={columns} rows={jobs} emptyText="No jobs available" />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />

      {openForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editId ? "Update Job" : "Create Job"}</h3>
              <button
                className="admin-modal-close"
                onClick={resetForm}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  rows="5"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Enter requirements separated by commas"
                  rows="4"
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  Active Job
                </label>
              </div>

              <div className="admin-form-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? editId
                      ? "Updating..."
                      : "Creating..."
                    : editId
                    ? "Update Job"
                    : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Jobs;