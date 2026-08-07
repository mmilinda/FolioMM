import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers, CheckCircle2 } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité sécurisée.",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.12)",
    border: "border-emerald-500/30",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision des équipes en temps réel.",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.12)",
    border: "border-indigo-500/30",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Processus d'identification numérique sécurisé & rapide.",
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.12)",
    border: "border-cyan-500/30",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Accès digitalisé aux services d'assistance automobile.",
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.12)",
    border: "border-pink-500/30",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus métiers & automatisation.",
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.12)",
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
    <section ref={ref} className="py-12 md:py-24 relative overflow-hidden">
      <div className="container-custom relative z-10 space-y-14 md:space-y-24">

        {/* ─── Part 1: Vision & Philosophie (Pourquoi je construis) ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch"
        >
          {/* Left Column — Text (Vision & Philosophie) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-5">
              <span className="section-eyebrow">
                <Target size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-left m-0">
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

              {/* Airy, well-spaced paragraphs */}
              <div className="space-y-4 pt-1">
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed sm:leading-loose m-0">
                  À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                  <strong className="text-cyan-400 font-semibold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
                </p>

                <p className="text-slate-300 text-xs sm:text-base leading-relaxed sm:leading-loose m-0">
                  Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed italic shadow-lg mt-3">
              "Je ne veux pas seulement construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives (One per line, filling full card space) */}
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-5 sm:p-7 rounded-2xl md:rounded-3xl bg-slate-900/85 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6 text-left w-full h-full"
            >
              <div className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Rocket size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white m-0">Ce que j'initie</h3>
                    <span className="text-xs text-slate-400">Initiatives & Leadership</span>
                  </div>
                </div>

                {/* Vertical Stack: ONE initiative per line filling card width & space */}
                <div className="flex flex-col space-y-2 w-full my-auto">
                  {initiatives.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm font-medium w-full hover:bg-white/10 hover:border-cyan-400/30 transition-all shadow-sm"
                    >
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Ambition Box */}
              <div className="pt-3.5 border-t border-white/10 space-y-1.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Compass size={14} /> Mon Objectif Ultime
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Impact Tangible (Reduced Card Width Grid) ────────────────── */}
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

          {/* Reduced Card Width Grid — 5 compact columns on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-xl border ${item.border} bg-white/5 backdrop-blur-md flex flex-col justify-between space-y-3 text-left shadow-md hover:shadow-xl transition-all h-full`}
                  style={{ background: `linear-gradient(135deg, ${item.glow} 0%, rgba(255,255,255,0.02) 100%)` }}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
                      style={{ borderColor: item.color + "44", color: item.color, background: item.glow }}
                    >
                      <Icon size={12} />
                      {item.domain}
                    </span>
                    <span className="text-xs font-bold text-white truncate">{item.project}</span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-300 leading-snug sm:leading-relaxed m-0 font-medium">
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
