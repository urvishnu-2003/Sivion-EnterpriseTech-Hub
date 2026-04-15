import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import { getProjects, deleteProject } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const loadProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data?.data || data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
      loadProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { header: "S.No", key: "serial", render: (_, i) => i + 1 },
    { header: "Project Name", key: "title" },
    { header: "Category", key: "category" },
    { header: "Tech Stack", key: "techStack", render: (row) => Array.isArray(row.techStack) ? row.techStack.join(", ") : row.techStack || "-" },
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
    <AdminLayout title="Manage Projects" subtitle="Track and manage project showcase items.">
      <DataTable columns={columns} rows={projects} emptyText="No projects available" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
};

export default Projects;