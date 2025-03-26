// skillService.js (Servicios relacionados con las habilidades y conocimientos)
import { axiosInstance } from "../../utils/api";


// Fetch a la tabla de Rangos de Experiencia
export const getHabilidadesBlandas = async () => {
    try {
        const response = await axiosInstance.get("/habilidades-blandas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las habilidades blandas:", error.message);
        return [];
    }
};

export const getCategoriasHabilidadesTecnicas = async () => {
    try {
        const response = await axiosInstance.get("/habilidades_tecnicas/categorias");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los rangos de experiencia:", error.message);
        return [];
    }
};

/*
export const getHabilidadesTecnicas = async () => {
    try {
        const response = await axiosInstance.get("/categorias/{categoria_id}");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los rangos de experiencia:", error.message);
        return [];
    }
};

*/

export const getCategoriasHerramientas = async () => {
    try {
        const response = await axiosInstance.get("/herramientas/categorias_herramientas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los rangos de experiencia:", error.message);
        return [];
    }
};

export const getHerramientas = async () => {
    try {
        const response = await axiosInstance.get("/herramientas/herramientas");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los rangos de experiencia:", error.message);
        return [];
    }
};

//Post de cada de una de las habilidades y conociomientos a sus correspondientes tablas

export const postHabilidadesBlandas = async (skillsData) => {
    try {
        const response = await axiosInstance.post("/habilidades-blandas-candidato/asignar", skillsData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar los datos de habilidades blandas:", error.message);
        throw error;
    }
};


export const postHabilidadesTecnicas = async (skillsData) => {
    try {
        const response = await axiosInstance.post("/hhabilidades-tecnicas-candidato", skillsData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar los datos relacionados con la experiencia:", error.message);
        throw error;
    }
};

export const postHerramientas = async (skillsData) => {
    try {
        const response = await axiosInstance.post("/herramientas-candidato/asignar", skillsData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar los datos relacionados con la experiencia:", error.message);
        throw error;
    }
};
