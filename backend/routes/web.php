<?php

use Illuminate\Support\Facades\Route;
use Kreait\Laravel\Firebase\Facades\Firebase;

Route::get('/', function () {
    return view('welcome');
});

// Route pour tester l'écriture et la lecture dans Firestore
Route::get('/test-firestore-crud', function () {
    try {
        $firestore = Firebase::firestore()->database();

        // 1. Écrire un document dans la collection "users"
        $firestore->collection('users')->document('user_123')->set([
            'name' => 'Milinda',
            'role' => 'DevOps',
            'created_at' => now()->toDateTimeString(),
        ]);

        // 2. Lire le document qu'on vient de créer
        $document = $firestore->collection('users')->document('user_123')->snapshot();
        
        if ($document->exists()) {
            return response()->json([
                'status' => 'Opération réussie ! 🎉',
                'data' => $document->data()
            ]);
        }

        return response()->json(['status' => 'Document non trouvé'], 404);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'Erreur ❌',
            'message' => $e->getMessage()
        ], 500);
    }
});