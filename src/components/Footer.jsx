// Icônes générales depuis lucide-react
import { Mail, Phone } from "lucide-react";

// Logos de réseaux sociaux depuis react-icons/fa6 (FontAwesome 6)
import { FaGithub, FaLinkedin } from "react-icons/fa6";


export default function Footer(){


return (

<footer

className="
border-t
border-white/10
mt-20
"


>


<div className="
container-custom
py-12
grid
md:grid-cols-3
gap-10
"


>


{/* Brand */}

<div>


<div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400/40 p-0.5 bg-cyan-400/10 flex-shrink-0">
    <img src="/logoMM.jpg" alt="MM Logo" className="w-full h-full object-cover rounded-full" />
  </div>
  <h2 className="text-2xl font-bold">
    <span className="gradient-text">MILINDA</span>_MENDY
  </h2>
</div>



<p className="
text-gray-400
mt-4
"

>

Développeuse Full Stack spécialisée
dans les applications web modernes,
SaaS et solutions digitales.

</p>


</div>



{/* Navigation */}

<div>


<h3 className="
font-bold
mb-4
"

>

Navigation

</h3>



<ul className="
space-y-3
text-gray-400
"

>


<li>

Accueil

</li>


<li>

Projets

</li>


<li>

Blog

</li>


<li>

Contact

</li>


</ul>


</div>




{/* Contact */}

<div>


<h3 className="
font-bold
mb-4
"

>

Contact

</h3>



<div className="
space-y-4
text-gray-400
"

>


<p className="
flex
gap-2
items-center
">

<Mail size={24}/>

mmilinda00@gmail.com

</p>


<p className="
flex
gap-2
items-center
">

<Phone size={18}/>

+221 77 375 46 72

</p>


<div className="
flex
gap-5
mt-5
">


<a href="https://github.com/mmilinda">

<FaGithub size={24} />

</a>


<a href="https://www.linkedin.com/in/milinda-mendy-5ba17928a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">

<FaLinkedin size={24} />

</a>


</div>


</div>


</div>


</div>



<div className="
text-center
border-t
border-white/10
py-6
text-gray-500
"


>

© 2026 Milinda Mendy — Crafted with Performance 🚀

</div>



</footer>


)

}