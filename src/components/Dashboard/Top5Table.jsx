// src/components/Dashboard/Top5Table.jsx
import React from "react";

const Top5Table = ({ titulo, items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white shadow rounded-xl p-4 text-center border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{titulo}</h3>
        <p className="text-gray-400 text-sm">Sin datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{titulo}</h3>
      <table className="w-full text-sm text-gray-600">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t border-gray-100">
              <td className="py-2">{index + 1}.</td>
              <td className="py-2 w-full">{item.label}</td>
              <td className="py-2 text-right font-medium">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Top5Table;
