<?php

namespace App\Http\Controllers;


use App\Models\Admin;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;



class AuthController extends Controller
{


public function login(Request $request)
{


$admin=Admin::where(

'email',

$request->email

)->first();



if(
!$admin ||
!Hash::check(
$request->password,
$admin->password
)
)

{

return response()->json([

"message"=>"Identifiants invalides"

],401);


}



$token=$admin->createToken(

'portfolio-token'

)->plainTextToken;



return response()->json([

"token"=>$token,

"admin"=>$admin

]);


}



public function logout(Request $request)
{


$request->user()->tokens()->delete();


return response()->json([

"message"=>"Déconnecté"

]);


}


}