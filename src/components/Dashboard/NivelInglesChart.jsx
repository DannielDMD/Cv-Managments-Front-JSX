// src/components/dashboard/NivelInglesChart.jsx
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const colores = [
  "#0033A0", "#0074CC", "#00AEEF", "#7FDBFF", "#B2EBF2", "#E0F7FA"
];

const NivelInglesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-gray-500">
        No hay datos de nivel de inglés.
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const datosConPorcentaje = data.map((item) => ({
    ...item,
    porcentaje: ((item.count / total) * 100).toFixed(1),
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Distribución Nivel de Inglés</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={datosConPorcentaje}
            dataKey="count"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label={({ label, porcentaje }) => `${label} (${porcentaje}%)`}
          >
            {datosConPorcentaje.map((_, index) => (
              <Cell key={index} fill={colores[index % colores.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} candidatos`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NivelInglesChart;
