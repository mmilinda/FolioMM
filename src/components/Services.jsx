import {
Code2,
Layout,
Rocket,
Brain
}
from "lucide-react";


const services=[

{
icon:Code2,
title:"Développement Web",
desc:"Applications modernes React, Laravel et Node.js."
},


{
icon:Layout,
title:"UI / UX Design",
desc:"Interfaces élégantes et expériences utilisateurs."
},


{
icon:Rocket,
title:"Solutions SaaS",
desc:"Création de plateformes métiers évolutives."
},


{
icon:Brain,
title:"IA & Automatisation",
desc:"Intégration IA, API et workflows intelligents."
}

];


export default function Services(){


return (

<section

className="
container-custom
py-24
"

>


<h2 className="
text-4xl
font-bold
mb-12
"

>

Mes services

</h2>


<div className="
grid
md:grid-cols-4
gap-6
"

>


{
services.map(service=>{


const Icon=service.icon;


return (

<div

key={service.title}

className="
glass
rounded-2xl
p-6
hover:-translate-y-2
transition
"


>


<Icon

className="
text-cyan-400
mb-5
"

/>


<h3 className="
font-bold
text-xl
"

>

{service.title}

</h3>


<p className="
text-gray-400
mt-3
"

>

{service.desc}

</p>


</div>


)


})

}


</div>


</section>


)

}