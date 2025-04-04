import { axiosInstance } from "../utils/api";

// ✅ Valida si el usuario está autorizado (correo registrado y activo)
export const validarAcceso = async (correo) => {
  try {
    const response = await axiosInstance.get(`/usuarios/autorizar/${correo}`);
    return response.data; // { autorizado: true, rol: 'TH' }
  } catch (error) {
    console.warn("Acceso denegado:", error.response?.data?.detail || error.message);
    return { autorizado: false };
  }
};
