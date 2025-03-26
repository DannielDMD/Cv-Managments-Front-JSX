import { useState, useEffect } from "react";
import Select from "react-select";

const SelectField = ({ label, fetchFunction, idKey, nameKey, value, onChange, placeholder = "Seleccione...", isMulti = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction();
        const formattedOptions = data.map((item) => ({
          value: item[idKey], // Accede dinámicamente a la clave de ID
          label: String(item[nameKey]), // Convierte el nombre a string
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [fetchFunction, idKey, nameKey]);

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <Select
        isMulti={isMulti} // Activa selección múltiple si se indica
        value={
          isMulti
            ? options.filter((opt) => value?.includes(opt.value)) // Para múltiples valores
            : options.find((opt) => opt.value === value) || null // Para selección única
        }
        options={isMulti ? options.filter(opt => !value?.includes(opt.value)) : options} // Filtra seleccionados solo en multi
        onChange={(selectedOption) =>
          isMulti
            ? onChange(selectedOption ? selectedOption.map((item) => item.value) : []) // Múltiples valores
            : onChange(selectedOption?.value || null) // Un solo valor
        }
        placeholder={placeholder}
        isClearable
        className="w-full"
      />
    </div>
  );
};

export default SelectField;
