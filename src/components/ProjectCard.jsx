import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";


export default function ProjectCard({project}){


return (

<motion.article

whileHover={{
y:-10
}}

className="
glass
rounded-3xl
overflow-hidden
"

>


<img

src={project.image}

alt={project.title}

className="
h-56
w-full
object-cover
"

/>



<div className="
p-6
"


>


<span className="
text-cyan-400
text-sm
"

>

{project.category}

</span>


<h3 className="
text-2xl
font-bold
mt-3
"

>

{project.title}

</h3>



<p className="
text-gray-400
mt-3
"

>

{project.description}

</p>



<div className="
flex
flex-wrap
gap-2
mt-5
"

>


{
project.technologies.map(tech=>(

<span

key={tech}

className="
bg-cyan-400/10
text-cyan-400
px-3
py-1
rounded-full
text-xs
"

>

{tech}

</span>

))
}


</div>



<a

href={project.url}

target="_blank"

className="
mt-6
inline-flex
items-center
gap-2
text-cyan-400
"

>

Voir le projet

<ExternalLink size={16}/>

</a>


</div>


</motion.article>

)

}