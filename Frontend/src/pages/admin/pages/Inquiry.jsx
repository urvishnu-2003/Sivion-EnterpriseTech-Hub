import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "../services/inquiryService";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const loadInquiries = async () => {
    try {
      const { data } = await getInquiries();
      setInquiries(data?.data || data || []);
    } catch (error) {
      console.log("Error loading inquiries:", error);
      setInquiries([]);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    const previousInquiries = [...inquiries];

    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry._id === id ? { ...inquiry, status } : inquiry
      )
    );

    setUpdatingStatusId(id);

    try {
      const response = await updateInquiryStatus(id, { status });
      const updatedInquiry = response?.data?.data;

      if (updatedInquiry) {
        setInquiries((prev) =>
          prev.map((inquiry) =>
            inquiry._id === id ? updatedInquiry : inquiry
          )
        );
      }
    } catch (error) {
      console.log("Error updating inquiry status:", error);
      setInquiries(previousInquiries);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInquiry(deleteId);
      setDeleteId(null);
      loadInquiries();
    } catch (error) {
      console.log("Error deleting inquiry:", error);
    }
  };

  const columns = [
    {
      header: "S.No",
      key: "serial",
      render: (_, i) => i + 1,
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
      header: "Subject",
      key: "subject",
      render: (row) => row.subject || "-",
    },
    {
      header: "Message",
      key: "message",
      render: (row) => row.message || "-",
    },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <select
          value={row.status || "pending"}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          disabled={updatingStatusId === row._id}
          className="admin-select"
        >
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      ),
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
      title="Manage Inquiries"
      subtitle="Handle website inquiry submissions."
    >
      <DataTable
        columns={columns}
        rows={inquiries}
        emptyText="No inquiries available"
      />

      <ConfirmModal
        open={!!deleteId}
        title="Delete Inquiry"
        message="Are you sure you want to delete this inquiry?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Inquiry;