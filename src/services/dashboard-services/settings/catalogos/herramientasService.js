// src/services/dashboard-services/settings/catalogos/herramientasService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener herramientas con paginación y búsqueda
export const getHerramientas = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/conocimientos/herramientas?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener herramientas:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear herramienta
export const crearHerramienta = async (data) => {
  try {
    const response = await axiosInstance.post("/conocimientos/herramientas", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear herramienta:", error);
    throw error;
  }
};

// Actualizar herramienta por ID
export const actualizarHerramienta = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/conocimientos/herramientas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar herramienta:", error);
    throw error;
  }
};

// Eliminar herramienta por ID
export const eliminarHerramienta = async (id) => {
  try {
    await axiosInstance.delete(`/conocimientos/herramientas/${id}`);
  } catch (error) {
    console.error("Error al eliminar herramienta:", error);
    throw error;
  }
};
