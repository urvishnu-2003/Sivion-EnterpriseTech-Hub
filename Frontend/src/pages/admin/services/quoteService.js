import API from "../../../api/axios";

export const getQuotes = () => API.get("/quotes");
export const createQuote = (data) => API.post("/quotes", data);
export const deleteQuote = (id) => API.delete(`/quotes/${id}`);