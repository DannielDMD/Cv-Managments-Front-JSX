import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users } from "lucide-react";
import HeaderTH from "../../components/Dashboard/HeaderTH";
import OverviewCards from "../../components/Dashboard/DashboardCards";
import MonthlyChart from "../../components/Dashboard/MonthlyChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const [anio, setAnio] = useState(null); // null = sin filtro

  const añosDisponibles = [2023, 2024, 2025];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverviewCards anio={anio} />
          <MonthlyChart anio={anio} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
