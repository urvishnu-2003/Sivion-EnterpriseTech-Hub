import API from "../../../api/axios";

export const getInquiries = () => {
  return API.get("/inquiries");
};

export const createInquiry = (data) => {
  return API.post("/inquiries", data);
};

export const updateInquiryStatus = (id, payload) => {
  return API.put(`/inquiries/${id}`, payload);
};

export const deleteInquiry = (id) => {
  return API.delete(`/inquiries/${id}`);
};