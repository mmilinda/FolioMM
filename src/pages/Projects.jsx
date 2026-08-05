import { useEffect, useState } from "react";
import api from "../services/api"; // Ton instance Axios vers Laravel
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  // 1. États pour la gestion des données de l'API et du chargement
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tous");

  // 2. Récupération dynamique depuis l'API Laravel
  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des projets :", err);
        setLoading(false);
      });
  }, []);

  // 3. Calcul dynamique des catégories basées sur les projets reçus de l'API
  const categories = [
    "Tous",
    ...new Set(projects.map((p) => p.category).filter(Boolean)), // filter(Boolean) évite d'ajouter des valeurs vides
  ];

  // 4. Filtrage dynamique
  const filtered =
    filter === "Tous"
      ? projects
      : projects.filter((p) => p.category === filter);

  // 5. Affichage pendant le chargement (conservant ton style)
  if (loading) {
    return (
      <section className="container-custom py-20 text-center">
        <p className="text-xl text-cyan-400">Chargement des projets...</p>
      </section>
    );
  }

  return (
    <section className="container-custom py-20">
      <h1 className="text-5xl font-bold mb-10">Mes projets</h1>

      {/* Boutons de Filtres */}
      <div className="flex gap-4 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full border transition-colors ${
              filter === cat ? "bg-cyan-400 text-black" : "border-white/20 hover:border-cyan-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille de projets */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}