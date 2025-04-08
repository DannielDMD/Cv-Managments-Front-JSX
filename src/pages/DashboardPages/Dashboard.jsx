import { useNavigate } from "react-router-dom";
import OverviewCards from "../../components/Dashboard/DashboardCards";
import HeaderTH from "../../components/Dashboard/HeaderTH";
import MonthlyChart from "../../components/Dashboard/MonthlyChart";
import EducationChart from "../../components/Dashboard/EducationChart";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderTH />

      <div className="pt-20 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => navigate("/dashboard/candidatos")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Gestión de Candidatos
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverviewCards />
          <MonthlyChart />
          <EducationChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
