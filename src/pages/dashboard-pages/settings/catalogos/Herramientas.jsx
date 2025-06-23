// src/pages/DashboardPages/settings/catalogos/Herramientas.jsx

import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Plus, Trash2, Pencil, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Componentes
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import HerramientaModal from "../../../../components/dashboard/settings/catalogos/HerramientaModal";
import ConfirmacionModal from "../../../../components/common/EliminacionModal";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/common/Pagination";

// Servicios
import {
  getHerramientas,
  crearHerramienta,
  actualizarHerramienta,
  eliminarHerramienta,
} from "../../../../services/dashboard-services/settings/catalogos/herramientasService";

const Herramientas = () => {
  const [herramientas, setHerramientas] = useState([]);
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
  const [herramientaAEliminar, setHerramientaAEliminar] = useState(null);

  const fetchHerramientas = useCallback(async () => {
    setLoading(true);
    const data = await getHerramientas({
      skip: (paginaActual - 1) * porPagina,
      limit: porPagina,
      search: search.trim(),
    });
    setHerramientas(data.resultados || []);
    setTotalPaginas(data.total_pages || 1);
    setTotalRegistros(data.total || 0);
    setLoading(false);
  }, [paginaActual, search]);

  useEffect(() => {
    fetchHerramientas();
  }, [fetchHerramientas]);

  useEffect(() => {
    setPaginaActual(1);
  }, [search]);

  const handleAbrirCrear = () => {
    setModoModal("crear");
    setNombreEditar("");
    setIdEditar(null);
    setModalAbierto(true);
  };

  const handleAbrirEditar = (herramienta) => {
    setModoModal("editar");
    setNombreEditar(herramienta.nombre_herramienta);
    setIdEditar(herramienta.id_herramienta);
    setModalAbierto(true);
  };

  const handleGuardar = async (data) => {
    try {
      if (modoModal === "crear") {
        await crearHerramienta(data);
        toast.success("Herramienta creada correctamente");
      } else {
        await actualizarHerramienta(idEditar, data);
        toast.success("Herramienta actualizada");
      }
      setModalAbierto(false);
      fetchHerramientas();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Error al guardar");
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarHerramienta(herramientaAEliminar);
      toast.success("Herramienta eliminada");
      setModalEliminar(false);
      fetchHerramientas();
    } catch (error) {
      toast.error(error?.response?.data?.detail || "No se pudo eliminar");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Herramientas</h1>
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
          <p className="text-gray-500">Cargando herramientas...</p>
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
                {herramientas.map((h, index) => (
                  <tr key={h.id_herramienta} className="border-b">
                    <td className="px-6 py-4">
                      {(paginaActual - 1) * porPagina + index + 1}
                    </td>
                    <td className="px-6 py-4">{h.nombre_herramienta}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleAbrirEditar(h)}
                      >
                        <Pencil className="w-4 h-4 inline" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          setHerramientaAEliminar(h.id_herramienta);
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

      <HerramientaModal
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
        mensaje="¿Estás seguro de eliminar esta herramienta?"
      />
    </DashboardLayout>
  );
};

export default Herramientas;
