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
                nombre_referido: "",
                id_ciudad: "",
                id_cargo: "",
                id_candidato: null, // 🔹 Inicia en null
            },
            educationInfo: {
                id_candidato: null, // 🔹 Evitar valores en blanco
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
