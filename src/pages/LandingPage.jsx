import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import HeaderLanding from "../components/HeaderLanding";
import { validarAcceso } from "../services/AuthService";
import { FiSend } from "react-icons/fi";
import Footer from "../components/Footer";
import ValoresCorporativos from "../components/ValoresCorporativos";
import useFormContext from "../context/UseFormContext";
import ModalPolitica from "../components/ModalPolitica"; // ✅ nuevo import
import CarruselLanding from "../components/CarruselLanding";
import { FiBookOpen, FiHeart, FiTrendingUp } from "react-icons/fi"



const LandingPage = () => {
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { updateRootFormData } = useFormContext();

  useEffect(() => {
    const verificarAutorizacion = async () => {
      const email = accounts[0]?.username?.toLowerCase();

      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const resultado = await validarAcceso(email);
        if (resultado?.autorizado) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.warn("Fallo al validar acceso:", error.message);
      } finally {
        setLoading(false);
      }
    };

    verificarAutorizacion();
  }, [accounts, navigate]);

  const handleClick = () => {
    setMostrarModal(true);
  };

  const aceptarPolitica = async () => {
    updateRootFormData("acepta_politica_datos", true);

    // Espera un breve tiempo para que se actualice el estado y localStorage
    setTimeout(() => {
      navigate("/formulario");
    }, 50);
  };



  const rechazarPolitica = () => {
    setMostrarModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-900">
        <p className="text-lg font-semibold animate-pulse">Validando acceso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <HeaderLanding />

      {/* Sección título fuera del main */}
      <section className="text-center px-4 pt-36 pb-8">

        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          ¿Te gustaría trabajar con nosotros?
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          En Joyco apostamos por el crecimiento profesional, el bienestar de nuestro talento humano y la construcción de país.
          Únete a un equipo con propósito, experiencia y proyección.
        </p>
      </section>


      {/* Sección principal con carrusel y botón */}
      <main className="flex flex-col items-center text-center px-4 gap-8">
        <div className="w-full max-w-4xl">
          <CarruselLanding />
        </div>

        <button
          onClick={handleClick}
          className="mt-4 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-3"
        >
          <FiSend size={20} />
          Postúlate aquí
        </button>
      </main>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto text-center">
        <div>
          <FiBookOpen className="mx-auto text-blue-700" size={64} />
          <h4 className="text-xl font-semibold mt-4 text-blue-900">Formación continua</h4>
          <p className="text-gray-600 text-sm mt-2">
            Capacitaciones, entrenamientos y actualización constante.
          </p>
        </div>

        <div>
          <FiHeart className="mx-auto text-blue-700" size={64} />
          <h4 className="text-xl font-semibold mt-4 text-blue-900">Bienestar laboral</h4>
          <p className="text-gray-600 text-sm mt-2">
            Programas de salud física y mental, actividades culturales y deportivas.
          </p>
        </div>

        <div>
          <FiTrendingUp className="mx-auto text-blue-700" size={64} />
          <h4 className="text-xl font-semibold mt-4 text-blue-900">Oportunidades reales</h4>
          <p className="text-gray-600 text-sm mt-2">
            Proyectos de impacto donde tu trabajo sí transforma realidades.
          </p>
        </div>
      </div>
      <div className="mt-12 bg-gray-800 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-lg shadow">
        <p className="text-sm font-medium">
          ⚠️ Nota importante: en Joyco nunca solicitamos dinero en nuestros procesos de selección.
        </p>
        <a
          href="https://www.joyco.co/comunicado-a-la-opinion-publica/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 md:mt-0 bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Ver comunicado
        </a>
      </div>


      <div className="mt-12 mb-16 bg-gray-100 border-l-4 border-blue-700 text-gray-800 px-6 py-5 max-w-5xl mx-auto rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">¿Ya te postulaste anteriormente?</h3>
        <p className="text-sm">
          Si ya has registrado tus datos y deseas volver a postularte, debes solicitar la eliminación o actualización de tu información.
          Esto garantiza el cumplimiento de las políticas de tratamiento de datos y evita conflictos con registros previos.
        </p>
        <div className="mt-4">
          <a
            href="/solicitud-eliminacion"
            className="inline-block bg-blue-700 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Solicitar actualización o eliminación de datos
          </a>
        </div>
      </div>



      {mostrarModal && (
        <ModalPolitica onAceptar={aceptarPolitica} onCancelar={rechazarPolitica} />
      )}

      <section className="py-16 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-semibold text-blue-900 mb-6">¿Por qué unirte a Joyco?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Más allá de construir infraestructura, en Joyco construimos confianza. Somos una empresa que evoluciona junto a las necesidades del país, integrando innovación, excelencia técnica y compromiso con las comunidades.
        </p>

        {/* Estadísticas destacadas */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto text-blue-900">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">+20.000 km</span>
            <p className="mt-2 text-sm">de vías construidas o intervenidas</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">+400</span>
            <p className="mt-2 text-sm">puentes entregados a nivel nacional</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">+300</span>
            <p className="mt-2 text-sm">proyectos ejecutados en múltiples regiones</p>
          </div>
        </div>

        {/* Frase institucional */}
        <blockquote className="mt-12 italic text-blue-800 text-md max-w-2xl mx-auto border-l-4 border-blue-700 pl-4">
          “Brindamos soluciones personalizadas que transforman el entorno y mejoran la calidad de vida.”
        </blockquote>
      </section>


      <ValoresCorporativos />
      <Footer />
    </div>
  );
};

export default LandingPage;
