import React, { useState } from 'react';

const TRANSLATIONS = {
  fr: {
    nav: { home: 'Accueil', skills: 'Expertise', projects: 'Projets', contact: 'Contact' },
    hero: {
      title: 'Maîtriser le {span} du Pixel à la Production.',
      span: 'Full Stack',
      desc: 'Je suis Milinda Mendy, Développeuse Senior faisant le pont entre le design front-end créatif et l\'infrastructure de systèmes évolutifs.',
      btnProjects: 'Voir les Projets',
      btnTalk: 'Parlons-en'
    },
    featured: { title: 'Projets Réalisés', seeAll: 'Voir tous les projets →' },
    skills: {
      title: 'Écosystème Technique',
      fullstack: { title: 'Modern Full-Stack', desc: 'Création d\'interfaces réactives et typées avec React & Next.js, et backends haute performance avec Node.js & Laravel.' },
      cloud: { title: 'Cloud Native', desc: 'Orchestration AWS, Kubernetes et Terraform IaC pour garantir un temps de fonctionnement de 99,9 % et un déploiement rapide.' }
    },
    projects: { title: 'Projets Sélectionnés', close: 'Fermer', visit: 'Visiter le site' },
    contact: {
      title: 'Construisons ensemble',
      formTitle: 'Envoyer un Message',
      labelName: 'Nom',
      labelEmail: 'Email',
      labelMsg: 'Message',
      placeholderName: 'John Doe',
      placeholderEmail: 'john@example.com',
      placeholderMsg: 'Parlez-moi de votre projet...',
      btnSend: 'Envoyer le Message',
      coords: 'Coordonnées',
      location: 'Localisation',
      locDesc: 'Disponible à distance'
    },
    footer: { copy: '© 2026 Milinda Mendy. Conçu pour la Performance.' }
  },
  en: {
    nav: { home: 'Home', skills: 'Expertise', projects: 'Projects', contact: 'Contact' },
    hero: {
      title: 'Mastering the {span} from Pixel to Production.',
      span: 'Full Stack',
      desc: 'I am Milinda Mendy, a Senior Developper bridging the gap between creative front-end design and scalable systems infrastructure.',
      btnProjects: 'View Projects',
      btnTalk: 'Let\'s Talk'
    },
    featured: { title: 'Featured Work', seeAll: 'See All Projects →' },
    skills: {
      title: 'Technical Ecosystem',
      fullstack: { title: 'Modern Full-Stack', desc: 'Building reactive, type-safe interfaces with React & Next.js, and high-throughput backends with Node.js & Go.' },
      cloud: { title: 'Cloud Native', desc: 'Orchestrating AWS, Kubernetes, and Terraform IaC to ensure 99.9% uptime and rapid deployment.' }
    },
    projects: { title: 'Selected Projects', close: 'Close', visit: 'Visit site' },
    contact: {
      title: 'Let\'s Build Together',
      formTitle: 'Send a Message',
      labelName: 'Name',
      labelEmail: 'Email',
      labelMsg: 'Message',
      placeholderName: 'John Doe',
      placeholderEmail: 'john@example.com',
      placeholderMsg: 'Tell me about your project...',
      btnSend: 'Send Message',
      coords: 'Coordinates',
      location: 'Location',
      locDesc: 'Remote Worldwide'
    },
    footer: { copy: '© 2026 Milinda Mendy. Crafted with Performance.' }
  }
};

