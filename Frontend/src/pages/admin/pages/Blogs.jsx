import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axios";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/blogService";

const initialForm = {
  title: "",
  category: "",
  status: "draft",
  content: "",
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const loadBlogs = async () => {
    try {
      const response = await getBlogs();
      const data = response.data;

      const blogList = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.blogs)
          ? data.blogs
          : Array.isArray(data)
            ? data
            : [];

      setBlogs(blogList);
    } catch (error) {
      console.log("Load Blogs Error:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    loadBlogs();
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

  const handleOpenEdit = (blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      status: blog.status || "draft",
      content: blog.content || "",
    });
    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        await updateBlog(editId, formData);
      } else {
        await createBlog(formData);
      }

      setOpenForm(false);
      setEditId(null);
      setFormData(initialForm);
      loadBlogs();
    } catch (error) {
      console.log("Submit Blog Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(deleteId);
      setDeleteId(null);
      loadBlogs();
    } catch (error) {
      console.log("Delete Blog Error:", error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Title", key: "title" },
    { header: "Category", key: "category" },
    { header: "Status", key: "status" },
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
      title="Manage Blogs"
      subtitle="View and manage all blog content."
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button className="admin-btn admin-btn-primary" onClick={handleOpenCreate} type="button">
          Add Blog
        </button>
      </div>

      <DataTable columns={columns} rows={blogs} emptyText="No blogs available" />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />

      {openForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editId ? "Update Blog" : "Create Blog"}</h3>
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
                  placeholder="Enter blog title"
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
                  placeholder="Enter blog category"
                  required
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
                <label>Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter blog content"
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
                      ? "Update Blog"
                      : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Blogs;