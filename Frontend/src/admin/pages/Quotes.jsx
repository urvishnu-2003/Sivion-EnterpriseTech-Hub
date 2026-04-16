import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getQuotes, deleteQuote } from "../services/quoteService";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadQuotes = async () => {
    try {
      const { data } = await getQuotes();
      setQuotes(data?.data || data || []);
    } catch (error) {
      console.log("Error loading quotes:", error);
      setQuotes([]);
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
      console.log("Error deleting quote request:", error);
    }
  };

  const columns = [
    {
      header: "S.No",
      key: "serial",
      render: (_, i) => i + 1,
    },
    {
      header: "Request Type",
      key: "requestType",
      render: (row) => row.requestType || "quote",
    },
    {
      header: "Full Name",
      key: "fullName",
      render: (row) => row.fullName || "-",
    },
    {
      header: "Email",
      key: "email",
      render: (row) => row.email || "-",
    },
    {
      header: "Phone",
      key: "phone",
      render: (row) => row.phone || "-",
    },
    {
      header: "Company",
      key: "company",
      render: (row) => row.company || "-",
    },
    {
      header: "Service Type",
      key: "serviceType",
      render: (row) => row.serviceType || "-",
    },
    {
      header: "Budget",
      key: "budget",
      render: (row) => row.budget || "-",
    },
    {
      header: "Project Details",
      key: "projectDetails",
      render: (row) => row.projectDetails || "-",
    },
    {
      header: "Preferred Date",
      key: "preferredDate",
      render: (row) => row.preferredDate || "-",
    },
    {
      header: "Preferred Time",
      key: "preferredTime",
      render: (row) => row.preferredTime || "-",
    },
    {
      header: "Status",
      key: "status",
      render: (row) => row.status || "new",
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <button
          className="admin-btn admin-btn-danger"
          onClick={() => setDeleteId(row._id)}
          type="button"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <AdminLayout
      title="Manage Quotes"
      subtitle="Review quote and consultation requests submitted from the website."
    >
      <DataTable
        columns={columns}
        rows={quotes}
        emptyText="No quote requests available"
      />

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