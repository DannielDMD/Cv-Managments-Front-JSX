export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: import.meta.env.VITE_AZURE_AUTHORITY,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};



export const loginRequest = {
  scopes: ["api://932854ce-78e0-4973-8ad5-875b3addcaf0/access_as_user"],
  prompt: "select_account",
};

