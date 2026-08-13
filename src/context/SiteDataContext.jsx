import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const SiteDataContext = createContext();

// Données par défaut de secours si l'API n'est pas encore disponible
const defaultProfile = {
  name: "Milinda Mendy",
  headline: "Développeuse Full Stack & DevOps",
  email: "mmilinda00@gmail.com",
  location: "Sénégal 🇸🇳 – Remote",
  availability: "Ouverte aux opportunités",
  github: "https://github.com/mmilinda",
  linkedin: "https://www.linkedin.com/in/milinda-mendy-5ba17928a/",
  photo: "/images/profile/MM.png",
  avatar: "/images/profile/MM.png",
  cvLink: "/CV-Milinda-Mendy.pdf",
  bio: "Je conçois et développe des applications web, plateformes SaaS et solutions digitales de bout en bout, de l'interface utilisateur au backend, aux API et au déploiement.",
  yearsExp: "5+",
  projectsCount: "30+",
  uptimeRate: "99.9%",
};

const defaultStats = [
  { id: "stat-1", value: "10+", label: "Projets", desc: "Applications Web, SaaS & Mobile" },
  { id: "stat-2", value: "3+", label: "Années d'Expérience", desc: "En développement Full Stack (2022 - Présent)" },
  { id: "stat-3", value: "3+", label: "Solutions de Production", desc: "SaaS et plateformes numériques d'entreprise" },
  { id: "stat-4", value: "100%", label: "Engagement", desc: "Livraison agile & Qualité de code" },
];

const defaultServices = [
  {
    id: "svc-1",
    title: "Développement Full Stack",
    desc: "Applications web modernes, réactives et performantes construites avec React, Next.js, Node.js et Laravel.",
    iconName: "Code2",
    tags: ["React", "Laravel", "JavaScript"],
    glow: "#38bdf8",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "svc-2",
    title: "Architecture Cloud & Infrastructure",
    desc: "Conception d'infrastructures résilientes et scalables sur AWS, GCP, Docker et Kubernetes.",
    iconName: "Cloud",
    tags: ["AWS", "Docker", "Kubernetes"],
    glow: "#818cf8",
    gradient: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: "svc-3",
    title: "CI/CD & Automatisation DevOps",
    desc: "Mise en place de pipelines d'intégration et de déploiement continus automatisés avec GitHub Actions.",
    iconName: "GitBranch",
    tags: ["GitHub Actions", "CI/CD", "Monitoring"],
    glow: "#34d399",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "svc-4",
    title: "Intégration d'IA & Automation",
    desc: "Intégration d'APIs LLM (OpenAI, Gemini), automatisation de workflows et agents intelligents.",
    iconName: "Brain",
    tags: ["OpenAI", "Gemini", "API"],
    glow: "#f472b6",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "svc-5",
    title: "Architecture SaaS Multi-tenant",
    desc: "Développement de solutions SaaS clé en main avec gestion des abonnements Stripe, rôles et authentification.",
    iconName: "Layers",
    tags: ["SaaS", "Multi-tenant", "Stripe"],
    glow: "#fb923c",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: "svc-6",
    title: "Sécurité & Audit de Performance",
    desc: "Audits de sécurité, optimisation des temps de chargement, configuration HTTPS et protection OWASP.",
    iconName: "Shield",
    tags: ["Security", "OWASP", "Performance"],
    glow: "#22d3ee",
    gradient: "from-cyan-500/20 to-sky-500/20",
  },
];

const defaultSkills = [
  {
    id: "cat-1",
    category: "Development Frontend",
    iconName: "Layout",
    skills: ["React", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "Redux / Zustand", "HTML5/CSS3"],
  },
  {
    id: "cat-2",
    category: "Development Backend",
    iconName: "Server",
    skills: ["Laravel / PHP", "Node.js / Express", "JavaScript", "REST APIs", "GraphQL"],
  },
  {
    id: "cat-3",
    category: "DevOps & Cloud",
    iconName: "Cpu",
    skills: ["Docker", "Kubernetes", "AWS (EC2, S3, RDS)", "Terraform", "GitHub Actions", "Nginx"],
  },
  {
    id: "cat-4",
    category: "Databases & Storage",
    iconName: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase / Firebase"],
  },
];

