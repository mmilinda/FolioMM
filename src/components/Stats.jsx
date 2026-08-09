import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const statsData = [
    { value: 10, suffix: "+", label: t("hero.stats.projects", "Projets livrés"), color: "#38bdf8" },
    { value: 3, suffix: "+", label: t("hero.stats.experience", "Années d'expérience"), color: "#818cf8" },
    { value: 15, suffix: "+", label: t("hero.stats.tech", "Technologies maîtrisées"), color: "#34d399" },
    { value: 100, suffix: "%", label: t("about.commitment", "Engagement"), color: "#f472b6" },
  ];

  return (
    <section ref={ref} className="stats-section">
      <div className="stats-grid">
        {statsData.map((stat, i) => (
          <motion.div
            key={`${stat.label}-${i}`}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.03 }}
          >
            <div className="stat-value" style={{ color: stat.color }}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
            </div>
            <div className="stat-label">{stat.label}</div>
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