import { useEffect, useState } from "react";
import {
  Users,
  CalendarDays,
  TrendingUp,
  MapPin,
  Briefcase,
} from "lucide-react";
//Servicios
import { getGeneralStats } from "../../services/dashboard-services/stats/candidateStatsService";


const OverviewCards = ({ anio }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getGeneralStats(anio);
      setStats(data);
    };
    fetchStats();
  }, [anio]);

  if (!stats) return <p className="text-gray-500">Cargando Estadísticas...</p>;

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-blue-700" />
          <h2 className="text-xl font-bold text-gray-700">Estadísticas Generales</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Candidatos" value={stats.total_candidatos} />
          <Card title="Registrados hoy" value={stats.candidatos_hoy} />
          <Card title="Esta Semana" value={stats.candidatos_ultima_semana} />
          <Card title="Promedio de Edad" value={`${stats.edad_promedio} años`} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-700">Actividad Mensual</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(stats.candidatos_por_mes).map(([mes, total]) => {
            const meses = [
              "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            return <Card key={mes} title={meses[parseInt(mes)]} value={total} />;
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-700">Distribución</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card
            title={<span className="inline-flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              Ciudad más registrada
            </span>}
            value={stats.ciudad_top}
          />
          <Card
            title={<span className="inline-flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-orange-500" />
              Cargo más solicitado
            </span>}
            value={stats.cargo_top}
          />
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
