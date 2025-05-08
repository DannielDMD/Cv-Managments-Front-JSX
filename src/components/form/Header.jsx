import { useNavigate } from "react-router-dom";
import useFormContext from "../../context/UseFormContext";


const Header = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0033A0] text-white py-4 shadow-md z-50 flex justify-between items-center px-6">
      {/* Título centrado */}
      <h1 className="text-2xl font-bold flex-1 text-center">Formulario de Postulación</h1>

      {/* Botón de Volver al Inicio alineado a la izquierda */}
      <button
        className={`px-4 py-2 rounded-lg shadow-md transition ${formData.id_candidato
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-900 hover:bg-gray-200"
          }`}
        disabled={!!formData.id_candidato}
        onClick={() => navigate("/")}
      >
        Volver al Inicio
      </button>

    </header>
  );
};

export default Header;
