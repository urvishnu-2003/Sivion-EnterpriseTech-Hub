import API from "../../../api/axios";

export const getJobs = () => API.get("/jobs/admin/all");
export const createJob = (payload) => API.post("/jobs", payload);
export const updateJob = (id, payload) => API.put(`/jobs/${id}`, payload);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);