import { axiosInstance } from "../../../../utils/api";

// Obtener motivos de salida con paginación y búsqueda
export const getMotivosSalida = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/motivos-salida?${params.toString()}`);
    return response.data; // debe devolver: total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener motivos de salida con paginación:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear motivo de salida
export const crearMotivoSalida = async (data) => {
  try {
    const response = await axiosInstance.post("/motivos-salida", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear motivo de salida:", error);
    throw error;
  }
};

// Actualizar motivo de salida por ID
export const actualizarMotivoSalida = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/motivos-salida/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar motivo de salida:", error);
    throw error;
  }
};

// Eliminar motivo de salida por ID
export const eliminarMotivoSalida = async (id) => {
  try {
    await axiosInstance.delete(`/motivos-salida/${id}`);
  } catch (error) {
    console.error("Error al eliminar motivo de salida:", error);
    throw error;
  }
};
