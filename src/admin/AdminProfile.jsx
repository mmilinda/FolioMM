import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSiteData } from "../context/SiteDataContext";
import SEO from "../components/SEO";
import api from "../services/api";
import {
  User,
  Shield,
  Key,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  Upload,
  ExternalLink,
  Camera,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function AdminProfile() {
  const { user, updateCredentials } = useAuth();
  const { profile, updateProfile, isBackendConnected } = useSiteData();

  const [activeTab, setActiveTab] = useState("info"); // 'info' | 'security'

  // État des informations de contact / profil
  const [profileData, setProfileData] = useState({
    name: profile?.name || "Milinda Mendy",
    headline: profile?.headline || "Développeuse Full Stack & Ingénieure DevOps",
    headlineEn: profile?.headlineEn || profile?.headline_en || "Full Stack & DevOps Developer",
    email: profile?.email || "mmilinda00@gmail.com",
    phone: profile?.phone || "+221 77 000 00 00",
    location: profile?.location || "Sénégal 🇸🇳 – Remote",
    availability: profile?.availability || "Ouverte aux opportunités",
    availabilityEn: profile?.availabilityEn || profile?.availability_en || "Open to opportunities",
    github: profile?.github || "https://github.com/mmilinda",
    linkedin: profile?.linkedin || "https://www.linkedin.com/in/milinda-mendy-5ba17928a/",
    twitter: profile?.twitter || "https://x.com/mmilinda",
    website: profile?.website || "https://milindamendy.com",
    bio: profile?.bio || "Je conçois et développe des applications web, plateformes SaaS et solutions digitales de bout en bout, de l'interface utilisateur au backend, aux API et au déploiement.",
    bioEn: profile?.bioEn || profile?.bio_en || "I design and build end-to-end web applications, SaaS platforms, and digital solutions — from user interface to backend, APIs, and deployment.",
    photo: profile?.photo || "/images/profile/MM.png",
    avatar: profile?.avatar || "/images/profile/MM.png",
    cvLinkFr: profile?.cvLinkFr || profile?.cv_link_fr || "/CV-Milinda-Mendy-FR.pdf",
    cvLinkEn: profile?.cvLinkEn || profile?.cv_link_en || "/CV-Milinda-Mendy-EN.pdf",
    yearsExp: profile?.yearsExp || profile?.years_exp || "5+",
    projectsCount: profile?.projectsCount || profile?.projects_count || "30+",
    uptimeRate: profile?.uptimeRate || profile?.uptime_rate || "99.9%",
  });

  const [infoSaving, setInfoSaving] = useState(false);
  const [infoFeedback, setInfoFeedback] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);

  // État de la sécurité / accès administrateur
  const [securityData, setSecurityData] = useState({
    adminName: user?.name || profile?.name || "Milinda Mendy",
    adminEmail: user?.email || profile?.email || "mmilinda00@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securityFeedback, setSecurityFeedback] = useState(null);

  // Gestion des modifications coordonnées
  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  // Sauvegarde des coordonnées
  async function handleSaveProfile(e) {
    e.preventDefault();
    setInfoSaving(true);
    setInfoFeedback(null);

    try {
      await updateProfile(profileData);
      setInfoFeedback({
        type: "success",
        message: "Vos coordonnées et informations ont été enregistrées et synchronisées avec succès !",
      });
      setTimeout(() => setInfoFeedback(null), 5000);
    } catch (err) {
      setInfoFeedback({
        type: "error",
        message: "Erreur lors de la sauvegarde : " + (err?.message || "Veuillez réessayer."),
      });
    } finally {
      setInfoSaving(false);
    }
  }

  // Téléversement d'image ou document
  async function handleFileUpload(e, fieldKey) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldKey);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", fieldKey.includes("cv") || fieldKey.includes("Cv") ? "documents" : "profiles");

      const response = await api.post("/upload", formData);
      if (response?.data?.url) {
        const fileUrl = response.data.url;
        setProfileData((prev) => {
          const next = { ...prev, [fieldKey]: fileUrl };
          if (fieldKey === "photo") next.avatar = fileUrl;
          updateProfile(next);
          return next;
        });
        setInfoFeedback({
          type: "success",
          message: `Fichier (${file.name}) téléversé avec succès !`,
        });
        setTimeout(() => setInfoFeedback(null), 4000);
      }
    } catch (err) {
      console.warn("Échec d'upload API, fallback local:", err);
      const localUrl = URL.createObjectURL(file);
      setProfileData((prev) => {
        const next = { ...prev, [fieldKey]: localUrl };
        if (fieldKey === "photo") next.avatar = localUrl;
        updateProfile(next);
        return next;
      });
      setInfoFeedback({
        type: "success",
        message: `Fichier (${file.name}) chargé en local !`,
      });
      setTimeout(() => setInfoFeedback(null), 4000);
    } finally {
      setUploadingField(null);
    }
  }

  // Gestion des modifications d'accès admin
  function handleSecurityChange(e) {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  }

  // Validation et mise à jour des accès de connexion
  async function handleSaveSecurity(e) {
    e.preventDefault();
    setSecuritySaving(true);
    setSecurityFeedback(null);

    // Vérifications de validité
    if (securityData.newPassword) {
      if (securityData.newPassword.length < 6) {
        setSecurityFeedback({
          type: "error",
          message: "Le nouveau mot de passe doit comporter au moins 6 caractères.",
        });
        setSecuritySaving(false);
        return;
      }

      if (securityData.newPassword !== securityData.confirmPassword) {
        setSecurityFeedback({
          type: "error",
          message: "La confirmation du mot de passe ne correspond pas au nouveau mot de passe.",
        });
        setSecuritySaving(false);
        return;
      }
    }

    try {
      const result = await updateCredentials({
        name: securityData.adminName,
        email: securityData.adminEmail,
        password: securityData.newPassword || undefined,
        currentPassword: securityData.currentPassword || undefined,
      });

      // Si l'email a changé, synchroniser également dans les coordonnées publiques
      if (securityData.adminEmail && securityData.adminEmail !== profileData.email) {
        setProfileData((prev) => {
          const next = { ...prev, email: securityData.adminEmail };
          updateProfile(next);
          return next;
        });
      }

      setSecurityFeedback({
        type: "success",
        message: result?.message || "Vos accès administrateur ont été mis à jour avec succès !",
      });

      // Réinitialiser les champs de mot de passe
      setSecurityData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setTimeout(() => setSecurityFeedback(null), 6000);
    } catch (err) {
      setSecurityFeedback({
        type: "error",
        message: err?.message || "Impossible de mettre à jour vos accès. Vérifiez l'ancien mot de passe.",
      });
    } finally {
      setSecuritySaving(false);
    }
  }

  return (
    <>
      <SEO title="Mon Profil & Accès | Espace Administrateur" noindex={true} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "3rem" }}>
        {/* Header de la page */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.25rem",
            marginBottom: "2rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                }}
              >
                <User size={22} />
              </div>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f8fafc", margin: 0 }}>
                  Mon Profil & Accès Administrateur
                </h1>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
                  Gérez toutes vos coordonnées publiques et modifiez vos identifiants d'accès sécurisés.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "10px",
                background: isBackendConnected ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                border: `1px solid ${isBackendConnected ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                color: isBackendConnected ? "#34d399" : "#fbbf24",
                fontSize: "0.78rem",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: isBackendConnected ? "#34d399" : "#fbbf24",
                }}
              />
              {isBackendConnected ? "Serveur API Connecté" : "Mode Hybride / Local"}
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#f8fafc",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <span>Voir le Folio</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Onglets de navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "1.75rem",
            background: "rgba(15, 23, 42, 0.6)",
            padding: "5px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            width: "fit-content",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9px",
              border: "none",
              background: activeTab === "info" ? "rgba(56, 189, 248, 0.15)" : "transparent",
              color: activeTab === "info" ? "#38bdf8" : "#94a3b8",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 0.2s",
              borderBottom: activeTab === "info" ? "2px solid #38bdf8" : "2px solid transparent",
            }}
          >
            <User size={16} />
            <span>Coordonnées & Informations Personnelles</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9px",
              border: "none",
              background: activeTab === "security" ? "rgba(129, 140, 248, 0.15)" : "transparent",
              color: activeTab === "security" ? "#818cf8" : "#94a3b8",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              transition: "all 0.2s",
              borderBottom: activeTab === "security" ? "2px solid #818cf8" : "2px solid transparent",
            }}
          >
            <Lock size={16} />
            <span>Modifier mes Accès & Sécurité</span>
          </button>
        </div>

        {/* CONTENU ONGLET 1 : COORDONNÉES & INFOS PERSONNELLES */}
        {activeTab === "info" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.75rem",
              alignItems: "start",
            }}
          >
            {/* Colonne Formulaire */}
            <div style={{ gridColumn: "span 2" }}>
              <form onSubmit={handleSaveProfile}>
                {infoFeedback && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      marginBottom: "1.5rem",
                      background:
                        infoFeedback.type === "success"
                          ? "rgba(16, 185, 129, 0.12)"
                          : "rgba(239, 68, 68, 0.12)",
                      border: `1px solid ${
                        infoFeedback.type === "success"
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(239, 68, 68, 0.3)"
                      }`,
                      color: infoFeedback.type === "success" ? "#34d399" : "#f87171",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    {infoFeedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{infoFeedback.message}</span>
                  </div>
                )}

                {/* Bloc 1 : Identité & Contact */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#f8fafc",
                      marginTop: 0,
                      marginBottom: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Mail size={18} color="#38bdf8" />
                    <span>Identité & Coordonnées Directes</span>
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "1.25rem",
                    }}
                  >
                    {/* Nom Complet */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Email Direct */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Email de Contact
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Numéro de Téléphone / WhatsApp
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="+221 77 000 00 00"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Localisation */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Localisation
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        placeholder="Sénégal 🇸🇳 – Remote"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Disponibilité (FR) */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Statut de Disponibilité (FR)
                      </label>
                      <input
                        type="text"
                        name="availability"
                        value={profileData.availability}
                        onChange={handleProfileChange}
                        placeholder="Ouverte aux opportunités"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Disponibilité (EN) */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Disponibilité (EN)
                      </label>
                      <input
                        type="text"
                        name="availabilityEn"
                        value={profileData.availabilityEn}
                        onChange={handleProfileChange}
                        placeholder="Open to opportunities"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Headline / Titre Professionnel */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "1.25rem",
                      marginTop: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Titre / Headline Principal (FR)
                      </label>
                      <input
                        type="text"
                        name="headline"
                        value={profileData.headline}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Titre / Headline (EN)
                      </label>
                      <input
                        type="text"
                        name="headlineEn"
                        value={profileData.headlineEn}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Bio FR & EN */}
                  <div style={{ marginTop: "1.25rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#cbd5e1",
                        marginBottom: "6px",
                      }}
                    >
                      Bio / Présentation (FR)
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(2, 6, 23, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#f8fafc",
                        fontSize: "0.88rem",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#cbd5e1",
                        marginBottom: "6px",
                      }}
                    >
                      Bio / Présentation (EN)
                    </label>
                    <textarea
                      name="bioEn"
                      rows={3}
                      value={profileData.bioEn}
                      onChange={handleProfileChange}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(2, 6, 23, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#f8fafc",
                        fontSize: "0.88rem",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>

                {/* Bloc 2 : Liens Professionnels & Réseaux Sociaux */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#f8fafc",
                      marginTop: 0,
                      marginBottom: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Globe size={18} color="#818cf8" />
                    <span>Liens Professionnels & Présence Web</span>
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        <FaGithub size={14} color="#38bdf8" />
                        <span>Profil GitHub</span>
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={profileData.github}
                        onChange={handleProfileChange}
                        placeholder="https://github.com/mmilinda"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        <FaLinkedin size={14} color="#0077b5" />
                        <span>Profil LinkedIn</span>
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={profileData.linkedin}
                        onChange={handleProfileChange}
                        placeholder="https://www.linkedin.com/in/..."
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        <FaXTwitter size={14} color="#38bdf8" />
                        <span>Twitter / X</span>
                      </label>
                      <input
                        type="url"
                        name="twitter"
                        value={profileData.twitter}
                        onChange={handleProfileChange}
                        placeholder="https://x.com/mmilinda"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        <Globe size={14} color="#34d399" />
                        <span>Site Web / Portfolio URL</span>
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={profileData.website}
                        onChange={handleProfileChange}
                        placeholder="https://milindamendy.com"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.88rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bloc 3 : Photo de Profil & CVs */}
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#f8fafc",
                      marginTop: 0,
                      marginBottom: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Camera size={18} color="#34d399" />
                    <span>Photo de Profil & Documents CV</span>
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: "1.5rem",
                    }}
                  >
                    {/* Photo de profil */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "8px",
                        }}
                      >
                        Photo de profil
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "2px solid #38bdf8",
                            flexShrink: 0,
                            background: "#0f172a",
                          }}
                        >
                          <img
                            src={profileData.photo}
                            alt="Photo de profil"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              e.currentTarget.src = "/logoMM.jpg";
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <input
                            type="text"
                            name="photo"
                            value={profileData.photo}
                            onChange={handleProfileChange}
                            placeholder="/images/profile/MM.png"
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              borderRadius: "8px",
                              background: "rgba(2, 6, 23, 0.7)",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              color: "#f8fafc",
                              fontSize: "0.8rem",
                              marginBottom: "6px",
                            }}
                          />
                          <label
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "5px 12px",
                              borderRadius: "6px",
                              background: "rgba(56, 189, 248, 0.12)",
                              border: "1px solid rgba(56, 189, 248, 0.3)",
                              color: "#38bdf8",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            <Upload size={13} />
                            <span>{uploadingField === "photo" ? "Téléversement..." : "Changer l'image"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => handleFileUpload(e, "photo")}
                              disabled={uploadingField === "photo"}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* CV Français */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "8px",
                        }}
                      >
                        Curriculum Vitae (Français)
                      </label>
                      <input
                        type="text"
                        name="cvLinkFr"
                        value={profileData.cvLinkFr}
                        onChange={handleProfileChange}
                        placeholder="/CV-Milinda-Mendy-FR.pdf"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.8rem",
                          marginBottom: "6px",
                        }}
                      />
                      <div style={{ display: "flex", gap: "8px" }}>
                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "5px 12px",
                            borderRadius: "6px",
                            background: "rgba(52, 211, 153, 0.12)",
                            border: "1px solid rgba(52, 211, 153, 0.3)",
                            color: "#34d399",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <Upload size={13} />
                          <span>{uploadingField === "cvLinkFr" ? "Téléversement..." : "Téléverser PDF FR"}</span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(e, "cvLinkFr")}
                            disabled={uploadingField === "cvLinkFr"}
                          />
                        </label>
                        {profileData.cvLinkFr && (
                          <a
                            href={profileData.cvLinkFr}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "5px 10px",
                              borderRadius: "6px",
                              background: "rgba(255, 255, 255, 0.05)",
                              color: "#cbd5e1",
                              fontSize: "0.75rem",
                              textDecoration: "none",
                            }}
                          >
                            <ExternalLink size={12} />
                            <span>Tester</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* CV Anglais */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "8px",
                        }}
                      >
                        Curriculum Vitae (Anglais)
                      </label>
                      <input
                        type="text"
                        name="cvLinkEn"
                        value={profileData.cvLinkEn}
                        onChange={handleProfileChange}
                        placeholder="/CV-Milinda-Mendy-EN.pdf"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background: "rgba(2, 6, 23, 0.7)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#f8fafc",
                          fontSize: "0.8rem",
                          marginBottom: "6px",
                        }}
                      />
                      <div style={{ display: "flex", gap: "8px" }}>
                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "5px 12px",
                            borderRadius: "6px",
                            background: "rgba(129, 140, 248, 0.12)",
                            border: "1px solid rgba(129, 140, 248, 0.3)",
                            color: "#818cf8",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <Upload size={13} />
                          <span>{uploadingField === "cvLinkEn" ? "Téléversement..." : "Téléverser PDF EN"}</span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(e, "cvLinkEn")}
                            disabled={uploadingField === "cvLinkEn"}
                          />
                        </label>
                        {profileData.cvLinkEn && (
                          <a
                            href={profileData.cvLinkEn}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "5px 10px",
                              borderRadius: "6px",
                              background: "rgba(255, 255, 255, 0.05)",
                              color: "#cbd5e1",
                              fontSize: "0.75rem",
                              textDecoration: "none",
                            }}
                          >
                            <ExternalLink size={12} />
                            <span>Tester</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton de soumission */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                  <button
                    type="submit"
                    disabled={infoSaving}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 28px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      cursor: infoSaving ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 20px rgba(56, 189, 248, 0.3)",
                      transition: "all 0.2s",
                      opacity: infoSaving ? 0.7 : 1,
                    }}
                  >
                    <Save size={18} />
                    <span>{infoSaving ? "Enregistrement en cours..." : "Enregistrer les Coordonnées"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Colonne Aperçu Carte Interactive */}
            <div>
              <div
                style={{
                  background: "linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.95))",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  position: "sticky",
                  top: "90px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      width: "88px",
                      height: "88px",
                      borderRadius: "50%",
                      margin: "0 auto 12px",
                      padding: "3px",
                      background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                      boxShadow: "0 0 25px rgba(56, 189, 248, 0.35)",
                    }}
                  >
                    <img
                      src={profileData.photo}
                      alt={profileData.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        background: "#020617",
                      }}
                      onError={(e) => {
                        e.currentTarget.src = "/logoMM.jpg";
                      }}
                    />
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" }}>
                    {profileData.name}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#38bdf8", fontWeight: 600, margin: "0 0 10px" }}>
                    {profileData.headline}
                  </p>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      background: "rgba(52, 211, 153, 0.1)",
                      border: "1px solid rgba(52, 211, 153, 0.3)",
                      color: "#34d399",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} />
                    {profileData.availability}
                  </span>
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem" }}>
                    <Mail size={15} color="#94a3b8" />
                    <a
                      href={`mailto:${profileData.email}`}
                      style={{ color: "#cbd5e1", textDecoration: "none", wordBreak: "break-all" }}
                    >
                      {profileData.email}
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem" }}>
                    <Phone size={15} color="#94a3b8" />
                    <a href={`tel:${profileData.phone}`} style={{ color: "#cbd5e1", textDecoration: "none" }}>
                      {profileData.phone}
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem" }}>
                    <MapPin size={15} color="#94a3b8" />
                    <span style={{ color: "#cbd5e1" }}>{profileData.location}</span>
                  </div>
                </div>

                {/* Liens Réseaux Sociaux Rapides */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    marginTop: "1.25rem",
                    paddingTop: "1.25rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {profileData.github && (
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#f8fafc",
                        display: "flex",
                      }}
                    >
                      <FaGithub size={16} />
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        background: "rgba(0, 119, 181, 0.12)",
                        border: "1px solid rgba(0, 119, 181, 0.3)",
                        color: "#38bdf8",
                        display: "flex",
                      }}
                    >
                      <FaLinkedin size={16} />
                    </a>
                  )}
                  {profileData.twitter && (
                    <a
                      href={profileData.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Twitter / X"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        background: "rgba(56, 189, 248, 0.12)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        color: "#38bdf8",
                        display: "flex",
                      }}
                    >
                      <FaXTwitter size={16} />
                    </a>
                  )}
                  {profileData.website && (
                    <a
                      href={profileData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Site web"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        background: "rgba(52, 211, 153, 0.12)",
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        color: "#34d399",
                        display: "flex",
                      }}
                    >
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENU ONGLET 2 : SÉCURITÉ & MODIFICATION DES ACCÈS */}
        {activeTab === "security" && (
          <div style={{ maxWidth: "750px", margin: "0 auto" }}>
            {securityFeedback && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  marginBottom: "1.75rem",
                  background:
                    securityFeedback.type === "success"
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  border: `1px solid ${
                    securityFeedback.type === "success"
                      ? "rgba(16, 185, 129, 0.35)"
                      : "rgba(239, 68, 68, 0.35)"
                  }`,
                  color: securityFeedback.type === "success" ? "#34d399" : "#f87171",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {securityFeedback.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{securityFeedback.message}</span>
              </div>
            )}

            {/* Récapitulatif Session & Compte Actuel */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "1.5rem 1.75rem",
                marginBottom: "1.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#38bdf8",
                  }}
                >
                  <Shield size={24} />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 3px", fontSize: "0.95rem", fontWeight: 700, color: "#f8fafc" }}>
                    Session Actuelle : {user?.name || "Milinda Mendy (Admin)"}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
                    Email actif : <span style={{ color: "#38bdf8", fontWeight: 600 }}>{user?.email || "mmilinda00@gmail.com"}</span>
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    background: "rgba(129, 140, 248, 0.12)",
                    border: "1px solid rgba(129, 140, 248, 0.25)",
                    color: "#818cf8",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  <Key size={12} />
                  <span>Sanctum & Firebase Sync</span>
                </span>
              </div>
            </div>

            {/* Formulaire de changement des accès */}
            <form onSubmit={handleSaveSecurity}>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.75)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "2rem",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "rgba(129, 140, 248, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#818cf8",
                    }}
                  >
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#f8fafc" }}>
                      Modifier mes Identifiants de Connexion
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
                      Modifiez votre adresse email d'administration ou définissez un nouveau mot de passe.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Nom Admin */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "#cbd5e1",
                        marginBottom: "6px",
                      }}
                    >
                      Nom du compte administrateur
                    </label>
                    <input
                      type="text"
                      name="adminName"
                      value={securityData.adminName}
                      onChange={handleSecurityChange}
                      required
                      style={{
                        width: "100%",
                        padding: "11px 15px",
                        borderRadius: "10px",
                        background: "rgba(2, 6, 23, 0.75)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#f8fafc",
                        fontSize: "0.88rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Email Admin */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "#cbd5e1",
                        marginBottom: "6px",
                      }}
                    >
                      Email de connexion Administrateur
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={securityData.adminEmail}
                      onChange={handleSecurityChange}
                      required
                      style={{
                        width: "100%",
                        padding: "11px 15px",
                        borderRadius: "10px",
                        background: "rgba(2, 6, 23, 0.75)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#f8fafc",
                        fontSize: "0.88rem",
                        outline: "none",
                      }}
                    />
                    <span style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px", display: "block" }}>
                      Cet email sert à vous identifier sur la page /admin/login.
                    </span>
                  </div>

                  {/* Séparateur Mot de passe */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      marginTop: "0.5rem",
                      paddingTop: "1.25rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                      <Key size={16} color="#38bdf8" />
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f8fafc" }}>
                        Changement du mot de passe
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>(optionnel)</span>
                    </div>

                    {/* Ancien mot de passe */}
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Mot de passe actuel
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          name="currentPassword"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          placeholder="Requis si vous changez le mot de passe"
                          style={{
                            width: "100%",
                            padding: "11px 40px 11px 15px",
                            borderRadius: "10px",
                            background: "rgba(2, 6, 23, 0.75)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#f8fafc",
                            fontSize: "0.88rem",
                            outline: "none",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Nouveau mot de passe */}
                    <div style={{ marginBottom: "1rem" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Nouveau mot de passe
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showNewPass ? "text" : "password"}
                          name="newPassword"
                          value={securityData.newPassword}
                          onChange={handleSecurityChange}
                          placeholder="Au moins 6 caractères"
                          style={{
                            width: "100%",
                            padding: "11px 40px 11px 15px",
                            borderRadius: "10px",
                            background: "rgba(2, 6, 23, 0.75)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#f8fafc",
                            fontSize: "0.88rem",
                            outline: "none",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirmation du nouveau mot de passe */}
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "6px",
                        }}
                      >
                        Confirmer le nouveau mot de passe
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          name="confirmPassword"
                          value={securityData.confirmPassword}
                          onChange={handleSecurityChange}
                          placeholder="Retapez le nouveau mot de passe"
                          style={{
                            width: "100%",
                            padding: "11px 40px 11px 15px",
                            borderRadius: "10px",
                            background: "rgba(2, 6, 23, 0.75)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#f8fafc",
                            fontSize: "0.88rem",
                            outline: "none",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton de sauvegarde des accès */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <button
                    type="submit"
                    disabled={securitySaving}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 28px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #6366f1, #818cf8)",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      cursor: securitySaving ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 20px rgba(129, 140, 248, 0.35)",
                      transition: "all 0.2s",
                      opacity: securitySaving ? 0.7 : 1,
                    }}
                  >
                    <Save size={18} />
                    <span>{securitySaving ? "Mise à jour en cours..." : "Mettre à jour mes Accès"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
