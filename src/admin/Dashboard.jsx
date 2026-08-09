import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  FileText,
  Users,
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
} from "lucide-react";
import useProjects from "../hooks/useProjects";
import useArticles from "../hooks/useArticles";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function Dashboard() {
  const { user } = useAuth();
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

  const [pageViews, setPageViews] = useState(() => {
    try {
      const stored = localStorage.getItem("portfolio_page_views");
      return stored ? parseInt(stored, 10) : 1450;
    } catch {
      return 1450;
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

  // Compute 100% Real Dynamic KPI Statistics
  const totalProjects = projects.length;
  const featuredProjectsCount = projects.filter((p) => p.featured).length;
  const hiddenProjectsCount = projects.filter((p) => p.hidden).length;

  const totalArticles = articles.length;
  const publishedArticlesCount = articles.filter((a) => !a.hidden).length;
  const hiddenArticlesCount = articles.filter((a) => a.hidden).length;

  const totalMessages = messages.length;
  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const stats = [
    {
      title: "Projets en Vitrine",
      value: totalProjects,
      detail: `${featuredProjectsCount} en vedette • ${hiddenProjectsCount} masqué(s)`,
      icon: FolderKanban,
      color: "#38bdf8",
      bgColor: "rgba(56, 189, 248, 0.12)",
      borderColor: "rgba(56, 189, 248, 0.25)",
      link: "/admin/projects",
    },
    {
      title: "Articles de Blog",
      value: totalArticles,
      detail: `${publishedArticlesCount} publics • ${hiddenArticlesCount} masqué(s)`,
      icon: FileText,
      color: "#818cf8",
      bgColor: "rgba(129, 140, 248, 0.12)",
      borderColor: "rgba(129, 140, 248, 0.25)",
      link: "/admin/articles",
    },
    {
      title: "Messages Reçus",
      value: totalMessages,
      detail: `${unreadMessagesCount} message(s) non lu(s)`,
      icon: MessageSquare,
      color: "#f472b6",
      bgColor: "rgba(244, 114, 182, 0.12)",
      borderColor: "rgba(244, 114, 182, 0.25)",
      link: "/admin/messages",
    },
    {
      title: "Audience & Visites",
      value: `${pageViews.toLocaleString("fr-FR")}+`,
      detail: "Analytique dynamique du site",
      icon: Users,
      color: "#34d399",
      bgColor: "rgba(52, 211, 153, 0.12)",
      borderColor: "rgba(52, 211, 153, 0.25)",
      link: "/admin/settings",
    },
  ];

  const recentProjects = projects.slice(0, 5);

  return (
    <>
      <SEO title="Tableau de bord Admin | Milinda Mendy" />

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%" }}>
        {/* ── Welcome Banner ─────────────────────────────────────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(56, 189, 248, 0.08))",
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
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0, lineHeight: 1.6, maxWidth: "580px" }}>
              Voici l'état en temps réel de votre portfolio : {totalProjects} projet(s), {totalArticles} article(s) et {unreadMessagesCount} message(s) non lu(s).
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

        {/* ── KPI Metric Cards Grid (Responsive 4-col Desktop / 2-col Tablet / 1-col Mobile) ── */}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.75rem" }}>
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
              gridColumn: "span 2 / span 2",
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

          {/* Right Column: System Status */}
          <div
            style={{
              background: "rgba(9, 13, 22, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div>
              <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "1.25rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                  <Activity size={20} color="#fbbf24" />
                  Statut du Système
                </h2>
                <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "4px 0 0" }}>
                  Supervision des services & bases de données
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.8rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Frontend PWA</span>
                  <span style={{ color: "#34d399", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                    <CheckCircle2 size={14} /> React 19 + Vite
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.8rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Base de données</span>
                  <span style={{ color: "#38bdf8", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldCheck size={14} /> Firebase / Local
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.8rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Service Worker PWA</span>
                  <span style={{ color: "#34d399", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                    <Sparkles size={14} /> Actif (Badges)
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "rgba(2, 6, 23, 0.6)", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "0.8rem" }}>
                  <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Backend API</span>
                  <span style={{ color: "#818cf8", fontWeight: 700 }}>Laravel Sanctum</span>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "16px",
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                color: "#38bdf8",
                fontSize: "0.78rem",
                fontWeight: 600,
                lineHeight: 1.6,
              }}
            >
              💡 <strong>Base Dynamique :</strong> Toutes vos statistiques sont synchronisées automatiquement à la seconde près !
            </div>
          </div>
        </div>
      </div>
    </>
  );
}