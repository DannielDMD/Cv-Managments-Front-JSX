import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { toast } from "react-toastify";
//Componentes
import AccesoDenegado from "./AccesoDenegado";
//Servicios
import { validarAcceso } from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const { accounts } = useMsal();
  const [autorizado, setAutorizado] = useState(null); // null = en validación

  useEffect(() => {
    const verificar = async () => {
      const email = accounts[0]?.username?.toLowerCase();

      if (!email) {
        toast.warning("Debes iniciar sesión para acceder.");
        setAutorizado(false);
        return;
      }

      const resultado = await validarAcceso(email);

      if (!resultado?.autorizado) {
        toast.error("No tienes permisos para acceder al dashboard.");
        setAutorizado(false);
      } else {
        setAutorizado(true);
      }
    };

    verificar();
  }, [accounts]);

  if (autorizado === null) {

    return (
      <div className="min-h-screen flex justify-center items-center text-blue-800 text-lg">
        Verificando acceso...
      </div>
    );
  }

  if (!autorizado) {
    return <AccesoDenegado />;
  }

  return children;
};

export default ProtectedRoute;
