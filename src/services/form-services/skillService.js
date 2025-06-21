// skillService.js (Servicios relacionados con las habilidades y conocimientos)
import { axiosInstance } from "../../utils/api";


// Fetch a la tabla de Rangos de Experiencia
export const getHabilidadesBlandas = async () => {
    try {
        const response = await axiosInstance.get("/conocimientos/habilidades-blandas/todas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las habilidades blandas:", error.message);
        return [];
    }
};

export const getHabilidadesTecnicas = async () => {
    try {
        const response = await axiosInstance.get("/conocimientos/habilidades-tecnicas/todas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las habilidades:", error.message);
        return [];
    }
};

export const getHerramientas = async () => {
    try {
        const response = await axiosInstance.get("/conocimientos/herramientas/todas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las herramientas:", error.message);
        return [];
    }
};

// Fecth para insertar los datos en la tabla Experiencia_Laboral
export const postConocimientos = async (skillsData) => {
    try {
        const response = await axiosInstance.post("/conocimientos-candidato", skillsData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar los datos relacionados con los conocimientos:", error.message);
        throw error;
    }
};
