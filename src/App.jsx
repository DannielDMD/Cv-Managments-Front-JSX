import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext"; 
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/DashboardPages/Dashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/formulario" element={<Form />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
