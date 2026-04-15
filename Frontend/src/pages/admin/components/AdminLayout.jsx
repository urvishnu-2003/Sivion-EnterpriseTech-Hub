import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { ThemeProvider } from "../context/ThemeContext";

const AdminLayout = ({ title, subtitle, children, actions }) => {
  return (
    <ThemeProvider>
      <div className="admin-shell">
        <AdminSidebar />

        <div className="admin-content-wrapper">
          <AdminHeader title={title} subtitle={subtitle} />
          {actions ? <div className="admin-page-actions">{actions}</div> : null}
          <div className="admin-page-content">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;