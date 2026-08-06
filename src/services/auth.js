import api from "./api";

// Conservé pour compatibilité éventuelle, mais la logique principale
// passe désormais par AuthContext (qui appelle api.post directement).

export async function login(email, password) {
  const response = await api.post("/login", { email, password });

  const { token, admin } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("admin", JSON.stringify(admin));

  return response.data;
}

// Appelle le backend pour invalider le token Sanctum côté serveur
export async function logout() {
  try {
    await api.post("/logout");
  } catch {
    // On nettoie quand même le storage local
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  }
}