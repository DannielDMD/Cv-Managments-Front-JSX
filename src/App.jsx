import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";
import Dashboard from "./pages/DashboardPages/Dashboard";
import CandidateManagement from "./pages/DashboardPages/CandidateManagement";
import CandidateDetail from "./pages/DashboardPages/CandidateDetail"; // ✅ NUEVO
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouteIncomplete from "./components/form/ProtectedRouteIncomplete";
import { AuthProvider } from "./context/AuthContext"; // 👈 ahora lo usás aquí

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
              <AuthProvider> {/* Solo envuelve rutas internas protegidas */}
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

        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
