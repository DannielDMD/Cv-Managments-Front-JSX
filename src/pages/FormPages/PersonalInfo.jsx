import React, { useState } from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos, getMotivos, postCandidate } from "../../services/candidateService";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    correo_electronico: "",
    cc: "",
    fecha_nacimiento: "",
    telefono: "",
    descripcion_perfil: "",
    trabaja_actualmente_joyco: false,
    ha_trabajado_joyco: false,
    id_motivo_salida: null,
    tiene_referido: false,
    nombre_referido: null,
    id_ciudad: "",
    id_cargo: "",
  });
  // Manejo de inputs normales

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Manejo de selects (conversión de valores)
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /*
    // Manejo de selects tipo SI/NO → true/false
    const handleBooleanChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value === "SI" }));
    };
  */



  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    const formattedData = {
      ...formData,
      id_ciudad: parseInt(formData.id_ciudad),
      id_cargo: parseInt(formData.id_cargo),
      trabaja_actualmente_joyco: formData.trabaja_actualmente_joyco === "SI",
      ha_trabajado_joyco: formData.ha_trabajado_joyco === "SI",
      tiene_referido: formData.tiene_referido === "SI",
      id_motivo_salida: formData.id_motivo_salida ? parseInt(formData.id_motivo_salida) : null
    };

    try {
      // Enviar el objeto formateado
      await postCandidate(formattedData);
      alert("Formulario enviado con éxito");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar el formulario");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Nombre Completo" name="nombre_completo" type="text" value={formData.nombre_completo} onChange={handleChange} />
        <InputField label="Correo Electrónico" name="correo_electronico" type="email" value={formData.correo_electronico} onChange={handleChange} />
        <InputField label="C.C." name="cc" type="text" value={formData.cc} onChange={handleChange} />
        <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} />
        <InputField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} />
        <InputField label="Descripción del Perfil" name="descripcion_perfil" type="text" value={formData.descripcion_perfil} onChange={handleChange} />

        {/* Select de Ciudad de Residencia */}
        <SelectField
          label="Ciudad de Residencia"
          fetchFunction={getCiudades}
          idKey="id_ciudad"
          nameKey="nombre_ciudad"
          value={formData.id_ciudad}
          onChange={(value) => handleSelectChange("id_ciudad", value)}
        />

        {/* Select de Cargo Postulado */}
        <SelectField
          label="Cargo Postulado"
          fetchFunction={getCargos}
          idKey="id_cargo"
          nameKey="nombre_cargo"
          value={formData.id_cargo}
          onChange={(value) => handleSelectChange("id_cargo", value)}
        />



        <label className="block mb-2">Trabaja actualmente en Joyco?</label>
        <select
          name="trabaja_actualmente_joyco"
          value={formData.trabaja_actualmente_joyco}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>



        {/*
        <InputField label="Ha trabajado en Joyco?" name="ha_trabajado_joyco" type="select" 
        value={formData.ha_trabajado_joyco} onChange={handleChange} /> */}

        <label className="block mb-2">Ha trabajado en Joyco</label>
        <select
          name="ha_trabajado_joyco"
          value={formData.ha_trabajado_joyco}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>



        {/* Mostrar Motivo de Salida solo si haTrabajadoJoyco === "Sí" */}
        {formData.ha_trabajado_joyco === "SI" && (
          <SelectField
            label="Motivo de Salida"
            fetchFunction={getMotivos}
            idKey="id_motivo_salida"
            nameKey="descripcion_motivo"
            value={formData.id_motivo_salida}
            onChange={(value) => handleSelectChange("id_motivo_salida", value)}
          />
        )}

        {/*
        <InputField label="Tiene Referido?" 
        name="tiene_referido" type="select" 
        value={formData.tiene_referido} onChange={handleChange} /> */}


        <label className="block mb-2">Tiene Referido?</label>
        <select
          name="tiene_referido"
          value={formData.tiene_referido}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.tiene_referido === "SI" && (
          <InputField label="Nombre del Referido" name="nombre_referido" type="text" value={formData.nombre_referido} onChange={handleChange} />
        )}
        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
