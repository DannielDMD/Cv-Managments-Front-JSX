import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos, getMotivos, postCandidate } from "../../services/FormServices/candidateService";
import FormContext from "../../context/FormContext";
import useFormContext from "../../context/UseFormContext";
const PersonalInfo = () => {
  const { formData, updateFormData } = useFormContext(FormContext);

  // Manejo de inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  // Manejo de selects
  const handleSelectChange = (field, value) => {
    updateFormData(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await postCandidate(formattedData);
  
      if (response && response.id_candidato) {
        updateFormData("id_candidato", response.id_candidato);
      }
  
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

        <SelectField
          label="Ciudad de Residencia"
          fetchFunction={getCiudades}
          idKey="id_ciudad"
          nameKey="nombre_ciudad"
          value={formData.id_ciudad}
          onChange={(value) => handleSelectChange("id_ciudad", value)}
        />

        <SelectField
          label="Cargo Postulado"
          fetchFunction={getCargos}
          idKey="id_cargo"
          nameKey="nombre_cargo"
          value={formData.id_cargo}
          onChange={(value) => handleSelectChange("id_cargo", value)}
        />

        <label className="block mb-2">Trabaja actualmente en Joyco?</label>
        <select name="trabaja_actualmente_joyco" value={formData.trabaja_actualmente_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        <label className="block mb-2">Ha trabajado en Joyco?</label>
        <select name="ha_trabajado_joyco" value={formData.ha_trabajado_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

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

        <label className="block mb-2">Tiene Referido?</label>
        <select name="tiene_referido" value={formData.tiene_referido} onChange={handleChange} className="w-full p-2 border rounded-md">
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
