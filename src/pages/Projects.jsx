import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/useProjects";
import SEO from "../components/SEO";
import { Layers, Sparkles } from "lucide-react";

export default function Projects() {
  const { t } = useTranslation();
  const { projects } = useProjects();

  const ALL = t("projectsPage.all", "Tous");

  const CATEGORIES = [
    ALL,
    "SaaS",
    "DevOps",
    "AI",
    "Web Design",
    "Full Stack",
    "Automobile",
  ];

  function filterProjects(list, filter) {
    if (filter === ALL) return list;
    return list.filter(
      (p) =>
        p.category?.toLowerCase().includes(filter.toLowerCase()) ||
        p.technologies?.some((tTech) => tTech.toLowerCase().includes(filter.toLowerCase()))
    );
  }

  const [filter, setFilter] = useState(ALL);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const featured = projects.filter((p) => p.featured);
  const filteredProjects = filterProjects(projects, filter);

  return (
    <>
      <SEO
        title={`${t("projectsPage.title")} | Milinda Mendy`}
        description={t("projectsPage.subtitle")}
      />

      <section className="container-custom py-20">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-eyebrow">Portfolio</span>
          <h1 className="section-title mt-3">
            {t("projectsPage.title")} <span className="gradient-text">{t("projectsPage.titleHighlight")}</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "560px", marginTop: "1rem", fontSize: "1rem", lineHeight: 1.7 }}>
            {t("projectsPage.subtitle")}
          </p>
        </motion.div>

        {/* Featured banner */}
        {filter === ALL && featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="featured-banner"
          >
            <div className="featured-banner-label">
              <Sparkles size={13} />
              {t("projectsPage.featuredLabel", "Projets en vedette")}
            </div>
            <div className="featured-grid">
              {featured.slice(0, 3).map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.demo !== "#" ? project.demo : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-item"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="featured-item-img"
                    onError={(e) => { e.currentTarget.src = project.fallbackImage || "/images/projects/preview.png"; }}
                  />
                  <div className="featured-item-overlay">
                    <span className="featured-item-category">{project.category}</span>
                    <h3 className="featured-item-title">{project.title}</h3>
                    <div className="featured-item-tags">
                      {project.technologies?.slice(0, 3).map((t) => (
                        <span key={t} className="featured-item-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          className="projects-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`projects-filter-btn ${filter === cat ? "active" : ""}`}
            >
              {cat === ALL && <Layers size={13} />}
              {cat}
              {filter === cat && (
                <span className="projects-filter-count">
                  {filterProjects(projects, cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: "var(--text-muted)", textAlign: "center", padding: "4rem 0" }}
          >
            {t("projectsPage.noProjects", "Aucun projet dans cette catégorie pour l'instant.")}
          </motion.p>
        ) : (
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {t("projectsPage.moreProjects", "Plus de projets arrivent prochainement. 🚀")}
        </motion.p>
      </section>
    </>
  );
}