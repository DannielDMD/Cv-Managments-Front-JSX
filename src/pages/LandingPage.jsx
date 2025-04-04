import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import HeaderLanding from "../components/HeaderLanding";
import { validarAcceso } from "../services/AuthService";

const LandingPage = () => {
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    navigate("/formulario", { state: { reset: true } });
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

      <header className="h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-4xl font-bold text-blue-900">Bienvenido a Joyco</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          Somos una empresa comprometida con el desarrollo de infraestructura y el talento humano.
        </p>

        <button
          onClick={handleClick}
          className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600"
        >
          Trabaja con Nosotros
        </button>
      </header>

      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-blue-900">¿Por qué unirte a Joyco?</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          En Joyco, valoramos el talento y la innovación. Únete a un equipo que impulsa el crecimiento profesional.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
