// src/services/dashboard-services/settings/catalogos/habilidadesBlandasService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener habilidades blandas con paginación y búsqueda
export const getHabilidadesBlandas = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/conocimientos/habilidades-blandas?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener habilidades blandas:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear habilidad blanda
export const crearHabilidadBlanda = async (data) => {
  try {
    const response = await axiosInstance.post("/conocimientos/habilidades-blandas", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear habilidad blanda:", error);
    throw error;
  }
};

// Actualizar habilidad blanda por ID
export const actualizarHabilidadBlanda = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/conocimientos/habilidades-blandas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar habilidad blanda:", error);
    throw error;
  }
};

// Eliminar habilidad blanda por ID
export const eliminarHabilidadBlanda = async (id) => {
  try {
    await axiosInstance.delete(`/conocimientos/habilidades-blandas/${id}`);
  } catch (error) {
    console.error("Error al eliminar habilidad blanda:", error);
    throw error;
  }
};
