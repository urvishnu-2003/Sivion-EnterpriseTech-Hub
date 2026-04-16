import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "../../../api/axios";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("adminInfo");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!admin?.token;

  // Sync the token to localStorage so the axiosInstance picks it up via getAuthHeaders()
  useEffect(() => {
    if (admin?.token) {
      localStorage.setItem("adminToken", admin.token);
    } else {
      localStorage.removeItem("adminToken");
    }
  }, [admin]);

  const login = async (formData) => {
    setLoading(true);
    try {
      const { data } = await API.post("/auth/admin/login", formData);

      const payload = {
        token: data?.token || data?.data?.token,
        user: data?.user || data?.data?.user || data?.admin || null,
        email: data?.user?.email || data?.data?.user?.email || formData.email,
        role: data?.user?.role || data?.data?.user?.role || "admin",
      };

      localStorage.setItem("adminInfo", JSON.stringify(payload));
      setAdmin(payload);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  const value = useMemo(
    () => ({ admin, setAdmin, isAuthenticated, loading, login, logout }),
    [admin, isAuthenticated, loading]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AdminAuthContext);