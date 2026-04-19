import API from "../../../api/axios";

export const getContacts = () => API.get("/contacts");
export const submitContact = (data) => API.post("/contacts", data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);