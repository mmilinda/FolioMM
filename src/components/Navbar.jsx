import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import {
useTranslation
}
from "react-i18next";

export default function Navbar(){

const {
i18n
}=useTranslation();


<button

onClick={()=>{

i18n.changeLanguage(

i18n.language==="fr"
?
"en"
:
"fr"

)

}}

className="
border
border-cyan-400
px-4
rounded-full
"

>

🌍

{

i18n.language==="fr"

?

"EN"

:

"FR"

}

</button>    

const [open,setOpen]=useState(false);

const links=[

{
name:"Accueil",
path:"/"
},

{
name:"Projets",
path:"/projects"
},

{
name:"Blog",
path:"/blog"
},

{
name:"Contact",
path:"/contact"
}

];


return (

<motion.nav

initial={{y:-100}}

animate={{y:0}}

className="
fixed
top-0
left-0
w-full
z-50
glass
"

>


<div className="
container-custom
flex
items-center
justify-between
py-5
">


{/* Logo */}

<NavLink

to="/"

className="
text-xl
font-bold
tracking-wider
"
>


<span className="gradient-text">

MILINDA

</span>

_MENDY


</NavLink>



{/* Desktop */}

<div className="
hidden
md:flex
items-center
gap-8
">


{
links.map(link=>(

<NavLink

key={link.path}

to={link.path}

className={({isActive})=>

`

transition

${isActive
?
"text-cyan-400"
:
"text-gray-300"}

hover:text-cyan-400

`

}

>

{link.name}

</NavLink>

))
}



<button

className="
flex
items-center
gap-2
border
border-cyan-400
px-4
py-2
rounded-full
text-cyan-400
"

>

<Globe size={16}/>

FR

</button>


</div>



{/* Mobile button */}

<button

onClick={()=>setOpen(!open)}

className="
md:hidden
"

>

{

open

?

<X/>

:

<Menu/>

}


</button>


</div>



{/* Mobile menu */}

{

open &&

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

className="
md:hidden
px-6
pb-6
flex
flex-col
gap-5
"

>


{
links.map(link=>(

<NavLink

onClick={()=>setOpen(false)}

key={link.path}

to={link.path}

className="
text-gray-300
hover:text-cyan-400
"

>

{link.name}

</NavLink>

))
}


</motion.div>

}


</motion.nav>


)

}