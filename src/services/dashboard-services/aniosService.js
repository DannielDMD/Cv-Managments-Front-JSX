import { axiosInstance } from "../../utils/api";

export const obtenerAniosDisponibles = async () => {
  try {
    const response = await axiosInstance.get("/reportes/anios-disponibles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener años disponibles:", error);
    return [];
  }
};