import { FiTrash2 } from "react-icons/fi";

const CandidatoResumenCards = ({ estadisticas, navigate }) => {
  if (!estadisticas) return null;

  const estados = ["EN_PROCESO", "ENTREVISTA", "ADMITIDO", "DESCARTADO", "CONTRATADO"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6 text-sm">
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="font-semibold text-gray-700">Total</p>
        <p className="text-xl font-bold text-indigo-600">{estadisticas.total}</p>
      </div>

      {estados.map((estado) => (
        <div key={estado} className="bg-white p-4 rounded shadow text-center">
          <p className="font-semibold text-gray-700">{estado.replace("_", " ")}</p>
          <p className="text-xl font-bold text-blue-600">{estadisticas[estado]}</p>
        </div>
      ))}

      <div
        onClick={() => navigate("/dashboard/solicitudes-eliminacion")}
        className="bg-red-50 p-4 rounded shadow text-center cursor-pointer hover:bg-red-100 transition"
      >
        <p className="font-semibold text-red-700 mb-2">Solicitudes pendientes</p>
        <FiTrash2 className="w-8 h-8 mx-auto text-red-600" />
      </div>
    </div>
  );
};

export default CandidatoResumenCards;
