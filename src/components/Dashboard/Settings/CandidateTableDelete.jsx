// src/components/dashboard/settings/CandidateTableDelete.jsx
import { useEffect, useState } from "react";

const CandidateTableDelete = ({
    data = [],
    total,
    paginaActual,
    porPagina,
    setPaginaActual,
    seleccionados = [],
    onEliminarSeleccionados = () => {}, // 👈 AÑADE ESTA LÍNEA
    setSeleccionados = () => { },
}) => {
    const totalPaginas = Math.ceil(total / porPagina);
    const [inputPagina, setInputPagina] = useState(paginaActual);

    useEffect(() => {
        setInputPagina(paginaActual);
    }, [paginaActual]);

    return (
        <>
            <div className="w-full overflow-x-auto shadow rounded-lg mb-4">
                <table className="min-w-[1000px] w-full bg-white text-sm text-gray-800 border border-gray-300 border-collapse">
                    <thead className="bg-[#0033A0] text-white text-left border-b-2 border-blue-800">
                        <tr>
                            <th className="p-3">
                                <input
                                    type="checkbox"
                                      className="w-5 h-5 accent-blue-600" // 👈 tamaño + color
                                    onChange={(e) => {
                                        const nuevos = e.target.checked ? data.map((c) => c.id_candidato) : [];
                                        setSeleccionados(nuevos);
                                    }}
                                    checked={data.length > 0 && seleccionados.length === data.length}
                                />
                            </th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Correo</th>
                            <th className="p-3">Teléfono</th>
                            <th className="p-3">Cargo</th>
                            <th className="p-3">Título</th>
                            <th className="p-3">Experiencia</th>
                            <th className="p-3">Herramientas</th>
                            <th className="p-3">Disponibilidad</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3">Postulación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((candidato) => (
                            <tr key={candidato.id_candidato} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                          className="w-5 h-5 accent-blue-600" // 👈 tamaño + color
                                        checked={seleccionados.includes(candidato.id_candidato)}
                                        onChange={(e) => {
                                            const nuevoSet = e.target.checked
                                                ? [...seleccionados, candidato.id_candidato]
                                                : seleccionados.filter((id) => id !== candidato.id_candidato);
                                            setSeleccionados(nuevoSet);
                                        }}
                                    />
                                </td>
                                <td className="p-3">{candidato.nombre_completo}</td>
                                <td className="p-3">{candidato.correo_electronico}</td>
                                <td className="p-3">{candidato.telefono}</td>
                                <td className="p-3">{candidato.cargo_ofrecido}</td>
                                <td className="p-3">{candidato.titulo_obtenido || "—"}</td>
                                <td className="p-3">{candidato.rango_experiencia || "—"}</td>
                                <td className="p-3">
                                    {Array.isArray(candidato.herramientas) ? candidato.herramientas.join(", ") : "—"}
                                </td>
                                <td className="p-3">{candidato.disponibilidad_inicio || "—"}</td>
                                <td className="p-3">
                                    <span className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded">
                                        {candidato.estado.replace("_", " ")}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {new Date(candidato.fecha_postulacion).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {seleccionados.length > 0 && (
                    <div className="flex justify-between items-center bg-yellow-50 border border-yellow-300 p-3 rounded mb-3 text-sm">
                        <p className="text-gray-800">
                            {seleccionados.length} de {total} candidatos seleccionados
                        </p>
                        <button
                            onClick={() => onEliminarSeleccionados()} // 👉 este prop se lo pasas desde la vista
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
                        >
                            Eliminar seleccionados
                        </button>
                    </div>
                )}



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

                    <span>Página</span>

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

                    <span>de {totalPaginas}</span>

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

export default CandidateTableDelete;
