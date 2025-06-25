import React from "react";

const TopTituloCard = ({ titulo, cantidad, totalEducaciones }) => {
  const porcentaje = totalEducaciones
    ? ((cantidad / totalEducaciones) * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-4 text-gray-700">
      <h2 className="text-lg font-semibold mb-2">🎓 Título más registrado</h2>
      <p className="text-xl font-bold">{titulo}</p>
      <p className="text-sm text-gray-500">
        {cantidad} de {totalEducaciones} candidatos ({porcentaje}%)
      </p>
    </div>
  );
};

export default TopTituloCard;
