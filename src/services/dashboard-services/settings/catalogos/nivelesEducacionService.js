import { axiosInstance } from "../../../../utils/api";

// Obtener niveles de educación con paginación y búsqueda
export const getNivelesEducacion = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/nivel-educacion?${params.toString()}`);
    return response.data; // debe devolver: total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener niveles de educación con paginación:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear nivel de educación
export const crearNivelEducacion = async (data) => {
  try {
    const response = await axiosInstance.post("/nivel-educacion", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear nivel de educación:", error);
    throw error;
  }
};

// Actualizar nivel de educación por ID
export const actualizarNivelEducacion = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/nivel-educacion/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar nivel de educación:", error);
    throw error;
  }
};

// Eliminar nivel de educación por ID
export const eliminarNivelEducacion = async (id) => {
  try {
    const response = await axiosInstance.delete(`/nivel-educacion/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar nivel de educación:", error);
    throw error;
  }
};
