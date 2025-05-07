import { NavLink, } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import {
    Users,
    BarChart3,
    Settings,
    ArrowLeftCircle
} from "lucide-react";
import joycoLogo from "../../assets/joyco-logo.png"; // Asegúrate que la imagen esté ahí

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <p className="text-center mt-20 text-gray-600">Cargando...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 fixed top-0 left-0 h-screen bg-[#0033A0] shadow-lg z-50 p-6 pt-10 flex flex-col justify-between">
                {/* Parte superior: Logo + navegación */}
                <div>
                    <h2 className="text-4xl font-bold text-white text-center mb-6">TalentFlow</h2>

                    <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
                        <NavLink
                            to="/dashboard/candidatos"
                            className={({ isActive }) =>
                                `flex items-center gap-2 ${isActive ? "text-white font-semibold" : "text-blue-100 hover:text-white"}`
                            }>
                            <Users className="w-5 h-5" />
                            Gestión de Candidatos
                        </NavLink>

                        <NavLink
                            to="/dashboard/reportes"
                            className={({ isActive }) =>
                                `flex items-center gap-2 ${isActive ? "text-white font-semibold" : "text-blue-100 hover:text-white"}`
                            }>
                            <BarChart3 className="w-5 h-5" />
                            Reportes
                        </NavLink>

                        {user.rol === "ADMIN" && (
                            <NavLink
                                to="/dashboard/configuracion"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 ${isActive ? "text-white font-semibold" : "text-blue-100 hover:text-white"}`
                                }>
                                <Settings className="w-5 h-5" />
                                Configuración
                            </NavLink>
                        )}

                        <NavLink
                            to="/dashboard"
                            className="mt-8 text-orange-500 hover:underline flex items-center gap-2">
                            <ArrowLeftCircle className="w-5 h-5" />
                            Volver al Dashboard
                        </NavLink>
                    </nav>
                </div>

                {/* Logo en la parte inferior */}
                <div className="mt-8">
                    <img
                        src={joycoLogo}
                        alt="Logo Joyco"
                        className="h-25 w-auto object-contain"
                    />                </div>
            </aside>


            {/* CONTENIDO PRINCIPAL */}
            <main className="ml-64 w-full p-8 pt-20">{children}</main>
        </div>
    );
};

export default DashboardLayout;
