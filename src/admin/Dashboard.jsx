import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Plus,
  ExternalLink,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Activity,
  Inbox,
  Lock,
  Edit3,
  Eye,
  EyeOff,
  Layers,
  Cpu,
  Briefcase,
  Settings,
  Check,
} from "lucide-react";
import useProjects from "../hooks/useProjects";
import useArticles from "../hooks/useArticles";
import { useAuth } from "../context/AuthContext";
import { useSiteData } from "../context/SiteDataContext";
import SEO from "../components/SEO";

export default function Dashboard() {
  const { user } = useAuth();
  const { services, skills, timeline, impact, sectionVisibility } = useSiteData();

  // Pass true to include all projects & articles (visible & hidden)
  const { projects } = useProjects(true);
  const { articles } = useArticles(true);

  const userName = user?.name ? user.name.replace(/\s*\(Admin\)/gi, "") : "Milinda";

  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("contact_messages") || "[]");
    } catch {
      return [];
    }
  });

  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function refreshMessages() {
      try {
        setMessages(JSON.parse(localStorage.getItem("contact_messages") || "[]"));
      } catch {
        setMessages([]);
      }
    }
    window.addEventListener("messages_updated", refreshMessages);
    return () => window.removeEventListener("messages_updated", refreshMessages);
  }, []);

  const markMessageAsRead = (id) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
    localStorage.setItem("contact_messages", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("messages_updated"));
  };

  // Compute Dynamic KPI Statistics
  const totalProjects = projects.length;
  const featuredProjectsCount = projects.filter((p) => p.featured).length;

  const totalArticles = articles.length;
  const totalServices = services.length;
  const hiddenServicesCount = services.filter((s) => s.hidden).length;
  const publishedArticlesCount = articles.filter((a) => !a.hidden).length;

  const totalMessages = messages.length;
  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const stats = [
    {
      title: "Projets Vitrine",
      value: totalProjects,
      detail: `${featuredProjectsCount} en vedette`,
      icon: FolderKanban,
      color: "#38bdf8",
      bgColor: "rgba(56, 189, 248, 0.12)",
      borderColor: "rgba(56, 189, 248, 0.25)",
      link: "/admin/projects",
    },
    {
      title: "Services Offerts",
      value: totalServices,
      detail: hiddenServicesCount > 0 ? `${hiddenServicesCount} masqué(s)` : "Tous visibles",
      icon: Layers,
      color: "#34d399",
      bgColor: "rgba(52, 211, 153, 0.12)",
      borderColor: "rgba(52, 211, 153, 0.25)",
      link: "/admin/services",
    },
    {
      title: "Compétences & Stack",
      value: skills.reduce((acc, c) => acc + (c.skills?.length || 0), 0),
      detail: `${skills.length} catégories`,
      icon: Cpu,
      color: "#a855f7",
      bgColor: "rgba(168, 85, 247, 0.12)",
      borderColor: "rgba(168, 85, 247, 0.25)",
      link: "/admin/skills",
    },
    {
      title: "Parcours / Timeline",
      value: timeline.length,
      detail: "Expériences & Diplômes",
      icon: Briefcase,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.25)",
      link: "/admin/timeline",
    },
    {
      title: "Impact & Avis",
      value: (impact.metrics?.length || 0) + (impact.testimonials?.length || 0),
      detail: `${impact.testimonials?.length || 0} témoignage(s)`,
      icon: Zap,
      color: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.12)",
      borderColor: "rgba(236, 72, 153, 0.25)",
      link: "/admin/impact",
    },
    {
      title: "Articles de Blog",
      value: totalArticles,
      detail: `${publishedArticlesCount} publiés`,
      icon: FileText,
      color: "#818cf8",
      bgColor: "rgba(129, 140, 248, 0.12)",
      borderColor: "rgba(129, 140, 248, 0.25)",
      link: "/admin/articles",
    },
    {
      title: "Messages Reçus",
      value: totalMessages,
      detail: `${unreadMessagesCount} non lu(s)`,
      icon: MessageSquare,
      color: "#f472b6",
      bgColor: "rgba(244, 114, 182, 0.12)",
      borderColor: "rgba(244, 114, 182, 0.25)",
      link: "/admin/messages",
    },
  ];

  const recentProjects = projects.slice(0, 5);
  const recentMessages = messages.slice(0, 4);

  const sectionsList = [
    { key: "hero", label: "Hero Banner" },
    { key: "about", label: "À propos" },
    { key: "services", label: "Services" },
    { key: "projects", label: "Projets" },
    { key: "impact", label: "Impact & Avis" },
    { key: "timeline", label: "Parcours" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <>
      <SEO title="Tableau de bord Admin | Milinda Mendy" />

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}>
        {/* ── Welcome Banner ─────────────────────────────────────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(56, 189, 248, 0.08))",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            padding: "2rem 2.25rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(56,189,248,0.15), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.25)",
                color: "#38bdf8",
                fontSize: "0.72rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              <Zap size={13} fill="#38bdf8" />
              <span>Console Administrateur Synchrone</span>
            </div>

            <h1
              style={{
                fontSize: "1.85rem",
                fontWeight: 900,
                color: "#ffffff",
                margin: "0 0 0.35rem",
                letterSpacing: "-0.02em",
              }}
            >
              Bonjour, <span style={{ color: "#38bdf8" }}>{userName}</span> 👋
            </h1>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0, lineHeight: 1.6, maxWidth: "620px" }}>
              Bienvenue sur la console d'administration. Vous avez <strong>{totalProjects} projets</strong>, <strong>{totalArticles} articles</strong> et <strong>{unreadMessagesCount} message(s) non lu(s)</strong>.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
            <Link
              to="/admin/projects/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                color: "#020617",
                fontSize: "0.85rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(56,189,248,0.3)",
              }}
            >
              <Plus size={18} />
              Nouveau projet
            </Link>

            <Link
              to="/admin/messages"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 18px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                position: "relative",
              }}
            >
              <Inbox size={17} color="#f472b6" />
              Boîte de réception
              {unreadMessagesCount > 0 && (
                <span
                  style={{
                    padding: "2px 7px",
                    borderRadius: "10px",
                    background: "#f472b6",
                    color: "#020617",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                  }}
                >
                  {unreadMessagesCount}
                </span>
              )}
            </Link>

            <Link
              to="/"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 16px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <ExternalLink size={16} />
              Voir site
            </Link>
          </div>
        </div>

        {/* ── Quick Action Shortcuts Grid ───────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: windowWidth >= 1024 ? "repeat(5, 1fr)" : windowWidth >= 640 ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
            gap: "0.85rem",
            width: "100%",
          }}
        >
          {[
            { label: "Ajouter Projet", path: "/admin/projects/create", icon: Plus, color: "#38bdf8" },
            { label: "Gérer Services", path: "/admin/services", icon: Layers, color: "#34d399" },
            { label: "Créer Article", path: "/admin/articles/create", icon: FileText, color: "#818cf8" },
            { label: "Gérer Compétences", path: "/admin/skills", icon: Cpu, color: "#a855f7" },
            { label: "Paramètres Site", path: "/admin/settings", icon: Settings, color: "#fbbf24" },
          ].map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.label}
                to={act.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 14px",
                  borderRadius: "14px",
                  background: "rgba(9, 13, 22, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#e2e8f0",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = act.color;
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.background = "rgba(9, 13, 22, 0.75)";
                }}
              >
                <div
                  style={{
                    padding: "6px",
                    borderRadius: "8px",
                    background: `${act.color}15`,
                    color: act.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={16} />
                </div>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{act.label}</span>
              </Link>
            );
          })}
        </div>

        {/* ── KPI Metric Cards Grid ─────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: windowWidth >= 1024 ? "repeat(4, minmax(0, 1fr))" : windowWidth >= 640 ? "repeat(2, minmax(0, 1fr))" : "1fr",
            gap: "1.25rem",
            width: "100%",
          }}
        >
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} to={item.link} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "rgba(9, 13, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>
                      {item.title}
                    </span>
                    <div
                      style={{
                        padding: "10px",
                        borderRadius: "12px",
                        background: item.bgColor,
                        border: `1px solid ${item.borderColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color={item.color} />
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.03em" }}>
                      {item.value}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "0.35rem", fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8" }}>
                      <TrendingUp size={14} color="#34d399" />
                      <span>{item.detail}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Main Content Grid ────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: windowWidth >= 1024 ? "2fr 1fr" : "1fr", gap: "1.75rem" }}>
          
          {/* Left Column: Recent Projects */}
          <div
            style={{
              background: "rgba(9, 13, 22, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                  <FolderKanban size={20} color="#38bdf8" />
                  Derniers Projets Enregistrés ({recentProjects.length})
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: "4px 0 0" }}>
                  Aperçu en direct de vos réalisations
                </p>
              </div>

              <Link
                to="/admin/projects"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#38bdf8",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  textDecoration: "none",
                }}
              >
                Gérer tous ({totalProjects})
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.1rem",
                    borderRadius: "16px",
                    background: "rgba(2, 6, 23, 0.6)",
                    border: project.hidden ? "1px dashed rgba(245,158,11,0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/projects/preview.png";
                      }}
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {project.title}
                        </h3>
                        {project.hidden ? (
                          <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", padding: "2px 8px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#fbbf24", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                            <Lock size={10} /> Masqué
                          </span>
                        ) : project.featured ? (
                          <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", padding: "2px 8px", borderRadius: "10px", background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8" }}>
                            ★ Featured
                          </span>
                        ) : null}
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, marginLeft: "1rem" }}>
                    <Link
                      to={`/admin/projects/edit/${project.slug || project.id}`}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: "rgba(56, 189, 248, 0.1)",
                        border: "1px solid rgba(56, 189, 248, 0.25)",
                        color: "#38bdf8",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        textDecoration: "none",
                      }}
                    >
                      <Edit3 size={13} /> Éditer
                    </Link>

                    <Link
                      to={`/projects/${project.slug || project.id}`}
                      target="_blank"
                      style={{
                        padding: "8px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                      }}
                      title="Voir le projet public"
                    >
                      <ExternalLink size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: System Status & Section Visibility */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            
            {/* Recent Contact Messages Preview Widget */}
            <div
              style={{
                background: "rgba(9, 13, 22, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Inbox size={18} color="#f472b6" />
                  Derniers Messages ({unreadMessagesCount} non lus)
                </h3>
                <Link to="/admin/messages" style={{ fontSize: "0.75rem", color: "#f472b6", fontWeight: 700, textDecoration: "none" }}>
                  Tout voir ↗
                </Link>
              </div>

              {recentMessages.length === 0 ? (
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: 0, textAlign: "center", padding: "1rem 0" }}>
                  Aucun message reçu pour le moment.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        background: msg.read ? "rgba(2, 6, 23, 0.4)" : "rgba(244, 114, 182, 0.08)",
                        border: msg.read ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(244, 114, 182, 0.25)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff" }}>{msg.name}</span>
                        {!msg.read && (
                          <button
                            onClick={() => markMessageAsRead(msg.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#34d399",
                              cursor: "pointer",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                            title="Marquer comme lu"
                          >
                            <Check size={12} /> Marquer lu
                          </button>
                        )}
                      </div>
                      <span style={{ fontSize: "0.73rem", color: "#94a3b8" }}>{msg.email}</span>
                      <p style={{ fontSize: "0.78rem", color: "#cbd5e1", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section Visibility Live Widget */}
            <div
              style={{
                background: "rgba(9, 13, 22, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Eye size={18} color="#34d399" />
                  Visibilité des Sections
                </h3>
                <Link to="/admin/settings" style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 700, textDecoration: "none" }}>
                  Modifier ⚙️
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {sectionsList.map((sec) => {
                  const isVis = sectionVisibility ? sectionVisibility[sec.key] !== false : true;
                  return (
                    <div
                      key={sec.key}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "10px",
                        background: isVis ? "rgba(52, 211, 153, 0.08)" : "rgba(239, 68, 68, 0.08)",
                        border: isVis ? "1px solid rgba(52, 211, 153, 0.2)" : "1px solid rgba(239, 68, 68, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: isVis ? "#34d399" : "#ef4444",
                      }}
                    >
                      <span>{sec.label}</span>
                      {isVis ? <Eye size={13} /> : <EyeOff size={13} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div
              style={{
                background: "rgba(9, 13, 22, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{ paddingBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Activity size={18} color="#fbbf24" />
                  Statut & Infrastructure
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "10px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.78rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Frontend App</span>
                  <span style={{ color: "#34d399", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px" }}>
                    <CheckCircle2 size={13} /> React 19 + Vite
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "10px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.78rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Base de données</span>
                  <span style={{ color: "#38bdf8", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px" }}>
                    <ShieldCheck size={13} /> Synchronisée
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "10px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.78rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>PWA Offline & Notifs</span>
                  <span style={{ color: "#34d399", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px" }}>
                    <Sparkles size={13} /> Actif
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
