import { useState } from "react";
import { FiMail, FiTrash2, FiSave, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
//Servicios
import { deleteSolicitudEliminacion } from "../../../services/form-services/solicitudService";

const SolicitudEliminacionRow = ({ solicitud, onEstadoChange, recargarLista }) => {

  const [estado, setEstado] = useState(solicitud.estado);
  const [observacion, setObservacion] = useState(solicitud.observacion_admin || "");
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
  const [mostrarModalCorreo, setMostrarModalCorreo] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [mostrarModalObservacion, setMostrarModalObservacion] = useState(false);

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-CO");
  };

  const handleEliminar = async () => {
    try {
      setEliminando(true);
      await deleteSolicitudEliminacion(solicitud.id);
      toast.success("Solicitud eliminada correctamente");
      setMostrarModalEliminar(false);
      recargarLista(); // ✅ solo recarga, sin intentar PUT

    } catch {
      toast.error("Error al eliminar la solicitud");
    } finally {
      setEliminando(false);
    }
  };

  const handleGuardar = () => {
    if (!solicitud?.id) {
      toast.error("No se puede guardar cambios: solicitud ya fue eliminada.");
      return;
    }
    onEstadoChange(solicitud.id, estado, observacion);
    setMostrarModalGuardar(false);
  };


  const generarMensajeCorreo = () => {
    const base = `De acuerdo con su solicitud de "${solicitud.motivo}", `;
    const ley = `Esto se realiza conforme a lo establecido en la Ley 1581 de 2012 sobre Protección de Datos Personales.`;

    if (estado === "Pendiente") {
      return `${base}esta se encuentra *pendiente*. Porfavor si de aqui a 15 días no recibe respuesta oportuna, comunicarse nuevamente`;
    }

    if (estado === "Rechazada") {
      return `${base}esta ha sido *rechazada*. Esta decisión ha sido registrada por el área de Talento Humano.`;
    }

    if (estado === "Aceptada") {
      return `${base}esta ha sido *aceptada*. Sus datos han sido eliminados del sistema, por lo que podrá volver a registrar su información cuando lo desee. ${ley}`;
    }

    // En caso de que se agreguen más estados en el futuro
    return `${base}esta ha sido procesada por el área de Talento Humano.`;
  };


  const handleEnviarCorreo = () => {
    const asunto = `Respuesta a su solicitud de eliminación`;
    const mensaje = generarMensajeCorreo();
    if (!mensaje) return toast.warning("Debe establecer un estado distinto de 'Pendiente' para generar el mensaje.");
    const body = encodeURIComponent(mensaje);
    window.location.href = `mailto:${solicitud.correo}?subject=${encodeURIComponent(asunto)}&body=${body}`;
    setMostrarModalCorreo(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="p-3 border border-gray-300">{solicitud.nombre_completo}</td>
        <td className="p-3 border border-gray-300">{solicitud.correo}</td>
        <td className="p-3 border border-gray-300">{solicitud.cc}</td>
        <td className="p-3 border border-gray-300">{solicitud.motivo}</td>
        <td className="p-3 border border-gray-300 whitespace-pre-line text-sm text-gray-700">
          {solicitud.descripcion_motivo || <em className="text-gray-400">—</em>}
        </td>
        <td className="p-3 border border-gray-300 min-w-[120px]">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="bg-transparent border border-gray-300 rounded px-2 py-1 text-xs w-full"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Rechazada">Rechazada</option>
            <option value="Aceptada">Aceptada</option>
          </select>
        </td>

        <td className="p-3 border border-gray-300 align-top">
          <div className="flex flex-col items-center gap-1">
            <input
              type="text"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
              placeholder="Observación"
            />

            {observacion.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setMostrarModalObservacion(true)}
                className="text-blue-700 hover:text-blue-900"
                title="Ver observación completa"
              >
                <FiEye className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>



        <td className="p-3 border border-gray-300">{formatearFecha(solicitud.fecha_solicitud)}</td>
        <td className="p-3 border border-gray-300">
          <div className="flex gap-2 flex-wrap">
            <button
              className="btn btn-xs btn-outline btn-success"
              onClick={() => setMostrarModalGuardar(true)}
              title="Guardar cambios"
            >
              <FiSave className="w-4 h-4" />
            </button>
            <button
              className="btn btn-xs btn-outline"
              onClick={() => setMostrarModalCorreo(true)}
              title="Enviar correo"
            >
              <FiMail className="w-4 h-4" />
            </button>
            <button
              className="btn btn-xs btn-outline btn-error"
              onClick={() => setMostrarModalEliminar(true)}
              title="Eliminar solicitud"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Modal Confirmar Guardar */}
      {mostrarModalGuardar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-green-700">Confirmar guardado</h3>
            <p className="mb-4 text-sm">¿Deseas guardar los cambios?</p>
            <div className="flex justify-end gap-2">
              <button className="btn btn-sm bg-red-600 text-white hover:bg-red-700" onClick={() => setMostrarModalGuardar(false)}>Cancelar </button>
              <button
                className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleGuardar}
                disabled={!solicitud?.id}
              >
                Confirmar
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Envío Correo */}
      {mostrarModalCorreo && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-blue-700">Confirmar envío</h3>
            <p className="mb-4 text-sm">¿Deseas enviar correo a <strong>{solicitud.correo}</strong>?</p>
            <div className="flex justify-end gap-2">
              <button className="btn btn-sm bg-red-600 text-white hover:bg-red-700" onClick={() => setMostrarModalCorreo(false)}>Cancelar</button>
              <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700" onClick={handleEnviarCorreo}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminación */}
      {mostrarModalEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2 text-red-700">Confirmar eliminación</h3>
            <p className="mb-4 text-sm">
              ¿Eliminar solicitud de <strong>{solicitud.nombre_completo}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                onClick={() => setMostrarModalEliminar(false)}
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleEliminar}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
      {mostrarModalObservacion && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Observación completa</h3>
            <p className="text-sm text-gray-800 whitespace-pre-line">{observacion}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setMostrarModalObservacion(false)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );

};

export default SolicitudEliminacionRow;
