import React from 'react';

const translations = {
  fr: {
    title: 'Maîtriser le {span} du Pixel à la Production.',
    span: 'Full Stack',
    desc: "Je suis Milinda Mendy, Développeuse faisant le pont entre le design front-end créatif et l'infrastructure de systèmes évolutifs.",
    btnProjects: 'Voir les Projets',
    btnTalk: 'Parlons-en',
  },
  en: {
    title: 'Mastering the {span} from Pixel to Production.',
    span: 'Full Stack',
    desc: "I am Milinda Mendy, a Developer bridging the gap between creative front-end design and scalable systems infrastructure.",
    btnProjects: 'View Projects',
    btnTalk: "Let's Talk",
  },
};

const Hero = ({ onNavigate, lang }) => {
  const t = translations[lang];

  return (
    <section
      className="container animate-fade"
      style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
    >
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{
          width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden',
          border: '4px solid var(--primary-color)', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)', margin: '0 auto',
        }}>
          <img src="public/MM.PNG" alt="Milinda Mendy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', maxWidth: '800px' }}>
        {t.title.split('{span}')[0]}
        <span style={{ color: 'var(--primary-color)' }}>{t.span}</span>
        {t.title.split('{span}')[1]}
      </h1>

      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem' }}>
        {t.desc}
      </p>

      <div style={{ display: 'flex', gap: '1.5rem' }} className="hero-buttons">
        <button
          onClick={() => onNavigate('projects')}
          className="glass glow-hover"
          style={{
            padding: '1rem 2rem', color: 'var(--primary-color)', border: '1px solid var(--primary-color)',
            borderRadius: '4px', background: 'rgba(56, 189, 248, 0.05)', cursor: 'pointer',
          }}
        >
          {t.btnProjects}
        </button>
        <button
          onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ color: 'var(--text-primary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {t.btnTalk}
        </button>
      </div>
    </section>
  );
};

export default Hero;
