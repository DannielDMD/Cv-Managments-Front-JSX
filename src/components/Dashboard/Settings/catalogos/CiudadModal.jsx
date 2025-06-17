import { useState, useEffect } from "react";
//Componentes
import InputField from "../../../form/InputField";
import SelectField from "../../../form/SelectField";
import Modal from "../../../common/Modal";
//Servicios
import { getDepartamentos } from "../../../../services/form-services/candidateService";

const CiudadModal = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState("");

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const data = await getDepartamentos();
      setDepartamentos(data);
    };
    fetchDepartamentos();
  }, []);

  const handleSubmit = () => {
    if (nombre && idDepartamento) {
      onSubmit({ nombre_ciudad: nombre, id_departamento: parseInt(idDepartamento) });
      setNombre("");
      setIdDepartamento("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Ciudad">
      <div className="space-y-4">
        <InputField label="Nombre de la ciudad" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <SelectField
          label="Departamento"
          value={idDepartamento}
          onChange={(e) => setIdDepartamento(e.target.value)}
          options={departamentos.map((d) => ({ value: d.id_departamento, label: d.nombre_departamento }))}
        />
        <div className="flex justify-end mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CiudadModal;
