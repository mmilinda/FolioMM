import { createContext, useContext, useState } from "react";
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
      const adminUser = await loginWithFirebase(email, password);
      const sessionToken = "firebase-token-" + Date.now();

      localStorage.setItem("token", sessionToken);
      localStorage.setItem("admin", JSON.stringify(adminUser));
      setUser(adminUser);

      return adminUser;
    } catch (err) {
      throw new Error(err.message || "Échec d'authentification Administrateur Firebase.");
    }
  }

  async function logout() {
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