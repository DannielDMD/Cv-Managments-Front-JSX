import { createContext, useState } from "react";

// Crear el contexto
const FormContext = createContext();

// Proveedor del contexto
export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
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
            nombre_referido: " ",
            id_ciudad: "",
            id_cargo: "",
            id_candidato: null, // 🔹 Agregar id_candidato en el estado global

        },
        educationInfo: {
            id_candidato: "",
            id_nivel_educacion: "",
            id_titulo: "",
            id_institucion: "",
            anio_graduacion: "",
            id_nivel_ingles: "",
        },
        experienceInfo: {
            id_candidato: "",
            id_rango_experiencia: "",
            ultima_empresa: "",
            ultimo_cargo: "",
            funciones: [],
            fecha_inicio: "",
            fecha_fin: "",
        },
        skillsInfo: {
            id_candidato: "",
            id_habilidad_blanda: [], // Ahora es un array
            id_categoria_habilidad: "",
            id_habilidad_tecnica: [], // Ahora es un array
            id_categoria_herramienta: "",
            id_herramienta: [], // Ahora es un array
        },
        preferences: {
            disponibilidadViajar: "",
            disponibilidadTrabajar: "",
            pretensionSalarial: "",
            situacionLaboral: "",
            motivoRetiro: "",
            razonJoyco: "",
        },
    });

    const updateFormData = (name, value) => {
        setFormData((prev) => ({
          ...prev,
          [name]: value, // Asegura que guardamos solo el valor, no el objeto completo
        }));
      };
      

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export default FormContext;
