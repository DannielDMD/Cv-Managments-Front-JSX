import React, { useEffect, useState } from "react";
import { descargarReportePDF, descargarReporteExcel } from "../../services/DashboardServices/allStatsService";
import DashboardLayout from "../../components/Dashboard/DashboardLayout"; // ✅ Aquí importamos el layout
import EducationStats from "../../components/Dashboard/EducationStats";
import ExperienceStats from "../../components/Dashboard/ExperienceStats";
import KnowledgeStats from "../../components/Dashboard/KnowledgeStats";
import PreferencesStats from "../../components/Dashboard/PreferencesStats";

const Reports = () => {
    const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
    const [aniosDisponibles, setAniosDisponibles] = useState([]);

    useEffect(() => {
        const anioActual = new Date().getFullYear();
        const anios = [];
        for (let i = anioActual; i >= anioActual - 5; i--) {
            anios.push(i);
        }
        setAniosDisponibles(anios);
    }, []);

    const handleDescargarPDF = async () => {
        try {
            const blobData = await descargarReportePDF(anioSeleccionado);
            const blob = new Blob([blobData], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `estadisticas_${anioSeleccionado}.pdf`;
            link.click();
        } catch (error) {
            console.error("Error al descargar PDF:", error);
        }
    };

    const handleDescargarExcel = async () => {
        try {
            const blobData = await descargarReporteExcel(anioSeleccionado);
            const blob = new Blob([blobData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `candidatos_${anioSeleccionado}.xlsx`;
            link.click();
        } catch (error) {
            console.error("Error al descargar Excel:", error);
        }
    };

    return (
        <DashboardLayout> {/* ✅ Aquí empieza el layout */}
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">📊 Reporte de Estadísticas</h1>
                <p className="text-gray-600">
                    Visualiza y descarga reportes detallados de los candidatos para el año seleccionado.
                </p>

                {/* Filtro de Año y botones de descarga */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div>
                        <label
                            htmlFor="anio"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Año seleccionado
                        </label>
                        <select
                            id="anio"
                            value={anioSeleccionado}
                            onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {aniosDisponibles.map((anio) => (
                                <option key={anio} value={anio}>
                                    {anio}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleDescargarPDF}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                    >
                        📥 Descargar PDF (Estadísticas)
                    </button>

                    <button
                        onClick={handleDescargarExcel}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
                    >
                        📥 Descargar Excel (Candidatos)
                    </button>
                </div>

                {/* Placeholders para gráficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        <EducationStats anioSeleccionado={anioSeleccionado} />
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        <ExperienceStats anioSeleccionado={anioSeleccionado} />
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        <KnowledgeStats anioSeleccionado={anioSeleccionado} />
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        <PreferencesStats anioSeleccionado={anioSeleccionado} />
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        Aquí irá el gráfico de Datos Personales
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        Aquí irá el gráfico del Proceso
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
