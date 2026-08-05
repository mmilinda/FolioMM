import Hero from "../components/Hero";
import About from "../components/About";
import Stats from "../components/Stats";
import Services from "../components/Services";
import SEO from "../components/SEO";
import Timeline from "../components/Timeline";
import AnimatedSection from "../components/AnimatedSection";
// Dans src/pages/Home.jsx (ou le chemin exact de ton fichier)
import Booking from '../components/Booking'; // 👈 Ajoute cet import en ajustant le chemin



export default function Home(){


return (

<>
<SEO/>

<Hero/>

<Stats/>

<About/>
<AnimatedSection>
  <Services/>
</AnimatedSection>

<Timeline/>

<Booking/>
</>


)

}