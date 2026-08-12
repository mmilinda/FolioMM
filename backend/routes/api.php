<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\ImpactController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\SiteSettingController;

/*
|--------------------------------------------------------------------------
| Routes Publiques (Accès public sans authentification)
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Profile & Médias
Route::get('/profile', [ProfileController::class, 'show']);

// Projets (Consultation publique pour le Portfolio)
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

// Articles Blog
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);

// Services, Skills, Timeline, Impact & Réglages
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/timeline', [TimelineController::class, 'index']);
Route::get('/impact', [ImpactController::class, 'index']);
Route::get('/settings', [SiteSettingController::class, 'show']);

// Formulaire de contact public
Route::post('/contact', [MessageController::class, 'store']);


/*
|--------------------------------------------------------------------------
| Routes Protégées (Authentification Sanctum requise - Admin)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Upload générique (Photo, Avatar, Document CV PDF, Image Projet)
    Route::post('/upload', [UploadController::class, 'upload']);

    // Profile & Paramètres
    Route::post('/admin/profile', [ProfileController::class, 'update']);
    Route::put('/admin/profile', [ProfileController::class, 'update']);

    // Section Visibility
    Route::post('/admin/settings', [SiteSettingController::class, 'update']);
    Route::put('/admin/settings', [SiteSettingController::class, 'update']);

    // Projets (Création, Édition, Suppression)
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    // Articles (Création, Édition, Suppression)
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

    // Synchronization des services, compétences, timeline & impact
    Route::post('/admin/services/sync', [ServiceController::class, 'sync']);
    Route::post('/admin/skills/sync', [SkillController::class, 'sync']);
    Route::post('/admin/timeline/sync', [TimelineController::class, 'sync']);
    Route::post('/admin/impact/sync', [ImpactController::class, 'sync']);

    // Boîte de Réception Messages
    Route::get('/admin/messages', [MessageController::class, 'index']);
    Route::patch('/admin/messages/{message}/read', [MessageController::class, 'markAsRead']);
    Route::delete('/admin/messages/{message}', [MessageController::class, 'destroy']);
    
});