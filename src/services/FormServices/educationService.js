
import { axiosInstance } from "../../utils/api";

export const getNiveles = async () => {
    try {
      const response = await axiosInstance.get("/nivel-educacion");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los niveles de educación:", error.message);
      return [];
    }
  };
  
  export const getTitulos = async () => {
    try {
        const response = await axiosInstance.get("/titulos");
        return response.data;
    } catch (error){
        console.error ("Error al obtener los titulos", error.message);
        return [];
    }
  }

  export const getInstituciones = async () => {
    try {
        const response = await axiosInstance.get("/instituciones");
        return response.data;
    } catch (error){
        console.error ("Error al obtener las instituciones", error.message);
        return [];
    }
  }

  export const getIngles = async () => {
    try {
        const response = await axiosInstance.get("/nivel-ingles");
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