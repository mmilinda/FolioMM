import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FolderKanban } from "lucide-react";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

export default function HomeProjects() {
  // Take top 3 projects (e.g. featured ones or first 3)
  const homeProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-eyebrow">
            <FolderKanban size={14} className="inline-block mr-1 -mt-0.5" />
            Réalisations
          </span>
          <h2 className="section-title mt-3">
            Projets <span className="gradient-text">en vedette</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto mt-3 whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis">
            Un aperçu de mes récents travaux alliant architecture logicielle,
            expérience utilisateur soignée et déploiement cloud.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {homeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* See More / Voir plus CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ textAlign: "center", marginTop: "3.5rem" }}
        >
          <Link
            to="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #38bdf8, #818cf8)",
              color: "#020617",
              fontSize: "0.95rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 10px 30px -10px rgba(56, 189, 248, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 15px 35px -5px rgba(56, 189, 248, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(56, 189, 248, 0.4)";
            }}
          >
            Voir tous les projets
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
