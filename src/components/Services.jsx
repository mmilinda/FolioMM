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

function getLocalizedService(svc, isEn) {
  if (!isEn) return { title: svc.title, desc: svc.desc };
  if (svc.titleEn) return { title: svc.titleEn, desc: svc.descEn || svc.desc };

  const t = (svc.title || "").toLowerCase();
  if (svc.id === "svc-1" || t.includes("full stack")) {
    return {
      title: "Full Stack Development",
      desc: "Modern, responsive, high-performance web applications built with React, Next.js, Node.js, and Laravel."
    };
  }
  if (svc.id === "svc-2" || t.includes("cloud") || t.includes("infrastructure")) {
    return {
      title: "Cloud & Infrastructure Architecture",
      desc: "Designing resilient and scalable infrastructures on AWS, GCP, Docker, and Kubernetes."
    };
  }
  if (svc.id === "svc-3" || t.includes("ci/cd") || t.includes("devops") || t.includes("automatisation")) {
    return {
      title: "CI/CD & DevOps Automation",
      desc: "Setting up continuous integration and deployment pipelines with GitHub Actions."
    };
  }
  if (svc.id === "svc-4" || t.includes("ia") || t.includes("ai") || t.includes("intelligence")) {
    return {
      title: "AI Integration & Automation",
      desc: "Integrating LLM APIs (OpenAI, Gemini), workflow automation, and intelligent agents."
    };
  }
  if (svc.id === "svc-5" || t.includes("saas") || t.includes("tenant")) {
    return {
      title: "Multi-tenant SaaS Architecture",
      desc: "Developing turn-key SaaS solutions with Stripe subscription management, roles, and auth."
    };
  }
  if (svc.id === "svc-6" || t.includes("sécurité") || t.includes("security") || t.includes("audit")) {
    return {
      title: "Security & Performance Audit",
      desc: "Security audits, load time optimization, HTTPS setup, and OWASP protection."
    };
  }
  return { title: svc.title, desc: svc.desc };
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const { profile, services: rawServices } = useSiteData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEn = i18n.language?.toLowerCase().startsWith("en");
  const activeServices = (rawServices || []).filter((s) => !s.hidden);

  const servicesTitle = isEn ? t("services.title", "My Areas of") : (profile?.sectionTitles?.servicesTitle || t("services.title", "Mes Domaines"));
  const servicesTitleHighlight = isEn ? t("services.titleHighlight", "Expertise") : (profile?.sectionTitles?.servicesTitleHighlight || t("services.titleHighlight", "d'Expertise"));
  const servicesSubtitle = isEn ? t("services.subtitle", "End-to-end technical solutions tailored to your business goals and growth challenges.") : (profile?.sectionTitles?.servicesSubtitle || t("services.subtitle", "Des solutions techniques complètes et sur-mesure pour propulser vos projets web et cloud."));

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
          {servicesTitle}{" "}
          {servicesTitleHighlight && <span className="gradient-text">{servicesTitleHighlight}</span>}
        </h2>
        <p className="section-subtitle">
          {servicesSubtitle}
        </p>
      </motion.div>

      <div className="services-grid">
        {activeServices.map((svc, i) => {
          const Icon = iconMap[svc.iconName] || Code2;
          const glowColor = svc.glow || "#38bdf8";
          const tags = Array.isArray(svc.tags) ? svc.tags : [];
          const { title, desc } = getLocalizedService(svc, isEn);

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
              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{desc}</p>
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