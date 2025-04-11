import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // ⬅️ añadimos useLocation y useNavigate
import { obtenerCandidatoDetalle } from "../../services/DashboardServices/candidateResumenService";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import html2pdf from "html2pdf.js";

const CandidateDetail = () => {
  const { id } = useParams();
  const location = useLocation(); // ⬅️ para leer los valores de navegación
  const navigate = useNavigate(); // ⬅️ para redireccionar

  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true);

  const paginaAnterior = location.state?.paginaAnterior || 1;
  const filtros = location.state?.filtros || {};
  const search = location.state?.search || "";

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

  const generarMensajeCorreo = () => {
    const nombre = candidato.nombre_completo;

    switch (candidato.estado) {
      case "ADMITIDO":
        return `Hola ${nombre},%0D%0A%0D%0ATe informamos con gusto que has sido admitido en el proceso de selección de Joyco. En breve te estaremos contactando para los siguientes pasos.%0D%0A%0D%0A¡Felicitaciones!`;

      case "DESCARTADO":
        return `Hola ${nombre},%0D%0A%0D%0AAgradecemos tu interés en postularte a Joyco. Tras revisar tu perfil, lamentamos informarte que en esta ocasión no fuiste seleccionado.%0D%0A%0D%0ATe deseamos muchos éxitos en tus próximos desafíos.`;

      case "ENTREVISTA":
        return `Hola ${nombre},%0D%0A%0D%0ATe contactamos desde Joyco para coordinar una entrevista como parte del proceso de selección. Pronto nos comunicaremos contigo con los detalles.%0D%0A%0D%0A¡Gracias por tu interés!`;

      case "CONTRATADO":
        return `Hola ${nombre},%0D%0A%0D%0A¡Bienvenido a Joyco! Nos alegra confirmarte que has sido contratado. En los próximos días recibirás más información del proceso de vinculación.%0D%0A%0D%0A¡Nos emociona que te unas a nuestro equipo!`;

      default:
        return `Hola ${nombre},%0D%0A%0D%0AQueremos contactarte respecto a tu postulación en Joyco. Te compartiremos información adicional en breve.%0D%0A%0D%0AGracias por tu interés.`;
    }
  };


  const handleVolver = () => {
    navigate("/dashboard/candidatos", {
      state: {
        paginaAnterior,
        filtros,
        search,
      },
    });
  };

  if (loading) return <p className="text-center mt-20">Cargando...</p>;
  if (!candidato) return <p className="text-center mt-20">Candidato no encontrado</p>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* Botones de acciones */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <button
            onClick={handleVolver}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            🔙 Volver a la lista
          </button>

          <div className="flex gap-2">
            
            {candidato.correo_electronico && (
              <a
                href={`mailto:${candidato.correo_electronico}?subject=Proceso de selección en Joyco&body=${generarMensajeCorreo()}`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                📧 Enviar Correo
              </a>
            )}


            <button
              onClick={handleExportPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              📄 Exportar PDF
            </button>



          </div>
        </div>


        <div id="detalle-candidato" className="bg-white p-8 shadow-md rounded-lg space-y-8">
          <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-2 mb-6">📄 Hoja de Vida</h1>

          {/* Información Personal */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1">🧍 Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Nombre:</strong> {candidato.nombre_completo}</p>
              <p><strong>Correo:</strong> {candidato.correo_electronico}</p>
              <p><strong>Teléfono:</strong> {candidato.telefono}</p>
              <p><strong>Ciudad:</strong> {candidato.ciudad}</p>
              <p className="md:col-span-2"><strong>Perfil:</strong> {candidato.descripcion_perfil || "—"}</p>
              <p><strong>Cargo de Interés:</strong> {candidato.cargo}</p>
              <p><strong>Estado:</strong> {candidato.estado}</p>
              <p><strong>Trabaja en Joyco:</strong> {candidato.trabaja_actualmente_joyco ? "Sí" : "No"}</p>
              <p><strong>Ha trabajado antes en Joyco:</strong> {candidato.ha_trabajado_joyco ? "Sí" : "No"}</p>
              {candidato.motivo_salida && <p><strong>Motivo de salida:</strong> {candidato.motivo_salida}</p>}
              {candidato.tiene_referido && <p><strong>Referido:</strong> {candidato.nombre_referido}</p>}
              <p><strong>Fecha de Registro:</strong> {new Date(candidato.fecha_registro).toLocaleDateString()}</p>
            </div>
          </section>

          {/* Educación */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1">🎓 Educación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Nivel Educativo:</strong> {candidato.nivel_educacion}</p>
              <p><strong>Título:</strong> {candidato.titulo || "—"}</p>
              <p><strong>Institución:</strong> {candidato.institucion || "—"}</p>
              <p><strong>Año de Graduación:</strong> {candidato.anio_graduacion || "—"}</p>
              <p><strong>Nivel de Inglés:</strong> {candidato.nivel_ingles}</p>
            </div>
          </section>

          {/* Experiencia */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1">💼 Experiencia Laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Experiencia:</strong> {candidato.rango_experiencia}</p>
              <p><strong>Última Empresa:</strong> {candidato.ultima_empresa}</p>
              <p><strong>Último Cargo:</strong> {candidato.ultimo_cargo}</p>
              <p><strong>Desde:</strong> {candidato.fecha_inicio}</p>
              <p><strong>Hasta:</strong> {candidato.fecha_fin || "Actual"}</p>
              <p className="md:col-span-2"><strong>Funciones:</strong> {candidato.funciones}</p>
            </div>
          </section>

          {/* Conocimientos */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1">🧠 Conocimientos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-1">Habilidades Blandas</h3>
                <ul className="list-disc list-inside text-sm">
                  {candidato.habilidades_blandas.length > 0
                    ? candidato.habilidades_blandas.map((hab, i) => <li key={i}>{hab}</li>)
                    : <li>—</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-1">Habilidades Técnicas</h3>
                <ul className="list-disc list-inside text-sm">
                  {candidato.habilidades_tecnicas.length > 0
                    ? candidato.habilidades_tecnicas.map((hab, i) => <li key={i}>{hab}</li>)
                    : <li>—</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-1">Herramientas</h3>
                <ul className="list-disc list-inside text-sm">
                  {candidato.herramientas.length > 0
                    ? candidato.herramientas.map((herr, i) => <li key={i}>{herr}</li>)
                    : <li>—</li>}
                </ul>
              </div>
            </div>
          </section>

          {/* Preferencias */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1">⚙️ Preferencias y Disponibilidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Disponibilidad para Viajar:</strong> {candidato.disponibilidad_viajar ? "Sí" : "No"}</p>
              <p><strong>Disponibilidad de Inicio:</strong> {candidato.disponibilidad_inicio}</p>
              <p><strong>Pretensión Salarial:</strong> {candidato.rango_salarial}</p>
              <p><strong>Trabaja Actualmente:</strong> {candidato.trabaja_actualmente ? "Sí" : "No"}</p>
              {candidato.motivo_salida_preferencia && (
                <p><strong>Motivo de Salida:</strong> {candidato.motivo_salida_preferencia}</p>
              )}
              <p className="md:col-span-2"><strong>Razón para trabajar en Joyco:</strong> {candidato.razon_trabajar_joyco || "—"}</p>
            </div>
          </section>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CandidateDetail;
