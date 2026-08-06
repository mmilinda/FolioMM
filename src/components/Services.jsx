import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, GitBranch, Brain, Layers, Shield } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Développement Full Stack",
    desc: "Applications React performantes côté client, APIs Laravel robustes côté serveur. Du design au déploiement.",
    tags: ["React", "Laravel", "TypeScript"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    glow: "#38bdf8",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "Architecture AWS / GCP, containers Docker, orchestration Kubernetes et gestion d'environnements multi-cloud.",
    tags: ["AWS", "Docker", "Kubernetes"],
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30",
    glow: "#818cf8",
  },
  {
    icon: GitBranch,
    title: "CI/CD & DevOps",
    desc: "Pipelines automatisés GitHub Actions / GitLab CI, tests, déploiements continus et monitoring de production.",
    tags: ["GitHub Actions", "CI/CD", "Monitoring"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    glow: "#34d399",
  },
  {
    icon: Brain,
    title: "IA & Automatisation",
    desc: "Intégration d'APIs IA (OpenAI, Gemini), workflows automatisés et agents intelligents pour booster la productivité.",
    tags: ["OpenAI", "Gemini", "Python"],
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    glow: "#f472b6",
  },
  {
    icon: Layers,
    title: "Architecture SaaS",
    desc: "Conception de plateformes SaaS multi-tenant, systèmes de facturation, gestion des accès et scalabilité.",
    tags: ["SaaS", "Multi-tenant", "Stripe"],
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    glow: "#fb923c",
  },
  {
    icon: Shield,
    title: "Sécurité & Performance",
    desc: "Audits de sécurité, optimisation des performances, HTTPS, rate limiting et bonnes pratiques OWASP.",
    tags: ["Security", "OWASP", "Perf"],
    gradient: "from-cyan-500/20 to-sky-500/20",
    border: "border-cyan-500/30",
    glow: "#22d3ee",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="services-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Services</span>
        <h2 className="section-title">
          Ce que je fais
          <span className="gradient-text"> mieux que tout</span>
        </h2>
        <p className="section-subtitle">
          Des solutions complètes pensées pour durer, scalables et maintenues dans le temps.
        </p>
      </motion.div>

      <div className="services-grid">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.title}
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