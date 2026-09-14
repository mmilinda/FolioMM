import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Settings, Save, CheckCircle, Eye, EyeOff, Sliders, Upload, FileText, Image as ImageIcon, UserCheck } from "lucide-react";
import SEO from "../components/SEO";
import api from "../services/api";

export default function SiteSettings() {
  const { profile, updateProfile, sectionVisibility, updateSectionVisibility, isBackendConnected } = useSiteData();
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  // Cartes de points forts d'À Propos
  const [highlights, setHighlights] = useState(() => {
    return Array.isArray(profile?.highlights) && profile.highlights.length > 0
      ? profile.highlights
      : [
          { id: "hl-1", icon: "Code2", text: "Architecture Full Stack moderne" },
          { id: "hl-2", icon: "Server", text: "Infrastructure DevOps & Cloud" },
          { id: "hl-3", icon: "Zap", text: "Pipelines CI/CD automatisés" },
          { id: "hl-4", icon: "CheckCircle", text: "Delivery rapide & code de qualité" },
        ];
  });

  // Rôles typewriter et Badges Techno Hero
  const [heroRolesStr, setHeroRolesStr] = useState(() =>
    Array.isArray(profile?.heroRoles) ? profile.heroRoles.join(", ") : "DevOps, Full Stack Developer, Cloud Architect, Solutions Builder"
  );
  const [heroBadgesStr, setHeroBadgesStr] = useState(() =>
    Array.isArray(profile?.heroBadges) ? profile.heroBadges.join(", ") : "React, Laravel, Node.js, AI, Cloud, DevOps"
  );

  // Titres & sous-titres des sections
  const [sectionTitles, setSectionTitles] = useState(() => ({
    servicesTitle: profile?.sectionTitles?.servicesTitle || "Mes Domaines d'Expertise",
    servicesSubtitle: profile?.sectionTitles?.servicesSubtitle || "Des solutions techniques complètes et sur-mesure pour propulser vos projets web et cloud.",
    aboutTitle: profile?.sectionTitles?.aboutTitle || "À Propos",
    aboutTitleHighlight: profile?.sectionTitles?.aboutTitleHighlight || "de Moi",
    projectsTitle: profile?.sectionTitles?.projectsTitle || "Mes Projets",
    projectsTitleHighlight: profile?.sectionTitles?.projectsTitleHighlight || "en Vedette",
    bookingTitle: profile?.sectionTitles?.bookingTitle || "Prêt à propulser",
    bookingTitleHighlight: profile?.sectionTitles?.bookingTitleHighlight || "votre projet ?",
    bookingSubtitle: profile?.sectionTitles?.bookingSubtitle || "Discutons de vos besoins techniques, d'une opportunité ou d'une collaboration.",
  }));

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSectionTitleChange(e) {
    setSectionTitles({ ...sectionTitles, [e.target.name]: e.target.value });
  }

  const handleAddHighlight = () => {
    setHighlights([...highlights, { id: `hl-${Date.now()}`, icon: "Code2", text: "Nouveau point d'expertise" }]);
  };

  const handleUpdateHighlight = (index, field, value) => {
    const updated = [...highlights];
    updated[index] = { ...updated[index], [field]: value };
    setHighlights(updated);
  };

  const handleRemoveHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  async function handleFileUpload(e, fieldName) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", fieldName === "cvLink" ? "documents" : "profiles");

      const response = await api.post("/upload", data);
      if (response.data && response.data.url) {
        const fileUrl = response.data.url;
        const updated = { ...formData, [fieldName]: fileUrl };
        setFormData(updated);
        updateProfile(updated);
        triggerSuccess(`Fichier pour ${fieldName} téléchargé et synchronisé !`);
      }
    } catch (err) {
      console.error("Erreur d'upload du fichier:", err);
      // Fallback local URL if upload fails
      const objectUrl = URL.createObjectURL(file);
      const updated = { ...formData, [fieldName]: objectUrl };
      setFormData(updated);
      updateProfile(updated);
    } finally {
      setUploadingField(null);
    }
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
    const updatedProfile = {
      ...formData,
      highlights,
      heroRoles: heroRolesStr.split(",").map((s) => s.trim()).filter(Boolean),
      heroBadges: heroBadgesStr.split(",").map((s) => s.trim()).filter(Boolean),
      sectionTitles,
    };
    setFormData(updatedProfile);
    updateProfile(updatedProfile);
    triggerSuccess();
  }

  function triggerSuccess(msg) {
    setSaved(msg || "Paramètres enregistrés et appliqués en direct sur tout le site !");
    setTimeout(() => setSaved(false), 3500);
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
      <SEO title="Paramètres du site | Administration" noindex={true} />

      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Settings color="#34d399" size={26} />
            Paramètres & Visibilité du Site
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Configurez vos informations personnelles, photos, documents et visibilité des sections.</span>
            <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "10px", background: isBackendConnected ? "rgba(52, 211, 153, 0.15)" : "rgba(245, 158, 11, 0.15)", color: isBackendConnected ? "#34d399" : "#fbbf24", fontWeight: 700 }}>
              {isBackendConnected ? "● Backend Laravel Connecté" : "○ Mode Synchrone Local"}
            </span>
          </p>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem 1.1rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>{saved}</span>
          </div>
        )}

        {/* SECTION MEDIAS : PHOTO DE PROFIL, AVATAR & CV */}
        <div
          style={{
            background: "rgba(9, 13, 22, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f8fafc", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <ImageIcon color="#38bdf8" size={22} />
            Photos de Profil, Avatar & Documents (CV)
          </h3>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0 }}>
            Téléversez directement vos photos et documents. Les fichiers sont enregistrés sur le serveur Laravel et mis à jour instantanément sur le site.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {/* Photo Principale */}
            <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "1.25rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
              <span style={labelStyle}>Photo de Profil Principale (Hero)</span>
              <img
                src={formData.photo || "/images/profile/MM.png"}
                alt="Photo de profil"
                style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "2px solid #38bdf8" }}
              />
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#38bdf8",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Upload size={14} />
                <span>{uploadingField === "photo" ? "Téléversement..." : "Changer la Photo"}</span>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "photo")} style={{ display: "none" }} />
              </label>
            </div>

            {/* Avatar Miniature */}
            <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "1.25rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
              <span style={labelStyle}>Avatar Miniature (Navbar & Bio)</span>
              <img
                src={formData.avatar || "/images/profile/MM.png"}
                alt="Avatar"
                style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "2px solid #34d399" }}
              />
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(52, 211, 153, 0.15)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  color: "#34d399",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <UserCheck size={14} />
                <span>{uploadingField === "avatar" ? "Téléversement..." : "Changer l'Avatar"}</span>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "avatar")} style={{ display: "none" }} />
              </label>
            </div>

            {/* Document CV PDF (FR) */}
            <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "1.25rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
              <span style={labelStyle}>🇫🇷 CV Version Française (PDF)</span>
              <div style={{ width: "90px", height: "90px", borderRadius: "16px", background: "rgba(56, 189, 248, 0.12)", border: "1px dashed rgba(56, 189, 248, 0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#38bdf8" }}>
                <FileText size={32} />
                <span style={{ fontSize: "0.65rem", fontWeight: 800, marginTop: "4px" }}>PDF (FR)</span>
              </div>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#38bdf8",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Upload size={14} />
                <span>{uploadingField === "cvLinkFr" ? "Téléversement..." : "Changer CV Français"}</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, "cvLinkFr")} style={{ display: "none" }} />
              </label>
            </div>

            {/* Document CV PDF (EN) */}
            <div style={{ background: "rgba(2, 6, 23, 0.6)", padding: "1.25rem", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
              <span style={labelStyle}>🇬🇧 English Resume (PDF)</span>
              <div style={{ width: "90px", height: "90px", borderRadius: "16px", background: "rgba(168, 85, 247, 0.12)", border: "1px dashed rgba(168, 85, 247, 0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#c084fc" }}>
                <FileText size={32} />
                <span style={{ fontSize: "0.65rem", fontWeight: 800, marginTop: "4px" }}>PDF (EN)</span>
              </div>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(168, 85, 247, 0.15)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  color: "#c084fc",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Upload size={14} />
                <span>{uploadingField === "cvLinkEn" ? "Téléversement..." : "Changer CV Anglais"}</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, "cvLinkEn")} style={{ display: "none" }} />
              </label>
            </div>
          </div>
        </div>

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
              <label style={labelStyle}>URL CV Français (FR)</label>
              <input name="cvLinkFr" style={inputStyle} value={formData.cvLinkFr || formData.cvLink || "/CV-Milinda-Mendy-FR.pdf"} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>URL CV Anglais (EN)</label>
              <input name="cvLinkEn" style={inputStyle} value={formData.cvLinkEn || formData.cvLink || "/CV-Milinda-Mendy-EN.pdf"} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>URL Photo de profil</label>
              <input name="photo" style={inputStyle} value={formData.photo || ""} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>URL Avatar miniature</label>
              <input name="avatar" style={inputStyle} value={formData.avatar || ""} onChange={handleChange} />
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

          {/* Rôles Animés & Badges Techno de la Bannière Hero */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#38bdf8", margin: 0 }}>
              ✨ Animation Typewriter & Badges Techno (Hero)
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Rôles défilants (séparés par des virgules)</label>
                <input
                  style={inputStyle}
                  value={heroRolesStr}
                  onChange={(e) => setHeroRolesStr(e.target.value)}
                  placeholder="ex: DevOps, Full Stack Developer, Cloud Architect"
                />
              </div>
              <div>
                <label style={labelStyle}>Badges technologiques Hero (séparés par des virgules)</label>
                <input
                  style={inputStyle}
                  value={heroBadgesStr}
                  onChange={(e) => setHeroBadgesStr(e.target.value)}
                  placeholder="ex: React, Laravel, Node.js, Cloud, DevOps"
                />
              </div>
            </div>
          </div>

          {/* Cartes de Points Forts (Section À Propos) */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#34d399", margin: 0 }}>
                  💡 Cartes de Points Forts & Expertise (Section À Propos)
                </h4>
                <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "2px 0 0" }}>
                  Modifiez le texte et les icônes des cartes affichées dans la section À Propos.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddHighlight}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "rgba(52, 211, 153, 0.15)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  color: "#34d399",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + Ajouter une Carte
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {highlights.map((hl, index) => (
                <div
                  key={hl.id || index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr 40px",
                    gap: "10px",
                    alignItems: "center",
                    background: "rgba(2, 6, 23, 0.6)",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <select
                    style={{ ...inputStyle, padding: "8px" }}
                    value={hl.icon || "Code2"}
                    onChange={(e) => handleUpdateHighlight(index, "icon", e.target.value)}
                  >
                    <option value="Code2">Code2 (Dev)</option>
                    <option value="Server">Server (Cloud/Ops)</option>
                    <option value="Zap">Zap (CI/CD/Vitesse)</option>
                    <option value="CheckCircle">CheckCircle (Qualité)</option>
                    <option value="Sparkles">Sparkles (IA/Innovation)</option>
                    <option value="Shield">Shield (Sécurité)</option>
                    <option value="Cloud">Cloud (Infrastructure)</option>
                    <option value="Brain">Brain (Intelligence)</option>
                    <option value="Layers">Layers (Architecture)</option>
                    <option value="Cpu">Cpu (Système)</option>
                  </select>

                  <input
                    style={inputStyle}
                    value={hl.text || ""}
                    onChange={(e) => handleUpdateHighlight(index, "text", e.target.value)}
                    placeholder="Texte de la carte d'expertise"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    style={{
                      background: "rgba(248, 113, 113, 0.15)",
                      border: "1px solid rgba(248, 113, 113, 0.3)",
                      color: "#f87171",
                      borderRadius: "8px",
                      height: "38px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Titres & Sous-titres Personnalisés des Sections */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f472b6", margin: 0 }}>
              🏷️ Titres & Sous-titres des Sections de la Page d'Accueil
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Titre Section Domaines d'Expertise (Services)</label>
                <input
                  name="servicesTitle"
                  style={inputStyle}
                  value={sectionTitles.servicesTitle || ""}
                  onChange={handleSectionTitleChange}
                />
              </div>
              <div>
                <label style={labelStyle}>Complément/Highlight du Titre Services</label>
                <input
                  name="servicesTitleHighlight"
                  style={inputStyle}
                  value={sectionTitles.servicesTitleHighlight || "d'Expertise"}
                  onChange={handleSectionTitleChange}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Sous-titre Section Domaines d'Expertise</label>
              <input
                name="servicesSubtitle"
                style={inputStyle}
                value={sectionTitles.servicesSubtitle || ""}
                onChange={handleSectionTitleChange}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Titre Section À Propos</label>
                <input
                  name="aboutTitle"
                  style={inputStyle}
                  value={sectionTitles.aboutTitle || ""}
                  onChange={handleSectionTitleChange}
                />
              </div>
              <div>
                <label style={labelStyle}>Highlight Titre À Propos</label>
                <input
                  name="aboutTitleHighlight"
                  style={inputStyle}
                  value={sectionTitles.aboutTitleHighlight || ""}
                  onChange={handleSectionTitleChange}
                />
              </div>
            </div>
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
