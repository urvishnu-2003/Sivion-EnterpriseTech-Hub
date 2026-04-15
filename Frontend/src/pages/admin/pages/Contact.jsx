import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axios";

const PAGE_SIZE = 5;

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState(null);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/contacts");
      setContacts(response.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load contacts", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) =>
      `${item.fullName || ""} ${item.email || ""} ${item.phone || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [contacts, search]);

  const totalPages = Math.ceil(filteredContacts.length / PAGE_SIZE) || 1;
  const paginatedContacts = filteredContacts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/contacts/${selectedDelete._id}`);
      setToast({ message: "Contact deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadContacts();
    } catch (error) {
      setToast({ message: "Failed to delete contact", type: "error" });
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => row.fullName || "-",
    },
    { key: "email", label: "Email" },
    {
      key: "phone",
      label: "Phone",
      render: (row) => row.phone || "-",
    },
    {
      key: "preview",
      label: "Message Preview",
      render: (row) => (row.message ? `${row.message.slice(0, 40)}...` : "-"),
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
          <button className="secondary-btn" onClick={() => setSelectedView(row)}>
            View
          </button>
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

      <Modal
        open={!!selectedView}
        onClose={() => setSelectedView(null)}
        title="Contact Details"
      >
        {selectedView && (
          <div className="details-grid">
            <p><strong>Name:</strong> {selectedView.fullName}</p>
            <p><strong>Email:</strong> {selectedView.email}</p>
            <p><strong>Phone:</strong> {selectedView.phone}</p>
            <p><strong>Message:</strong> {selectedView.message}</p>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDelete}
        message={`Delete contact of ${selectedDelete?.fullName}?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search contacts..."
        />
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedContacts} />
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

export default Contact;