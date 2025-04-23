export const validarCamposEducacion = (educationData) => {
    const nuevosErrores = {};
    const año = educationData.anio_graduacion;
    const nivelesSinTitulo = new Set([1, 2, 3]);
    const añoActual = new Date().getFullYear();
    const nivel = educationData.id_nivel_educacion;
  
    if (!nivel) {
      nuevosErrores .id_nivel_educacion = "Debes seleccionar un nivel educativo.";
    }
  
    // ✅ Validar inglés (obligatorio siempre)
    if (!educationData.id_nivel_ingles) {
      nuevosErrores.id_nivel_ingles = "Debes seleccionar un nivel de inglés.";
    }
  
    // Si el nivel requiere título
    if (!nivelesSinTitulo.has(nivel)) {
      if (!educationData.id_titulo) {
        nuevosErrores.id_titulo = "Debes seleccionar un título.";
      }
  
      if (!educationData.id_institucion) {
        nuevosErrores.id_institucion = "Debes seleccionar una institución.";
      }
  
      if (!año || !/^\d{4}$/.test(año)) {
        nuevosErrores.anio_graduacion = "Debe ser un año de 4 dígitos.";
      } else if (año < 1930) {
        nuevosErrores.anio_graduacion = "No puede ser menor a 1930.";
      } else if (año > añoActual) {
        nuevosErrores.anio_graduacion = `No puede ser mayor a ${añoActual}.`;
      }
    }
  
    return {
      esValido: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    };
  };
  