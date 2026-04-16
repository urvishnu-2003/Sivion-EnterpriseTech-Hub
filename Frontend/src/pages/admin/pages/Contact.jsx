import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
<<<<<<< HEAD
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axios";

const PAGE_SIZE = 5;
=======
import { getContacts, deleteContact } from "../services/contactService";
>>>>>>> origin/branch-backend/h

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadContacts = async () => {
    try {
      const { data } = await getContacts();
      setContacts(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteContact(deleteId);
      setDeleteId(null);
      loadContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
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
    <AdminLayout title="Manage Contact Requests" subtitle="Review contact submissions from the website.">
      <DataTable columns={columns} rows={contacts} emptyText="No contact requests available" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Contact Request"
        message="Are you sure you want to delete this contact request?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Contact;