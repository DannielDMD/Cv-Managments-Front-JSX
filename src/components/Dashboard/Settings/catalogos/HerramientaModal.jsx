// src/components/dashboard/settings/catalogos/HerramientaModal.jsx

import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../common/InputField";

const HerramientaModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear",
  nombreInicial = "",
}) => {
  const [nombre, setNombre] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (isOpen) {
      setNombre(nombreInicial || "");
      setErrores({});
    }
  }, [isOpen, nombreInicial]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = "Este campo es obligatorio";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;

    onSubmit({ nombre_herramienta: nombre.trim() });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titulo={modo === "crear" ? "Agregar Herramienta" : "Editar Herramienta"}
    >
      <div className="space-y-4">
        <InputField
          label="Nombre de la Herramienta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errores.nombre}
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

export default HerramientaModal;
