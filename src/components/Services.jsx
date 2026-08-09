import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, GitBranch, Brain, Layers, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const services = [
    {
      icon: Code2,
      title: t("services.fullstackTitle"),
      desc: t("services.fullstackDesc"),
      tags: ["React", "Laravel", "TypeScript"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      glow: "#38bdf8",
    },
    {
      icon: Cloud,
      title: t("services.cloudTitle"),
      desc: t("services.cloudDesc"),
      tags: ["AWS", "Docker", "Kubernetes"],
      gradient: "from-purple-500/20 to-indigo-500/20",
      border: "border-purple-500/30",
      glow: "#818cf8",
    },
    {
      icon: GitBranch,
      title: t("services.devopsTitle"),
      desc: t("services.devopsDesc"),
      tags: ["GitHub Actions", "CI/CD", "Monitoring"],
      gradient: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      glow: "#34d399",
    },
    {
      icon: Brain,
      title: t("services.aiTitle"),
      desc: t("services.aiDesc"),
      tags: ["OpenAI", "Gemini", "Python"],
      gradient: "from-pink-500/20 to-rose-500/20",
      border: "border-pink-500/30",
      glow: "#f472b6",
    },
    {
      icon: Layers,
      title: "Architecture SaaS",
      desc: t("services.fullstackDesc"),
      tags: ["SaaS", "Multi-tenant", "Stripe"],
      gradient: "from-orange-500/20 to-amber-500/20",
      border: "border-orange-500/30",
      glow: "#fb923c",
    },
    {
      icon: Shield,
      title: "Sécurité & Performance",
      desc: t("services.devopsDesc"),
      tags: ["Security", "OWASP", "Perf"],
      gradient: "from-cyan-500/20 to-sky-500/20",
      border: "border-cyan-500/30",
      glow: "#22d3ee",
    },
  ];

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
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={`${svc.title}-${i}`}
              className={`service-card ${svc.border}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ "--card-glow": svc.glow }}
            >
              <div className={`service-icon-wrapper bg-gradient-to-br ${svc.gradient}`}>
                <Icon size={24} style={{ color: svc.glow }} />
              </div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-tags">
                {svc.tags.map((tag) => (
                  <span key={tag} className="service-tag" style={{ borderColor: svc.glow + "55", color: svc.glow }}>
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