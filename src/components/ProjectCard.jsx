import { motion } from "framer-motion";
import { ExternalLink, Calendar, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group project-card relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col transition-all duration-300 w-full max-w-[270px] sm:max-w-none mx-auto"
    >
      {/* ── Image ───────────────────────────────── */}
      <div className="relative h-16 sm:h-44 md:h-48 overflow-hidden shrink-0">
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
          <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs font-semibold bg-slate-950/80 backdrop-blur-sm border border-white/15 text-slate-300">
            {project.category}
          </span>
        )}

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950">
            <Sparkles size={9} />
            Featured
          </span>
        )}
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="p-2 sm:p-4 flex flex-col gap-1 sm:gap-2.5 flex-1">

        {/* Title + link arrow */}
        <div className="flex items-start justify-between gap-1 sm:gap-2">
          <Link
            to={`/projects/${project.slug || project.id}`}
            className="no-underline text-inherit flex-1"
          >
            <h3 className="text-xs sm:text-base font-bold tracking-tight text-white transition-colors project-card-title line-clamp-1">
              {project.title}
            </h3>
          </Link>
          <Link to={`/projects/${project.slug || project.id}`} className="text-slate-400 shrink-0 mt-0.5">
            <ArrowUpRight size={14} className="sm:hidden" />
            <ArrowUpRight size={18} className="hidden sm:block project-card-arrow" />
          </Link>
        </div>

        {/* Description — 1 line on mobile, 2 lines on desktop */}
        <p className="text-[10px] sm:text-sm text-slate-400 leading-tight line-clamp-1 sm:line-clamp-2 m-0">
          {project.description}
        </p>

        {/* Impact */}
        {project.impact && (
          <div className="flex items-center gap-1 px-1.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[#34d399] text-[9px] sm:text-xs">
            <TrendingUp size={11} className="shrink-0 text-emerald-400" />
            <span className="truncate font-medium">{project.impact}</span>
          </div>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[9px] sm:text-xs px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[9px] sm:text-xs px-1 py-0.5 text-slate-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-1.5 mt-auto pt-1 border-t border-white/10">
          {project.demo && project.demo !== "#" ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 py-1 sm:py-1.5 px-2 rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 text-[10px] sm:text-xs font-bold no-underline transition-opacity"
            >
              <ExternalLink size={11} />
              Démo
            </a>
          ) : (
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1 sm:py-1.5 px-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-bold no-underline"
            >
              Voir
            </Link>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 py-1 sm:py-1.5 px-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-[10px] sm:text-xs font-semibold no-underline shrink-0"
            >
              <FaGithub size={11} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}