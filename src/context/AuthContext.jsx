import { createContext, useState, useEffect } from "react";
import { validarAcceso } from "../services/AuthService";
import { useMsal } from "@azure/msal-react";

const AuthContext = createContext(); // 👈 ya no exportamos directamente

export const AuthProvider = ({ children }) => {
  const { accounts } = useMsal();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verificarUsuario = async () => {
      if (accounts.length > 0) {
        const correo = accounts[0].username;
        const acceso = await validarAcceso(correo);
        if (acceso.autorizado) {
          setUser({ correo, rol: acceso.rol });
        } else {
          setUser(null);
        }
      }
    };

    verificarUsuario();
  }, [accounts]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // 👈 default export solo si lo necesitas internamente
