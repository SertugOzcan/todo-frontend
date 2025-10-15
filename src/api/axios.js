import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend-o3g5.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token otomatik eklensin:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
