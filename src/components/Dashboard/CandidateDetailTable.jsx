import { useState, useEffect } from "react";

const CandidateDetailTable = ({ data, total, paginaActual, porPagina, setPaginaActual }) => {
  const totalPaginas = Math.ceil(total / porPagina);



   const [inputPagina, setInputPagina] = useState(paginaActual);
  
    useEffect(() => {
      setInputPagina(paginaActual);
    }, [paginaActual]);
  

  return (
    <>
      <div className="overflow-x-auto shadow rounded-lg mb-4 border border-gray-200">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-[#0033A0] text-white text-left border-b-2 border-blue-800">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Correo</th>
                <th className="p-3">CC</th>
                <th className="p-3">Nacimiento</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Ciudad</th>
                <th className="p-3">Perfil</th>
                <th className="p-3">Cargo</th>
                <th className="p-3">Trabaja Joyco</th>
                <th className="p-3">Ha trabajado Joyco</th>
                <th className="p-3">Motivo Salida</th>
                <th className="p-3">Referido</th>
                <th className="p-3">Nivel Educativo</th>
                <th className="p-3">Título</th>
                <th className="p-3">Institución</th>
                <th className="p-3">Año Graduación</th>
                <th className="p-3">Nivel Inglés</th>
                <th className="p-3">Experiencia</th>
                <th className="p-3">Empresa</th>
                <th className="p-3">Último Cargo</th>
                <th className="p-3">Funciones</th>
                <th className="p-3">Desde</th>
                <th className="p-3">Hasta</th>
                <th className="p-3">Habilidades Blandas</th>
                <th className="p-3">Habilidades Técnicas</th>
                <th className="p-3">Herramientas</th>
                <th className="p-3">Viajar</th>
                <th className="p-3">Disponibilidad</th>
                <th className="p-3">Salarial</th>
                <th className="p-3">Trabaja Actualmente</th>
                <th className="p-3">Motivo Salida (Pref)</th>
                <th className="p-3">Razón Joyco</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, index) => (
                <tr key={c.id_candidato} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2">{c.nombre_completo}</td>
                  <td className="p-2">{c.correo_electronico}</td>
                  <td className="p-2">{c.cc}</td>
                  <td className="p-2">{c.fecha_nacimiento}</td>
                  <td className="p-2">{c.telefono}</td>
                  <td className="p-2">{c.ciudad}</td>
                  <td className="p-2">{c.descripcion_perfil}</td>
                  <td className="p-2">{c.cargo}</td>
                  <td className="p-2">{c.trabaja_actualmente_joyco ? "Sí" : "No"}</td>
                  <td className="p-2">{c.ha_trabajado_joyco ? "Sí" : "No"}</td>
                  <td className="p-2">{c.motivo_salida || "—"}</td>
                  <td className="p-2">{c.tiene_referido ? c.nombre_referido : "No"}</td>
                  <td className="p-2">{c.nivel_educacion}</td>
                  <td className="p-2">{c.titulo}</td>
                  <td className="p-2">{c.institucion}</td>
                  <td className="p-2">{c.anio_graduacion}</td>
                  <td className="p-2">{c.nivel_ingles}</td>
                  <td className="p-2">{c.rango_experiencia}</td>
                  <td className="p-2">{c.ultima_empresa}</td>
                  <td className="p-2">{c.ultimo_cargo}</td>
                  <td className="p-2">{c.funciones}</td>
                  <td className="p-2">{c.fecha_inicio}</td>
                  <td className="p-2">{c.fecha_fin || "Actual"}</td>
                  <td className="p-2">{c.habilidades_blandas?.join(", ")}</td>
                  <td className="p-2">{c.habilidades_tecnicas?.join(", ")}</td>
                  <td className="p-2">{c.herramientas?.join(", ")}</td>
                  <td className="p-2">{c.disponibilidad_viajar ? "Sí" : "No"}</td>
                  <td className="p-2">{c.disponibilidad_inicio}</td>
                  <td className="p-2">{c.rango_salarial}</td>
                  <td className="p-2">{c.trabaja_actualmente ? "Sí" : "No"}</td>
                  <td className="p-2">{c.motivo_salida_preferencia}</td>
                  <td className="p-2">{c.razon_trabajar_joyco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
        <p>
          Mostrando {data.length} de {total} candidatos
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅ Anterior
          </button>

          <span className="text-sm">Página</span>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputPagina}
            onChange={(e) => {
              const valor = e.target.value;
              if (/^\d*$/.test(valor)) {
                setInputPagina(valor);
              }
            }}
            onBlur={() => {
              const num = parseInt(inputPagina, 10);
              if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
                setPaginaActual(num);
              } else {
                setInputPagina(paginaActual);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const num = parseInt(inputPagina, 10);
                if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
                  setPaginaActual(num);
                } else {
                  setInputPagina(paginaActual);
                }
              }
            }}
            className="w-16 px-2 py-1 border rounded text-center"
          />

          <span className="text-sm">de {totalPaginas}</span>

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

export default CandidateDetailTable;
