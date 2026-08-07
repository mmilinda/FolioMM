import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, ShieldCheck, Sprout, Shield, Fingerprint, Car, Building2 } from "lucide-react";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité",
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.1)",
    border: "rgba(52, 211, 153, 0.25)",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision temps réel",
    color: "#818cf8",
    bg: "rgba(129, 140, 248, 0.1)",
    border: "rgba(129, 140, 248, 0.25)",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Processus d'identification sécurisé & rapide",
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.1)",
    border: "rgba(56, 189, 248, 0.25)",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Accès simplifié aux services automobiles",
    color: "#f472b6",
    bg: "rgba(244, 114, 182, 0.1)",
    border: "rgba(244, 114, 182, 0.25)",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus & automatisation",
    color: "#fb923c",
    bg: "rgba(251, 146, 60, 0.1)",
    border: "rgba(251, 146, 60, 0.25)",
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
    <section ref={ref} className="py-10 md:py-24 relative overflow-hidden">
      <div className="container-custom relative z-10 space-y-12 md:space-y-20">

        {/* ─── Part 1: Pourquoi je construis ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="section-eyebrow">
              <Target size={14} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
              Vision & Philosophie
            </span>

            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-left m-0">
              Pourquoi je <span className="gradient-text">construis</span>
            </h2>

            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-cyan-400/30 backdrop-blur-md relative overflow-hidden space-y-3">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400" />
              <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-2 m-0">
                <Lightbulb size={20} className="text-cyan-400 shrink-0" />
                Technologie avec un objectif
              </h3>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed m-0">
                Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
              </p>
            </div>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
              <strong className="text-cyan-400 font-semibold"> agriculture, sécurité, services, identité numérique et inclusion</strong>.
            </p>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
            </p>

            <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent border border-white/10 text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed italic">
              "Je ne veux pas seulement construire des applications. Je veux construire des solutions utiles, accessibles et capables de grandir avec les communautés qu'elles servent."
            </div>
          </div>

          {/* Right Column Initiatives Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-5 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Rocket size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white m-0">Ce que j'initie</h3>
                  <span className="text-xs text-slate-400">Initiatives & Leadership</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {initiatives.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                  >
                    ✨ {item}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Compass size={14} /> Mon Objectif Ultime
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Section Impact Table/Grid ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="section-eyebrow">Impact Tangible</span>
            <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto">
              Chaque projet répond à un défi concret identifié sur le terrain.
            </p>
          </div>

          {/* Desktop Table View / Mobile Cards View */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-300 text-sm font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Domaine</th>
                  <th className="py-4 px-6">Projet</th>
                  <th className="py-4 px-6">Problème Résolu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {impactDomains.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr key={item.domain} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold" style={{ background: item.bg, borderColor: item.border, color: item.color }}>
                          <Icon size={14} />
                          {item.domain}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">
                        {item.project}
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        {item.problem}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.domain}
                  className="p-3.5 rounded-xl border bg-white/5 flex flex-col justify-between space-y-2 text-left"
                  style={{ borderColor: item.border }}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: item.bg, color: item.color }}>
                      <Icon size={12} />
                      {item.domain}
                    </span>
                    <span className="text-xs font-bold text-white">{item.project}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight m-0">
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
