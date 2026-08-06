import Hero from "../components/Hero";
import About from "../components/About";
import Stats from "../components/Stats";
import Services from "../components/Services";
import HomeProjects from "../components/HomeProjects";
import SEO from "../components/SEO";
import Timeline from "../components/Timeline";
import AnimatedSection from "../components/AnimatedSection";
import Booking from "../components/Booking";

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <Stats />
      <About />
      <AnimatedSection>
        <Services />
      </AnimatedSection>
      <AnimatedSection>
        <HomeProjects />
      </AnimatedSection>
      <Timeline />
      <Booking />
    </>
  );
}