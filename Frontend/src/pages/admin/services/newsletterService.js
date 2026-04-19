import API from "../../../api/axios";

export const getSubscribers = () => API.get("/subscribers");
export const subscribe = (email) => API.post("/subscribers", { email });
export const deleteSubscriber = (id) => API.delete(`/subscribers/${id}`);
export const exportSubscribers = () => API.get("/subscribers/export", { responseType: 'blob' });