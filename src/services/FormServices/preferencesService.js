import { axiosInstance } from "../../utils/api";

//Fetch para Disponibilidad de Inicio
export const getDisponibilidades = async () => {
    try {
        const response = await axiosInstance.get("/disponibilidades");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las disponibilidades:", error.message);
        return [];
    }
};

// Fetch para Rangos Salariales
export const getRangos = async () => {
    try {
        const response = await axiosInstance.get("/rangos-salariales");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los rangos salariales:", error.message);
        return [];
    }
};

//Fetch para Motivos de Salida
export const getMotivosSalida = async () => {
    try {
        const response = await axiosInstance.get("/motivos-salida");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los motivos de salida:", error.message);
        return [];
    }
};

// Fetch para hacer el post o crear unas preferencias
export const postPreferencias = async (preferencesData) => {
    try {
        const response = await axiosInstance.post("/preferencias", preferencesData);
        return response.data;
    } catch (error) {
        console.error("Error al enviar los datos relacionados a las preferencias:", error.message);
        throw error;
    }
};