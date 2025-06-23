import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Componentes
import DashboardLayout from "../../../../components/dashboard/DashboardLayout";
import TituloObtenidoModal from "../../../../components/dashboard/settings/catalogos/TituloObtenidoModal";
import ConfirmacionModal from "../../../../components/common/EliminacionModal";
import SearchInput from "../../../../components/common/SearchInput";
import Pagination from "../../../../components/common/Pagination";

// Servicios
import {
  getTitulos,
  crearTitulo,
  eliminarTitulo,
} from "../../../../services/dashboard-services/settings/catalogos/titulosService";
import { getNivelesEducacion } from "../../../../services/dashboard-services/settings/catalogos/nivelesEducacionService";

const TitulosObtenidos = () => {
  const [titulos, setTitulos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [tituloAEliminar, setTituloAEliminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 10;
  const [nivelFiltro, setNivelFiltro] = useState(null);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [niveles, setNiveles] = useState([]);

  useEffect(() => {
    const fetchNiveles = async () => {
      const data = await getNivelesEducacion({ skip: 0, limit: 100 });
      setNiveles(data.resultados || []);
    };
    fetchNiveles();
  }, []);

  const fetchTitulos = useCallback(async () => {
    setLoading(true);
    const data = await getTitulos({
      skip: (paginaActual - 1) * porPagina,
      limit: porPagina,
      search: search.trim(),
      idNivel: nivelFiltro || null,
    });

    setTitulos(data.resultados || []);
    setTotalPaginas(data.total_pages || 1);
    setTotalRegistros(data.total || 0);
    setLoading(false);
  }, [search, paginaActual, nivelFiltro]);

  useEffect(() => {
    fetchTitulos();
  }, [fetchTitulos]);

  useEffect(() => {
    setPaginaActual(1);
  }, [search, nivelFiltro]);

  const handleCrearTitulo = async (data) => {
    try {
      await crearTitulo(data);
      toast.success("Título creado correctamente");
      setModalOpen(false);
      fetchTitulos();
    } catch (err) {
      console.error("Error al crear título:", err);
      toast.error("Error al crear título");
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarTitulo(tituloAEliminar);
      toast.success("Título eliminado");
      setModalEliminar(false);
      fetchTitulos();
    } catch (err) {
      console.error("Error al eliminar título:", err);
      toast.error("Error al eliminar");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Títulos Obtenidos</h1>
            <Link
              to="/dashboard/configuracion/catalogos"
              className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1 mt-1"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a Catálogos
            </Link>
          </div>
          <button
            className="bg-[#0033A0] text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4 items-end">
          <div className="w-full md:w-3/5">
            <SearchInput search={search} setSearch={setSearch} />
          </div>
          <div className="w-full md:w-2/5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Nivel Educativo:
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={nivelFiltro || ""}
              onChange={(e) => {
                const value = e.target.value;
                setNivelFiltro(value ? parseInt(value) : null);
                setPaginaActual(1);
              }}
            >
              <option value="">Todos</option>
              {niveles.map((nivel) => (
                <option key={nivel.id_nivel_educacion} value={nivel.id_nivel_educacion}>
                  {nivel.descripcion_nivel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Cargando títulos...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-[#0033A0] text-white">
                <tr>
                  <th className="px-6 py-3">Título</th>
                  <th className="px-6 py-3">Nivel Educativo</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {titulos.map((titulo) => (
                  <tr key={titulo.id_titulo} className="border-b">
                    <td className="px-6 py-4">{titulo.nombre_titulo}</td>
                    <td className="px-6 py-4">{titulo.nivel_educacion?.descripcion_nivel || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          setTituloAEliminar(titulo.id_titulo);
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

      <TituloObtenidoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCrearTitulo}
      />

      <ConfirmacionModal
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        onConfirm={handleEliminar}
        mensaje="¿Estás seguro de eliminar este título?"
      />
    </DashboardLayout>
  );
};

export default TitulosObtenidos;
