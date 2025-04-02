import React, { useEffect, useState } from "react";
import { getGeneralStats } from "../../services/DashboardServices/candidateStatsService";

const OverviewCards = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getGeneralStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-gray-500">Cargando Estadisticas...</p>;
  }



  return (
    <div className="space-y-10">

      {/* 🔵 Información Personal */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">📋 Estadisticas Generales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Candidatos" value={stats.total_candidatos} />
          <Card title="Registrados hoy" value={stats.candidatos_hoy} />
          <Card title="Esta Semana" value={stats.candidatos_ultima_semana} />
          <Card title="Promedio de Edad" value={`${stats.edad_promedio} años`} />
        </div>
      </div>

      {/* 🟣 Actividad mensual */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">📆 Actividad Mensual</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(stats.candidatos_por_mes).map(([mes, total]) => {
            const meses = [
              "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            return (
              <Card key={mes} title={meses[parseInt(mes)]} value={total} />
            );
          })}
        </div>
      </div>


      {/* 🟢 Distribución general */}
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">📍 Distribución</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card title="Ciudad más registrada" value={stats.ciudad_top} />
          <Card title="Cargo más solicitado" value={stats.cargo_top} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
    <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

export default OverviewCards;
