
import { axiosInstance } from "../../../../utils/api";

// Obtener departamentos con paginación y búsqueda
export const getDepartamentos = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/departamentos?${params.toString()}`);
    return response.data; // debe devolver: total, total_pages, resultados, etc.
  } catch (error) {
    console.error("Error al obtener departamentos con paginación:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear departamento
export const crearDepartamento = async (data) => {
  try {
    const response = await axiosInstance.post("/departamentos", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear departamento:", error);
    throw error;
  }
};

// Actualizar departamento por ID
export const actualizarDepartamento = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/departamentos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar departamento:", error);
    throw error;
  }
};

// Eliminar departamento por ID
export const eliminarDepartamento = async (id) => {
  try {
    await axiosInstance.delete(`/departamentos/${id}`);
  } catch (error) {
    console.error("Error al eliminar departamento:", error);
    throw error;
  }
};
