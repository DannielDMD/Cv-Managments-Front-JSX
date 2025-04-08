import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import App from "./App.jsx";
import { msalConfig } from "./utils/authConfig";
import { AuthProvider } from "./context/AuthContext.jsx"; // 👈 importa el AuthProvider
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

const renderApp = async () => {
  await msalInstance.initialize(); // ✅ inicializa MSAL
  await msalInstance.handleRedirectPromise(); // ✅ detecta el retorno del login

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <AuthProvider> {/* 👈 envolvemos App en el AuthProvider */}
          <App />
        </AuthProvider>
      </MsalProvider>
    </StrictMode>
  );
};

renderApp();
