import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axiosInstance";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

const initialForm = {
  title: "",
  category: "",
  techStack: "",
  description: "",
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      const data = response.data;

      const projectList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.projects)
          ? data.projects
          : Array.isArray(data)
            ? data
            : [];

      setProjects(projectList);
    } catch (error) {
      console.log("Load Projects Error:", error);
      setProjects([]);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCreate = () => {
    setEditId(null);
    setFormData(initialForm);
    setOpenForm(true);
  };

  const handleOpenEdit = (project) => {
    setEditId(project._id);

    setFormData({
      title: project.title || "",
      category: project.category || "",
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : project.techStack || "",
      description: project.description || "",
    });

    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        techStack: formData.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editId) {
        await updateProject(editId, payload);
      } else {
        await createProject(payload);
      }

      setOpenForm(false);
      setEditId(null);
      setFormData(initialForm);
      loadProjects();
    } catch (error) {
      console.log("Submit Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
      loadProjects();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const columns = [
    {
      header: "S.No",
      key: "serial",
      render: (_, i) => i + 1,
    },
    {
      header: "Project Name",
      key: "title",
    },
    {
      header: "Category",
      key: "category",
    },
    {
      header: "Tech Stack",
      key: "techStack",
      render: (row) =>
        Array.isArray(row.techStack)
          ? row.techStack.join(", ")
          : row.techStack || "-",
    },
    {
      header: "Description",
      key: "description",
      render: (row) => row.description || "-",
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="admin-btn"
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
      title="Manage Projects"
      subtitle="Track and manage project showcase items."
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button className="admin-btn admin-btn-primary" onClick={handleOpenCreate} type="button">
          Add Project
        </button>
      </div>

      <DataTable
        columns={columns}
        rows={projects}
        emptyText="No projects available"
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />

      {openForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editId ? "Update Project" : "Create Project"}</h3>
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
                <label>Project Name</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Tech Stack</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter project description"
                  rows="4"
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
                      ? "Update Project"
                      : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Projects;