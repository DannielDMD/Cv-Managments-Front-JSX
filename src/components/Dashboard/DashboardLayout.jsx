import { NavLink, } from "react-router-dom";
import { useAuth } from "../../context/useAuth";


const DashboardLayout = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <p className="text-center mt-20 text-gray-600">Cargando...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 fixed top-0 left-0 h-screen bg-white shadow-lg pt-20 p-6 z-50">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">TalentFlow</h2>
                <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
                    <NavLink
                        to="/dashboard/candidatos"
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
                        }
                    >
                        👥 Gestión de Candidatos
                    </NavLink>

                    <NavLink
                        to="/dashboard/reportes"
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
                        }
                    >
                        📊 Reportes
                    </NavLink>

                    {user.rol === "ADMIN" && (
                        <NavLink
                            to="/dashboard/configuracion"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
                            }
                        >
                            ⚙️ Configuración
                        </NavLink>
                    )}

                    {/* 🔙 Volver al Dashboard principal */}
                    <NavLink
                        to="/dashboard"
                        className="mt-8 text-orange-600 hover:underline"
                    >
                        🔙 Volver al Dashboard
                    </NavLink>
                </nav>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="ml-64 w-full p-8 pt-20">{children}</main>
        </div>
    );
};

export default DashboardLayout;
