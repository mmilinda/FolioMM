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
    <section ref={ref} className="about-section py-8 md:py-20">
      <div className="about-grid">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <span className="section-eyebrow">À propos</span>
          <h2 className="section-title text-xl sm:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-5 text-left">
            Développeuse junior qui{" "}
            <span className="gradient-text">pense systèmes</span>,
            <br className="hidden sm:inline" /> pas juste fonctionnalités.
          </h2>

          <p className="about-text text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed md:leading-loose text-left">
            Avec plus de 3 ans d'expérience, je conçois des produits digitaux robustes
            de l'architecture à la mise en production. Ma force réside dans ma capacité
            à marier performance technique, expérience utilisateur et vision produit.
          </p>

          <p className="about-text text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed md:leading-loose mt-3 md:mt-5 text-left">
            Spécialisée en <strong className="text-cyan-400">DevOps</strong>,{" "}
            <strong className="text-cyan-400">React</strong>,{" "}
            <strong className="text-cyan-400">Laravel</strong> et architectures cloud,
            je transforme des exigences complexes en solutions élégantes et maintenables.
          </p>

          <div className="about-highlights grid grid-cols-2 md:grid-cols-1 gap-2.5 md:gap-3.5 mt-5 md:mt-6 text-left">
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                className="about-highlight-item p-2 md:p-3.5 text-xs sm:text-sm md:text-base flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Icon size={20} className="text-cyan-400 shrink-0" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-5 md:mt-8 flex justify-center sm:justify-start w-full"
          >
            <a
              href="/CV-Milinda-Mendy.pdf"
              download
              className="hero-btn-secondary px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base font-bold inline-flex items-center justify-center gap-2 rounded-xl w-auto shrink-0"
            >
              <Download size={18} className="shrink-0" />
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
            <pre className="about-code-body text-xs md:text-sm lg:text-base">
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