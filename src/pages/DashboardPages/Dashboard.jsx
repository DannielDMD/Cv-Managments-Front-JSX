import { useNavigate } from "react-router-dom";
import OverviewCards from "../../components/Dashboard/DashboardCards";
import HeaderTH from "../../components/Dashboard/HeaderTH";
import MonthlyChart from "../../components/Dashboard/MonthlyChart";
import { Users } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderTH />

      <div className="pt-28 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => navigate("/dashboard/candidatos")}
            className="flex items-center gap-2 bg-[#0033A0] hover:bg-[#1c2a56] text-white px-4 py-2 rounded-md shadow transition"          >
           <Users className="w-5 h-5" />
           Gestión de Candidatos
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverviewCards />
          <MonthlyChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
