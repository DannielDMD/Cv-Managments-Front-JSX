import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getNiveles, getTitulos, getInstituciones, getIngles, postEducation } from "../../services/FormServices/educationService";
import useFormContext from "../../context/UseFormContext"; // Importa el hook correctamente

const EducationInfo = () => {
  const { formData, updateFormData } = useFormContext(); // Obtiene el estado global del formulario
  console.log("ID Candidato:", formData.id_candidato);
  // Asegurar que `formData.educationInfo` no sea undefined
  const educationData = formData.educationInfo || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("educationInfo", { ...formData.educationInfo, [name]: value });
  };
  
  const handleSelectChange = (field, value) => {
    updateFormData("educationInfo", { ...formData.educationInfo, [field]: value });
  };
  
  if (!formData.id_candidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }
  
  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    console.log("Datos originales:", educationData);

    const formattedData = {
      ...educationData,
      id_candidato: formData.id_candidato, // 🔹 Usar el ID almacenado
      id_nivel_educacion: parseInt(educationData.id_nivel_educacion) || null,
      id_titulo: parseInt(educationData.id_titulo) || null,
      id_institucion: parseInt(educationData.id_institucion) || null,
      id_nivel_ingles: parseInt(educationData.id_nivel_ingles) || null,
    };
    console.log("Datos a enviar:", formattedData);


    console.log("Datos enviados:", formattedData); // <-- Agregar este console.log()

    try {
      await postEducation(formattedData); // Enviar datos al backend
      alert("Formulario enviado con éxito");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar el formulario");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Educacional</h2>
      <form onSubmit={handleSubmit}>
        {/* Select de Nivel-Educación */}
        <SelectField
          label="Nivel Educación"
          fetchFunction={getNiveles}
          idKey="id_nivel_educacion"
          nameKey="descripcion_nivel"
          value={educationData.id_nivel_educacion || ""}
          onChange={(value) => handleSelectChange("id_nivel_educacion", value)}
        />

        {/* Select de Título Obtenido */}
        <SelectField
          label="Título Obtenido"
          fetchFunction={getTitulos}
          idKey="id_titulo"
          nameKey="nombre_titulo"
          value={educationData.id_titulo || ""}
          onChange={(value) => handleSelectChange("id_titulo", value)}
        />

        {/* Input Año de Graduación */}
        <InputField
          label="Año de Graduación"
          name="anio_graduacion"
          type="number"
          value={educationData.anio_graduacion || ""}
          onChange={handleChange}
        />

        {/* Select de Institución Académica */}
        <SelectField
          label="Institución Académica"
          fetchFunction={getInstituciones}
          idKey="id_institucion"
          nameKey="nombre_institucion"
          value={educationData.id_institucion || ""}
          onChange={(value) => handleSelectChange("id_institucion", value)}
        />

        {/* Select de Nivel de Inglés */}
        <SelectField
          label="Nivel Inglés"
          fetchFunction={getIngles}
          idKey="id_nivel_ingles"
          nameKey="nivel"
          value={educationData.id_nivel_ingles || ""}
          onChange={(value) => handleSelectChange("id_nivel_ingles", value)}
        />

        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default EducationInfo;
