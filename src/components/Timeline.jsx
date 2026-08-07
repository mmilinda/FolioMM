import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    year: "2026",
    role: "Junior Full Stack & DevOps Engineer",
    company: "Freelance",
    type: "Actuel",
    color: "#38bdf8",
    desc: "Création de plateformes SaaS, pipelines CI/CD, architectures cloud et solutions IA pour clients internationaux.",
    tags: ["DevOps", "React", "AWS", "Docker"],
  },
  {
    year: "2026",
    role: "Développeuse Full Stack",
    company: "SecurityApp",
    type: "Projet",
    color: "#818cf8",
    desc: "Conception et développement d'une plateforme complète de gestion de sécurité avec authentification avancée et tableaux de bord temps réel.",
    tags: ["Laravel", "Vue.js", "MySQL"],
  },
  {
    year: "2026",
    role: "Lead Developer",
    company: "AgriChain AI",
    type: "Projet",
    color: "#34d399",
    desc: "Solution AgriTech combinant intelligence artificielle et Blockchain pour la traçabilité de la chaîne alimentaire.",
    tags: ["Python", "Blockchain", "AI"],
  },
  {
    year: "2024--2025",
    role: "Développeuse Web Freelance",
    company: "Clients variés",
    type: "Freelance",
    color: "#f472b6",
    desc: "Création de sites vitrines, e-commerces et applications métiers pour PME et startups.",
    tags: ["React", "WordPress", "SEO"],
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="timeline-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Parcours</span>
        <h2 className="section-title">
          Mon expérience
          <span className="gradient-text"> en détail</span>
        </h2>
      </motion.div>

      <div className="timeline-wrapper">
        {/* Vertical line */}
        <motion.div
          className="timeline-line"
          initial={{ height: 0 }}
          animate={inView ? { height: "100%" } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        />

        <div className="timeline-items">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.year}-${i}`}
              className="timeline-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: "easeOut" }}
            >
              {/* Dot on the line */}
              <div className="timeline-dot" style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}55` }}>
                <div className="timeline-dot-inner" style={{ background: exp.color }} />
              </div>

              {/* Card */}
              <motion.div
                className="timeline-card"
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className="timeline-card-top">
                  <div>
                    <span className="timeline-year" style={{ color: exp.color }}>{exp.year}</span>
                    <span className="timeline-type">{exp.type}</span>
                  </div>
                </div>

                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-desc">{exp.desc}</p>

                <div className="timeline-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="timeline-tag" style={{ borderColor: exp.color + "44", color: exp.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}