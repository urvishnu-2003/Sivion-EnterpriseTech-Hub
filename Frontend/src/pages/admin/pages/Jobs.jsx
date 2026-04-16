import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getJobs, createJob, updateJob, deleteJob } from "../services/jobService";

const initialForm = {
  title: "",
  company: "Sivion Global Technologies",
  location: "",
  type: "",
  experience: "",
  description: "",
  status: "active",
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
      console.log(error);
    }
  };
  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      company: job.company || "Sivion Global Technologies",
      location: job.location || "",
      type: job.type || "",
      experience: job.experience || "",
      description: job.description || "",
      status: job.status || "active",
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
      if (editId) {
        await updateJob(editId, formData);
      } else {
        await createJob(formData);
      }
      resetForm();
      loadJobs();
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Title", key: "title" },
    { header: "Location", key: "location" },
    { header: "Type", key: "type" },
    { header: "Status", key: "status" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-action-group">
          <button className="admin-btn admin-btn-secondary" onClick={() => handleOpenEdit(row)}>
            Edit
          </button>
          <button className="admin-btn admin-btn-danger" onClick={() => setDeleteId(row._id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Manage Jobs" subtitle="Create, update, and remove job openings.">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button className="admin-btn admin-btn-primary" onClick={handleOpenCreate} type="button">
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
                onClick={() => {
                  setOpenForm(false);
                  setEditId(null);
                  setFormData(initialForm);
                }}
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
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
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
                />
              </div>

              <div className="admin-form-group">
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Full-time, Part-time"
                />
              </div>

              <div className="admin-form-group">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 2-3 years"
                />
              </div>

              <div className="admin-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setOpenForm(false);
                    setEditId(null);
                    setFormData(initialForm);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
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
}

export default Jobs;