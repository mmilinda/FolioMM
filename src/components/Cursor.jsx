import {
useEffect,
useState
}
from "react";


export default function Cursor(){


const [position,setPosition]=useState({

x:0,

y:0

});



useEffect(()=>{


const move=(e)=>{

setPosition({

x:e.clientX,

y:e.clientY

})

}


window.addEventListener(
"mousemove",
move
);


return()=>window.removeEventListener(
"mousemove",
move
);


},[])



return (

<div

style={{

position:"fixed",

left:position.x,

top:position.y,

width:"20px",

height:"20px",

border:"2px solid #38bdf8",

borderRadius:"50%",

pointerEvents:"none",

zIndex:9999,

transform:"translate(-50%,-50%)"

}}

/>


)

}