import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { Users, Pencil, Trash2 } from "lucide-react";
import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from "../../services/DashboardServices/userService";
import UsuarioModal from "../../components/Dashboard/Settings/UsuarioModal";
import ConfirmacionModal from "../../components/Dashboard/Settings/ConfirmacionModal";
import EstadoUsuarioModal from "../../components/Dashboard/Settings/EstadoUsuarioModal";
import { toast } from "react-toastify";


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modoModal, setModoModal] = useState("crear");
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [usuarioCambioEstado, setUsuarioCambioEstado] = useState(null);
    const [mostrarEstadoModal, setMostrarEstadoModal] = useState(false);

    const cargarUsuarios = async () => {
        setLoading(true);
        const data = await obtenerUsuarios();
        setUsuarios(data);
        setLoading(false);
    };

    const manejarGuardar = async (datos) => {
        try {
            if (modoModal === "crear") {
                await crearUsuario(datos);
            } else if (modoModal === "editar" && usuarioEditar) {
                await actualizarUsuario(usuarioEditar.id, datos);
            }
            setModalAbierto(false);
            setUsuarioEditar(null);
            await cargarUsuarios();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    const handleEditarClick = (usuario) => {
        setModoModal("editar");
        setUsuarioEditar(usuario);
        setModalAbierto(true);
    };

    const handleEliminarConfirmado = async () => {
        try {
            await eliminarUsuario(usuarioAEliminar.id);
            toast.success("Usuario eliminado correctamente");
            await cargarUsuarios();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            toast.error("Error al eliminar usuario");
        }
    };

    const handleCambioEstado = (usuario, nuevoEstado) => {
        setUsuarioCambioEstado({ ...usuario, nuevoEstado });
        setMostrarEstadoModal(true);
    };

    const confirmarCambioEstado = async (id, nuevoEstado) => {
        try {
            await actualizarUsuario(id, { activo: nuevoEstado });
            toast.success(`Usuario ${nuevoEstado ? "activado" : "inactivado"} correctamente`);
            await cargarUsuarios();
        } catch {
            toast.error("No se pudo actualizar el estado del usuario");
        } finally {
            setMostrarEstadoModal(false);
            setUsuarioCambioEstado(null);
        }
    };


    useEffect(() => {
        cargarUsuarios();
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    Gestión de Usuarios
                </h1>
                <p className="text-gray-600">
                    Administra los usuarios que pueden acceder al sistema.
                </p>

                <div className="flex justify-end">
                    <button
                        className="bg-[#0033A0] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => {
                            setModoModal("crear");
                            setUsuarioEditar(null);
                            setModalAbierto(true);
                        }}
                    >
                        + Nuevo Usuario
                    </button>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {loading ? (
                        <p className="text-gray-500">Cargando usuarios...</p>
                    ) : usuarios.length === 0 ? (
                        <p className="text-gray-500">No hay usuarios registrados.</p>
                    ) : (
                        <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
                            <thead className="bg-[#0033A0] text-left text-sm text-white">

                                <tr>
                                    <th className="px-4 py-3">Correo</th>
                                    <th className="px-4 py-3">Nombre</th>
                                    <th className="px-4 py-3">Rol</th>
                                    <th className="px-4 py-3">Estado</th>
                                    <th className="px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id} className="border-t text-sm text-gray-700">
                                        <td className="px-4 py-2">{usuario.correo}</td>
                                        <td className="px-4 py-2">{usuario.nombre || "—"}</td>
                                        <td className="px-4 py-2">{usuario.rol}</td>
                                        <td className="px-4 py-2">
                                            <select
                                                value={usuario.activo ? "activo" : "inactivo"}
                                                onChange={(e) =>
                                                    handleCambioEstado(usuario, e.target.value === "activo")
                                                }
                                                className={`text-sm px-2 py-1 rounded ${usuario.activo
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                <option value="activo">Activo</option>
                                                <option value="inactivo">Inactivo</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2 text-sm flex items-center gap-3">
                                            <button
                                                onClick={() => handleEditarClick(usuario)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUsuarioAEliminar(usuario);
                                                    setMostrarConfirmacion(true);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <UsuarioModal
                visible={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onSubmit={manejarGuardar}
                modo={modoModal}
                usuario={usuarioEditar}
            />

            <ConfirmacionModal
                visible={mostrarConfirmacion}
                onClose={() => setMostrarConfirmacion(false)}
                onConfirm={handleEliminarConfirmado}
                mensaje={`¿Deseas eliminar al usuario "${usuarioAEliminar?.nombre}"? Esta acción no se puede deshacer.`}
            />
            <EstadoUsuarioModal
                visible={mostrarEstadoModal}
                onClose={() => setMostrarEstadoModal(false)}
                onConfirm={confirmarCambioEstado}
                usuario={usuarioCambioEstado} // ✅ así es como el modal lo espera
            />

        </DashboardLayout>
    );
};

export default Usuarios;
