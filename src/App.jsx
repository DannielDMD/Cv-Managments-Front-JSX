// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";
import Dashboard from "./pages/DashboardPages/Dashboard";
import CandidateManagement from "./pages/DashboardPages/CandidateManagement";
import CandidateDetail from "./pages/DashboardPages/CandidateDetail";
import Reports from "./pages/DashboardPages/Reports"; // ← Importamos Reports
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouteIncomplete from "./components/form/ProtectedRouteIncomplete";
import { AuthProvider } from "./context/AuthContext";

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
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
