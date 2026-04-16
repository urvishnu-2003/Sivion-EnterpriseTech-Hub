import API from "../../../api/axios";

export const getApplications = () => API.get("/applications");
export const updateApplication = (id, payload) => API.put(`/applications/${id}`, payload);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);