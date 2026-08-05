const articles=[


{
title:"Construire une application SaaS moderne",
date:"2026",
desc:
"Architecture React, API et bonnes pratiques."
},


{
title:"IA et Agriculture au Sénégal",
date:"2026",
desc:
"Retour sur le projet AgriChain AI."
},


{
title:"Créer une plateforme avec React Laravel",
date:"2025",
desc:
"Guide pratique pour développeurs."
}


];



export default function Blog(){


return (

<section className="
container-custom
py-20
"


>


<h1 className="
text-5xl
font-bold
mb-12
"

>

Blog

</h1>



<div className="
grid
md:grid-cols-3
gap-8
"


>


{
articles.map(article=>(


<div

key={article.title}

className="
glass
rounded-3xl
p-6
"


>


<p className="
text-cyan-400
"

>

{article.date}

</p>


<h2 className="
text-xl
font-bold
mt-4
"

>

{article.title}

</h2>


<p className="
text-gray-400
mt-4
"

>

{article.desc}

</p>


</div>


))

}


</div>



</section>


)

}