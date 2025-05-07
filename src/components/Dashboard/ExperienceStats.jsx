import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  LineChart, Line, Legend, Cell
} from "recharts";
import { obtenerEstadisticasExperiencia } from "../../services/DashboardServices/allStatsService";
import { Briefcase } from "lucide-react";

// Paletas de colores
const barColors = ["#3b82f6", "#6366f1", "#ec4899", "#f43f5e", "#8b5cf6"];
const pieColors = ["#10b981", "#3b82f6", "#facc15", "#f97316"];

const ExperienceStats = ({ anioSeleccionado }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await obtenerEstadisticasExperiencia(anioSeleccionado);
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, [anioSeleccionado]);

  if (loading) return <p className="text-center">Cargando estadísticas de experiencia…</p>;
  if (!stats) return <p className="text-center text-red-500">Error al cargar datos de experiencia</p>;

  const {
    experiencias_por_mes,
    top_rangos_experiencia_anual,
    distribucion_duracion,
    top_ultimos_cargos_anual,
    top_ultimas_empresas_anual
  } = stats;

  const topCargo = top_ultimos_cargos_anual[0] || { label: "-", count: 0 };
  const topEmpresa = top_ultimas_empresas_anual[0] || { label: "-", count: 0 };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
        <Briefcase className="w-5 h-5 text-orange-500" />
        Experiencia
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top rangos de experiencia */}
        <div>
          <h3 className="font-medium mb-2">Rangos de experiencia más comunes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top_rangos_experiencia_anual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={false} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {top_rangos_experiencia_anual.map((entry, index) => (
                  <Cell key={`bar-${entry.label}-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución de duración */}
        <div>
          <h3 className="font-medium mb-2">Duración de experiencia</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={distribucion_duracion}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {distribucion_duracion.map((entry, index) => (
                  <Cell key={`pie-${entry.label}-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Evolución mensual */}
        <div className="md:col-span-2 mt-8">
          <h3 className="font-medium mb-2">Registros de experiencia por mes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={experiencias_por_mes}>
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

      {/* Texto complementario */}
      <p className="mt-4 text-gray-700">
        Cargo más frecuente: <strong>{topCargo.label}</strong> ({topCargo.count} registros) <br />
        Empresa más frecuente: <strong>{topEmpresa.label}</strong> ({topEmpresa.count} registros)
      </p>
    </div>
  );
};

export default ExperienceStats;
