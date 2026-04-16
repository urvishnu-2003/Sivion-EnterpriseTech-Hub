import API from "../../../api/axios";

export const getProjects = () => API.get("/projects/admin/all");
export const createProject = (payload) => API.post("/projects", payload);
export const updateProject = (id, payload) => API.put(`/projects/${id}`, payload);
export const deleteProject = (id) => API.delete(`/projects/${id}`);