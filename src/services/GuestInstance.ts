import axios from "axios";

const GuestInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_BACKEND_PROD
      : import.meta.env.VITE_BACKEND_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

export default GuestInstance;
