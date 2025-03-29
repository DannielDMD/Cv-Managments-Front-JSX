import { useState, useEffect } from "react";
import Select from "react-select";

const SelectField = ({ label, fetchFunction, options: propOptions, idKey, nameKey, value, onChange, placeholder = "Seleccione...", isMulti = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchFunction) {
        try {
          const data = await fetchFunction();
          const formattedOptions = data.map((item) => ({
            value: item[idKey], 
            label: String(item[nameKey]), 
          }));
          setOptions(formattedOptions);
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        }
      } else if (propOptions) {
        // Si se pasan opciones directamente, las usa
        setOptions(propOptions.map((item) => ({
          value: item[idKey],
          label: String(item[nameKey]),
        })));
      }
    };

    fetchData();
  }, [fetchFunction, propOptions, idKey, nameKey]);

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <Select
        isMulti={isMulti}
        value={isMulti
          ? options.filter((opt) => value?.includes(opt.value))
          : options.find((opt) => opt.value === value) || null
        }
        options={isMulti ? options.filter(opt => !value?.includes(opt.value)) : options}
        onChange={(selectedOption) =>
          isMulti
            ? onChange(selectedOption ? selectedOption.map((item) => item.value) : [])
            : onChange(selectedOption?.value || null)
        }
        placeholder={placeholder}
        isClearable
        className="w-full"
      />
    </div>
  );
};

export default SelectField;
