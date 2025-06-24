// src/components/dashboard/settings/catalogos/DisponibilidadModal.jsx

import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../common/InputField";

const DisponibilidadModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear",
  descripcionInicial = "",
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (isOpen) {
      setDescripcion(descripcionInicial || "");
      setErrores({});
    }
  }, [isOpen, descripcionInicial]);

  const validar = () => {
    const nuevosErrores = {};
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "Este campo es obligatorio";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;
    onSubmit({ descripcion_disponibilidad: descripcion.trim() });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo={modo === "crear" ? "Agregar Disponibilidad" : "Editar Disponibilidad"}
    >
      <div className="space-y-4">
        <InputField
          label="Descripción de la disponibilidad"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          error={errores.descripcion}
          autoFocus
          autoComplete="off"
        />
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#0033A0] text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            {modo === "crear" ? "Guardar" : "Actualizar"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DisponibilidadModal;
