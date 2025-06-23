// src/components/dashboard/settings/catalogos/HabilidadTecnicaModal.jsx

import { useEffect, useState } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../form/InputField";

const HabilidadTecnicaModal = ({ isOpen, onClose, onSubmit, modo, nombreInicial = "" }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (modo === "editar") {
      setNombre(nombreInicial);
    } else {
      setNombre("");
    }
  }, [modo, nombreInicial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre_habilidad_tecnica: nombre });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modo === "editar" ? "Editar Habilidad Técnica" : "Agregar Habilidad Técnica"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Nombre de la habilidad técnica"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0033A0] text-white rounded hover:bg-blue-800"
          >
            {modo === "editar" ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default HabilidadTecnicaModal;
