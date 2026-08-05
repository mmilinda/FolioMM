<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| Routes Publiques (Accès sans authentification)
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Projets (Consultation publique pour le Portfolio)
Route::get('/projects', [ProjectController::class, 'index']);


/*
|--------------------------------------------------------------------------
| Routes Protégées (Authentification Sanctum requise - Admin)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Projets (Création et Suppression réservées à l'Admin)
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    
});