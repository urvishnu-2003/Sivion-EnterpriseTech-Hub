import API from "../../../api/axios";

export const getApplications = () => {
  return API.get("/applications");
};

export const submitApplication = (formData) => {
  return API.post("/applications", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateApplicationStatus = (id, payload) => {
  return API.patch(`/applications/${id}/status`, payload);
};

export const deleteApplication = (id) => {
  return API.delete(`/applications/${id}`);
};