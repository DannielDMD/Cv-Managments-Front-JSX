import { FaSignOutAlt } from "react-icons/fa";
import AuthButton from "../Auth/AuthButton";
// ajusta la ruta si es necesario

const HeaderTH = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#24396D] text-white py-4 px-6 shadow-md z-50 flex justify-between items-center">
      <h1 className="text-xl font-bold">🎯 Dashboard Talento Humano</h1>

      {/* Botón de cerrar sesión y correo del usuario */}
      <div className="flex items-center gap-4">
        <AuthButton mode="dashboard" />
      </div>
    </header>
  );
};

export default HeaderTH;
