import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, GitBranch, Brain, Layers, Shield } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Développement Full Stack",
    desc: "Applications React performantes côté client, APIs Laravel robustes.",
    tags: ["React", "Laravel"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    glow: "#38bdf8",
  },
  {
    icon: Cloud,
    title: "Cloud & Infra",
    desc: "Architecture AWS / GCP, containers Docker & Kubernetes.",
    tags: ["AWS", "Docker"],
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30",
    glow: "#818cf8",
  },
  {
    icon: GitBranch,
    title: "CI/CD & DevOps",
    desc: "Pipelines automatisés GitHub Actions, tests & déploiements.",
    tags: ["CI/CD", "GitHub"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    glow: "#34d399",
  },
  {
    icon: Brain,
    title: "IA & Automa.",
    desc: "Intégration APIs IA (OpenAI, Gemini) et workflows intelligents.",
    tags: ["OpenAI", "Python"],
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    glow: "#f472b6",
  },
  {
    icon: Layers,
    title: "Architecture SaaS",
    desc: "Plateformes SaaS multi-tenant, facturation & scalabilité.",
    tags: ["SaaS", "Stripe"],
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    glow: "#fb923c",
  },
  {
    icon: Shield,
    title: "Sécurité & Perf",
    desc: "Audits de sécurité, HTTPS, rate limiting et règles OWASP.",
    tags: ["OWASP", "Perf"],
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
        className="section-header mb-4 sm:mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-eyebrow">Services</span>
        <h2 className="section-title text-lg sm:text-3xl font-extrabold">
          Ce que je fais <span className="gradient-text">mieux que tout</span>
        </h2>
        <p className="section-subtitle text-xs sm:text-base text-slate-400 max-w-md mx-auto">
          Des solutions complètes, scalables et maintenues dans le temps.
        </p>
      </motion.div>

      <div className="services-grid grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.title}
              className={`service-card p-2.5 sm:p-5 rounded-xl border ${svc.border} bg-white/5 flex flex-col justify-between`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div>
                <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-1.5 sm:mb-3 bg-gradient-to-br ${svc.gradient}`}>
                  <Icon size={16} className="sm:hidden" style={{ color: svc.glow }} />
                  <Icon size={22} className="hidden sm:block" style={{ color: svc.glow }} />
                </div>
                <h3 className="text-xs sm:text-base font-bold text-white mb-1 line-clamp-1">{svc.title}</h3>
                <p className="text-[11px] sm:text-sm text-slate-400 leading-tight line-clamp-2">{svc.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-md border bg-white/5"
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