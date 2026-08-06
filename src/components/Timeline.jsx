import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    year: "2026",
    role: "Junior Full Stack & DevOps Engineer",
    company: "Freelance",
    type: "Actuel",
    color: "#38bdf8",
    desc: "Création de plateformes SaaS, pipelines CI/CD automatisés, architectures cloud et solutions IA pour clients internationaux.",
    tags: ["DevOps", "React", "AWS", "Docker", "Laravel"],
  },
  {
    year: "2025",
    role: "Développeuse Full Stack",
    company: "SecurityApp",
    type: "Projet",
    color: "#818cf8",
    desc: "Conception et développement d'une plateforme complète de gestion de sécurité avec authentification avancée et tableaux de bord temps réel.",
    tags: ["Laravel", "Vue.js", "MySQL", "Sanctum"],
  },
  {
    year: "2025",
    role: "Lead Developer",
    company: "AgriChain AI",
    type: "Projet",
    color: "#34d399",
    desc: "Solution AgriTech combinant intelligence artificielle et Blockchain pour la traçabilité de la chaîne alimentaire.",
    tags: ["Python", "AI", "Blockchain", "FastAPI"],
  },
  {
    year: "2024",
    role: "Développeuse Web Freelance",
    company: "Clients variés",
    type: "Freelance",
    color: "#f472b6",
    desc: "Création de sites vitrines, e-commerces et applications métiers sur mesure pour PME et startups.",
    tags: ["React", "WordPress", "SEO", "Tailwind"],
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="timeline-section py-6 md:py-16">
      <motion.div
        className="section-header mb-4 sm:mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Parcours</span>
        <h2 className="section-title text-base sm:text-3xl lg:text-4xl font-extrabold mb-2">
          Mon expérience <span className="gradient-text">en détail</span>
        </h2>
        <p className="section-subtitle text-xs sm:text-base lg:text-lg text-slate-400 max-w-xl mx-auto">
          Mon évolution technique, mes projets phares et les défis relevés au fil des années.
        </p>
      </motion.div>

      <div className="timeline-wrapper relative max-w-3xl mx-auto px-2">
        <div className="timeline-items space-y-3 sm:space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.year}-${i}`}
              className="timeline-item flex gap-2 sm:gap-4 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <div
                className="timeline-card w-full p-2.5 sm:p-5 md:p-6 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30"
                style={{ borderLeft: `4px solid ${exp.color}` }}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-base lg:text-lg font-bold" style={{ color: exp.color }}>
                      {exp.year}
                    </span>
                    <span className="text-slate-500 text-xs sm:text-sm">•</span>
                    <span className="text-xs sm:text-sm lg:text-base font-semibold text-slate-300">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">
                    {exp.type}
                  </span>
                </div>

                <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-1">{exp.role}</h3>
                <p className="text-[11px] sm:text-sm lg:text-base text-slate-300 leading-tight sm:leading-relaxed mb-3">
                  {exp.desc}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-xs px-2 py-0.5 rounded-full border bg-white/5 font-medium"
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