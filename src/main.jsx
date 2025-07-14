import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import App from "./App.jsx";
import './index.css';

// ⛔ Ya no importas esto:
// import { PublicClientApplication } from "@azure/msal-browser";
// import { msalConfig } from "./utils/authConfig";

// ✅ Ahora importas la instancia compartida:
import { msalInstance } from "./utils/msalInstance";

const renderApp = async () => {
  await msalInstance.initialize(); 
  await msalInstance.handleRedirectPromise(); 

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
};

renderApp();
