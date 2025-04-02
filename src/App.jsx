import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext"; 
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/DashboardPages/Dashboard"; // 👈 importalo arriba


const App = () => {
  return (
    <FormProvider>
      <Router>
        {/* Contenedor de los toasts */}
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
          <Route path="/dashboard" element={<Dashboard />} /> {/* 👈 nueva ruta */}
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
