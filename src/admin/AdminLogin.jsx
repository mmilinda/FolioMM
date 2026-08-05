import {
useState
}
from "react";


import {
login
}
from "../services/auth";


import {
useNavigate
}
from "react-router-dom";



export default function AdminLogin(){


const navigate=useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");



async function submit(e){


e.preventDefault();


try{


await login(
email,
password
);


navigate("/admin");


}

catch{


setError(
"Email ou mot de passe incorrect"
);


}


}



return (

<div className="
min-h-screen
flex
items-center
justify-center
">


<form

onSubmit={submit}

className="
glass
p-10
rounded-3xl
w-full
max-w-md
"


>


<h1 className="
text-3xl
font-bold
mb-8
">

Administration

</h1>


{
error &&
<p className="text-red-400">

{error}

</p>
}



<input

className="
input-style
"

placeholder="Email"

onChange={
e=>setEmail(e.target.value)
}

/>



<input

className="
input-style
mt-4
"

type="password"

placeholder="Password"

onChange={
e=>setPassword(e.target.value)
}

/>



<button

className="
mt-6
bg-cyan-400
text-black
px-8
py-3
rounded-full
"

>

Connexion

</button>


</form>


</div>

)

}