const defaultTimeline = [
  {
    id: "time-0",
    year: "Janvier 2026 - Présent",
    title: "Développeuse d'applications & solutions numériques",
    company: "SamCorporate",
    description: "Développement de solutions numériques d'entreprise, d'applications web & mobiles et de plateformes intelligentes sur-mesure.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Laravel API", "Full Stack"],
    type: "work",
  },
  {
    id: "time-2",
    year: "2024 - 2025",
    title: "Développeuse Full Stack & Web Mobile",
    company: "Défarsci",
    description: "Développement d'applications web interactives : CV Vidéo et Location Appartement.",
    tags: ["Laravel", "React", "PHP", "MySQL", "JavaScript"],
    type: "work",
  },
  {
    id: "time-3",
    year: "2023",
    title: "Stagiaire Développeuse Web",
    company: "Défarsci",
    description: "Conception et intégration de sites vitrines et plateformes CMS : Site Zawiya.",
    tags: ["WordPress", "Laravel", "PHP", "MySQL", "CMS"],
    type: "work",
  },
  {
    id: "time-cert-isca",
    year: "2023",
    title: "Certification en Développement Web & Mobile",
    company: "ISCA (en partenariat avec le 3FPT)",
    description: "Formation certifiante et compétences pratiques en Développement Web & Mobile.",
    tags: ["Développement Web", "Développement Mobile", "Certification", "3FPT", "ISCA"],
    type: "education",
  },
];

const defaultImpact = {
  metrics: [
    { id: "imp-1", number: "-65%", label: "Temps de Déploiement", desc: "Grâce aux pipelines CI/CD automatisés" },
    { id: "imp-2", number: "99.95%", label: "Uptime Moyen", desc: "Sur les infrastructures cloud gérées" },
    { id: "imp-3", number: "3x", label: "Vitesse d'Exécution", desc: "Optimisation du code et des requêtes DB" },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Alexandre Dupont",
      role: "CTO @ SaaS Startup",
      content: "Milinda a transformé notre infrastructure et mis en place des pipelines CI/CD ultra-fiables. Son expertise Full Stack et DevOps est impressionnante.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    {
      id: "test-2",
      name: "Sarah Lawson",
      role: "Product Manager @ Tech Scaleup",
      content: "Une collaboration exceptionnelle. Code propre, respect strict des délais et conseils DevOps avisés du début à la fin.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    },
  ],
};

const defaultSectionVisibility = {
  hero: true,
  stats: true,
  about: true,
  services: true,
  projects: true,
  impact: true,
  timeline: true,
  booking: true,
  blog: true,
};

