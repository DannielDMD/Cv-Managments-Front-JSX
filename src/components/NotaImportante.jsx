// src/components/NotaImportante.jsx
const NotaImportante = () => (
  <div className="mt-12 bg-gray-800 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-lg shadow">
    <p className="text-sm font-medium">
      ⚠️ Nota importante: en Joyco nunca solicitamos dinero en nuestros procesos de selección.
    </p>
    <a
      href="https://www.joyco.co/comunicado-a-la-opinion-publica/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 md:mt-0 bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
    >
      Ver comunicado
    </a>
  </div>
);

export default NotaImportante;
