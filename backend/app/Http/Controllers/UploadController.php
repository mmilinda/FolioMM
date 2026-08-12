<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Uploade un fichier (image ou document PDF) et renvoie son URL accessible.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // Max 10MB
            'folder' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $folder = $request->input('folder', 'uploads');

        // Génère un nom de fichier unique tout en conservant l'extension
        $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();

        // Enregistre dans le disque public (storage/app/public/uploads)
        $path = $file->storeAs("public/{$folder}", $filename);

        // URL publique d'accès
        $url = asset("storage/{$folder}/{$filename}");

        return response()->json([
            'success' => true,
            'url' => $url,
            'path' => "storage/{$folder}/{$filename}",
            'original_name' => $file->getClientOriginalName(),
        ]);
    }
}
