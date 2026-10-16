import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  ExternalLink,
  Search,
  FolderKanban,
  Eye,
  EyeOff,
  Lock,
  Edit3,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import useProjects from "../hooks/useProjects";
import api from "../services/api";
import SEO from "../components/SEO";
import { syncProjectsToServer, fetchProjectsFromServer, getAllLocalProjectsForSync } from "../services/projectSync";

export default function ProjectsManager() {
  // Pass true to include hidden projects in admin view
  const { projects, refetch } = useProjects(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  async function handleForceSync() {
    setIsSyncing(true);
    setStatusMsg({
      type: "info",
      text: "Synchronisation de tous les projets avec le serveur distant Render / PostgreSQL en cours...",
    });

    const res = await syncProjectsToServer();
    setIsSyncing(false);

    if (res?.synced) {
      setStatusMsg({
        type: "success",
        text: `✅ Projets synchronisés avec succès sur le serveur distant (${res?.projects?.length || projects.length} projets en ligne) ! Toutes vos modifications et images sont maintenant visibles en direct sur tous les autres appareils.`,
      });
      setTimeout(() => setStatusMsg(null), 6000);
      refetch?.();
    } else {
      setStatusMsg({
        type: "warning",
        text: `⚠️ Échec de synchronisation avec le serveur distant (${res?.error || "Connexion refusée"}). Les modifications restent sauvegardées sur cet appareil.`,
      });
    }
  }

  async function handleCheckServer() {
    setIsSyncing(true);
    setStatusMsg({
      type: "info",
      text: "Interrogation en direct de la base de données distante...",
    });

    const fresh = await fetchProjectsFromServer();
    setIsSyncing(false);

    if (fresh && fresh.length > 0) {
      setStatusMsg({
        type: "success",
        text: `✅ Base de données centrale connectée : ${fresh.length} projets actifs en ligne. Vos données sont synchronisées.`,
      });
      setTimeout(() => setStatusMsg(null), 5000);
      refetch?.();
    } else {
      setStatusMsg({
        type: "warning",
        text: "Le serveur distant est en cours de réveil ou n'a pas répondu à temps. Cliquez sur 'Forcer la synchronisation' pour renvoyer vos données.",
      });
    }
  }

  async function moveProject(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const orderList = updated.map((p) => p.slug || String(p.id));
    localStorage.setItem("projects_order", JSON.stringify(orderList));
    window.dispatchEvent(new CustomEvent("projects_updated"));

    // Sync order to server
    syncProjectsToServer(updated).catch(() => {});
  }

  async function toggleHide(project) {
    try {
      const hiddenIds = JSON.parse(localStorage.getItem("hidden_project_ids") || "[]");
      const key = String(project.id);
      let updatedHidden;

      if (project.hidden || hiddenIds.includes(key) || (project.slug && hiddenIds.includes(project.slug))) {
        updatedHidden = hiddenIds.filter((id) => id !== key && id !== project.slug);
      } else {
        updatedHidden = [...hiddenIds, key];
        if (project.slug) updatedHidden.push(project.slug);
      }

      localStorage.setItem("hidden_project_ids", JSON.stringify(updatedHidden));
      window.dispatchEvent(new CustomEvent("projects_updated"));

      const updatedProjects = projects.map((p) => {
        if (String(p.id) === key || (p.slug && p.slug === project.slug)) {
          return { ...p, hidden: !p.hidden };
        }
        return p;
      });

      syncProjectsToServer(updatedProjects).catch(() => {});
    } catch (err) {
      console.error("Toggle hide error:", err);
    }
  }

  async function remove(project) {
    if (!confirm(`Voulez-vous vraiment supprimer le projet "${project.title}" ?`)) return;

    try {
      await api.delete(`/projects/${project.id || project.slug}`, { timeout: 4000 });
    } catch {
      console.warn("API direct delete fallback");
    }

    try {
      const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
      const updatedCustom = custom.filter((p) => String(p.id) !== String(project.id) && p.slug !== project.slug);
      localStorage.setItem("custom_projects", JSON.stringify(updatedCustom));

      const deletedIds = JSON.parse(localStorage.getItem("deleted_project_ids") || "[]");
      if (!deletedIds.includes(String(project.id))) deletedIds.push(String(project.id));
      if (project.slug && !deletedIds.includes(project.slug)) deletedIds.push(project.slug);
      localStorage.setItem("deleted_project_ids", JSON.stringify(deletedIds));

      window.dispatchEvent(new CustomEvent("projects_updated"));

      const remaining = projects.filter((p) => String(p.id) !== String(project.id) && p.slug !== project.slug);
      syncProjectsToServer(remaining).catch(() => {});
    } catch (err) {
      console.error("Deletion sync error:", err);
    }
  }

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO title="Gestion des projets | Administration" noindex={true} />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1200px" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#ffffff",
                margin: "0 0 0.25rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FolderKanban color="#38bdf8" size={26} />
              Gestion des Projets ({projects.length})
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Gérez, modifiez, synchronisez et publiez vos projets en direct sur tous les appareils.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={handleForceSync}
              disabled={isSyncing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 16px",
                borderRadius: "12px",
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                color: "#38bdf8",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: isSyncing ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
              title="Force l'enregistrement de tous les projets locaux vers la base de données distante Render"
            >
              {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <CloudUpload size={16} />}
              Synchroniser avec le serveur
            </button>

            <button
              onClick={handleCheckServer}
              disabled={isSyncing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 14px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#cbd5e1",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: isSyncing ? "not-allowed" : "pointer",
              }}
              title="Vérifie le contenu en ligne sur le serveur distant"
            >
              <RefreshCw size={15} />
              Vérifier le serveur
            </button>

            <div style={{ position: "relative", width: "200px" }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px 9px 36px",
                  borderRadius: "12px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <Link
              to="/admin/projects/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "12px",
                background: "#38bdf8",
                color: "#020617",
                fontSize: "0.85rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(56, 189, 248, 0.3)",
              }}
            >
              <Plus size={16} />
              Nouveau projet
            </Link>
          </div>
        </div>

        {/* Sync Status Banner */}
        {statusMsg && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "0.88rem",
              fontWeight: 500,
              background:
                statusMsg.type === "success"
                  ? "rgba(16, 185, 129, 0.15)"
                  : statusMsg.type === "warning"
                  ? "rgba(245, 158, 11, 0.15)"
                  : "rgba(56, 189, 248, 0.15)",
              border: `1px solid ${
                statusMsg.type === "success"
                  ? "rgba(16, 185, 129, 0.4)"
                  : statusMsg.type === "warning"
                  ? "rgba(245, 158, 11, 0.4)"
                  : "rgba(56, 189, 248, 0.4)"
              }`,
              color:
                statusMsg.type === "success"
                  ? "#34d399"
                  : statusMsg.type === "warning"
                  ? "#fbbf24"
                  : "#38bdf8",
            }}
          >
            {statusMsg.type === "success" && <CheckCircle2 size={18} style={{ flexShrink: 0 }} />}
            {statusMsg.type === "warning" && <AlertCircle size={18} style={{ flexShrink: 0 }} />}
            {statusMsg.type === "info" && <Loader2 size={18} className="animate-spin" style={{ flexShrink: 0 }} />}
            <span style={{ flex: 1 }}>{statusMsg.text}</span>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              background: "rgba(9, 13, 22, 0.8)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
            }}
          >
            Aucun projet ne correspond à votre recherche.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                style={{
                  background: "rgba(9, 13, 22, 0.85)",
                  border: project.hidden
                    ? "1px dashed rgba(255, 255, 255, 0.15)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  opacity: project.hidden ? 0.6 : 1,
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {/* Image preview with aspect ratio */}
                <div style={{ position: "relative", height: "170px", background: "#0b1120", overflow: "hidden" }}>
                  <img
                    src={project.image || "/images/projects/preview.png"}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = project.fallbackImage || "/images/projects/preview.png";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(9, 13, 22, 0.9) 0%, transparent 60%)",
                    }}
                  />

                  {/* Status & Featured badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {project.featured && (
                      <span
                        style={{
                          background: "rgba(245, 158, 11, 0.9)",
                          color: "#000",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        ⭐ Vedette
                      </span>
                    )}
                    {project.status && (
                      <span
                        style={{
                          background:
                            project.status === "Production"
                              ? "rgba(16, 185, 129, 0.9)"
                              : "rgba(56, 189, 248, 0.9)",
                          color: "#000",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>

                  {project.hidden && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(239, 68, 68, 0.9)",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <EyeOff size={12} /> Masqué
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#38bdf8",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {project.category}
                    </span>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: "4px 0 6px" }}>
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tech tags */}
                  {project.technologies && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                      {(Array.isArray(project.technologies)
                        ? project.technologies
                        : typeof project.technologies === "string"
                        ? project.technologies.split(",")
                        : []
                      )
                        .slice(0, 4)
                        .map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.7rem",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              color: "#cbd5e1",
                            }}
                          >
                            {typeof tech === "string" ? tech.trim() : tech}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      marginTop: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <button
                        onClick={() => moveProject(idx, -1)}
                        disabled={idx === 0}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: idx === 0 ? "#475569" : "#94a3b8",
                          cursor: idx === 0 ? "default" : "pointer",
                          padding: "6px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        title="Monter"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        onClick={() => moveProject(idx, 1)}
                        disabled={idx === filteredProjects.length - 1}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: idx === filteredProjects.length - 1 ? "#475569" : "#94a3b8",
                          cursor: idx === filteredProjects.length - 1 ? "default" : "pointer",
                          padding: "6px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        title="Descendre"
                      >
                        <ArrowDown size={15} />
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => toggleHide(project)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: project.hidden ? "#38bdf8" : "#94a3b8",
                          cursor: "pointer",
                          padding: "6px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        title={project.hidden ? "Afficher sur le portfolio" : "Masquer du portfolio"}
                      >
                        {project.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>

                      <Link
                        to={`/admin/projects/edit/${project.slug || project.id}`}
                        style={{
                          background: "rgba(56, 189, 248, 0.1)",
                          border: "1px solid rgba(56, 189, 248, 0.3)",
                          color: "#38bdf8",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Edit3 size={14} />
                        Modifier
                      </Link>

                      <button
                        onClick={() => remove(project)}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#ef4444",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}