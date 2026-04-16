import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [token]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("adminUser", JSON.stringify(admin));
    } else {
      localStorage.removeItem("adminUser");
    }
  }, [admin]);

  const login = (adminData) => {
    setToken(adminData.token);
    setAdmin({
      _id: adminData._id,
      fullName: adminData.fullName,
      email: adminData.email,
      role: adminData.role,
    });
  };

  const logout = () => {
    setToken("");
    setAdmin(null);
  };

  const value = useMemo(() => {
    return {
      token,
      admin,
      isAuthenticated: Boolean(token),
      login,
      logout,
    };
  }, [token, admin]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);