import useFormContext from "../../context/useFormContext"; // Importa el hook correctamente
//Componentes
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import AyudaFormulario from "../../components/form/AyudaFormulario";
//Servicios
import { getExperiencia } from "../../services/form-services/experienceService";

const ExperienceInfo = () => {
  const { formData, updateFormData } = useFormContext(); // Obtiene el estado global del formulario
  console.log("ID Candidato:", formData.id_candidato);

  const experienceData = formData.experienceInfo || {};


  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("experienceInfo", name, value);
  };

  const handleSelectChange = (field, value) => {
    updateFormData("experienceInfo", field, value);
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg relative">
      <AyudaFormulario
        titulo="Ayuda para la sección de Experiencia Laboral"
        contenido={`💼 Instrucciones para completar esta sección:

• Debes diligenciar la empresa más reciente en la que trabajaste.
• El cargo debe reflejar tu rol principal en esa empresa.
• Las funciones deben estar redactadas de forma clara y sin caracteres especiales.
• La fecha de inicio no puede ser futura ni demasiado antigua (antes del año 2000).
• La fecha de finalización debe ser posterior a la de inicio, y no puede ser futura si ya no trabajas allí.
• Esta sección es requerida para continuar con el formulario.`}
      />

      <h2 className="text-xl font-semibold mb-4">Información de Experiencia</h2>
      <div>

        {/* Select de Nivel de Inglés */}
        <SelectField
          label="Rango de Experiencia"
          fetchFunction={getExperiencia}
          idKey="id_rango_experiencia"
          nameKey="descripcion_rango"
          value={experienceData.id_rango_experiencia || ""}
          onChange={(value) => handleSelectChange("id_rango_experiencia", value)}
          isMulti={false} // Selección única

        />
        <InputField label="Última Empresa Trabajada" name="ultima_empresa" type="text" value={experienceData.ultima_empresa} onChange={handleChange} />

        <InputField label="ultima cargo ejercido en la empresa" name="ultimo_cargo" type="text" value={experienceData.ultimo_cargo} onChange={handleChange} />

        <InputField label="Mencione las funciones de la empresa, separadas por comas (',')" name="funciones" type="text" value={experienceData.funciones} onChange={handleChange} />

        <InputField label="Fecha de inicio" name="fecha_inicio" type="date" value={experienceData.fecha_inicio} onChange={handleChange} />

        <InputField label="Fecha de finalización" name="fecha_fin" type="date" value={experienceData.fecha_fin} onChange={handleChange} />
      </div>
    </div>
  );

}; // Corchete de finalización de Experience Info

export default ExperienceInfo;