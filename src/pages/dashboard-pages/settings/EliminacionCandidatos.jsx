// src/pages/dashboard-pages/settings/EliminacionCandidatos.jsx
import { useEffect, useState, useCallback } from "react";
import { Users, ArrowLeft } from "lucide-react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import CandidateTableDelete from "../../../components/dashboard/settings/CandidateTableDelete";
import Select from "react-select";
import { obtenerResumenCandidatos } from "../../../services/dashboard-services/candidateResumenService";
import { obtenerAniosDisponibles } from "../../../services/dashboard-services/aniosService";
import { eliminarCandidatosPorLote } from "../../../services/dashboard-services/settings/deleteCandidatosService";
import { toast } from "react-toastify"; // ya lo tienes arriba
import { Link } from "react-router-dom";



const meses = [
    { value: 1, label: "Enero" }, { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" }, { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" }, { value: 6, label: "Junio" },
    { value: 7, label: "Julio" }, { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" }, { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" }, { value: 12, label: "Diciembre" },
];

const estados = [
    { value: "EN_PROCESO", label: "En Proceso" },
    { value: "ENTREVISTA", label: "Entrevista" },
    { value: "ADMITIDO", label: "Admitido" },
    { value: "DESCARTADO", label: "Descartado" },
    { value: "CONTRATADO", label: "Contratado" },
];

const EliminacionCandidatos = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const porPagina = 10;
    const [candidatos, setCandidatos] = useState([]);
    const [total, setTotal] = useState(0);
    const [anios, setAnios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [filtros, setFiltros] = useState({
        anio: null,
        mes: null,
        estado: null,
        ordenar_por_fecha: "recientes", // 👈 esto garantiza orden por fecha

    });
    const [seleccionados, setSeleccionados] = useState([]);

    const cargarAnios = async () => {
        try {
            const resultado = await obtenerAniosDisponibles();
            if (Array.isArray(resultado)) {
                const formateados = resultado.map((a) => ({ value: a, label: a.toString() }));
                setAnios(formateados);
            }
        } catch (error) {
            console.error("Error al cargar años:", error);
        }
    };

    const cargarCandidatos = useCallback(async () => {
        try {
            const resultado = await obtenerResumenCandidatos("", filtros, paginaActual, porPagina);
            setCandidatos(resultado.data || []);
            setTotal(resultado.total || 0);
        } catch (error) {
            console.error("Error al cargar candidatos:", error);
        }
    }, [filtros, paginaActual]);

    useEffect(() => {
        cargarAnios();
    }, []);

    useEffect(() => {
        cargarCandidatos();
    }, [cargarCandidatos]);



    const eliminarSeleccionados = async () => {
        try {
            await eliminarCandidatosPorLote(seleccionados);
            toast.success("Candidatos eliminados correctamente.");
            setSeleccionados([]);
            cargarCandidatos();
        } catch (error) {
            console.error("Error al eliminar candidatos:", error);
            toast.error("Ocurrió un error al eliminar los candidatos."); 
        } finally {
            setMostrarModal(false);
        }
    };

    const ModalConfirmacion = ({ visible, onCancel, onConfirm, cantidad }) => {
        if (!visible) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">¿Confirmar eliminación?</h2>
                    <p className="text-sm text-gray-700">
                        ¿Seguro que desea eliminar <strong>{cantidad}</strong> candidato(s)? Esta acción no se puede deshacer.
                    </p>
                    <div className="flex justify-end gap-3 mt-5">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Sí, eliminar
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const handleAbrirModal = () => {
        if (seleccionados.length > 0) {
            setMostrarModal(true);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-6 h-6 text-red-600" />
                    Eliminación de Candidatos
                </h1>
                <Link
                    to="/dashboard/configuracion/"
                    className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1 mt-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver a Configuraciones
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Año:</label>
                    <Select
                        options={anios}
                        value={anios.find((a) => a.value === filtros.anio)}
                        onChange={(selected) => {
                            setFiltros((prev) => ({
                                ...prev,
                                anio: selected?.value || null,
                                mes: null,
                                estado: null,
                            }));
                            setPaginaActual(1);
                        }}
                        placeholder="Seleccione año"
                        isClearable
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mes:</label>
                    <Select
                        options={meses}
                        value={meses.find((m) => m.value === filtros.mes)}
                        onChange={(selected) =>
                            setFiltros((prev) => ({ ...prev, mes: selected?.value || null }))
                        }
                        placeholder="Seleccione mes"
                        isDisabled={!filtros.anio}
                        isClearable
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
                    <Select
                        options={estados}
                        value={estados.find((e) => e.value === filtros.estado)}
                        onChange={(selected) =>
                            setFiltros((prev) => ({ ...prev, estado: selected?.value || null }))
                        }
                        placeholder="Seleccione estado"
                        isDisabled={!filtros.anio}
                        isClearable
                    />
                </div>
            </div>

            <CandidateTableDelete
                data={candidatos}
                total={total}
                paginaActual={paginaActual}
                porPagina={porPagina}
                setPaginaActual={setPaginaActual}
                seleccionados={seleccionados}
                setSeleccionados={setSeleccionados}
                onEliminarSeleccionados={handleAbrirModal}

            />

            <ModalConfirmacion
                visible={mostrarModal}
                cantidad={seleccionados.length}
                onCancel={() => setMostrarModal(false)}
                onConfirm={eliminarSeleccionados}
            />

        </DashboardLayout>
    );
};

export default EliminacionCandidatos;
