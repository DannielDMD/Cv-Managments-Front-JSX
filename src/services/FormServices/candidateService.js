
// candidateService.js (Servicios relacionados con candidatos)
import { axiosInstance } from "../../utils/api";

// Obtener lista de departamentos
export const getDepartamentos = async () => {
  try {
    const response = await axiosInstance.get("/departamentos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener departamentos:", error.message);
    return [];
  }
};


// Obtener ciudades por id_departamento
export const getCiudades = async (id_departamento = null) => {
  try {
    const url = id_departamento
      ? `/ciudades/departamento/${id_departamento}` // ✅ esta es la ruta correcta
      : "/ciudades";

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error.message);
    return [];
  }
};

export const getCargos = async () => {
  try {
    const response = await axiosInstance.get("/cargo-ofrecido");
    return response.data;
  } catch (error) {
    console.error("Error al obtener cargos:", error.message);
    return [];
  }
};


// Obtener lista de centros de costos
export const getCentrosCostos = async () => {
  try {
    const response = await axiosInstance.get("/centros-costos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener centros de costos:", error.message);
    return [];
  }
};

export const getMotivos = async () => {
  try {
    const response = await axiosInstance.get("/motivos-salida");
    console.log("Motivos de salida recibidos:", response.data);  // 👈 Agrega esto
    return response.data;
  } catch (error) {
    console.error("Error al obtener los motivos de salida:", error.message);
    return [];
  }
};



export const postCandidate = async (candidateData) => {
  try {
    const response = await axiosInstance.post("/candidatos", candidateData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar los datos del candidato:", error.message);
    throw error;
  }
};


export const marcarFormularioCompleto = async (id_candidato) => {
  try {
    const response = await axiosInstance.put(`/candidatos/${id_candidato}/completar`);
    return response.data;
  } catch (error) {
    console.error("Error al marcar formulario como completo:", error);
    throw error;
  }
};  
