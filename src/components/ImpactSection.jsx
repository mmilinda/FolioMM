import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers, Sparkles } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité sécurisée de la chaîne alimentaire.",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.15)",
    border: "border-emerald-500/40",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision des équipes de sécurité en temps réel.",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.15)",
    border: "border-indigo-500/40",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Processus d'identification numérique sécurisé & authentification rapide.",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.15)",
    border: "border-cyan-500/40",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Accès rapide et digitalisé aux services d'assistance automobile de proximité.",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.15)",
    border: "border-pink-500/40",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus métiers & automatisation intelligente des flux.",
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.15)",
    border: "border-orange-500/40",
  },
];

const initiatives = [
  { text: "Projets Personnels", icon: "🚀" },
  { text: "Hackathons & Contests", icon: "🏆" },
  { text: "AgriChain AI", icon: "🌾" },
  { text: "SecurityApp", icon: "🛡️" },
  { text: "Solutions Locales", icon: "🌍" },
  { text: "IA & Blockchain", icon: "⚡" },
  { text: "Produits SaaS", icon: "💻" },
];

export default function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-12 md:py-24 relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 space-y-16 md:space-y-24">

        {/* ─── Part 1: Vision & Philosophie (Pourquoi je construis) ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* Left Column — Text (Vision & Philosophie) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-5">
              <span className="section-eyebrow">
                <Target size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-2xl sm:text-4xl md:text-5xl font-extrabold text-left m-0 leading-tight">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* Glass Card Box */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-cyan-400/30 backdrop-blur-xl space-y-3.5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 via-indigo-400 to-purple-500" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Lightbulb size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white m-0">
                    Technologie avec un objectif
                  </h3>
                </div>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed m-0 font-medium pl-1">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              {/* Airy Text Content */}
              <div className="space-y-4 pt-1">
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose m-0">
                  À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                  <strong className="text-cyan-400 font-semibold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
                </p>

                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose m-0">
                  Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950/60 border border-cyan-400/30 text-sm sm:text-base md:text-lg text-cyan-100 font-medium leading-relaxed italic shadow-xl">
              "Je ne me limite pas à construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives (Redesigned as stylish 2-column shiny badge grid) */}
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-5 sm:p-7 rounded-2xl md:rounded-3xl bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-5 text-left w-full h-full overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Top Illustrative Banner */}
                <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden border border-white/15 relative shadow-lg">
                  <img src="/initiatives_banner.jpg" alt="Leadership Tech" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <Sparkles size={13} /> Leadership Tech
                    </span>
                  </div>
                </div>

                {/* Card Title Header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-3 pt-1">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Rocket size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white m-0">Ce que j'initie</h3>
                    <span className="text-xs text-slate-400">Initiatives & Engagement</span>
                  </div>
                </div>

                {/* Modern 2-Column Grid of Shiny Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {initiatives.map((item) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300 transition-all shadow-sm"
                    >
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="truncate">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Ambition Box — 100% spacious and never cut off */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-400 flex items-center gap-1.5">
                  <Compass size={15} /> Mon Objectif Ultime
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Impact Tangible ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="text-center space-y-3">
            <span className="section-eyebrow">
              <Layers size={15} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
              Impact Tangible
            </span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold m-0">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto m-0 leading-relaxed">
              Chaque projet répond à un défi concret identifié sur le terrain.
            </p>
          </div>

          {/* 5 Compact Height Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl border ${item.border} bg-slate-900/90 backdrop-blur-md flex flex-col justify-between space-y-4 text-left shadow-xl hover:shadow-2xl transition-all min-h-[190px] h-full`}
                  style={{ background: `linear-gradient(145deg, ${item.glow} 0%, rgba(15, 23, 42, 0.95) 100%)` }}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between gap-1.5">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                        style={{ borderColor: item.color + "44", color: item.color, background: item.glow }}
                      >
                        <Icon size={14} />
                        {item.domain}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-white m-0 tracking-wide pt-1">
                      {item.project}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed m-0 font-medium pt-1">
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