export function SiteDataProvider({ children }) {
  const [profile, setProfileState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_profile");
      return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [stats, setStatsState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_stats");
      return stored ? JSON.parse(stored) : defaultStats;
    } catch {
      return defaultStats;
    }
  });

  const [services, setServicesState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_services");
      return stored ? JSON.parse(stored) : defaultServices;
    } catch {
      return defaultServices;
    }
  });

  const [skills, setSkillsState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_skills");
      return stored ? JSON.parse(stored) : defaultSkills;
    } catch {
      return defaultSkills;
    }
  });

  const [timeline, setTimelineState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_timeline");
      return stored ? JSON.parse(stored) : defaultTimeline;
    } catch {
      return defaultTimeline;
    }
  });

  const [impact, setImpactState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_impact");
      return stored ? JSON.parse(stored) : defaultImpact;
    } catch {
      return defaultImpact;
    }
  });

  const [sectionVisibility, setSectionVisibilityState] = useState(() => {
    try {
      const stored = localStorage.getItem("site_section_visibility");
      return stored ? { ...defaultSectionVisibility, ...JSON.parse(stored) } : defaultSectionVisibility;
    } catch {
      return defaultSectionVisibility;
    }
  });

  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Charger les données en direct depuis l'API Laravel au démarrage
  useEffect(() => {
    let isMounted = true;

    async function loadDataFromApi() {
      try {
        const [profileRes, servicesRes, skillsRes, timelineRes, impactRes, settingsRes] = await Promise.allSettled([
          api.get("/profile"),
          api.get("/services"),
          api.get("/skills"),
          api.get("/timeline"),
          api.get("/impact"),
          api.get("/settings"),
        ]);

        if (!isMounted) return;

        if (profileRes.status === "fulfilled" && profileRes.value.data) {
          const p = profileRes.value.data;
          const formattedProfile = {
            ...defaultProfile,
            ...p,
            cvLink: p.cv_link || p.cvLink || defaultProfile.cvLink,
            yearsExp: p.years_exp || p.yearsExp || defaultProfile.yearsExp,
            projectsCount: p.projects_count || p.projectsCount || defaultProfile.projectsCount,
            uptimeRate: p.uptime_rate || p.uptimeRate || defaultProfile.uptimeRate,
          };
          setProfileState(formattedProfile);
          localStorage.setItem("site_profile", JSON.stringify(formattedProfile));
          setIsBackendConnected(true);
        }

        if (servicesRes.status === "fulfilled" && Array.isArray(servicesRes.value.data) && servicesRes.value.data.length > 0) {
          const sList = servicesRes.value.data.map((s) => ({
            id: s.id,
            title: s.title,
            desc: s.desc,
            iconName: s.icon_name || s.iconName || "Code2",
            tags: s.tags || [],
            glow: s.glow || "#38bdf8",
            gradient: s.gradient || "from-blue-500/20 to-cyan-500/20",
            hidden: !!s.hidden,
          }));
          setServicesState(sList);
          localStorage.setItem("site_services", JSON.stringify(sList));
        }

        if (skillsRes.status === "fulfilled" && Array.isArray(skillsRes.value.data) && skillsRes.value.data.length > 0) {
          const skList = skillsRes.value.data.map((sk) => ({
            id: sk.id,
            category: sk.category,
            iconName: sk.icon_name || sk.iconName || "Cpu",
            skills: sk.skills || [],
          }));
          setSkillsState(skList);
          localStorage.setItem("site_skills", JSON.stringify(skList));
        }

        if (timelineRes.status === "fulfilled" && Array.isArray(timelineRes.value.data) && timelineRes.value.data.length > 0) {
          const tList = timelineRes.value.data.map((tl) => ({
            id: tl.id,
            year: tl.year,
            title: tl.title,
            company: tl.company,
            description: tl.description,
            tags: tl.tags || [],
            type: tl.type || "work",
          }));
          setTimelineState(tList);
          localStorage.setItem("site_timeline", JSON.stringify(tList));
        }

        if (impactRes.status === "fulfilled" && impactRes.value.data) {
          const impData = impactRes.value.data;
          const formattedImpact = {
            metrics: impData.metrics || defaultImpact.metrics,
            testimonials: impData.testimonials || defaultImpact.testimonials,
          };
          setImpactState(formattedImpact);
          localStorage.setItem("site_impact", JSON.stringify(formattedImpact));
        }

        if (settingsRes.status === "fulfilled" && settingsRes.value.data?.sectionVisibility) {
          const vis = { ...defaultSectionVisibility, ...settingsRes.value.data.sectionVisibility };
          setSectionVisibilityState(vis);
          localStorage.setItem("site_section_visibility", JSON.stringify(vis));
        }
      } catch (err) {
        console.warn("Utilisation des données locales de secours (Backend hors ligne):", err);
      }
    }

    loadDataFromApi();

    return () => {
      isMounted = false;
    };
  }, []);

  const notifyUpdate = () => {
    window.dispatchEvent(new CustomEvent("site_data_updated"));
  };

  const updateProfile = async (newProfile) => {
    setProfileState(newProfile);
    localStorage.setItem("site_profile", JSON.stringify(newProfile));
    notifyUpdate();

    try {
      await api.post("/admin/profile", {
        name: newProfile.name,
        headline: newProfile.headline,
        bio: newProfile.bio,
        email: newProfile.email,
        location: newProfile.location,
        availability: newProfile.availability,
        github: newProfile.github,
        linkedin: newProfile.linkedin,
        photo: newProfile.photo,
        avatar: newProfile.avatar,
        cv_link: newProfile.cvLink,
        years_exp: newProfile.yearsExp,
        projects_count: newProfile.projectsCount,
        uptime_rate: newProfile.uptimeRate,
      });
    } catch (err) {
      console.warn("Erreur de sauvegarde profil API:", err);
    }
  };

  const updateStats = (newStats) => {
    setStatsState(newStats);
    localStorage.setItem("site_stats", JSON.stringify(newStats));
    notifyUpdate();
  };

  const updateServices = async (newServices) => {
    setServicesState(newServices);
    localStorage.setItem("site_services", JSON.stringify(newServices));
    notifyUpdate();

    try {
      await api.post("/admin/services/sync", { services: newServices });
    } catch (err) {
      console.warn("Erreur sync services API:", err);
    }
  };

  const updateSkills = async (newSkills) => {
    setSkillsState(newSkills);
    localStorage.setItem("site_skills", JSON.stringify(newSkills));
    notifyUpdate();

    try {
      await api.post("/admin/skills/sync", { skills: newSkills });
    } catch (err) {
      console.warn("Erreur sync skills API:", err);
    }
  };

  const updateTimeline = async (newTimeline) => {
    setTimelineState(newTimeline);
    localStorage.setItem("site_timeline", JSON.stringify(newTimeline));
    notifyUpdate();

    try {
      await api.post("/admin/timeline/sync", { timeline: newTimeline });
    } catch (err) {
      console.warn("Erreur sync timeline API:", err);
    }
  };

  const updateImpact = async (newImpact) => {
    setImpactState(newImpact);
    localStorage.setItem("site_impact", JSON.stringify(newImpact));
    notifyUpdate();

    try {
      await api.post("/admin/impact/sync", newImpact);
    } catch (err) {
      console.warn("Erreur sync impact API:", err);
    }
  };

  const updateSectionVisibility = async (newVisibility) => {
    setSectionVisibilityState(newVisibility);
    localStorage.setItem("site_section_visibility", JSON.stringify(newVisibility));
    notifyUpdate();

    try {
      await api.post("/admin/settings", { sectionVisibility: newVisibility });
    } catch (err) {
      console.warn("Erreur sync settings API:", err);
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        profile,
        updateProfile,
        stats,
        updateStats,
        services,
        updateServices,
        skills,
        updateSkills,
        timeline,
        updateTimeline,
        impact,
        updateImpact,
        sectionVisibility,
        updateSectionVisibility,
        isBackendConnected,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
