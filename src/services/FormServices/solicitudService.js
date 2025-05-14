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
  mes = null,
  estado = null, // 👈 asegúrate que esté declarado
}) => {
  try {
    const params = {
      skip: (page - 1) * limit,
      limit,
      search,
      ordenar_por_fecha: ordenar, 
    };
    if (anio) params.anio = anio;
    if (mes) params.mes = mes;
    if (estado) params.estado = estado; // 👈 importante
    if (ordenar) params.ordenar_por_fecha = ordenar;

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

// DELETE: Eliminar una solicitud por ID
export const deleteSolicitudEliminacion = async (id) => {
    try {
      const response = await axiosInstance.delete(`/solicitudes-eliminacion/estadisticas${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error al eliminar solicitud:", error.message);
      throw error;
    }
  };
  
// GET: Obtener estadísticas de solicitudes
export const getEstadisticasSolicitudes = async (anio = null) => {
  try {
    const params = {};
    if (anio) params.año = anio;

    const response = await axiosInstance.get("/solicitudes-eliminacion/estadisticas", { params });
    return response.data; 
  } catch (error) {
    console.error("❌ Error al obtener estadísticas:", error.message);
    throw error;
  }
};
