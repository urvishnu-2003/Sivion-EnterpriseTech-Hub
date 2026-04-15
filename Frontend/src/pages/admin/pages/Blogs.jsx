import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../api/axiosInstance";

const PAGE_SIZE = 5;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [selectedDelete, setSelectedDelete] = useState(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/blogs");
      setBlogs(response.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load blogs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      `${blog.title} ${blog.category || ""} ${blog.status || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [blogs, search]);

  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE) || 1;
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/blogs/${selectedDelete._id}`);
      setToast({ message: "Blog deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadBlogs();
    } catch (error) {
      setToast({ message: "Failed to delete blog", type: "error" });
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge status={row.isPublished ? "Active" : "Inactive"} />
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="action-group">
          <button className="secondary-btn">Edit</button>
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
        message={`Delete blog "${selectedDelete?.title}"?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search blogs..."
        />
        <button className="primary-btn">Add New Blog</button>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedBlogs} />
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

export default Blogs;