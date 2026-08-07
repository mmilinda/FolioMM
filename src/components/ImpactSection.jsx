import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers, Sparkles, ArrowUpRight } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité.",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.2)",
    border: "border-emerald-500/40",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision temps réel.",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.2)",
    border: "border-indigo-500/40",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Identification numérique sécurisée & rapide.",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.2)",
    border: "border-cyan-500/40",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Assistance automobile de proximité digitalisée.",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.2)",
    border: "border-pink-500/40",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus & automatisation.",
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.2)",
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
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-10 md:py-20 relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 space-y-12 md:space-y-18">

        {/* ─── Part 1: Vision & Philosophie (50/50 Balanced Height) ──────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch"
        >
          {/* Left Column — Text (50% Width) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5 text-left">
            <div className="space-y-3">
              <span className="section-eyebrow py-0.5 text-xs">
                <Target size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold text-left m-0 leading-tight">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* High Visibility Glass Card Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/40 border-2 border-cyan-400/50 backdrop-blur-xl space-y-2.5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center shrink-0 shadow-md">
                    <Lightbulb size={20} className="text-cyan-300" />
                  </div>
                  <h3 className="text-base sm:text-xl font-extrabold text-white m-0 tracking-wide">
                    Technologie avec un objectif
                  </h3>
                </div>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed m-0 font-semibold">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-3 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-slate-200 font-medium">
                <p className="m-0">
                  À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                  <strong className="text-cyan-400 font-bold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
                </p>

                <p className="m-0">
                  Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-xs sm:text-base text-cyan-100 font-medium leading-relaxed italic shadow-md mt-1">
              "Je ne me limite pas à construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives & Leadership (50% Width) */}
          <div className="lg:col-span-6 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-indigo-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-4 text-left w-full h-full relative overflow-hidden"
            >
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                
                {/* 1. Header Title at the top */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                      <Rocket size={17} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white m-0 leading-none">Ce que j'initie</h3>
                      <span className="text-[11px] text-slate-400 mt-0.5 inline-block">Initiatives & Leadership</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-lg bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles size={11} /> Leadership Tech
                  </span>
                </div>

                {/* 2. Taller Illustrative Banner Image below title */}
                <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden border border-white/15 relative shadow-md shrink-0">
                  <img src="/initiatives_banner.jpg" alt="Leadership Tech" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                {/* 3. Single-Column Initiative Rows */}
                <div className="flex flex-col justify-between space-y-1.5 w-full flex-grow my-auto pt-1">
                  {initiatives.map((item) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold w-full hover:bg-white/10 hover:border-cyan-400/40 transition-all shadow-xs min-h-[32px]"
                    >
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="w-full truncate">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 4. High-Visibility Mon Objectif Ultime Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-950/90 via-cyan-900/80 to-slate-900/90 border-2 border-cyan-400/60 shadow-xl space-y-1 shrink-0">
                <span className="text-xs uppercase tracking-widest font-black text-cyan-300 flex items-center gap-1.5">
                  <Compass size={15} className="text-cyan-400 shrink-0" /> MON OBJECTIF ULTIME
                </span>
                <p className="text-xs sm:text-sm text-white leading-relaxed font-black m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Impact Tangible (Ultra Pretty Glass Cards Grid) ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 sm:space-y-8 pt-8 md:pt-14 border-t border-white/10"
        >
          <div className="text-center space-y-2">
            <span className="section-eyebrow py-0.5 text-xs">
              <Layers size={13} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
              Impact Tangible
            </span>
            <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold m-0">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto m-0 leading-relaxed">
              Chaque projet répond à un défi concret identifié sur le terrain.
            </p>
          </div>

          {/* 5 Ultra Pretty Modern Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-3.5 text-left group min-h-[160px] sm:min-h-[185px] h-full"
                  style={{ background: `linear-gradient(155deg, ${item.glow} 0%, rgba(15, 23, 42, 0.98) 100%)` }}
                >
                  {/* Glowing Top Colored Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 w-full rounded-t-2xl" style={{ background: item.color }} />

                  <div className="space-y-2.5 pt-1">
                    {/* Domain Pill Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border shadow-md"
                        style={{ borderColor: item.color + "55", color: item.color, background: item.glow }}
                      >
                        <Icon size={13} />
                        {item.domain}
                      </span>
                    </div>

                    {/* Project Title with Arrow */}
                    <h3 className="text-sm sm:text-base font-black text-white m-0 tracking-wide flex items-center justify-between group-hover:text-cyan-300 transition-colors">
                      <span>{item.project}</span>
                      <ArrowUpRight size={15} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </h3>
                  </div>

                  {/* Problem Statement */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed m-0 font-medium pt-1">
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
