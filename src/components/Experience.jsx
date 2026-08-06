import React from 'react';

const translations = {
  fr: {
    title: 'Expérience',
    subtitle: 'Mon Parcours Professionnel',
    experiences: [
      {
        role: 'Développeuse Full Stack Junior',
        company: 'Freelance / Indépendante',
        period: '2023 – Présent',
        desc: "Conception et développement d'applications web complètes pour divers clients. Spécialisation dans les solutions React, Node.js et les intégrations d'API.",
        techs: ['React', 'Node.js', 'Firebase', 'Laravel'],
      },
      {
        role: 'Développeuse Web',
        company: 'Formation & Projets Personnels',
        period: '2022 – 2023',
        desc: "Développement de projets académiques et personnels. Acquisition de compétences en développement Full Stack, bases de données et déploiement.",
        techs: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      },
    ],
  },
  en: {
    title: 'Experience',
    subtitle: 'My Professional Journey',
    experiences: [
      {
        role: 'Junior Full Stack Developer',
        company: 'Freelance / Independent',
        period: '2022 – Present',
        desc: "Design and development of complete web applications for various clients. Specialization in React, Node.js solutions and API integrations.",
        techs: ['React', 'Node.js', 'Firebase', 'Laravel'],
      },
      {
        role: 'Web Developer',
        company: 'Training & Personal Projects',
        period: '2021 – 2022',
        desc: "Development of academic and personal projects. Acquisition of skills in Full Stack development, databases and deployment.",
        techs: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      },
    ],
  },
};

const Experience = ({ lang }) => {
  const t = translations[lang];

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
