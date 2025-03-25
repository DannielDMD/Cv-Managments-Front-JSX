// api.js (Archivo centralizado para la configuración de Axios)
import axios from "axios";

const API_URL = "http://localhost:8000"; // URL del Backend en FastAPI

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Timeout de 5 segundos
  headers: {
    "Content-Type": "application/json",
  },
});