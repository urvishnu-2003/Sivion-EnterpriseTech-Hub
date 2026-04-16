import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const BASE_URL = rawBaseUrl.endsWith("/") 
  ? `${rawBaseUrl}api` 
  : `${rawBaseUrl}/api`;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
