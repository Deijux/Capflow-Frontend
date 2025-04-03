import axios from "axios";

const AdminInstance = axios.create({
  baseURL: "https://capflow-backend.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default AdminInstance;
