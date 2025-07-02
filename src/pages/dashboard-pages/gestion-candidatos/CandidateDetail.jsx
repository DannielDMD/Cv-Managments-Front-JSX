import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs; 
//Componentes
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
//Servicios
import { obtenerCandidatoDetalle } from "../../../services/dashboard-services/candidateDetalleService";
//Utilitarios
import { crearHojaDeVidaPDF } from "../../../utils/pdf/crearHojaDeVida";
import { cargarImagenBase64 } from "../../../utils/pdf/cargarImagen";

import {
  User,
  BookOpen,
  Briefcase,
  Brain,
  Settings,
  ArrowLeft,
  Mail,
  FileText,
  Trash2,
} from "lucide-react";






const CandidateDetail = () => {
  const { id } = useParams();
  const location = useLocation(); // ⬅️ para leer los valores de navegación
  const navigate = useNavigate(); // ⬅️ para redireccionar

  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eliminando, setEliminando] = useState(false);

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

  const handleExportPDF = async () => {
    if (!candidato) return;

    const logoBase64 = await cargarImagenBase64("/images/LogoJoyco.png"); // ruta desde public
    const docDefinition = crearHojaDeVidaPDF(candidato, logoBase64);

    pdfMake.createPdf(docDefinition).download(`Hoja_de_vida_${candidato.nombre_completo}.pdf`);
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
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Volver a la lista
          </button>


          <div className="flex gap-2">

            {candidato.correo_electronico && (
              <a
                href={`mailto:${candidato.correo_electronico}?subject=Proceso de selección en Joyco&body=${generarMensajeCorreo()}`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
              >
                <Mail size={16} /> Enviar Correo
              </a>

            )}


            <button
              onClick={handleExportPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <FileText size={16} /> Exportar PDF
            </button>


            <button
              onClick={() => setMostrarModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
            >
              <Trash2 size={16} /> Eliminar
            </button>
          </div>
        </div>


        <div id="detalle-candidato" className="bg-white p-8 shadow-md rounded-lg space-y-8">
          <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
            <FileText size={24} /> Hoja de Vida
          </h1>

          {/* Información Personal */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 flex items-center gap-2">
              <User size={20} /> Información Personal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Nombre Completo:</strong> {candidato.nombre_completo}</p>
              <p><strong>Correo Electrónico:</strong> {candidato.correo_electronico}</p>
              <p><strong>Número de Identificación:</strong> {candidato.cc}</p>
              <p><strong>Fecha de Nacimiento:</strong> {new Date(candidato.fecha_nacimiento).toLocaleDateString()}</p>
              <p><strong>Teléfono de Contacto:</strong> {candidato.telefono}</p>
              <p> <strong> Departamento de Residencia:</strong> {candidato.departamento} </p>
              <p><strong>Ciudad/Municipio de Residencia:</strong> {candidato.ciudad}</p>
              <p className="md:col-span-2"><strong>Perfil:</strong> {candidato.descripcion_perfil || "—"}</p>
              <p><strong>Cargo de Interés:</strong> {candidato.nombre_cargo_otro || candidato.cargo || "—"}</p>

              <p><strong>Estado:</strong> {candidato.estado}</p>
              <p><strong>¿Trabaja en Joyco actualmente?:</strong> {candidato.trabaja_actualmente_joyco ? "Sí" : "No"}</p>

              {candidato.trabaja_actualmente_joyco && (
                <p><strong>Centro de Costos:</strong> {candidato.nombre_centro_costos_otro || candidato.centro_costos || "—"}</p>
              )}



              <p><strong>¿Ha trabajado antes en Joyco?:</strong> {candidato.ha_trabajado_joyco ? "Sí" : "No"}</p>
                                          


              {(candidato.otro_motivo_salida || candidato.motivo_salida) && (
                <p><strong>Motivo de Salida:</strong> {candidato.otro_motivo_salida_candidato || candidato.motivo_salida}</p>
              )}


              {candidato.tiene_referido
                ? <p><strong>Referido:</strong> {candidato.nombre_referido || "—"}</p>
                : <p><strong>Referido:</strong> No</p>}


              <p><strong>Fecha de Registro:</strong> {new Date(candidato.fecha_registro).toLocaleDateString()}</p>
            </div>
          </section>
          {/* Educación */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 flex items-center gap-2">
              <BookOpen size={20} /> Educación
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Nivel Educativo:</strong> {candidato.nivel_educacion}</p>
              <p><strong>Título:</strong> {candidato.nombre_titulo_otro || candidato.titulo || "—"}</p>
              <p><strong>Institución Académica:</strong> {candidato.nombre_institucion_otro || candidato.institucion || "—"}</p>

              <p><strong>Año de Graduación:</strong> {candidato.anio_graduacion || "—"}</p>
              <p><strong>Nivel de Inglés:</strong> {candidato.nivel_ingles}</p>
            </div>
          </section>

          {/* Experiencia */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 flex items-center gap-2">
              <Briefcase size={20} /> Experiencia Laboral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Experiencia Laboral:</strong> {candidato.rango_experiencia}</p>
              <p><strong>Última Empresa Trabajada:</strong> {candidato.ultima_empresa}</p>
              <p><strong>Último Cargo Ejercido:</strong> {candidato.ultimo_cargo}</p>
              <p><strong>Funciones realizadas: </strong>{candidato.funciones} </p>
              <p><strong>Desde:</strong> {candidato.fecha_inicio}</p>
              <p><strong>Hasta:</strong> {candidato.fecha_fin || "Actual"}</p>

            </div>
          </section>

          {/* Conocimientos */}
          <section>
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 flex items-center gap-2">
              <Brain size={20} /> Conocimientos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-1"> <strong> Habilidades Blandas</strong></h3>
                <ul className="list-disc list-inside text-sm">
                  {candidato.habilidades_blandas.length > 0
                    ? candidato.habilidades_blandas.map((hab, i) => <li key={i}>{hab}</li>)
                    : <li>—</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-1"> <strong> Habilidades Técnicas </strong>    </h3>
                <ul className="list-disc list-inside text-sm">
                  {candidato.habilidades_tecnicas.length > 0
                    ? candidato.habilidades_tecnicas.map((hab, i) => <li key={i}>{hab}</li>)
                    : <li>—</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-600 mb-1">  <strong>Herramientas </strong> </h3>
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
            <h2 className="text-2xl font-bold text-blue-700 mb-3 border-b pb-1 flex items-center gap-2">
              <Settings size={20} /> Preferencias y Disponibilidad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>¿Disponibilidad para Viajar?</strong> {candidato.disponibilidad_viajar ? "Sí" : "No"}</p>
              <p><strong>Disponibilidad de Inicio:</strong> {candidato.disponibilidad_inicio}</p>
              <p><strong>Pretensión Salarial:</strong> {candidato.rango_salarial}</p>
              <p><strong>¿Trabaja Actualmente?</strong> {candidato.trabaja_actualmente ? "Sí" : "No"}</p>
              {(candidato.otro_motivo_salida_preferencia || candidato.motivo_salida_laboral) && (
                <p><strong>Motivo de Salida (Preferencias):</strong> {candidato.otro_motivo_salida_preferencia || candidato.motivo_salida_laboral}</p>
              )}

              <p className="md:col-span-2"><strong>Razón para trabajar en Joyco:</strong> {candidato.razon_trabajar_joyco || "—"}</p>
            </div>
          </section>
        </div>

      </div>


      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold text-gray-800">¿Estás seguro?</h2>
            <p className="text-gray-600">
              Esta acción eliminará permanentemente el candidato{" "}
              <strong>{candidato.nombre_completo}</strong> y toda su información
              asociada. No se podrá deshacer.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    setEliminando(true);
                    const res = await fetch(`http://localhost:8000/candidatos/${id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      toast.success("Candidato eliminado correctamente");
                      navigate("/dashboard/candidatos", {
                        state: { paginaAnterior, filtros, search },
                      });
                    } else {
                      const data = await res.json();
                      toast.error(data.detail || "Error al eliminar el candidato");
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("Error inesperado al eliminar");
                  } finally {
                    setEliminando(false);
                    setMostrarModal(false);
                  }
                }}
                disabled={eliminando}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {eliminando ? "Eliminando..." : "Sí, eliminar"}
              </button>

            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default CandidateDetail;
