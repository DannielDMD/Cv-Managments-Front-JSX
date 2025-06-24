import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Trash2, Plus, ArrowLeft, MapPinCheckInside  } from "lucide-react";
import { Link } from "react-router-dom";
//Componentes
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import CiudadModal from "../../../../components/dashboard/settings/catalogos/CiudadModal";
import ConfirmacionModal from "../../../../components/common/EliminacionModal";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/common/Pagination";


//Servicios
import {
    getCiudades,
    crearCiudad,
    eliminarCiudad,
    getDepartamentos,
} from "../../../../services/dashboard-services/settings/catalogos/ciudadesService";


const Ciudades = () => {
    const [ciudades, setCiudades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [ciudadAEliminar, setCiudadAEliminar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const porPagina = 10;
    const [departamentoFiltro, setDepartamentoFiltro] = useState(null);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [departamentos, setDepartamentos] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            const data = await getDepartamentos();
            setDepartamentos(data || []);
        };
        fetchDepartamentos();
    }, []);

    const fetchCiudades = useCallback(async () => {
        setLoading(true);
        const data = await getCiudades({
            skip: (paginaActual - 1) * porPagina,
            limit: porPagina,
            search: search.trim(),
            id_departamento: departamentoFiltro || null,
        });
        console.log(data);
        setCiudades(data.resultados || []);
        setTotalPaginas(data.total_pages || 1);
        setTotalRegistros(data.total || 0);

        setLoading(false);
    }, [search, paginaActual, departamentoFiltro]);

    useEffect(() => {
        fetchCiudades();
    }, [fetchCiudades]);
    useEffect(() => {
        setPaginaActual(1); // reinicia la paginación si cambia búsqueda
    }, [search, departamentoFiltro]);

    const handleCrearCiudad = async (data) => {
        try {
            await crearCiudad(data);
            toast.success("Ciudad creada correctamente");
            setModalOpen(false);
            fetchCiudades();
        } catch (err) {
            console.error("Error al crear ciudad:", err);
            toast.error("Error al crear ciudad");
        }

    };

    const handleEliminar = async () => {
        try {
            await eliminarCiudad(ciudadAEliminar);
            toast.success("Ciudad eliminada");
            setModalEliminar(false);
            fetchCiudades();
        } catch (err) {
            console.error("Error al eliminar ciudad:", err);
            toast.error("Error al eliminar");
        }

    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <MapPinCheckInside className="w-6 h-6 text-blue-600" />
                            Gestión de Ciudades
                        </h1>
                        <Link
                            to="/dashboard/configuracion/catalogos"
                            className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1 mt-1"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver a Catálogos
                        </Link>
                    </div>
                    <button
                        className="bg-[#0033A0] text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => setModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" /> Agregar
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4 items-end">
                    <div className="w-full md:w-3/5">
                        <SearchInput search={search} setSearch={setSearch} />
                    </div>
                    <div className="w-full md:w-2/5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Departamento:</label>
                        <select
                            className="border rounded px-3 py-2 w-full"
                            value={departamentoFiltro || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setDepartamentoFiltro(value ? parseInt(value) : null);
                                setPaginaActual(1);
                            }}
                        >
                            <option value="">Todos</option>
                            {departamentos.map((dep) => (
                                <option key={dep.id_departamento} value={dep.id_departamento}>
                                    {dep.nombre_departamento}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>



                {loading ? (
                    <p className="text-gray-500">Cargando ciudades...</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow rounded-xl">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-[#0033A0] text-left text-sm text-white">
                                <tr>
                                    <th className="px-6 py-3">Ciudad</th>
                                    <th className="px-6 py-3">Departamento</th>
                                    <th className="px-6 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ciudades.map((ciudad) => (
                                    <tr key={ciudad.id_ciudad} className="border-b">
                                        <td className="px-6 py-4">{ciudad.nombre_ciudad}</td>
                                        <td className="px-6 py-4">{ciudad.departamento?.nombre_departamento || "—"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() => {
                                                    setCiudadAEliminar(ciudad.id_ciudad);
                                                    setModalEliminar(true);
                                                }}
                                            >
                                                <Trash2 className="w-5 h-5 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && totalPaginas > 1 && (
                    <Pagination
                        page={paginaActual}
                        totalPages={totalPaginas}
                        totalItems={totalRegistros}
                        onPageChange={(newPage) => setPaginaActual(newPage)}
                    />

                )}
            </div>

            <CiudadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCrearCiudad} />

            <ConfirmacionModal
                visible={modalEliminar}
                onClose={() => setModalEliminar(false)}
                onConfirm={handleEliminar}
                mensaje="¿Estás seguro de eliminar esta ciudad?"
            />


        </DashboardLayout>
    );
};

export default Ciudades;
