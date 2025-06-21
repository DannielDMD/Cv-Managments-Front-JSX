import { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const rolesDisponibles = ["ADMIN", "TH"];

const UsuarioModal = ({ visible, onClose, onSubmit, modo = "crear", usuario = null }) => {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    rol: "TH",
  });

  useEffect(() => {
    if (modo === "editar" && usuario) {
      setFormData({
        correo: usuario.correo || "",
        nombre: usuario.nombre || "",
        rol: usuario.rol || "TH",
      });
    } else {
      setFormData({ correo: "", nombre: "", rol: "TH" });
    }
  }, [modo, usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!visible) return null;

  return (
    <Dialog open={visible} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" />


        <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-50 relative p-6">
          {/* Cerrar */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>

          <DialogTitle className="text-xl font-bold text-gray-800 mb-4">

            {modo === "crear" ? "Nuevo Usuario" : "Editar Usuario"}
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4">




            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                disabled={modo === "editar"}
                autoComplete="off"

              />
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                autoComplete="off"

              />
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              >
                {rolesDisponibles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default UsuarioModal;



