import {useParams} from "react-router-dom";

import {projects} from "../data/projects";


export default function ProjectDetails(){


const {id}=useParams();


const project=

projects.find(

p=>p.id===id

);



if(!project)

return (

<div className="container-custom py-20">

Projet introuvable

</div>

);



return (

<section className="
container-custom
py-20
">


<img

src={project.image}

className="
rounded-3xl
w-full
max-h-[500px]
object-cover
"

/>



<h1 className="
text-5xl
font-bold
mt-10
"

>

{project.title}

</h1>



<p className="
text-gray-400
text-lg
mt-5
"

>

{project.description}

</p>



<h2 className="
text-2xl
font-bold
mt-10
"

>

Fonctionnalités

</h2>


<ul className="
mt-5
space-y-3
"

>

{
project.features?.map(item=>(

<li key={item}>

✓ {item}

</li>

))

}

</ul>



</section>

)

}