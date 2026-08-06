import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FolderKanban } from "lucide-react";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

export default function HomeProjects() {
  // Take top 3 projects (e.g. featured ones or first 3)
  const homeProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-10 md:py-24 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="section-eyebrow">
            <FolderKanban size={14} className="inline-block mr-1 -mt-0.5 text-cyan-400" />
            Réalisations
          </span>
          <h2 className="section-title mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Projets <span className="gradient-text">en vedette</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base md:text-lg max-w-3xl mx-auto mt-3 md:mt-5 leading-relaxed px-4">
            Un aperçu de mes récents travaux alliant architecture logicielle,
            expérience utilisateur soignée et déploiement cloud.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
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
          className="text-center mt-12 md:mt-20"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 px-6 py-3 md:px-8 md:py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 text-sm md:text-base font-bold no-underline shadow-lg hover:-translate-y-1 transition-all"
          >
            Voir tous les projets
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
