import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useFormContext from "../../context/useFormContext";
//Páginas
import PersonalInfo from "../../pages/form-pages/PersonalInfo";
import EducationInfo from "../../pages/form-pages/EducationInfo";
import ExperienceInfo from "../../pages/form-pages/ExperienceInfo";
import SkillsInfo from "../../pages/form-pages/SkillsInfo";
import PreferencesInfo from "../../pages/form-pages/PreferencesInfo";

const steps = [
  "Información Personal",
  "Educación",
  "Experiencia Laboral",
  "Habilidades y Conocimientos",
  "Disponibilidad y Preferencias"
];
import { validarCamposEducacion } from "../../utils/validacionesFormulario";
import { validarCamposExperiencia } from "../../utils/validacionesFormulario";
import { validarCamposSkills } from "../../utils/validacionesFormulario";
import { validarCamposPreferencias } from "../../utils/validacionesFormulario";



const FormStepper = ({ setIsFinalStep }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const { formData } = useFormContext();

  useEffect(() => {
    if (formData.id_candidato) {
      setCanAdvance(true); // ✅ Solo cuando se haya creado el candidato
    }
  }, [formData.id_candidato]);

  const nextStep = () => {
    if (currentStep === 0 && !canAdvance) {
      toast.error("Debes registrar primero un candidato llenando La Información Personal")

      return;
    }

    // ✅ Validar campos de Educación si estás en el paso 1
    if (currentStep === 1) {
      const { esValido, errores } = validarCamposEducacion(formData.educationInfo);

      if (!esValido) {
        // Mostrar cada error en toast
        Object.entries(errores).forEach(([campo, mensaje]) => {
          toast.error(`❌ ${campo.replaceAll("_", " ")}: ${mensaje}`);
        });

        return;
      }
    }

    if (currentStep === 2) {
      const { esValido, errores } = validarCamposExperiencia(formData.experienceInfo);

      if (!esValido) {
        const etiquetas = {
          ultima_empresa: "Empresa",
          ultimo_cargo: "Último Cargo",
          funciones: "Funciones",
          fecha_inicio: "Fecha de Inicio",
          fecha_fin: "Fecha de Finalización",
        };

        const camposConError = Object.entries(errores);

        if (camposConError.length === 0) {
          toast.error("Debes completar los campos obligatorios antes de continuar.");
        } else {
          camposConError.forEach(([campo, mensaje]) => {
            const nombreCampo = etiquetas[campo] || campo;
            toast.error(`❌ ${nombreCampo}: ${mensaje}`);
          });
        }

        return;
      }
    }
    if (currentStep === 3) {
      const { esValido, errores } = validarCamposSkills(formData.skillsInfo);

      if (!esValido) {
        const etiquetas = {
          id_habilidad_blanda: "Habilidades Blandas",
          id_habilidad_tecnica: "Habilidades Técnicas",
          id_herramienta: "Herramientas",
        };

        Object.entries(errores).forEach(([campo, mensaje]) => {
          const nombreCampo = etiquetas[campo] || campo;
          toast.error(`❌ ${nombreCampo}: ${mensaje}`);
        });

        return;
      }
    }

    if (currentStep === 4) {
      const { esValido, errores } = validarCamposPreferencias(formData.preferencesInfo);

      if (!esValido) {
        const etiquetas = {
          razon_trabajar_joyco: "Razón para trabajar en Joyco",
        };

        Object.entries(errores).forEach(([campo, mensaje]) => {
          const nombreCampo = etiquetas[campo] || campo;
          toast.error(`❌ ${nombreCampo}: ${mensaje}`);
        });

        return;
      }
    }




    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }

    if (currentStep + 1 === steps.length - 1) {
      setIsFinalStep(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1 || (currentStep === 1 && !formData.id_candidato)) {
      setCurrentStep((prev) => prev - 1);
    }

    if (currentStep === steps.length - 1) {
      setIsFinalStep(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfo />;
      case 1: return <EducationInfo />;
      case 2: return <ExperienceInfo />;
      case 3: return <SkillsInfo />;
      case 4: return <PreferencesInfo />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Sección {currentStep + 1}: {steps[currentStep]}
      </h2>

      <div className="space-y-6">{renderStep()}</div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0 || (currentStep === 1 && formData.id_candidato)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default FormStepper;
