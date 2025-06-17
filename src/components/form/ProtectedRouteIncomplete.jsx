import { Navigate } from "react-router-dom";
import useFormContext from "../../context/useFormContext";

const ProtectedRouteIncomplete = ({ children }) => {
  const { formData } = useFormContext();
  console.log("🚨 ProtectedRouteIncomplete", {
    id_candidato: formData.id_candidato,
    formulario_completo: formData.formulario_completo
  });
  
  // Si hay un candidato creado pero aún no ha terminado el formulario
  const estaIncompleto = formData.id_candidato && !formData.formulario_completo;

  return estaIncompleto ? <Navigate to="/formulario" replace /> : children;
  
};

export default ProtectedRouteIncomplete;
