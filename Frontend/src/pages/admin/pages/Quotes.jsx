import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axios";

const PAGE_SIZE = 5;
import { getQuotes, deleteQuote } from "../services/quoteService";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadQuotes = async () => {
    try {
      const { data } = await getQuotes();
      setQuotes(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteQuote(deleteId);
      setDeleteId(null);
      loadQuotes();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Service", key: "service" },
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
    <AdminLayout title="Manage Quotes" subtitle="Review quote requests submitted from the website.">
      <DataTable columns={columns} rows={quotes} emptyText="No quote requests available" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Quote Request"
        message="Are you sure you want to delete this quote request?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Quotes;