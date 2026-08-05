<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // On rend la clé accessible à tout le projet Laravel
        $credentialsPath = storage_path('app/firebase/service-account.json');
        if (file_exists($credentialsPath)) {
            putenv('GOOGLE_APPLICATION_CREDENTIALS=' . $credentialsPath);
        }
    }
}