// src/components/Dashboard/EducationStats.jsx

import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie,
    LineChart, Line, Legend, Cell
} from "recharts";
import { obtenerEstadisticasEducacion } from "../../services/DashboardServices/allStatsService";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#22d3ee"];

const EducationStats = ({ anioSeleccionado }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const data = await obtenerEstadisticasEducacion(anioSeleccionado);
            setStats(data);
            setLoading(false);
        };
        fetchStats();
    }, [anioSeleccionado]);

    if (loading) return <p className="text-center">Cargando estadísticas de educación…</p>;
    if (!stats) return <p className="text-center text-red-500">Error al cargar datos de educación</p>;

    const {
        top_niveles_educacion_anual,
        educaciones_por_mes,
        distribucion_nivel_ingles_anual,
        top_instituciones_academicas_anual
    } = stats;

    // Agrupar niveles educativos (añadir ID único)
    const nivelesAgrupados = top_niveles_educacion_anual.reduce((acc, { label, count }) => {
        const existente = acc.find(item => item.label === label);
        if (existente) {
            existente.count += count;
        } else {
            acc.push({ label, count, id: `${label}-${count}-${Math.random().toString(36).slice(2, 7)}` });
        }
        return acc;
    }, []);

    const topInstitucion = top_instituciones_academicas_anual[0] || { label: "-", count: 0 };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🎓 Educación</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Niveles educativos más comunes */}
                <div>
                    <h3 className="font-medium mb-2">Niveles educativos más comunes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={nivelesAgrupados}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6">
                                {nivelesAgrupados.map((entry, index) => (
                                    <Cell key={`bar-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Distribución nivel de inglés */}
                <div>
                    <h3 className="font-medium mb-2">Distribución nivel de inglés</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={distribucion_nivel_ingles_anual}
                                dataKey="count"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {distribucion_nivel_ingles_anual.map((entry, index) => (
                                    <Cell
                                        key={`ingles-${entry.label}-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Evolución mensual */}
                <div className="md:col-span-2 mt-8">
                    <h3 className="font-medium mb-2">Registros de educación por mes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={educaciones_por_mes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tickFormatter={(m) =>
                                    ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][m]
                                }
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#f59e0b" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <p className="mt-6 text-gray-700 text-sm">
                Institución más frecuente:{" "}
                <strong>{topInstitucion.label}</strong> ({topInstitucion.count} registro
                {topInstitucion.count !== 1 && "s"})
            </p>
        </div>
    );
};

export default EducationStats;
