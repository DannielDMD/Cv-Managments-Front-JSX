import { useState, useEffect } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../form/InputField";

const DepartamentoModal = ({
  isOpen,
  onClose,
  onSubmit,
  modo = "crear", // "crear" o "editar"
  nombreInicial = "",
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

  const handleGuardar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    console.log("Nombre a enviar:", nombre.trim());
    onSubmit({ nombre_departamento: nombre.trim() });
    setNombre("");
    setErrores({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modo === "crear" ? "Agregar Departamento" : "Editar Departamento"}
    >
      <div className="space-y-4 w-full max-w-md">
        <InputField
          label="Nombre del departamento"
          name="nombre_departamento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errores.nombre}
        />

        <div className="flex justify-end mt-4">
          <button
            className="bg-[#0033A0] text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DepartamentoModal;
