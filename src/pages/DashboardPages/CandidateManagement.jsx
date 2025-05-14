import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { obtenerEstadisticasCandidatos } from "../../services/DashboardServices/candidateResumenService";
import { obtenerResumenCandidatos } from "../../services/DashboardServices/candidateResumenService";
import CandidateTable from "../../components/Dashboard/CandidateTable";
import CandidateDetailTable from "../../components/Dashboard/CandidateDetailTable";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos } from "../../services/FormServices/candidateService";
import { getHerramientas } from "../../services/FormServices/skillService";
import { Users } from "lucide-react";
import { SlidersHorizontal, BookOpen, Undo2 } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";

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
      const resultado = await obtenerResumenCandidatos(search, filtros, paginaActual, porPagina);
      if (resultado && resultado.data) {
        setCandidatos(resultado.data);
        setTotal(resultado.total || 0);
      }
    } catch (error) {
      console.error("Error al obtener candidatos:", error);
    }
  }, [search, filtros, paginaActual]);

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

      {estadisticas && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6 text-sm">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="font-semibold text-gray-700">Total</p>
            <p className="text-xl font-bold text-indigo-600">{estadisticas.total}</p>
          </div>
          {["EN_PROCESO", "ENTREVISTA", "ADMITIDO", "DESCARTADO", "CONTRATADO"].map((estado) => (
            <div key={estado} className="bg-white p-4 rounded shadow text-center">
              <p className="font-semibold text-gray-700">{estado.replace("_", " ")}</p>
              <p className="text-xl font-bold text-blue-600">{estadisticas[estado]}</p>
            </div>
          ))}

          {/* Tarjeta de acción hacia solicitudes de eliminación */}
          {/* Tarjeta de acción hacia solicitudes de eliminación */}
          <div
            onClick={() => navigate("/dashboard/solicitudes-eliminacion")}
            className="bg-red-50 p-4 rounded shadow text-center cursor-pointer hover:bg-red-100 transition"
          >
            <p className="font-semibold text-red-700 mb-2">Solicitudes pendientes</p>
            <FiTrash2 className="w-8 h-8 mx-auto text-red-600" />
          </div>

        </div>
      )}


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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <SelectField
            label="Ciudad"
            fetchFunction={getCiudades}
            idKey="id_ciudad"
            nameKey="nombre_ciudad"
            value={filtros.id_ciudad}
            onChange={(value) => {
              setFiltros((prev) => ({ ...prev, id_ciudad: value }));
              setPaginaActual(1);
            }}
          />
          <SelectField
            label="Cargo"
            fetchFunction={getCargos}
            idKey="id_cargo"
            nameKey="nombre_cargo"
            value={filtros.id_cargo}
            onChange={(value) => {
              setFiltros((prev) => ({ ...prev, id_cargo: value }));
              setPaginaActual(1);
            }}
          />
          <SelectField
            label="Estado"
            options={[
              { value: "EN_PROCESO", nombre: "En Proceso" },
              { value: "ENTREVISTA", nombre: "Entrevista" },
              { value: "ADMITIDO", nombre: "Admitido" },
              { value: "DESCARTADO", nombre: "Descartado" },
              { value: "CONTRATADO", nombre: "Contratado" },
            ]}
            idKey="value"
            nameKey="nombre"
            value={filtros.estado}
            onChange={(value) => {
              setFiltros((prev) => ({ ...prev, estado: value }));
              setPaginaActual(1);
            }}
          />
          <SelectField
            label="Herramientas"
            fetchFunction={getHerramientas}
            idKey="id_herramienta"
            nameKey="nombre_herramienta"
            value={filtros.herramientas}
            onChange={(value) => {
              setFiltros((prev) => ({ ...prev, herramientas: value }));
              setPaginaActual(1);
            }}
            isMulti={true}
          />
          <SelectField
            label="¿Trabaja en Joyco?"
            options={[
              { value: "true", nombre: "Sí" },
              { value: "false", nombre: "No" },
            ]}
            idKey="value"
            nameKey="nombre"
            value={
              filtros.trabaja_joyco === true
                ? "true"
                : filtros.trabaja_joyco === false
                  ? "false"
                  : null
            }
            onChange={(value) => {
              setFiltros((prev) => ({
                ...prev,
                trabaja_joyco: value === "true" ? true : value === "false" ? false : null,
              }));
              setPaginaActual(1);
            }}
          />
        </div>
      )}

      {mostrarFiltros &&
        Object.entries(filtros).some(([, val]) => val !== null && val !== "" && val.length !== 0) && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {Object.entries(filtros).map(([key, val]) =>
              val !== null && val !== "" && !(Array.isArray(val) && val.length === 0) ? (
                <span
                  key={key}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {key === "trabaja_joyco"
                    ? `Trabaja en Joyco: ${val ? "Sí" : "No"}`
                    : key === "ordenar_por_fecha"
                      ? `Orden: ${val === "recientes" ? "Recientes" : "Antiguos"}`
                      : `${key.replace("id_", "").replace("_", " ")}: ${Array.isArray(val) ? val.length + " seleccionados" : val
                      }`}
                  <button
                    onClick={() => {
                      setFiltros((prev) => ({
                        ...prev,
                        [key]: Array.isArray(val) ? [] : key === "ordenar_por_fecha" ? "recientes" : null,
                      }));
                      setPaginaActual(1);
                    }}
                    className="ml-1 text-xs font-bold hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ) : null
            )}
            <button
              onClick={() => {
                setFiltros({
                  id_ciudad: null,
                  id_cargo: null,
                  estado: null,
                  herramientas: [],
                  trabaja_joyco: null,
                  ordenar_por_fecha: "recientes",
                });
                setPaginaActual(1);
              }}
              className="text-sm text-red-600 hover:underline ml-2"
            >
              Limpiar filtros
            </button>
          </div>
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
