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
    tags: ["CI/CD", "GitHub Actions", "Monitoring"],
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
    <section ref={ref} className="services-section py-6 md:py-16">
      <motion.div
        className="section-header mb-4 sm:mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Services</span>
        <h2 className="section-title text-lg sm:text-3xl lg:text-4xl font-extrabold mb-2">
          Ce que je fais <span className="gradient-text">mieux que tout</span>
        </h2>
        <p className="section-subtitle text-xs sm:text-base lg:text-lg text-slate-400 max-w-xl mx-auto">
          Des solutions complètes pensées pour durer, scalables et maintenues dans le temps.
        </p>
      </motion.div>

      <div className="services-grid grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.title}
              className={`service-card p-2.5 sm:p-6 rounded-xl md:rounded-2xl border ${svc.border} bg-white/5 flex flex-col justify-between`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div>
                <div className={`w-7 h-7 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1.5 sm:mb-4 bg-gradient-to-br ${svc.gradient}`}>
                  <Icon size={16} className="sm:hidden" style={{ color: svc.glow }} />
                  <Icon size={24} className="hidden sm:block" style={{ color: svc.glow }} />
                </div>
                <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-1 md:mb-2 line-clamp-1 sm:line-clamp-none">{svc.title}</h3>
                <p className="text-[11px] sm:text-sm lg:text-base text-slate-400 leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">{svc.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1 md:gap-1.5 mt-2 md:mt-4">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full border bg-white/5"
                    style={{ borderColor: svc.glow + "44", color: svc.glow }}
                  >
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