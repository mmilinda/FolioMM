import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Code2, Server, Zap, Download, Sparkles, Shield, Cloud, Brain, Layers, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSiteData } from "../context/SiteDataContext";
import DownloadCvButton from "./DownloadCvButton";

const iconMap = {
  Code2,
  Server,
  Zap,
  CheckCircle,
  Sparkles,
  Shield,
  Cloud,
  Brain,
  Layers,
  Cpu,
};

export default function About() {
  const { t, i18n } = useTranslation();
  const { profile, skills } = useSiteData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEn = i18n.language?.toLowerCase().startsWith("en");

  const defaultHighlights = [
    { id: "hl-1", icon: "Code2", text: "Architecture Full Stack moderne", textEn: "Modern Full Stack Architecture" },
    { id: "hl-2", icon: "Server", text: "Infrastructure DevOps & Cloud", textEn: "DevOps & Cloud Infrastructure" },
    { id: "hl-3", icon: "Zap", text: "Pipelines CI/CD automatisés", textEn: "Automated CI/CD Pipelines" },
    { id: "hl-4", icon: "CheckCircle", text: "Delivery rapide & code de qualité", textEn: "Fast delivery & quality code" },
  ];

  const highlights = Array.isArray(profile?.highlights) && profile.highlights.length > 0
    ? profile.highlights
    : defaultHighlights;

  const aboutTitle = isEn ? t("about.title", "Passionate about") : (profile?.sectionTitles?.aboutTitle || t("about.title", "À Propos"));
  const aboutTitleHighlight = isEn ? t("about.titleHighlight", "Full Stack Development") : (profile?.sectionTitles?.aboutTitleHighlight || t("about.titleHighlight", "de Moi"));
  const bioText1 = isEn ? (profile?.bioEn || t("about.desc1")) : (profile?.bio || t("about.desc1"));
  const bioText2 = t("about.desc2");

  const codeRole = isEn ? (profile?.headlineEn || "Full Stack & DevOps Developer") : (profile?.headline || "Développeuse Full Stack");
  const codeLocation = isEn ? (profile?.location?.replace("Sénégal", "Senegal") || "Senegal 🇸🇳 – Remote") : (profile?.location || "Sénégal 🇸🇳");
  const codeAvailability = isEn ? (profile?.availabilityEn || "Open to opportunities") : (profile?.availability || "Ouverte aux opportunités");

  const frontendSkills = skills?.find((s) => s.category?.toLowerCase().includes("front"))?.skills?.slice(0, 4) || ["React", "JavaScript", "Tailwind"];
  const backendSkills = skills?.find((s) => s.category?.toLowerCase().includes("back"))?.skills?.slice(0, 4) || ["Laravel", "Node.js", "PHP"];
  const devopsSkills = skills?.find((s) => s.category?.toLowerCase().includes("devops") || s.category?.toLowerCase().includes("cloud"))?.skills?.slice(0, 4) || ["Docker", "K8s", "CI/CD", "AWS"];
  const dbSkills = skills?.find((s) => s.category?.toLowerCase().includes("database") || s.category?.toLowerCase().includes("données") || s.category?.toLowerCase().includes("storage"))?.skills?.slice(0, 4) || ["MySQL", "SQLite", "Firebase"];

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
            {aboutTitle} <span className="gradient-text">{aboutTitleHighlight}</span>
          </h2>

          <p className="about-text">
            {bioText1}
          </p>

          <p className="about-text" style={{ marginTop: "1rem" }}>
            {bioText2}
          </p>

          <div className="about-highlights">
            {highlights.map((item, i) => {
              const IconComponent = iconMap[item.icon] || CheckCircle;
              const textContent = (isEn && item.textEn) ? item.textEn : (typeof item === "string" ? item : item.text);
              return (
                <motion.div
                  key={item.id || `hl-${i}`}
                  className="about-highlight-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <IconComponent size={16} className="text-cyan-400 shrink-0" />
                  <span>{textContent}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            style={{ marginTop: "2rem" }}
          >
            <DownloadCvButton className="hero-btn-secondary" />
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
              <span className="code-filename">milinda.config.js</span>
            </div>
            <pre className="about-code-body">
{`const milinda = {
  name: "${profile?.name || "Milinda Mendy"}",
  role: "${codeRole}",
  location: "${codeLocation}",
  
  stack: {
    frontend: ${JSON.stringify(frontendSkills)},
    backend:  ${JSON.stringify(backendSkills)},
    devops:   ${JSON.stringify(devopsSkills)},
    database: ${JSON.stringify(dbSkills)},
  },

  philosophy: "Ship fast. Break nothing.",
  availability: "${codeAvailability}",
};`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}