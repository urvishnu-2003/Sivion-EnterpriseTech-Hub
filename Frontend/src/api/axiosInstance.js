/**
 * Axios-compatible fetch wrapper — no external dependency needed.
 * Mirrors the axios.create() interface used across the admin pages:
 *   axiosInstance.get(url)
 *   axiosInstance.post(url, data)
 *   axiosInstance.put(url, data)
 *   axiosInstance.delete(url)
 * Responses always resolve to { data: <parsed JSON> }
 */

const BASE_URL = import.meta.env.VITE_API_URL || "";

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, url, body = undefined) {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };

  const options = {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${BASE_URL}${url}`, options);

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.message || `HTTP ${response.status}`);
    error.response = { data, status: response.status };
    return Promise.reject(error);
  }

  return { data };
}

const axiosInstance = {
  get:    (url)         => request("GET",    url),
  post:   (url, body)   => request("POST",   url, body),
  put:    (url, body)   => request("PUT",    url, body),
  patch:  (url, body)   => request("PATCH",  url, body),
  delete: (url)         => request("DELETE", url),
};

export default axiosInstance;