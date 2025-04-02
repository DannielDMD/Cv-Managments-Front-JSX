import { FaUserCircle, FaMoon, FaGlobe } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 👈 añadí esto

const HeaderLanding = () => {
  const navigate = useNavigate(); // 👈 hook para navegar

  return (
    <header className="fixed top-0 left-0 w-full bg-[#24396D] text-white py-4 px-6 shadow-md z-50 flex justify-between items-center">
      {/* Enlace a la página principal de Joyco */}
      <a
        href="https://www.joyco.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-gray-200 transition"
      >
        <FaGlobe />
        Visita nuestra página
      </a>

      {/* Iconos a la derecha */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => {
            toast.info("Modo oscuro aún no implementado 👀");
          }}
          className="text-white hover:text-gray-300 transition"
        >
          <FaMoon size={20} />
        </button>

        <button
          onClick={() => navigate("/dashboard")} // 👈 redirección aquí
          className="text-white hover:text-gray-300 transition"
        >
          <FaUserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default HeaderLanding;
