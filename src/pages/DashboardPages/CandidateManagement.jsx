import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { obtenerResumenCandidatos } from "../../services/DashboardServices/candidateResumenService";
import CandidateTable from "../../components/Dashboard/CandidateTable";

const CandidateManagement = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [search, setSearch] = useState(""); // 🔍 nuevo estado para el input
  const porPagina = 10;

  // 🔄 Carga candidatos con filtro opcional
  const cargarCandidatos = async () => {
    try {
      const data = await obtenerResumenCandidatos(search);
      setCandidatos(data || []);
      setPaginaActual(1); // Reinicia la paginación si cambia la búsqueda
    } catch (error) {
      console.error("Error al obtener candidatos:", error);
    }
  };

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerResumenCandidatos(search);
        setCandidatos(data || []);
        setPaginaActual(1);
      } catch (error) {
        console.error("Error al obtener candidatos:", error);
      }
    };
  
    cargar();
  }, [search]);
  

  const total = candidatos.length;
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const candidatosVisibles = candidatos.slice(inicio, fin);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Candidatos</h1>

      {/* 🔍 Input de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, correo o cargo..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
        />
      </div>

      <CandidateTable
        data={candidatosVisibles}
        total={total}
        paginaActual={paginaActual}
        porPagina={porPagina}
        setPaginaActual={setPaginaActual}
        recargarCandidatos={cargarCandidatos}
      />
    </DashboardLayout>
  );
};

export default CandidateManagement;
