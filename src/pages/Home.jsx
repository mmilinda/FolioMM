import Hero from "../components/Hero";
import About from "../components/About";
import Stats from "../components/Stats";
import Services from "../components/Services";
import HomeProjects from "../components/HomeProjects";
import ImpactSection from "../components/ImpactSection";
import SEO from "../components/SEO";
import Timeline from "../components/Timeline";
import AnimatedSection from "../components/AnimatedSection";
import Booking from "../components/Booking";
import { useSiteData } from "../context/SiteDataContext";

export default function Home() {
  const { sectionVisibility } = useSiteData();

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://folio-mm.vercel.app/#website",
        "url": "https://folio-mm.vercel.app/",
        "name": "Milinda Mendy Portfolio",
        "description": "Portfolio professionnel de Milinda Mendy, développeuse Full Stack & DevOps.",
        "inLanguage": "fr-FR"
      },
      {
        "@type": "Person",
        "@id": "https://folio-mm.vercel.app/#author",
        "name": "Milinda Mendy",
        "jobTitle": "Développeuse Full Stack & DevOps",
        "url": "https://folio-mm.vercel.app/",
        "sameAs": [
          "https://github.com/mmilinda",
          "https://www.linkedin.com/in/milinda-mendy-5ba17928a/"
        ],
        "knowsAbout": [
          "React",
          "Laravel",
          "DevOps",
          "Docker",
          "Kubernetes",
          "CI/CD",
          "SaaS Architecture"
        ]
      }
    ]
  };

  return (
    <>
      <SEO
        title="Accueil | Milinda Mendy - Développeuse Full Stack & DevOps"
        description="Découvrez le portfolio professionnel de Milinda Mendy: projets SaaS, architecture DevOps, React, Laravel et solutions cloud."
        path="/"
        schemaData={homeSchema}
      />
      {sectionVisibility.hero !== false && <Hero />}
      {sectionVisibility.stats !== false && <Stats />}
      {sectionVisibility.about !== false && <About />}
      {sectionVisibility.services !== false && (
        <AnimatedSection>
          <Services />
        </AnimatedSection>
      )}
      {sectionVisibility.projects !== false && (
        <AnimatedSection>
          <HomeProjects />
        </AnimatedSection>
      )}
      {sectionVisibility.impact !== false && (
        <AnimatedSection>
          <ImpactSection />
        </AnimatedSection>
      )}
      {sectionVisibility.timeline !== false && <Timeline />}
      {sectionVisibility.booking !== false && <Booking />}
    </>
  );
}