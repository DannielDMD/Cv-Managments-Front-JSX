import { useState } from "react";
import { Eye } from "lucide-react";
import { actualizarEstadoCandidato } from "../../services/DashboardServices/candidateResumenService";
import { toast } from "react-toastify";

const estados = ["EN_PROCESO", "ENTREVISTA", "ADMITIDO", "DESCARTADO", "CONTRATADO"];

const CandidateTable = ({
  data,
  total,
  paginaActual,
  porPagina,
  setPaginaActual,
  recargarCandidatos, // ✅ nueva prop recibida
}) => {
  const totalPaginas = Math.ceil(total / porPagina);
  const [actualizandoId, setActualizandoId] = useState(null);

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      setActualizandoId(id);
      await actualizarEstadoCandidato(id, nuevoEstado);
      toast.success("Estado actualizado correctamente");

      // ✅ Recargamos la lista de candidatos después del cambio
      recargarCandidatos();
    } catch (error) {
      toast.error("Error al actualizar el estado");
      console.error(error);
    } finally {
      setActualizandoId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto shadow rounded-lg mb-4">
        <table className="min-w-full bg-white text-sm text-gray-800 border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Cargo</th>
              <th className="p-3">Título</th>
              <th className="p-3">Experiencia</th>
              <th className="p-3">Herramientas</th>
              <th className="p-3">Disponibilidad</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Postulación</th>
              <th className="p-3">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {data.map((candidato) => (
              <tr key={candidato.id_candidato} className="border-t hover:bg-gray-50">
                <td className="p-3">{candidato.nombre_completo}</td>
                <td className="p-3">{candidato.correo_electronico}</td>
                <td className="p-3">{candidato.telefono}</td>
                <td className="p-3">{candidato.cargo_ofrecido}</td>
                <td className="p-3">{candidato.titulo_obtenido || "—"}</td>
                <td className="p-3">{candidato.rango_experiencia || "—"}</td>
                <td className="p-3">{candidato.herramientas.join(", ")}</td>
                <td className="p-3">{candidato.disponibilidad_inicio || "—"}</td>
                <td className="p-3">
                  <select
                    value={candidato.estado}
                    onChange={(e) => handleEstadoChange(candidato.id_candidato, e.target.value)}
                    disabled={actualizandoId === candidato.id_candidato}
                    className="bg-transparent border border-gray-300 rounded px-2 py-1 text-xs"
                  >
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  {new Date(candidato.fecha_postulacion).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-700">
        <p>Mostrando {data.length} de {total} candidatos</p>
        <div className="space-x-2">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅ Anterior
          </button>
          <span className="font-semibold">Página {paginaActual} de {totalPaginas}</span>
          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente ➡
          </button>
        </div>
      </div>
    </>
  );
};

export default CandidateTable;
