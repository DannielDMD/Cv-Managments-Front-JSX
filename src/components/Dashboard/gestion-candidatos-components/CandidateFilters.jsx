//Componentes
import SelectField from "../../common/SelectField";
import Select from "react-select";
import { useEffect, useState } from "react";

//Servicios
import { getCiudades, getCargos } from "../../../services/form-services/candidateService";
import { getHerramientas } from "../../../services/form-services/skillService";
import { obtenerAniosDisponibles } from "../../../services/dashboard-services/aniosService";


const CandidateFilters = ({ filtros, setFiltros, setPaginaActual }) => {
  // Opciones estáticas para Año y Mes
  const [opcionesAnios, setOpcionesAnios] = useState([]);
  const opcionesMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ].map((mes, i) => ({ value: i + 1, label: mes }));

  useEffect(() => {
    const cargarAnios = async () => {
      const anios = await obtenerAniosDisponibles();
      const opciones = anios.map((a) => ({ value: a, label: String(a) }));
      setOpcionesAnios(opciones);
    };

    cargarAnios();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Año de postulación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Año de postulación</label>
        <Select
          options={opcionesAnios}
          value={opcionesAnios.find((o) => o.value === filtros.anio) || null}
          onChange={(selected) => {
            setFiltros((prev) => ({ ...prev, anio: selected?.value || null }));
            setPaginaActual(1);
          }}
          placeholder="Todos los años"
          isClearable
          className="w-full"
        />
      </div>

      {/* Mes de postulación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mes de postulación</label>
        <Select
          options={opcionesMeses}
          value={opcionesMeses.find((o) => o.value === filtros.mes) || null}
          onChange={(selected) => {
            setFiltros((prev) => ({ ...prev, mes: selected?.value || null }));
            setPaginaActual(1);
          }}
          placeholder="Todos los meses"
          isClearable
          className="w-full"
        />
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
