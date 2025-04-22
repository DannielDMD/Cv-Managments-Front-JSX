export const msalConfig = {
    auth: {
      clientId: "932854ce-78e0-4973-8ad5-875b3addcaf0",
      authority: "https://login.microsoftonline.com/dd505be5-ec69-47f5-92df-caa55febf5fa",
      redirectUri: "http://localhost:5173", 
      postLogoutRedirectUri: "http://localhost:5173", // 👈 esto es clave
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read"],
    prompt: "select_account", 
  };
  