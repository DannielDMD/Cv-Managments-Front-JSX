
import { axiosInstance } from "../../utils/api";

export const getNiveles = async () => {
    try {
      const response = await axiosInstance.get("/nivel-educacion/todas");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los niveles de educación:", error.message);
      return [];
    }
  };
  
  export const getTitulos = async () => {
    try {
        const response = await axiosInstance.get("/titulos/todas");
        return response.data;
    } catch (error){
        console.error ("Error al obtener los titulos", error.message);
        return [];
    }
  }

  export const getTitulosPorNivel = async (id_nivel_educacion) => {
    try {
        const response = await axiosInstance.get(`/titulos/nivel/${id_nivel_educacion}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los títulos filtrados:", error.message);
        return [];
    }
};


  export const getInstituciones = async () => {
    try {
        const response = await axiosInstance.get("/instituciones/todas");
        return response.data;
    } catch (error){
        console.error ("Error al obtener las instituciones", error.message);
        return [];
    }
  }

  export const getIngles = async () => {
    try {
        const response = await axiosInstance.get("/nivel-ingles/todas");
        return response.data;
    } catch (error) {
        console.error ("Error al obtener los niveles de ingles", error.message);
        return [];
    }
  }


  export const postEducation = async (educationData) => {
    try {
      const response = await axiosInstance.post("/educaciones", educationData);
      return response.data;
    } catch (error) {
      console.error("Error al enviar los datos del Educación:", error.message);
      throw error;
    }
  };