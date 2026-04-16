import API from "../../../api/axios";

export const getContacts = () => API.get("/contacts");
export const deleteContact = (id) => API.delete(`/contacts/${id}`);