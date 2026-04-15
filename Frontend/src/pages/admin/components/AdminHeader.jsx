import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <h1>Corporate Admin Dashboard</h1>
      <button className="admin-btn danger" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;