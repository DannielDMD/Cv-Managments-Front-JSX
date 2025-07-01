//Componentes
import SelectField from "../../common/SelectField";
import Select from "react-select";
import { useEffect, useState } from "react";

//Servicios
import { getCiudades, getCargos } from "../../../services/form-services/candidateService";
import { getHerramientas, getHabilidadesBlandas, getHabilidadesTecnicas } from "../../../services/form-services/skillService";
import { getNiveles, getTitulos, getIngles } from "../../../services/form-services/educationService";
import { getExperiencia } from "../../../services/form-services/experienceService";
import { getDisponibilidades, getRangos } from "../../../services/form-services/preferencesService";


import { obtenerAniosDisponibles } from "../../../services/dashboard-services/aniosService";


//Vamos añadir los nuevos filtros




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

      {/* Filtros de Info Personal */}
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
      {/* Filtros de Experiencia */}

      {/* Rango de experiencia */}
      <SelectField
        label="Rango de experiencia"
        fetchFunction={getExperiencia}
        idKey="id_rango_experiencia"
        nameKey="descripcion_rango"
        value={filtros.id_experiencia}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_experiencia: value }));
          setPaginaActual(1);
        }}
      />
      {/* Filtros de Educación */}
      {/* Nivel educativo */}
      <SelectField
        label="Nivel educativo"
        fetchFunction={getNiveles}
        idKey="id_nivel_educacion"
        nameKey="descripcion_nivel"
        value={filtros.id_nivel_educacion}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_nivel_educacion: value }));
          setPaginaActual(1);
        }}
      />

      {/* Título obtenido */}
      <SelectField
        label="Título obtenido"
        fetchFunction={getTitulos}
        idKey="id_titulo"
        nameKey="nombre_titulo"
        value={filtros.id_titulo}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_titulo: value }));
          setPaginaActual(1);
        }}
      />

      {/* Nivel de inglés */}
      <SelectField
        label="Nivel de inglés"
        fetchFunction={getIngles}
        idKey="id_nivel_ingles"
        nameKey="nivel"
        value={filtros.id_nivel_ingles}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_nivel_ingles: value }));
          setPaginaActual(1);
        }}
      />


      {/* Filtros de Conocimientos del Candidato */}
      {/* Herramientas */}
      <SelectField
        label="Herramientas"
        fetchFunction={getHerramientas}
        idKey="id_herramienta"
        nameKey="nombre_herramienta"
        value={filtros.id_herramienta}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_herramienta: value }));
          setPaginaActual(1);
        }}
      />
      {/* Habilidad blanda */}
      <SelectField
        label="Habilidad blanda"
        fetchFunction={getHabilidadesBlandas}
        idKey="id_habilidad_blanda"
        nameKey="nombre_habilidad_blanda"
        value={filtros.id_habilidad_blanda}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_habilidad_blanda: value }));
          setPaginaActual(1);
        }}
      />
      {/* Habilidad técnica */}
      <SelectField
        label="Habilidad técnica"
        fetchFunction={getHabilidadesTecnicas}
        idKey="id_habilidad_tecnica"
        nameKey="nombre_habilidad_tecnica"
        value={filtros.id_habilidad_tecnica}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_habilidad_tecnica: value }));
          setPaginaActual(1);
        }}
      />

      {/* Filtros de Preferencias y Disponibilidad */}
      {/* Disponibilidad de inicio */}
      <SelectField
        label="Disponibilidad de inicio"
        fetchFunction={getDisponibilidades}
        idKey="id_disponibilidad"
        nameKey="descripcion_disponibilidad"
        value={filtros.id_disponibilidad}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_disponibilidad: value }));
          setPaginaActual(1);
        }}
      />

      {/* Rango salarial */}
      <SelectField
        label="Rango salarial"
        fetchFunction={getRangos}
        idKey="id_rango_salarial"
        nameKey="descripcion_rango"
        value={filtros.id_rango_salarial}
        onChange={(value) => {
          setFiltros((prev) => ({ ...prev, id_rango_salarial: value }));
          setPaginaActual(1);
        }}
      />

      {/* Filtros Booleanos */}
      {/* ¿Ha trabajado en Joyco? */}
      <SelectField
        label="¿Ha trabajado en Joyco?"
        options={[
          { value: "true", nombre: "Sí" },
          { value: "false", nombre: "No" },
        ]}
        idKey="value"
        nameKey="nombre"
        value={
          filtros.ha_trabajado_joyco === true
            ? "true"
            : filtros.ha_trabajado_joyco === false
              ? "false"
              : null
        }
        onChange={(value) => {
          setFiltros((prev) => ({
            ...prev,
            ha_trabajado_joyco: value === "true" ? true : value === "false" ? false : null,
          }));
          setPaginaActual(1);
        }}
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
      {/* ¿Tiene referido? */}
      <SelectField
        label="¿Tiene referido?"
        options={[
          { value: "true", nombre: "Sí" },
          { value: "false", nombre: "No" },
        ]}
        idKey="value"
        nameKey="nombre"
        value={
          filtros.tiene_referido === true
            ? "true"
            : filtros.tiene_referido === false
              ? "false"
              : null
        }
        onChange={(value) => {
          setFiltros((prev) => ({
            ...prev,
            tiene_referido: value === "true" ? true : value === "false" ? false : null,
          }));
          setPaginaActual(1);
        }}
      />

      {/* ¿Disponibilidad para viajar? */}
      <SelectField
        label="¿Disponibilidad para viajar?"
        options={[
          { value: "true", nombre: "Sí" },
          { value: "false", nombre: "No" },
        ]}
        idKey="value"
        nameKey="nombre"
        value={
          filtros.disponibilidad_viajar === true
            ? "true"
            : filtros.disponibilidad_viajar === false
              ? "false"
              : null
        }
        onChange={(value) => {
          setFiltros((prev) => ({
            ...prev,
            disponibilidad_viajar: value === "true" ? true : value === "false" ? false : null,
          }));
          setPaginaActual(1);
        }}
      />

      {/* ¿Trabaja actualmente? */}
      <SelectField
        label="¿Trabaja actualmente?"
        options={[
          { value: "true", nombre: "Sí" },
          { value: "false", nombre: "No" },
        ]}
        idKey="value"
        nameKey="nombre"
        value={
          filtros.trabaja_actualmente === true
            ? "true"
            : filtros.trabaja_actualmente === false
              ? "false"
              : null
        }
        onChange={(value) => {
          setFiltros((prev) => ({
            ...prev,
            trabaja_actualmente: value === "true" ? true : value === "false" ? false : null,
          }));
          setPaginaActual(1);
        }}
      />

    </div>
  );
};

export default CandidateFilters;
