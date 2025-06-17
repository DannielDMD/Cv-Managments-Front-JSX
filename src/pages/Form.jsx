import { useEffect, useState, useRef } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useFormContext from "../context/useFormContext";
//Componentes
import FormStepper from "../components/form/FormStepper";
import Header from "../components/form/Header";
import DecoracionFormulario from "../components/form/DecoracionFormulario";
import Footer from "../components/Footer";
//Servicios
import { postEducation } from "../services/form-services/educationService";
import { postExperiencia } from "../services/form-services/experienceService";
import { postConocimientos } from "../services/form-services/skillService";
import { postPreferencias } from "../services/form-services/preferencesService";
import { marcarFormularioCompleto } from "../services/form-services/candidateService";
//Utilitarios
import { mostrarErroresBackend } from "../utils/mostrarErroresBackend"; 


const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

  const [mostrarAdvertenciaInicial, setMostrarAdvertenciaInicial] = useState(false);
  const yaMostroAdvertencia = useRef(false);

  const { formData, resetFormData, updateFormData } = useFormContext();


  useEffect(() => {
    if (!formData.acepta_politica_datos) {
      navigate("/", { replace: true });
      return;
    }

    if (!yaMostroAdvertencia.current) {
      setMostrarAdvertenciaInicial(true);
      yaMostroAdvertencia.current = true;
    }

    if (location?.state?.reset) {
      resetFormData();
      navigate(location.pathname, { replace: true });
    }
  }, [formData.acepta_politica_datos, location, resetFormData, navigate]);


  const handleSubmit = async () => {
    const id = formData.id_candidato;
    console.log("ID del candidato antes de enviar todo:", id);

    if (!id) {
      toast.info("No se ha registrado aún el candidato.");

      return;
    }

    try {
      // EDUCACIÓN
      const education = {
        id_candidato: id,
        id_nivel_educacion: formData.educationInfo.id_nivel_educacion
          ? parseInt(formData.educationInfo.id_nivel_educacion)
          : undefined,
        id_titulo: formData.educationInfo.id_titulo
          ? parseInt(formData.educationInfo.id_titulo)
          : undefined,
        anio_graduacion: formData.educationInfo.anio_graduacion || undefined,
        id_institucion: formData.educationInfo.id_institucion
          ? parseInt(formData.educationInfo.id_institucion)
          : undefined,
        id_nivel_ingles: formData.educationInfo.id_nivel_ingles
          ? parseInt(formData.educationInfo.id_nivel_ingles)
          : undefined,

        // Campos nuevos para 'Otro'
        nombre_titulo_otro: formData.educationInfo.nombre_titulo_otro || null,
        nombre_institucion_otro: formData.educationInfo.nombre_institucion_otro || null,
      };




      //Post de educación 
      await postEducation(education); // Primer breackpoint de paro

      // EXPERIENCIA
      const experience = {
        ...formData.experienceInfo,
        id_candidato: id,
        id_rango_experiencia: parseInt(formData.experienceInfo.id_rango_experiencia) || null,
      };

      await postExperiencia(experience); // Segundo BreackPoint

      // CONOCIMIENTOS
      const skillsPayload = [];

      (formData.skillsInfo.id_habilidad_blanda || []).forEach((id_habilidad_blanda) => {
        if (id_habilidad_blanda) {
          skillsPayload.push({
            id_candidato: id,
            tipo_conocimiento: "blanda",
            id_habilidad_blanda,
          });
        }
      });

      (formData.skillsInfo.id_habilidad_tecnica || []).forEach((id_habilidad_tecnica) => {
        if (id_habilidad_tecnica) {
          skillsPayload.push({
            id_candidato: id,
            tipo_conocimiento: "tecnica",
            id_habilidad_tecnica,
          });
        }
      });

      (formData.skillsInfo.id_herramienta || []).forEach((id_herramienta) => {
        if (id_herramienta) {
          skillsPayload.push({
            id_candidato: id,
            tipo_conocimiento: "herramienta",
            id_herramienta,
          });
        }
      });

      if (skillsPayload.length > 0) {
        await postConocimientos(skillsPayload); // Si falla, se detiene aquí
      }

      // PREFERENCIAS
      const preferences = {
        id_candidato: id,
        disponibilidad_viajar: formData.preferencesInfo.disponibilidad_viajar === "SI",
        id_disponibilidad_inicio: parseInt(formData.preferencesInfo.id_disponibilidad) || null, // 👈 CORREGIDO
        id_rango_salarial: parseInt(formData.preferencesInfo.id_rango_salarial) || null,
        trabaja_actualmente: formData.preferencesInfo.trabaja_actualmente === "SI",
        id_motivo_salida: formData.preferencesInfo.id_motivo_salida
          ? parseInt(formData.preferencesInfo.id_motivo_salida)
          : null,
        razon_trabajar_joyco: formData.preferencesInfo.razon_trabajar_joyco || null,
        otro_motivo_salida: formData.preferencesInfo.otro_motivo_salida || null,

      };

      console.log(preferences)
      await postPreferencias(preferences); // Si falla, se detiene aquí


      // ✅ Marca que se completó en backend
      await marcarFormularioCompleto(id); // << aquí


      toast.success("✅ Todos los datos fueron enviados correctamente.");

      // ✅ Marca que se completó
      updateFormData("formulario_completo", true);

      // ✅ Limpia localStorage y contexto
      localStorage.removeItem("formData");
      resetFormData();

      // ✅ Redirige al inicio
      navigate("/", { state: { success: true } });




    } catch (error) {
      mostrarErroresBackend(error);
    }
  };

  return (
    <>
      {/* Fondo decorativo */}

      <div className="relative min-h-screen bg-gray-100 pt-20 pb-40 flex flex-col items-center overflow-hidden">
        <DecoracionFormulario tipo="principal" />


        <Header />
        <div className="relative z-10 bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">



          <FormStepper setIsFinalStep={setIsFinalStep} />
          <div className="flex justify-end mt-6">
            <button
              className={`px-4 py-2 rounded-lg shadow-md transition ${isFinalStep
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              disabled={!isFinalStep}
              onClick={() => setMostrarModalConfirmacion(true)}
            >
              Guardar y Continuar
            </button>
          </div>
        </div>

        {mostrarModalConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                ¿Está seguro de enviar esta información?
              </h3>
              <p className="text-gray-600 mb-6">
                Una vez enviada, no podrá modificar los datos. Por favor revise que todo esté correcto.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setMostrarModalConfirmacion(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setMostrarModalConfirmacion(false);
                    handleSubmit();
                  }}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {mostrarAdvertenciaInicial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Información importante antes de continuar
              </h3>
              <p className="text-gray-600 mb-6">
                Si ya te registraste anteriormente y deseas modificar tu información, debes solicitar la eliminación de tus datos para volver a registrarte. Puedes hacerlo desde la Landing Page, el formulario o el botón de ayuda.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setMostrarAdvertenciaInicial(false)}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Footer FUERA del div centrado */}
      <Footer />
    </>
  );

};

export default Form;
