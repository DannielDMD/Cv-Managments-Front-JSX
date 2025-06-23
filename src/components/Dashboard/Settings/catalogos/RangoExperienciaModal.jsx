// src/components/dashboard/settings/catalogos/RangoExperienciaModal.jsx

import React, { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../form/InputField";

const RangoExperienciaModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear",
  nombreInicial = "",
}) => {
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (modo === "editar" && nombreInicial) {
      setDescripcion(nombreInicial);
    } else {
      setDescripcion("");
    }
  }, [modo, nombreInicial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descripcion.trim() === "") return;
    onSubmit({ descripcion_rango: descripcion.trim() });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} titulo={modo === "crear" ? "Agregar Rango de Experiencia" : "Editar Rango de Experiencia"}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <InputField
          label="Descripción del Rango"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej: Menos de 1 año, 3-5 años, etc."
        />

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0033A0] text-white rounded hover:bg-blue-800"
          >
            {modo === "crear" ? "Guardar" : "Actualizar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RangoExperienciaModal;
