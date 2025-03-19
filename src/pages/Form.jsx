import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormStepper from "../components/form/FormStepper";
import Header from "../components/form/Header"

const Form = () => {
  const navigate = useNavigate();
  const [isFinalStep, setIsFinalStep] = useState(false);

  const handleSubmit = () => {
    navigate("/", { state: { success: true } });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
      <Header /> {/* Mantiene el header fijo arriba */}

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        <FormStepper setIsFinalStep={setIsFinalStep} />

        <div className="flex justify-end mt-6">
          <button 
            className={`px-4 py-2 rounded-lg shadow-md transition ${
              isFinalStep ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`} 
            disabled={!isFinalStep}
            onClick={handleSubmit}
          >
            Guardar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
