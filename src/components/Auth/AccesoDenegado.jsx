import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccesoDenegado = () => {
  const navigate = useNavigate();

  // Redireccionar automáticamente después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // 5 segundos

    return () => clearTimeout(timer); // Limpieza
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-white">
      <h1 className="text-3xl font-bold text-red-600 mb-4">⛔ Acceso Denegado</h1>
      <p className="text-gray-700 max-w-xl mb-6">
        Lo sentimos, no tienes permisos para acceder a esta sección.
        <br />
        Serás redirigido al inicio en unos segundos...
        <br />
        Si no ocurre automáticamente, puedes usar el botón de abajo.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Ir al inicio
      </button>
    </div>
  );
};

export default AccesoDenegado;
