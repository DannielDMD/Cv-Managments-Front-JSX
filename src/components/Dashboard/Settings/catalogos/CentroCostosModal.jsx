import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../common/InputField";

const CentroCostosModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear",
  nombreInicial = ""
}) => {
  const [nombre, setNombre] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (modo === "editar") {
      setNombre(nombreInicial || "");
    } else {
      setNombre("");
    }
    setErrores({});
  }, [isOpen, modo, nombreInicial]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onSubmit({ nombre_centro_costos: nombre.trim() });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modo === "crear" ? "Agregar Centro de Costos" : "Editar Centro de Costos"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Nombre del Centro de Costos"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errores.nombre}
          autoFocus
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[#0033A0] text-white text-sm hover:bg-blue-800"
          >
            {modo === "crear" ? "Crear" : "Guardar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CentroCostosModal;
