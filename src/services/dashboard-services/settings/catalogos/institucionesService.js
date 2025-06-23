import { axiosInstance } from "../../../../utils/api";

// Obtener instituciones con paginación y búsqueda
export const getInstituciones = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/instituciones?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener instituciones académicas:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear institución académica
export const crearInstitucion = async (data) => {
  try {
    const response = await axiosInstance.post("/instituciones", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear institución académica:", error);
    throw error;
  }
};

// Actualizar institución académica por ID
export const actualizarInstitucion = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/instituciones/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar institución académica:", error);
    throw error;
  }
};

// Eliminar institución académica por ID
export const eliminarInstitucion = async (id) => {
  try {
    await axiosInstance.delete(`/instituciones/${id}`);
  } catch (error) {
    console.error("Error al eliminar institución académica:", error);
    throw error;
  }
};
