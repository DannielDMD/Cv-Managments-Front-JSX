import { useState } from "react";
import PersonalInfo from "../../pages/FormPages/PersonalInfo";
import Education from "./Education";
import WorkExperience from "./Experience";
import Skills from "./Skills";
import Preferences from "./Preferences";

const steps = [
  "Información Personal",
  "Educación",
  "Experiencia Laboral",
  "Habilidades y Conocimientos",
  "Disponibilidad y Preferencias"
];

const FormStepper = ({ setIsFinalStep }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }

    if (currentStep + 1 === steps.length - 1) {
      setIsFinalStep(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }

    if (currentStep === steps.length - 1) {
      setIsFinalStep(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfo />;
      case 1: return <Education />;
      case 2: return <WorkExperience />;
      case 3: return <Skills />;
      case 4: return <Preferences />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Paso {currentStep + 1}: {steps[currentStep]}
      </h2>

      <div className="space-y-6">{renderStep()}</div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default FormStepper;
