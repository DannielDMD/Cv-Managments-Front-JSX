import { useState, useEffect } from "react";

const Pagination = ({ page, totalPages, totalItems, onPageChange }) => {
  const [inputPage, setInputPage] = useState(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  const handleGoToPage = () => {
    const nueva = Math.max(1, Math.min(totalPages, inputPage));
    if (nueva !== page) {
      onPageChange(nueva);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Total de registros: <span className="font-semibold">{totalItems}</span>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded border text-sm disabled:opacity-50"
        >
          ← Anterior
        </button>

        <span className="text-sm">
          Página <strong>{page}</strong> de {totalPages}
        </span>

        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(Number(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
          className="w-20 border px-2 py-1 rounded text-sm"
        />

        <button
          onClick={handleGoToPage}
          className="px-2 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Ir
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-2 py-1 rounded border text-sm disabled:opacity-50"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
