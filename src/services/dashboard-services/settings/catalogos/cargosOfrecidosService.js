import { axiosInstance } from "../../../../utils/api";

// Obtener cargos ofrecidos con paginación y búsqueda
export const getCargosOfrecidos = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/cargo-ofrecido?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener cargos ofrecidos con paginación:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear un nuevo cargo ofrecido
export const crearCargoOfrecido = async (data) => {
  try {
    const response = await axiosInstance.post("/cargo-ofrecido", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear cargo ofrecido:", error);
    throw error;
  }
};


// Actualizar un cargo ofrecido por ID
export const actualizarCargoOfrecido = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/cargo-ofrecido/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar cargo ofrecido:", error);
    throw error;
  }
};


// Eliminar un cargo ofrecido por ID
export const eliminarCargoOfrecido = async (id) => {
  try {
    await axiosInstance.delete(`/cargo-ofrecido/${id}`);
  } catch (error) {
    console.error("Error al eliminar cargo ofrecido:", error);
    throw error;
  }
};
