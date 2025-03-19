
// candidateService.js (Servicios relacionados con candidatos)
import { axiosInstance } from "../utils/api";

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

export const getMotivos = async () => {
    try {
        const response = await axiosInstance.get("/motivos-salida");
        console.log("Motivos de salida recibidos:", response.data);  // 👈 Agrega esto
        return response.data;
      } catch (error) {
        console.error("Error al obtener los motivos de salida:", error.message);
        return [];
      }
  };



export const postCandidate = async (candidateData) => {
  try {
    const response = await axiosInstance.post("/candidatos", candidateData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar los datos del candidato:", error.message);
    throw error;
  }
};
