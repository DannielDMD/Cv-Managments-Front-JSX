import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { FiLogIn, FiLogOut } from "react-icons/fi";
//Utilitarios
import { loginRequest } from "../../utils/authConfig";

const AuthButton = ({ mode = "landing" }) => {
  const { instance, accounts, inProgress } = useMsal();

  const handleLogin = () => {
    if (inProgress !== InteractionStatus.None) {
      console.warn("🛑 Login en progreso, evitando conflicto MSAL");
      return;
    }

    instance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    sessionStorage.setItem("logout_intencional", "true"); // 🧠 evitar validación post-logout
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  const email = accounts[0]?.username;

  if (accounts.length > 0 && mode === "dashboard") {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="hidden sm:inline">{email}</span>
        <button
          onClick={handleLogout}
          className="text-white hover:text-gray-300 transition p-2"
          title="Cerrar sesión"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="text-white hover:text-gray-300 transition p-2"
      title="Iniciar sesión"
    >
      <FiLogIn size={22} />
    </button>
  );
};

export default AuthButton;
