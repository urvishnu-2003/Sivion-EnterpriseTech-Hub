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

  const resetForm = () => {
    setFormData(initialForm);
    setEditId(null);
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateJob(editId, formData);
      } else {
        await createJob(formData);
      }
      resetForm();
      loadJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (job) => {
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
          <button className="admin-btn admin-btn-secondary" onClick={() => handleEdit(row)}>
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
      <div className="admin-form-card">
        <h3>{editId ? "Edit Job" : "Create Job"}</h3>
        <form className="admin-form-grid" onSubmit={handleSubmit}>
          <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
          <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
          <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
           <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editId ? "Update Job" : "Create Job"}
            </button>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
      </div>

      <DataTable columns={columns} rows={jobs} emptyText="No jobs available" />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}

export default Jobs;