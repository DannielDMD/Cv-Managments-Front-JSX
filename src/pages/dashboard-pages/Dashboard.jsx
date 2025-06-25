import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users } from "lucide-react";
//Componentes
import HeaderTH from "../../components/dashboard/HeaderTH";
import OverviewCards from "../../components/dashboard/DashboardCards";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import EvolucionAnualChart from "../../components/dashboard/EvolucionAnualChart";
import NivelInglesChart from "../../components/dashboard/NivelInglesChart";
import Top5Table from "../../components/dashboard/Top5Table";

//Servicios
import { obtenerAniosDisponibles } from "../../services/dashboard-services/aniosService";
import { getGeneralStats } from "../../services/dashboard-services/stats/candidateStatsService";
import { obtenerEstadisticasEducacion, obtenerEstadisticasExperiencia, obtenerEstadisticasPersonales, } from "../../services/dashboard-services/stats/allStatsService";

const Dashboard = () => {
  const navigate = useNavigate();
  //const location = useLocation(); // 👈 necesario para detectar navegación  

  const [anio, setAnio] = useState(null); // null = sin filtro

  const [añosDisponibles, setAniosDisponibles] = useState([]);
  const [anioCargado, setAnioCargado] = useState(false); // 👈 nuevo
  const [estadisticas, setEstadisticas] = useState(null);
  const [estadisticasEducacion, setEstadisticasEducacion] = useState(null);
  const [estadisticasPersonales, setEstadisticasPersonales] = useState(null);
  const [estadisticasExperiencia, setEstadisticasExperiencia] = useState(null);

  useEffect(() => {
    const cargarAnios = async () => {
      const anios = await obtenerAniosDisponibles();
      setAniosDisponibles(anios);

      const anioActual = new Date().getFullYear();
      if (anios.includes(anioActual)) {
        setAnio(anioActual);
      } else {
        setAnio(null);
      }

      setAnioCargado(true); // ✅ se marca cuando todo esté listo
    };
    cargarAnios();
  }, []);






  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const response = await getGeneralStats(anio); // puede ser null
        setEstadisticas(response);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    if (anioCargado) {
      cargarEstadisticas();
    }
  }, [anio, anioCargado]);




  // Dentro del componente:
  const cargarEstadisticasEducacion = useCallback(async () => {
    try {
      const response = await obtenerEstadisticasEducacion(anio);
      setEstadisticasEducacion(response);
    } catch (error) {
      console.error("Error al cargar estadísticas de educación:", error);
    }
  }, [anio]); // ✅ anio como dependencia

  useEffect(() => {
    if (anioCargado) {
      cargarEstadisticasEducacion();
    }
  }, [anioCargado, cargarEstadisticasEducacion]);


const cargarEstadisticasPersonales = useCallback(async () => {
    try {
      const response = await obtenerEstadisticasPersonales(anio);
      setEstadisticasPersonales(response);
    } catch (error) {
      console.error("Error al cargar estadísticas personales:", error);
    }
  }, [anio]);

  const cargarEstadisticasExperiencia = useCallback(async () => {
    try {
      const response = await obtenerEstadisticasExperiencia(anio);
      setEstadisticasExperiencia(response);
    } catch (error) {
      console.error("Error al cargar estadísticas de experiencia:", error);
    }
  }, [anio]);

  useEffect(() => {
    if (anioCargado) {
      cargarEstadisticasEducacion();
      cargarEstadisticasPersonales();
      cargarEstadisticasExperiencia();
    }
  }, [anioCargado, cargarEstadisticasEducacion, cargarEstadisticasPersonales, cargarEstadisticasExperiencia]);

  return (
    <>
      <HeaderTH />

      <div className="pt-28 p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-600 w-5 h-5" />
            <select
              value={anio || ""}
              onChange={(e) => setAnio(e.target.value ? parseInt(e.target.value) : null)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Todos los años</option>
              {añosDisponibles.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            <button
              onClick={() => navigate("/dashboard/candidatos")}
              className="flex items-center gap-2 bg-[#0033A0] hover:bg-[#1c2a56] text-white px-4 py-2 rounded-md shadow transition"
            >
              <Users className="w-5 h-5" />
              Gestión de Candidatos
            </button>
          </div>
        </div>

        {anioCargado && estadisticas ? (
          <>
            {/* Tarjetas arriba (ocupan toda la fila) */}
            <OverviewCards anio={anio} />

            {/* Gráficos comparativos (lado a lado) */}
            {/* Mostrar evolución si no hay año seleccionado */}
            {anio === null && estadisticas?.evolucion_anual && (
              <div className="mt-6">
                <EvolucionAnualChart data={estadisticas.evolucion_anual} />
              </div>
            )}

            {/* Mostrar mensual y nivel de inglés si hay año */}
            {anio !== null && estadisticasEducacion && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <MonthlyChart anio={anio} />
                <NivelInglesChart
                  data={estadisticasEducacion.distribucion_nivel_ingles_anual}
                />
              </div>
            )}
            {estadisticasEducacion && estadisticasPersonales && estadisticasExperiencia && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Top5Table
                  titulo="Top 5 Títulos Registrados"
                  items={estadisticasEducacion.top_titulos_obtenidos_anual.slice(0, 5)}
                />
                <Top5Table
                  titulo="Top 5 Departamentos"
                  items={estadisticasPersonales.top_departamentos_anual.slice(0, 5)}
                />
                <Top5Table
                  titulo="Top 5 Rangos de Experiencia"
                  items={estadisticasExperiencia.top_rangos_experiencia_anual.slice(0, 5)}
                />
              </div>
            )}

          </>
        ) : (
          <p className="text-gray-500">Cargando información del año...</p>
        )}

      </div>
    </>
  );
};

export default Dashboard;
