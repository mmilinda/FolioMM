import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("admin");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Appelle le backend Laravel POST /api/login avec fallback Mode Démo si offline
  async function login(email, password) {
    try {
      const response = await api.post("/login", { email, password }, { timeout: 3000 });
      const { token, admin } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(admin));
      setUser(admin);

      return admin;
    } catch (err) {
      // Si l'API Laravel n'est pas démarrée (Erreur réseau/Timeout), on autorise l'accès Démo Admin
      if (!err.response || err.code === "ECONNABORTED" || err.message.includes("Network Error")) {
        const demoAdmin = { name: "Milinda Mendy (Admin)", email };
        const demoToken = "demo-token-" + Date.now();

        localStorage.setItem("token", demoToken);
        localStorage.setItem("admin", JSON.stringify(demoAdmin));
        setUser(demoAdmin);

        return demoAdmin;
      }
      throw err;
    }
  }

  // Déconnexion & Invalidation token
  async function logout() {
    try {
      await api.post("/logout");
    } catch {
      // Nettoyage local même si API offline
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      setUser(null);
      window.location.href = "/admin/login";
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}