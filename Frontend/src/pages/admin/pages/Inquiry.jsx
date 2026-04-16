import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axiosInstance";

const PAGE_SIZE = 5;
import { getInquiries, deleteInquiry } from "../services/inquiryService";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadInquiries = async () => {
    try {
      const { data } = await getInquiries();
      setInquiries(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteInquiry(deleteId);
      setDeleteId(null);
      loadInquiries();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Subject", key: "subject" },
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
    <AdminLayout title="Manage Inquiries" subtitle="Handle website inquiry submissions.">
      <DataTable columns={columns} rows={inquiries} emptyText="No inquiries available" />
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