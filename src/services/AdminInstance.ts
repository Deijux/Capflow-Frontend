import axios from "axios";

const AdminInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_BACKEND_PROD
      : import.meta.env.VITE_BACKEND_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default AdminInstance;
