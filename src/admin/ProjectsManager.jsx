import { useEffect, useState } from "react";
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

  // Supprimer un projet
  async function remove(id) {
    if (confirm("Es-tu sûr de vouloir supprimer ce projet ?")) {
      try {
        await api.delete(`/projects/${id}`);
        // Recharger la liste après la suppression
        load();
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  }

  if (loading) {
    return <p className="text-cyan-400">Chargement de la gestion des projets...</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Mes projets</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-2xl p-5">
            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl h-40 w-full object-cover"
            />

            <h2 className="font-bold mt-4">{project.title}</h2>

            <button
              onClick={() => remove(project.id)}
              className="text-red-400 hover:text-red-300 mt-4 font-semibold transition-colors"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}