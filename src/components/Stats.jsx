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

export default function Stats() {
  const { t } = useTranslation();
  const { stats: siteStats } = useSiteData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const colors = ["#38bdf8", "#818cf8", "#34d399", "#f472b6", "#fb923c"];

  const displayStats = [
    { value: "10+", label: t("hero.stats.projects", "Projets"), desc: "Applications Web, SaaS & Mobile", color: "#38bdf8" },
    { value: "3+", label: t("hero.stats.experience", "Années d'expérience"), desc: "En développement Full Stack (2022 - Présent)", color: "#818cf8" },
    { value: "3+", label: t("hero.stats.solutions", "Solutions de Production"), desc: "SaaS et plateformes numériques d'entreprise", color: "#34d399" },
    { value: "100%", label: t("about.commitment", "Engagement"), desc: "Livraison agile & Qualité de code", color: "#f472b6" },
  ];

  return (
    <section ref={ref} className="stats-section">
      <div className="stats-grid">
        {displayStats.map((stat, i) => (
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
            <div className="stat-label">{stat.label}</div>
            {stat.desc && (
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "4px" }}>
                {stat.desc}
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
        ))}
      </div>
    </section>
  );
}