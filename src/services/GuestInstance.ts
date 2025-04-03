import axios from "axios";

const GuestInstance = axios.create({
  baseURL: "https://capflow-backend.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default GuestInstance;
