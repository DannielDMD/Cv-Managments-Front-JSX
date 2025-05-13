// components/ModalPolitica.jsx
const ModalPolitica = ({ onAceptar, onCancelar }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-lg p-6 text-left">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Política de Tratamiento de Datos</h2>
          <p className="text-sm text-gray-600 overflow-y-auto max-h-64">
            En Joyco S.A.S. BIC tratamos tu información con responsabilidad, en cumplimiento de la Ley 1581 de 2012.
            Recopilamos tus datos exclusivamente para fines laborales y de contacto durante el proceso de selección.
            Puedes ejercer tus derechos de acceso, rectificación o eliminación según lo establece la normativa.
            <br />
            <br />
            Para más información consulta la política completa en:{" "}
            <a
              href="https://www.joyco.co/tratamiento-de-datos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              joyco.co/tratamiento-de-datos
            </a>
          </p>
  
          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={onCancelar}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              No acepto
            </button>
            <button
              onClick={onAceptar}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Acepto y continuar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalPolitica;
  