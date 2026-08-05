import React from 'react';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects';

const translations = {
  fr: { title: 'Projets Sélectionnés' },
  en: { title: 'Selected Projects' },
};

const Projects = ({ lang, onProjectClick }) => {
  const t = translations[lang];

  return (
    <section className="container animate-fade" style={{ padding: '4rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>
        {t.title} ({PROJECTS.length})
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {PROJECTS.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
