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

export default function Home() {
  return (
    <>
      <SEO
        title="Accueil | Milinda Mendy - Développeuse Full Stack & DevOps"
        description="Découvrez le portfolio professionnel de Milinda Mendy: projets SaaS, architecture DevOps, React, Laravel et solutions cloud."
      />
      <Hero />
      <Stats />
      <About />
      <AnimatedSection>
        <Services />
      </AnimatedSection>
      <AnimatedSection>
        <HomeProjects />
      </AnimatedSection>
      <AnimatedSection>
        <ImpactSection />
      </AnimatedSection>
      <Timeline />
      <Booking />
    </>
  );
}