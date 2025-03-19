import React, { useState } from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos } from "../../services/candidateService";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    cc: "",
    fechaNacimiento: "",
    telefono: "",
    perfil: "",
    trabajaJoyco: "",
    haTrabajadoJoyco: "",
    tieneReferido: "",
    ciudadResidencia: null,
    cargoPostulado: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
      <form>
        <InputField label="Nombre Completo" name="nombre" type="text" value={formData.nombre} onChange={handleChange} />
        <InputField label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />
        <InputField label="C.C." name="cc" type="text" value={formData.cc} onChange={handleChange} />
        <InputField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
        <InputField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} />
        <InputField label="Descripción del Perfil" name="perfil" type="text" value={formData.perfil} onChange={handleChange} />

        {/* Select de Ciudad de Residencia */}
        <SelectField
          label="Ciudad de Residencia"
          fetchFunction={getCiudades}
          idKey="id_ciudad"
          nameKey="nombre_ciudad"
          value={formData.ciudadResidencia}
          onChange={(value) => handleSelectChange("ciudadResidencia", value)}
        />

        {/* Select de Cargo Postulado */}
        <SelectField
          label="Cargo Postulado"
          fetchFunction={getCargos}
          idKey="id_cargo"
          nameKey="nombre_cargo"
          value={formData.cargoPostulado}
          onChange={(value) => handleSelectChange("cargoPostulado", value)}
        />

        <button
          type="button"
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed"
          disabled
        >
          Enviar Postulación (Deshabilitado)
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
