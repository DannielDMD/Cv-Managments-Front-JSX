// src/components/dashboard/settings/SolicitudEliminacionTableDelete.jsx
import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";

const SolicitudEliminacionTableDelete = ({
  data,
  seleccionados,
  setSeleccionados,
  onEliminarSeleccionados,
}) => {
  const [todosSeleccionados, setTodosSeleccionados] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) {
      setTodosSeleccionados(false);
      return;
    }
    const todosEstanSeleccionados = data.every((item) =>
      seleccionados.includes(item.id)
    );
    setTodosSeleccionados(todosEstanSeleccionados);
  }, [data, seleccionados]);

  const toggleSeleccionarTodos = () => {
    if (todosSeleccionados) {
      const nuevos = seleccionados.filter(
        (id) => !data.some((item) => item.id === id)
      );
      setSeleccionados(nuevos);
    } else {
      const nuevos = [
        ...new Set([...seleccionados, ...data.map((item) => item.id)]),
      ];
      setSeleccionados(nuevos);
    }
  };

  const toggleSeleccion = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((sid) => sid !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO");
  };



  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border">
          <thead className="bg-[#0033A0] text-white text-left border-b-2 border-blue-800">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-600"
                  checked={todosSeleccionados}
                  onChange={toggleSeleccionarTodos}
                />
              </th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cédula</th>
              <th>Motivo</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Observación</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-blue-600"
                      checked={seleccionados.includes(s.id)}
                      onChange={() => toggleSeleccion(s.id)}
                    />
                  </td>
                  <td className="p-2">{s.nombre_completo}</td>
                  <td className="p-2">{s.correo}</td>
                  <td className="p-2">{s.cc}</td>
                  <td className="p-2">{s.motivo}</td>
                  <td className="p-2 whitespace-pre-line text-sm text-gray-700">
                    {s.descripcion_motivo || <em className="text-gray-400">—</em>}
                  </td>
                  <td className="p-2">{s.estado}</td>
                  <td className="p-2 whitespace-pre-line text-sm text-gray-700">
                    {s.observacion_admin || <em className="text-gray-400">—</em>}
                  </td>
                  <td className="p-2">{formatearFecha(s.fecha_solicitud)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No hay resultados disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {seleccionados.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onEliminarSeleccionados}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Eliminar seleccionados ({seleccionados.length})
          </button>
        </div>
      )}
    </>
  );
};

export default SolicitudEliminacionTableDelete;
