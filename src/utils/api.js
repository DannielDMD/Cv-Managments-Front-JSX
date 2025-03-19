import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Asegúrate de que esta URL es correcta
});

export default api;
