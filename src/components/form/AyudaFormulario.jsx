import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const AyudaFormulario = ({ titulo, contenido }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {/* Ícono flotante */}
      <div
        className="absolute top-0 right-0 text-blue-700 hover:text-blue-900 cursor-pointer"
        onClick={() => setVisible(true)}
      >
        <AiOutlineQuestionCircle size={24} />
      </div>

      {/* Modal flotante */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{titulo}</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{contenido}</p>
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setVisible(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AyudaFormulario;
