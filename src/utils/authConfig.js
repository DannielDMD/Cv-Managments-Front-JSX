export const msalConfig = {
    auth: {
      clientId: "e3fb8881-8c82-4345-8048-68db1ca177f5",
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
  };
  