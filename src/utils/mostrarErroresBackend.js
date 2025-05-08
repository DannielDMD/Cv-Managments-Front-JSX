import { toast } from "react-toastify";

export const mostrarErroresBackend = (error) => {
  if (error.response?.status === 422) {
    const detalle = error.response.data?.detail;

    if (Array.isArray(detalle)) {
      detalle.forEach((err) => {
        const campo = err.loc?.[1] || "desconocido";
        toast.error(`❌ ${campo}: ${err.msg}`);
      });
    } else if (typeof detalle === "string") {
      toast.error(`❌ ${detalle}`);
    } else {
      toast.error("❌ Error de validación: revisa los datos.");
    }
  } if (error.response?.status === 400) {
    toast.error(`❌ Error 400: ${error.response.data?.detail || "Revisa los campos enviados."}`);
  }
  else {
    toast.error("❌ Error inesperado al enviar.");
  }
  console.error("Error no controlado:", error);
  
};
