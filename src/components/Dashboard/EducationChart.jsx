import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getEducationStats } from "../../services/DashboardServices/educationStatsService";

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#AF19FF", "#FF5A5F", "#36A2EB", "#FF6384", "#4BC0C0"];

const EducationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getEducationStats();
      setData(stats);
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">🎓 Niveles Educativos Registrados</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="nivel"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EducationChart;
