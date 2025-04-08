import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";
import Dashboard from "./pages/DashboardPages/Dashboard";
import CandidateManagement from "./pages/DashboardPages/CandidateManagement"; // ✅ Importamos la nueva página
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/formulario" element={<Form />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/candidatos"
            element={
              <ProtectedRoute>
                <CandidateManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
