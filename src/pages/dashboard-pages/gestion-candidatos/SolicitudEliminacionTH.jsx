import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
//Componentes
import SolicitudEliminacionRow from "../../../components/dashboard/gestion-candidatos-components/SolicitudEliminacionRow";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import Pagination from "../../../components/common/Pagination";
import Select from "react-select";

//Servicios
import {
  getSolicitudesEliminacion,
  actualizarSolicitudEliminacion,
  getEstadisticasSolicitudes
} from "../../../services/form-services/solicitudService";

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
  const totalPages = Math.ceil(total / 10); // Asumiendo 10 por página
  const opcionesAnios = [2023, 2024, 2025].map((a) => ({ value: a, label: String(a) }));

  const opcionesMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ].map((mes, i) => ({ value: i + 1, label: mes }));

  const opcionesEstados = [
    { value: "Pendiente", label: "Pendiente" },
    { value: "Rechazada", label: "Rechazada" },
    { value: "Aceptada", label: "Aceptada" },
  ];

  const opcionesOrden = [
    { value: "recientes", label: "Más recientes primero" },
    { value: "antiguos", label: "Más antiguos primero" },
  ];



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
    if (!id) {
      toast.warning("ID inválido: no se pudo actualizar la solicitud.");
      return;
    }

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
        <div className="space-y-1 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiTrash2 className="w-6 h-6 text-red-600" />
            Solicitudes de Eliminación
          </h1>
          <Link
            to="/dashboard/candidatos/"
            className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a Gestión de Candidatos
          </Link>
        </div>


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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Buscador:</label>
          <input
            type="text"
            placeholder="Buscar por nombre, correo o cédula..."
            value={search}
            onChange={(e) => {
              setPagina(1);
              setSearch(e.target.value);
            }}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Año */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por año:</label>
            <Select
              options={opcionesAnios}
              value={opcionesAnios.find((o) => o.value === anioFiltro) || null}
              onChange={(selected) => {
                setPagina(1);
                setAnioFiltro(selected?.value || null);
              }}
              placeholder="Todos los años"
              isClearable
              className="w-full"
            />
          </div>

          {/* Mes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por mes:</label>
            <Select
              options={opcionesMeses}
              value={opcionesMeses.find((o) => o.value === mesFiltro) || null}
              onChange={(selected) => {
                setPagina(1);
                setMesFiltro(selected?.value || null);
              }}
              placeholder="Todos los meses"
              isClearable
              className="w-full"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por estado:</label>
            <Select
              options={opcionesEstados}
              value={opcionesEstados.find((o) => o.value === estadoFiltro) || null}
              onChange={(selected) => {
                setPagina(1);
                setEstadoFiltro(selected?.value || "");
              }}
              placeholder="Todos los estados"
              isClearable
              className="w-full"
            />
          </div>

          {/* Orden */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por fecha:</label>
            <Select
              options={opcionesOrden}
              value={opcionesOrden.find((o) => o.value === ordenar) || null}
              onChange={(selected) => {
                setPagina(1);
                setOrdenar(selected?.value || "recientes");
              }}
              placeholder="Ordenar"
              isClearable
              className="w-full"
            />
          </div>
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
                <th>Descripción</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    Cargando...
                  </td>
                </tr>
              ) : solicitudes.length > 0 ? (
                solicitudes.map((s) => (
                  <SolicitudEliminacionRow
                    key={s.id}
                    solicitud={s}
                    onEstadoChange={handleEstadoChange}
                    recargarLista={fetchSolicitudes}

                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No hay resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <Pagination
          page={pagina}
          totalPages={totalPages}
          totalItems={total}
          onPageChange={(nuevaPagina) => setPagina(nuevaPagina)}
        />

      </div>
    </DashboardLayout>
  );
};

export default SolicitudEliminacionTH;
