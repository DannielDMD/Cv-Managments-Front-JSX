import { useEffect, useState, useCallback } from "react";
import {
  getSolicitudesEliminacion,
  actualizarSolicitudEliminacion,
} from "../../services/FormServices/solicitudService";
import { toast } from "react-toastify";
import SolicitudEliminacionRow from "../../components/Dashboard/SolicitudEliminacionRow";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const SolicitudEliminacionTH = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [ordenar, setOrdenar] = useState("recientes");

  const fetchSolicitudes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSolicitudesEliminacion({
        page: pagina,
        search,
        ordenar,
      });

      const filtradas = estadoFiltro
        ? data.data.filter((s) => s.estado === estadoFiltro)
        : data.data;

      setSolicitudes(filtradas);
      setTotal(data.total);
    } catch (error) {
      toast.error("Error al cargar las solicitudes", error);
    } finally {
      setLoading(false);
    }
  }, [pagina, search, ordenar, estadoFiltro]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const handleEstadoChange = async (id, nuevoEstado, observacion) => {
    try {
      await actualizarSolicitudEliminacion(id, {
        estado: nuevoEstado,
        observacion_admin: observacion,
      });
      toast.success("Estado actualizado con éxito");
      fetchSolicitudes();
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Solicitudes de Eliminación</h2>
        <p className="mb-4 text-sm text-gray-500">Total: {total} solicitudes</p>

        {/* Filtros */}
        <div className="flex gap-4 mb-4 items-center flex-wrap">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o cédula"
            value={search}
            onChange={(e) => {
              setPagina(1);
              setSearch(e.target.value);
            }}
            className="input input-bordered w-full max-w-xs"
          />

          <select
            value={estadoFiltro}
            onChange={(e) => {
              setPagina(1);
              setEstadoFiltro(e.target.value);
            }}
            className="select select-bordered"
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Rechazada">Rechazada</option>
          </select>

          <select
            value={ordenar}
            onChange={(e) => {
              setPagina(1);
              setOrdenar(e.target.value);
            }}
            className="select select-bordered"
          >
            <option value="recientes">Más recientes primero</option>
            <option value="antiguos">Más antiguos primero</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Cédula</th>
                <th>Motivo</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Cargando...
                  </td>
                </tr>
              ) : solicitudes.length > 0 ? (
                solicitudes.map((s) => (
                  <SolicitudEliminacionRow
                    key={s.id}
                    solicitud={s}
                    onEstadoChange={handleEstadoChange}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No hay resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span className="text-sm mt-1">Página {pagina}</span>
          <button
            className="btn btn-sm"
            onClick={() => setPagina((prev) => prev + 1)}
            disabled={solicitudes.length < 10}
          >
            Siguiente
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SolicitudEliminacionTH;
