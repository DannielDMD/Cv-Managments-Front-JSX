// src/components/Dashboard/CandidateFilters.jsx
import SelectField from "../form/SelectField";
import { getCiudades, getCargos } from "../../services/FormServices/candidateService";
import { getHerramientas } from "../../services/FormServices/skillService";

const CandidateFilters = ({ filtros, setFiltros, setPaginaActual }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Año */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Año de postulación</label>
        <select
          value={filtros.anio || ""}
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value) : null;
            setFiltros((prev) => ({ ...prev, anio: value }));
            setPaginaActual(1);
          }}
          className="select select-bordered w-full"
        >
          <option value="">Todos los años</option>
          {[2023, 2024, 2025].map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Mes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mes de postulación</label>
        <select
          value={filtros.mes || ""}
          onChange={(e) => {
            const value = e.target.value ? parseInt(e.target.value) : null;
            setFiltros((prev) => ({ ...prev, mes: value }));
            setPaginaActual(1);
          }}
          className="select select-bordered w-full"
        >
          <option value="">Todos los meses</option>
          {[
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ].map((mes, i) => (
            <option key={i + 1} value={i + 1}>{mes}</option>
          ))}
        </select>
      </div>

      {/* Ciudad */}
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

      {/* Cargo */}
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

      {/* Estado */}
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

      {/* Herramientas */}
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

      {/* ¿Trabaja en Joyco? */}
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
  );
};

export default CandidateFilters;
