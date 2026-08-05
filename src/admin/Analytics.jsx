import {

LineChart,

Line,

XAxis,

YAxis,

Tooltip

}

from "recharts";



const data=[

{
month:"Jan",
views:300
},

{
month:"Feb",
views:550
},

{
month:"Mars",
views:900
}

];



export default function Analytics(){


return (

<div>


<h2 className="
text-3xl
font-bold
mb-6
">

Visiteurs

</h2>



<LineChart

width={600}

height={300}

data={data}

>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

dataKey="views"

/>


</LineChart>



</div>

)

}