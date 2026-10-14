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
                'headline' => 'Développeuse Full Stack & Ingénieure DevOps',
                'headline_en' => 'Full Stack & DevOps Developer',
                'bio' => 'Je conçois et développe des applications web, plateformes SaaS et solutions digitales de bout en bout, de l\'interface utilisateur au backend, aux API et au déploiement.',
                'bio_en' => 'I design and build end-to-end web applications, SaaS platforms, and digital solutions — from user interface to backend, APIs, and deployment.',
                'email' => 'mmilinda00@gmail.com',
                'location' => 'Sénégal 🇸🇳 – Remote',
                'availability' => 'Ouverte aux opportunités',
                'availability_en' => 'Open to opportunities',
                'github' => 'https://github.com/mmilinda',
                'linkedin' => 'https://www.linkedin.com/in/milinda-mendy-5ba17928a/',
                'photo' => '/images/profile/MM.png',
                'avatar' => '/images/profile/MM.png',
                'cv_link' => '/CV-Milinda-Mendy.pdf',
                'cv_link_fr' => '/CV-Milinda-Mendy-FR.pdf',
                'cv_link_en' => '/CV-Milinda-Mendy-EN.pdf',
                'years_exp' => '5+',
                'projects_count' => '30+',
                'uptime_rate' => '99.9%',
                'hero_roles' => ['DevOps', 'Full Stack Developer', 'Cloud Architect', 'Solutions Builder'],
                'hero_badges' => ['React', 'Laravel', 'Node.js', 'AI', 'Cloud', 'DevOps'],
                'highlights' => [
                    ['id' => 'hl-1', 'icon' => 'Code2', 'text' => 'Architecture Full Stack moderne', 'textEn' => 'Modern Full Stack Architecture'],
                    ['id' => 'hl-2', 'icon' => 'Server', 'text' => 'Infrastructure DevOps & Cloud', 'textEn' => 'DevOps & Cloud Infrastructure'],
                    ['id' => 'hl-3', 'icon' => 'Zap', 'text' => 'Pipelines CI/CD automatisés', 'textEn' => 'Automated CI/CD Pipelines'],
                    ['id' => 'hl-4', 'icon' => 'CheckCircle', 'text' => 'Delivery rapide & code de qualité', 'textEn' => 'Fast delivery & quality code'],
                ],
                'section_titles' => [
                    'servicesTitle' => 'Mes Domaines d\'Expertise',
                    'servicesSubtitle' => 'Des solutions techniques complètes et sur-mesure pour propulser vos projets web et cloud.',
                    'aboutTitle' => 'À Propos',
                    'aboutTitleHighlight' => 'de Moi',
                    'projectsTitle' => 'Mes Projets',
                    'projectsTitleHighlight' => 'en Vedette',
                    'bookingTitle' => 'Prêt à propulser',
                    'bookingTitleHighlight' => 'votre projet ?',
                    'bookingSubtitle' => 'Discutons de vos besoins techniques, d\'une opportunité ou d\'une collaboration.',
                ],
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

        $fields = [
            'name',
            'headline',
            'headline_en',
            'bio',
            'bio_en',
            'email',
            'phone',
            'location',
            'availability',
            'availability_en',
            'github',
            'linkedin',
            'twitter',
            'website',
            'photo',
            'avatar',
            'cv_link',
            'cv_link_fr',
            'cv_link_en',
            'years_exp',
            'projects_count',
            'uptime_rate',
            'hero_roles',
            'hero_badges',
            'highlights',
            'section_titles',
        ];

        // Mappings camelCase -> snake_case
        $camelMap = [
            'headlineEn' => 'headline_en',
            'bioEn' => 'bio_en',
            'availabilityEn' => 'availability_en',
            'cvLink' => 'cv_link',
            'cvLinkFr' => 'cv_link_fr',
            'cvLinkEn' => 'cv_link_en',
            'yearsExp' => 'years_exp',
            'projectsCount' => 'projects_count',
            'uptimeRate' => 'uptime_rate',
            'heroRoles' => 'hero_roles',
            'heroBadges' => 'hero_badges',
            'sectionTitles' => 'section_titles',
        ];

        $dataToUpdate = [];

        foreach ($fields as $field) {
            if ($request->has($field)) {
                $dataToUpdate[$field] = $request->input($field);
            }
        }

        foreach ($camelMap as $camel => $snake) {
            if ($request->has($camel) && !isset($dataToUpdate[$snake])) {
                $dataToUpdate[$snake] = $request->input($camel);
            }
        }

        $profile->fill($dataToUpdate);
        $profile->save();

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'profile' => $profile,
        ]);
    }
}
