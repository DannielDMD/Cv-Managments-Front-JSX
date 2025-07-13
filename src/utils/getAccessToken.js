import { loginRequest } from "./authConfig";
import { msalInstance } from "./msalInstance"; // ✅ Importa la instancia compartida

export const getAccessToken = async () => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) return null;

  const request = {
    ...loginRequest,
    account: accounts[0],
  };

  try {
    const response = await msalInstance.acquireTokenSilent(request);
    return response.accessToken;
  } catch (error) {
    console.warn("Error al obtener token:", error);
    return null;
  }
};
