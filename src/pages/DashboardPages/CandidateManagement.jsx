import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { obtenerResumenCandidatos } from "../../services/DashboardServices/candidateResumenService";
import CandidateTable from "../../components/Dashboard/CandidateTable";
import CandidateDetailTable from "../../components/Dashboard/CandidateDetailTable";
import SelectField from "../../components/form/SelectField";
import { getCiudades } from "../../services/FormServices/candidateService";
import { getCargos } from "../../services/FormServices/candidateService";
import { getHerramientas } from "../../services/FormServices/skillService";
import TablaStickyDemo from "./TablaStickyDemo"; // Ajusta la ruta si es necesario


const CandidateManagement = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
    id_ciudad: null,
    id_cargo: null,
    estado: null,
    herramientas: [],
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [verTablaDetallada, setVerTablaDetallada] = useState(false);
  const porPagina = 10;

  const cargarCandidatos = useCallback(async () => {
    try {
      const data = await obtenerResumenCandidatos(search, filtros);
      setCandidatos(data || []);
      setPaginaActual(1);
    } catch (error) {
      console.error("Error al obtener candidatos:", error);
    }
  }, [search, filtros]);

  useEffect(() => {
    cargarCandidatos();
  }, [cargarCandidatos]);

  const total = candidatos.length;
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const candidatosVisibles = candidatos.slice(inicio, fin);

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
        </div>
      )}

      {mostrarFiltros && Object.entries(filtros).some(([, val]) => val !== null && val !== "" && val.length !== 0) && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {Object.entries(filtros).map(([key, val]) =>
            val && val.length !== 0 ? (
              <span
                key={key}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {key.replace("id_", "").replace("_", " ")}: {Array.isArray(val) ? val.length + " seleccionados" : val}
                <button
                  onClick={() => setFiltros((prev) => ({ ...prev, [key]: Array.isArray(val) ? [] : null }))}
                  className="ml-1 text-xs font-bold hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ) : null
          )}
          <button
            onClick={() => setFiltros({ id_ciudad: null, id_cargo: null, estado: null, herramientas: [] })}
            className="text-sm text-red-600 hover:underline ml-2"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* 📘 Botón para alternar entre resumen y detalle */}
      <div className="mb-4">
        <button
          onClick={() => setVerTablaDetallada((prev) => !prev)}
          className="text-sm text-indigo-600 hover:underline"
        >
          {verTablaDetallada ? "🔙 Ver tabla resumen" : "📘 Ver tabla completa"}
        </button>
      </div>

      {/* 🧾 Tabla seleccionada */}
      {verTablaDetallada ? (
        <CandidateDetailTable
          data={candidatos} // 👉 mostramos todos
          total={total}
          paginaActual={paginaActual}
          porPagina={porPagina}
          setPaginaActual={setPaginaActual}
        />
      ) : (
        <CandidateTable
          data={candidatosVisibles}
          total={total}
          paginaActual={paginaActual}
          porPagina={porPagina}
          setPaginaActual={setPaginaActual}
          recargarCandidatos={cargarCandidatos}
        />


        
      )}

<TablaStickyDemo />

    </DashboardLayout>
  );
};

export default CandidateManagement;
