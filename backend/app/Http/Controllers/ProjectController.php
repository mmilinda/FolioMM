<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::latest()->get());
    }

    public function show($idOrSlug)
    {
        $project = Project::where('slug', $idOrSlug)->orWhere('id', $idOrSlug)->firstOrFail();
        return response()->json($project);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $data = $request->all();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        // Upload de l'image principale si présente
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->storeAs('public/projects', Str::random(15) . '.' . $request->file('image_file')->getClientOriginalExtension());
            $data['image'] = asset('storage/' . str_replace('public/', '', $path));
        }

        // Upload du schéma d'architecture si présent
        if ($request->hasFile('architecture_diagram_file')) {
            $path = $request->file('architecture_diagram_file')->storeAs('public/projects', Str::random(15) . '.' . $request->file('architecture_diagram_file')->getClientOriginalExtension());
            $data['architecture_diagram'] = asset('storage/' . str_replace('public/', '', $path));
        }

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $data = $request->all();

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->storeAs('public/projects', Str::random(15) . '.' . $request->file('image_file')->getClientOriginalExtension());
            $data['image'] = asset('storage/' . str_replace('public/', '', $path));
        }

        if ($request->hasFile('architecture_diagram_file')) {
            $path = $request->file('architecture_diagram_file')->storeAs('public/projects', Str::random(15) . '.' . $request->file('architecture_diagram_file')->getClientOriginalExtension());
            $data['architecture_diagram'] = asset('storage/' . str_replace('public/', '', $path));
        }

        $project->update($data);

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès'
        ]);
    }
}