import axios from "axios";

const AdminInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default AdminInstance;
