import { axiosInstance } from "../../../utils/api";





// Estadísticas de educación
export const obtenerEstadisticasEducacion = async (anio) => {
    try {
        const response = await axiosInstance.get("/reportes/educacion", {
            params: { año: anio },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas de educación:", error);
        return null;
    }
};



// Servicio para obtener estadísticas de experiencia laboral
export const obtenerEstadisticasExperiencia = async (anio) => {
    try {
        const response = await axiosInstance.get("/reportes/experiencia", {
            params: anio ? { año: anio } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas de experiencia:", error);
        return null;
    }
};
// Servicio para obtener estadísticas de conocimientos
export const obtenerEstadisticasConocimientos = async (anio) => {
    try {
        const response = await axiosInstance.get("/reportes/conocimientos", {
            params: anio ? { año: anio } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas de conocimientos:", error);
        return null;
    }
};
// Servicio para obtener estadísticas de preferencias y disponibilidad
export const obtenerEstadisticasPreferencias = async (anio) => {
    try {
        const response = await axiosInstance.get("/reportes/preferencias", {
            params: anio ? { año: anio } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas de preferencias:", error);
        return null;
    }
};



// Estadísticas del proceso (por ejemplo: filtros, entrevistas, finalistas)
export const obtenerStatsProceso = async () => {
    try {
        const response = await axiosInstance.get("/dashboard/stats_proceso");
        return response.data;
    } catch (error) {
        console.error("Error al obtener estadísticas del proceso:", error);
        return null;
    }
};

// Servicio para obtener estadísticas de información personal
export const obtenerEstadisticasPersonales = async (anio) => {
    try {
      const response = await axiosInstance.get("/reportes/personal", {
        params: anio ? { año: anio } : {},
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener estadísticas de información personal:", error);
      return null;
    }
  };
  

// Descargar PDF con estadísticas
export const descargarReportePDF = async (anio) => {
    const response = await axiosInstance.post(
        "/reportes/exportar-estadisticas-pdf",
        { año: anio },
        { responseType: "blob" }
    );
    return response.data;
};

// Descargar Excel con candidatos detallados
export const descargarReporteExcel = async (anio) => {
    const response = await axiosInstance.post(
        "/reportes/exportar-candidatos",
        { año: anio },
        { responseType: "blob" }
    );
    return response.data;
};
