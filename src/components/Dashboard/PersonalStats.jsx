// src/components/Dashboard/PersonalStats.jsx

import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie,
    LineChart, Line, Legend, RadialBarChart, RadialBar, Cell
} from "recharts";
import { obtenerEstadisticasPersonales } from "../../services/DashboardServices/allStatsService";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6"];

const PersonalStats = ({ anioSeleccionado }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const data = await obtenerEstadisticasPersonales(anioSeleccionado);
            setStats(data);
            setLoading(false);
        };
        fetchStats();
    }, [anioSeleccionado]);

    if (loading) return <p className="text-center">Cargando estadísticas personales…</p>;
    if (!stats) return <p className="text-center text-red-500">Error al cargar datos personales</p>;

    const {
        candidatos_por_mes,
        top_ciudades_anual,
        rangos_edad,
        estado_candidatos,
        estadisticas_booleanas,
        top_cargos_anual,
    } = stats;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🧑‍💼 Información Personal</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top ciudades */}
                <div>
                    <h3 className="font-medium mb-2">Ciudades más frecuentes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart layout="horizontal" data={top_ciudades_anual}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {top_ciudades_anual.map((entry, index) => (
                                    <Cell key={`ciudad-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                </div>

                {/* Rangos de edad */}
                <div>
                    <h3 className="font-medium mb-2">Distribución por rango de edad</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={rangos_edad}
                                dataKey="count"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {rangos_edad.map((entry, index) => (
                                    <Cell key={`edad-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Estado de candidatos */}
                <div>
                    <h3 className="font-medium mb-2">Estado de candidatos</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={estado_candidatos}
                                dataKey="count"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {estado_candidatos.map((entry, index) => (
                                    <Cell key={`estado-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Cargos más frecuentes */}
                <div>
                    <h3 className="font-medium mb-2">Cargos más frecuentes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart layout="horizontal" data={top_cargos_anual}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {top_cargos_anual.map((entry, index) => (
                                    <Cell key={`cargo-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                </div>

                {/* Candidatos por mes */}
                <div className="md:col-span-2 mt-6">
                    <h3 className="font-medium mb-2">Registros de candidatos por mes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={candidatos_por_mes}>
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
                            <Line type="monotone" dataKey="count" stroke="#10b981" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Estadísticas booleanas separadas */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {/* Referidos */}
                    <div>
                        <h4 className="font-medium text-center mb-1">Referidos</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <RadialBarChart
                                innerRadius="30%"
                                outerRadius="80%"
                                data={[
                                    { name: "Sí", value: estadisticas_booleanas.referidos, fill: "#10b981" },
                                    { name: "No", value: estadisticas_booleanas.no_referidos, fill: "#ef4444" },
                                ]}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar background dataKey="value" />
                                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                                <Tooltip />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Formularios Completos */}
                    <div>
                        <h4 className="font-medium text-center mb-1">Formularios</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <RadialBarChart
                                innerRadius="30%"
                                outerRadius="80%"
                                data={[
                                    { name: "Completos", value: estadisticas_booleanas.formularios_completos, fill: "#3b82f6" },
                                    { name: "Incompletos", value: estadisticas_booleanas.formularios_incompletos, fill: "#f59e0b" },
                                ]}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar background dataKey="value" />
                                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                                <Tooltip />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Relación con Joyco */}
                    <div>
                        <h4 className="font-medium text-center mb-1">Relación con Joyco</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <RadialBarChart
                                innerRadius="30%"
                                outerRadius="80%"
                                data={[
                                    { name: "Actual", value: estadisticas_booleanas.trabaja_actualmente_joyco, fill: "#6366f1" },
                                    { name: "Anterior", value: estadisticas_booleanas.ha_trabajado_joyco, fill: "#8b5cf6" },
                                ]}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar background dataKey="value" />
                                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
                                <Tooltip />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalStats;
