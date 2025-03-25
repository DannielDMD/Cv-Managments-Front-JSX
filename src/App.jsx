import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext"; 
import LandingPage from "./pages/LandingPage";
import Form from "./pages/Form";

const App = () => {
  return (
    <FormProvider> {/* Aquí envuelves todo con el contexto */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/formulario" element={<Form />} />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
