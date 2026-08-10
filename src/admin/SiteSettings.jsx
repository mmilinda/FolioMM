import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Settings, Save, CheckCircle, Eye, EyeOff, Sliders } from "lucide-react";
import SEO from "../components/SEO";

export default function SiteSettings() {
  const { profile, updateProfile, sectionVisibility, updateSectionVisibility } = useSiteData();
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function toggleSection(sectionKey) {
    const updated = {
      ...sectionVisibility,
      [sectionKey]: !sectionVisibility[sectionKey],
    };
    updateSectionVisibility(updated);
    triggerSuccess();
  }

  function submitProfile(e) {
    e.preventDefault();
    updateProfile(formData);
    triggerSuccess();
  }

  function triggerSuccess() {
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

  const sectionsList = [
    { key: "hero", label: "Section Hero & En-tête", desc: "Présentation principale et appel à l'action" },
    { key: "stats", label: "Section Statistiques", desc: "Compteurs chiffrés et métriques clés" },
    { key: "about", label: "Section À Propos", desc: "Présentation détaillée et valeurs" },
    { key: "services", label: "Section Services Offerts", desc: "Cartes des prestations proposées" },
    { key: "projects", label: "Section Projets Récents", desc: "Portfolio des projets en vedette" },
    { key: "impact", label: "Section Impact & Témoignages", desc: "Études de cas et avis clients" },
    { key: "timeline", label: "Section Parcours & Expérience", desc: "Frise chronologique des étapes professionnelles" },
    { key: "booking", label: "Section Prise de Rendez-vous", desc: "Formulaire d'appel ou de réservation" },
  ];

  return (
    <>
      <SEO title="Paramètres du site | Administration" />

      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Settings color="#34d399" size={26} />
            Paramètres & Visibilité du Site
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Configurez vos informations personnelles et contrôlez l'activation de chaque section sur le site public.
          </p>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem 1.1rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>Paramètres enregistrés et appliqués en direct sur tout le site !</span>
          </div>
        )}

        {/* CONTROLE DE VISIBILITE DES SECTIONS */}
        <div style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f8fafc", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Sliders color="#38bdf8" size={22} />
            Gestion de l'Activation des Sections du Site
          </h3>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0 }}>
            Activez ou masquez en un clic n'importe quel bloc de la page d'accueil.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {sectionsList.map((sec) => {
              const active = sectionVisibility[sec.key] !== false;
              return (
                <div
                  key={sec.key}
                  style={{
                    padding: "1rem",
                    borderRadius: "14px",
                    background: active ? "rgba(56, 189, 248, 0.08)" : "rgba(255, 255, 255, 0.03)",
                    border: active ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: active ? "#ffffff" : "#94a3b8", margin: "0 0 0.2rem" }}>
                      {sec.label}
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{sec.desc}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSection(sec.key)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      background: active ? "#34d399" : "rgba(248, 113, 113, 0.15)",
                      border: active ? "none" : "1px solid rgba(248, 113, 113, 0.3)",
                      color: active ? "#020617" : "#f87171",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexShrink: 0,
                    }}
                  >
                    {active ? <Eye size={15} /> : <EyeOff size={15} />}
                    <span>{active ? "Visible" : "Masqué"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROFIL GENERAL & RESEAUX SOCIAUX */}
        <form
          onSubmit={submitProfile}
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
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f8fafc", margin: 0 }}>
            👤 Informations Personnelles & Liens Sociaux
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Nom complet</label>
              <input name="name" style={inputStyle} value={formData.name || ""} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Titre / Poste principal</label>
              <input name="headline" style={inputStyle} value={formData.headline || ""} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Email de contact</label>
              <input name="email" type="email" style={inputStyle} value={formData.email || ""} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Localisation</label>
              <input name="location" style={inputStyle} value={formData.location || ""} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Statut de disponibilité</label>
              <input name="availability" style={inputStyle} value={formData.availability || ""} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>Lien du CV (PDF)</label>
              <input name="cvLink" style={inputStyle} value={formData.cvLink || ""} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Lien GitHub</label>
              <input name="github" style={inputStyle} value={formData.github || ""} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>Lien LinkedIn</label>
              <input name="linkedin" style={inputStyle} value={formData.linkedin || ""} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Bio / Présentation Hero</label>
            <textarea
              name="bio"
              rows={4}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              value={formData.bio || ""}
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
              <span>Enregistrer le Profil & Paramètres</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
