import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerCandidatoDetalle } from "../../services/DashboardServices/candidateResumenService";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import html2pdf from "html2pdf.js";

const CandidateDetail = () => {
  const { id } = useParams();
  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidato = async () => {
      try {
        const data = await obtenerCandidatoDetalle(id);
        setCandidato(data);
      } catch (error) {
        console.error("Error al cargar detalle del candidato:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidato();
  }, [id]);

  const handleExportPDF = () => {
    const elemento = document.getElementById("detalle-candidato");
    const opciones = {
      margin: 0.5,
      filename: `Hoja_de_vida_${candidato?.nombre_completo || "candidato"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opciones).from(elemento).save();
  };

  if (loading) return <p className="text-center mt-20">Cargando...</p>;
  if (!candidato) return <p className="text-center mt-20">Candidato no encontrado</p>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-end mb-4">
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📄 Exportar PDF
          </button>
        </div>

        <div id="detalle-candidato" className="bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">📄 Hoja de Vida</h1>

          {/* Info Personal */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">🧍 Información Personal</h2>
            <p><strong>Nombre:</strong> {candidato.nombre_completo}</p>
            <p><strong>Correo:</strong> {candidato.correo_electronico}</p>
            <p><strong>Teléfono:</strong> {candidato.telefono}</p>
            <p><strong>Ciudad:</strong> {candidato.ciudad}</p>
            <p><strong>Perfil:</strong> {candidato.descripcion_perfil || "—"}</p>
            <p><strong>Cargo de Interés:</strong> {candidato.cargo}</p>
            <p><strong>Trabaja en Joyco:</strong> {candidato.trabaja_actualmente_joyco ? "Sí" : "No"}</p>
            <p><strong>Ha trabajado antes en Joyco:</strong> {candidato.ha_trabajado_joyco ? "Sí" : "No"}</p>
            {candidato.motivo_salida && <p><strong>Motivo de salida:</strong> {candidato.motivo_salida}</p>}
            {candidato.tiene_referido && <p><strong>Referido:</strong> {candidato.nombre_referido}</p>}
            <p><strong>Fecha de Registro:</strong> {new Date(candidato.fecha_registro).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {candidato.estado}</p>
          </section>

          {/* Educación */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">🎓 Educación</h2>
            <p><strong>Nivel Educativo:</strong> {candidato.nivel_educacion}</p>
            <p><strong>Título:</strong> {candidato.titulo || "—"}</p>
            <p><strong>Institución:</strong> {candidato.institucion || "—"}</p>
            <p><strong>Año de Graduación:</strong> {candidato.anio_graduacion || "—"}</p>
            <p><strong>Nivel de Inglés:</strong> {candidato.nivel_ingles}</p>
          </section>

          {/* Experiencia */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">💼 Experiencia Laboral</h2>
            <p><strong>Experiencia:</strong> {candidato.rango_experiencia}</p>
            <p><strong>Última Empresa:</strong> {candidato.ultima_empresa}</p>
            <p><strong>Último Cargo:</strong> {candidato.ultimo_cargo}</p>
            <p><strong>Funciones:</strong> {candidato.funciones}</p>
            <p><strong>Desde:</strong> {candidato.fecha_inicio}</p>
            <p><strong>Hasta:</strong> {candidato.fecha_fin || "Actual"}</p>
          </section>

          {/* Conocimientos */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">🧠 Conocimientos</h2>
            <p><strong>Habilidades Blandas:</strong> {candidato.habilidades_blandas.join(", ") || "—"}</p>
            <p><strong>Habilidades Técnicas:</strong> {candidato.habilidades_tecnicas.join(", ") || "—"}</p>
            <p><strong>Herramientas:</strong> {candidato.herramientas.join(", ") || "—"}</p>
          </section>

          {/* Preferencias */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">⚙️ Preferencias y Disponibilidad</h2>
            <p><strong>Disponibilidad para Viajar:</strong> {candidato.disponibilidad_viajar ? "Sí" : "No"}</p>
            <p><strong>Disponibilidad de Inicio:</strong> {candidato.disponibilidad_inicio}</p>
            <p><strong>Pretensión Salarial:</strong> {candidato.rango_salarial}</p>
            <p><strong>Trabaja Actualmente:</strong> {candidato.trabaja_actualmente ? "Sí" : "No"}</p>
            {candidato.motivo_salida_preferencia && (
              <p><strong>Motivo de Salida:</strong> {candidato.motivo_salida_preferencia}</p>
            )}
            <p><strong>Razón para trabajar en Joyco:</strong> {candidato.razon_trabajar_joyco || "—"}</p>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDetail;
