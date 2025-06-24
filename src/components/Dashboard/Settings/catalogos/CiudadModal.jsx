import { useState, useEffect } from "react";
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";
import Modal from "../../../common/Modal";
import { getDepartamentos } from "../../../../services/dashboard-services/settings/catalogos/ciudadesService";

const CiudadModal = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const data = await getDepartamentos();
      setDepartamentos(data || []);
    };
    fetchDepartamentos();
  }, []);

  const handleSubmit = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es requerido";
    if (!idDepartamento) nuevosErrores.departamento = "El departamento es requerido";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onSubmit({
      nombre_ciudad: nombre.trim(),
      id_departamento: parseInt(idDepartamento),
    });

    // Limpiar todo
    setNombre("");
    setIdDepartamento("");
    setErrores({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Ciudad">
      <div className="space-y-4 w-full max-w-md">
        <InputField
          label="Nombre de la ciudad"
          name="nombre_ciudad"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errores.nombre}
        />

        <SelectField
          label="Departamento"
          idKey="value"
          nameKey="label"
          value={idDepartamento}
          onChange={(value) => setIdDepartamento(value)}
          options={departamentos.map((d) => ({
            value: d.id_departamento,
            label: d.nombre_departamento,
          }))}
          error={errores.departamento}
        />

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CiudadModal;
