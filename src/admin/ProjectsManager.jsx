import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, ExternalLink, Search, FolderKanban, Eye, EyeOff, Lock, Edit3 } from "lucide-react";
import useProjects from "../hooks/useProjects";
import api from "../services/api";
import SEO from "../components/SEO";

export default function ProjectsManager() {
  // Pass true to include hidden projects in admin view
  const { projects } = useProjects(true);
  const [searchTerm, setSearchTerm] = useState("");

  function toggleHide(project) {
    try {
      const hiddenIds = JSON.parse(localStorage.getItem("hidden_project_ids") || "[]");
      const key = String(project.id);
      let updated;

      if (project.hidden || hiddenIds.includes(key) || (project.slug && hiddenIds.includes(project.slug))) {
        updated = hiddenIds.filter((id) => id !== key && id !== project.slug);
      } else {
        updated = [...hiddenIds, key];
        if (project.slug) updated.push(project.slug);
      }

      localStorage.setItem("hidden_project_ids", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("projects_updated"));
    } catch (err) {
      console.error("Toggle hide error:", err);
    }
  }

  async function remove(project) {
    if (!confirm(`Voulez-vous vraiment supprimer le projet "${project.title}" ?`)) return;

    try {
      await api.delete(`/projects/${project.id}`, { timeout: 1500 });
    } catch {
      console.warn("API Offline, deleting locally");
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
    } catch (err) {
      console.error("Deletion sync error:", err);
    }
  }

  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO title="Gestion des projets | Administration" />

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
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <FolderKanban color="#38bdf8" size={26} />
              Gestion des Projets ({projects.length})
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Gérez, modifiez, affichez ou masquez les projets affichés sur votre portfolio public.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ position: "relative", width: "240px" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 40px",
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

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", background: "rgba(9, 13, 22, 0.8)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
            Aucun projet ne correspond à votre recherche.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: "rgba(9, 13, 22, 0.85)",
                  border: project.hidden
                    ? "1px dashed rgba(245, 158, 11, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  opacity: project.hidden ? 0.75 : 1,
                }}
              >
                <div>
                  {/* Thumbnail Image */}
                  <div style={{ position: "relative", height: "180px", overflow: "hidden", background: "#020617" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/projects/preview.png";
                      }}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,13,22,0.9), transparent 70%)" }} />

                    {project.hidden && (
                      <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", padding: "4px 10px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.9)", color: "#020617", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Lock size={12} /> Masqué sur le site
                      </span>
                    )}

                    {project.status && (
                      <span style={{ position: "absolute", top: "12px", right: "12px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", padding: "4px 10px", borderRadius: "8px", background: "rgba(2, 6, 23, 0.8)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#38bdf8" }}>
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, uppercase: "true", color: "#38bdf8", letterSpacing: "0.08em" }}>
                      {project.category}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justify: "space-between" }}>
                  <Link
                    to={`/projects/${project.slug || project.id}`}
                    target="_blank"
                    style={{ fontSize: "0.78rem", fontWeight: 700, color: "#cbd5e1", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <ExternalLink size={14} color="#38bdf8" /> Aperçu
                  </Link>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {/* Edit Button */}
                    <Link
                      to={`/admin/projects/edit/${project.slug || project.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#38bdf8",
                        background: "rgba(56, 189, 248, 0.1)",
                        border: "1px solid rgba(56, 189, 248, 0.25)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      title="Modifier ce projet"
                    >
                      <Edit3 size={14} />
                      Éditer
                    </Link>

                    {/* Toggle Hide/Unhide Button */}
                    <button
                      onClick={() => toggleHide(project)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: project.hidden ? "#fbbf24" : "#cbd5e1",
                        background: project.hidden ? "rgba(245, 158, 11, 0.12)" : "rgba(255, 255, 255, 0.05)",
                        border: project.hidden ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      title={project.hidden ? "Rendre visible aux visiteurs" : "Masquer du site public"}
                    >
                      {project.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                      {project.hidden ? "Afficher" : "Masquer"}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => remove(project)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#f87171",
                        background: "rgba(248, 113, 113, 0.08)",
                        border: "1px solid rgba(248, 113, 113, 0.2)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      title="Supprimer définitivement"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
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