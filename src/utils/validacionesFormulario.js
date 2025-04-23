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
  

  export const validarCamposExperiencia = (experienceData) => {
    const nuevosErrores = {};
    const hoy = new Date();
  
   // Nombre empresa
if (!experienceData.ultima_empresa?.trim()) {
    nuevosErrores.ultima_empresa = "El nombre de la empresa es obligatorio.";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,\-()]+$/.test(experienceData.ultima_empresa)) {
    nuevosErrores.ultima_empresa = "La empresa contiene caracteres no válidos.";
  } else if (experienceData.ultima_empresa.trim().length < 2 || experienceData.ultima_empresa.length > 150) {
    nuevosErrores.ultima_empresa = "La empresa debe tener entre 2 y 150 caracteres.";
  }
  
  // Último cargo
  if (!experienceData.ultimo_cargo?.trim()) {
    nuevosErrores.ultimo_cargo = "El cargo es obligatorio.";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,\-()]+$/.test(experienceData.ultimo_cargo)) {
    nuevosErrores.ultimo_cargo = "El cargo contiene caracteres no válidos.";
  } else if (experienceData.ultimo_cargo.trim().length < 2 || experienceData.ultimo_cargo.length > 100) {
    nuevosErrores.ultimo_cargo = "El cargo debe tener entre 2 y 100 caracteres.";
  }
  
  // Funciones (opcional, pero válida si está presente)
  if (experienceData.funciones?.trim()) {
    const len = experienceData.funciones.trim().length;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,\-():;!?¡¿"]+$/.test(experienceData.funciones)) {
      nuevosErrores.funciones = "Las funciones contienen caracteres inválidos.";
    } else if (len < 10 || len > 500) {
      nuevosErrores.funciones = "Las funciones deben tener entre 10 y 500 caracteres.";
    }
  }
  
    // Fechas
    const fechaInicio = experienceData.fecha_inicio ? new Date(experienceData.fecha_inicio) : null;
    const fechaFin = experienceData.fecha_fin ? new Date(experienceData.fecha_fin) : null;
  
    if (!fechaInicio) {
      nuevosErrores.fecha_inicio = "La fecha de inicio es obligatoria.";
    } else {
      if (fechaInicio > hoy) {
        nuevosErrores.fecha_inicio = "La fecha de inicio no puede ser futura.";
      } else if (fechaInicio.getFullYear() < 1970) {
        nuevosErrores.fecha_inicio = "La fecha de inicio no puede ser anterior a 1970.";
      }
    }
  
    if (fechaFin) {
      if (fechaFin > hoy) {
        nuevosErrores.fecha_fin = "La fecha de finalización no puede ser futura.";
      } else if (fechaInicio && fechaFin < fechaInicio) {
        nuevosErrores.fecha_fin = "La fecha de finalización no puede ser anterior a la de inicio.";
      }
    }
  
    return {
      esValido: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    };
  };
  
  export const validarCamposSkills = (skillsData) => {
    const nuevosErrores = {};
  
    if (!Array.isArray(skillsData.id_habilidad_blanda) || skillsData.id_habilidad_blanda.length === 0) {
      nuevosErrores.id_habilidad_blanda = "Selecciona al menos una habilidad blanda.";
    }
  
    if (!Array.isArray(skillsData.id_habilidad_tecnica) || skillsData.id_habilidad_tecnica.length === 0) {
      nuevosErrores.id_habilidad_tecnica = "Selecciona al menos una habilidad técnica.";
    }
  
    if (!Array.isArray(skillsData.id_herramienta) || skillsData.id_herramienta.length === 0) {
      nuevosErrores.id_herramienta = "Selecciona al menos una herramienta.";
    }
  
    return {
      esValido: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    };
  };
  
  export const validarCamposPreferencias = (preferencesData) => {
    const nuevosErrores = {};
  
    const razon = preferencesData.razon_trabajar_joyco?.trim() || "";
  
    if (!razon) {
      nuevosErrores.razon_trabajar_joyco = "Este campo es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,\-():;!?¡¿"]+$/.test(razon)) {
      nuevosErrores.razon_trabajar_joyco = "El texto contiene caracteres no válidos.";
    } else if (razon.length < 20) {
      nuevosErrores.razon_trabajar_joyco = "Debes escribir al menos 20 caracteres.";
    } else if (razon.length > 500) {
      nuevosErrores.razon_trabajar_joyco = "El texto no debe superar los 500 caracteres.";
    }
  
    return {
      esValido: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    };
  };
  