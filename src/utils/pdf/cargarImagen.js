// src/utils/pdf/cargarImagen.js
export const cargarImagenBase64 = async (url) => {
  const respuesta = await fetch(url);
  const blob = await respuesta.blob();

  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onloadend = () => resolve(lector.result);
    lector.onerror = reject;
    lector.readAsDataURL(blob);
  });
};
