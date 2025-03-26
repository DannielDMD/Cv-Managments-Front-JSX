// experienceService.js (Servicios relacionados con candidatos)
import { axiosInstance } from "../../utils/api";


// Fetch a la tabla de Rangos de Experiencia
export const getExperiencia = async () => {
    try {
        const response = await axiosInstance.get("/rangos-experiencia");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los rangos de experiencia:", error.message);
        return [];
    }
};

// Fecth para insertar los datos en la tabla Experiencia_Laboral
export const postExperiencia = async (experienceData) => {
    try {
        const response = await axiosInstance.post("/experiencias", experienceData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar los datos relacionados con la experiencia:", error.message);
        throw error;
    }
};
