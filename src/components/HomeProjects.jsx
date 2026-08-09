import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FolderKanban } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import useProjects from "../hooks/useProjects";

export default function HomeProjects() {
  const { t } = useTranslation();
  const { projects } = useProjects();
  // Take top featured projects
  const homeProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-8 md:py-20 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-14"
        >
          <span className="section-eyebrow">
            <FolderKanban size={14} className="inline-block mr-1 -mt-0.5 text-cyan-400" />
            {t("homeProjects.eyebrow")}
          </span>
          <h2 className="section-title mt-2 md:mt-4 text-xl sm:text-3xl md:text-4xl font-extrabold">
            {t("homeProjects.title")}{" "}
            <span className="gradient-text">{t("homeProjects.titleHighlight")}</span>
          </h2>
          <div className="w-full text-center mt-3 md:mt-4 mb-6 md:mb-10 overflow-hidden">
            <p className="text-slate-400 text-xs sm:text-base md:text-lg inline-block whitespace-nowrap leading-normal px-4">
              {t("homeProjects.subtitle")}
            </p>
            <br /><br />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-12">
          {homeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
          <br />
        {/* See More / Voir plus CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-8 md:mt-16 mb-12 md:mb-20 pb-4 md:pb-8"
        >
          <Link
            to="/projects"
            className="hero-btn-primary px-5 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-base font-bold inline-flex items-center justify-center gap-2 rounded-xl shadow-lg hover:-translate-y-1 transition-all no-underline"
          >
            {t("homeProjects.viewAll")}
            <ArrowRight size={16} className="shrink-0" />
          </Link>
        </motion.div>
      </div>
      <br />
    </section>
  );
}
