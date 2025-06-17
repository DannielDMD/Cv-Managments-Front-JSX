import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2, Plus } from "lucide-react";
//Componentes
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import CiudadModal from "../../../../components/dashboard/settings/catalogos/CiudadModal";
import ConfirmacionModal from "../../../../components/dashboard/settings/ConfirmacionModal";
//Servicios
import {
    getCiudades,
    crearCiudad,
    eliminarCiudad,
} from "../../../../services/dashboard-services/settings/catalogos/ciudadesService";


const Ciudades = () => {
    const [ciudades, setCiudades] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [ciudadAEliminar, setCiudadAEliminar] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCiudades = async () => {
        setLoading(true);
        const data = await getCiudades();
        setCiudades(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCiudades();
    }, []);

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
                    <h1 className="text-3xl font-bold text-gray-800">Gestión de Ciudades</h1>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => setModalOpen(true)}
                    >
                        <Plus className="w-4 h-4" /> Agregar
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-500">Cargando ciudades...</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow rounded-xl">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-gray-100">
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
                                        <td className="px-6 py-4">{ciudad.nombre_departamento}</td>
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
            </div>

            <CiudadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCrearCiudad} />
            <ConfirmacionModal
                isOpen={modalEliminar}
                onClose={() => setModalEliminar(false)}
                onConfirm={handleEliminar}
                mensaje="¿Estás seguro de eliminar esta ciudad?"
            />
        </DashboardLayout>
    );
};

export default Ciudades;
