import {
Outlet,
Link
}
from "react-router-dom";


import {
useAuth
}
from "../context/AuthContext";



export default function AdminLayout(){


const {

logout

}=useAuth();



return (

<div className="
min-h-screen
bg-slate-950
text-white
flex
">


<aside className="
w-64
border-r
border-white/10
p-6
">


<h2 className="
text-xl
font-bold
mb-10
"

>

MILINDA ADMIN

</h2>



<nav className="
space-y-5
">


<Link to="/admin">

Dashboard

</Link>


<br/>


<Link to="/admin/projects">

Projets

</Link>


<br/>


<Link to="/admin/blog">

Blog

</Link>



<br/>


<Link to="/admin/settings">

Paramètres

</Link>


</nav>



<button

onClick={logout}

className="
mt-10
text-red-400
"

>

Déconnexion

</button>


</aside>




<main className="
flex-1
p-10
">


<Outlet/>

</main>


</div>

)

}