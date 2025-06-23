// src/services/dashboard-services/settings/catalogos/disponibilidadService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener disponibilidades con paginación y búsqueda
export const getDisponibilidades = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/disponibilidades?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener disponibilidades:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear disponibilidad
export const crearDisponibilidad = async (data) => {
  try {
    const response = await axiosInstance.post("/disponibilidades", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear disponibilidad:", error);
    throw error;
  }
};

// Actualizar disponibilidad por ID
export const actualizarDisponibilidad = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/disponibilidades/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar disponibilidad:", error);
    throw error;
  }
};

// Eliminar disponibilidad por ID
export const eliminarDisponibilidad = async (id) => {
  try {
    await axiosInstance.delete(`/disponibilidades/${id}`);
  } catch (error) {
    console.error("Error al eliminar disponibilidad:", error);
    throw error;
  }
};
