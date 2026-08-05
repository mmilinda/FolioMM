import {motion} from "framer-motion";


export default function Loader(){


return (

<div className="
fixed
inset-0
bg-[#020617]
flex
items-center
justify-center
z-[999]
">


<motion.div

animate={{
rotate:360
}}

transition={{
duration:1,
repeat:Infinity,
ease:"linear"
}}

className="
w-16
h-16
border-4
border-cyan-400
border-t-transparent
rounded-full
"

/>



</div>


)

}