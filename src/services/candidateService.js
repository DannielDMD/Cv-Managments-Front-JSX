import api from "../utils/api";

export const getCiudades = async () => {
    try {
        const response = await api.get("/ciudades");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las ciudades:", error);
        throw error;
    }
};

export const getCargosOfrecidos = async () => {
    try {
        const response = await api.get("/cargo-ofrecido");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los cargos ofrecidos:", error);
        throw error;
    }
};

export const postCandidato = async (candidatoData) => {
    try {
        const response = await api.post("/candidatos", candidatoData);
        console.log("Candidato registrado con éxito:", response.data);
    } catch (error) {
        console.error("Error al registrar el candidato:", error);
        throw error;
    }
};
