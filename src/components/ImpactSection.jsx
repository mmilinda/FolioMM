import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers, Sparkles } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité.",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.15)",
    border: "border-emerald-500/40",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision temps réel.",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.15)",
    border: "border-indigo-500/40",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Identification numérique sécurisée & rapide.",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.15)",
    border: "border-cyan-500/40",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Assistance automobile de proximité digitalisée.",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.15)",
    border: "border-pink-500/40",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus & automatisation.",
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
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-4 md:py-6 relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 space-y-6 md:space-y-8">

        {/* ─── Part 1: Vision & Philosophie (Compact Viewport Fit) ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch"
        >
          {/* Left Column — Text */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3 text-left">
            <div className="space-y-2.5">
              <span className="section-eyebrow py-0.5 text-[11px] sm:text-xs">
                <Target size={13} className="inline-block mr-1 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-lg sm:text-2xl md:text-3xl font-extrabold text-left m-0 leading-tight">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* Compact Glass Card Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-cyan-400/35 backdrop-blur-xl space-y-1.5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-indigo-400 to-purple-500" />
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <Lightbulb size={15} className="text-cyan-400" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white m-0">
                    Technologie avec un objectif
                  </h3>
                </div>
                <p className="text-slate-100 text-xs sm:text-sm leading-snug m-0 font-medium pl-1">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              {/* Compact Paragraphs */}
              <div className="space-y-2 text-xs sm:text-sm leading-snug sm:leading-normal text-slate-300">
                <p className="m-0">
                  À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                  <strong className="text-cyan-400 font-semibold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
                </p>

                <p className="m-0">
                  Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
                </p>
              </div>
            </div>

            {/* Compact Quote Block */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-xs sm:text-sm text-cyan-100 font-medium leading-snug italic shadow-md">
              "Je ne me limite pas à construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives & Leadership (Viewport Compact Height) */}
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-3.5 sm:p-4 rounded-xl md:rounded-2xl bg-slate-900/95 border border-indigo-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-3 text-left w-full h-full relative overflow-hidden"
            >
              <div className="space-y-2.5 flex-grow flex flex-col justify-between">
                
                {/* Compact Top Illustrative Banner */}
                <div className="w-full h-20 sm:h-24 rounded-lg overflow-hidden border border-white/15 relative shadow-sm shrink-0">
                  <img src="/initiatives_banner.jpg" alt="Leadership Tech" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles size={10} /> Leadership Tech
                    </span>
                  </div>
                </div>

                {/* Card Title Header */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 shrink-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Rocket size={15} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white m-0 leading-none">Ce que j'initie</h3>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 inline-block">Initiatives & Leadership</span>
                  </div>
                </div>

                {/* Single-Column Compact Initiative Rows */}
                <div className="flex flex-col justify-between space-y-1.5 w-full flex-grow my-auto">
                  {initiatives.map((item) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-medium w-full hover:bg-white/10 hover:border-cyan-400/40 transition-all shadow-xs min-h-[30px] sm:min-h-[32px]"
                    >
                      <span className="text-xs shrink-0">{item.icon}</span>
                      <span className="w-full truncate">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Compact Bottom Ambition Box */}
              <div className="p-2.5 sm:p-3 rounded-lg bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-indigo-950/80 border border-cyan-400/35 shadow-md space-y-0.5 shrink-0">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-black text-cyan-400 flex items-center gap-1">
                  <Compass size={12} className="text-cyan-400 shrink-0" /> Mon Objectif Ultime
                </span>
                <p className="text-[11px] sm:text-xs text-slate-100 leading-tight font-bold m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Impact Tangible (Viewport Compact 5 Cards) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="text-center space-y-1">
            <span className="section-eyebrow py-0.5 text-[11px] sm:text-xs">
              <Layers size={13} className="inline-block mr-1 -mt-0.5 text-cyan-400" />
              Impact Tangible
            </span>
            <h2 className="section-title text-base sm:text-xl md:text-2xl font-extrabold m-0">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
          </div>

          {/* 5 Viewport Compact Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-xl border ${item.border} bg-slate-900/90 backdrop-blur-md flex flex-col justify-between space-y-2 text-left shadow-md hover:shadow-lg transition-all min-h-[120px] sm:min-h-[135px] h-full`}
                  style={{ background: `linear-gradient(145deg, ${item.glow} 0%, rgba(15, 23, 42, 0.95) 100%)` }}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                        style={{ borderColor: item.color + "44", color: item.color, background: item.glow }}
                      >
                        <Icon size={11} />
                        {item.domain}
                      </span>
                    </div>

                    <h3 className="text-xs font-extrabold text-white m-0 tracking-wide pt-0.5">
                      {item.project}
                    </h3>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-slate-300 leading-tight m-0 font-medium">
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
