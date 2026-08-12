<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Profile;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Timeline;
use App\Models\ImpactMetric;
use App\Models\Testimonial;
use App\Models\Project;
use App\Models\Article;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        Admin::query()->delete();
        Admin::create([
            'name' => 'Milinda Mendy',
            'email' => 'mmilinda00@gmail.com',
            'password' => Hash::make('admin123'),
        ]);

        // 2. Seed Profile
        Profile::query()->delete();
        Profile::create([
            'name' => 'Milinda Mendy',
            'headline' => 'Développeuse Full Stack & Ingénieure DevOps',
            'bio' => 'Je conçois et développe des applications web, plateformes SaaS et solutions digitales de bout en bout, de l\'interface utilisateur au backend, aux API et au déploiement.',
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

        // 3. Seed Services
        Service::query()->delete();
        $services = [
            [
                'title' => 'Développement Full Stack',
                'desc' => 'Applications web modernes, réactives et performantes construites avec React, Next.js, Node.js et Laravel.',
                'icon_name' => 'Code2',
                'tags' => ['React', 'Laravel', 'JavaScript'],
                'glow' => '#38bdf8',
                'gradient' => 'from-blue-500/20 to-cyan-500/20',
                'order' => 1,
            ],
            [
                'title' => 'Architecture Cloud & Infrastructure',
                'desc' => 'Conception d\'infrastructures résilientes et scalables sur AWS, GCP, Docker et Kubernetes.',
                'icon_name' => 'Cloud',
                'tags' => ['AWS', 'Docker', 'Kubernetes'],
                'glow' => '#818cf8',
                'gradient' => 'from-purple-500/20 to-indigo-500/20',
                'order' => 2,
            ],
            [
                'title' => 'CI/CD & Automatisation DevOps',
                'desc' => 'Mise en place de pipelines d\'intégration et de déploiement continus automatisés avec GitHub Actions.',
                'icon_name' => 'GitBranch',
                'tags' => ['GitHub Actions', 'CI/CD', 'Monitoring'],
                'glow' => '#34d399',
                'gradient' => 'from-emerald-500/20 to-teal-500/20',
                'order' => 3,
            ],
            [
                'title' => 'Intégration d\'IA & Automation',
                'desc' => 'Intégration d\'APIs LLM (OpenAI, Gemini), automatisation de workflows et agents intelligents.',
                'icon_name' => 'Brain',
                'tags' => ['OpenAI', 'Gemini', 'API'],
                'glow' => '#f472b6',
                'gradient' => 'from-pink-500/20 to-rose-500/20',
                'order' => 4,
            ],
            [
                'title' => 'Architecture SaaS Multi-tenant',
                'desc' => 'Développement de solutions SaaS clé en main avec gestion des abonnements Stripe, rôles et authentification.',
                'icon_name' => 'Layers',
                'tags' => ['SaaS', 'Multi-tenant', 'Stripe'],
                'glow' => '#fb923c',
                'gradient' => 'from-orange-500/20 to-amber-500/20',
                'order' => 5,
            ],
            [
                'title' => 'Sécurité & Audit de Performance',
                'desc' => 'Audits de sécurité, optimisation des temps de chargement, configuration HTTPS et protection OWASP.',
                'icon_name' => 'Shield',
                'tags' => ['Security', 'OWASP', 'Performance'],
                'glow' => '#22d3ee',
                'gradient' => 'from-cyan-500/20 to-sky-500/20',
                'order' => 6,
            ],
        ];
        foreach ($services as $svc) {
            Service::create($svc);
        }

        // 4. Seed Skills
        Skill::query()->delete();
        $skills = [
            [
                'category' => 'Development Frontend',
                'icon_name' => 'Layout',
                'skills' => ['React', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux / Zustand', 'HTML5/CSS3'],
                'order' => 1,
            ],
            [
                'category' => 'Development Backend',
                'icon_name' => 'Server',
                'skills' => ['Laravel / PHP', 'Node.js / Express', 'JavaScript', 'REST APIs', 'GraphQL'],
                'order' => 2,
            ],
            [
                'category' => 'DevOps & Cloud',
                'icon_name' => 'Cpu',
                'skills' => ['Docker', 'Kubernetes', 'AWS (EC2, S3, RDS)', 'Terraform', 'GitHub Actions', 'Nginx'],
                'order' => 3,
            ],
            [
                'category' => 'Databases & Storage',
                'icon_name' => 'Database',
                'skills' => ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase / Firebase'],
                'order' => 4,
            ],
        ];
        foreach ($skills as $sk) {
            Skill::create($sk);
        }

        // 5. Seed Timeline
        Timeline::query()->delete();
        $timelineEntries = [
            [
                'year' => 'Janvier 2026 - Présent',
                'title' => 'Développeuse d\'applications & solutions numériques',
                'company' => 'SamCorporate',
                'description' => 'Développement de solutions numériques d\'entreprise, d\'applications web & mobiles et de plateformes intelligentes sur-mesure.',
                'tags' => ['React', 'JavaScript', 'Tailwind CSS', 'Laravel API', 'Full Stack'],
                'type' => 'work',
                'order' => 1,
            ],
            [
                'year' => '2024 - 2025',
                'title' => 'Développeuse Full Stack & Web Mobile',
                'company' => 'Défarsci',
                'description' => 'Développement d\'applications web interactives : CV Vidéo et Location Appartement.',
                'tags' => ['Laravel', 'React', 'PHP', 'MySQL', 'JavaScript'],
                'type' => 'work',
                'order' => 2,
            ],
            [
                'year' => '2023',
                'title' => 'Stagiaire Développeuse Web',
                'company' => 'Défarsci',
                'description' => 'Conception et intégration de sites vitrines et plateformes CMS : Site Zawiya.',
                'tags' => ['WordPress', 'Laravel', 'PHP', 'MySQL', 'CMS'],
                'type' => 'work',
                'order' => 3,
            ],
            [
                'year' => '2023',
                'title' => 'Certification en Développement Web & Mobile',
                'company' => 'ISCA (en partenariat avec le 3FPT)',
                'description' => 'Formation certifiante et compétences pratiques en Développement Web & Mobile.',
                'tags' => ['Développement Web', 'Développement Mobile', 'Certification', '3FPT', 'ISCA'],
                'type' => 'education',
                'order' => 4,
            ],
        ];
        foreach ($timelineEntries as $tl) {
            Timeline::create($tl);
        }

        // 6. Seed Impact Metrics & Testimonials
        ImpactMetric::query()->delete();
        Testimonial::query()->delete();

        ImpactMetric::create(['number' => '-65%', 'label' => 'Temps de Déploiement', 'desc' => 'Grâce aux pipelines CI/CD automatisés', 'order' => 1]);
        ImpactMetric::create(['number' => '99.95%', 'label' => 'Uptime Moyen', 'desc' => 'Sur les infrastructures cloud gérées', 'order' => 2]);
        ImpactMetric::create(['number' => '3x', 'label' => 'Vitesse d\'Exécution', 'desc' => 'Optimisation du code et des requêtes DB', 'order' => 3]);

        Testimonial::create([
            'name' => 'Alexandre Dupont',
            'role' => 'CTO @ SaaS Startup',
            'content' => 'Milinda a transformé notre infrastructure et mis en place des pipelines CI/CD ultra-fiables. Son expertise Full Stack et DevOps est impressionnante.',
            'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            'order' => 1,
        ]);
        Testimonial::create([
            'name' => 'Sarah Lawson',
            'role' => 'Product Manager @ Tech Scaleup',
            'content' => 'Une collaboration exceptionnelle. Code propre, respect strict des délais et conseils DevOps avisés du début à la fin.',
            'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
            'order' => 2,
        ]);

        // 7. Seed Projects
        Project::query()->delete();
        $projects = [
            [
                'slug' => 'agri-chain-ai',
                'title' => 'AgriChain AI',
                'category' => 'AI • Agriculture • Blockchain',
                'description' => 'Plateforme intelligente dédiée au secteur agricole combinant intelligence artificielle, données agricoles et technologies blockchain.',
                'problem' => 'Les agriculteurs manquent d\'accès direct et rapide à des données météorologiques et d\'analyses de sols.',
                'solution' => 'Une plateforme SaaS intelligente intégrant des algorithmes d\'IA pour l\'analyse prédictive agricole.',
                'image' => '/src/assets/projects/AgriChain.PNG',
                'demo' => 'https://agri-tech-puce.vercel.app/',
                'featured' => true,
                'technologies' => ['React', 'JavaScript', 'Tailwind CSS', 'AI / Node.js'],
            ],
            [
                'slug' => 'garagebi-assistance',
                'title' => 'Garagebi Assistance',
                'category' => 'Automobile • Service Digital',
                'description' => 'Plateforme digitale facilitant la mise en relation entre automobilistes et services automobiles.',
                'problem' => 'Trouver rapidement un dépanneur ou un mécanicien de confiance en cas de panne automobile.',
                'solution' => 'Une plateforme web intuitive géolocalisée permettant de mettre en relation instantanément les automobilistes.',
                'image' => '/src/assets/projects/GarageB.PNG',
                'demo' => 'https://garage-b.vercel.app/',
                'featured' => true,
                'technologies' => ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
            ],
            [
                'slug' => 'noregis-saas',
                'title' => 'Noregis SaaS',
                'category' => 'SaaS • OCR • Scan d\'Identité',
                'description' => 'Application SaaS intelligente permettant de scanner des pièces d\'identité et d\'en extraire automatiquement les données.',
                'problem' => 'La vérification manuelle des pièces d\'identité est lente et sujette aux erreurs.',
                'solution' => 'Un moteur OCR basé sur l\'IA capable de numériser et d\'extraire automatiquement les champs.',
                'image' => '/src/assets/projects/noregs.PNG',
                'demo' => 'https://noregis.vercel.app/',
                'featured' => true,
                'technologies' => ['React', 'OCR / AI Vision', 'Tailwind CSS', 'REST API'],
            ],
            [
                'slug' => 'security-app',
                'title' => 'SecurityApp',
                'category' => 'SaaS • Security • Management',
                'description' => 'Plateforme SaaS permettant aux entreprises de sécurité de gérer leurs agents, missions et interventions.',
                'problem' => 'Difficulté de centraliser le suivi des rondes et la gestion des plannings d\'agents.',
                'solution' => 'Une application SaaS complète centralisant la gestion opérationnelle et géolocalisation.',
                'image' => '/src/assets/projects/Security.PNG',
                'demo' => 'https://security-app-mauve.vercel.app/',
                'featured' => false,
                'technologies' => ['React', 'Laravel API', 'Tailwind CSS', 'Leaflet JS'],
            ],
            [
                'slug' => 'bermas-assurance',
                'title' => 'BerMas Assurance',
                'category' => 'Assurance • Business',
                'description' => 'Site professionnel présentant les services d\'une structure d\'assurance.',
                'problem' => 'Manque de visibilité en ligne et difficulté pour les prospects d\'obtenir des devis.',
                'solution' => 'Un portail web institutionnel et dynamique facilitant la présentation des formules d\'assurance.',
                'image' => '/src/assets/projects/Berma.PNG',
                'demo' => 'https://bermasss.com/',
                'featured' => false,
                'technologies' => ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL'],
            ],
        ];
        foreach ($projects as $p) {
            Project::create($p);
        }

        // 8. Seed Articles
        Article::query()->delete();
        Article::create([
            'slug' => 'les-meilleures-pratiques-devops-en-2026',
            'title' => 'Les Meilleures Pratiques DevOps & Cloud Native en 2026',
            'category' => 'DevOps',
            'excerpt' => 'Découvrez comment automatiser vos pipelines CI/CD et sécuriser vos déploiements Kubernetes avec GitOps.',
            'content' => "Le DevOps et l'architecture Cloud Native continuent d'évoluer à un rythme sans précédent. En 2026, l'automatisation intégrale, la sécurité Shift-Left (DevSecOps) et la conteneurisation légère sont devenues incontournables.\n\n### 1. Adopter le GitOps avec ArgoCD & Flux\nLe GitOps permet de déclarer l'état désiré de votre infrastructure directement dans vos dépôts Git...",
            'image' => 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
            'published' => true,
            'read_time' => '6 min',
            'views' => 142,
            'likes' => 28,
            'tags' => ['DevOps', 'Docker', 'Kubernetes', 'CI/CD'],
            'published_at' => now(),
        ]);

        Article::create([
            'slug' => 'pourquoi-laravel-et-react-forment-le-duo-parfait',
            'title' => 'Pourquoi Laravel 11 et React forment le Duo Parfait pour les SaaS',
            'category' => 'Full Stack',
            'excerpt' => 'Analyse approfondie de la combinaison d\'une API REST Laravel robuste avec un frontend React réactif.',
            'content' => "Créer une application SaaS exigeante nécessite un backend ultra-robuste et un frontend fluide et réactif.\n\nLaravel offre un écosystème exceptionnel avec Sanctum pour l'authentification API, Eloquent pour l'ORM et une gestion inégalée des files d'attente...",
            'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
            'published' => true,
            'read_time' => '5 min',
            'views' => 98,
            'likes' => 19,
            'tags' => ['Laravel', 'React', 'SaaS', 'API'],
            'published_at' => now(),
        ]);

        // 9. Seed Site Settings
        SiteSetting::query()->delete();
        SiteSetting::create([
            'key' => 'section_visibility',
            'value' => [
                'hero' => true,
                'stats' => true,
                'about' => true,
                'services' => true,
                'projects' => true,
                'impact' => true,
                'timeline' => true,
                'booking' => true,
                'blog' => true,
            ],
        ]);
    }
}
