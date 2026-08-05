<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProjectController extends Controller
{
    /**
     * Récupère la liste de tous les projets.
     */
    public function index()
    {
        return Project::latest()->get();
    }

    /**
     * Crée un nouveau projet avec upload sur Cloudinary.
     */
    public function store(Request $request)
    {
        // 1. Validation des champs
        $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'image'        => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'url'          => 'nullable|string',
            'technologies' => 'nullable',
        ]);

        // 2. Upload de l'image sur Cloudinary
        $uploadedFileUrl = Cloudinary::upload(
            $request->file('image')->getRealPath(),
            ['folder' => 'portfolio']
        )->getSecurePath();

        // 3. Création du projet en BDD avec l'URL de l'image Cloudinary
        $project = Project::create([
            'title'        => $request->title,
            'description'  => $request->description,
            'image'        => $uploadedFileUrl,
            'url'          => $request->url,
            'technologies' => $request->technologies,
        ]);

        return response()->json($project, 201);
    }

    /**
     * Supprime un projet existant.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            "message" => "Projet supprimé avec succès"
        ]);
    }
}