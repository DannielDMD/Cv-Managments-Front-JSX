import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full bg-[#24396D] text-white py-4 shadow-md z-50 flex justify-between items-center px-6">
      {/* Título centrado */}
      <h1 className="text-2xl font-bold flex-1 text-center">Formulario de Postulación</h1>

      {/* Botón de Volver al Inicio alineado a la izquierda */}
      <button 
        className="px-4 py-2 bg-white text-blue-900 rounded-lg shadow-md hover:bg-gray-200 transition"
        onClick={() => navigate("/")}
      >
        Volver al Inicio
      </button>
    </header>
  );
};

export default Header;
