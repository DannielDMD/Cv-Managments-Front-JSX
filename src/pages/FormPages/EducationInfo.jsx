import { useEffect, useState, useMemo } from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import {
  getNiveles,
  getTitulosPorNivel,
  getInstituciones,
  getIngles,
} from "../../services/FormServices/educationService";
import useFormContext from "../../context/UseFormContext";
import AyudaFormulario from "../../components/form/AyudaFormulario";


const ID_OTRO_INSTITUCION = 77; // o el ID real para "Otro"

const EducationInfo = () => {
  const { formData, updateFormData } = useFormContext();

  const educationData = formData.educationInfo || {};
  const idCandidato = formData.id_candidato;

  const [errores, setErrores] = useState({});


  const [titulos, setTitulos] = useState([]);

  const nivelesSinTitulo = useMemo(() => new Set([1, 2, 3]), []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("educationInfo", name, value);
  };

  const handleSelectChange = (field, value) => {
    updateFormData("educationInfo", field, value);

    if (field === "id_nivel_educacion" && nivelesSinTitulo.has(value)) {
      updateFormData("educationInfo", "id_nivel_educacion", value);
      updateFormData("educationInfo", "id_titulo", null);
      updateFormData("educationInfo", "anio_graduacion", "");
      updateFormData("educationInfo", "id_institucion", null);
      setTitulos([]);
    }
  };

  useEffect(() => {
    if (
      educationData.id_nivel_educacion &&
      !nivelesSinTitulo.has(educationData.id_nivel_educacion)
    ) {
      getTitulosPorNivel(educationData.id_nivel_educacion).then(setTitulos);
    } else {
      setTitulos([]);
    }
  }, [educationData.id_nivel_educacion, nivelesSinTitulo]);

  // Solo para debug
  useEffect(() => {
    console.log("ID Candidato visible en EducationInfo:", idCandidato);
  }, [idCandidato]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg relative">
      <AyudaFormulario
        titulo="Ayuda para la sección de Educación"
        contenido={`🎓 Instrucciones para completar la sección de Educación:

• Selecciona el nivel educativo más alto que hayas alcanzado.
• El título debe coincidir con el nivel educativo (por ejemplo, no pongas un doctorado si elegiste secundaria).
• La institución debe existir en el listado. Si no la encuentras, contacta con soporte.
• El año de graduación no puede ser futuro ni inválido.
• El nivel de inglés debe ser seleccionado si aplica.
• Esta sección es obligatoria para continuar con el formulario.`}
      />
      <h2 className="text-xl font-semibold mb-4">Información Educacional</h2>
      <div>
        <SelectField
          label="Nivel Educación"
          fetchFunction={getNiveles}
          idKey="id_nivel_educacion"
          nameKey="descripcion_nivel"
          value={educationData.id_nivel_educacion || ""}
          onChange={(value) => handleSelectChange("id_nivel_educacion", value)}
        />
        {!nivelesSinTitulo.has(educationData.id_nivel_educacion) && (
          <>
            <SelectField
              label="Título Obtenido"
              options={titulos}
              idKey="id_titulo"
              nameKey="nombre_titulo"
              value={educationData.id_titulo || ""}
              onChange={(value) => handleSelectChange("id_titulo", value)}
            />
            {(() => {
              const tituloSeleccionado = titulos.find(
                (t) => t.id_titulo === educationData.id_titulo
              );
              return tituloSeleccionado?.nombre_titulo?.toUpperCase() === "OTRO";
            })() && (
                <InputField
                  label="¿Cuál es el título?"
                  name="nombre_titulo_otro"
                  type="text"
                  value={educationData.nombre_titulo_otro || ""}
                  onChange={handleChange}
                />
              )}


            <InputField
              label="Año de Graduación"
              name="anio_graduacion"
              type="number"
              value={educationData.anio_graduacion || ""}
              onChange={(e) => {
                handleChange(e);
                setErrores((prev) => ({ ...prev, anio_graduacion: undefined }));
              }}
              error={errores.anio_graduacion}
            />




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
        {educationData.id_institucion === ID_OTRO_INSTITUCION && (
          <InputField
            label="¿Cuál es la institución académica?"
            name="nombre_institucion_otro"
            type="text"
            value={educationData.nombre_institucion_otro || ""}
            onChange={handleChange}
          />
        )}


        <SelectField
          label="Nivel Inglés"
          fetchFunction={getIngles}
          idKey="id_nivel_ingles"
          nameKey="nivel"
          value={educationData.id_nivel_ingles || ""}
          onChange={(value) => handleSelectChange("id_nivel_ingles", value)}
        />


      </div>
    </div>
  );
};

export default EducationInfo;
