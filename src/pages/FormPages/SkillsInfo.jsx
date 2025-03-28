import React from "react";
import SelectField from "../../components/form/SelectField";
import { getHabilidadesBlandas, getHabilidadesTecnicas, getHerramientas, postConocimientos } from "../../services/FormServices/skillService"; "../../services/FormServices/skillService"

import useFormContext from "../../context/UseFormContext";

const SkillsInfo = () => {
  const { formData, updateFormData } = useFormContext();


  const skillsData = formData.skillsInfo || {};


  const handleSelectChange = (field, value) => {
    if (value.length > 5) {
      alert("Solo puedes seleccionar hasta 5 opciones.");
      return;
    }
  
    updateFormData("skillsInfo", { 
      ...formData.skillsInfo, 
      [field]: value 
    });
  };
  
  
  
/*
  if (!formData.id_candidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }
*/
const handleSubmit = async (e) => {
  e.preventDefault();

  const idCandidato = formData.id_candidato;
  /*
  if (!idCandidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }
*/
  const skillsPayload = [
    ...(formData.skillsInfo.id_habilidad_blanda || []).map(id => ({
      id_candidato: idCandidato,
      tipo_conocimiento: "blanda",
      id_habilidad_blanda: id
    })),
    ...(formData.skillsInfo.id_habilidad_tecnica || []).map(id => ({
      id_candidato: idCandidato,
      tipo_conocimiento: "tecnica",
      id_habilidad_tecnica: id
    })),
    ...(formData.skillsInfo.id_herramienta || []).map(id => ({
      id_candidato: idCandidato,
      tipo_conocimiento: "herramienta",
      id_herramienta: id
    }))
  ];

  console.log("Datos a enviar:", skillsPayload);
  try {
        await postConocimientos(skillsPayload); // Enviar datos al backend
        alert("Formulario enviado con éxito");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Hubo un error al enviar el formulario");
      }
}; //Corchete de cierre de HandleSummit
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Habilidades y Conocimientos</h2>
      <form onSubmit={handleSubmit}>

         {/* Select de Habilidades Blandas */}
        <SelectField
          label="Seleccione máximo 5 habilidades Blandas"
          fetchFunction={getHabilidadesBlandas}
          idKey="id_habilidad_blanda"
          nameKey="nombre_habilidad_blanda"
          value={skillsData.id_habilidad_blanda || ""}
          onChange={(value) => handleSelectChange("id_habilidad_blanda", value)}
          isMulti={true} // Selección múltiple
        />
 {/* Select de Habilidades Tecnicas */}
        <SelectField
          label="Seleccione máximo 5 habilidades Técnicas"
          fetchFunction={getHabilidadesTecnicas}
          idKey="id_habilidad_tecnica"
          nameKey="nombre_habilidad_tecnica"
          value={skillsData.id_habilidad_tecnica || ""}
          onChange={(value) => handleSelectChange("id_habilidad_tecnica", value)}
          isMulti={true} // Selección múltiple
        />

         {/* Select de Herramientas */}
        <SelectField
          label="Seleccione máximo 5 Herramientas"
          fetchFunction={getHerramientas}
          idKey="id_herramienta"
          nameKey="nombre_herramienta"
          value={skillsData.id_herramienta || ""}
          onChange={(value) => handleSelectChange("id_herramienta", value)}
          isMulti={true} // Selección múltiple
        />
        
        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SkillsInfo;
