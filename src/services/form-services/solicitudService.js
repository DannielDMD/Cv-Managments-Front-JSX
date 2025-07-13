import { axiosInstance } from "../../utils/api";

// POST: Crear una nueva solicitud de eliminación
export const postSolicitudEliminacion = async (solicitudData) => {
  try {
    const response = await axiosInstance.post("/solicitudes-eliminacion", solicitudData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar solicitud:", error.message);
    throw error;
  }
};

