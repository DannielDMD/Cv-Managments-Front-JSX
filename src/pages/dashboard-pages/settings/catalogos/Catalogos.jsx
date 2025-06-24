import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import {
    MapPin, Building2, Briefcase, UserCog, GraduationCap,
    School, Languages, BadgePercent, ListChecks,
    Settings2, HandHeart, AlarmClock, Wallet,
    Wrench, Cpu, User, BookOpen, ClipboardList, Lightbulb, Clock, ArrowLeft, FolderHeart,
} from "lucide-react";


const Catalogos = () => {
    const navigate = useNavigate();


    // Utilidad para generar una tarjeta de catálogo
    const TarjetaCatalogo = ({ titulo, descripcion, icono, color, ruta }) => {
        const Icono = icono;
        return (
            <div
                onClick={() => navigate(ruta)}
                className="cursor-pointer bg-white rounded-xl shadow p-6 hover:shadow-lg transition flex items-center gap-4"
            >
                <div className={`p-3 rounded-full ${color}`}>
                    <Icono className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
                    <p className="text-sm text-gray-600">{descripcion}</p>
                </div>
            </div>
        );
    };


    return (
        <DashboardLayout>
            <div className="space-y-10">
                <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                     <FolderHeart className="w-6 h-6 text-blue-600" />

                    Catálogos del Sistema
                    </h1>
                <Link
                    to="/dashboard/configuracion"
                    className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1 mt-1"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver a Configuraciones
                </Link>
                <p className="text-gray-600">Administra las listas desplegables del formulario de candidatos.</p>

                {/* Información Personal */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TarjetaCatalogo titulo="Ciudades" descripcion="Gestiona los municipios" icono={MapPin} color="bg-blue-500" ruta="ciudades" />
                        <TarjetaCatalogo titulo="Departamentos" descripcion="Listado de departamentos" icono={Building2} color="bg-sky-600" ruta="departamentos" />
                        <TarjetaCatalogo titulo="Cargos Ofrecidos" descripcion="Cargos disponibles en Joyco" icono={Briefcase} color="bg-emerald-600" ruta="cargos" />
                        <TarjetaCatalogo titulo="Centros de Costos" descripcion="Unidades de negocio internas" icono={UserCog} color="bg-teal-500" ruta="centros-costos" />
                        <TarjetaCatalogo titulo="Motivos de Salida" descripcion="Motivos para terminar una relación laboral" icono={Settings2} color="bg-orange-500" ruta="motivos-salida" />
                    </div>
                </div>

                {/* Educación */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-700">Educación</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TarjetaCatalogo titulo="Niveles Educativos" descripcion="Primaria, secundaria, superior..." icono={GraduationCap} color="bg-purple-500" ruta="niveles-educacion" />
                        <TarjetaCatalogo titulo="Títulos Obtenidos" descripcion="Ingeniero, técnico, tecnólogo..." icono={BadgePercent} color="bg-violet-600" ruta="titulos-obtenidos" />
                        <TarjetaCatalogo titulo="Instituciones Académicas" descripcion="Universidades e institutos" icono={School} color="bg-indigo-600" ruta="instituciones" />
                        <TarjetaCatalogo titulo="Nivel de Inglés" descripcion="Básico, intermedio, avanzado" icono={Languages} color="bg-cyan-600" ruta="nivel-ingles" />
                    </div>
                </div>

                {/* Experiencia */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <ClipboardList className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-700">Experiencia</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TarjetaCatalogo titulo="Rangos de Experiencia" descripcion="0-1 años, 1-3, más de 5..." icono={ListChecks} color="bg-yellow-500" ruta="rangos-experiencia" />
                    </div>
                </div>

                {/* Conocimientos */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-700">Conocimientos</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TarjetaCatalogo titulo="Habilidades Técnicas" descripcion="Conocimientos técnicos específicos" icono={Wrench} color="bg-pink-600" ruta="habilidades-tecnicas" />
                        <TarjetaCatalogo titulo="Habilidades Blandas" descripcion="Comunicación, liderazgo, etc." icono={HandHeart} color="bg-rose-600" ruta="habilidades-blandas" />
                        <TarjetaCatalogo titulo="Herramientas" descripcion="Software y utilidades usadas" icono={Cpu} color="bg-fuchsia-600" ruta="herramientas" />
                    </div>
                </div>

                {/* Preferencias */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-700">Preferencias y Disponibilidad</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TarjetaCatalogo titulo="Disponibilidad para Iniciar" descripcion="Inmediata, 15 días, 30 días..." icono={AlarmClock} color="bg-gray-600" ruta="disponibilidad" />
                        <TarjetaCatalogo titulo="Rangos Salariales" descripcion="Aspiración salarial mensual" icono={Wallet} color="bg-zinc-700" ruta="rangos-salariales" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Catalogos;
