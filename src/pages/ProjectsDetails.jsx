import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Tag, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useProjects from "../hooks/useProjects";
import { getLocalizedProject } from "../data/projects";
import SEO from "../components/SEO";

export default function ProjectDetails() {
  const { id } = useParams();
  const { projects } = useProjects();
  const { t, i18n } = useTranslation();

  const rawProject = projects.find(
    (p) => p.slug === id || String(p.id) === String(id)
  );

  const project = getLocalizedProject(rawProject, i18n.language);

  if (!project) {
    return (
      <>
        <SEO title={t("blogDetails.notFoundTitle", "Projet introuvable")} />
        <section className="container-custom py-20" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
            {t("blogDetails.notFoundDesc", "Projet introuvable.")}
          </p>
          <Link
            to="/projects"
            className="hero-btn-secondary"
            style={{ display: "inline-flex", marginTop: "2rem" }}
          >
            <ArrowLeft size={16} />
            {t("blogDetails.backToBlog", "Retour aux projets")}
          </Link>
        </section>
      </>
    );
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "applicationCategory": project.category,
    "operatingSystem": "Web",
    "author": {
      "@type": "Person",
      "name": "Milinda Mendy"
    },
    "image": project.image
  };

  return (
    <>
      <SEO
        title={`${project.title} — ${project.category}`}
        description={project.description}
        image={project.image}
        path={`/projects/${project.slug || project.id}`}
        type="article"
        schemaData={projectSchema}
      />

      <motion.section
        className="container-custom pb-16"
        style={{ paddingTop: "7.5rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Back */}
        <Link
          to="/projects"
          className="hero-btn-secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "12px",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            color: "#38bdf8",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "2rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <ArrowLeft size={16} />
          {t("blogDetails.backToBlog", "Retour aux projets")}
        </Link>

        {/* Hero image */}
        <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", marginBottom: "3rem" }}>
          <img
            src={project.image}
            alt={project.title}
            onError={(e) => { e.currentTarget.src = project.fallbackImage || "/images/projects/preview.png"; }}
            style={{ width: "100%", maxHeight: "480px", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(2,6,23,0.8) 0%, transparent 60%)",
          }} />
          <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
            <span className="section-eyebrow">{project.category}</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginTop: "0.5rem" }}>
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>

          {/* Left — details */}
          <div>
            {/* Meta */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "2rem" }}>
              {project.year && (
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <Calendar size={14} /> {project.year}
                </span>
              )}
              {project.status && (
                <span style={{ fontSize: "0.8rem", padding: "3px 12px", borderRadius: "999px", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", color: "var(--primary)" }}>
                  {project.status}
                </span>
              )}
              {project.client && (
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  🏢 {project.client}
                </span>
              )}
              {project.role && (
                <span style={{ fontSize: "0.8rem", padding: "3px 12px", borderRadius: "999px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7", fontWeight: 600 }}>
                  👤 {project.role}
                </span>
              )}
            </div>

            {/* Description */}
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>Description</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2rem" }}>
              {project.description}
            </p>

            {/* Problem */}
            {project.problem && (
              <div style={{ padding: "1.75rem 2rem", background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: "20px", marginBottom: "1.75rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f87171", marginBottom: "0.6rem" }}>
                  🎯 {t("projectsPage.problemLabel", "Problème identifié")}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.8, margin: 0 }}>{project.problem}</p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div style={{ padding: "1.75rem 2rem", background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "20px", marginBottom: "1.75rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#34d399", marginBottom: "0.6rem" }}>
                  💡 {t("projectsPage.solutionLabel", "Solution apportée")}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.8, margin: 0 }}>{project.solution}</p>
              </div>
            )}

            {/* Impact */}
            {project.impact && (
              <div style={{ padding: "1.75rem 2rem", background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: "20px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary)", marginBottom: "0.6rem" }}>
                  📈 {t("projectsPage.impactLabel", "Impact & Résultats")}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.8, margin: 0 }}>{project.impact}</p>
              </div>
            )}
          </div>

          {/* Right — sidebar */}
          <div style={{ position: "sticky", top: "6rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.demo && project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hero-btn-primary" style={{ justifyContent: "center" }}>
                  <ExternalLink size={16} />
                  {t("projectCard.demo", "Voir la démo")}
                </a>
              )}
              {project.isPrivate || !project.github ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "12px",
                    background: "rgba(244, 63, 94, 0.08)",
                    border: "1px solid rgba(244, 63, 94, 0.25)",
                    color: "#f43f5e",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  <Lock size={15} />
                  {i18n.language?.startsWith("en") ? "Private Repository" : "Repository privé"}
                </div>
              ) : (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-btn-secondary" style={{ justifyContent: "center" }}>
                  <FaGithub size={16} />
                  {t("projectCard.github", "Voir le code")}
                </a>
              )}
            </div>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "18px" }}>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <Tag size={13} /> {t("projectCard.technologies", "Technologies")}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.technologies.map((tech) => (
                    <span key={tech} style={{ fontSize: "0.8rem", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}