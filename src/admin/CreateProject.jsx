import {
useState
}
from "react";


import api from "../services/api";



export default function CreateProject(){


const [form,setForm]=useState({

title:"",

description:"",

url:"",

image:"",

technologies:[]

});



async function submit(e){


e.preventDefault();


await api.post(
"/projects",
form
);



alert(
"Projet ajouté"
);


}



return (

<form

onSubmit={submit}

className="
glass
p-8
rounded-3xl
space-y-4
"


>


<input

placeholder="Titre"

className="input-style"

onChange={
e=>setForm({

...form,

title:e.target.value

})
}

/>



<textarea

placeholder="Description"

className="input-style"

onChange={
e=>setForm({

...form,

description:e.target.value

})
}

/>



<input

placeholder="URL"

className="input-style"

onChange={
e=>setForm({

...form,

url:e.target.value

})
}

/>



<button

className="
bg-cyan-400
text-black
px-6
py-3
rounded-full
"

>

Ajouter

</button>


</form>

)

}