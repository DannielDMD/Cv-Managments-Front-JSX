import { axiosInstance } from "../../../../utils/api";

// Obtener centros de costos con paginación y búsqueda
export const getCentrosCostos = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/centros-costos?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener centros de costos con paginación:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear centro de costos
export const crearCentroCostos = async (data) => {
  try {
    const response = await axiosInstance.post("/centros-costos", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear centro de costos:", error);
    throw error;
  }
};

// Actualizar centro de costos por ID
export const actualizarCentroCostos = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/centros-costos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar centro de costos:", error);
    throw error;
  }
};

// Eliminar centro de costos por ID
export const eliminarCentroCostos = async (id) => {
  try {
    await axiosInstance.delete(`/centros-costos/${id}`);
  } catch (error) {
    console.error("Error al eliminar centro de costos:", error);
    throw error;
  }
};
