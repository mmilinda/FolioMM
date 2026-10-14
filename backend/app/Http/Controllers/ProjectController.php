<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::orderBy('order', 'asc')->latest()->get());
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

        $data = $this->formatProjectData($request);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        $project = Project::create($data);

        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        
        $data = $this->formatProjectData($request, $project);

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

    private function formatProjectData(Request $request, ?Project $existing = null): array
    {
        $data = $request->all();

        // Support both camelCase and snake_case for bilingual attributes
        $mappings = [
            'titleEn' => 'title_en',
            'categoryEn' => 'category_en',
            'descriptionEn' => 'description_en',
            'problemEn' => 'problem_en',
            'solutionEn' => 'solution_en',
            'impactEn' => 'impact_en',
            'clientEn' => 'client_en',
            'roleEn' => 'role_en',
            'statusEn' => 'status_en',
            'isPrivate' => 'is_private',
            'fallbackImage' => 'fallback_image',
            'architectureDiagram' => 'architecture_diagram',
            'architectureDetails' => 'architecture_details',
        ];

        foreach ($mappings as $camel => $snake) {
            if ($request->has($camel) && !$request->has($snake)) {
                $data[$snake] = $request->input($camel);
            }
        }

        // Upload de l'image principale (supporte à la fois image_file et image comme fichier)
        $imageFile = $request->file('image_file') ?? $request->file('image');
        if ($imageFile) {
            $filename = Str::random(20) . '.' . $imageFile->getClientOriginalExtension();
            $path = $imageFile->storeAs('public/projects', $filename);
            $data['image'] = asset('storage/projects/' . $filename);
        } elseif ($existing && empty($data['image'])) {
            $data['image'] = $existing->image;
        }

        // Upload schéma architecture
        $archFile = $request->file('architecture_diagram_file') ?? $request->file('architecture_diagram');
        if ($archFile) {
            $filename = Str::random(20) . '.' . $archFile->getClientOriginalExtension();
            $path = $archFile->storeAs('public/projects', $filename);
            $data['architecture_diagram'] = asset('storage/projects/' . $filename);
        } elseif ($existing && empty($data['architecture_diagram'])) {
            $data['architecture_diagram'] = $existing->architecture_diagram;
        }

        // Gestion des tableaux JSON si passés en chaînes
        if (isset($data['technologies']) && is_string($data['technologies'])) {
            $decoded = json_decode($data['technologies'], true);
            $data['technologies'] = is_array($decoded) ? $decoded : array_filter(array_map('trim', explode(',', $data['technologies'])));
        }

        return $data;
    }
}