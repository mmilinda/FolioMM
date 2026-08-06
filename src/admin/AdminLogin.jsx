import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      // Le backend renvoie 401 avec { message: "Identifiants invalides" }
      const msg =
        err?.response?.data?.message || "Email ou mot de passe incorrect";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="glass p-10 rounded-3xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-8">Administration</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="email"
          className="input-style"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="input-style mt-4"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-cyan-400 text-black px-8 py-3 rounded-full font-semibold disabled:opacity-50 w-full transition-opacity"
        >
          {loading ? "Connexion..." : "Connexion"}
        </button>
      </form>
    </div>
  );
}