// src/services/DashboardServices/settings/catalogos/titulosService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener títulos con paginación, búsqueda y filtro por nivel educativo
export const getTitulos = async ({ skip = 0, limit = 10, search = "", idNivel = null } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);
    if (idNivel !== null) params.append("id_nivel_educacion", idNivel);

    const response = await axiosInstance.get(`/titulos?${params.toString()}`);
    return response.data; // { total, page, per_page, total_pages, resultados }
  } catch (error) {
    console.error("Error al obtener títulos:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Obtener títulos por nivel educativo (sin paginación especial)
export const getTitulosPorNivel = async (idNivel) => {
  try {
    const response = await axiosInstance.get(`/titulos/nivel/${idNivel}`);
    return response.data; // lista simple de títulos
  } catch (error) {
    console.error("Error al obtener títulos por nivel:", error);
    return [];
  }
};

// Crear nuevo título
export const crearTitulo = async (data) => {
  try {
    const response = await axiosInstance.post("/titulos", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear título:", error);
    throw error;
  }
};

// Actualizar título por ID
export const actualizarTitulo = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/titulos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar título:", error);
    throw error;
  }
};

// Eliminar título por ID
export const eliminarTitulo = async (id) => {
  try {
    await axiosInstance.delete(`/titulos/${id}`);
  } catch (error) {
    console.error("Error al eliminar título:", error);
    throw error;
  }
};
