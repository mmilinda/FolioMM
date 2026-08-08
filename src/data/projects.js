import agriChainImg from "../assets/projects/AgriChain.PNG";
import securityImg from "../assets/projects/Security.PNG";
import garageBImg from "../assets/projects/GarageB.PNG";
import noregisImg from "../assets/projects/noregis.PNG";
import bermaImg from "../assets/projects/Berma.PNG";
import sunuChampionImg from "../assets/projects/sunuchampion.PNG";
import afriAccessImg from "../assets/projects/afriaccess.PNG";
import appartementImg from "../assets/projects/LAppartement.PNG";
import zawiyaImg from "../assets/projects/zawiya.PNG";
import bootstrapSiteImg from "../assets/projects/BoostrapSite.PNG";
import jqueryProjectImg from "../assets/projects/JqueryProject.PNG";
import voyage2Img from "../assets/projects/voyage2.PNG";
import blogImg from "../assets/projects/blog.PNG";
import previewImg from "../assets/projects/preview.png";

const projects = [
  {
    id: 1,
    slug: "agri-chain-ai",
    title: "AgriChain AI",
    featured: true,
    year: "2026",
    status: "Prototype",
    client: "Projet personnel",
    category: "AI • Agriculture • Blockchain",
    image: agriChainImg,
    fallbackImage: previewImg,
    description:
      "Plateforme intelligente dédiée au secteur agricole combinant intelligence artificielle, données agricoles et technologies blockchain afin d'améliorer la prise de décision des producteurs.",
    problem:
      "Les producteurs rencontrent des difficultés pour accéder rapidement aux informations agricoles fiables.",
    solution:
      "Une solution digitale utilisant l'IA pour analyser les données agricoles et accompagner les acteurs du secteur.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "AI / Python"],
    impact: "Innovation digitale agricole orientée Afrique.",
    demo: "https://agri-tech-puce.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 2,
    slug: "security-app",
    title: "SecurityApp",
    featured: true,
    year: "2026",
    status: "Prototype",
    client: "Projet personnel",
    category: "SaaS • Security • Management",
    image: securityImg,
    fallbackImage: previewImg,
    description:
      "Plateforme SaaS permettant aux entreprises de sécurité de gérer leurs agents, missions, rendez-vous et interventions.",
    problem:
      "Les sociétés de sécurité utilisent souvent des outils dispersés pour suivre leurs opérations.",
    solution:
      "Une application centralisée avec dashboards, localisation et gestion opérationnelle.",
    technologies: ["React", "Laravel API", "Tailwind CSS", "Leaflet JS"],
    impact: "Digitalisation des opérations des entreprises de sécurité.",
    demo: "https://security-app-mauve.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 3,
    slug: "garabi-assistance",
    title: "Garabi Assistance",
    featured: true,
    year: "2026",
    status: "Production",
    client: "Projet professionnel",
    category: "Automobile • Service Digital",
    image: garageBImg,
    fallbackImage: previewImg,
    description:
      "Plateforme digitale facilitant la mise en relation entre automobilistes et services automobiles.",
    problem:
      "Les utilisateurs rencontrent des difficultés pour trouver rapidement un service automobile fiable.",
    solution:
      "Une plateforme permettant de présenter les services et faciliter les demandes d'assistance.",
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    impact: "Amélioration de l'expérience utilisateur automobile.",
    demo: "https://garage-b.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 4,
    slug: "noregis-saas",
    title: "Noregis SaaS",
    featured: true,
    year: "2026",
    status: "Prototype",
    category: "SaaS",
    image: noregisImg,
    fallbackImage: previewImg,
    description:
      "Application SaaS destinée à simplifier la gestion digitale des entreprises.",
    technologies: ["React", "Vite", "Tailwind CSS"],
    impact: "Automatisation des processus métiers.",
    demo: "https://noregis.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 5,
    slug: "bermas-assurance",
    title: "BerMas Assurance",
    featured: false,
    year: "2026",
    status: "Production",
    client: "BerMas",
    category: "Assurance • Business",
    image: bermaImg,
    fallbackImage: previewImg,
    description:
      "Site professionnel présentant les services d'une structure d'assurance.",
    technologies: ["Laravel", "PHP", "Tailwind CSS", "MySQL"],
    impact: "Renforcement de la présence digitale de l'entreprise.",
    demo: "https://bermasss.com/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 6,
    slug: "sunu-champion",
    title: "Sunu Champion",
    featured: false,
    year: "2026",
    status: "Production",
    category: "Web Platform",
    image: sunuChampionImg,
    fallbackImage: previewImg,
    description:
      "Plateforme web moderne proposant une expérience utilisateur optimisée.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    impact: "Création d'une interface web moderne.",
    demo: "https://sunuchampion.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 7,
    slug: "afriaccess",
    title: "AfriAccess",
    featured: false,
    year: "2026",
    status: "Prototype",
    category: "Identity • Digital Solution",
    image: afriAccessImg,
    fallbackImage: previewImg,
    description:
      "Solution numérique destinée à améliorer les processus de gestion d'identité.",
    technologies: ["React", "Tailwind CSS", "REST API"],
    impact: "Optimisation des processus d'identification digitale.",
    demo: "https://afriaccess.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 8,
    slug: "cv-video",
    title: "CV Vidéo",
    featured: false,
    year: "2024",
    status: "Stage Défarsci",
    category: "EdTech • Personal Branding",
    image: previewImg,
    fallbackImage: previewImg,
    description:
      "Projet développé à Défarsci lors de mon parcours de stagiaire pour permettre aux étudiants d'enregistrer des CV vidéo interactifs.",
    technologies: ["HTML5", "CSS3", "JavaScript", "WebRTC / Media API"],
    impact: "Plateforme de création de CV vidéo pour faciliter l'insertion professionnelle des étudiants.",
    demo: "#",
    github: "https://github.com/mmilinda"
  },
  {
    id: 9,
    slug: "location-appartement",
    title: "Location Appartement",
    featured: false,
    year: "2023",
    status: "Stage Défarsci",
    category: "Real Estate • Laravel",
    image: appartementImg,
    fallbackImage: previewImg,
    description:
      "Projet d'initiation au développement web avec le framework Laravel réalisé lors de mon stage pour la gestion et présentation d'annonces immobilières.",
    technologies: ["Laravel", "PHP", "Blade", "Bootstrap", "MySQL"],
    impact: "Initiation pratique à l'architecture Laravel et digitalisation d'annonces immobilières.",
    demo: "#",
    github: "https://github.com/mmilinda"
  },
  {
    id: 10,
    slug: "zawiya",
    title: "Site Zawiya",
    featured: false,
    year: "2023",
    status: "Production",
    category: "Web Design • CMS",
    image: zawiyaImg,
    fallbackImage: previewImg,
    description:
      "Site vitrine moderne conçu avec le CMS WordPress présentant une organisation et ses activités.",
    technologies: ["WordPress", "PHP", "CSS3", "CMS", "SEO"],
    impact: "Amélioration de la communication digitale et gestion de contenu via WordPress.",
    demo: "https://www.zawiya.defarsci.fr/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 11,
    slug: "site-vitrine-bootstrap",
    title: "Site Vitrine Bootstrap",
    featured: false,
    year: "2022",
    status: "Stage Bakeli",
    category: "Web Design",
    image: bootstrapSiteImg,
    fallbackImage: previewImg,
    description:
      "Site vitrine responsive développé lors de mon stage à Bakeli pour apprendre et maîtriser l'intégration web avec le framework Bootstrap.",
    technologies: ["Bootstrap 5", "Bootstrap Icons", "HTML5", "CSS3"],
    impact: "Apprentissage approfondi de l'intégration responsive avec Bootstrap.",
    demo: "https://site-bootstrap-six.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 12,
    slug: "guide-itineraire",
    title: "Guide Itinéraire",
    featured: false,
    year: "2022",
    status: "Prototype",
    category: "Transport • Web App",
    image: jqueryProjectImg,
    fallbackImage: previewImg,
    description:
      "Application permettant de rechercher des itinéraires et informations de transport.",
    technologies: ["jQuery Mobile", "JavaScript", "HTML5", "CSS3", "Google Maps API"],
    impact: "Facilitation de l'accès aux informations de déplacement.",
    demo: "https://jquerry-bus.vercel.app/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 13,
    slug: "gm-business-prayer-blogger",
    title: "GM Business Prayer — Blog Blogger",
    featured: false,
    year: "2022",
    status: "Stage Webgram",
    category: "Blogging • Web Design",
    image: blogImg,
    fallbackImage: previewImg,
    description:
      "Blog personnalisé sur la plateforme Blogger réalisé lors de mon stage chez Webgram pour apprendre l'intégration web et la gestion de contenu.",
    technologies: ["Blogger Engine", "HTML5", "CSS3", "CMS"],
    impact: "Initiation pratique à l'intégration web et à la structuration de contenu en entreprise.",
    demo: "https://gmbusinessprayer.blogspot.com/",
    github: "https://github.com/mmilinda"
  },
  {
    id: 14,
    slug: "site-statique-voyage-2",
    title: "Voyage 2 — Site Statique",
    featured: false,
    year: "2021",
    status: "Projet de Groupe",
    category: "Web Design",
    image: voyage2Img,
    fallbackImage: previewImg,
    description:
      "Site web statique de présentation touristique et de voyage réalisé en projet de groupe en 2021.",
    technologies: ["HTML5", "CSS3", "JavaScript", "FontAwesome"],
    impact: "Projet collaboratif de conception et d'intégration web.",
    demo: "https://voyage2-seven.vercel.app/",
    github: "https://github.com/mmilinda"
  }
];

export { projects as PROJECTS };
export default projects;