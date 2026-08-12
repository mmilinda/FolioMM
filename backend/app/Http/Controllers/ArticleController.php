<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::latest()->get());
    }

    public function show($idOrSlug)
    {
        $article = Article::where('slug', $idOrSlug)->orWhere('id', $idOrSlug)->firstOrFail();
        return response()->json($article);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $data = $request->all();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title);
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->storeAs('public/blog', Str::random(15) . '.' . $request->file('image_file')->getClientOriginalExtension());
            $data['image'] = asset('storage/' . str_replace('public/', '', $path));
        }

        $article = Article::create($data);

        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $data = $request->all();

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->storeAs('public/blog', Str::random(15) . '.' . $request->file('image_file')->getClientOriginalExtension());
            $data['image'] = asset('storage/' . str_replace('public/', '', $path));
        }

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
}