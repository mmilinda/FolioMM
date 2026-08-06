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

  // Appelle le backend Laravel POST /api/login
  async function login(email, password) {
    const response = await api.post("/login", { email, password });

    const { token, admin } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));

    setUser(admin);

    return admin;
  }

  // Appelle le backend Laravel POST /api/logout pour invalider le token Sanctum
  async function logout() {
    try {
      await api.post("/logout");
    } catch {
      // Même si la requête échoue, on nettoie le storage local
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