const PROJECTS = [
    {
    id: 12,
    title: { fr: 'Garabi Assistance', en: 'Autonomous Drone Fleet' },
    desc: { fr: 'Ceci est une application d\'assistance des conducteurs, elle les permets de trouver les garages aux alentours de leur position pour demander une assistance.', en: 'Control system for autonomous delivery drones.' },
    tech: ['React', 'Node', 'API'],
    img: 'GarageB.png',
    url: 'https://garage-b.vercel.app/'
  },
  {
    id: 11,
    title: { fr: 'AgriChain AI', en: 'AgriChain AI' },
    desc: { fr: 'Ceci est une plateforme d\'échange et d\'intéraction dans le domaine de l\'agriculture mélant modernité et efficacité avec IA inclu et le Blockchain.', en: 'High-speed payment processing engine.' },
    tech: ['React', 'Firebase', 'API'],
    img: 'AgriChain.PNG',
    url: 'https://agri-tech-puce.vercel.app/'
  },
  {
    id: 10,
    title: { fr: 'Sunu Champion', en: 'Smart City Traffic Controller' },
    desc: { fr: 'C\'est une plateforme de l\'Etat du Sénégal permettant le dépôt et les financements de projets.', en: 'IoT-based system for optimizing traffic flow.' },
    tech: ['React', 'Firebase'],
    img: 'sunuchampion.PNG',
    url: 'https://sunuchampion.vercel.app/'
  },
  {
    id: 9,
    title: { fr: 'Plateforme SaaS Entreprise', en: 'Enterprise SaaS Platform' },
    desc: { fr: 'Une solution complète permettant le scan et l\'analyses des documents d\'identifications en temps réel.', en: 'A comprehensive B2B solution featuring real-time analytics.' },
    tech: ['React', 'Node.js', 'Firebase', 'API'],
    img: "noregiss.PNG",
    url: 'https://noregis.vercel.app/'
  },
  {
    id: 8,
    title: { fr: 'Solution de Scan d\'identité amélioré', en: 'SyncCloud Workspace' },
    desc: { fr: 'Solution de scan amélioré permettant la gestion d\'entreprise par l\'identification.', en: 'Full-stack collaborative editor using WebSockets.' },
    tech: ['Node.js', 'React', 'Firebase', 'API'],
    img: "afriaccess.PNG",
    url: 'https://afriaccess.vercel.app/'
  },
  {
    id: 7,
    title: { fr: 'Plateforme de sécurité', en: 'AI Infrastructure Monitor' },
    desc: { fr: 'Plateforme de gestion des agents de sécurité.', en: 'Real-time dashboard for monitoring GPU clusters.' },
    tech: ['React', 'Node.js', 'Firebase', 'API'],
    img: "Security.PNG",
    url: 'https://security-app-mauve.vercel.app/'
  },
  {
    id: 6,
    title: { fr: 'Site web de Zawiya', en: 'E-commerce Microservices' },
    desc: { fr: 'Site web pour un groupe religieux (Daara) basé en France.', en: 'Scalable e-commerce backend built with microservices.' },
    tech: ['CMS WordPress'],
    img: "zawiya.PNG",
    url: 'https://www.zawiya.defarsci.fr/'
  },
  {
    id: 5,
    title: { fr: 'Site d\'assurance', en: 'Blockchain Supply Chain' },
    desc: { fr: 'Site d\'assurance pour une entreprise du nom de Bermas', en: 'Transparent supply chain tracking using Ethereum.' },
    tech: ['PHP'],
    img: "Berma.PNG",
    url: 'https://bermasss.com/'
  },
      {
    id: 4,
    title: { fr: 'CV vidéo', en: 'Autonomous Drone Fleet' },
    desc: { fr: 'Système de création des CV vidéos.', en: 'Control system for autonomous delivery drones.' },
    tech: ['React', 'Laravel'],
    img: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80',
    url: '#'
  },
  {
    id: 3,
    title: { fr: 'Site de location d\'appartement', en: 'Autonomous Drone Fleet' },
    desc: { fr: 'Site de location d\'appartement, un projet de fin de module .', en: 'Control system for autonomous delivery drones.' },
    tech: ['Laravel', 'HTML', 'CSS', 'JavaScript'],
    img: 'LAppartement.PNG',
    url: '#'
  },
  {
    id: 2,
    title: { fr: 'Guide itinéraire', en: 'Cybersecurity Threat Hunter' },
    desc: { fr: 'Projet d\'étude permettant de guider les passagés lors de leur déplacement avec les itinéraires des bus de transport en commun.', en: 'Automated tool for scanning vulnerabilities.' },
    tech: ['Jquery'],
    img: "JqueryProject.PNG",
    url: 'https://jquerry-bus.vercel.app/'
  },
  {
    id: 1,
    title: { fr: 'Site vitrine', en: 'HealthTech Patient Portal' },
    desc: { fr: 'Projet de formation.', en: 'Secure portal for patient data management.' },
    tech: ['Boostrap'],
    img: "BoostrapSite.PNG",
    url: 'https://site-bootstrap-six.vercel.app/'
  }
];

const SKILLS_LIST = [
  { name: 'JavaScript', logo: 'JS' },
  // { name: 'TypeScript', logo: 'TS' },
  // { name: 'Python', logo: 'PY' },
  // { name: 'Go', logo: 'GO' },
  // { name: 'Rust', logo: 'RS' },
  { name: 'Java', logo: 'JV' },
  { name: 'Node.js', logo: 'NODE' },
  { name: 'React', logo: 'RCT' },
  { name: 'Laravel', logo: 'LRVL'},
  { name: 'HTML', logo: 'HTML'},
  { name: 'CSS', logo: 'CSS'},
  { name: 'CMS', logo: 'CMS'},
  // { name: 'Docker', logo: 'DK' },
  // { name: 'Kubernetes', logo: 'K8S' },
  // { name: 'AWS', logo: 'AWS' },
  // { name: 'Terraform', logo: 'TF' }
];

