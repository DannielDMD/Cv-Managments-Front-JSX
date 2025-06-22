import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../form/InputField";

const MotivoSalidaModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear",
  descripcionInicial = ""
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (modo === "editar") {
      setDescripcion(descripcionInicial || "");
    } else {
      setDescripcion("");
    }
    setErrores({});
  }, [isOpen, modo, descripcionInicial]);

  const validar = () => {
    const nuevosErrores = {};
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onSubmit({ descripcion_motivo: descripcion.trim() });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modo === "crear" ? "Agregar Motivo de Salida" : "Editar Motivo de Salida"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Descripción del Motivo"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          error={errores.descripcion}
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

export default MotivoSalidaModal;
