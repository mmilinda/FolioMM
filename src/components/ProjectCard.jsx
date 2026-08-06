import { motion } from "framer-motion";
import { ExternalLink, Calendar, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group project-card relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col transition-all duration-300 w-full max-w-[270px] sm:max-w-none mx-auto"
    >
      {/* ── Image ───────────────────────────────── */}
      <div className="relative h-28 sm:h-48 md:h-60 lg:h-64 overflow-hidden shrink-0">
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
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-slate-950/80 backdrop-blur-sm border border-white/15 text-slate-300">
            {project.category}
          </span>
        )}

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950">
            <Sparkles size={11} />
            Featured
          </span>
        )}
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="p-3 sm:p-5 md:p-6 lg:p-7 flex flex-col gap-2 sm:gap-3.5 flex-1">

        {/* Title + link arrow */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/projects/${project.slug || project.id}`}
            className="no-underline text-inherit flex-1"
          >
            <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white transition-colors project-card-title line-clamp-1 sm:line-clamp-none">
              {project.title}
            </h3>
          </Link>
          <Link to={`/projects/${project.slug || project.id}`} className="text-slate-400 shrink-0 mt-0.5">
            <ArrowUpRight size={16} className="sm:hidden" />
            <ArrowUpRight size={22} className="hidden sm:block project-card-arrow" />
          </Link>
        </div>

        {/* Description — 1 line on mobile, 3 lines on desktop */}
        <p className="text-[10px] sm:text-sm md:text-base lg:text-lg text-slate-300 leading-normal sm:leading-relaxed line-clamp-1 sm:line-clamp-3 m-0">
          {project.description}
        </p>

        {/* Impact */}
        {project.impact && (
          <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#34d399] text-[9px] sm:text-xs md:text-sm">
            <TrendingUp size={14} className="shrink-0 text-emerald-400" />
            <span className="truncate font-medium">{project.impact}</span>
          </div>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[9px] sm:text-xs md:text-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[9px] sm:text-xs px-2 py-0.5 text-slate-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2.5 mt-auto pt-3 border-t border-white/10">
          {project.demo && project.demo !== "#" ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-1.5 sm:py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 text-xs sm:text-sm font-bold no-underline transition-opacity hover:opacity-90 shadow-md"
            >
              <ExternalLink size={14} />
              Démo
            </a>
          ) : (
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 py-1.5 sm:py-2.5 px-4 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold no-underline"
            >
              Voir le projet
            </Link>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-1.5 sm:py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs sm:text-sm font-semibold no-underline shrink-0 hover:bg-white/10"
            >
              <FaGithub size={15} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}