import useFormContext from "../../context/useFormContext";
//Componentes
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import AyudaFormulario from "../../components/form/AyudaFormulario";
//Servicios
import { getDisponibilidades, getRangos, getMotivosSalida } from "../../services/form-services/preferencesService";

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
• Especifica tu rango salarial esperado dentro de la Lista Desplegable.
• Si estás trabajando actualmente, indícalo con sinceridad.
• Si seleccionaste que trabajaste anteriormente, deberás indicar un motivo de salida.
• Escribe brevemente por qué te interesa trabajar en Joyco.
• Esta información será utilizada para verificar compatibilidad con vacantes.`}
      />

      <h2 className="text-xl font-semibold mb-4">Preferencias del Candidato</h2>
      <div>

        <InputField
          label="¿Está disponible para viajar?"
          name="disponibilidad_viajar"
          type="select"
          value={preferencesData.disponibilidad_viajar}
          onChange={handleChange}
        />
        <SelectField
          label="¿Disponibilidad para trabajar?"
          fetchFunction={getDisponibilidades}
          idKey="id_disponibilidad"
          nameKey="descripcion_disponibilidad"
          value={preferencesData.id_disponibilidad ? Number(preferencesData.id_disponibilidad) : null} // 🔹 Asegurar que sea un número o null
          onChange={(value) => handleSelectChange("id_disponibilidad", value)}
          isMulti={false}
        />


        <SelectField
          label="¿Pretensión salarial?"
          fetchFunction={getRangos}
          idKey="id_rango_salarial"
          nameKey="descripcion_rango"
          value={preferencesData.id_rango_salarial || ""}
          onChange={(value) => handleSelectChange("id_rango_salarial", value)}
          isMulti={false}
        />

        <InputField
          label="¿Actualmente se encuentra trabajando?"
          name="trabaja_actualmente"
          type="select"
          value={preferencesData.trabaja_actualmente}
          onChange={handleChange}
        />


        {preferencesData.trabaja_actualmente === "SI" && (
          <SelectField
            label="¿Cuál es el motivo por el que desea cambiar de empleo?"
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

        <InputField label="¿Qué lo motiva a trabajar en Joyco Consultores S.A.S.?" name="razon_trabajar_joyco" type="textarea" value={preferencesData.razon_trabajar_joyco} onChange={handleChange} />
      </div>
    </div>
  );

}; // Corchete de cierre

export default PreferencesInfo;