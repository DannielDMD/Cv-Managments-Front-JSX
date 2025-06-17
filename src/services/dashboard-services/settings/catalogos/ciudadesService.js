import { axiosInstance } from  "../../../../utils/api";


export const getCiudades = async () => {
  try {
    const response = await axiosInstance.get("/ciudades");
    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error);
    return [];
  }
};

export const getCiudadesPorDepartamento = async (idDepartamento) => {
  try {
    const response = await axiosInstance.get(`/ciudades/departamento/${idDepartamento}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudades por departamento:", error);
    return [];
  }
};

export const getCiudadPorId = async (idCiudad) => {
  try {
    const response = await axiosInstance.get(`/ciudades/${idCiudad}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudad:", error);
    return null;
  }
};

export const crearCiudad = async (datos) => {
  try {
    const response = await axiosInstance.post("/ciudades", datos);
    return response.data;
  } catch (error) {
    console.error("Error al crear ciudad:", error);
    throw error;
  }
};

export const eliminarCiudad = async (idCiudad) => {
  try {
    await axiosInstance.delete(`/ciudades/${idCiudad}`);
  } catch (error) {
    console.error("Error al eliminar ciudad:", error);
    throw error;
  }
};