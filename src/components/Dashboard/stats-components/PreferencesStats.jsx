import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, RadialBarChart, RadialBar, Legend, Cell
} from "recharts";
import { SlidersHorizontal } from "lucide-react";
//Services
import { obtenerEstadisticasPreferencias } from "../../../services/dashboard-services/stats/allStatsService";


const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1", "#a855f7"];

const PreferencesStats = ({ anioSeleccionado }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const data = await obtenerEstadisticasPreferencias(anioSeleccionado);
            setStats(data);
            setLoading(false);
        };
        fetchStats();
    }, [anioSeleccionado]);

    if (loading) return <p className="text-center">Cargando estadísticas de preferencias…</p>;
    if (!stats) return <p className="text-center text-red-500">Error al cargar datos de preferencias</p>;

    const {
        preferencias_por_mes,
        top_disponibilidad_inicio_anual,
        top_rangos_salariales_anual,
        top_motivos_salida_anual,
        disponibilidad_viajar_anual,
        situacion_laboral_actual_anual
    } = stats;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-orange-500" />
                Preferencias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* BarChart - Disponibilidad de inicio */}
                <div>
                    <h3 className="font-medium mb-2">Disponibilidad para iniciar</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart layout="vertical" data={top_disponibilidad_inicio_anual}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="label" tick={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {top_disponibilidad_inicio_anual.map((entry, index) => (
                                    <Cell key={`disp-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* BarChart - Rangos salariales */}
                <div>
                    <h3 className="font-medium mb-2">Rangos salariales preferidos</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart layout="vertical" data={top_rangos_salariales_anual}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis type="category" dataKey="label" tick={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {top_rangos_salariales_anual.map((entry, index) => (
                                    <Cell key={`sal-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* BarChart - Motivos de salida */}
                <div className="md:col-span-2">
                    <h3 className="font-medium mb-2">Motivos de salida más comunes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={top_motivos_salida_anual}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" tick={false} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {top_motivos_salida_anual.map((entry, index) => (
                                    <Cell key={`mot-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* LineChart - Registros por mes */}
                <div className="md:col-span-2">
                    <h3 className="font-medium mb-2">Registros de preferencias por mes</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={preferencias_por_mes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickFormatter={(m) =>
                                ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][m]
                            } />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                {/* RadialBarChart - Disponibilidad para viajar */}
                <div>
                    <h3 className="font-medium mb-2">¿Puede viajar?</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="30%"
                            outerRadius="90%"
                            barSize={15}
                            data={disponibilidad_viajar_anual}
                        >
                            <RadialBar
                                background
                                clockWise
                                dataKey="count"
                            >
                                {disponibilidad_viajar_anual.map((entry, index) => (
                                    <Cell key={`viaje-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </RadialBar>
                            <Legend
                                iconSize={10}
                                layout="horizontal"
                                verticalAlign="bottom"
                                payload={disponibilidad_viajar_anual.map((entry, index) => ({
                                    value: entry.label,
                                    type: "square",
                                    color: COLORS[index % COLORS.length],
                                }))}
                            />
                            <Tooltip />
                        </RadialBarChart>

                    </ResponsiveContainer>
                </div>

                {/* RadialBarChart - Situación laboral actual */}
                <div>
                    <h3 className="font-medium mb-2">¿Está trabajando actualmente?</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="30%"
                            outerRadius="90%"
                            barSize={15}
                            data={situacion_laboral_actual_anual}
                        >
                            <RadialBar
                                background
                                clockWise
                                dataKey="count"
                            >
                                {situacion_laboral_actual_anual.map((entry, index) => (
                                    <Cell key={`trabaja-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </RadialBar>
                            <Legend
                                iconSize={10}
                                layout="horizontal"
                                verticalAlign="bottom"
                                payload={situacion_laboral_actual_anual.map((entry, index) => ({
                                    value: entry.label,
                                    type: "square",
                                    color: COLORS[index % COLORS.length],
                                }))}
                            />
                            <Tooltip />
                        </RadialBarChart>

                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default PreferencesStats;
