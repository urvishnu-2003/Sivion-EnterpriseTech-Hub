import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10 second timeout to prevent hanging requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with timeout error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle timeout errors gracefully
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server not responding");
      return Promise.reject(new Error("Request timeout - please try again"));
    }
    
    // Handle insufficient resources errors
    if (error.message && error.message.includes("INSUFFICIENT_RESOURCES")) {
      console.error("Browser resource exhaustion - clearing cache");
      // Clear any cached data to free up resources
      sessionStorage.clear();
      return Promise.reject(new Error("Resource limit reached - please refresh"));
    }

    return Promise.reject(error);
  }
);

export { API as axiosInstance };
export default API;