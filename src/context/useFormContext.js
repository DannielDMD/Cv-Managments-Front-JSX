import { useContext } from "react";
import FormContext from "./FormContext"; // Este debe apuntar al archivo correcto

const useFormContext = () => {
  return useContext(FormContext);
};

export default useFormContext;
