import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos, getMotivos, postCandidate } from "../../services/FormServices/candidateService";
//import FormContext from "../../context/FormContext";
import { toast } from "react-toastify";
import useFormContext from "../../context/UseFormContext";

const PersonalInfo = () => {
  const { formData, updateFormData, setIdCandidatoEnTodo } = useFormContext();


  // Manejo de inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("personalInfo", name, value);
};

const handleSelectChange = (field, value) => {
    updateFormData("personalInfo", field, value);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Extraer solo la información de personalInfo
  const dataToSend = {
    ...formData.personalInfo,
    id_ciudad: parseInt(formData.personalInfo.id_ciudad) || null,
    id_cargo: parseInt(formData.personalInfo.id_cargo) || null,
    trabaja_actualmente_joyco: formData.personalInfo.trabaja_actualmente_joyco === "SI",
    ha_trabajado_joyco: formData.personalInfo.ha_trabajado_joyco === "SI",
    tiene_referido: formData.personalInfo.tiene_referido === "SI",
    id_motivo_salida: formData.personalInfo.id_motivo_salida ? parseInt(formData.personalInfo.id_motivo_salida) : null,
  };

  console.log("Datos a enviar:", dataToSend);

  try {
    if (formData.id_candidato) {
      toast.info("Ya has registrado la información personal. No puedes volver a enviarla.");
      return;
    }
    const response = await postCandidate(dataToSend);
  
    if (response?.id_candidato) {
      setIdCandidatoEnTodo(response.id_candidato); // ✅ Esto es lo correcto
    }
    
    toast.success("✅ Formulario enviado con éxito.");
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    toast.error("❌ Hubo un error al enviar el formulario.");
  }
  
};
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Nombre Completo" name="nombre_completo" type="text" value={formData.personalInfo.nombre_completo} onChange={handleChange} />
        <InputField label="Correo Electrónico" name="correo_electronico" type="email" value={formData.personalInfo.correo_electronico} onChange={handleChange} />
        <InputField label="C.C." name="cc" type="text" value={formData.personalInfo.cc} onChange={handleChange} />
        <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" value={formData.personalInfo.fecha_nacimiento} onChange={handleChange} />
        <InputField label="Teléfono" name="telefono" type="tel" value={formData.personalInfo.telefono} onChange={handleChange} />
        <InputField label="Descripción del Perfil" name="descripcion_perfil" type="text" value={formData.personalInfo.descripcion_perfil} onChange={handleChange} />

        <SelectField
          label="Ciudad de Residencia"
          fetchFunction={getCiudades}
          idKey="id_ciudad"
          nameKey="nombre_ciudad"
          value={formData.personalInfo.id_ciudad}
          onChange={(value) => handleSelectChange("id_ciudad", value)}
          isMulti={false} // Selección única
        />

        <SelectField
          label="Cargo Postulado"
          fetchFunction={getCargos}
          idKey="id_cargo"
          nameKey="nombre_cargo"
          value={formData.personalInfo.id_cargo}
          onChange={(value) => handleSelectChange("id_cargo", value)}
          isMulti={false} // Selección única
        />

        <label className="block mb-2">Trabaja actualmente en Joyco?</label>
        <select name="trabaja_actualmente_joyco" value={formData.personalInfo.trabaja_actualmente_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        <label className="block mb-2">Ha trabajado en Joyco?</label>
        <select name="ha_trabajado_joyco" value={formData.personalInfo.ha_trabajado_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.personalInfo.ha_trabajado_joyco === "SI" && (
          <SelectField
            label="Motivo de Salida"
            fetchFunction={getMotivos}
            idKey="id_motivo_salida"
            nameKey="descripcion_motivo"
            value={formData.personalInfo.id_motivo_salida}
            onChange={(value) => handleSelectChange("id_motivo_salida", value)}
          />
        )}

        <label className="block mb-2">Tiene Referido?</label>
        <select name="tiene_referido" value={formData.personalInfo.tiene_referido} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.personalInfo.tiene_referido === "SI" && (
          <InputField label="Nombre del Referido" name="nombre_referido" type="text" value={formData.personalInfo.nombre_referido} onChange={handleChange} />
        )}

        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;