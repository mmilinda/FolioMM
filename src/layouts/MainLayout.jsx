import {Outlet} from "react-router-dom";


import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import ScrollTop from "../components/ScrollTop";

import Cursor from "../components/Cursor";



export default function MainLayout(){


return (

<div className="
min-h-screen
bg-[#020617]
text-white
">


<Navbar/>


<main className="pt-24">

<Outlet/>

</main>


<ScrollTop/>

<Cursor/>

<Footer/>


</div>


)

}