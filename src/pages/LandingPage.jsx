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

// ✅ Nuevos componentes importados
import BeneficiosLanding from "../components/BeneficiosLanding";
import NotaImportante from "../components/NotaImportante";
import SeccionReingreso from "../components/SeccionReingreso";


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

      {/* Secciones modularizadas */}
      <BeneficiosLanding />
      <NotaImportante />
      <SeccionReingreso />



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
