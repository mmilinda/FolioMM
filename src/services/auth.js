import api from "./api";


export async function login(email,password){

const response = await api.post(
"/login",
{
email,
password
}
);


localStorage.setItem(
"token",
response.data.token
);


localStorage.setItem(
"admin",
JSON.stringify(response.data.admin)
);


return response.data;

}



export function logout(){

localStorage.removeItem("token");

localStorage.removeItem("admin");

window.location.href="/admin/login";

}