import { axiosInstance } from "../../utils/api";





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
  
  

// Estadísticas de experiencia
export const obtenerStatsExperiencia = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/stats_experiencia");
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas de experiencia:", error);
    return null;
  }
};

// Estadísticas de conocimientos (habilidades blandas, técnicas, herramientas)
export const obtenerStatsConocimientos = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/stats_conocimientos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas de conocimientos:", error);
    return null;
  }
};

// Estadísticas de preferencias (salario, modalidad, jornada, ciudad)
export const obtenerStatsPreferencias = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/stats_preferencias");
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

// Estadísticas de datos personales (por ejemplo: género, edad, ciudad)
export const obtenerStatsPersonal = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/stats_personal");
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas personales:", error);
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
  