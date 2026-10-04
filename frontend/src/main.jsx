import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import GlobalState from "./context/index.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0ProviderWithNavigate } from "./lib/auth0-prov-navigate.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <GlobalState>
          <App />
          <Toaster />
        </GlobalState>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
);
