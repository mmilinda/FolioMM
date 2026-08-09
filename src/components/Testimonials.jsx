import React, { useState } from 'react';

const translations = {
  fr: {
    title: 'Témoignages',
    subtitle: 'Ce que disent mes clients',
    testimonials: [
      {
        name: 'Amadou Diallo',
        role: 'CEO, AgriChain SN',
        text: "Milinda a livré une plateforme exceptionnelle intégrant IA et Blockchain. Son sens du détail et sa réactivité sont remarquables. Je recommande vivement.",
        avatar: 'AD',
      },
      {
        name: 'Fatou Ndiaye',
        role: 'Directrice, Garagebi Assistance',
        text: "Travail impeccable ! L'application répond parfaitement à nos besoins. Milinda a su comprendre nos exigences et les transformer en une solution robuste.",
        avatar: 'FN',
      },
      {
        name: 'Moussa Sarr',
        role: 'Fondateur, Sunu Champion',
        text: "Une professionnelle accomplie. Elle a su respecter les délais tout en livrant une qualité de code irréprochable. La collaboration a été très agréable.",
        avatar: 'MS',
      },
    ],
  },
  en: {
    title: 'Testimonials',
    subtitle: 'What my clients say',
    testimonials: [
      {
        name: 'Amadou Diallo',
        role: 'CEO, AgriChain SN',
        text: "Milinda delivered an exceptional platform integrating AI and Blockchain. Her attention to detail and responsiveness are remarkable. Highly recommended.",
        avatar: 'AD',
      },
      {
        name: 'Fatou Ndiaye',
        role: 'Director, Garagebi Assistance',
        text: "Impeccable work! The application perfectly meets our needs. Milinda understood our requirements and transformed them into a robust solution.",
        avatar: 'FN',
      },
      {
        name: 'Moussa Sarr',
        role: 'Founder, Sunu Champion',
        text: "A true professional. She met all deadlines while delivering flawless code quality. The collaboration was very pleasant.",
        avatar: 'MS',
      },
    ],
  },
};

const StarRating = () => (
  <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
    ))}
  </div>
);

const Testimonials = ({ lang }) => {
  const t = translations[lang];
  const [active, setActive] = useState(0);

  return (
    <section className="container animate-fade" style={{ padding: '5rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>{t.title}</h2>
      <p style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem' }}>
        {t.subtitle}
      </p>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Active testimonial */}
        <div className="glass animate-fade" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '2rem', textAlign: 'center' }}>
          <StarRating />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', fontStyle: 'italic' }}>
            "{t.testimonials[active].text}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', color: 'var(--bg-color)', fontSize: '0.9rem',
            }}>
              {t.testimonials[active].avatar}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 'bold' }}>{t.testimonials[active].name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t.testimonials[active].role}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
          {t.testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '24px' : '10px', height: '10px',
                borderRadius: '5px', border: 'none', cursor: 'pointer',
                background: i === active ? 'var(--primary-color)' : 'var(--surface-border)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
