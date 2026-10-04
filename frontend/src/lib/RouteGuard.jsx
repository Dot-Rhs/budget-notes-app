import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router";

export const RouteGuard = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const userLocation = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: `${userLocation.pathname}${userLocation.search}${userLocation.hash}`,
        },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, userLocation]);

  if (isLoading) {
    return (
      <div className="text-center text-primary py-10">
        Checking for active session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center text-primary py-10">
        Redirecting to login page...
      </div>
    );
  }

  return <div>{children}</div>;
};
