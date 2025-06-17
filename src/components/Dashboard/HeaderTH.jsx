import AuthButton from "../auth/AuthButton";
import joycoLogo from "../../assets/joyco-logo.png"; // Asegúrate que la imagen esté ahí

const HeaderTH = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0033A0] text-white py-5 px-8 shadow-md z-50 flex justify-between items-center h-24">
      {/* Logo + título */}
      <div className="flex items-center gap-6">
        <img
          src={joycoLogo}
          alt="Logo Joyco"
          className="h-20 w-auto object-contain"
        />
        <h1 className="text-3xl font-extrabold tracking-wide">
          Dashboard Talento Humano
        </h1>
      </div>

      {/* Botón de sesión */}
      <AuthButton mode="dashboard" />
    </header>
  );
};

export default HeaderTH;
