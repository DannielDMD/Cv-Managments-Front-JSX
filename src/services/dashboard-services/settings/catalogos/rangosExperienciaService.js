// src/services/dashboard-services/settings/catalogos/rangosExperienciaService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener rangos de experiencia con paginación y búsqueda
export const getRangosExperiencia = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/rangos-experiencia?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener rangos de experiencia:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear rango de experiencia
export const crearRangoExperiencia = async (data) => {
  try {
    const response = await axiosInstance.post("/rangos-experiencia", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear rango de experiencia:", error);
    throw error;
  }
};

// Actualizar rango de experiencia por ID
export const actualizarRangoExperiencia = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/rangos-experiencia/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar rango de experiencia:", error);
    throw error;
  }
};

// Eliminar rango de experiencia por ID
export const eliminarRangoExperiencia = async (id) => {
  try {
    await axiosInstance.delete(`/rangos-experiencia/${id}`);
  } catch (error) {
    console.error("Error al eliminar rango de experiencia:", error);
    throw error;
  }
};
