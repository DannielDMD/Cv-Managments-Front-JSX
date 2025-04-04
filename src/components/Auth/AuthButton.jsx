import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/authConfig";

const ALLOWED_USERS = ["innovacion@joyco.com.co"];

const AuthButton = ({ mode = "landing" }) => {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };
  

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  const email = accounts[0]?.username;
  const isAuthorized = ALLOWED_USERS.includes(email);

  if (accounts.length > 0 && mode === "dashboard" && isAuthorized) {
    return (
      <div className="flex flex-col items-end text-sm">
        <span className="mb-1">{email}</span>
        <button
          onClick={handleLogout}
          className="underline text-white hover:text-gray-300 transition"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="text-white hover:text-gray-300 transition underline"
    >
      Iniciar sesión con Microsoft
    </button>
  );
};

export default AuthButton;
