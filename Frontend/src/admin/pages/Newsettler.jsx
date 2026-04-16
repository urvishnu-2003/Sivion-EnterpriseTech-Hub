import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import { getSubscribers } from "../services/newsettlerService";

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);

  const loadSubscribers = async () => {
    try {
      const { data } = await getSubscribers();
      setSubscribers(data?.data || data || []);
    } catch (error) {
      console.log("Error loading subscribers:", error);
      setSubscribers([]);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns = [
    {
      header: "S.No",
      key: "serial",
      render: (_, i) => i + 1,
    },
    {
      header: "Email",
      key: "email",
      render: (row) => row.email || "-",
    },
    {
      header: "Subscribed At",
      key: "subscribedAt",
      render: (row) => formatDate(row.subscribedAt),
    },
    {
      header: "Created At",
      key: "createdAt",
      render: (row) => formatDate(row.createdAt),
    },
  ];

  return (
    <AdminLayout
      title="Manage Newsletter"
      subtitle="Review newsletter subscribers."
    >
      <DataTable
        columns={columns}
        rows={subscribers}
        emptyText="No subscribers available"
      />
    </AdminLayout>
  );
};

export default Newsletter;