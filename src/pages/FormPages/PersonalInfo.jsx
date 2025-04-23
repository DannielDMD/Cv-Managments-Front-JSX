import React from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos, getMotivos, postCandidate } from "../../services/FormServices/candidateService";
//import FormContext from "../../context/FormContext";
import { toast } from "react-toastify";
import useFormContext from "../../context/UseFormContext";
import { useState } from "react";


const PersonalInfo = () => {
  const { formData, updateFormData, setIdCandidatoEnTodo } = useFormContext();
  const [errores, setErrores] = useState({});

  // Manejo de inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData("personalInfo", name, value);
  };

  const handleSelectChange = (field, value) => {
    updateFormData("personalInfo", field, value);
  };



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
      id_ciudad: parseInt(formData.personalInfo.id_ciudad) || null,
      id_cargo: parseInt(formData.personalInfo.id_cargo) || null,
      trabaja_actualmente_joyco: formData.personalInfo.trabaja_actualmente_joyco === "SI",
      ha_trabajado_joyco: formData.personalInfo.ha_trabajado_joyco === "SI",
      tiene_referido: formData.personalInfo.tiene_referido === "SI",
      id_motivo_salida: formData.personalInfo.id_motivo_salida
        ? parseInt(formData.personalInfo.id_motivo_salida)
        : null,
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
      console.error("Error detallado:", error);

      if (error.response && error.response.status === 422) {
        const erroresBackend = error.response.data.detail;

        if (Array.isArray(erroresBackend)) {
          // Muestra todos los errores recibidos por FastAPI en un solo toast
          erroresBackend.forEach((err) => {
            toast.error(`Campo: ${err.loc?.[1] || "desconocido"} → ${err.msg}`);
          });
        } else if (typeof erroresBackend === "string") {
          toast.error(erroresBackend);
        } else {
          toast.error("❌ Datos inválidos enviados. Revisa los campos.");
        }
      } else {
        toast.error("❌ Hubo un error inesperado al enviar el formulario.");
      }
    }


  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Nombre Completo" name="nombre_completo" type="text" value={formData.personalInfo.nombre_completo} onChange={handleChange} error={errores.nombre_completo} />
        <InputField label="Correo Electrónico" name="correo_electronico" type="email" value={formData.personalInfo.correo_electronico} onChange={handleChange} error={errores.correo_electronico} />

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


        <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" value={formData.personalInfo.fecha_nacimiento} onChange={handleChange} error={errores.fecha_nacimiento} />


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
          type="text"
          value={formData.personalInfo.descripcion_perfil}
          onChange={handleChange}
          error={errores.descripcion_perfil}
        />


        <SelectField
          label="Ciudad de Residencia"
          fetchFunction={getCiudades}
          idKey="id_ciudad"
          nameKey="nombre_ciudad"
          value={formData.personalInfo.id_ciudad}
          onChange={(value) => handleSelectChange("id_ciudad", value)}
          isMulti={false} // Selección única
        />

        <SelectField
          label="Cargo Postulado"
          fetchFunction={getCargos}
          idKey="id_cargo"
          nameKey="nombre_cargo"
          value={formData.personalInfo.id_cargo}
          onChange={(value) => handleSelectChange("id_cargo", value)}
          isMulti={false} // Selección única
        />

        <label className="block mb-2">Trabaja actualmente en Joyco?</label>
        <select name="trabaja_actualmente_joyco" value={formData.personalInfo.trabaja_actualmente_joyco} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

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

        <label className="block mb-2">Tiene Referido?</label>
        <select name="tiene_referido" value={formData.personalInfo.tiene_referido} onChange={handleChange} className="w-full p-2 border rounded-md">
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>

        {formData.personalInfo.tiene_referido === "SI" && (
          <InputField label="Nombre del Referido" name="nombre_referido" type="text" value={formData.personalInfo.nombre_referido} onChange={handleChange} />
        )}

        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;