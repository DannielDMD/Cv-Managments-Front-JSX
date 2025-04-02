import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getGeneralStats } from "../../services/DashboardServices/candidateStatsService";

const meses = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const MonthlyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getGeneralStats();
      if (stats && stats.candidatos_por_mes) {
        // Transformamos el objeto {3: 12, 4: 27} en un array para Recharts
        const formateado = Object.entries(stats.candidatos_por_mes).map(([mes, total]) => ({
          mes: meses[parseInt(mes)],
          total: total
        }));
        setData(formateado);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">📆 Candidatos Registrados por Mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
