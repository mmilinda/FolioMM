<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ArticleController extends Controller
{
    /**
     * Récupère la liste de tous les articles.
     */
    public function index()
    {
        return Article::latest()->get();
    }

    /**
     * Crée un nouvel article avec upload d'image optionnel sur Cloudinary.
     */
    public function store(Request $request)
    {
        // 1. Validation des champs
        $request->validate([
            'title'     => 'required|string|max:255',
            'content'   => 'required|string',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'published' => 'nullable|boolean',
        ]);

        $imageUrl = null;

        // 2. Upload de l'image sur Cloudinary si elle est fournie
        if ($request->hasFile('image')) {
            $imageUrl = Cloudinary::upload(
                $request->file('image')->getRealPath(),
                ['folder' => 'blog']
            )->getSecurePath();
        }

        // 3. Enregistrement en BDD
        $article = Article::create([
            'title'     => $request->title,
            'content'   => $request->content,
            'image'     => $imageUrl,
            'published' => $request->published ?? true,
        ]);

        return response()->json($article, 201);
    }

    /**
     * Affiche un article spécifique.
     */
    public function show(Article $article)
    {
        return response()->json($article);
    }

    /**
     * Mettre à jour un article existant.
     */
    public function update(Request $request, Article $article)
    {
        // 1. Validation des champs
        $request->validate([
            'title'     => 'sometimes|required|string|max:255',
            'content'   => 'sometimes|required|string',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'published' => 'nullable|boolean',
        ]);

        // 2. Gestion de la nouvelle image si uploadée
        if ($request->hasFile('image')) {
            $imageUrl = Cloudinary::upload(
                $request->file('image')->getRealPath(),
                ['folder' => 'blog']
            )->getSecurePath();

            $article->image = $imageUrl;
        }

        // 3. Mise à jour des autres données
        $article->update($request->only(['title', 'content', 'published']));

        return response()->json($article);
    }

    /**
     * Supprime un article.
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return response()->json([
            "message" => "Article supprimé avec succès"
        ]);
    }
}