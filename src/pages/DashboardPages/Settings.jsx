import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { Users, Database } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Configuración del Sistema</h1>
        <p className="text-gray-600">Administra catálogos maestros y usuarios autorizados.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Tarjeta Usuarios */}
          <div
            onClick={() => navigate("/dashboard/configuracion/usuarios")}
            className="cursor-pointer bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Usuarios</h3>
              <p className="text-sm text-gray-600">Gestiona los accesos al sistema</p>
            </div>
          </div>

          {/* Tarjeta Catálogos */}
          <div
            onClick={() => navigate("/dashboard/configuracion/catalogos")}
            className="cursor-pointer bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center gap-4"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <Database className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Catálogos</h3>
              <p className="text-sm text-gray-600">Modifica las listas desplegables del formulario</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
