import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger la liste des projets depuis Laravel
  async function load() {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des projets :", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Supprimer un projet — DELETE /api/projects/{id} (route protégée Sanctum)
  async function remove(id) {
    if (!confirm("Es-tu sûr de vouloir supprimer ce projet ?")) return;

    try {
      await api.delete(`/projects/${id}`);
      // Mise à jour locale sans recharger toute la liste
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Impossible de supprimer le projet.");
    }
  }

  if (loading) {
    return (
      <p className="text-cyan-400 animate-pulse">
        Chargement de la gestion des projets...
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Mes projets</h1>
        <Link
          to="/admin/projects/create"
          className="bg-cyan-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-300 transition-colors"
        >
          + Nouveau projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-400">Aucun projet pour l'instant.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-2xl p-5">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-xl h-40 w-full object-cover"
                />
              )}

              <h2 className="font-bold mt-4">{project.title}</h2>

              {project.category && (
                <span className="text-xs text-cyan-400 mt-1 block">
                  {project.category}
                </span>
              )}

              <button
                onClick={() => remove(project.id)}
                className="text-red-400 hover:text-red-300 mt-4 font-semibold transition-colors"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}