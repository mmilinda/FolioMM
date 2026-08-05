const stats=[

{
title:"Projets",
value:"12"
},

{
title:"Articles",
value:"5"
},

{
title:"Visiteurs",
value:"1250"
},

{
title:"Messages",
value:"18"
}

];



export default function Dashboard(){


return (

<div>


<h1 className="
text-4xl
font-bold
mb-10
"

>

Dashboard

</h1>



<div className="
grid
md:grid-cols-4
gap-6
">


{

stats.map(item=>(


<div

key={item.title}

className="
glass
rounded-2xl
p-6
"


>


<h3>

{item.title}

</h3>


<p className="
text-4xl
text-cyan-400
mt-3
"

>

{item.value}

</p>


</div>


))

}


</div>


</div>


)

}