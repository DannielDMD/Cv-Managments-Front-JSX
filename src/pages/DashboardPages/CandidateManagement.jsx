import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { obtenerResumenCandidatos } from "../../services/DashboardServices/candidateResumenService";
import CandidateTable from "../../components/Dashboard/CandidateTable";
import CandidateDetailTable from "../../components/Dashboard/CandidateDetailTable";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos } from "../../services/FormServices/candidateService";
import { getHerramientas } from "../../services/FormServices/skillService";

const CandidateManagement = () => {
  const location = useLocation();
  const state = location.state;

  const [paginaActual, setPaginaActual] = useState(1);
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
    id_ciudad: null,
    id_cargo: null,
    estado: null,
    herramientas: [],
    trabaja_joyco: null,
  });

  const [candidatos, setCandidatos] = useState([]);
  const [total, setTotal] = useState(0);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [verTablaDetallada, setVerTablaDetallada] = useState(false);
  const porPagina = 10;

  // ✅ Recuperar datos si venimos desde el detalle
  useEffect(() => {
    if (state) {
      if (state.paginaAnterior) setPaginaActual(state.paginaAnterior);
      if (state.search !== undefined) setSearch(state.search);
      if (state.filtros) setFiltros(state.filtros);
    }
  }, [state]);

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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Candidatos</h1>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, correo o cargo..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => setMostrarFiltros((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          {mostrarFiltros ? "Ocultar filtros avanzados" : "🧰 Mostrar filtros avanzados"}
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
            onChange={(value) => setFiltros((prev) => ({ ...prev, id_ciudad: value }))}
          />
          <SelectField
            label="Cargo"
            fetchFunction={getCargos}
            idKey="id_cargo"
            nameKey="nombre_cargo"
            value={filtros.id_cargo}
            onChange={(value) => setFiltros((prev) => ({ ...prev, id_cargo: value }))}
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
            onChange={(value) => setFiltros({ ...filtros, estado: value })}
          />
          <SelectField
            label="Herramientas"
            fetchFunction={getHerramientas}
            idKey="id_herramienta"
            nameKey="nombre_herramienta"
            value={filtros.herramientas}
            onChange={(value) => setFiltros((prev) => ({ ...prev, herramientas: value }))}
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
            onChange={(value) =>
              setFiltros((prev) => ({
                ...prev,
                trabaja_joyco: value === "true" ? true : value === "false" ? false : null,
              }))
            }
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
                    : `${key.replace("id_", "").replace("_", " ")}: ${
                        Array.isArray(val) ? val.length + " seleccionados" : val
                      }`}
                  <button
                    onClick={() =>
                      setFiltros((prev) => ({ ...prev, [key]: Array.isArray(val) ? [] : null }))
                    }
                    className="ml-1 text-xs font-bold hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ) : null
            )}
            <button
              onClick={() =>
                setFiltros({
                  id_ciudad: null,
                  id_cargo: null,
                  estado: null,
                  herramientas: [],
                  trabaja_joyco: null,
                })
              }
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
          {verTablaDetallada ? "🔙 Ver tabla resumen" : "📘 Ver tabla completa"}
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
        />
      )}
    </DashboardLayout>
  );
};

export default CandidateManagement;
