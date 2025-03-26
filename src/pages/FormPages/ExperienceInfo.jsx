import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getExperiencia, postExperiencia } from "../../services/FormServices/experienceService";
import useFormContext from "../../context/UseFormContext"; // Importa el hook correctamente



const ExperienceInfo = () => {
  const { formData, updateFormData } = useFormContext(); // Obtiene el estado global del formulario
  console.log("ID Candidato:", formData.id_candidato);

  const experienceData = formData.experienceInfo || {};


  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("experienceInfo", { ...formData.experienceInfo, [name]: value });
  };

  const handleSelectChange = (field, value) => {
    updateFormData("experienceInfo", { ...formData.experienceInfo, [field]: value });
  };


  if (!formData.id_candidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }


  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    console.log("Datos originales:", experienceData);

    const formattedData = {
      ...experienceData,
      id_candidato: formData.id_candidato, // 🔹 Usar el ID almacenado
      id_rango_experiencia: parseInt(experienceData.id_rango_experiencia) || null,
    };
    console.log("Datos a enviar:", formattedData);


    console.log("Datos enviados:", formattedData); // <-- Agregar este console.log()

    try {
      await postExperiencia(formattedData); // Enviar datos al backend
      alert("Formulario enviado con éxito");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar el formulario");
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información de Experiencia</h2>
      <form onSubmit={handleSubmit}>

        {/* Select de Nivel de Inglés */}
        <SelectField
          label="Rango de Experiencia"
          fetchFunction={getExperiencia}
          idKey="id_rango_experiencia"
          nameKey="descripcion_rango"
          value={experienceData.id_rango_experiencia || ""}
          onChange={(value) => handleSelectChange("id_rango_experiencia", value)}
        />


        <InputField label="Última Empresa Trabajada" name="ultima_empresa" type="text" value={experienceData.ultima_empresa} onChange={handleChange} />

        <InputField label="ultima cargo ejercido en la empresa" name="ultimo_cargo" type="text" value={experienceData.ultimo_cargo} onChange={handleChange} />

        <InputField label="Mencione las funciones de la empresa, separadas por comas (',')" name="funciones" type="text" value={experienceData.funciones} onChange={handleChange} />

        <InputField label="Fecha de inicio" name="fecha_inicio" type="date" value={experienceData.fecha_inicio} onChange={handleChange} />

        <InputField label="Fecha de finalización" name="fecha_fin" type="date" value={experienceData.fecha_fin} onChange={handleChange} />


        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );

}; // Corchete de finalización de Experience Info

export default ExperienceInfo;