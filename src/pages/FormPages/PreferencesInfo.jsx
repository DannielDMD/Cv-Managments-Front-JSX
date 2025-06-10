import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getDisponibilidades, getRangos, getMotivosSalida } from "../../services/FormServices/preferencesService";
import useFormContext from "../../context/UseFormContext"; // Importa el hook correctamente
import AyudaFormulario from "../../components/form/AyudaFormulario";


const ID_OTRO_MOTIVO_SALIDA = 8; // según tu estructura

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
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg relative">
      <AyudaFormulario
        titulo="Ayuda para la sección de Preferencias y Disponibilidad"
        contenido={`⚙️ Instrucciones para completar esta sección:

• Indica si estás disponible para viajar en caso de que el trabajo lo requiera.
• Selecciona en qué momento estarías disponible para iniciar labores (inmediato, en 15 días, etc.).
• Especifica tu rango salarial esperado.
• Si estás trabajando actualmente, indícalo con sinceridad.
• Si seleccionaste que trabajaste anteriormente, deberás indicar un motivo de salida.
• Escribe brevemente por qué te interesa trabajar en Joyco.
• Esta información será utilizada para verificar compatibilidad con vacantes.`}
      />

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
        {preferencesData.id_motivo_salida === ID_OTRO_MOTIVO_SALIDA && (
          <InputField
            label="¿Cuál fue el motivo de salida?"
            name="otro_motivo_salida"
            type="text"
            value={preferencesData.otro_motivo_salida || ""}
            onChange={handleChange}
          />
        )}

        <InputField label="Razón para trabajar en Joyco" name="razon_trabajar_joyco" type="text" value={preferencesData.razon_trabajar_joyco} onChange={handleChange} />
      </div>
    </div>
  );

}; // Corchete de cierre

export default PreferencesInfo;