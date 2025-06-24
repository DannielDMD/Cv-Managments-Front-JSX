// src/pages/DashboardPages/settings/catalogos/Disponibilidades.jsx

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, Pencil, ArrowLeft, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import DisponibilidadModal from "../../../../components/dashboard/settings/catalogos/DisponibilidadModal";
import ConfirmacionModal from "../../../../components/common/EliminacionModal";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/common/Pagination";

import {
  getDisponibilidades,
  crearDisponibilidad,
  actualizarDisponibilidad,
  eliminarDisponibilidad,
} from "../../../../services/dashboard-services/settings/catalogos/disponibilidadService";

const Disponibilidades = () => {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 10;
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [descripcionEditar, setDescripcionEditar] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  const fetchDisponibilidades = useCallback(async () => {
    setLoading(true);
    const data = await getDisponibilidades({
      skip: (paginaActual - 1) * porPagina,
      limit: porPagina,
      search: search.trim(),
    });
    setDisponibilidades(data.resultados || []);
    setTotalPaginas(data.total_pages || 1);
    setTotalRegistros(data.total || 0);
    setLoading(false);
  }, [paginaActual, search]);

  useEffect(() => {
    fetchDisponibilidades();
  }, [fetchDisponibilidades]);

  useEffect(() => {
    setPaginaActual(1);
  }, [search]);

  const handleAbrirCrear = () => {
    setModoModal("crear");
    setDescripcionEditar("");
    setIdEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (item) => {
    setModoModal("editar");
    setDescripcionEditar(item.descripcion_disponibilidad);
    setIdEditar(item.id_disponibilidad);
    setModalAbierto(true);
  };

  const handleGuardar = async (data) => {
    try {
      if (modoModal === "crear") {
        await crearDisponibilidad(data);
        toast.success("Disponibilidad creada correctamente");
      } else {
        await actualizarDisponibilidad(idEditar, data);
        toast.success("Disponibilidad actualizada");
      }
      setModalAbierto(false);
      fetchDisponibilidades();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Error al guardar");
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarDisponibilidad(idEliminar);
      toast.success("Disponibilidad eliminada");
      setModalEliminar(false);
      fetchDisponibilidades();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "No se pudo eliminar");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <CalendarClock className="w-6 h-6 text-blue-600" />
              Gestión de Disponibilidades
            </h1>
            <Link
              to="/dashboard/configuracion/catalogos"
              className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1 mt-1"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a Catálogos
            </Link>
          </div>
          <button
            className="bg-[#0033A0] text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center gap-2"
            onClick={handleAbrirCrear}
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>

        <div className="w-full md:w-1/3">
          <SearchInput search={search} setSearch={setSearch} />
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando disponibilidades...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-[#0033A0] text-white">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Descripción</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {disponibilidades.map((d, index) => (
                  <tr key={d.id_disponibilidad} className="border-b">
                    <td className="px-6 py-4">
                      {(paginaActual - 1) * porPagina + index + 1}
                    </td>
                    <td className="px-6 py-4">{d.descripcion_disponibilidad}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleAbrirEditar(d)}
                      >
                        <Pencil className="w-4 h-4 inline" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          setIdEliminar(d.id_disponibilidad);
                          setModalEliminar(true);
                        }}
                      >
                        <Trash2 className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPaginas > 1 && (
          <Pagination
            page={paginaActual}
            totalPages={totalPaginas}
            totalItems={totalRegistros}
            onPageChange={(newPage) => setPaginaActual(newPage)}
          />
        )}
      </div>

      <DisponibilidadModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleGuardar}
        modo={modoModal}
        descripcionInicial={descripcionEditar}
      />

      <ConfirmacionModal
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        onConfirm={handleEliminar}
        mensaje="¿Estás seguro de eliminar esta disponibilidad?"
      />
    </DashboardLayout>
  );
};

export default Disponibilidades;
