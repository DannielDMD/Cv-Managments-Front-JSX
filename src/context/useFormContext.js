import { useContext } from "react";
import FormContext from "./FormContext";

// Hook personalizado para acceder al contexto
const useFormContext = () => {
    return useContext(FormContext);
};

export default useFormContext;
