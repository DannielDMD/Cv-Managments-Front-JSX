import { toast } from "react-toastify";
import useFormContext from "../../context/useFormContext";
import { useState } from "react";
// Componentes
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import AyudaFormulario from "../../components/form/AyudaFormulario";
// Servicios
import {
  getCiudades,
  getCargos,
  getMotivos,
  postCandidate,
  getDepartamentos,
  getCentrosCostos
} from "../../services/form-services/candidateService";
//Utilitarios
import { mostrarErroresBackend } from "../../utils/mostrarErroresBackend";


const ID_OTRO_CARGO = 95;
const ID_OTRO_CENTRO_COSTOS = 37;
const ID_OTRO_MOTIVO_SALIDA = 8;

const PersonalInfo = () => {
  const { formData, updateFormData, setIdCandidatoEnTodo } = useFormContext();
  const [errores, setErrores] = useState({});
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState([]);


  // Manejo de inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;

    const nuevoValor = name === "correo_electronico" ? value.toLowerCase() : value;

    updateFormData("personalInfo", name, nuevoValor);
  };


  const handleSelectChange = (field, value) => {
    updateFormData("personalInfo", field, value);
  };

  const handleDepartamentoChange = async (value) => {
    handleSelectChange("id_departamento", value);
    handleSelectChange("id_ciudad", ""); // Reinicia ciudad

    if (value) {
      const ciudades = await getCiudades(value);
      setCiudadesFiltradas(ciudades);
    } else {
      setCiudadesFiltradas([]);
    }
  };


  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);


  const validarCampos = () => {
    const nuevosErrores = {};
    const datos = formData.personalInfo;


    if (!formData.personalInfo.fecha_nacimiento) {
      nuevosErrores.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
    } else {
      const hoy = new Date();
      const fecha = new Date(formData.personalInfo.fecha_nacimiento);
      const edad = hoy.getFullYear() - fecha.getFullYear() - ((hoy.getMonth() < fecha.getMonth()) || (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate()) ? 1 : 0);

      if (fecha > hoy) {
        nuevosErrores.fecha_nacimiento = "La fecha no puede ser futura.";
      } else if (fecha.getFullYear() < 1930) {
        nuevosErrores.fecha_nacimiento = "La fecha no puede ser anterior a 1930.";
      } else if (edad < 18) {
        nuevosErrores.fecha_nacimiento = "Debes tener al menos 18 años.";
      }
    }

    if (!formData.personalInfo.correo_electronico || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.personalInfo.correo_electronico)) {
      nuevosErrores.correo_electronico = "Ingresa un correo electrónico válido.";
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.nombre_completo || "")) {
      nuevosErrores.nombre_completo = "Solo se permiten letras y espacios.";
    }

    if (!datos.cc || !/^\d{6,10}$/.test(datos.cc)) {
      nuevosErrores.cc = "Debe tener entre 6 y 10 dígitos numéricos.";
    }

    if (!datos.telefono || !/^\d{10}$/.test(datos.telefono)) {
      nuevosErrores.telefono = "El teléfono debe tener exactamente 10 dígitos.";
    }

    if (datos.descripcion_perfil && datos.descripcion_perfil.length > 300) {
      nuevosErrores.descripcion_perfil = "Máximo 300 caracteres permitidos.";
    }

    if (
      datos.nombre_referido &&
      !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(datos.nombre_referido)
    ) {
      nuevosErrores.nombre_referido = "Solo letras y espacios permitidos.";
    }

    return nuevosErrores;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarCampos();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("Por favor corrige los errores antes de enviar.");
      return;
    }

    setErrores({}); // Limpia errores si todo está bien

    const dataToSend = {
      ...formData.personalInfo,
      id_departamento: parseInt(formData.personalInfo.id_departamento) || null,
      id_centro_costos: formData.personalInfo.trabaja_actualmente_joyco === "SI"
        ? parseInt(formData.personalInfo.id_centro_costos)
        : null,
      id_ciudad: parseInt(formData.personalInfo.id_ciudad) || null,
      id_cargo: parseInt(formData.personalInfo.id_cargo) || null,
      trabaja_actualmente_joyco: formData.personalInfo.trabaja_actualmente_joyco === "SI",
      ha_trabajado_joyco: formData.personalInfo.ha_trabajado_joyco === "SI",
      tiene_referido: formData.personalInfo.tiene_referido === "SI",
      nombre_cargo_otro: formData.personalInfo.nombre_cargo_otro || null,
      otro_motivo_salida: formData.personalInfo.otro_motivo_salida || null,
      nombre_centro_costos_otro: formData.personalInfo.nombre_centro_costos_otro || null,
      id_motivo_salida: formData.personalInfo.id_motivo_salida
        ? parseInt(formData.personalInfo.id_motivo_salida)
        : null,
      // ✅ este es el nuevo campo
      acepta_politica_datos: formData.acepta_politica_datos === true,
    };

    try {
      if (formData.id_candidato) {
        toast.info("Ya has registrado la información personal.");
        return;
      }

      const response = await postCandidate(dataToSend);

      if (response?.id_candidato) {
        setIdCandidatoEnTodo(response.id_candidato);
      }

      toast.success("✅ Formulario enviado con éxito.");
    } catch (error) {
      mostrarErroresBackend(error);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg relative">
      <AyudaFormulario
        titulo="Ayuda para Información Personal"
        contenido={`📌 Instrucciones para completar esta sección:

• Este es el primer paso obligatorio del formulario. 
• Asegúrate de ingresar tu nombre completo sin caracteres especiales.
• El correo electrónico debe ser válido.
• La cédula debe tener entre 6 y 10 dígitos numéricos.
• El número de teléfono debe tener exactamente 10 dígitos.
• La fecha de nacimiento no puede ser futura ni anterior al año 1930.
• Una vez completes y envíes esta sección, se generará tu registro como candidato y no podrás volver a la página de inicio.`}
      />

      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>


      <form onSubmit={handleSubmit}>
        <InputField
          label="Nombre Completo"
          name="nombre_completo"
          type="text"
          value={formData.personalInfo.nombre_completo}
          onChange={handleChange}
          error={errores.nombre_completo} />


        <InputField
          label="Correo Electrónico"
          name="correo_electronico"
          type="email"
          value={formData.personalInfo.correo_electronico}
          onChange={handleChange}
          error={errores.correo_electronico} />

        <InputField
          label="C.C."
          name="cc"
          type="text"
          value={formData.personalInfo.cc}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              handleChange(e);
            }
          }}
          maxLength={10}
          error={errores.cc}
        />


        <InputField
          label="Fecha de Nacimiento"
          name="fecha_nacimiento"
          type="date"
          value={formData.personalInfo.fecha_nacimiento}
          onChange={handleChange}
          error={errores.fecha_nacimiento} />


        <InputField
          label="Teléfono"
          name="telefono"
          type="text"
          value={formData.personalInfo.telefono}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              handleChange(e);
            }
          }}
          maxLength={10}
          error={errores.telefono}
        />

        <InputField
          label="Descripción del Perfil"
          name="descripcion_perfil"
          type="textarea"
          value={formData.personalInfo.descripcion_perfil}
          onChange={handleChange}
          error={errores.descripcion_perfil}
        />

        <SelectField
          label="Departamento de Residencia"
          fetchFunction={getDepartamentos}
          idKey="id_departamento"
          nameKey="nombre_departamento"
          value={formData.personalInfo.id_departamento}
          onChange={handleDepartamentoChange}
          isMulti={false}
        />

        {formData.personalInfo.id_departamento && (
          <SelectField
            label="Ciudad de Residencia"
            fetchFunction={() => Promise.resolve(ciudadesFiltradas)}
            idKey="id_ciudad"
            nameKey="nombre_ciudad"
            value={formData.personalInfo.id_ciudad}
            onChange={(value) => handleSelectChange("id_ciudad", value)}
            isMulti={false}
          />
        )}


        <SelectField
          label="Cargo Postulado"
          fetchFunction={getCargos}
          idKey="id_cargo"
          nameKey="nombre_cargo"
          value={formData.personalInfo.id_cargo}
          onChange={(value) => handleSelectChange("id_cargo", value)}
          isMulti={false} // Selección única
        />

        {formData.personalInfo.id_cargo == ID_OTRO_CARGO && (
          <InputField
            label="¿Cuál es el cargo?"
            name="nombre_cargo_otro"
            type="text"
            value={formData.personalInfo.nombre_cargo_otro}
            onChange={handleChange}
          />
        )}

        <p className="text-xs text-gray-500">
          Valor actual de id_cargo: {formData.personalInfo.id_cargo}
        </p>


        <label className="block mb-2">Trabaja actualmente en Joyco?</label>
        <select name="trabaja_actualmente_joyco" value={formData.personalInfo.trabaja_actualmente_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.personalInfo.trabaja_actualmente_joyco === "SI" && (
          <SelectField
            label="Centro de Costos"
            fetchFunction={getCentrosCostos}
            idKey="id_centro_costos"
            nameKey="nombre_centro_costos"
            value={formData.personalInfo.id_centro_costos}
            onChange={(value) => handleSelectChange("id_centro_costos", value)}
            isMulti={false}
          />
        )}

        {formData.personalInfo.id_centro_costos == ID_OTRO_CENTRO_COSTOS && (
          <InputField
            label="¿Cuál es el centro de costos?"
            name="nombre_centro_costos_otro"
            type="text"
            value={formData.personalInfo.nombre_centro_costos_otro}
            onChange={handleChange}
          />
        )}


        <p className="text-xs text-gray-500">
          Valor actual de <strong>id_centro_costos</strong>: {formData.personalInfo.id_centro_costos}
        </p>


        <label className="block mb-2">Ha trabajado en Joyco?</label>
        <select name="ha_trabajado_joyco" value={formData.personalInfo.ha_trabajado_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.personalInfo.ha_trabajado_joyco === "SI" && (
          <SelectField
            label="Motivo de Salida"
            fetchFunction={getMotivos}
            idKey="id_motivo_salida"
            nameKey="descripcion_motivo"
            value={formData.personalInfo.id_motivo_salida}
            onChange={(value) => handleSelectChange("id_motivo_salida", value)}
          />
        )}

        {formData.personalInfo.id_motivo_salida == ID_OTRO_MOTIVO_SALIDA && (
          <InputField
            label="¿Cuál fue el motivo de salida?"
            name="otro_motivo_salida"
            type="text"
            value={formData.personalInfo.otro_motivo_salida}
            onChange={handleChange}
          />
        )}


        <p className="text-xs text-gray-500">
          Valor actual de <strong>id_motivo_salida</strong>: {formData.personalInfo.id_motivo_salida}
        </p>

        <label className="block mb-2">Tiene Referido?</label>
        <select name="tiene_referido" value={formData.personalInfo.tiene_referido} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.personalInfo.tiene_referido === "SI" && (
          <InputField label="Nombre del Referido" name="nombre_referido" type="text" value={formData.personalInfo.nombre_referido} onChange={handleChange} />
        )}

        <button
          type="button"
          onClick={() => setMostrarModalConfirmacion(true)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Enviar
        </button>

      </form>
      {mostrarModalConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro de continuar?</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line mb-4">
              Al enviar esta información:
              • Los datos personales serán almacenados en la base de datos.{"\n"}
              • No podrás modificarlos más adelante.{"\n"}
              • No se permitirá volver al dashboard luego del registro.{"\n"}
              • Asegúrate de que todo esté correcto antes de continuar.
            </p>

            <p className="text-blue-600 text-sm mb-6">
              ¿Ya completaste este formulario antes o necesitas modificar tus datos?{" "}
              <button
                onClick={() => {
                  window.location.href = "/solicitud-eliminacion";
                }}
                className="underline text-blue-800 hover:text-blue-600 font-medium"
              >
                Solicita eliminar tu candidatura aquí.
              </button>
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setMostrarModalConfirmacion(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={(e) => {
                  setMostrarModalConfirmacion(false);
                  handleSubmit(e);
                }}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirmar y Enviar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PersonalInfo;