const Navbar = ({ activeSection, setActiveSection, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'skills', label: t.skills },
    { id: 'projects', label: t.projects },
    { id: 'contact', label: t.contact }
  ];

  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000, padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div 
          onClick={() => setActiveSection('home')}
          style={{
            fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', fontFamily: 'var(--font-mono)', cursor: 'pointer'
          }}
        >
          MILINDA_MENDY
        </div>

        {/* Desktop Menu */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                color: activeSection === item.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: activeSection === item.id ? '600' : '400',
                fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            style={{ 
              background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary-color)', border: '1px solid var(--primary-color)',
              padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem'
            }}
          >
            {lang.toUpperCase()}
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="mobile-hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          <div style={{ width: '25px', height: '3px', background: 'var(--text-primary)', transition: '0.3s', transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
          <div style={{ width: '25px', height: '3px', background: 'var(--text-primary)', opacity: isMenuOpen ? 0 : 1 }}></div>
          <div style={{ width: '25px', height: '3px', background: 'var(--text-primary)', transition: '0.3s', transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none' }}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} style={{
        position: 'absolute', top: '100%', left: 0, width: '100%', background: 'var(--bg-color)', 
        borderBottom: '1px solid var(--surface-border)', overflow: 'hidden', transition: 'max-height 0.3s ease-in-out',
        maxHeight: isMenuOpen ? '400px' : '0'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 2rem', gap: '1.5rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setIsMenuOpen(false); }}
              style={{
                color: activeSection === item.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                fontWeight: activeSection === item.id ? '600' : '400',
                fontSize: '1rem', textTransform: 'uppercase', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            style={{ 
              background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary-color)', border: '1px solid var(--primary-color)',
              padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content'
            }}
          >
            {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang].hero;
  return (
    <section className="container animate-fade" style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
    }}>
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{
          width: '(550px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--primary-color)',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)', margin: '0 auto'
        }}>
          <img src="public/MM.PNG" alt="Milinda Mendy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', maxWidth: '800px' }}>
        {t.title.split('{span}')[0]}<span style={{ color: 'var(--primary-color)' }}>{t.span}</span>{t.title.split('{span}')[1]}
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem' }}>
        {t.desc}
      </p>
      <div style={{ display: 'flex', gap: '1.5rem' }} className="hero-buttons">
        <button 
          onClick={() => onNavigate('projects')}
          className="glass glow-hover" 
          style={{
            padding: '1rem 2rem', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', borderRadius: '4px',
            background: 'rgba(56, 189, 248, 0.05)', cursor: 'pointer'
          }}
        >
          {t.btnProjects}
        </button>
        <button 
          onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}
          style={{ color: 'var(--text-primary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {t.btnTalk}
        </button>
      </div>
    </section>
  );
};

