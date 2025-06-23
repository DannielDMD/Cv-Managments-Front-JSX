import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Vista de Home o Principal
import LandingPage from "./pages/LandingPage";
//Vistas del Formulario
import Form from "./pages/Form";
import SolicitudEliminacion from "./pages/SolicitudEliminacion";
//Ruta Protegidas
import ProtectedRouteIncomplete from "./components/form/ProtectedRouteIncomplete";
import ProtectedRoute from "./components/auth/ProtectedRoute";
//Contextos
import { AuthProvider } from "./context/AuthContext";
import { FormProvider } from "./context/FormContext";
//Vistas del Dashboard
import Dashboard from "./pages/dashboard-pages/Dashboard";
import Reports from "./pages/dashboard-pages/Reports";
import CandidateManagement from "./pages/dashboard-pages/gestion-candidatos/CandidateManagement";
import CandidateDetail from "./pages/dashboard-pages/gestion-candidatos/CandidateDetail";
import SolicitudEliminacionTH from "./pages/dashboard-pages/gestion-candidatos/SolicitudEliminacionTH";
//Rutas de la Vista de Configuración (Dashboard)
import Configuracion from "./pages/dashboard-pages/settings/Settings";
import Usuarios from "./pages/dashboard-pages/settings/usuarios/Usuarios";
import Catalogos from "./pages/dashboard-pages/settings/catalogos/Catalogos";
import CiudadesCatalogo from "./pages/dashboard-pages/settings/catalogos/Ciudades";
import DepartamentosCatalago from "./pages/dashboard-pages/settings/catalogos/Departamentos";
import CargosOfrecidosCatalogo from "./pages/dashboard-pages/settings/catalogos/CargosOfrecidos";
import CentroCostosCatalogo from "./pages/dashboard-pages/settings/catalogos/CentrosCostos";
import MotivosSalidaCatalogo from "./pages/dashboard-pages/settings/catalogos/MotivosSalida";

import NivelesEducacionCatalogo from "./pages/dashboard-pages/settings/catalogos/NivelesEducacion";
import TitulosObtenidos from "./pages/dashboard-pages/settings/catalogos/TitulosObtenidos";
import InstitucionesCatalago from "./pages/dashboard-pages/settings/catalogos/Instituciones";
import NivelInglesCatalogo from "./pages/dashboard-pages/settings/catalogos/NivelesIngles";

import RangosExperienciaCatalogo from "./pages/dashboard-pages/settings/catalogos/RangosExperiencia";

import HabilidadesTecnicasCatalago from "./pages/dashboard-pages/settings/catalogos/HabilidadesTecnicas";
import HabilidadesBlandasCatalogo from "./pages/dashboard-pages/settings/catalogos/HabilidadesBlandas";
import HerramientasCatalogo from "./pages/dashboard-pages/settings/catalogos/Herramientas";

import DisponibilidadesCatalogo from "./pages/dashboard-pages/settings/catalogos/Disponibilidades";
import RangosSalarialesCatalogo from "./pages/dashboard-pages/settings/catalogos/RangosSalariales";


const App = () => {
  return (
    <FormProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/"
            element={
              <ProtectedRouteIncomplete>
                <LandingPage />
              </ProtectedRouteIncomplete>
            }
          />
          <Route path="/formulario" element={<Form />} />
          <Route path="/solicitud-eliminacion" element={<SolicitudEliminacion />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/dashboard/candidatos"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <CandidateManagement />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/dashboard/candidatos/:id"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <CandidateDetail />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          {/* Nueva ruta para Reportes */}
          <Route
            path="/dashboard/reportes"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/dashboard/configuracion"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <Configuracion />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/dashboard/configuracion/usuarios"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              </AuthProvider>
            }
          />


          <Route
            path="/dashboard/configuracion/catalogos"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <Catalogos />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

          {/* Rutas para catalogos */}
          <Route
            path="/dashboard/configuracion/catalogos/ciudades"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <CiudadesCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

          <Route
            path="/dashboard/configuracion/catalogos/departamentos"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <DepartamentosCatalago />
                </ProtectedRoute>
              </AuthProvider>
            }
          />



          <Route
            path="/dashboard/configuracion/catalogos/cargos"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <CargosOfrecidosCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

          <Route
            path="/dashboard/configuracion/catalogos/centros-costos"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <CentroCostosCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

          <Route
            path="/dashboard/configuracion/catalogos/motivos-salida"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <MotivosSalidaCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
  {/* Rutas de Educacion*/}

          <Route
            path="/dashboard/configuracion/catalogos/niveles-educacion"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <NivelesEducacionCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

        <Route
            path="/dashboard/configuracion/catalogos/titulos-obtenidos"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <TitulosObtenidos/>
                </ProtectedRoute>
              </AuthProvider>
            }
          />

          <Route
            path="/dashboard/configuracion/catalogos/instituciones"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <InstitucionesCatalago />
                </ProtectedRoute>
              </AuthProvider>
            }
          />




          <Route
            path="/dashboard/configuracion/catalogos/nivel-ingles"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <NivelInglesCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />


          <Route
            path="/dashboard/configuracion/catalogos/rangos-experiencia"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <RangosExperienciaCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />



          <Route
            path="/dashboard/configuracion/catalogos/habilidades-tecnicas"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <HabilidadesTecnicasCatalago />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

        <Route
            path="/dashboard/configuracion/catalogos/habilidades-blandas"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <HabilidadesBlandasCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

        <Route
            path="/dashboard/configuracion/catalogos/herramientas"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <HerramientasCatalogo />
                </ProtectedRoute>
              </AuthProvider>
            }
          />

        <Route
            path="/dashboard/configuracion/catalogos/disponibilidad"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <DisponibilidadesCatalogo/>
                </ProtectedRoute>
              </AuthProvider>
            }
          />



        <Route
            path="/dashboard/configuracion/catalogos/rangos-salariales"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <RangosSalarialesCatalogo/>
                </ProtectedRoute>
              </AuthProvider>
            }
          />




          {/* Otras rutas*/}
          <Route
            path="/dashboard/solicitudes-eliminacion"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <SolicitudEliminacionTH />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
