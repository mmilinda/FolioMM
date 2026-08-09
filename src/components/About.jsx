import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Code2, Server, Zap, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Code2, text: t("about.highlights.stack", "Architecture Full Stack moderne") },
    { icon: Server, text: t("about.highlights.devops", "Infrastructure DevOps & Cloud") },
    { icon: Zap, text: t("about.highlights.cicd", "Pipelines CI/CD automatisés") },
    { icon: CheckCircle, text: t("about.highlights.quality", "Delivery rapide & code de qualité") },
  ];

  return (
    <section ref={ref} className="about-section">
      <div className="about-grid">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-eyebrow">{t("about.eyebrow")}</span>
          <h2 className="section-title">
            {t("about.title")} <span className="gradient-text">{t("about.titleHighlight")}</span>
          </h2>

          <p className="about-text">
            {t("about.desc1")}
          </p>

          <p className="about-text" style={{ marginTop: "1rem" }}>
            {t("about.desc2")}
          </p>

          <div className="about-highlights">
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                className="about-highlight-item"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Icon size={16} className="text-cyan-400 shrink-0" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            style={{ marginTop: "2rem" }}
          >
            <a href="/CV-Milinda-Mendy.pdf" download className="hero-btn-secondary" style={{ display: "inline-flex" }}>
              <Download size={16} />
              {t("hero.downloadCv", "Télécharger mon CV")}
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Visual code block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="about-code-wrapper"
        >
          <div className="about-code-card">
            <div className="about-code-header">
              <span className="code-dot code-dot-red" />
              <span className="code-dot code-dot-yellow" />
              <span className="code-dot code-dot-green" />
              <span className="code-filename">milinda.config.ts</span>
            </div>
            <pre className="about-code-body">
{`const milinda = {
  role: "DevOps & Full Stack Engineer",
  location: "Sénégal 🇸🇳",
  
  stack: {
    frontend: ["React", "TypeScript", "Tailwind"],
    backend:  ["Laravel", "Node.js", "PHP"],
    devops:   ["Docker", "K8s", "CI/CD", "AWS"],
    database: ["MySQL", "Firebase", "Redis"],
  },

  philosophy: "Ship fast. Break nothing.",
  
  openToWork: true, // ← always looking for challenges
};`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}