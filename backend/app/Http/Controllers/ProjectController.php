<?php

namespace App\Http\Controllers;


use App\Models\Project;

use Illuminate\Http\Request;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;



class ProjectController extends Controller
{


public function index()

{

return Project::latest()->get();

}



public function store(Request $request)

{


$request->validate([


'title'=>'required|string|max:255',

'description'=>'required|string',

'image'=>'required|image|max:2048'


]);



$imageUrl = Cloudinary::upload(

$request->file('image')->getRealPath(),

[
'folder'=>'portfolio'
]

)->getSecurePath();



$project = Project::create([


'title'=>$request->title,


'category'=>$request->category,


'description'=>$request->description,


'problem'=>$request->problem,


'solution'=>$request->solution,


'image'=>$imageUrl,


'technologies'=>$request->technologies,


'impact'=>$request->impact,


'demo'=>$request->demo,


'github'=>$request->github


]);



return response()->json($project,201);


}




public function destroy(Project $project)

{


$project->delete();



return response()->json([

'message'=>'Projet supprimé avec succès'

]);


}


}