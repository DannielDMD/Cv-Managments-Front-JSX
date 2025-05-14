import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { getGeneralStats } from "../../services/DashboardServices/candidateStatsService";
import { CalendarDays } from "lucide-react";

const meses = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const colores = [
  "#2563eb", "#f97316", "#3b82f6", "#fb923c", "#1d4ed8", "#f59e0b",
  "#60a5fa", "#facc15", "#1e40af", "#ea580c", "#0ea5e9", "#fcd34d"
];

const MonthlyChart = ({ anio }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getGeneralStats(anio);
      if (stats && stats.candidatos_por_mes) {
        const formateado = Object.entries(stats.candidatos_por_mes).map(([mes, total]) => ({
          mes: meses[parseInt(mes)],
          total
        }));
        setData(formateado);
      }
    };
    fetchStats();
  }, [anio]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-6 h-6 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Candidatos Registrados por Mes
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total">
            {data.map((_, index) => (
              <Cell key={index} fill={colores[index % colores.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
