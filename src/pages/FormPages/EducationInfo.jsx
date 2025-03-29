import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getNiveles, getTitulosPorNivel, getInstituciones, getIngles, postEducation } from "../../services/FormServices/educationService";
import useFormContext from "../../context/UseFormContext";

const EducationInfo = () => {
  const { formData, updateFormData } = useFormContext();
  const educationData = formData.educationInfo || {};

  // Estado para los títulos filtrados
  const [titulos, setTitulos] = useState([]);

  // Definir niveles que NO requieren título, año ni institución
  const nivelesSinTitulo = useMemo(() => new Set([1, 2, 3]), []); // Ejemplo: 1 = Primaria, 2 = Bachillerato (ajusta según tu backend)

  // Manejar cambios en inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("educationInfo", { ...formData.educationInfo, [name]: value });
  };

  // Manejar cambios en selects
  const handleSelectChange = (field, value) => {
    updateFormData("educationInfo", { ...formData.educationInfo, [field]: value });

    // Si cambia el nivel de educación y es menor a técnico, limpiar valores de los campos ocultos
    if (field === "id_nivel_educacion" && nivelesSinTitulo.has(value)) {
      updateFormData("educationInfo", {
        ...educationData,
        id_nivel_educacion: value,
        id_titulo: null,
        anio_graduacion: "",
        id_institucion: null,
      });
      setTitulos([]); // Limpiar títulos disponibles
    }
  };

  // Obtener títulos cuando cambie el nivel de educación
  useEffect(() => {
    if (educationData.id_nivel_educacion && !nivelesSinTitulo.has(educationData.id_nivel_educacion)) {
      getTitulosPorNivel(educationData.id_nivel_educacion).then(setTitulos);
    } else {
      setTitulos([]);
    }
  }, [educationData.id_nivel_educacion, nivelesSinTitulo]); // 🔹 Agregar nivelesSinTitulo aquí

  
   /*
  if (!formData.id_candidato) {
    alert("Error: No se ha registrado el candidato aún.");
    return;
  }*/
    


  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...educationData,
      id_candidato: formData.id_candidato,
      id_nivel_educacion: parseInt(educationData.id_nivel_educacion) || null,
      id_titulo: nivelesSinTitulo.has(educationData.id_nivel_educacion) ? null : parseInt(educationData.id_titulo) || null,
      anio_graduacion: nivelesSinTitulo.has(educationData.id_nivel_educacion) ? null : educationData.anio_graduacion || null,
      id_institucion: nivelesSinTitulo.has(educationData.id_nivel_educacion) ? null : parseInt(educationData.id_institucion) || null,
      id_nivel_ingles: parseInt(educationData.id_nivel_ingles) || null,
    };
    console.log("Datos a enviar:", formattedData);
    try {
      await postEducation(formattedData);
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
        {/* Nivel de Educación */}
        <SelectField
          label="Nivel Educación"
          fetchFunction={getNiveles}
          idKey="id_nivel_educacion"
          nameKey="descripcion_nivel"
          value={educationData.id_nivel_educacion || ""}
          onChange={(value) => handleSelectChange("id_nivel_educacion", value)}
        />
        {/* Mostrar solo si el nivel de educación NO está en nivelesSinTitulo */}
        {!nivelesSinTitulo.has(educationData.id_nivel_educacion) && (
          <>
            {/* Título Obtenido (Filtrado por nivel de educación) */}
            <SelectField
              label="Título Obtenido"
              options={titulos}
              idKey="id_titulo"
              nameKey="nombre_titulo"
              value={educationData.id_titulo || ""}
              onChange={(value) => handleSelectChange("id_titulo", value)}
            />
            {/* Año de Graduación */}
            <InputField
              label="Año de Graduación"
              name="anio_graduacion"
              type="number"
              value={educationData.anio_graduacion || ""}
              onChange={handleChange}
            />

            {/* Institución Académica */}
            <SelectField
              label="Institución Académica"
              fetchFunction={getInstituciones}
              idKey="id_institucion"
              nameKey="nombre_institucion"
              value={educationData.id_institucion || ""}
              onChange={(value) => handleSelectChange("id_institucion", value)}
            />
          </>
        )}

        {/* Nivel de Inglés */}
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
