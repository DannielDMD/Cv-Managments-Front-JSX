import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
//Servicios
import { actualizarEstadoCandidato } from "../../../services/dashboard-services/candidateResumenService";




const estados = ["EN_PROCESO", "ENTREVISTA", "ADMITIDO", "DESCARTADO", "CONTRATADO"];

const CandidateTable = ({
  data = [],
  total,
  paginaActual,
  porPagina,
  setPaginaActual,
  recargarCandidatos,
  filtros,
  search,
}) => {

  const totalPaginas = Math.ceil(total / porPagina);
  const [actualizandoId, setActualizandoId] = useState(null);
  const navigate = useNavigate();
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);






  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      setActualizandoId(id);
      await actualizarEstadoCandidato(id, nuevoEstado);
      toast.success("Estado actualizado correctamente");
      recargarCandidatos();
    } catch (error) {
      toast.error("Error al actualizar el estado");
      console.error(error);
    } finally {
      setActualizandoId(null);
    }
  };
  const [inputPagina, setInputPagina] = useState(paginaActual);

  useEffect(() => {
    setInputPagina(paginaActual);
  }, [paginaActual]);

  return (
    <>
      <div className="w-full overflow-x-auto shadow rounded-lg mb-4">
        <table className="min-w-[1000px] w-full bg-white text-sm text-gray-800 border border-gray-300 border-collapse">

          <thead className="bg-[#0033A0] text-white text-left border-b-2 border-blue-800">

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
              <th className="p-3">Eliminar</th>

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
                <td className="p-3">{Array.isArray(candidato.herramientas) ? candidato.herramientas.join(", ") : "—"}</td>
                <td className="p-3">{candidato.disponibilidad_inicio || "—"}</td>
                <td className="p-3">
                  <select
                    value={candidato.estado}
                    onChange={(e) =>
                      handleEstadoChange(candidato.id_candidato, e.target.value)
                    }
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
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() =>
                      navigate(`/dashboard/candidatos/${candidato.id_candidato}`, {
                        state: {
                          paginaAnterior: paginaActual,
                          filtros,
                          search,
                        },
                      })
                    }
                  >
                    <Eye size={18} />
                  </button>
                </td>
                <td className="p-3">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setIdAEliminar(candidato.id_candidato)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
        <p>
          Mostrando {data.length} de {total} candidatos
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅ Anterior
          </button>

          <span className="text-sm">Página</span>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputPagina}
            onChange={(e) => {
              const valor = e.target.value;
              if (/^\d*$/.test(valor)) {
                setInputPagina(valor);
              }
            }}
            onBlur={() => {
              const num = parseInt(inputPagina, 10);
              if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
                setPaginaActual(num);
              } else {
                setInputPagina(paginaActual);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const num = parseInt(inputPagina, 10);
                if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
                  setPaginaActual(num);
                } else {
                  setInputPagina(paginaActual);
                }
              }
            }}
            className="w-16 px-2 py-1 border rounded text-center"
          />

          <span className="text-sm">de {totalPaginas}</span>

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente ➡
          </button>
        </div>
      </div>

{idAEliminar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
      <h2 className="text-xl font-bold text-gray-800">¿Estás seguro?</h2>
      <p className="text-gray-600">
        Esta acción eliminará permanentemente al candidato seleccionado. No se podrá deshacer.
      </p>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => setIdAEliminar(null)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={async () => {
            try {
              setEliminando(true);
              const res = await fetch(`http://localhost:8000/candidatos/${idAEliminar}`, {
                method: "DELETE",
              });
              if (res.ok) {
                toast.success("Candidato eliminado correctamente");
                recargarCandidatos(); // recarga la lista
              } else {
                const data = await res.json();
                toast.error(data.detail || "Error al eliminar el candidato");
              }
            } catch (err) {
              console.error(err);
              toast.error("Error inesperado al eliminar");
            } finally {
              setEliminando(false);
              setIdAEliminar(null);
            }
          }}
          disabled={eliminando}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {eliminando ? "Eliminando..." : "Sí, eliminar"}
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default CandidateTable;
