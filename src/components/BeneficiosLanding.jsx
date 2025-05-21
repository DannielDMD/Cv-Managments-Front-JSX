// src/components/BeneficiosLanding.jsx

import { FiBookOpen, FiHeart, FiTrendingUp } from "react-icons/fi";

const BeneficiosLanding = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto text-center">
      <div>
        <FiBookOpen className="mx-auto text-blue-700" size={64} />
        <h4 className="text-xl font-semibold mt-4 text-blue-900">Formación continua</h4>
        <p className="text-gray-600 text-sm mt-2">Capacitaciones, entrenamientos y actualización constante.</p>
      </div>
      <div>
        <FiHeart className="mx-auto text-blue-700" size={64} />
        <h4 className="text-xl font-semibold mt-4 text-blue-900">Bienestar laboral</h4>
        <p className="text-gray-600 text-sm mt-2">Salud física, mental, cultura y deporte.</p>
      </div>
      <div>
        <FiTrendingUp className="mx-auto text-blue-700" size={64} />
        <h4 className="text-xl font-semibold mt-4 text-blue-900">Oportunidades reales</h4>
        <p className="text-gray-600 text-sm mt-2">Proyectos de impacto que transforman realidades.</p>
      </div>
    </div>
  );
};

export default BeneficiosLanding;
