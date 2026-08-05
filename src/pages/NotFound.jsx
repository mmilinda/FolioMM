import {
Link
}
from "react-router-dom";


export default function NotFound(){


return (

<div className="
container-custom
py-40
text-center
">


<h1 className="
text-8xl
font-bold
text-cyan-400
"

>

404

</h1>



<p className="
text-gray-400
mt-5
"

>

Cette page n'existe pas.

</p>



<Link

to="/"

className="
inline-block
mt-8
bg-cyan-400
text-black
px-8
py-3
rounded-full
"

>

Retour accueil

</Link>


</div>

)

}