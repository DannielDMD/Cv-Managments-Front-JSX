import { axiosInstance } from "../../utils/api";

// Lista de candidatos detallados, paginados y filtrados
export const obtenerCandidatosDetallados = async (search = "", filtros = {}, pagina = 1, porPagina = 10) => {
  try {
    const params = { search };

    // Filtros uno por uno
    if (filtros.id_ciudad) params.id_ciudad = filtros.id_ciudad;
    if (filtros.id_cargo) params.id_cargo = filtros.id_cargo;
    if (filtros.estado) params.estado = filtros.estado;
    if (Array.isArray(filtros.herramientas) && filtros.herramientas.length > 0) {
      params.id_herramienta = filtros.herramientas[0];
    }
    if (filtros.trabaja_joyco !== null && filtros.trabaja_joyco !== undefined) {
      params.trabaja_joyco = filtros.trabaja_joyco;
    }
    if (filtros.ordenar_por_fecha) params.ordenar_por_fecha = filtros.ordenar_por_fecha;

    if (filtros.anio) params.anio = filtros.anio;
    if (filtros.mes) params.mes = filtros.mes;

    // Paginación
    const skip = Math.max(0, Number(pagina - 1) * Number(porPagina));
    const limit = Number(porPagina);

    params.skip = isNaN(skip) ? 0 : skip;
    params.limit = isNaN(limit) ? 10 : limit;

    console.log("📦 Parámetros enviados:", params);


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
