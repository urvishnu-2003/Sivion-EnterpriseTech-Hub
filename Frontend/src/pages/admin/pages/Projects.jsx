import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

const initialForm = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  clientName: "",
  industry: "",
  technologies: "",
  projectUrl: "",
  githubUrl: "",
  coverImage: "",
  galleryImages: "",
  status: "published",
  featured: false,
  completionDate: "",
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

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "title" && !editId) {
        updatedData.slug = generateSlug(value);
      }

      return updatedData;
    });
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
      slug: project.slug || "",
      shortDescription: project.shortDescription || "",
      fullDescription: project.fullDescription || "",
      clientName: project.clientName || "",
      industry: project.industry || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      coverImage: project.coverImage || "",
      galleryImages: Array.isArray(project.galleryImages)
        ? project.galleryImages.join(", ")
        : "",
      status: project.status || "published",
      featured: typeof project.featured === "boolean" ? project.featured : false,
      completionDate: project.completionDate
        ? new Date(project.completionDate).toISOString().split("T")[0]
        : "",
    });

    setOpenForm(true);
  };

  const resetForm = () => {
    setOpenForm(false);
    setEditId(null);
    setFormData(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        clientName: formData.clientName.trim(),
        industry: formData.industry.trim(),
        technologies: formData.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        projectUrl: formData.projectUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
        coverImage: formData.coverImage.trim(),
        galleryImages: formData.galleryImages
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        status: formData.status,
        featured: formData.featured,
        completionDate: formData.completionDate || null,
      };

      if (editId) {
        await updateProject(editId, payload);
      } else {
        await createProject(payload);
      }

      resetForm();
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

  const formatArray = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return "-";
    }
    return items.join(", ");
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
      header: "Title",
      key: "title",
      render: (row) => row.title || "-",
    },
    {
      header: "Slug",
      key: "slug",
      render: (row) => row.slug || "-",
    },
    {
      header: "Client",
      key: "clientName",
      render: (row) => row.clientName || "-",
    },
    {
      header: "Industry",
      key: "industry",
      render: (row) => row.industry || "-",
    },
    {
      header: "Technologies",
      key: "technologies",
      render: (row) => formatArray(row.technologies),
    },
    {
      header: "Status",
      key: "status",
      render: (row) => row.status || "-",
    },
    {
      header: "Featured",
      key: "featured",
      render: (row) => (row.featured ? "Yes" : "No"),
    },
    {
      header: "Completion Date",
      key: "completionDate",
      render: (row) => formatDate(row.completionDate),
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
        <button
          className="admin-btn admin-btn-primary"
          onClick={handleOpenCreate}
          type="button"
        >
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
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="enter-project-slug"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Short Description</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Enter short description"
                  rows="3"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Enter full project description"
                  rows="5"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter client name"
                />
              </div>

              <div className="admin-form-group">
                <label>Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Enter industry"
                />
              </div>

              <div className="admin-form-group">
                <label>Technologies</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="admin-form-group">
                <label>Project URL</label>
                <input
                  type="text"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleChange}
                  placeholder="Enter live project URL"
                />
              </div>

              <div className="admin-form-group">
                <label>GitHub URL</label>
                <input
                  type="text"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="Enter GitHub URL"
                />
              </div>

              <div className="admin-form-group">
                <label>Cover Image URL</label>
                <input
                  type="text"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="Enter cover image URL"
                />
              </div>

              <div className="admin-form-group">
                <label>Gallery Images</label>
                <input
                  type="text"
                  name="galleryImages"
                  value={formData.galleryImages}
                  onChange={handleChange}
                  placeholder="Image1 URL, Image2 URL"
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
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Completion Date</label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  Featured Project
                </label>
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