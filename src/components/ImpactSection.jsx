import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Rocket, Lightbulb, Compass, Sprout, Shield, Fingerprint, Car, Building2, Layers, Sparkles, ArrowUpRight } from "lucide-react";

import agriImg from "../assets/impact/agri.jpg";
import secImg from "../assets/impact/sec.jpg";
import identityImg from "../assets/impact/identity.jpg";
import mobilityImg from "../assets/impact/mobility.jpg";
import enterpriseImg from "../assets/impact/enterprise.jpg";

const impactDomains = [
  {
    domain: "Agriculture",
    icon: Sprout,
    project: "AgriChain AI",
    problem: "Accès à l'information agricole & traçabilité.",
    image: agriImg,
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.25)",
    border: "border-emerald-500/50",
  },
  {
    domain: "Sécurité",
    icon: Shield,
    project: "SecurityApp",
    problem: "Gestion opérationnelle & supervision temps réel.",
    image: secImg,
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.25)",
    border: "border-indigo-500/50",
  },
  {
    domain: "Identité",
    icon: Fingerprint,
    project: "AfriAccess",
    problem: "Identification numérique sécurisée & rapide.",
    image: identityImg,
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.25)",
    border: "border-cyan-500/50",
  },
  {
    domain: "Mobilité",
    icon: Car,
    project: "Garabi",
    problem: "Assistance automobile de proximité digitalisée.",
    image: mobilityImg,
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.25)",
    border: "border-pink-500/50",
  },
  {
    domain: "Entreprises",
    icon: Building2,
    project: "Noregis",
    problem: "Digitalisation des processus & automatisation.",
    image: enterpriseImg,
    color: "#fb923c",
    glow: "rgba(251, 146, 60, 0.25)",
    border: "border-orange-500/50",
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
    <section ref={ref} className="py-6 md:py-12 relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 space-y-8 md:space-y-12">

        {/* ─── Part 1: Vision & Philosophie (Compact Scaled ~10-15%) ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch"
        >
          {/* Left Column — Text (50% Width) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3 text-left">
            <div className="space-y-2.5">
              <span className="section-eyebrow py-0.5 text-xs">
                <Target size={13} className="inline-block mr-1 -mt-0.5 text-cyan-400" />
                Vision & Philosophie
              </span>

              <h2 className="section-title text-lg sm:text-2xl md:text-3xl font-extrabold text-left m-0 leading-tight">
                Pourquoi je <span className="gradient-text">construis</span>
              </h2>

              {/* Glass Card Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/40 border-2 border-cyan-400/50 backdrop-blur-xl space-y-2 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center shrink-0 shadow-sm">
                    <Lightbulb size={17} className="text-cyan-300" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white m-0 tracking-wide">
                    Technologie avec un objectif
                  </h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed m-0 font-normal">
                  Je conçois des solutions numériques pour répondre à des problèmes concrets dans mon environnement.
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-2 text-xs sm:text-base leading-relaxed text-slate-400 font-normal">
                <p className="m-0">
                  À travers mes projets, je m'intéresse particulièrement à des secteurs où la technologie peut avoir un impact tangible : 
                  <span className="text-cyan-400 font-normal"> agriculture, sécurité, services, identité numérique et inclusion</span>.
                </p>

                <p className="m-0">
                  Mon ambition est de transformer mes compétences techniques en projets capables de créer des opportunités, améliorer l'accès à l'information et contribuer au développement numérique en Afrique.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed italic shadow-md mt-0.5">
              "Je ne me limite pas à construire des applications. Je me consacre à édifier des solutions utiles, accessibles et capables de grandir durablement."
            </div>
          </div>

          {/* Right Column — Initiatives & Leadership (50% Width) */}
          <div className="lg:col-span-6 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/95 border border-indigo-500/30 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-3 text-left w-full h-full relative overflow-hidden"
            >
              <div className="space-y-2.5 flex-grow flex flex-col justify-between">
                
                {/* 1. Header Title at the top */}
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                      <Rocket size={15} className="text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white m-0 leading-none">Ce que j'initie</h3>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 inline-block">Initiatives & Leadership</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Sparkles size={10} /> Leadership Tech
                  </span>
                </div>

                {/* 2. Illustrative Banner Image (Compact h-24 sm:h-28) */}
                <div className="w-full h-24 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden border border-white/15 relative shadow-sm shrink-0">
                  <img src="/initiatives_banner.jpg" alt="Leadership Tech" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>

                {/* 3. Single-Column Initiative Rows */}
                <div className="flex flex-col justify-between space-y-1 w-full flex-grow my-auto pt-0.5">
                  {initiatives.map((item) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs font-normal w-full hover:bg-white/10 hover:border-cyan-400/40 transition-all shadow-xs min-h-[28px] sm:min-h-[30px]"
                    >
                      <span className="text-xs shrink-0">{item.icon}</span>
                      <span className="w-full truncate">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 4. High-Visibility Mon Objectif Ultime Box */}
              <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-950/90 via-cyan-900/80 to-slate-900/90 border-2 border-cyan-400/60 shadow-lg space-y-0.5 shrink-0">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-black text-cyan-300 flex items-center gap-1">
                  <Compass size={13} className="text-cyan-400 shrink-0" /> MON OBJECTIF ULTIME
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug font-normal m-0">
                  Passer de la création de produits numériques à la création d'écosystèmes technologiques ayant un impact durable.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* ─── Part 2: Impact Tangible ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 sm:space-y-6 pt-6 md:pt-10 border-t border-white/10"
        >
          <div className="text-center space-y-1.5">
            <span className="section-eyebrow py-0.5 text-xs">
              <Layers size={13} className="inline-block mr-1.5 -mt-0.5 text-cyan-400" />
              Impact Tangible
            </span>
            <h2 className="section-title text-xl sm:text-3xl md:text-4xl font-extrabold m-0">
              Des solutions pensées pour <span className="gradient-text">des problèmes réels</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto m-0 leading-relaxed font-normal">
              Chaque projet répond à un défi concret identifié sur le terrain.
            </p>
          </div>

          {/* 5 Premium Modern Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {impactDomains.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.domain}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/95 border-2 border-white/15 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:border-cyan-400/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-3 text-left group h-full"
                  style={{ background: `linear-gradient(155deg, ${item.glow} 0%, rgba(15, 23, 42, 0.98) 100%)` }}
                >
                  {/* Glowing Top Colored Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 w-full rounded-t-2xl" style={{ background: item.color }} />

                  {/* Top Image Thumbnail Header */}
                  <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden border border-white/15 relative shadow-md shrink-0 mt-0.5">
                    <img src={item.image} alt={item.project} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span
                      className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider border shadow-md backdrop-blur-md"
                      style={{ borderColor: item.color + "66", color: item.color, background: "rgba(15, 23, 42, 0.9)" }}
                    >
                      <Icon size={12} />
                      {item.domain}
                    </span>
                  </div>

                  {/* Title and Description stacked tightly with high contrast */}
                  <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                    {/* Project Title with Arrow */}
                    <h3 className="text-sm sm:text-base font-bold text-white m-0 tracking-wide flex items-center justify-between group-hover:text-cyan-300 transition-colors">
                      <span>{item.project}</span>
                      <ArrowUpRight size={15} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </h3>

                    {/* Problem Statement directly under title */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-snug m-0 font-normal">
                      {item.problem}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
