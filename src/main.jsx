import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App"; // Assure-toi que le chemin vers App est correct
import "./index.css"; // 👈 Indispensable !
// Système multilangues
import "./i18n";
// Google analytics
import {
Analytics
}
from "./analytics";


Analytics();
// Auth
import {
AuthProvider
}
from "./context/AuthContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);