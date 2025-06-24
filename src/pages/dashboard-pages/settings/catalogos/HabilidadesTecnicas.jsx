// src/pages/dashboard-pages/settings/catalogos/HabilidadesTecnicas.jsx

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, Pencil, ArrowLeft, ArrowUp01 } from "lucide-react";
import { Link } from "react-router-dom";

// Componentes
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import HabilidadTecnicaModal from "../../../../components/dashboard/settings/catalogos/HabilidadTecnicaModal";
import ConfirmacionModal from "../../../../components/common/EliminacionModal";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/common/Pagination";

// Servicios
import {
  getHabilidadesTecnicas,
  crearHabilidadTecnica,
  actualizarHabilidadTecnica,
  eliminarHabilidadTecnica,
} from "../../../../services/dashboard-services/settings/catalogos/habilidadesTecnicasService";

const HabilidadesTecnicas = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 10;
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoModal, setModoModal] = useState("crear");
  const [nombreEditar, setNombreEditar] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  const [modalEliminar, setModalEliminar] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  const fetchHabilidades = useCallback(async () => {
    setLoading(true);
    const data = await getHabilidadesTecnicas({
      skip: (paginaActual - 1) * porPagina,
      limit: porPagina,
      search: search.trim(),
    });
    setHabilidades(data.resultados || []);
    setTotalPaginas(data.total_pages || 1);
    setTotalRegistros(data.total || 0);
    setLoading(false);
  }, [paginaActual, search]);

  useEffect(() => {
    fetchHabilidades();
  }, [fetchHabilidades]);

  useEffect(() => {
    setPaginaActual(1);
  }, [search]);

  const handleAbrirCrear = () => {
    setModoModal("crear");
    setNombreEditar("");
    setIdEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (item) => {
    setModoModal("editar");
    setNombreEditar(item.nombre_habilidad_tecnica);
    setIdEditar(item.id_habilidad_tecnica);
    setModalAbierto(true);
  };

  const handleGuardar = async (data) => {
    try {
      if (modoModal === "crear") {
        await crearHabilidadTecnica(data);
        toast.success("Habilidad técnica creada correctamente");
      } else {
        await actualizarHabilidadTecnica(idEditar, data);
        toast.success("Habilidad técnica actualizada");
      }
      setModalAbierto(false);
      fetchHabilidades();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Error al guardar");
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarHabilidadTecnica(idEliminar);
      toast.success("Habilidad técnica eliminada");
      setModalEliminar(false);
      fetchHabilidades();
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
              <ArrowUp01 className="w-6 h-6 text-blue-600" />
              Gestión de Habilidades Técnicas
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
          <p className="text-gray-500">Cargando habilidades técnicas...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-[#0033A0] text-white">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {habilidades.map((item, index) => (
                  <tr key={item.id_habilidad_tecnica} className="border-b">
                    <td className="px-6 py-4">
                      {(paginaActual - 1) * porPagina + index + 1}
                    </td>
                    <td className="px-6 py-4">{item.nombre_habilidad_tecnica}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleAbrirEditar(item)}
                      >
                        <Pencil className="w-4 h-4 inline" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          setIdEliminar(item.id_habilidad_tecnica);
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

      <HabilidadTecnicaModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleGuardar}
        modo={modoModal}
        nombreInicial={nombreEditar}
      />

      <ConfirmacionModal
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        onConfirm={handleEliminar}
        mensaje="¿Estás seguro de eliminar esta habilidad técnica?"
      />
    </DashboardLayout>
  );
};

export default HabilidadesTecnicas;
