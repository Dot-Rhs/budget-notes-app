import { useAuth0 } from "@auth0/auth0-react";
import api from "./axios";

export const useAuthenticatedApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const request = async (config) => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
      },
    });

    return api({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { request };
};
