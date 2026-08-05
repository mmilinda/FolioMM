import {motion} from "framer-motion";

import {
ArrowRight,
}
from "lucide-react";

// Logos de réseaux sociaux depuis react-icons/fa6 (FontAwesome 6)
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import photo from "../assets/images/profile/MM.png";



export default function Hero(){


return (

<section

className="
container-custom
min-h-screen
flex
items-center
"

>


<div

className="
grid
md:grid-cols-2
gap-10
items-center
w-full
"

>



{/* Texte */}

<motion.div

initial={{
opacity:0,
x:-50
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.8
}}

>


<p className="
text-cyan-400
mb-5
font-semibold
"

>

Développeuse Full Stack
</p>



<h1

className="
text-5xl
md:text-7xl
font-bold
leading-tight
"

>


Créer des produits

<span className="
gradient-text
">

digitaux

</span>

performants.


</h1>



<p

className="
text-gray-400
mt-8
text-lg
leading-relaxed
"

>

Je suis Milinda Mendy,
Développeuse Senior spécialisée
dans la création d'applications web,
plateformes SaaS et solutions digitales
modernes.


</p>



<div className="
flex
gap-5
mt-10
flex-wrap
">


<a

href="/projects"

className="
bg-cyan-400
text-black
px-7
py-3
rounded-full
font-bold
flex
items-center
gap-2
"

>

Voir mes projets

<ArrowRight size={18}/>

</a>



<a

href="/CV-Milinda.pdf"

className="
border
border-white/20
px-7
py-3
rounded-full
"

>

Télécharger CV

</a>


</div>




<div className="
flex
gap-5
mt-8
"

>

<FaGithub size={24}/>

<FaLinkedin size={24}/>


</div>



</motion.div>




{/* Image */}

<motion.div

initial={{
opacity:0,
scale:.8
}}

animate={{
opacity:1,
scale:1
}}

transition={{
duration:1
}}

className="
flex
justify-center
"

>


<div

className="
w-72
h-72
rounded-full
overflow-hidden
border-4
border-cyan-400
shadow-xl
shadow-cyan-400/30
"

>


<img

src={photo}

alt="Milinda Mendy"

className="
w-full
h-full
object-cover
"

/>


</div>


</motion.div>


</div>


</section>


)

}