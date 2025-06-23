// src/services/dashboard-services/settings/catalogos/rangosSalarialesService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener rangos salariales con paginación y búsqueda
export const getRangosSalariales = async ({ skip = 0, limit = 10, search = "" } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/rangos-salariales?${params.toString()}`);
    return response.data; // total, page, per_page, total_pages, resultados
  } catch (error) {
    console.error("Error al obtener rangos salariales:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear rango salarial
export const crearRangoSalarial = async (data) => {
  try {
    const response = await axiosInstance.post("/rangos-salariales", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear rango salarial:", error);
    throw error;
  }
};

// Actualizar rango salarial por ID
export const actualizarRangoSalarial = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/rangos-salariales/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar rango salarial:", error);
    throw error;
  }
};

// Eliminar rango salarial por ID
export const eliminarRangoSalarial = async (id) => {
  try {
    await axiosInstance.delete(`/rangos-salariales/${id}`);
  } catch (error) {
    console.error("Error al eliminar rango salarial:", error);
    throw error;
  }
};
