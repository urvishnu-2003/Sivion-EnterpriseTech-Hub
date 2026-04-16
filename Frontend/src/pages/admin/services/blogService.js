import API from "../../../api/axios";

export const getBlogs = () => API.get("/blogs");
export const createBlog = (payload) => API.post("/blogs", payload);
export const updateBlog = (id, payload) => API.put(`/blogs/${id}`, payload);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);