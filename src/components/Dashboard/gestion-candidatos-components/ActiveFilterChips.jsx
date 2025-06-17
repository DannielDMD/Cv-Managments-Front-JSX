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
            {key === "trabaja_joyco"
              ? `Trabaja en Joyco: ${val ? "Sí" : "No"}`
              : key === "ordenar_por_fecha"
              ? `Orden: ${val === "recientes" ? "Recientes" : "Antiguos"}`
              : `${key.replace("id_", "").replace("_", " ")}: ${
                  Array.isArray(val) ? val.length + " seleccionados" : val
                }`}
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
