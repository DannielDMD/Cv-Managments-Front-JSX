import React, { useState, useEffect } from "react";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import { getCiudades, getCargos } from "../../services/candidateService"

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    cc: "",
    fechaNacimiento: "",
    telefono: "",
    perfil: "",
    trabajaJoyco: "",
    haTrabajadoJoyco: "",
    tieneReferido: "",
    ciudadResidencia: null, // Se eliminó el tipado incorrecto
    cargoPostulado: null, // Se eliminó el tipado incorrecto
  });

  const [ciudades, setCiudades] = useState([]);
  const [cargos, setCargos] = useState([]);

  // Cargar ciudades al montar el componente
  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const ciudadesData = await getCiudades();
        setCiudades(ciudadesData);
      } catch (error) {
        console.error("Error al cargar las ciudades:", error);
      }
    };

    fetchCiudades();
  }, []);

  // Cargar cargos al montar el componente
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const cargosData = await getCargos(); // Se corrigió el llamado
        setCargos(cargosData);
      } catch (error) {
        console.error("Error al cargar los cargos:", error);
      }
    };

    fetchCargos();
  }, []);

  // Manejar cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar selección de ciudad
  const handleCityChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      ciudadResidencia: selectedOption,
    }));
  };

  // Manejar selección de cargo
  const handleCargoChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      cargoPostulado: selectedOption,
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>

      <form>
        <InputField label="Nombre Completo" name="nombre" type="text" value={formData.nombre} onChange={handleChange} />

        <InputField label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange}/>

        <InputField label="C.C." name="cc"  type="text" value={formData.cc}  onChange={handleChange} />
        
        <InputField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />

        <InputField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} />

        <InputField label="Descripción del Perfil" name="perfil" type="text" value={formData.perfil} onChange={handleChange} />

        <SelectField
          label="Ciudad de Residencia"
          options={ciudades.map((ciudad) => ({
            value: ciudad.id_ciudad,
            label: ciudad.nombre_ciudad,
          }))}
          value={formData.ciudadResidencia}
          onChange={handleCityChange}
        />

        <SelectField
          label="Cargo al que Postula"
          options={cargos.map((cargo) => ({
            value: cargo.id_cargo,
            label: cargo.nombre_cargo,
          }))}
          value={formData.cargoPostulado}
          onChange={handleCargoChange}
        />

        <button
          type="button"
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed"
          disabled
        >
          Enviar Postulación (Deshabilitado)
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
