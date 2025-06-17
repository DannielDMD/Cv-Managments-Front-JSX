import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SlidersHorizontal, BookOpen, Undo2, Users } from "lucide-react";
//Componentes
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import CandidateTable from "../../../components/dashboard/gestion-candidatos-components/CandidateTable";
import CandidateDetailTable from "../../../components/dashboard/gestion-candidatos-components/CandidateDetailTable";
import CandidatoResumenCards from "../../../components/dashboard/gestion-candidatos-components/CandidatoResumenCards";
import CandidateFilters from "../../../components/dashboard/gestion-candidatos-components/CandidateFilters";
import ActiveFilterChips from "../../../components/dashboard/gestion-candidatos-components/CandidateFilters";
//Servicios
import { obtenerEstadisticasCandidatos } from "../../../services/dashboard-services/candidateResumenService";
import { obtenerResumenCandidatos } from "../../../services/dashboard-services/candidateResumenService";
import { obtenerCandidatosDetallados } from "../../../services/dashboard-services/candidateDetalleService";


const CandidateManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [estadisticas, setEstadisticas] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
    id_ciudad: null,
    id_cargo: null,
    estado: null,
    herramientas: [],
    trabaja_joyco: null,
    ordenar_por_fecha: "recientes",
  });

  const [candidatos, setCandidatos] = useState([]);
  const [total, setTotal] = useState(0);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [verTablaDetallada, setVerTablaDetallada] = useState(false);
  const porPagina = 10;

  useEffect(() => {
    if (state) {
      if (state.paginaAnterior) setPaginaActual(state.paginaAnterior);
      if (state.search !== undefined) setSearch(state.search);
      if (state.filtros) setFiltros(state.filtros);
    } else {
      setFiltros({
        id_ciudad: null,
        id_cargo: null,
        estado: null,
        herramientas: [],
        trabaja_joyco: null,
        ordenar_por_fecha: "recientes",
      });
      setPaginaActual(1);
    }
  }, [state]);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      const data = await obtenerEstadisticasCandidatos();
      if (data) setEstadisticas(data);
    };
    cargarEstadisticas();
  }, []);

  const cargarCandidatos = useCallback(async () => {
    try {
      let resultado;
      if (verTablaDetallada) {
        resultado = await obtenerCandidatosDetallados(search, filtros, paginaActual, porPagina);
      } else {
        resultado = await obtenerResumenCandidatos(search, filtros, paginaActual, porPagina);
      }

      setCandidatos(resultado.data || []);
      setTotal(resultado.total || 0);
    } catch (error) {
      console.error("Error al obtener candidatos:", error);
      setCandidatos([]); // Evita errores de render
      setTotal(0);
    }
  }, [search, filtros, paginaActual, verTablaDetallada]);



  useEffect(() => {
    cargarCandidatos();
  }, [cargarCandidatos]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Gestión de Candidatos
        </h1>
      </div>
      <CandidatoResumenCards estadisticas={estadisticas} navigate={navigate} />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Buscador:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPaginaActual(1);
          }}
          placeholder="Buscar por nombre, correo o cargo..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por fecha:</label>
        <select
          value={filtros.ordenar_por_fecha}
          onChange={(e) => {
            setFiltros((prev) => ({ ...prev, ordenar_por_fecha: e.target.value }));
            setPaginaActual(1);
          }}
          className="p-2 border border-gray-300 rounded text-sm"
        >
          <option value="recientes">Más recientes primero</option>
          <option value="antiguos">Más antiguos primero</option>
        </select>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setMostrarFiltros((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          {mostrarFiltros ? "Ocultar filtros avanzados" : (
            <span className="inline-flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4" />
              Mostrar filtros avanzados
            </span>
          )}
        </button>
      </div>
      {mostrarFiltros && (
        <CandidateFilters
          filtros={filtros}
          setFiltros={setFiltros}
          setPaginaActual={setPaginaActual}
        />
      )}
      {mostrarFiltros && (
        <ActiveFilterChips
          filtros={filtros}
          setFiltros={setFiltros}
          setPaginaActual={setPaginaActual}
        />
      )}

      <div className="mb-4">
        <button
          onClick={() => setVerTablaDetallada((prev) => !prev)}
          className="text-sm text-indigo-600 hover:underline"
        >
          {verTablaDetallada ? (
            <span className="inline-flex items-center gap-1">
              <Undo2 className="w-4 h-4" />
              Ver tabla resumen
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Ver tabla completa
            </span>
          )}
        </button>
      </div>

      {verTablaDetallada ? (
        <CandidateDetailTable
          data={candidatos}
          total={total}
          paginaActual={paginaActual}
          porPagina={porPagina}
          setPaginaActual={setPaginaActual}
        />
      ) : (
        <CandidateTable
          data={candidatos}
          total={total}
          paginaActual={paginaActual}
          porPagina={porPagina}
          setPaginaActual={setPaginaActual}
          recargarCandidatos={cargarCandidatos}
          filtros={filtros}
          search={search}
        />

      )}

    </DashboardLayout>
  );
};

export default CandidateManagement;