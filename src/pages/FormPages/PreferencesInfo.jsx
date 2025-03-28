import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getDisponibilidades, getRangos, getMotivosSalida, postPreferencias } from "../../services/FormServices/preferencesService";
import useFormContext from "../../context/UseFormContext"; // Importa el hook correctamente




const PreferencesInfo = () => {
  const { formData, updateFormData } = useFormContext(); // Obtiene el estado global del formulario
  // Asegurar que `formData.educationInfo` no sea undefined
  const preferencesData = formData.preferencesInfo || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("preferencesInfo", { ...formData.preferencesInfo, [name]: value });
  };

  const handleSelectChange = (field, value) => {
    updateFormData("preferencesInfo", { ...formData.preferencesInfo, [field]: value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    console.log("Datos originales:", preferencesData);

    const formattedData = {
      ...preferencesData,
      id_candidato: formData.id_candidato, // 🔹 Usar el ID almacenado
      disponibilidad_viajar: preferencesData.disponibilidad_viajar === "SI",
      id_disponibilidad_inicio: parseInt(preferencesData.id_nivel_educacion) || null,
      id_rango_salarial: parseInt(preferencesData.id_titulo) || null,
      trabaja_actualmente: preferencesData.trabaja_actualmente === "SI",
      id_motivo_salida: preferencesData.id_motivo_salida ? parseInt(preferencesData.id_motivo_salida) : null

    };

    console.log("Datos a enviar:", formattedData);


    console.log("Datos enviados:", formattedData); // <-- Agregar este console.log()

    try {
      await postPreferencias(formattedData); // Enviar datos al backend
      alert("Formulario enviado con éxito");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar el formulario");
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Preferencias del Candidato</h2>
      <form onSubmit={handleSubmit}>

        <label className="block mb-2">Disponibilidad para viajar?</label>
        <select name="disponibilidad_viajar" value={preferencesData.disponibilidad_viajar} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        <SelectField
          label="Disponibilidad para trabajar?"
          fetchFunction={getDisponibilidades}
          idKey="id_disponibilidad_inicio"
          nameKey="descripcion_disponibilidad"
          value={preferencesData.id_disponibilidad_inicio || ""}
          onChange={(value) => handleSelectChange("id_disponibilidad_inicio", value)}
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


        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );














}; // Corchete de cierre

export default PreferencesInfo;