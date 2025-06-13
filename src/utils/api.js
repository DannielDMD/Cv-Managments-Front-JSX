import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Cargado desde .env ✅

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
