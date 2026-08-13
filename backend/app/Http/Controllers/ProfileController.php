<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Récupère les informations du profil public.
     */
    public function show()
    {
        $profile = Profile::first();

        if (!$profile) {
            $profile = Profile::create([
                'name' => 'Milinda Mendy',
                'headline' => 'Développeuse Full Stack & DevOps',
                'bio' => 'Je conçois et développe des applications web, plateformes SaaS et solutions digitales de bout en bout.',
                'email' => 'mmilinda00@gmail.com',
                'location' => 'Sénégal 🇸🇳 – Remote',
                'availability' => 'Ouverte aux opportunités',
                'github' => 'https://github.com/mmilinda',
                'linkedin' => 'https://www.linkedin.com/in/milinda-mendy-5ba17928a/',
                'photo' => '/images/profile/MM.png',
                'avatar' => '/images/profile/MM.png',
                'cv_link' => '/CV-Milinda-Mendy.pdf',
                'years_exp' => '5+',
                'projects_count' => '30+',
                'uptime_rate' => '99.9%',
            ]);
        }

        return response()->json($profile);
    }

    /**
     * Mettre à jour le profil personnel depuis le Dashboard Admin.
     */
    public function update(Request $request)
    {
        $profile = Profile::first();

        if (!$profile) {
            $profile = new Profile();
        }

        $profile->fill($request->only([
            'name',
            'headline',
            'bio',
            'email',
            'location',
            'availability',
            'github',
            'linkedin',
            'photo',
            'avatar',
            'cv_link',
            'years_exp',
            'projects_count',
            'uptime_rate',
        ]));

        $profile->save();

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'profile' => $profile,
        ]);
    }
}
