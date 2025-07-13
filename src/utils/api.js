import axios from "axios";
import { getAccessToken } from "./getAccessToken";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lista de rutas que NO requieren token
const rutasPublicas = [
  "/candidatos",
  "/catalogos",
  "/nivel-educacion",
  "/titulos-obtenidos",
  "/instituciones-academicas",
  "/solicitudes-eliminacion",
];

axiosInstance.interceptors.request.use(
  async (config) => {
    // Verifica si la ruta es pública
    const esRutaPublica = rutasPublicas.some((ruta) =>
      config.url?.startsWith(ruta)
    );

    if (!esRutaPublica) {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        //console.warn("✅ Token enviado:", token.slice(0, 30) + "..."); // Muestra parte del token

      } else {
        console.warn("⚠️ No se obtuvo token");
      }
    }


    return config;
  },
  (error) => Promise.reject(error)
);
