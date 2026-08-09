import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle, User, Mail, MapPin, Briefcase, Globe } from "lucide-react";
import SEO from "../components/SEO";

export default function SiteSettings() {
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem("site_profile");
      return stored
        ? JSON.parse(stored)
        : {
            name: "Milinda Mendy",
            headline: "Développeuse Full Stack & Ingénieure DevOps",
            email: "mmilinda00@gmail.com",
            location: "Sénégal 🇸🇳 – Remote",
            availability: "Ouverte aux missions",
            github: "https://github.com/mmilinda",
            linkedin: "https://www.linkedin.com/in/milinda-mendy-5ba17928a/",
            cvLink: "/milinda_mendy_cv.pdf",
            bio: "Je conçois et déploie des architectures cloud robustes, des pipelines CI/CD efficaces et des applications full stack performantes — du code au serveur de production.",
          };
    } catch {
      return {};
    }
  });

  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    localStorage.setItem("site_profile", JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent("profile_updated"));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(2, 6, 23, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    fontSize: "0.92rem",
    fontWeight: 500,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#cbd5e1",
    marginBottom: "0.4rem",
  };

  return (
    <>
      <SEO title="Paramètres du site | Administration" />

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Settings color="#34d399" size={26} />
            Paramètres & Profil du Site
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Personnalisez vos informations personnelles, liens sociaux et statuts affichés sur l'ensemble du site public.
          </p>
        </div>

        <form
          onSubmit={submit}
          style={{
            background: "rgba(9, 13, 22, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          }}
        >
          {saved && (
            <div
              style={{
                padding: "0.85rem 1.1rem",
                borderRadius: "12px",
                background: "rgba(52, 211, 153, 0.12)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                color: "#34d399",
                fontSize: "0.88rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircle size={18} />
              <span>Modifications du profil enregistrées avec succès sur tout le site !</span>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Nom complet</label>
              <input name="name" style={inputStyle} value={profile.name || ""} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Titre / Poste principal</label>
              <input name="headline" style={inputStyle} value={profile.headline || ""} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Email de contact</label>
              <input name="email" type="email" style={inputStyle} value={profile.email || ""} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Localisation</label>
              <input name="location" style={inputStyle} value={profile.location || ""} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Statut de disponibilité</label>
              <input name="availability" style={inputStyle} value={profile.availability || ""} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>Lien du CV (PDF)</label>
              <input name="cvLink" style={inputStyle} value={profile.cvLink || ""} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Lien GitHub</label>
              <input name="github" style={inputStyle} value={profile.github || ""} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>Lien LinkedIn</label>
              <input name="linkedin" style={inputStyle} value={profile.linkedin || ""} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Bio / Présentation Hero</label>
            <textarea
              name="bio"
              rows={4}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              value={profile.bio || ""}
              onChange={handleChange}
            />
          </div>

          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #34d399 0%, #38bdf8 100%)",
                border: "none",
                color: "#020617",
                fontWeight: 800,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(52, 211, 153, 0.3)",
              }}
            >
              <Save size={18} />
              <span>Enregistrer les paramètres du site</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
