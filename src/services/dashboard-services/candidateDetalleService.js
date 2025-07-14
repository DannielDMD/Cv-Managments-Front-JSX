import { axiosInstance } from "../../utils/api";

// Lista de candidatos detallados, paginados y filtrados
export const obtenerCandidatosDetallados = async (search = "", filtros = {}, pagina = 1, porPagina = 10) => {
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

    if (filtros.id_experiencia) params.id_experiencia = filtros.id_experiencia;
    if (filtros.id_disponibilidad) params.id_disponibilidad = filtros.id_disponibilidad;

    if (filtros.id_rango_salarial) params.id_rango_salarial = filtros.id_rango_salarial;

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
    const skip = Math.max(0, Number(pagina - 1) * Number(porPagina));
    const limit = Number(porPagina);

    params.skip = isNaN(skip) ? 0 : skip;
    params.limit = isNaN(limit) ? 10 : limit;



    const response = await axiosInstance.get("/candidatos/detalle-lista", { params });
    return response.data; // Contiene: { data: [...], total: X }
  } catch (error) {
    console.error("Error al obtener candidatos detallados:", error);
    return { data: [], total: 0 };
  }
};

// Detalle por ID (antes estaba en candidateResumenService)
export const obtenerCandidatoDetalle = async (id) => {
  const response = await axiosInstance.get(`/candidatos/${id}/detalle`);
  return response.data;
};
