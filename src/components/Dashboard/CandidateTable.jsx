const CandidateTable = ({ data, total, paginaActual, porPagina, setPaginaActual }) => {
    const totalPaginas = Math.ceil(total / porPagina);
  
    return (
      <>
        <div className="overflow-x-auto shadow rounded-lg mb-4">
          <table className="min-w-full bg-white text-sm text-gray-800 border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Ciudad</th>
                <th className="p-3">Cargo</th>
                <th className="p-3">Nivel Educativo</th>
                <th className="p-3">Título</th>
                <th className="p-3">Experiencia</th>
                <th className="p-3">Blandas</th>
                <th className="p-3">Técnicas</th>
                <th className="p-3">Herramientas</th>
                <th className="p-3">Disponibilidad</th>
                <th className="p-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((candidato) => (
                <tr key={candidato.id_candidato} className="border-t hover:bg-gray-50">
                  <td className="p-3">{candidato.nombre_completo}</td>
                  <td className="p-3">{candidato.correo_electronico}</td>
                  <td className="p-3">{candidato.telefono}</td>
                  <td className="p-3">{candidato.ciudad}</td>
                  <td className="p-3">{candidato.cargo_ofrecido}</td>
                  <td className="p-3">{candidato.nivel_educativo || "—"}</td>
                  <td className="p-3">{candidato.titulo_obtenido || "—"}</td>
                  <td className="p-3">{candidato.rango_experiencia || "—"}</td>
                  <td className="p-3">{candidato.habilidades_blandas.join(", ")}</td>
                  <td className="p-3">{candidato.habilidades_tecnicas.join(", ")}</td>
                  <td className="p-3">{candidato.herramientas.join(", ")}</td>
                  <td className="p-3">{candidato.disponibilidad_inicio || "—"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      candidato.estado === "ADMITIDO"
                        ? "bg-green-100 text-green-700"
                        : candidato.estado === "DESCARTADO"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {candidato.estado.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Controles de paginación */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <p>
            Mostrando {data.length} de {total} candidatos
          </p>
          <div className="space-x-2">
            <button
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual(paginaActual - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ⬅ Anterior
            </button>
            <span className="font-semibold">Página {paginaActual} de {totalPaginas}</span>
            <button
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual(paginaActual + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Siguiente ➡
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default CandidateTable;
  