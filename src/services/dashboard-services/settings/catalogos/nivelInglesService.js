import { axiosInstance } from "../../../../utils/api";

// Obtener niveles de inglés con paginación y búsqueda
export const getNivelesIngles = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/nivel-ingles?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener niveles de inglés:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear nivel de inglés
export const crearNivelIngles = async (data) => {
  try {
    const response = await axiosInstance.post("/nivel-ingles", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear nivel de inglés:", error);
    throw error;
  }
};

// Actualizar nivel de inglés por ID
export const actualizarNivelIngles = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/nivel-ingles/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar nivel de inglés:", error);
    throw error;
  }
};

// Eliminar nivel de inglés por ID
export const eliminarNivelIngles = async (id) => {
  try {
    await axiosInstance.delete(`/nivel-ingles/${id}`);
  } catch (error) {
    console.error("Error al eliminar nivel de inglés:", error);
    throw error;
  }
};
