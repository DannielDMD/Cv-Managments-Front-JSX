import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderTH = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.info("Sesión cerrada (simulada)");
    navigate("/"); // Redirige al landing
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#24396D] text-white py-4 px-6 shadow-md z-50 flex justify-between items-center">
      <h1 className="text-xl font-bold">🎯 Dashboard Talento Humano</h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 hover:text-gray-300 transition"
      >
        <FaSignOutAlt size={20} />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </button>
    </header>
  );
};

export default HeaderTH;
