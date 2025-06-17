
const InputField = ({ label, name, type, value = "", onChange, error }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className={`border rounded-md p-2 text-gray-700 focus:ring-2 ${
            error ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
          }`}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`border rounded-md p-2 text-gray-700 focus:ring-2 ${
            error ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
          }`}
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
          value={value || ""}
          onChange={onChange}
          autoComplete="off"
          className={`border rounded-md p-2 text-gray-700 focus:ring-2 ${
            error ? "border-red-500 ring-red-500" : "focus:ring-blue-500"
          }`}
        />
      )}

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
