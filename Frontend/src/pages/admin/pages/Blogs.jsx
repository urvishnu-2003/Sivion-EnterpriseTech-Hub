import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getBlogs, deleteBlog } from "../services/blogService";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteBlog(deleteId);
      setDeleteId(null);
      loadBlogs();
    } catch (error) {
      console.log(error);
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
        <button className="admin-btn admin-btn-danger" onClick={() => setDeleteId(row._id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <AdminLayout title="Manage Blogs" subtitle="View and manage all blog content.">
      <DataTable columns={columns} rows={blogs} emptyText="No blogs available" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Blogs;