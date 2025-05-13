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

// GET: Obtener solicitudes de eliminación (paginadas y filtradas)
export const getSolicitudesEliminacion = async ({
  page = 1,
  limit = 10,
  search = "",
  ordenar = "recientes",
  anio = null,
}) => {
  try {
    const params = {
      skip: (page - 1) * limit,
      limit,
      search,
      ordenar,
    };
    if (anio) params.anio = anio;

    const response = await axiosInstance.get("/solicitudes-eliminacion", { params });
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener solicitudes:", error.message);
    throw error;
  }
};

// PUT: Actualizar estado u observación de una solicitud (por TH)
export const actualizarSolicitudEliminacion = async (id, datosActualizados) => {
  try {
    const response = await axiosInstance.put(`/solicitudes-eliminacion/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar solicitud:", error.message);
    throw error;
  }
};