const FeaturedProjects = ({ onNavigate, lang, onProjectClick }) => {
  const t = TRANSLATIONS[lang].featured;
  return (
    <section className="container animate-fade" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>{t.title}</h2>
        <button 
          onClick={() => onNavigate('projects')}
          style={{ color: 'var(--primary-color)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {t.seeAll}
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {PROJECTS.slice(0, 3).map(project => (
          <ProjectCard key={project.id} project={project} lang={lang} onClick={() => onProjectClick(project)} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, lang, onClick }) => (
  <div 
    className="glass glow-hover" 
    onClick={onClick}
    style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
  >
    <div style={{ height: '200px', background: 'var(--surface-color)', position: 'relative' }}>
      <img src={project.img} alt={project.title[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
    </div>
    <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '0.8rem', fontSize: '1.25rem' }}>{project.title[lang]}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
        {project.desc[lang]}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {project.tech.map(tech => (
          <span key={tech} style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary-color)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ProjectModal = ({ project, lang, onClose }) => {
  if (!project) return null;
  const t = TRANSLATIONS[lang].projects;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000,
      background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }} onClick={onClose}>
      <div className="glass animate-fade" style={{
        maxWidth: '800px', width: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
        >
          ✕
        </button>
        <div style={{ height: '300px', position: 'relative' }}>
          <img src={project.img} alt={project.title[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{project.title[lang]}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {project.desc[lang]}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {project.tech.map(tech => (
              <span key={tech} style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                {tech}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="glass glow-hover" style={{
              padding: '1rem 2.5rem', background: 'var(--primary-color)', color: 'var(--bg-color)', fontWeight: 'bold', borderRadius: '4px'
            }}>
              {t.visit}
            </a>
            <button onClick={onClose} style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = ({ lang, id }) => {
  const t = TRANSLATIONS[lang].skills;
  return (
    <section id={id} className="container animate-fade" style={{ minHeight: '80vh', padding: '4rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>{t.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', justifyContent: 'center' }}>
        {SKILLS_LIST.map(skill => (
          <div key={skill.name} className="glass" style={{ 
            padding: '1.5rem', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ 
              width: '50px', height: '50px', background: 'var(--primary-color)', color: 'var(--bg-color)', 
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem'
            }}>
              {skill.logo}
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{skill.name}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t.fullstack.title}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {t.fullstack.desc}
          </p>
        </div>
        <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t.cloud.title}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {t.cloud.desc}
          </p>
        </div>
      </div>
    </section>
  );
};

const Projects = ({ lang, onProjectClick }) => {
  const t = TRANSLATIONS[lang].projects;
  return (
    <section className="container animate-fade" style={{ padding: '4rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>{t.title} ({PROJECTS.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} lang={lang} onClick={() => onProjectClick(project)} />
        ))}
      </div>
    </section>
  );
};

const Contact = ({ lang, id }) => {
  const t = TRANSLATIONS[lang].contact;
  return (
    <section id={id} className="container animate-fade" style={{ padding: '4rem 0' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>{t.title}</h2>
      
      <div className="contact-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left: Contact Form */}
        <div className="glass" style={{ padding: '2.5rem', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>{t.formTitle}</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.labelName}</label>
              <input type="text" placeholder={t.placeholderName} style={{ 
                padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', 
                borderRadius: '4px', color: 'var(--text-primary)', outline: 'none'
              }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.labelEmail}</label>
              <input type="email" placeholder={t.placeholderEmail} style={{ 
                padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', 
                borderRadius: '4px', color: 'var(--text-primary)', outline: 'none'
              }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.labelMsg}</label>
              <textarea rows="5" placeholder={t.placeholderMsg} style={{ 
                padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', 
                borderRadius: '4px', color: 'var(--text-primary)', outline: 'none', resize: 'none'
              }}></textarea>
            </div>
            <button className="glass glow-hover" style={{ 
              padding: '1rem', background: 'var(--primary-color)', color: 'var(--bg-color)', 
              fontWeight: 'bold', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '1rem'
            }}>
              {t.btnSend}
            </button>
          </form>
        </div>

        {/* Right: Coordinates & Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{t.coords}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Email</div>
                <div style={{ fontWeight: '500' }}>mmilinda00@gmail.com</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{lang === 'fr' ? 'Téléphone' : 'Phone'}</div>
                <div style={{ fontWeight: '500' }}>+221 77 375 46 72</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>LinkedIn</div>
                <div style={{ fontWeight: '500' }}>linkedin.com/in/milindamendy</div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', height: '300px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{t.location}</h3>
            <div style={{ 
              flexGrow: 1, background: 'var(--surface-color)', borderRadius: '8px', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--surface-border)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
                <div style={{ fontWeight: 'bold' }}>Sénégal, Dakar</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.locDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => {
  const t = TRANSLATIONS[lang].footer;
  return (
    <footer className="container" style={{ padding: '4rem 0', borderTop: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap', gap: '2rem' }}>
      <div>{t.copy}</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <a href="https://github.com/mmilinda" style={{ color: 'inherit' }}>GitHub</a>
        <a href="https://www.linkedin.com/in/milinda-mendy-5ba17928a/" style={{ color: 'inherit' }}>LinkedIn</a>
        <a href="#" style={{ color: 'inherit' }}>Twitter</a>
      </div>
    </footer>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [lang, setLang] = useState('fr');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} lang={lang} setLang={setLang} />
      <main style={{ paddingTop: '80px' }}>
        {activeSection === 'home' && (
          <>
            <Hero onNavigate={setActiveSection} lang={lang} />
            <Skills lang={lang} id="expertise-section" />
            <FeaturedProjects onNavigate={setActiveSection} lang={lang} onProjectClick={handleProjectClick} />
            <Contact lang={lang} id="contact-section" />
          </>
        )}
        {activeSection === 'skills' && <Skills lang={lang} />}
        {activeSection === 'projects' && <Projects lang={lang} onProjectClick={handleProjectClick} />}
        {activeSection === 'contact' && <Contact lang={lang} />}
      </main>
      <Footer lang={lang} />
      
      {selectedProject && (
        <ProjectModal project={selectedProject} lang={lang} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
