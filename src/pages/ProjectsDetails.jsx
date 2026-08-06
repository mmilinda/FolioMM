import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération du projet :", err);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom py-20 text-cyan-400">
        Chargement des détails du projet...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-custom py-20 text-red-400">
        Projet introuvable
      </div>
    );
  }

  return (
    <section className="container-custom py-20">
      <img
        src={project.image}
        alt={project.title}
        className="rounded-3xl w-full max-h-[500px] object-cover"
      />

      <h1 className="text-5xl font-bold mt-10">{project.title}</h1>

      <p className="text-gray-400 text-lg mt-5">{project.description}</p>

      {project.features && project.features.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-10">Fonctionnalités</h2>
          <ul className="mt-5 space-y-3">
            {project.features.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}