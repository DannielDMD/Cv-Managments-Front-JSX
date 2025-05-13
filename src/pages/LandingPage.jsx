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

      <main className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">¿Te gustaría trabajar con nosotros?</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          En Joyco valoramos el talento, la innovación y las personas que hacen país.
        </p>

        <button
          onClick={handleClick}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex items-center gap-3"
        >
          <FiSend size={20} />
          Postúlate aquí
        </button>
      </main>

      {mostrarModal && (
        <ModalPolitica onAceptar={aceptarPolitica} onCancelar={rechazarPolitica} />
      )}

      <section className="py-1 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-blue-900">¿Por qué unirte a Joyco?</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Somos una empresa comprometida con el desarrollo de infraestructura y el crecimiento profesional.
          Aquí encontrarás un equipo humano que impulsa tu carrera.
        </p>
      </section>

      <ValoresCorporativos />
      <Footer />
    </div>
  );
};

export default LandingPage;
