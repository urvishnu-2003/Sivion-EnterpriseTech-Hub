import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import SkeletonTable from "../components/SkeletonTable";
import axiosInstance from "../../../api/axiosInstance";

const PAGE_SIZE = 5;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [selectedDelete, setSelectedDelete] = useState(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/projects/admin/all");
      setProjects(response.data?.data || []);
    } catch (error) {
      setToast({ message: "Failed to load projects", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      `${project.title} ${(project.technologies || []).join(" ")} ${project.status || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/projects/${selectedDelete._id}`);
      setToast({ message: "Project deleted successfully", type: "success" });
      setSelectedDelete(null);
      loadProjects();
    } catch (error) {
      setToast({ message: "Failed to delete project", type: "error" });
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "techStack",
      label: "Tech Stack",
      render: (row) => (row.technologies || []).join(", "),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status || "Active"} />,
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
          <button className="secondary-btn">Edit</button>
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

      <ConfirmModal
        open={!!selectedDelete}
        onClose={() => setSelectedDelete(null)}
        onConfirm={handleDelete}
        message={`Delete project "${selectedDelete?.title}"?`}
      />

      <div className="page-tools">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search projects..."
        />
        <button className="primary-btn">Add New Project</button>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <DataTable columns={columns} rows={paginatedProjects} />
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

export default Projects;