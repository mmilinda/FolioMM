import React from 'react';

const translations = {
  fr: {
    title: 'Expérience & Parcours',
    subtitle: 'Mon Parcours Professionnel & Académique',
    experiences: [
      {
        role: "Développeuse d'applications & solutions numériques",
        company: 'SamCorporate',
        period: 'Janvier 2026 – Présent',
        desc: "Développement de solutions numériques d'entreprise, d'applications web & mobiles et de plateformes intelligentes sur-mesure (AgriChain AI, Garagebi Assistance, Noregis SaaS, SecurityApp, BerMas Assurance, Sunu Champion).",
        techs: ['React', 'JavaScript', 'Tailwind CSS', 'Laravel API', 'Full Stack'],
      },
      {
        role: 'Développeuse Full Stack & Web Mobile',
        company: 'Défarsci',
        period: '2024 – 2025',
        desc: "Développement d'applications web interactives pour l'insertion professionnelle (CV Vidéo) et la gestion immobilière (Location Appartement). Intégration d'API REST.",
        techs: ['Laravel', 'React', 'PHP', 'MySQL', 'JavaScript'],
      },
      {
        role: 'Stagiaire Développeuse Web',
        company: 'Défarsci',
        period: '2023',
        desc: "Conception et intégration de sites vitrines et plateformes CMS (Site Zawiya). Modélisation de bases de données relationnelles MySQL.",
        techs: ['WordPress', 'Laravel', 'PHP', 'MySQL', 'CMS'],
      },
      {
        role: 'Certification en Développement Web & Mobile',
        company: 'ISCA (en partenariat avec le 3FPT)',
        period: '2023',
        desc: "Formation certifiante et compétences pratiques en Développement Web & Mobile dispensée à l'ISCA en partenariat avec le 3FPT.",
        techs: ['Développement Web', 'Développement Mobile', 'Certification', '3FPT', 'ISCA'],
      },
      {
        role: 'Stagiaire Intégratrice Web',
        company: 'Bakeli & Webgram',
        period: '2022',
        desc: "Intégration web responsive et développement de blogs d'entreprise : Site Vitrine Bootstrap et GM Business Prayer (Blogger).",
        techs: ['Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript', 'Blogger'],
      },
      {
        role: 'Licence Professionnelle en Informatique de Gestion',
        company: "UCAO (Université Catholique de l'Afrique de l'Ouest)",
        period: '2019 – 2022',
        desc: "Formation supérieure spécialisée en génie logiciel, gestion de bases de données, développement web et projets académiques de formation (Guide Itinéraire avec jQuery Mobile & Google Maps API, et Voyage 2).",
        techs: ['Informatique de Gestion', 'Bases de Données', 'Génie Logiciel', "Systèmes d'Information"],
      },
    ],
  },
  en: {
    title: 'Experience & Background',
    subtitle: 'My Professional & Academic Journey',
    experiences: [
      {
        role: 'Application & Digital Solutions Developer',
        company: 'SamCorporate',
        period: 'Jan 2026 – Present',
        desc: 'Engineering & deploying enterprise digital solutions, web & mobile applications, and smart platforms: AgriChain AI, Garagebi Assistance, Noregis SaaS, SecurityApp, BerMas Assurance & Sunu Champion.',
        techs: ['React', 'JavaScript', 'Tailwind CSS', 'Laravel API', 'Full Stack'],
      },
      {
        role: 'Full Stack & Mobile Web Developer',
        company: 'Défarsci',
        period: '2024 – 2025',
        desc: 'Development of interactive web applications: CV Vidéo (video resumes for employment) and Location Appartement (real estate management system).',
        techs: ['Laravel', 'React', 'PHP', 'MySQL', 'JavaScript'],
      },
      {
        role: 'Web Developer Intern',
        company: 'Défarsci',
        period: '2023',
        desc: 'Design and integration of showcase websites and CMS portals (Site Zawiya). Relational database modeling with MySQL.',
        techs: ['WordPress', 'Laravel', 'PHP', 'MySQL', 'CMS'],
      },
      {
        role: 'Web & Mobile Development Certification',
        company: 'ISCA (in partnership with 3FPT)',
        period: '2023',
        desc: 'Professional Certification in Web & Mobile Development earned at ISCA in partnership with 3FPT.',
        techs: ['Web Development', 'Mobile Development', 'Certification', '3FPT', 'ISCA'],
      },
      {
        role: 'Web Integrator Intern',
        company: 'Bakeli & Webgram',
        period: '2022',
        desc: 'Hands-on responsive web integration and corporate blog customization: Bootstrap Showcase Site and GM Business Prayer (Blogger).',
        techs: ['Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript', 'Blogger'],
      },
      {
        role: "Bachelor's Degree in Business Information Systems",
        company: 'UCAO (Université Catholique de l\'Afrique de l\'Ouest)',
        period: '2019 – 2022',
        desc: 'Specialized higher education in software engineering, database administration, web development, and academic projects (Transit Itinerary Guide with jQuery Mobile/Google Maps API and Travel 2).',
        techs: ['Management Information Systems', 'Databases', 'Software Engineering'],
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
