import { axiosInstance } from "../../utils/api";

export const obtenerResumenCandidatos = async (search = "") => {
  try {
    const response = await axiosInstance.get("/candidatos/resumen", {
      params: search ? { search } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching al obtener el resumen del candidato:", error);
    return null;
  }
};

// Funcion para hacer wel fecth a la de candidatos para sacutualiza erl estado 
export const actualizarEstadoCandidato = async (id, nuevoEstado) => {
  const response = await axiosInstance.put(`/candidatos/${id}`, {
    estado: nuevoEstado,
  });
  return response.data;
};

export const obtenerCandidatoDetalle = async (id) => {
  const response = await axiosInstance.get(`/candidatos/${id}/detalle`);
  return response.data;
};
