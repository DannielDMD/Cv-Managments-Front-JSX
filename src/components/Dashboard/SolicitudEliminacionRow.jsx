// src/components/Dashboard/SolicitudEliminacionRow.jsx
import { useState } from "react";
import { FiMail, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { deleteSolicitudEliminacion } from "../../services/FormServices/solicitudService";

const SolicitudEliminacionRow = ({ solicitud, onEstadoChange }) => {
  const [estado, setEstado] = useState(solicitud.estado);
  const [observacion, setObservacion] = useState(solicitud.observacion_admin || "");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const handleActualizar = () => {
    onEstadoChange(solicitud.id, estado, observacion);
  };

  const handleEnviarCorreo = () => {
    window.location.href = `mailto:${solicitud.correo}?subject=Respuesta solicitud eliminación`;
  };

  const handleEliminar = async () => {
    try {
      setEliminando(true);
      await deleteSolicitudEliminacion(solicitud.id);
      toast.success("Solicitud eliminada correctamente");
      setMostrarModal(false);
      onEstadoChange(); // reutilizamos para recargar desde padre
    } catch {
      toast.error("Error al eliminar la solicitud");
    } finally {
      setEliminando(false);
    }
  };
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };
  
  return (
    <>
      <tr>
        <td>{solicitud.nombre_completo}</td>
        <td>{solicitud.correo}</td>
        <td>{solicitud.cc}</td>
        <td>{solicitud.motivo}</td>
        <td>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="select select-sm select-bordered"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Rechazada">Rechazada</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            className="input input-sm input-bordered"
          />
        </td>
        <td>{formatearFecha(solicitud.fecha_solicitud)}</td>
        <td className="flex gap-2">
          <button className="btn btn-sm btn-outline btn-success" onClick={handleActualizar}>
            Guardar
          </button>
          <button className="btn btn-sm btn-outline" onClick={handleEnviarCorreo}>
            <FiMail />
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => setMostrarModal(true)}
          >
            <FiTrash2 />
          </button>
        </td>
      </tr>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-2">Confirmar eliminación</h3>
            <p className="mb-4 text-sm">
              ¿Estás seguro de que deseas eliminar esta solicitud de <strong>{solicitud.nombre_completo}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setMostrarModal(false)}
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={handleEliminar}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolicitudEliminacionRow;
