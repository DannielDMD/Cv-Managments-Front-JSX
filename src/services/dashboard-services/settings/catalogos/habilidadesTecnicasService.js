// src/services/dashboard-services/settings/catalogos/habilidadesTecnicasService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener habilidades técnicas con paginación y búsqueda
export const getHabilidadesTecnicas = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/conocimientos/habilidades-tecnicas?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener habilidades técnicas:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear habilidad técnica
export const crearHabilidadTecnica = async (data) => {
  try {
    const response = await axiosInstance.post("/conocimientos/habilidades-tecnicas", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear habilidad técnica:", error);
    throw error;
  }
};

// Actualizar habilidad técnica por ID
export const actualizarHabilidadTecnica = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/conocimientos/habilidades-tecnicas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar habilidad técnica:", error);
    throw error;
  }
};

// Eliminar habilidad técnica por ID
export const eliminarHabilidadTecnica = async (id) => {
  try {
    await axiosInstance.delete(`/conocimientos/habilidades-tecnicas/${id}`);
  } catch (error) {
    console.error("Error al eliminar habilidad técnica:", error);
    throw error;
  }
};
