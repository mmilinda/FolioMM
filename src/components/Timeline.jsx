const experiences=[


{
year:"2026",
title:"Développeuse Full Stack Senior",
desc:
"Création de plateformes SaaS, applications métiers et solutions IA."
},


{
year:"2025",
title:"SecurityApp",
desc:
"Développement d'une plateforme complète de gestion de sécurité."
},


{
year:"2025",
title:"AgriChain AI",
desc:
"Création d'une solution AgriTech combinant IA et Blockchain."
},


{
year:"2024",
title:"Développement Web Freelance",
desc:
"Création de sites vitrines et applications professionnelles."
}


];


export default function Timeline(){


return (

<section className="
container-custom
py-20
"


>


<h2 className="
text-4xl
font-bold
mb-12
"

>

Mon parcours

</h2>



<div className="
space-y-8
border-l
border-cyan-400
pl-8
"


>


{

experiences.map((item, index) =>(
<div key={`${item.year}-${index}`}> 
{/* <div key={item.year}> */}


<span className="
text-cyan-400
font-bold
"

>

{item.year}

</span>



<h3 className="
text-xl
font-bold
mt-2
"

>

{item.title}

</h3>


<p className="
text-gray-400
mt-2
"

>

{item.desc}

</p>



</div>


))

}



</div>


</section>


)

}