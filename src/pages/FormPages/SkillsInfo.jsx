import React from "react";
import SelectField from "../../components/form/SelectField";
import { getHabilidadesBlandas, getCategoriasHerramientas, getHerramientas, postHabilidadesBlandas,getCategoriasHabilidadesTecnicas, postHerramientas, postHabilidadesTecnicas } from "../../services/FormServices/skillService"; "../../services/FormServices/skillService"

import useFormContext from "../../context/UseFormContext";

const SkillsInfo = () => {
  const { formData, updateFormData } = useFormContext();


  const skillsData = formData.skillsInfo || {};

  const handleSelectChange = (field, value) => {
    updateFormData("skillsInfo", { 
      ...formData.skillsInfo, 
      [field]: value // Ahora puede ser un arreglo
    });
  };
  
  

  if (!formData.id_candidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const idCandidato = formData.id_candidato;
    const idHabilidadBlanda = skillsData.id_habilidad_blanda;
    const idHabilidadTecnica = skillsData.id_habilidad_tecnica;
    const idHerramienta = skillsData.id_herramienta;
  
    if (!idCandidato) {
      alert("Error: No se ha registrado el candidato aún.");
      return;
    }
  
    // Crear objetos solo si tienen valores seleccionados
    const habilidadBlandaData = idHabilidadBlanda ? { id_candidato: idCandidato, id_habilidad_blanda: idHabilidadBlanda } : null;
    const habilidadTecnicaData = idHabilidadTecnica ? { id_candidato: idCandidato, id_habilidad_tecnica: idHabilidadTecnica } : null;
    const herramientaData = idHerramienta ? { id_candidato: idCandidato, id_herramienta: idHerramienta } : null;
  
    console.log("📩 Datos a enviar:", { habilidadBlandaData, habilidadTecnicaData, herramientaData });
  
    try {
      // Ejecutar solo los POST que tengan datos
      await Promise.all([
        habilidadBlandaData && postHabilidadesBlandas(habilidadBlandaData),
        habilidadTecnicaData && postHabilidadesTecnicas(habilidadTecnicaData),
        herramientaData && postHerramientas(herramientaData),
      ]);
  
      alert("Formulario enviado con éxito");
    } catch (error) {
      console.error("❌ Error al enviar los datos:", error);
      alert("Hubo un error al enviar el formulario");
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Habilidades y Conocimientos</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Selecciona una Habilidad Blanda"
          fetchFunction={getHabilidadesBlandas}
          idKey="id_habilidad_blanda"
          nameKey="nombre_habilidad"
          value={skillsData.id_habilidad_blanda || ""}
          onChange={(value) => handleSelectChange("id_habilidad_blanda", value)}
          isMulti={true} // Selección múltiple
        />


<SelectField
  label="Selecciona una Categoría de Herramientas 2.0"
  fetchFunction={getCategoriasHabilidadesTecnicas}
  idKey="id_categoria_habilidad"
  nameKey="nombre_categoria"
  value={skillsData?.id_categoria_habilidad || ""}
  onChange={(value) => handleSelectChange("id_categoria_habilidad", value)}
  isMulti={true} // Selección múltiple
/>



        <SelectField
          label="Selecciona una Categoría de Herramientas"
          fetchFunction={getCategoriasHerramientas}
          idKey="id_categoria_herramienta"
          nameKey="nombre_categoria"
          value={skillsData.id_categoria_herramienta || ""}
          onChange={(value) => handleSelectChange("id_categoria_herramienta", value)}
        />

        <SelectField
          label="Selecciona una Herramientas"
          fetchFunction={getHerramientas}
          idKey="id_herramienta"
          nameKey="nombre_herramienta"
          value={skillsData.id_herramienta || ""}
          onChange={(value) => handleSelectChange("id_herramienta", value)}
        />



        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SkillsInfo;
