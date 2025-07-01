// services/DashboardServices/candidateResumenService.js
import { axiosInstance } from "../../utils/api";

export const obtenerResumenCandidatos = async (search = "", filtros = {}, pagina = 1, porPagina = 10) => {
  try {
    const params = { search };

    // Filtros uno por uno
    if (filtros.id_ciudad) params.id_ciudad = filtros.id_ciudad;

    if (filtros.id_cargo) params.id_cargo = filtros.id_cargo;

    if (filtros.estado) params.estado = filtros.estado;

    if (filtros.id_herramienta) {
      params.id_herramienta = filtros.id_herramienta;
    }
    if (filtros.id_habilidad_blanda) {
      params.id_habilidad_blanda = filtros.id_habilidad_blanda;
    }
    if (filtros.id_habilidad_tecnica) {
      params.id_habilidad_tecnica = filtros.id_habilidad_tecnica;
    }

    if (filtros.trabaja_joyco !== null && filtros.trabaja_joyco !== undefined) {
      params.trabaja_joyco = filtros.trabaja_joyco;
    }
    if (filtros.ordenar_por_fecha) params.ordenar_por_fecha = filtros.ordenar_por_fecha;

    if (filtros.anio) params.anio = filtros.anio;

    if (filtros.mes) params.mes = filtros.mes;


    // 🆕 Nuevos filtros
    if (filtros.id_nivel_educacion) params.id_nivel_educacion = filtros.id_nivel_educacion;
    if (filtros.id_nivel_ingles) params.id_nivel_ingles = filtros.id_nivel_ingles;
    if (filtros.id_titulo) params.id_titulo = filtros.id_titulo;

    if (filtros.id_experiencia) params.id_experiencia = filtros.id_experiencia;//Toca corregur


    if (filtros.id_rango_salarial) params.id_rango_salarial = filtros.id_rango_salarial; 
    if (filtros.id_disponibilidad) params.id_disponibilidad = filtros.id_disponibilidad;


    if (filtros.ha_trabajado_joyco !== null && filtros.ha_trabajado_joyco !== undefined) {
      params.ha_trabajado_joyco = filtros.ha_trabajado_joyco;
    }

    if (filtros.tiene_referido !== null && filtros.tiene_referido !== undefined) {
      params.tiene_referido = filtros.tiene_referido;
    }

    if (filtros.disponibilidad_viajar !== null && filtros.disponibilidad_viajar !== undefined) {
      params.disponibilidad_viajar = filtros.disponibilidad_viajar;
    }

    if (filtros.trabaja_actualmente !== null && filtros.trabaja_actualmente !== undefined) {
      params.trabaja_actualmente = filtros.trabaja_actualmente;
    }



    // Paginación
    const skip = (pagina - 1) * porPagina;
    params.skip = skip;
    params.limit = porPagina;

    const response = await axiosInstance.get("/candidatos/resumen", { params });
    return response.data; // Contiene: { data: [...], total: X }
  } catch (error) {
    console.error("Error fetching resumen candidatos:", error);
    return { data: [], total: 0 };
  }
};

//Estadisticas del dashboard
export const obtenerEstadisticasCandidatos = async () => {
  try {
    const response = await axiosInstance.get("/candidatos/estadisticas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas de candidatos:", error);
    return null;
  }
};

// Funcion para hacer el fecth a la de candidatos para acutualizar erl estado 
export const actualizarEstadoCandidato = async (id, nuevoEstado) => {
  const response = await axiosInstance.put(`/candidatos/${id}`, {
    estado: nuevoEstado,
  });
  return response.data;
};


