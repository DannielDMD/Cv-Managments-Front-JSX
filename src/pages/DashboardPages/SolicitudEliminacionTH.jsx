import { useEffect, useState, useCallback } from "react";
import {
  getSolicitudesEliminacion,
  actualizarSolicitudEliminacion,
} from "../../services/FormServices/solicitudService";
import { toast } from "react-toastify";
import SolicitudEliminacionRow from "../../components/Dashboard/SolicitudEliminacionRow";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { getEstadisticasSolicitudes } from "../../services/FormServices/solicitudService";

const SolicitudEliminacionTH = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState(null);

  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [ordenar, setOrdenar] = useState("recientes");
  const [anioFiltro, setAnioFiltro] = useState(null);
  const [mesFiltro, setMesFiltro] = useState(null);



  const fetchSolicitudes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSolicitudesEliminacion({
        page: pagina,
        search,
        ordenar,
        anio: anioFiltro,
        mes: mesFiltro,
        estado: estadoFiltro, // 👈 no lo olvides
      });

      setSolicitudes(data.data); // 👈 sin filtrado redundante
      setTotal(data.total);
    } catch (error) {
      toast.error("Error al cargar las solicitudes", error);
    } finally {
      setLoading(false);
    }
  }, [pagina, search, ordenar, estadoFiltro, anioFiltro, mesFiltro]);


  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes, anioFiltro, mesFiltro]);


  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const data = await getEstadisticasSolicitudes(anioFiltro);

        setEstadisticas(data);
      } catch (error) {
        toast.error("Error al cargar estadísticas", error);
      }
    };
    cargarEstadisticas();
  }, [anioFiltro]);


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
        {estadisticas && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 text-sm">
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">Total</p>
              <p className="text-xl font-bold text-indigo-600">{estadisticas.total}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">Pendientes</p>
              <p className="text-xl font-bold text-blue-600">{estadisticas.pendientes}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">Rechazadas</p>
              <p className="text-xl font-bold text-red-500">{estadisticas.rechazadas}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">Aceptadas</p>
              <p className="text-xl font-bold text-green-600">{estadisticas.aceptadas}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">Motivo: Actualizar</p>
              <p className="text-xl font-bold text-amber-600">{estadisticas.motivo_actualizar_datos}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">Motivo: Eliminar</p>
              <p className="text-xl font-bold text-fuchsia-600">{estadisticas.motivo_eliminar_candidatura}</p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="flex gap-4 mb-4 items-center flex-wrap">
          <select
            value={anioFiltro || ""}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : null;
              setPagina(1);
              setAnioFiltro(value);
            }}

            className="select select-bordered"
          >
            <option value="">Todos los años</option>
            {[2023, 2024, 2025].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select
            value={mesFiltro || ""}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : null;
              setPagina(1);
              setMesFiltro(value);
            }}
            className="select select-bordered"
          >
            <option value="">Todos los meses</option>
            {[
              "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ].map((mes, index) => (
              <option key={index + 1} value={index + 1}>{mes}</option>
            ))}
          </select>

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
            <option value="Aceptada">Aceptada</option>
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
            <thead className="bg-[#0033A0] text-white text-left border-b-2 border-blue-800">

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
