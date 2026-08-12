import { createContext, useContext, useState } from "react";
import api from "../services/api";
import { loginWithFirebase, logoutWithFirebase } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("admin");
    if (!token || !stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  async function login(email, password) {
    if (!email || !password) {
      throw new Error("Veuillez saisir votre identifiant email et votre mot de passe.");
    }

    try {
      // 1. Authentification via le Backend Laravel Sanctum API
      const response = await api.post("/login", { email, password });
      if (response.data && response.data.token) {
        const { token, admin } = response.data;
        const adminUser = admin || { name: "Milinda Mendy (Admin)", email };

        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(adminUser));
        setUser(adminUser);
        return adminUser;
      }
    } catch (apiErr) {
      console.warn("Connexion via API Laravel échouée, essai via Firebase / Auth de secours:", apiErr);
    }

    // 2. Fallback Firebase Auth
    try {
      const adminUser = await loginWithFirebase(email, password);
      const sessionToken = "firebase-token-" + Date.now();

      localStorage.setItem("token", sessionToken);
      localStorage.setItem("admin", JSON.stringify(adminUser));
      setUser(adminUser);

      return adminUser;
    } catch (err) {
      throw new Error(err.message || "Identifiants invalides. Vérifiez l'email et le mot de passe.");
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
    } catch (e) {
      // Ignorer
    }
    try {
      await logoutWithFirebase();
    } catch {
      // Ignorer les erreurs réseau lors de la déconnexion
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

export default AuthContext;