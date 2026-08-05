import {
useEffect,
useState
}
from "react";


import {
ArrowUp
}
from "lucide-react";


export default function ScrollTop(){


const [show,setShow]=useState(false);


useEffect(()=>{


const scroll=()=>{

setShow(window.scrollY>500)

}


window.addEventListener(
"scroll",
scroll
);


return()=>{

window.removeEventListener(
"scroll",
scroll
)

}


},[]);



if(!show)

return null;



return (

<button

onClick={()=>window.scrollTo({

top:0,

behavior:"smooth"

})}

className="
fixed
bottom-8
right-8
bg-cyan-400
text-black
p-4
rounded-full
z-50
shadow-xl
"


>

<ArrowUp/>

</button>

)

}