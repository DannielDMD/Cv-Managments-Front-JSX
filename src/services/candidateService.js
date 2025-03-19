import axios from "axios";

const API_URL = "http://localhost:8000"; // Ajusta la URL si es diferente

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Timeout de 5 segundos
});

export const getCiudades = async () => {
  try {
    const response = await axiosInstance.get("/ciudades");
    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error.message);
    return [];
  }
};

export const getCargos = async () => {
  try {
    const response = await axiosInstance.get("/cargo-ofrecido");
    return response.data;
  } catch (error) {
    console.error("Error al obtener cargos:", error.message);
    return [];
  }
};
