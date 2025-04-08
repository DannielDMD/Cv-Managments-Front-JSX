import { axiosInstance } from "../../utils/api";

export const obtenerResumenCandidatos = async () => {
    try {
        const response = await axiosInstance.get("/candidatos/resumen");
        return response.data;
      } catch (error) {
        console.error("Error fetching al obtener el resumen del candidato:", error);
        return null;
      }
};
