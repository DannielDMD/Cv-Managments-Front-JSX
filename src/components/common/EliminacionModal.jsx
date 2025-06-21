import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const ConfirmacionModal = ({ visible, onClose, onConfirm, mensaje = "¿Estás seguro?" }) => {
  if (!visible) return null;

  return (
    <Dialog open={visible} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm z-50 relative p-6">
          {/* Cerrar */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>

          <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
            Confirmar Eliminación
          </DialogTitle>

          <p className="text-sm text-gray-600 mb-6">{mensaje}</p>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmacionModal;
