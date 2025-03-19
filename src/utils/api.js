import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // Asegúrate de que el backend está corriendo en esta URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
