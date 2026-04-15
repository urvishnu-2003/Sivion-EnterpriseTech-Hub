import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-brand">Admin Panel</h2>

      <nav className="admin-nav">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/jobs">Manage Jobs</NavLink>
        <NavLink to="/admin/applications">Manage Applications</NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;