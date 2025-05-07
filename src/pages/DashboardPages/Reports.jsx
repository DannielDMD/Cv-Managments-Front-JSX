import React, { useEffect, useState } from "react";
import { descargarReportePDF, descargarReporteExcel } from "../../services/DashboardServices/allStatsService";
import DashboardLayout from "../../components/Dashboard/DashboardLayout"; // ✅ Aquí importamos el layout
import EducationStats from "../../components/Dashboard/EducationStats";
import ExperienceStats from "../../components/Dashboard/ExperienceStats";
import KnowledgeStats from "../../components/Dashboard/KnowledgeStats";
import PreferencesStats from "../../components/Dashboard/PreferencesStats";
import PersonalStats from "../../components/Dashboard/PersonalStats";
import { Download, FileSpreadsheet, FileDown, Calendar } from "lucide-react";
import { BarChart } from "lucide-react"; // asegúrate de importar esto





const Reports = () => {
    const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());
    const [aniosDisponibles, setAniosDisponibles] = useState([]);

    useEffect(() => {
        const anioActual = new Date().getFullYear();
        const anios = [];
        for (let i = anioActual + 2; i >= anioActual - 5; i--) {
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
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart className="w-6 h-6 text-blue-600" />
                    Reporte de Estadísticas
                </h1>
                <p className="text-gray-600">
                    Visualiza y descarga reportes detallados de los candidatos para el año seleccionado.
                </p>

                {/* Filtro de Año y botones de descarga */}
                <div className="flex flex-wrap md:items-end gap-4">
                    {/* Año seleccionado */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            Año seleccionado
                        </label>
                        <select
                            id="anio"
                            value={anioSeleccionado}
                            onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {aniosDisponibles.map((anio) => (
                                <option key={anio} value={anio}>
                                    {anio}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botón PDF */}
                    <button
                        onClick={handleDescargarPDF}
                        className="flex items-center gap-2 bg-[#0033A0] hover:bg-[#1c2a56] text-white px-4 py-2 rounded-md shadow text-sm"
                        >
                        <FileDown className="w-5 h-5" />
                        PDF (Estadísticas)
                    </button>

                    {/* Botón Excel */}
                    <button
                        onClick={handleDescargarExcel}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow text-sm"
                    >
                        <FileSpreadsheet className="w-5 h-5" />
                        Excel (Candidatos)
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
                </div>

                {/* PersonalStats fuera del grid para ocupar todo el ancho */}
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 mt-6">
                    <PersonalStats anioSeleccionado={anioSeleccionado} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
