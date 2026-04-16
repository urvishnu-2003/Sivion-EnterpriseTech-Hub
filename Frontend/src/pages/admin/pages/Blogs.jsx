import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import "../style/Blogs.css";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/blogService";

const initialForm = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  authorName: "Sivion Team",
  coverImage: "",
  category: "Technology",
  isPublished: true,
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

  const handleOpenEdit = (blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      summary: blog.summary || "",
      content: blog.content || "",
      authorName: blog.authorName || "Sivion Team",
      coverImage: blog.coverImage || "",
      category: blog.category || "Technology",
      isPublished:
        typeof blog.isPublished === "boolean" ? blog.isPublished : true,
    });
    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        authorName: formData.authorName.trim(),
        coverImage: formData.coverImage.trim(),
        category: formData.category.trim(),
      };

      if (editId) {
        await updateBlog(editId, payload);
      } else {
        await createBlog(payload);
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
      header: "Category",
      key: "category",
      render: (row) => row.category || "-",
    },
    {
      header: "Author",
      key: "authorName",
      render: (row) => row.authorName || "Sivion Team",
    },
    {
      header: "Published",
      key: "isPublished",
      render: (row) => (row.isPublished ? "Yes" : "No"),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="blog-actions">
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
      subtitle="Create, edit, publish, and manage blog content."
    >
      <div className="blog-action-bar">
        <button
          className="admin-btn admin-btn-primary"
          onClick={handleOpenCreate}
          type="button"
        >
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
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="enter-blog-slug"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Enter short blog summary"
                  rows="3"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter full blog content"
                  rows="6"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  placeholder="Enter author name"
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
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter blog category"
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                  />
                  Publish this blog
                </label>
              </div>

              <div className="blog-form-footer">
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