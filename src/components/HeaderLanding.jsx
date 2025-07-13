//import { FaMoon, FaGlobe } from "react-icons/fa";
//import { toast } from "react-toastify";
import AuthButton from "./auth/AuthButton";
import joycoLogo from "../assets/joyco-logo.png"; // Asegúrate que la imagen esté ahí
const HeaderLanding = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0033A0] text-white py-4 px-6 shadow-md z-50 flex justify-between items-center">
      {/* Logo + enlace */}
      <div className="flex items-center gap-4">
        <a
          href="https://www.joyco.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition"
        >
          <img
            src={joycoLogo}
            alt="Logo Joyco"
            className="h-20 w-auto object-contain"
          />
        </a>
      </div>

      {/* Iconos a la derecha */}
      <div className="flex gap-4 items-center">
        <AuthButton mode="landing" />
      </div>
    </header>
  );
};

export default HeaderLanding;
