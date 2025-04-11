// services/DashboardServices/candidateResumenService.js
import { axiosInstance } from "../../utils/api";

export const obtenerResumenCandidatos = async (search = "", filtros = {}, pagina = 1, porPagina = 10) => {
  try {
    const params = { search };

    // Filtros uno por uno
    if (filtros.id_ciudad) params.id_ciudad = filtros.id_ciudad;
    if (filtros.id_cargo) params.id_cargo = filtros.id_cargo;
    if (filtros.estado) params.estado = filtros.estado;
    if (Array.isArray(filtros.herramientas) && filtros.herramientas.length > 0) {
      // Solo tomamos la primera herramienta (ajustar si necesitas múltiples)
      params.id_herramienta = filtros.herramientas[0];
    }
    if (filtros.trabaja_joyco !== null && filtros.trabaja_joyco !== undefined) {
      params.trabaja_joyco = filtros.trabaja_joyco;
    }

    // Paginación
    const skip = (pagina - 1) * porPagina;
    params.skip = skip;
    params.limit = porPagina;

    const response = await axiosInstance.get("/candidatos/resumen", { params });
    return response.data; // Contiene: { data: [...], total: X }
  } catch (error) {
    console.error("Error fetching resumen candidatos:", error);
    return { data: [], total: 0 };
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
