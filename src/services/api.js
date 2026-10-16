import axios from "axios";

// En production, ne jamais tomber sur 127.0.0.1 : Chrome afficherait une demande
// d'autorisation "Accéder à d'autres applis et services sur cet appareil".
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000/api" : "https://foliomm.onrender.com/api");

const api = axios.create({
  baseURL: API_URL || undefined,
  timeout: 15000,
  headers: {
    "Accept": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
});

// Intercepteur pour ajouter le Token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    if (!API_URL) {
      // Aucun backend configuré : on bloque la requête (les appelants utilisent les données de secours)
      return Promise.reject(new Error("API backend non configurée (VITE_API_URL manquant)"));
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;