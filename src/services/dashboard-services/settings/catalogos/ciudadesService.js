// src/services/dashboard-services/settings/catalogos/ciudadesService.js

import { axiosInstance } from "../../../../utils/api";

// Obtener ciudades con paginación y filtros
export const getCiudades = async ({ skip = 0, limit = 10, search = "", id_departamento = null } = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("skip", skip);
    params.append("limit", limit);
    if (search) params.append("search", search);
    if (id_departamento !== null) params.append("id_departamento", id_departamento);

    const response = await axiosInstance.get(`/ciudades?${params.toString()}`);
    return response.data; // Objeto con paginación
  } catch (error) {
    console.error("Error al obtener ciudades con paginación:", error);
    return {
      total: 0,
      page: 1,
      per_page: limit,
      total_pages: 1,
      resultados: [],
    };
  }
};

// Crear ciudad
export const crearCiudad = async (data) => {
  try {
    const response = await axiosInstance.post("/ciudades", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear ciudad:", error);
    throw error;
  }
};

// Eliminar ciudad
export const eliminarCiudad = async (idCiudad) => {
  try {
    await axiosInstance.delete(`/ciudades/${idCiudad}`);
  } catch (error) {
    console.error("Error al eliminar ciudad:", error);
    throw error;
  }
};

// Obtener lista de departamentos (para mostrar en el modal de creación)
export const getDepartamentos = async () => {
  try {
    const response = await axiosInstance.get("/departamentos/todas");
    return response.data; // Lista sin paginación
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    return [];
  }
};
