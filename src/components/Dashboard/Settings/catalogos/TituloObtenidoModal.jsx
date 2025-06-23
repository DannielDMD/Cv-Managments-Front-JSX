import { useEffect, useState } from "react";
import Modal from "../../../common/Modal";
import InputField from "../../../form/InputField";
import SelectField from "../../../form/SelectField";
import { getNivelesEducacion } from "../../../../services/dashboard-services/settings/catalogos/nivelesEducacionService";

const TituloObtenidoModal = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [idNivelEducacion, setIdNivelEducacion] = useState("");
  const [niveles, setNiveles] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchNiveles = async () => {
      const data = await getNivelesEducacion({ skip: 0, limit: 100 });
      setNiveles(data.resultados || []);
    };
    fetchNiveles();
  }, []);

  const handleSubmit = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es requerido";
    if (!idNivelEducacion) nuevosErrores.nivel = "El nivel educativo es requerido";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onSubmit({
      nombre_titulo: nombre.trim(),
      id_nivel_educacion: parseInt(idNivelEducacion),
    });

    // limpiar
    setNombre("");
    setIdNivelEducacion("");
    setErrores({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Título">
      <div className="space-y-4 w-full max-w-md">
        <InputField
          label="Nombre del título"
          name="nombre_titulo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          error={errores.nombre}
        />

        <SelectField
          label="Nivel educativo"
          idKey="value"
          nameKey="label"
          value={idNivelEducacion}
          onChange={(value) => setIdNivelEducacion(value)}
          options={niveles.map((nivel) => ({
            value: nivel.id_nivel_educacion,
            label: nivel.descripcion_nivel,
          }))}
          error={errores.nivel}
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

export default TituloObtenidoModal;
