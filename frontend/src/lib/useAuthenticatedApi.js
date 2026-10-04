import { useCallback, useRef } from "react";
import { useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import api from "./axios";

export const useAuthenticatedApi = () => {
  const redirectToLogin = useRef(false);
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const userLocation = useLocation();

  const request = useCallback(
    async (config) => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
          },
        });

        return await api({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        if (
          error.error === "login_required" ||
          error.error === "missing_refresh_token" ||
          error.response?.status === 401
        ) {
          if (!redirectToLogin.current) {
            redirectToLogin.current = true;
            await loginWithRedirect({
              appState: {
                returnTo:
                  userLocation.pathname +
                  userLocation.search +
                  userLocation.hash,
              },
            });
          }
        }

        throw error;
      }
    },
    [getAccessTokenSilently, loginWithRedirect, userLocation],
  );

  return { request };
};
