import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Utilidad para formatear etiquetas como "2024-01" → "Ene 2024"
const formatearEtiqueta = (clave) => {
  const [anio, mes] = clave.split("-");
  const mesesCortos = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${mesesCortos[parseInt(mes) - 1]} ${anio}`;
};

const EvolucionAnualChart = ({ data }) => {
  // Convertir el objeto en array y ordenar cronológicamente
  const datosOrdenados = Object.entries(data)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([clave, total]) => ({
      mes: formatearEtiqueta(clave),
      total,
    }));

  return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-700">
      <h2 className="text-xl font-semibold mb-4">Evolución por Año y Mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosOrdenados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" angle={-45} textAnchor="end" height={70} />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => `${value} candidatos`} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#0033A0"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EvolucionAnualChart;
