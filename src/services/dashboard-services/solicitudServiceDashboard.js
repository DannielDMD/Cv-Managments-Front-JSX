import { axiosInstance } from "../../utils/api";


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
      const response = await axiosInstance.delete(`/solicitudes-eliminacion/${id}`);
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

// DELETE: Eliminar varias solicitudes de eliminación por lote
export const eliminarSolicitudesPorLote = async (ids) => {
  try {
    const response = await axiosInstance.post("/solicitudes-eliminacion/eliminar-lote", {
      ids,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al eliminar solicitudes por lote:", error.message);
    throw error;
  }
};
