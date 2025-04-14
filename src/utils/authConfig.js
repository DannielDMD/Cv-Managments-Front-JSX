export const msalConfig = {
    auth: {
      clientId: "6d916e6b-a36a-48bd-a314-aea85abbf595",
      authority: "https://login.microsoftonline.com/87543dca-0f58-48e4-af72-6410eb960e17",
      redirectUri: "http://localhost:5173", // << Asegúrate que esto esté así
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read"],
    prompt: "select_account", // fuerza que siempre pida escoger cuenta
  };
  