import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité sécurisée de la chaîne alimentaire",
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.15)",
    border: "rgba(52, 211, 153, 0.35)",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision des équipes de sécurité en temps réel",
    color: "#818cf8",
    bg: "rgba(129, 140, 248, 0.15)",
    border: "rgba(129, 140, 248, 0.35)",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Processus d'identification numérique sécurisé & authentification rapide",
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.15)",
    border: "rgba(56, 189, 248, 0.35)",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Accès rapide et digitalisé aux services d'assistance automobile de proximité",
    color: "#f472b6",
    bg: "rgba(244, 114, 182, 0.15)",
    border: "rgba(244, 114, 182, 0.35)",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus métiers & automatisation intelligente des flux",
    color: "#fb923c",
    bg: "rgba(251, 146, 60, 0.15)",
    border: "rgba(251, 146, 60, 0.35)",
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
    <section ref={ref} className="py-12 md:py-28 relative overflow-hidden">
      <div className="container-custom relative z-10 space-y-16 md:space-y-28">

        {/* ─── Part 1: Vision & Philosophie (Pourquoi je construis) ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch"
        >
          {/* Left Column — Text */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-between">
            <div className="space-y-5">
              <span className="section-eyebrow">
                <Target size={16} className="inline-block mr-2 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-2xl sm:text-4xl md:text-5xl font-extrabold text-left m-0">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* Glowing Highlight Box */}
              <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-slate-900/90 border-2 border-cyan-400/30 backdrop-blur-xl relative overflow-hidden space-y-4 shadow-2xl">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 via-indigo-400 to-purple-500" />
                <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-3 m-0">
                  <Lightbulb size={24} className="text-cyan-400 shrink-0" />
                  Technologie avec un objectif
                </h3>
                <p className="text-slate-100 text-sm sm:text-lg md:text-xl leading-relaxed m-0 font-medium">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base md:text-xl leading-relaxed md:leading-loose">
                À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                <strong className="text-cyan-400 font-bold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
              </p>

              <p className="text-slate-300 text-sm sm:text-base md:text-xl leading-relaxed md:leading-loose">
                Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
              </p>
            </div>

            {/* Quote Block */}
            <div className="p-5 sm:p-7 rounded-2xl bg-cyan-950/50 border border-cyan-400/40 text-sm sm:text-lg text-cyan-100 font-medium leading-relaxed italic shadow-xl">
              "Je ne veux pas seulement construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives & Ambition */}
          <div className="lg:col-span-5 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-6 sm:p-9 rounded-2xl md:rounded-3xl bg-slate-900/90 border border-white/20 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-8 text-left w-full"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Rocket size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white m-0">Ce que j'initie</h3>
                    <span className="text-xs sm:text-sm text-slate-400">Initiatives & Leadership</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {initiatives.map((item) => (
                    <span
                      key={item}
                      className="text-xs sm:text-sm px-3.5 py-2 rounded-full bg-white/5 border border-white/15 text-slate-200 font-medium hover:border-cyan-400/50 hover:text-cyan-300 transition-all shadow-sm"
                    >
                      🚀 {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 space-y-3">
                <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-cyan-400 flex items-center gap-2">
                  <Compass size={18} /> Mon Objectif Ultime
                </span>
                <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-semibold m-0">
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
          className="space-y-8 sm:space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="section-eyebrow">
              <Layers size={16} className="inline-block mr-2 -mt-0.5 text-cyan-400" />
              Impact Tangible
            </span>
            <h2 className="section-title text-2xl sm:text-4xl md:text-5xl font-extrabold m-0">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto m-0 leading-relaxed">
              Chaque projet répond à un défi concret identifié sur le terrain.
            </p>
          </div>

          {/* Desktop Table View — Spacious padded rows */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/15 bg-white/5 text-cyan-400 text-sm font-extrabold uppercase tracking-widest">
                  <th className="py-6 px-8">Domaine</th>
                  <th className="py-6 px-8">Projet</th>
                  <th className="py-6 px-8">Problème Résolu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-base md:text-lg">
                {impactDomains.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr key={item.domain} className="hover:bg-white/5 transition-colors">
                      <td className="py-6 px-8 font-semibold">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-bold shadow-sm" style={{ background: item.bg, borderColor: item.border, color: item.color }}>
                          <Icon size={18} />
                          {item.domain}
                        </div>
                      </td>
                      <td className="py-6 px-8 font-black text-white text-lg">
                        {item.project}
                      </td>
                      <td className="py-6 px-8 text-slate-200 font-normal leading-relaxed">
                        {item.problem}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View — Highly spacious, readable cards */}
          <div className="grid grid-cols-1 gap-5 md:hidden">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.domain}
                  className="p-5 sm:p-7 rounded-2xl border-2 bg-slate-900/90 backdrop-blur-md flex flex-col space-y-4 text-left shadow-2xl"
                  style={{ borderColor: item.border }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold" style={{ background: item.bg, color: item.color }}>
                      <Icon size={15} />
                      {item.domain}
                    </span>
                    <span className="text-base font-black text-white tracking-wide">{item.project}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed m-0 font-medium">
                    {item.problem}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
