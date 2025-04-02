import OverviewCards from "../../components/Dashboard/DashboardCards";
import HeaderTH from "../../components/Dashboard/HeaderTH";
import MonthlyChart from "../../components/Dashboard/MonthlyChart";
import EducationChart from "../../components/Dashboard/EducationChart";

const Dashboard = () => {
  return (
    <>
      <HeaderTH />
      <div className="pt-20 p-6 space-y-6">

        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        {/* 🧠 Estadísticas Generales + Gráfico juntos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverviewCards />
          <MonthlyChart />
          <EducationChart />
        </div>

        {/* Aquí podrías agregar más secciones abajo si querés */}
      </div>
    </>
  );
};

export default Dashboard;
