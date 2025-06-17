import { axiosInstance } from "../../../utils/api";

const BASE_URL = "/usuarios";

// ✅ Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await axiosInstance.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};

// ✅ Obtener usuario por ID
export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// ✅ Crear nuevo usuario
export const crearUsuario = async (data) => {
  try {
    const response = await axiosInstance.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// ✅ Actualizar usuario
export const actualizarUsuario = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// ✅ Eliminar usuario
export const eliminarUsuario = async (id) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
