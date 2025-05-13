// FormContext.js
import { createContext, useState, useEffect } from "react";

const FormContext = createContext();

const INITIAL_STATE = {
  acepta_politica_datos: false,
  id_candidato: null,
  personalInfo: {
    nombre_completo: "",
    correo_electronico: "",
    cc: "",
    fecha_nacimiento: "",
    telefono: "",
    descripcion_perfil: "",
    trabaja_actualmente_joyco: false,
    ha_trabajado_joyco: false,
    id_motivo_salida: null,
    tiene_referido: false,
    nombre_referido: "",
    id_ciudad: "",
    id_cargo: "",
    id_candidato: null,
  },
  educationInfo: {
    id_candidato: null,
    id_nivel_educacion: "",
    id_titulo: "",
    id_institucion: "",
    anio_graduacion: "",
    id_nivel_ingles: "",
  },
  experienceInfo: {
    id_candidato: null,
    id_rango_experiencia: "",
    ultima_empresa: "",
    ultimo_cargo: "",
    funciones: [],
    fecha_inicio: "",
    fecha_fin: "",
  },
  skillsInfo: {
    id_candidato: null,
    tipo_conocimiento: "",
    id_habilidad_blanda: [],
    id_habilidad_tecnica: [],
    id_herramienta: [],
  },
  preferencesInfo: {
    id_candidato: null,
    disponibilidad_viajar: false,
    id_disponibilidad: "",
    id_rango_salarial: "",
    trabaja_actualmente: false,
    id_motivo_salida: null,
    razon_trabajar_joyco: "",
  },
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : INITIAL_STATE;
  });

  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...(typeof field === "string" ? { [field]: value } : field),
      },
    }));
  };

  const updateRootFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setIdCandidatoEnTodo = (id) => {
    setFormData((prev) => ({
      ...prev,
      id_candidato: id,
      personalInfo: { ...prev.personalInfo, id_candidato: id },
      educationInfo: { ...prev.educationInfo, id_candidato: id },
      experienceInfo: { ...prev.experienceInfo, id_candidato: id },
      skillsInfo: { ...prev.skillsInfo, id_candidato: id },
      preferencesInfo: { ...prev.preferencesInfo, id_candidato: id },
    }));
  };

  const resetFormData = () => {
    localStorage.removeItem("formData");
    setFormData({ ...INITIAL_STATE });
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        updateRootFormData,
        setIdCandidatoEnTodo,
        resetFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
