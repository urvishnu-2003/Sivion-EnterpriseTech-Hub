import API from "../../../api/axios";

export const getSubscribers = () => API.get("/subscribers");
export const deleteSubscriber = (id) => API.delete(`/subscribers/${id}`);