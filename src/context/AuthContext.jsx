import {
createContext,
useContext,
useState
}
from "react";


const AuthContext=createContext();



export function AuthProvider({children}){


const [user,setUser]=useState(

localStorage.getItem("admin")

);



function login(email,password){


if(
email==="admin@milinda.dev"
&&
password==="admin123"
){

localStorage.setItem(
"admin",
"true"
);


setUser("true");


return true;

}


return false;


}



function logout(){


localStorage.removeItem("admin");

setUser(null);


}



return (

<AuthContext.Provider

value={{

user,

login,

logout

}}

>


{children}


</AuthContext.Provider>


)

}



export function useAuth(){

return useContext(AuthContext);

}