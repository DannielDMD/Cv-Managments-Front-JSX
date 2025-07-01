// src/components/Dashboard/ActiveFilterChips.jsx
const ActiveFilterChips = ({ filtros, setFiltros, setPaginaActual }) => {
  const handleClearFilter = (key, val) => {
    setFiltros((prev) => ({
      ...prev,
      [key]: Array.isArray(val)
        ? []
        : key === "ordenar_por_fecha"
          ? "recientes"
          : null,
    }));
    setPaginaActual(1);
  };

  const handleClearAll = () => {
    setFiltros({
      id_ciudad: null,
      id_cargo: null,
      estado: null,
      herramientas: [],
      trabaja_joyco: null,
      ordenar_por_fecha: "recientes",
      anio: null,
      mes: null,
      id_nivel_educacion: null,
      id_titulo: null,
      id_nivel_ingles: null,
      id__rango_experiencia: null,
      id_habilidad_tecnica: null,
      habilidades_blandas: [],
      id_disponibilidad: null,
      id_rango_salarial: null,
      ha_trabajado_joyco: null,
      tiene_referido: null,
      disponibilidad_viajar: null,
      trabaja_actualmente: null,
    });
    setPaginaActual(1);
  };


  const hayFiltrosActivos = Object.entries(filtros).some(
    ([, val]) => val !== null && val !== "" && val.length !== 0
  );

  if (!hayFiltrosActivos) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {Object.entries(filtros).map(([key, val]) =>
        val !== null && val !== "" && !(Array.isArray(val) && val.length === 0) ? (
          <span
            key={key}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {(() => {
              const etiquetas = {
                id_ciudad: "Ciudad",
                id_cargo: "Cargo",
                estado: "Estado",
                herramientas: "Herramientas",
                ordenar_por_fecha: "Orden",
                anio: "Año",
                mes: "Mes",
                id_nivel_educacion: "Nivel educativo",
                id_titulo: "Título",
                id_nivel_ingles: "Nivel de inglés",
                id_rango_experiencia: "Experiencia",
                id_habilidad_tecnica: "Habilidad técnica",
                habilidades_blandas: "Habilidades blandas",
                id_disponibilidad: "Disponibilidad inicio",
                id_rango_salarial: "Rango salarial",
                ha_trabajado_joyco: "¿Ha trabajado en Joyco?",
                tiene_referido: "¿Tiene referido?",
                disponibilidad_viajar: "¿Disponibilidad para viajar?",
                trabaja_actualmente: "¿Trabaja actualmente?",
                trabaja_joyco: "¿Trabaja en Joyco?",
              };

              const label = etiquetas[key] || key;
              const valor = Array.isArray(val)
                ? `${val.length} seleccionados`
                : typeof val === "boolean"
                  ? val ? "Sí" : "No"
                  : key === "ordenar_por_fecha"
                    ? val === "recientes" ? "Recientes" : "Antiguos"
                    : val;

              return `${label}: ${valor}`;
            })()}
            <button
              onClick={() => handleClearFilter(key, val)}
              className="ml-1 text-xs font-bold hover:text-red-500"
            >
              ✕
            </button>
          </span>
        ) : null
      )}
      <button
        onClick={handleClearAll}
        className="text-sm text-red-600 hover:underline ml-2"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default ActiveFilterChips;
