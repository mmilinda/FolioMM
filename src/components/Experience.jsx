import React from 'react';

const translations = {
  fr: {
    title: 'Expérience',
    subtitle: 'Mon Parcours Professionnel',
    experiences: [
      {
        role: 'Développeuse Full Stack & DevOps',
        company: 'Freelance / Indépendante',
        period: '2025 – Présent',
        desc: "Conception et déploiement d'applications SaaS & IA (AgriChain AI, Noregis SaaS, Garagebi Assistance, SecurityApp). Automatisation CI/CD et déploiements Docker/Kubernetes.",
        techs: ['React', 'Laravel', 'Docker', 'Kubernetes', 'CI/CD', 'TypeScript'],
      },
      {
        role: 'Développeuse Full Stack & Web Mobile',
        company: 'Défarsci',
        period: '2024 – 2025',
        desc: "Développement de plateformes d'insertion professionnelle (CV Vidéo) et de gestion immobilière (Location Appartement). Intégration d'API REST et WebRTC.",
        techs: ['Laravel', 'React', 'PHP', 'MySQL', 'WebRTC'],
      },
      {
        role: 'Stagiaire Développeuse Web',
        company: 'Défarsci',
        period: '2023',
        desc: "Conception et intégration de sites vitrines et plateformes CMS (Site Zawiya). Modélisation de bases de données et intégration d'interfaces web.",
        techs: ['Laravel', 'PHP', 'WordPress', 'Bootstrap', 'MySQL'],
      },
      {
        role: 'Stagiaire Intégratrice Web',
        company: 'Bakeli & Webgram',
        period: '2022',
        desc: "Apprentissage pratique de l'intégration web responsive avec Bootstrap 5 et jQuery. Personnalisation de blogs d'entreprise.",
        techs: ['Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript', 'jQuery'],
      },
    ],
  },
  en: {
    title: 'Experience',
    subtitle: 'My Professional Journey',
    experiences: [
      {
        role: 'Full Stack & DevOps Engineer',
        company: 'Freelance / Independent',
        period: '2025 – Present',
        desc: "Design and deployment of SaaS & AI platforms (AgriChain AI, Noregis SaaS, Garagebi Assistance, SecurityApp). CI/CD automation and Docker/Kubernetes deployments.",
        techs: ['React', 'Laravel', 'Docker', 'Kubernetes', 'CI/CD', 'TypeScript'],
      },
      {
        role: 'Full Stack & Web Mobile Developer',
        company: 'Défarsci',
        period: '2024 – 2025',
        desc: "Development of platforms for professional placement (CV Vidéo) and real estate management (Location Appartement). Integration of REST & WebRTC APIs.",
        techs: ['Laravel', 'React', 'PHP', 'MySQL', 'WebRTC'],
      },
      {
        role: 'Web Developer Intern',
        company: 'Défarsci',
        period: '2023',
        desc: "Design and integration of showcase websites and CMS platforms (Site Zawiya). Relational database modeling and adaptive UI design.",
        techs: ['Laravel', 'PHP', 'WordPress', 'Bootstrap', 'MySQL'],
      },
      {
        role: 'Web Integrator Intern',
        company: 'Bakeli & Webgram',
        period: '2022',
        desc: "Hands-on learning of responsive web integration with Bootstrap 5 and jQuery. Customization and management of corporate blogs.",
        techs: ['Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript', 'jQuery'],
      },
    ],
  },
};

const Experience = ({ lang = 'fr' }) => {
  const t = translations[lang] || translations.fr;

  return (
    <section className="container animate-fade" style={{ padding: '5rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>{t.title}</h2>
      <p style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem' }}>
        {t.subtitle}
      </p>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: '20px', top: 0, bottom: 0,
          width: '2px', background: 'linear-gradient(to bottom, var(--primary-color), transparent)',
        }} />

        {t.experiences.map((exp, i) => (
          <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', position: 'relative' }}>
            {/* Dot */}
            <div style={{
              width: '42px', height: '42px', minWidth: '42px', borderRadius: '50%',
              background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', color: 'var(--bg-color)', fontSize: '0.9rem', zIndex: 1,
            }}>
              {i + 1}
            </div>

            {/* Card */}
            <div className="glass" style={{ padding: '1.8rem', borderRadius: '16px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{exp.role}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', background: 'rgba(56,189,248,0.1)', padding: '0.2rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(56,189,248,0.3)' }}>
                  {exp.period}
                </span>
              </div>
              <div style={{ color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '1rem', opacity: 0.8 }}>
                {exp.company}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', lineHeight: '1.7' }}>
                {exp.desc}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {exp.techs.map(tech => (
                  <span key={tech} style={{
                    fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary-color)',
                    padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.2)',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
