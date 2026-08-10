import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("mmilinda00@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(targetEmail = email, targetPass = password) {
    setError("");
    setLoading(true);

    try {
      await login(targetEmail, targetPass);
      navigate("/admin");
    } catch (err) {
      const msg = err?.response?.data?.message || "Identifiants invalides. Veuillez réessayez.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    handleLogin();
  }

  return (
    <>
      <SEO title="Connexion Admin | Milinda Mendy" />

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          background: "#020617",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Glowing Background Accent Orbs */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.18), transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        {/* Card Outer Wrapper */}
        <div style={{ width: "100%", maxWidth: "460px", position: "relative", zIndex: 10 }}>
          {/* Top Bar Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              padding: "0 4px",
            }}
          >
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#94a3b8",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={16} color="#38bdf8" />
              <span>Retour au site public</span>
            </Link>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.25)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#34d399",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                }}
              />
              Système En Ligne
            </span>
          </div>

          {/* Clean Glassmorphic Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "28px",
              padding: "2.5rem 2rem",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56,189,248,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Glowing Gradient Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #f472b6 100%)",
              }}
            />

            {/* Header section */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "72px",
                  height: "72px",
                  margin: "0 auto 1rem",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    background: "#090d16",
                    border: "2px solid rgba(56,189,248,0.4)",
                    padding: "3px",
                    boxShadow: "0 8px 24px rgba(56,189,248,0.2)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/logoMM.jpg"
                    alt="MM Logo"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "14px" }}
                  />
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#38bdf8",
                    border: "2px solid #0f172a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#020617",
                  }}
                >
                  <Zap size={12} fill="#020617" />
                </span>
              </div>

              <h1
                style={{
                  fontSize: "1.65rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  margin: "0 0 0.4rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Console Administrateur
              </h1>
              <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                Authentifiez-vous pour gérer vos contenus et vos projets
              </p>
            </div>

            {/* Error message banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "14px",
                  background: "rgba(248,113,113,0.12)",
                  border: "1px solid rgba(248,113,113,0.3)",
                  color: "#f87171",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
              {/* Field 1: Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label
                  htmlFor="admin-email"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#cbd5e1",
                  }}
                >
                  Adresse Email Administrateur
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Mail
                    size={19}
                    color="#38bdf8"
                    style={{
                      position: "absolute",
                      left: "16px",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />
                  <input
                    id="admin-email"
                    type="email"
                    required
                    placeholder="mmilinda00@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px 14px 48px",
                      borderRadius: "14px",
                      background: "rgba(2, 6, 23, 0.75)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38bdf8";
                      e.target.style.boxShadow = "0 0 0 3px rgba(56,189,248,0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.14)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label
                  htmlFor="admin-password"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#cbd5e1",
                  }}
                >
                  Mot de passe
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Lock
                    size={19}
                    color="#818cf8"
                    style={{
                      position: "absolute",
                      left: "16px",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 48px 14px 48px",
                      borderRadius: "14px",
                      background: "rgba(2, 6, 23, 0.75)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#818cf8";
                      e.target.style.boxShadow = "0 0 0 3px rgba(129,140,248,0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.14)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "16px",
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      zIndex: 2,
                    }}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Submit Main Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                  border: "none",
                  color: "#020617",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  marginTop: "0.5rem",
                  boxShadow: "0 6px 24px rgba(56,189,248,0.3)",
                  transition: "opacity 0.2s, boxShadow 0.2s",
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(2,6,23,0.3)",
                        borderTopColor: "#020617",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* One-Click Quick Access Shortcut */}
              <button
                type="button"
                onClick={() => handleLogin("mmilinda00@gmail.com", "admin123")}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "rgba(56,189,248,0.08)",
                  border: "1px solid rgba(56,189,248,0.25)",
                  color: "#38bdf8",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <Sparkles size={16} color="#38bdf8" />
                <span>🚀 Accès Rapide 1-Clic (Milinda Mendy Admin)</span>
              </button>
            </form>

            {/* Footer Trust Signals */}
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.78rem",
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#cbd5e1" }}>
                <ShieldCheck size={16} color="#38bdf8" />
                Firebase Auth & CMS Sécurisé
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontWeight: 600 }}>
                <CheckCircle2 size={15} />
                Protection Hybride Active
              </span>
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </>
  );
}