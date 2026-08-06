import { motion } from "framer-motion";
import { ExternalLink, Calendar, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      className="group project-card"
    >
      {/* ── Image ───────────────────────────────── */}
      <div className="relative h-24 sm:h-44 md:h-48 overflow-hidden shrink-0">
        <img
          src={project.image}
          onError={(e) => {
            e.currentTarget.src = project.fallbackImage || "/images/projects/preview.png";
          }}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 project-card-img"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

        {/* Category badge */}
        {project.category && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-slate-950/70 backdrop-blur-sm border border-white/15 text-slate-300">
            {project.category}
          </span>
        )}

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950">
            <Sparkles size={10} />
            Featured
          </span>
        )}
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="p-2.5 sm:p-4 flex flex-col gap-1.5 sm:gap-3 flex-1">

        {/* Title + link arrow */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <Link
            to={`/projects/${project.slug || project.id}`}
            style={{ textDecoration: "none", color: "inherit", flex: 1 }}
          >
            <h3 style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              transition: "color 0.2s",
            }} className="project-card-title">
              {project.title}
            </h3>
          </Link>
          <Link to={`/projects/${project.slug || project.id}`} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }}>
            <ArrowUpRight size={18} className="project-card-arrow" style={{ transition: "color 0.2s, opacity 0.2s" }} />
          </Link>
        </div>

        {/* Description — 2 lines max */}
        <p style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          margin: 0,
        }}>
          {project.description}
        </p>

        {/* Impact — the "so what" line */}
        {project.impact && (
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "7px",
            padding: "8px 12px",
            borderRadius: "10px",
            background: "rgba(52,211,153,0.07)",
            border: "1px solid rgba(52,211,153,0.2)",
          }}>
            <TrendingUp size={13} style={{ color: "#34d399", marginTop: "2px", flexShrink: 0 }} />
            <span style={{
              fontSize: "0.78rem",
              color: "#34d399",
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              {project.impact}
            </span>
          </div>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "0.7rem",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span style={{
                fontSize: "0.7rem",
                padding: "3px 10px",
                borderRadius: "999px",
                color: "var(--text-muted)",
              }}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)", margin: "0.25rem 0" }} />

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          {project.demo && project.demo !== "#" ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                flex: 1,
                justifyContent: "center",
                padding: "8px 12px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                color: "#020617",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <ExternalLink size={13} />
              Démo
            </a>
          ) : (
            <Link
              to={`/projects/${project.slug || project.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                flex: 1,
                justifyContent: "center",
                padding: "8px 12px",
                borderRadius: "10px",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.25)",
                color: "var(--primary)",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Voir le projet
            </Link>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.04)",
                color: "var(--text-secondary)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              <FaGithub size={14} />
              Code
            </a>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <style>{`
        .project-card:hover {
          border-color: rgba(56,189,248,0.3) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px -15px rgba(56,189,248,0.25);
        }
        .project-card:hover .project-card-img {
          transform: scale(1.06);
        }
        .project-card:hover .project-card-title {
          color: var(--primary);
        }
        .project-card:hover .project-card-arrow {
          color: var(--primary);
          opacity: 1;
        }
      `}</style>
    </motion.article>
  );
}