import API from "../../../api/axios";

export const getInquiries = () => API.get("/inquiries");
export const deleteInquiry = (id) => API.delete(`/inquiries/${id}`);