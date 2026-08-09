import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Timeline() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEn = i18n.language?.toLowerCase().startsWith("en");

  const experiences = [
    {
      year: isEn ? "2025 - Present" : "2025 - Présent",
      role: isEn ? "Full Stack & DevOps Engineer" : "Développeuse Full Stack & DevOps",
      company: isEn ? "Freelance / Independent" : "Freelance / Indépendante",
      type: isEn ? "Current" : "Actuel",
      color: "#38bdf8",
      desc: isEn
        ? "Engineering & deploying SaaS applications and AI platforms (AgriChain AI, Noregis SaaS, Garagebi Assistance). Automating CI/CD pipelines, Docker containerization & Kubernetes orchestration."
        : "Conception et déploiement d'applications SaaS et plateformes intelligentes (AgriChain AI, Noregis SaaS, Garagebi Assistance). Automatisation des pipelines CI/CD, conteneurisation Docker et orchestration Kubernetes.",
      tags: ["React", "Laravel", "Docker", "Kubernetes", "CI/CD", "TypeScript"],
    },
    {
      year: "2024 - 2025",
      role: isEn ? "Full Stack & Mobile Web Developer" : "Développeuse Full Stack & Web Mobile",
      company: "Défarsci",
      type: isEn ? "Internship & Project" : "Stage & Projet",
      color: "#34d399",
      desc: isEn
        ? "Development of interactive web apps for professional placement (CV Vidéo) and real estate management (Location Appartement). REST API & WebRTC multimedia integrations."
        : "Développement d'applications web interactives pour l'insertion professionnelle (CV Vidéo) et la gestion immobilière (Location Appartement). Intégration d'API REST et d'APIs multimédia WebRTC.",
      tags: ["Laravel", "React", "PHP", "MySQL", "WebRTC"],
    },
    {
      year: "2023",
      role: isEn ? "Web Developer Intern" : "Stagiaire Développeuse Web",
      company: "Défarsci",
      type: isEn ? "Internship" : "Stage",
      color: "#818cf8",
      desc: isEn
        ? "Design & integration of corporate showcase websites and CMS platforms (Site Zawiya). Relational database modeling and responsive interface integration."
        : "Conception et intégration de sites vitrines et plateformes CMS dynamiques (Site Zawiya). Modélisation de bases de données MySQL et création d'interfaces adaptatives.",
      tags: ["Laravel", "PHP", "WordPress", "Bootstrap", "MySQL"],
    },
    {
      year: "2022",
      role: isEn ? "Web Integrator Intern" : "Stagiaire Intégratrice Web",
      company: "Bakeli & Webgram",
      type: isEn ? "Internship" : "Stage",
      color: "#f472b6",
      desc: isEn
        ? "Hands-on responsive web integration using Bootstrap 5 and jQuery. Customizing corporate blogs and front-end interface layouts."
        : "Apprentissage intensif et intégration de sites web responsive avec Bootstrap 5 et jQuery. Personnalisation et structuration de blogs d'entreprise.",
      tags: ["Bootstrap 5", "HTML5", "CSS3", "JavaScript", "jQuery"],
    },
  ];

  return (
    <section ref={ref} className="timeline-section py-16">
      <motion.div
        className="section-header text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">{t("timeline.eyebrow", "Parcours")}</span>
        <h2 className="section-title mt-2">
          {t("timeline.title", "Mon expérience")}{" "}
          <span className="gradient-text">{t("timeline.titleHighlight", "professionnelle")}</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
          {t("timeline.subtitle", "Une progression constante allant de l'intégration front-end à la maîtrise de la pile Full Stack & des architectures DevOps.")}
        </p>
      </motion.div>

      <div className="timeline-wrapper max-w-4xl mx-auto px-4 relative">
        {/* Vertical line */}
        <motion.div
          className="timeline-line"
          initial={{ height: 0 }}
          animate={inView ? { height: "100%" } : {}}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        />

        <div className="timeline-items flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.year}-${i}`}
              className="timeline-item relative flex items-start gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: "easeOut" }}
            >
              {/* Dot on the line */}
              <div
                className="timeline-dot shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-slate-950"
                style={{ borderColor: exp.color, boxShadow: `0 0 14px ${exp.color}44` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: exp.color }} />
              </div>

              {/* Card */}
              <motion.div
                className="timeline-card flex-1 p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-slate-700"
                whileHover={{ y: -4 }}
              >
                <div className="timeline-card-top flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="timeline-year text-sm font-bold tracking-wide" style={{ color: exp.color }}>
                    {exp.year}
                  </span>
                  <span className="timeline-type text-xs px-3 py-1 rounded-full font-semibold border border-slate-700/60 bg-slate-800/50 text-slate-300">
                    {exp.type}
                  </span>
                </div>

                <h3 className="timeline-role text-lg font-bold text-slate-100 mb-1">{exp.role}</h3>
                <p className="timeline-company text-sm font-semibold text-cyan-400 mb-3">{exp.company}</p>
                <p className="timeline-desc text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{exp.desc}</p>

                <div className="timeline-tags flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="timeline-tag text-[0.72rem] px-2.5 py-0.5 rounded-md font-medium border"
                      style={{ borderColor: `${exp.color}44`, color: exp.color, backgroundColor: `${exp.color}10` }}
                    >
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