import {
useRef
}
from "react";


import emailjs from "@emailjs/browser";


export default function Contact(){


const form=useRef();



function sendEmail(e){

e.preventDefault();


emailjs.sendForm(

"SERVICE_ID",

"TEMPLATE_ID",

form.current,

"PUBLIC_KEY"

)

.then(()=>{

alert(
"Message envoyé avec succès"
);

});


}



return (

<section

className="
container-custom
py-20
"


>


<h1 className="
text-5xl
font-bold
mb-10
"

>

Contact

</h1>



<form

ref={form}

onSubmit={sendEmail}

className="
glass
rounded-3xl
p-8
max-w-2xl
space-y-5
"


>


<input

name="name"

placeholder="Nom"

className="
w-full
bg-white/5
p-4
rounded-xl
"

/>



<input

name="email"

placeholder="Email"

className="
w-full
bg-white/5
p-4
rounded-xl
"

/>




<textarea

name="message"

placeholder="Votre message"

rows="6"

className="
w-full
bg-white/5
p-4
rounded-xl
"

/>



<button

className="
bg-cyan-400
text-black
px-8
py-3
rounded-full
font-bold
"

>

Envoyer

</button>



</form>



</section>

)

}