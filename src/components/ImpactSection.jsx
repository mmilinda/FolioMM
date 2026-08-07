import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers, ArrowUpRight } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité sécurisée de la chaîne alimentaire.",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.15)",
    border: "border-emerald-500/30",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision des équipes de sécurité en temps réel.",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.15)",
    border: "border-indigo-500/30",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Processus d'identification numérique sécurisé & authentification rapide.",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.15)",
    border: "border-cyan-500/30",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Accès rapide et digitalisé aux services d'assistance automobile de proximité.",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.15)",
    border: "border-pink-500/30",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus métiers & automatisation intelligente des flux.",
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.15)",
    border: "border-orange-500/30",
  },
];

const initiatives = [
  "Projets technologiques personnels",
  "Hackathons",
  "AgriChain AI",
  "SecurityApp",
  "Projets orientés problèmes locaux",
  "Expérimentation IA & Blockchain",
  "Création de solutions SaaS",
];

export default function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-10 md:py-20 relative overflow-hidden">
      <div className="container-custom relative z-10 space-y-12 md:space-y-20">

        {/* ─── Part 1: Vision & Philosophie (Pourquoi je construis) ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch"
        >
          {/* Left Column — Text */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-left">
            <div className="space-y-4">
              <span className="section-eyebrow">
                <Target size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold text-left m-0">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* Glass Card Box */}
              <div className="p-5 sm:p-7 rounded-2xl bg-white/5 border border-cyan-400/25 backdrop-blur-xl space-y-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Lightbulb size={18} className="text-cyan-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white m-0">
                    Technologie avec un objectif
                  </h3>
                </div>
                <p className="text-slate-200 text-xs sm:text-base leading-relaxed m-0 font-medium">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed m-0">
                À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                <strong className="text-cyan-400 font-semibold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
              </p>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed m-0">
                Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
              </p>
            </div>

            {/* Quote Block */}
            <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed italic shadow-lg mt-2">
              "Je ne veux pas seulement construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives & Ambition */}
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-5 sm:p-7 rounded-2xl md:rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6 text-left w-full"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Rocket size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white m-0">Ce que j'initie</h3>
                    <span className="text-xs text-slate-400">Initiatives & Leadership</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {initiatives.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                    >
                      🚀 {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Compass size={15} /> Mon Objectif Ultime
                </span>
                <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-semibold m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Impact Tangible (Des solutions pensées pour des problèmes réels) ─ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="text-center space-y-2">
            <span className="section-eyebrow">
              <Layers size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
              Impact Tangible
            </span>
            <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold m-0">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto m-0 leading-relaxed">
              Chaque projet répond à un défi concret identifié sur le terrain.
            </p>
          </div>

          {/* Premium Cards Grid — Replace plain table with modern interactive SaaS cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactDomains.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl border ${item.border} bg-white/5 backdrop-blur-md flex flex-col justify-between space-y-4 text-left shadow-lg hover:shadow-2xl transition-all`}
                  style={{ background: `linear-gradient(135deg, ${item.glow} 0%, rgba(255,255,255,0.02) 100%)` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                      style={{ borderColor: item.color + "44", color: item.color, background: item.glow }}
                    >
                      <Icon size={14} />
                      {item.domain}
                    </span>
                    <span className="text-sm font-extrabold text-white flex items-center gap-1">
                      {item.project}
                      <ArrowUpRight size={14} className="text-slate-400" />
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed m-0 font-medium">
                    {item.problem}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
