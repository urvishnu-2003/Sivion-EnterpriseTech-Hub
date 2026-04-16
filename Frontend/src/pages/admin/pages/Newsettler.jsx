import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getSubscribers, deleteSubscriber } from "../services/newsettlerService";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadSubscribers = async () => {
    try {
      const { data } = await getSubscribers();
      setSubscribers(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteSubscriber(deleteId);
      setDeleteId(null);
      loadSubscribers();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Email", key: "email" },
    { header: "Created At", key: "createdAt", render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-" },
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
    <AdminLayout title="Manage Newsletter" subtitle="Review and manage newsletter subscribers.">
      <DataTable columns={columns} rows={subscribers} emptyText="No subscribers available" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Subscriber"
        message="Are you sure you want to delete this subscriber?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Newsletter;