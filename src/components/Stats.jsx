import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSiteData } from "../context/SiteDataContext";

function AnimatedCounter({ rawValue, inView }) {
  // Parse numeric part and suffix if any (e.g., "14+" -> 14 and "+", "99.9%" -> "99.9%")
  const match = String(rawValue).match(/^([\d.]+)(.*)$/);
  const numericVal = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || numericVal === null || isNaN(numericVal)) return;
    let start = 0;
    const duration = 1800;
    const isFloat = String(numericVal).includes(".");
    const step = (numericVal / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numericVal) {
        setCount(numericVal);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericVal]);

  if (numericVal === null || isNaN(numericVal)) {
    return <span>{rawValue}</span>;
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function getLocalizedStat(stat, isEn) {
  if (!isEn) return { label: stat.label, desc: stat.desc };
  if (stat.labelEn) return { label: stat.labelEn, desc: stat.descEn || stat.desc };

  const l = (stat.label || "").toLowerCase();
  if (stat.id === "stat-1" || l.includes("projet")) {
    return { label: "Projects", desc: "Web, SaaS & Mobile Applications" };
  }
  if (stat.id === "stat-2" || l.includes("expéri") || l.includes("année")) {
    return { label: "Years Experience", desc: "In Full Stack Development (2022 - Present)" };
  }
  if (stat.id === "stat-3" || l.includes("solution") || l.includes("production")) {
    return { label: "Production Solutions", desc: "SaaS & Enterprise Digital Platforms" };
  }
  if (stat.id === "stat-4" || l.includes("engagement") || l.includes("qualité")) {
    return { label: "Commitment", desc: "Agile delivery & Code quality" };
  }
  return { label: stat.label, desc: stat.desc };
}

export default function Stats() {
  const { t, i18n } = useTranslation();
  const { stats: siteStats } = useSiteData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isEn = i18n.language?.toLowerCase().startsWith("en");
  const colors = ["#38bdf8", "#818cf8", "#34d399", "#f472b6", "#fb923c"];

  const defaultStats = [
    { value: "14+", label: t("hero.stats.projects", "Projets"), desc: isEn ? "Web, SaaS & Mobile Apps" : "Applications Web, SaaS & Mobile", color: "#38bdf8" },
    { value: "3+", label: t("hero.stats.experience", "Années d'expérience"), desc: isEn ? "In Full Stack Development (2022 - Present)" : "En développement Full Stack (2022 - Présent)", color: "#818cf8" },
    { value: "5+", label: t("hero.stats.solutions", "Solutions de Production"), desc: isEn ? "SaaS & Enterprise Digital Platforms" : "SaaS et plateformes numériques d'entreprise", color: "#34d399" },
    { value: "100%", label: t("about.commitment", "Engagement"), desc: isEn ? "Agile delivery & Code quality" : "Livraison agile & Qualité de code", color: "#f472b6" },
  ];

  const displayStats = Array.isArray(siteStats) && siteStats.length > 0
    ? siteStats.map((st, i) => ({
        ...st,
        color: colors[i % colors.length],
      }))
    : defaultStats;

  return (
    <section ref={ref} className="stats-section">
      <div className="stats-grid">
        {displayStats.map((stat, i) => {
          const { label, desc } = getLocalizedStat(stat, isEn);

          return (
            <motion.div
              key={`${stat.label}-${i}`}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="stat-value" style={{ color: stat.color }}>
                <AnimatedCounter rawValue={stat.value} inView={inView} />
              </div>
              <div className="stat-label">{label}</div>
              {desc && (
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "4px" }}>
                  {desc}
                </div>
              )}
              <div className="stat-bar">
                <motion.div
                  className="stat-bar-fill"
                  style={{ background: stat.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: "70%" } : {}}
                  transition={{ delay: 0.5 + i * 0.12, duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}