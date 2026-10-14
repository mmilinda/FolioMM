<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::latest('published_at')->latest()->get());
    }

    public function show($idOrSlug)
    {
        $article = Article::where('slug', $idOrSlug)->orWhere('id', $idOrSlug)->firstOrFail();
        return response()->json($article);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = $this->formatArticleData($request);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        if (empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $article = Article::create($data);

        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        
        $data = $this->formatArticleData($request, $article);

        $article->update($data);

        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $article->delete();

        return response()->json([
            'message' => 'Article supprimé avec succès'
        ]);
    }

    private function formatArticleData(Request $request, ?Article $existing = null): array
    {
        $data = $request->all();

        $mappings = [
            'titleEn' => 'title_en',
            'categoryEn' => 'category_en',
            'descEn' => 'desc_en',
            'readTime' => 'read_time',
            'readTimeEn' => 'read_time_en',
        ];

        foreach ($mappings as $camel => $snake) {
            if ($request->has($camel) && !$request->has($snake)) {
                $data[$snake] = $request->input($camel);
            }
        }

        // Upload de l'image
        $imageFile = $request->file('image_file') ?? $request->file('image');
        if ($imageFile) {
            $filename = Str::random(20) . '.' . $imageFile->getClientOriginalExtension();
            $path = $imageFile->storeAs('public/blog', $filename);
            $data['image'] = asset('storage/blog/' . $filename);
        } elseif ($existing && empty($data['image'])) {
            $data['image'] = $existing->image;
        }

        // Gestion de tags si chaîne séparée par des virgules
        if (isset($data['tags']) && is_string($data['tags'])) {
            $decoded = json_decode($data['tags'], true);
            $data['tags'] = is_array($decoded) ? $decoded : array_filter(array_map('trim', explode(',', $data['tags'])));
        }

        // Gestion des sections JSON
        if (isset($data['sections']) && is_string($data['sections'])) {
            $decoded = json_decode($data['sections'], true);
            if (is_array($decoded)) {
                $data['sections'] = $decoded;
            }
        }

        // Gestion de l'auteur
        if (isset($data['author']) && is_string($data['author'])) {
            $decoded = json_decode($data['author'], true);
            if (is_array($decoded)) {
                $data['author'] = $decoded;
            }
        }

        return $data;
    }
}