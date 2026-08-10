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

  return (
    <>
      <SEO
        title="Accueil | Milinda Mendy - Développeuse Full Stack & DevOps"
        description="Découvrez le portfolio professionnel de Milinda Mendy: projets SaaS, architecture DevOps, React, Laravel et solutions cloud."
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