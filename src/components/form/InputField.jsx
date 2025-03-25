import React from "react";

const InputField = ({ label, name, type, value = "", onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value || ""} // Asegura un valor definido
          onChange={onChange}
          className="border rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ""} // Evita undefined
          onChange={onChange}
          className="border rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;
