import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axiosInstance";

const PAGE_SIZE = 5;

const Newsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/subscribers");
      setSubscribers(response.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load subscribers", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((item) =>
      `${item.email || ""}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [subscribers, search]);

  const totalPages = Math.ceil(filteredSubscribers.length / PAGE_SIZE) || 1;
  const paginatedSubscribers = filteredSubscribers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const columns = [
    { key: "email", label: "Email" },
    {
      key: "subscribedDate",
      label: "Subscribed Date",
      render: (row) =>
        new Date(row.subscribedAt || row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: () => <button className="secondary-btn">View</button>,
    },
  ];

  return (
    <AdminLayout>
      <Toast toast={toast} onClose={() => setToast({ message: "", type: "" })} />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search subscribers..."
        />
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedSubscribers} />
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

export default Newsletter;