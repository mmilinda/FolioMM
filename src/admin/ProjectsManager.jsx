import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, ExternalLink, Search, FolderKanban } from "lucide-react";
import useProjects from "../hooks/useProjects";
import api from "../services/api";
import SEO from "../components/SEO";

export default function ProjectsManager() {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");

  async function remove(project) {
    if (!confirm(`Voulez-vous vraiment supprimer le projet "${project.title}" ?`)) return;

    try {
      await api.delete(`/projects/${project.id}`, { timeout: 1500 });
    } catch {
      console.warn("API Offline, deleting locally");
    }

    try {
      // 1. Remove from custom_projects if present
      const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
      const updatedCustom = custom.filter((p) => String(p.id) !== String(project.id) && p.slug !== project.slug);
      localStorage.setItem("custom_projects", JSON.stringify(updatedCustom));

      // 2. Add to deleted_project_ids
      const deletedIds = JSON.parse(localStorage.getItem("deleted_project_ids") || "[]");
      if (!deletedIds.includes(String(project.id))) {
        deletedIds.push(String(project.id));
      }
      if (project.slug && !deletedIds.includes(project.slug)) {
        deletedIds.push(project.slug);
      }
      localStorage.setItem("deleted_project_ids", JSON.stringify(deletedIds));

      // 3. Dispatch update event
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

      <div className="space-y-6 max-w-7xl">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <FolderKanban className="text-cyan-400" size={24} />
              Gestion des Projets ({projects.length})
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Gérez l'ensemble des projets affichés sur votre portfolio public
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition w-full sm:w-60"
              />
            </div>

            <Link
              to="/admin/projects/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition no-underline shadow-sm flex-shrink-0"
            >
              <Plus size={16} />
              Nouveau projet
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#090d16] border border-slate-800/80 rounded-2xl">
            <p className="text-slate-400 text-sm">Aucun projet ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#090d16] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700/80 transition group shadow-lg"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/projects/preview.png";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent opacity-80" />

                    {project.status && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur border border-slate-700/50 text-cyan-300">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/40 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/projects/${project.slug || project.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-cyan-400 transition"
                    >
                      <ExternalLink size={13} /> Aperçu public
                    </Link>
                  </div>

                  <button
                    onClick={() => remove(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
                    title="Supprimer ce projet"
                  >
                    <Trash2 size={14} />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}