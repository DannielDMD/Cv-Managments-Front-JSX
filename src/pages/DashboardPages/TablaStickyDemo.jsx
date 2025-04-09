const TablaStickyDemo = () => {
    const filasDummy = Array.from({ length: 30 }, (_, i) => ({
      nombre: `Candidato ${i + 1}`,
      correo: `candidato${i + 1}@correo.com`,
      telefono: `30000000${i + 1}`,
      ciudad: `Ciudad ${i + 1}`,
      cargo: `Cargo ${i + 1}`,
    }));
  
    return (
      <div className="max-w-6xl mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">🧪 Prueba de Encabezado Sticky</h2>
  
        <div className="max-h-[400px] overflow-y-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 sticky top-0 z-10 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Ciudad</th>
                <th className="px-4 py-2">Cargo</th>
              </tr>
            </thead>
            <tbody>
              {filasDummy.map((fila, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">{fila.nombre}</td>
                  <td className="px-4 py-2">{fila.correo}</td>
                  <td className="px-4 py-2">{fila.telefono}</td>
                  <td className="px-4 py-2">{fila.ciudad}</td>
                  <td className="px-4 py-2">{fila.cargo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default TablaStickyDemo;
  