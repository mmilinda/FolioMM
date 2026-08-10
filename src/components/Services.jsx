import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, GitBranch, Brain, Layers, Shield, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSiteData } from "../context/SiteDataContext";

const iconMap = {
  Code2,
  Cloud,
  GitBranch,
  Brain,
  Layers,
  Shield,
  Sparkles,
};

export default function Services() {
  const { t } = useTranslation();
  const { services: rawServices } = useSiteData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const activeServices = (rawServices || []).filter((s) => !s.hidden);

  return (
    <section ref={ref} className="services-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">{t("services.eyebrow")}</span>
        <h2 className="section-title">
          {t("services.title")}{" "}
          <span className="gradient-text">{t("services.titleHighlight")}</span>
        </h2>
        <p className="section-subtitle">
          {t("services.subtitle")}
        </p>
      </motion.div>

      <div className="services-grid">
        {activeServices.map((svc, i) => {
          const Icon = iconMap[svc.iconName] || Code2;
          const glowColor = svc.glow || "#38bdf8";
          const tags = Array.isArray(svc.tags) ? svc.tags : [];

          return (
            <motion.div
              key={svc.id || `${svc.title}-${i}`}
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ "--card-glow": glowColor, borderColor: glowColor + "44" }}
            >
              <div className="service-icon-wrapper" style={{ background: glowColor + "15" }}>
                <Icon size={24} style={{ color: glowColor }} />
              </div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-tags">
                {tags.map((tag) => (
                  <span key={tag} className="service-tag" style={{ borderColor: glowColor + "55", color: glowColor }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}