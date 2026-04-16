import API from "../../../api/axios";

export const getApplications = () => {
  return API.get("/applications");
};

export const updateApplicationStatus = (id, payload) => {
  return API.patch(`/applications/${id}/status`, payload);
};

export const deleteApplication = (id) => {
  return API.delete(`/applications/${id}`);
};