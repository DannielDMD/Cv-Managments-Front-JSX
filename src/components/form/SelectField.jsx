import { useState, useEffect } from "react";
import Select from "react-select";

const SelectField = ({
  label,
  fetchFunction,
  options: propOptions,
  idKey,
  nameKey,
  value,
  onChange,
  placeholder = "Seleccione...",
  isMulti = false,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true); // NUEVO

  useEffect(() => {
    const fetchData = async () => {
      if (fetchFunction) {
        try {
          const data = await fetchFunction();
          const formatted = data.map((item) => ({
            value: item[idKey],
            label: String(item[nameKey]),
          }));
          setOptions(formatted);
        } catch (err) {
          console.error("Error cargando opciones:", err);
        }
      } else if (propOptions) {
        const formatted = propOptions.map((item) => ({
          value: item[idKey],
          label: String(item[nameKey]),
        }));
        setOptions(formatted);
      }
      setLoading(false);
    };

    fetchData();
  }, [fetchFunction, propOptions, idKey, nameKey]);

  const selectedOption = isMulti
    ? options.filter((opt) => value?.includes(opt.value))
    : options.find((opt) => opt.value === value) || null;

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <Select
        isMulti={isMulti}
        isLoading={loading}
        value={selectedOption}
        options={options}
        onChange={(selected) =>
          isMulti
            ? onChange(selected ? selected.map((s) => s.value) : [])
            : onChange(selected?.value || null)
        }
        placeholder={placeholder}
        isClearable
        className="w-full"
      />
    </div>
  );
};

export default SelectField;
