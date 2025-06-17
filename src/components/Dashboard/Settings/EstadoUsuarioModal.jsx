import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const EstadoUsuarioModal = ({ visible, onClose, onConfirm, usuario }) => {
    if (!visible || !usuario) return null;

    const esActivo = usuario.activo;
    const nuevoEstado = esActivo ? "inactivar" : "activar";

    return (
        <Dialog open={visible} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black opacity-30" />
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm z-50 relative p-6">
                    {/* Botón cerrar */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                        <X className="w-5 h-5" />
                    </button>

                    <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
                        Confirmar cambio de estado
                    </DialogTitle>

                    <p className="text-sm text-gray-600 mb-6">
                        ¿Estás seguro que deseas <span className="font-semibold">{nuevoEstado}</span> al usuario <span className="font-medium text-blue-600">"{usuario.nombre || usuario.correo}"</span>?
                    </p>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                onConfirm(usuario.id, !usuario.activo); // <-- se envía id y el nuevo estado
                                onClose();
                            }}
                            className={`px-4 py-2 rounded text-white text-sm ${esActivo ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {esActivo ? "Inactivar" : "Activar"}
                        </button>

                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default EstadoUsuarioModal;
