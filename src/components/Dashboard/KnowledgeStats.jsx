// src/components/Dashboard/KnowledgeStats.jsx

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  LineChart, Line, Legend, Cell
} from "recharts";
import { obtenerEstadisticasConocimientos } from "../../services/DashboardServices/allStatsService";

const KnowledgeStats = ({ anioSeleccionado }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await obtenerEstadisticasConocimientos(anioSeleccionado);
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, [anioSeleccionado]);

  if (loading) return <p className="text-center">Cargando estadísticas de conocimientos…</p>;
  if (!stats) return <p className="text-center text-red-500">Error al cargar datos de conocimientos</p>;

  const {
    conocimientos_por_mes,
    top_habilidades_blandas_anual,
    top_habilidades_tecnicas_anual,
    top_herramientas_anual
  } = stats;

  const colores = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7"];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">🧠 Conocimientos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Habilidades blandas */}
        <div>
          <h3 className="font-medium mb-2">Habilidades blandas más comunes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top_habilidades_blandas_anual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {top_habilidades_blandas_anual.map((entry, index) => (
                  <Cell key={`blandas-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Habilidades técnicas */}
        <div>
          <h3 className="font-medium mb-2">Habilidades técnicas más comunes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top_habilidades_tecnicas_anual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {top_habilidades_tecnicas_anual.map((entry, index) => (
                  <Cell key={`tecnicas-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Herramientas */}
        <div className="md:col-span-2">
          <h3 className="font-medium mb-2">Herramientas más comunes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={top_herramientas_anual}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {top_herramientas_anual.map((entry, index) => (
                  <Cell key={`herr-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Evolución mensual */}
        <div className="md:col-span-2 mt-8">
          <h3 className="font-medium mb-2">Registros de conocimientos por mes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={conocimientos_por_mes}>
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
    </div>
  );
};

export default KnowledgeStats;
