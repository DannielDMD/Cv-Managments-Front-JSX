import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getDisponibilidades, getRangos, getMotivosSalida} from "../../services/FormServices/preferencesService";
import useFormContext from "../../context/UseFormContext"; // Importa el hook correctamente




const PreferencesInfo = () => {
  const { formData, updateFormData } = useFormContext(); // Obtiene el estado global del formulario
  // Asegurar que `formData.educationInfo` no sea undefined
  console.log("ID Candidato:", formData.id_candidato);

  const preferencesData = formData.preferencesInfo || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("preferencesInfo", name, value);
  };

  const handleSelectChange = (field, value) => {
    updateFormData("preferencesInfo", field, value);
  };


 /*
  if (!formData.id_candidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }*/
 /*
  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const idCandidato = formData.personalInfo.id_candidato;
  
    if (!idCandidato) {
      alert("Error: No se ha registrado el candidato aún.");
      return;
    }
  
    try {
      // EDUCACIÓN
      const nivelesSinTitulo = new Set([1, 2, 3]); // ajusta si es necesario
      const education = {
        ...formData.educationInfo,
        id_candidato: idCandidato,
        id_nivel_educacion: parseInt(formData.educationInfo.id_nivel_educacion) || null,
        id_titulo: nivelesSinTitulo.has(formData.educationInfo.id_nivel_educacion)
          ? null
          : parseInt(formData.educationInfo.id_titulo) || null,
        anio_graduacion: nivelesSinTitulo.has(formData.educationInfo.id_nivel_educacion)
          ? null
          : formData.educationInfo.anio_graduacion || null,
        id_institucion: nivelesSinTitulo.has(formData.educationInfo.id_nivel_educacion)
          ? null
          : parseInt(formData.educationInfo.id_institucion) || null,
        id_nivel_ingles: parseInt(formData.educationInfo.id_nivel_ingles) || null,
      };
  
      // EXPERIENCIA
      const experience = {
        ...formData.experienceInfo,
        id_candidato: idCandidato,
        id_rango_experiencia: parseInt(formData.experienceInfo.id_rango_experiencia) || null,
      };
  
      // CONOCIMIENTOS
      const skillsPayload = [
        ...(formData.skillsInfo.id_habilidad_blanda || []).map((id) => ({
          id_candidato: idCandidato,
          tipo_conocimiento: "blanda",
          id_habilidad_blanda: id,
        })),
        ...(formData.skillsInfo.id_habilidad_tecnica || []).map((id) => ({
          id_candidato: idCandidato,
          tipo_conocimiento: "tecnica",
          id_habilidad_tecnica: id,
        })),
        ...(formData.skillsInfo.id_herramienta || []).map((id) => ({
          id_candidato: idCandidato,
          tipo_conocimiento: "herramienta",
          id_herramienta: id,
        })),
      ];
  
      // PREFERENCIAS
      const preferences = {
        ...formData.preferencesInfo,
        id_candidato: idCandidato,
        disponibilidad_viajar: formData.preferencesInfo.disponibilidad_viajar === "SI",
        id_disponibilidad: parseInt(formData.preferencesInfo.id_disponibilidad) || null,
        id_rango_salarial: parseInt(formData.preferencesInfo.id_rango_salarial) || null,
        trabaja_actualmente: formData.preferencesInfo.trabaja_actualmente === "SI",
        id_motivo_salida: formData.preferencesInfo.id_motivo_salida
          ? parseInt(formData.preferencesInfo.id_motivo_salida)
          : null,
      };
  
      // 🚀 Envío de datos al backend
      await postEducation(education);
      await postExperiencia(experience);
      await postConocimientos(skillsPayload);
      await postPreferencias(preferences);
  
      alert("🎉 Todos los datos se enviaron correctamente");
  
    } catch (error) {
      console.error("❌ Error en el envío final:", error);
      alert("Hubo un error al guardar la información completa");
    }
  };
  
*/
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Preferencias del Candidato</h2>
      <div>

        <label className="block mb-2">Disponibilidad para viajar?</label>
        <select name="disponibilidad_viajar" value={preferencesData.disponibilidad_viajar} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        <SelectField
  label="Disponibilidad para trabajar?"
  fetchFunction={getDisponibilidades}
  idKey="id_disponibilidad"
  nameKey="descripcion_disponibilidad"
  value={preferencesData.id_disponibilidad ? Number(preferencesData.id_disponibilidad) : null} // 🔹 Asegurar que sea un número o null
  onChange={(value) => handleSelectChange("id_disponibilidad", value)}
  isMulti={false}
/>


        <SelectField
          label="Pretensión Salarial?"
          fetchFunction={getRangos}
          idKey="id_rango_salarial"
          nameKey="descripcion_rango"
          value={preferencesData.id_rango_salarial || ""}
          onChange={(value) => handleSelectChange("id_rango_salarial", value)}
          isMulti={false}
        />



        <label className="block mb-2">Trabaja Actualmente?</label>
        <select name="trabaja_actualmente" value={preferencesData.trabaja_actualmente} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {preferencesData.trabaja_actualmente === "SI" && (
          <SelectField
            label="Motivo de Salida"
            fetchFunction={getMotivosSalida}
            idKey="id_motivo_salida"
            nameKey="descripcion_motivo"
            value={preferencesData.id_motivo_salida}
            onChange={(value) => handleSelectChange("id_motivo_salida", value)}
          />
        )}

        <InputField label="Razón para trabajar en Joyco" name="razon_trabajar_joyco" type="text" value={preferencesData.razon_trabajar_joyco} onChange={handleChange} />
      </div>
    </div>
  );

}; // Corchete de cierre

export default PreferencesInfo;