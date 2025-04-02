
import { FaUserCircle, FaMoon, FaGlobe } from "react-icons/fa";
import { toast } from "react-toastify";
const HeaderLanding = () => {


  return (
    <header className="fixed top-0 left-0 w-full bg-[#24396D] text-white py-4 px-6 shadow-md z-50 flex justify-between items-center">
      {/* Enlace a la página principal de Joyco */}
      <a
        href="https://www.joyco.co/" // ← pon el dominio real aquí
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
            // Aquí luego puedes implementar modo oscuro real
            toast.info("Modo oscuro aún no implementado 👀")
          }}
          className="text-white hover:text-gray-300 transition"
        >
          <FaMoon size={20} />
        </button>

        <button
          className="text-white hover:text-gray-300 transition"
        >
          <FaUserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default HeaderLanding;
