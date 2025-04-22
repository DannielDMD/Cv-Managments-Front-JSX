import { createContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { validarAcceso } from "../services/AuthService";

const AuthContext = createContext();

const TIEMPO_MAX_INACTIVIDAD_MS = 15 * 60 * 1000; // 15 minutos
const TIEMPO_ADVERTENCIA_MS = TIEMPO_MAX_INACTIVIDAD_MS - 60 * 1000; // mostrar modal al minuto 14

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const verificarUsuario = async () => {
      const logoutIntencional = sessionStorage.getItem("logout_intencional") === "true";
  
      if (logoutIntencional) {
        console.log("⛔ Validación omitida tras logout.");
        sessionStorage.removeItem("logout_intencional");
        return; // 🚫 Salimos sin validar
      }
  
      if (accounts.length > 0 && accounts[0]?.username) {
        const correo = accounts[0].username;
        try {
          const acceso = await validarAcceso(correo);
          if (acceso.autorizado) {
            setUser({ correo, rol: acceso.rol });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.warn("Error al validar acceso:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
  
    verificarUsuario();
  }, [accounts]);
  
  

  useEffect(() => {
    let timeoutLogout;
    let timeoutAdvertencia;

    const cerrarSesionPorInactividad = () => {
      setUser(null);
      sessionStorage.setItem("logout_intencional", "true");
      instance.logoutRedirect();
    };

    const mostrarAdvertencia = () => {
      setMostrarModal(true);
    };

    const resetInactividad = () => {
      clearTimeout(timeoutLogout);
      clearTimeout(timeoutAdvertencia);
      setMostrarModal(false);

      timeoutAdvertencia = setTimeout(mostrarAdvertencia, TIEMPO_ADVERTENCIA_MS);
      timeoutLogout = setTimeout(cerrarSesionPorInactividad, TIEMPO_MAX_INACTIVIDAD_MS);
    };

    const eventos = ["mousemove", "keydown", "click", "scroll"];
    eventos.forEach((evento) => window.addEventListener(evento, resetInactividad));
    resetInactividad();

    return () => {
      eventos.forEach((evento) => window.removeEventListener(evento, resetInactividad));
      clearTimeout(timeoutLogout);
      clearTimeout(timeoutAdvertencia);
    };
  }, [instance]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-2 text-red-600">¿Sigues ahí?</h2>
            <p className="text-gray-700 mb-4">
              Por seguridad, tu sesión se cerrará en 1 minuto por inactividad.
            </p>
            <button
              onClick={() => {
                setMostrarModal(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sí, sigo aquí
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
