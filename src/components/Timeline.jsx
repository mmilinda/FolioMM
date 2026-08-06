import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    year: "2026",
    role: "Junior Full Stack & DevOps Engineer",
    company: "Freelance",
    type: "Actuel",
    color: "#38bdf8",
    desc: "Création de plateformes SaaS, pipelines CI/CD et architectures cloud.",
    tags: ["DevOps", "React", "Docker"],
  },
  {
    year: "2025",
    role: "Développeuse Full Stack",
    company: "SecurityApp",
    type: "Projet",
    color: "#818cf8",
    desc: "Plateforme de sécurité avec tableaux de bord temps réel.",
    tags: ["Laravel", "Vue.js"],
  },
  {
    year: "2025",
    role: "Lead Developer",
    company: "AgriChain AI",
    type: "Projet",
    color: "#34d399",
    desc: "AgriTech combinant intelligence artificielle et Blockchain.",
    tags: ["Python", "AI"],
  },
  {
    year: "2024",
    role: "Développeuse Web Freelance",
    company: "Clients variés",
    type: "Freelance",
    color: "#f472b6",
    desc: "Création de sites vitrines et applications métiers.",
    tags: ["React", "SEO"],
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="timeline-section py-4 md:py-16">
      <motion.div
        className="section-header mb-3 sm:mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Parcours</span>
        <h2 className="section-title text-base sm:text-3xl font-extrabold">
          Mon expérience <span className="gradient-text">en détail</span>
        </h2>
      </motion.div>

      <div className="timeline-wrapper relative max-w-2xl mx-auto px-2">
        <div className="timeline-items space-y-2 sm:space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.year}-${i}`}
              className="timeline-item flex gap-2 sm:gap-4 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <div
                className="timeline-card w-full p-2.5 sm:p-4 rounded-xl border border-white/10 bg-white/5"
                style={{ borderLeft: `3px solid ${exp.color}` }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] sm:text-xs font-bold" style={{ color: exp.color }}>
                    {exp.year} • {exp.company}
                  </span>
                  <span className="text-[9px] sm:text-xs px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-xs sm:text-base font-bold text-white mb-0.5">{exp.role}</h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-tight mb-2">{exp.desc}</p>

                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-xs px-1.5 py-0.5 rounded border bg-white/5 font-medium"
                      style={{ borderColor: exp.color + "44", color: exp.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}