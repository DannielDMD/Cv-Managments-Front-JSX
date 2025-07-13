import { axiosInstance } from "../../../utils/api";
export const eliminarCandidatosPorLote = async (idsCandidatos) => {
  try {
    console.log("Enviando para eliminar:", idsCandidatos);

    const response = await axiosInstance.post("/candidatos/eliminar-lote", {
      ids_candidatos: idsCandidatos,
    });

    return response.data;
  } catch (error) {
    console.error("Error al eliminar candidatos:", error);
    throw error;
  }
};
