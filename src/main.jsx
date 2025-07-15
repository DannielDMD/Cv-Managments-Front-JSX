import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import App from "./App.jsx";
import './index.css';


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
