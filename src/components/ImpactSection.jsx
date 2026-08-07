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
  { text: "Projets technologiques personnels", icon: "🚀" },
  { text: "Hackathons & compétitions tech", icon: "🏆" },
  { text: "AgriChain AI — AgriTech & AI", icon: "🌾" },
  { text: "SecurityApp — Ops & Sécurité", icon: "🛡️" },
  { text: "Projets orientés problèmes locaux", icon: "🌍" },
  { text: "Expérimentation IA & Blockchain", icon: "⚡" },
  { text: "Création de solutions SaaS", icon: "💻" },
];

export default function ImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-10 md:py-20 relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 space-y-12 md:space-y-18">

        {/* ─── Part 1: Vision & Philosophie (Pourquoi je construis) ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch"
        >
          {/* Left Column — Text */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5 text-left">
            <div className="space-y-3">
              <span className="section-eyebrow">
                <Target size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold text-left m-0 leading-tight">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* Glass Card Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-400/35 backdrop-blur-xl space-y-2.5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 via-indigo-400 to-purple-500" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Lightbulb size={18} className="text-cyan-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white m-0">
                    Technologie avec un objectif
                  </h3>
                </div>
                <p className="text-slate-100 text-xs sm:text-base leading-relaxed m-0 font-medium pl-1">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              {/* Text Content filling vertical space */}
              <div className="space-y-3 pt-1">
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed sm:leading-loose m-0">
                  À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                  <strong className="text-cyan-400 font-semibold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
                </p>

                <p className="text-slate-300 text-xs sm:text-base leading-relaxed sm:leading-loose m-0">
                  Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
                </p>
              </div>
            </div>

            {/* Quote Block — Tight vertical gap taking full space cleanly */}
            <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-xs sm:text-sm md:text-base text-cyan-100 font-medium leading-relaxed italic shadow-lg mt-1">
              "Je ne me limite pas à construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives & Leadership */}
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-5 sm:p-6 rounded-2xl md:rounded-3xl bg-slate-900/95 border border-indigo-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-4 text-left w-full h-full relative overflow-hidden"
            >
              <div className="space-y-3.5 flex-grow flex flex-col justify-between">
                
                {/* Taller Illustrative Banner Image (h-36 sm:h-44 md:h-48) */}
                <div className="w-full h-36 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-white/15 relative shadow-md shrink-0">
                  <img src="/initiatives_banner.jpg" alt="Leadership Tech" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Sparkles size={12} /> Leadership Tech
                    </span>
                  </div>
                </div>

                {/* Card Title Header */}
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-2 shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Rocket size={17} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white m-0 leading-none">Ce que j'initie</h3>
                    <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5 inline-block">Initiatives & Leadership</span>
                  </div>
                </div>

                {/* Single-Column Initiative Rows */}
                <div className="flex flex-col justify-between space-y-2 w-full flex-grow my-auto">
                  {initiatives.map((item) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm font-semibold w-full hover:bg-white/10 hover:border-cyan-400/40 transition-all shadow-sm min-h-[40px] sm:min-h-[44px]"
                    >
                      <span className="text-base shrink-0">{item.icon}</span>
                      <span className="w-full truncate">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Ambition Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-indigo-950/80 border border-cyan-400/35 shadow-lg space-y-1 shrink-0">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-black text-cyan-400 flex items-center gap-1.5">
                  <Compass size={14} className="text-cyan-400 shrink-0" /> Mon Objectif Ultime
                </span>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-bold m-0">
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

          {/* 5 Compact Height Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-xl border ${item.border} bg-slate-900/90 backdrop-blur-md flex flex-col justify-between space-y-3 text-left shadow-lg hover:shadow-xl transition-all min-h-[160px] sm:min-h-[180px] h-full`}
                  style={{ background: `linear-gradient(145deg, ${item.glow} 0%, rgba(15, 23, 42, 0.95) 100%)` }}
                >
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
                        style={{ borderColor: item.color + "44", color: item.color, background: item.glow }}
                      >
                        <Icon size={12} />
                        {item.domain}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-extrabold text-white m-0 tracking-wide pt-1">
                      {item.project}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed m-0 font-medium">
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
