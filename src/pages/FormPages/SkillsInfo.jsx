import React from "react";
import SelectField from "../../components/form/SelectField";
import { getHabilidadesBlandas, getHabilidadesTecnicas, getHerramientas } from "../../services/FormServices/skillService"; "../../services/FormServices/skillService"
import { toast } from "react-toastify";
import useFormContext from "../../context/UseFormContext";
import AyudaFormulario from "../../components/form/AyudaFormulario";

const SkillsInfo = () => {
  const { formData, updateFormData } = useFormContext();
  console.log("ID Candidato:", formData.id_candidato);

  const skillsData = formData.skillsInfo || {};

  const handleSelectChange = (field, value) => {
    if (value.length > 5) {
      toast.info("Solo puedes seleccionar hasta 5 opciones.");
      return;
    }

    updateFormData("skillsInfo", field, value);

  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg relative">
      <AyudaFormulario
        titulo="Ayuda para la sección de Habilidades y Conocimientos"
        contenido={`🧠 Instrucciones para completar esta sección:

• Selecciona al menos una habilidad blanda, una habilidad técnica o una herramienta que domines.
• Puedes seleccionar múltiples opciones en cada categoría.
• Si no tienes experiencia en herramientas específicas, selecciona solo habilidades blandas o técnicas.
• Esta sección busca conocer tus fortalezas, no es obligatorio llenarla completa, pero sí al menos una categoría.
• Recuerda que esta información será clave para evaluar tu perfil profesional.`}
      />

      <h2 className="text-xl font-semibold mb-4">Habilidades y Conocimientos</h2>
      <div>

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


      </div>
    </div>
  );
};

export default SkillsInfo;
