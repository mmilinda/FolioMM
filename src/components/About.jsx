import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Code2, Server, Zap, Download } from "lucide-react";

const highlights = [
  { icon: Code2, text: "Architecture Full Stack moderne" },
  { icon: Server, text: "Infrastructure DevOps & Cloud" },
  { icon: Zap, text: "Pipelines CI/CD automatisés" },
  { icon: CheckCircle, text: "Delivery rapide & code de qualité" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="about-section py-6 md:py-16">
      <div className="about-grid">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center sm:text-left"
        >
          <span className="section-eyebrow">À propos</span>
          <h2 className="section-title text-xl sm:text-3xl font-extrabold mb-2">
            Développeuse junior qui{" "}
            <span className="gradient-text">pense systèmes</span>,
            <br className="hidden sm:inline" /> pas juste fonctionnalités.
          </h2>

          <p className="about-text text-xs sm:text-base text-slate-300 leading-relaxed">
            Avec plus de 3 ans d'expérience, je conçois des produits digitaux robustes
            de l'architecture à la mise en production. Ma force réside dans ma capacité
            à marier performance technique, expérience utilisateur et vision produit.
          </p>

          <p className="about-text text-xs sm:text-base text-slate-300 leading-relaxed mt-2">
            Spécialisée en <strong className="text-cyan-400">DevOps</strong>,{" "}
            <strong className="text-cyan-400">React</strong>,{" "}
            <strong className="text-cyan-400">Laravel</strong> et architectures cloud,
            je transforme des exigences complexes en solutions élégantes et maintenables.
          </p>

          <div className="about-highlights grid grid-cols-2 gap-2 mt-3 text-left">
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                className="about-highlight-item p-1.5 sm:p-2.5 text-[11px] sm:text-sm flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Icon size={14} className="text-cyan-400 shrink-0" />
                <span className="truncate">{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-3 flex justify-center sm:justify-start w-full"
          >
            <a
              href="/CV-Milinda-Mendy.pdf"
              download
              className="hero-btn-secondary px-2.5 py-1 text-[10px] sm:px-4 sm:py-2 sm:text-sm inline-flex items-center justify-center gap-1.5 rounded-md w-auto max-w-fit mx-auto sm:mx-0 shrink-0 shadow-none"
            >
              <Download size={12} className="shrink-0" />
              Télécharger mon CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Visual code block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="about-code-wrapper hidden md:block"
        >
          <div className="about-code-card">
            <div className="about-code-header">
              <span className="code-dot code-dot-red" />
              <span className="code-dot code-dot-yellow" />
              <span className="code-dot code-dot-green" />
              <span className="code-filename">milinda.config.ts</span>
            </div>
            <pre className="about-code-body">
{`const milinda = {
  role: "Junior DevOps & Full Stack",
  location: "Sénégal 🇸🇳",
  
  stack: {
    frontend: ["React", "TypeScript", "Tailwind"],
    backend:  ["Laravel", "Node.js", "PHP"],
    devops:   ["Docker", "K8s", "CI/CD", "AWS"],
    database: ["MySQL", "Firebase", "Redis"],
  },

  philosophy: "Ship fast. Break nothing.",
  
  openToWork: true, // ← always looking for challenges
};`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}