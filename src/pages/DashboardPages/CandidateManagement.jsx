import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { obtenerResumenCandidatos } from "../../services/DashboardServices/candidateResumenService";
import CandidateTable from "../../components/Dashboard/CandidateTable";

const CandidateManagement = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 10;

  // 🔄 Nueva función para recargar los candidatos
  const cargarCandidatos = () => {
    obtenerResumenCandidatos()
      .then(setCandidatos)
      .catch((err) => {
        console.error("Error al obtener candidatos:", err);
      });
  };

  useEffect(() => {
    cargarCandidatos();
  }, []);

  const total = candidatos.length;
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const candidatosVisibles = candidatos.slice(inicio, fin);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Candidatos</h1>
      <CandidateTable
        data={candidatosVisibles}
        total={total}
        paginaActual={paginaActual}
        porPagina={porPagina}
        setPaginaActual={setPaginaActual}
        recargarCandidatos={cargarCandidatos} // ✅ pasamos la función al componente
      />
    </DashboardLayout>
  );
};

export default CandidateManagement;
