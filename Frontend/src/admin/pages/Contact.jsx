import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getContacts, deleteContact } from "../services/contactService";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadContacts = async () => {
    try {
      const { data } = await getContacts();
      setContacts(data?.data || data || []);
    } catch (error) {
      console.log("Error loading contacts:", error);
      setContacts([]);
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
      console.log("Error deleting contact:", error);
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
      title="Manage Contact Requests"
      subtitle="Review contact submissions from the website."
    >
      <DataTable
        columns={columns}
        rows={contacts}
        emptyText="No contact requests available"
      />

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