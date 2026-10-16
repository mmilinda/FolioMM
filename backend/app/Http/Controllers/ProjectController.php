<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class ProjectController extends Controller
{
    public function index()
    {
        $this->ensureTableExists();

        try {
            // Auto-seed si la table est vide pour que l'API ne retourne jamais un tableau vide
            if (Project::query()->count() === 0) {
                $this->seedDefaultProjects();
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("Auto-seed error: " . $e->getMessage());
        }

        return response()->json(Project::orderBy('order', 'asc')->get());
    }

    public function show($idOrSlug)
    {
        $this->ensureTableExists();
        $project = Project::where('slug', $idOrSlug)->orWhere('id', $idOrSlug)->firstOrFail();
        return response()->json($project);
    }

    public function store(Request $request)
    {
        $this->ensureTableExists();
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $data = $this->formatProjectData($request);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($request->title) ?: ('project-' . time());
        }

        // Si un projet existe déjà avec ce slug, mise à jour (upsert)
        $existing = Project::where('slug', $data['slug'])->first();
        if ($existing) {
            $existing->update($data);
            return response()->json($existing, 200);
        }

        $project = Project::create($data);
        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $this->ensureTableExists();
        // Recherche par ID ou par slug
        $project = Project::where('id', $id)->orWhere('slug', $id)->first();
        
        $data = $this->formatProjectData($request, $project);

        if ($project) {
            $project->update($data);
        } else {
            // Upsert si le projet n'existe pas encore en base
            if (empty($data['slug'])) {
                $data['slug'] = is_numeric($id) ? ('project-' . $id) : Str::slug($id);
            }
            $project = Project::create($data);
        }

        return response()->json($project);
    }

    public function destroy($id)
    {
        $this->ensureTableExists();
        $project = Project::where('id', $id)->orWhere('slug', $id)->first();
        if ($project) {
            $project->delete();
        }

        return response()->json([
            'message' => 'Projet supprimé avec succès'
        ]);
    }

    public function sync(Request $request)
    {
        try {
            $this->ensureTableExists();

            $request->validate([
                'projects' => 'required|array',
            ]);

            $incoming = $request->input('projects');

            foreach ($incoming as $index => $item) {
                $slug = $item['slug'] ?? (!empty($item['title']) ? Str::slug($item['title']) : null);
                $id = $item['id'] ?? null;

                $project = null;
                if ($id && is_numeric($id)) {
                    $project = Project::find($id);
                }
                if (!$project && $slug) {
                    $project = Project::where('slug', $slug)->first();
                }

                $data = [
                    'title' => $item['title'] ?? ($project?->title ?? 'Sans titre'),
                    'title_en' => $item['title_en'] ?? $item['titleEn'] ?? $item['title'] ?? ($project?->title_en ?? ''),
                    'slug' => $slug ?? ($project?->slug ?? ('project-' . ($index + 1))),
                    'category' => $item['category'] ?? ($project?->category ?? 'Full Stack'),
                    'category_en' => $item['category_en'] ?? $item['categoryEn'] ?? $item['category'] ?? ($project?->category_en ?? ''),
                    'year' => $item['year'] ?? ($project?->year ?? '2026'),
                    'status' => $item['status'] ?? ($project?->status ?? 'Production'),
                    'status_en' => $item['status_en'] ?? $item['statusEn'] ?? ($project?->status_en ?? 'Production'),
                    'client' => $item['client'] ?? ($project?->client ?? ''),
                    'client_en' => $item['client_en'] ?? $item['clientEn'] ?? ($project?->client_en ?? ''),
                    'role' => $item['role'] ?? ($project?->role ?? ''),
                    'role_en' => $item['role_en'] ?? $item['roleEn'] ?? ($project?->role_en ?? ''),
                    'description' => $item['description'] ?? ($project?->description ?? ''),
                    'description_en' => $item['description_en'] ?? $item['descriptionEn'] ?? ($project?->description_en ?? ''),
                    'problem' => $item['problem'] ?? ($project?->problem ?? ''),
                    'problem_en' => $item['problem_en'] ?? $item['problemEn'] ?? ($project?->problem_en ?? ''),
                    'solution' => $item['solution'] ?? ($project?->solution ?? ''),
                    'solution_en' => $item['solution_en'] ?? $item['solutionEn'] ?? ($project?->solution_en ?? ''),
                    'impact' => $item['impact'] ?? ($project?->impact ?? ''),
                    'impact_en' => $item['impact_en'] ?? $item['impactEn'] ?? ($project?->impact_en ?? ''),
                    'demo' => $item['demo'] ?? ($project?->demo ?? ''),
                    'github' => $item['github'] ?? ($project?->github ?? ''),
                    'featured' => filter_var($item['featured'] ?? false, FILTER_VALIDATE_BOOLEAN),
                    'hidden' => filter_var($item['hidden'] ?? false, FILTER_VALIDATE_BOOLEAN),
                    'is_private' => filter_var($item['is_private'] ?? $item['isPrivate'] ?? false, FILTER_VALIDATE_BOOLEAN),
                    'order' => isset($item['order']) ? (int)$item['order'] : $index,
                ];

                if (!empty($item['image'])) {
                    $data['image'] = $item['image'];
                }
                if (!empty($item['fallback_image']) || !empty($item['fallbackImage'])) {
                    $data['fallback_image'] = $item['fallback_image'] ?? $item['fallbackImage'];
                }
                if (isset($item['technologies'])) {
                    $data['technologies'] = is_array($item['technologies']) 
                        ? $item['technologies'] 
                        : array_filter(array_map('trim', explode(',', (string)$item['technologies'])));
                }

                if ($project) {
                    $project->update($data);
                } else {
                    Project::create($data);
                }
            }

            return response()->json(Project::orderBy('order', 'asc')->get());
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error("Project sync error: " . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ], 500);
        }
    }

    private function ensureTableExists(): void
    {
        try {
            if (!Schema::hasTable('projects')) {
                Schema::create('projects', function (Blueprint $table) {
                    $table->id();
                    $table->string('slug')->unique()->nullable();
                    $table->string('title');
                    $table->string('title_en')->nullable();
                    $table->string('category')->default('Full Stack');
                    $table->string('category_en')->nullable();
                    $table->string('year')->nullable()->default('2026');
                    $table->string('status')->nullable()->default('Production');
                    $table->string('status_en')->nullable()->default('Production');
                    $table->string('client')->nullable();
                    $table->string('client_en')->nullable();
                    $table->string('role')->nullable();
                    $table->string('role_en')->nullable();
                    $table->text('description')->nullable();
                    $table->text('description_en')->nullable();
                    $table->text('full_desc')->nullable();
                    $table->text('problem')->nullable();
                    $table->text('problem_en')->nullable();
                    $table->text('solution')->nullable();
                    $table->text('solution_en')->nullable();
                    $table->text('impact')->nullable();
                    $table->text('impact_en')->nullable();
                    $table->text('image')->nullable();
                    $table->text('fallback_image')->nullable();
                    $table->text('architecture_diagram')->nullable();
                    $table->string('demo')->nullable();
                    $table->string('github')->nullable();
                    $table->boolean('featured')->default(false);
                    $table->boolean('hidden')->default(false);
                    $table->boolean('is_private')->default(false);
                    $table->integer('order')->default(0);
                    $table->json('technologies')->nullable();
                    $table->json('highlights')->nullable();
                    $table->json('metrics')->nullable();
                    $table->json('architecture_details')->nullable();
                    $table->timestamps();
                });
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("ensureTableExists: " . $e->getMessage());
        }
    }

    private function formatProjectData(Request $request, ?Project $existing = null): array
    {
        $data = $request->all();

        $mappings = [
            'titleEn' => 'title_en',
            'categoryEn' => 'category_en',
            'descriptionEn' => 'description_en',
            'problemEn' => 'problem_en',
            'solutionEn' => 'solution_en',
            'impactEn' => 'impact_en',
            'clientEn' => 'client_en',
            'roleEn' => 'role_en',
            'statusEn' => 'status_en',
            'isPrivate' => 'is_private',
            'fallbackImage' => 'fallback_image',
            'architectureDiagram' => 'architecture_diagram',
            'architectureDetails' => 'architecture_details',
        ];

        foreach ($mappings as $camel => $snake) {
            if ($request->has($camel) && !$request->has($snake)) {
                $data[$snake] = $request->input($camel);
            }
        }

        // Upload de l'image principale
        $imageFile = $request->file('image_file') ?? $request->file('image');
        if ($imageFile) {
            $mime = $imageFile->getMimeType();
            $base64 = base64_encode(file_get_contents($imageFile->getRealPath()));
            // Base64 data URI est conservé dans PostgreSQL et survit aux redémarrages de Render
            $data['image'] = "data:{$mime};base64,{$base64}";
            try {
                $filename = Str::random(20) . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->storeAs('public/projects', $filename);
            } catch (\Throwable $e) {}
        } elseif ($existing && empty($data['image'])) {
            $data['image'] = $existing->image;
        }

        // Upload schéma architecture
        $archFile = $request->file('architecture_diagram_file') ?? $request->file('architecture_diagram');
        if ($archFile) {
            $mime = $archFile->getMimeType();
            $base64 = base64_encode(file_get_contents($archFile->getRealPath()));
            $data['architecture_diagram'] = "data:{$mime};base64,{$base64}";
        } elseif ($existing && empty($data['architecture_diagram'])) {
            $data['architecture_diagram'] = $existing->architecture_diagram;
        }

        // Gestion des technologies JSON
        if (isset($data['technologies']) && is_string($data['technologies'])) {
            $decoded = json_decode($data['technologies'], true);
            $data['technologies'] = is_array($decoded) ? $decoded : array_filter(array_map('trim', explode(',', $data['technologies'])));
        }

        return $data;
    }

    private function seedDefaultProjects(): void
    {
        $defaultProjects = [
            [
                'slug' => 'agri-chain-ai',
                'title' => 'AgriChain AI',
                'title_en' => 'AgriChain AI',
                'featured' => true,
                'year' => '2026',
                'status' => 'Prototype',
                'status_en' => 'Prototype',
                'client' => 'Projet personnel',
                'client_en' => 'Personal Project',
                'role' => 'Développeuse Full Stack & Architecte IA',
                'role_en' => 'Full Stack & AI Architect',
                'category' => 'AI • Agriculture • Blockchain',
                'category_en' => 'AI • Agriculture • Blockchain',
                'image' => '/images/projects/AgriChain.PNG',
                'description' => 'Plateforme intelligente dédiée au secteur agricole combinant intelligence artificielle, données agricoles et technologies blockchain afin d\'améliorer la prise de décision des producteurs.',
                'description_en' => 'Smart platform for the agricultural sector combining artificial intelligence, farm metrics, and blockchain technology to empower farmers with data-driven decision making.',
                'problem' => 'Les agriculteurs et producteurs manquent d\'accès direct et rapide à des données météorologiques, d\'analyses de sols et d\'indicateurs de marché fiables pour optimiser leurs récoltes.',
                'problem_en' => 'Farmers lack direct access to real-time weather metrics, soil analysis, and reliable market prices to optimize their crop yield.',
                'solution' => 'Une plateforme SaaS intelligente intégrant des algorithmes d\'IA pour l\'analyse prédictive agricole et la traçabilité des données sur blockchain.',
                'solution_en' => 'A smart SaaS platform leveraging AI for predictive agricultural analytics and blockchain technology for data transparency.',
                'technologies' => ['React', 'JavaScript', 'Tailwind CSS', 'AI / Node.js'],
                'impact' => 'Innovation digitale agricole orientée Afrique.',
                'impact_en' => 'Digital agricultural innovation tailored for Africa.',
                'demo' => 'https://agri-tech-puce.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 1,
            ],
            [
                'slug' => 'nc-collection-e-commerce',
                'title' => 'NC Collection',
                'title_en' => 'NC Collection',
                'featured' => false,
                'year' => '2026',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'NC Collection',
                'client_en' => 'NC Collection',
                'role' => 'Développeuse Full Stack E-Commerce',
                'role_en' => 'Full Stack E-Commerce Developer',
                'category' => 'E-Commerce • Mode & Accessoires',
                'category_en' => 'E-Commerce • Fashion & Accessories',
                'image' => '/images/projects/nc_collection.png',
                'description' => 'Boutique en ligne moderne dédiée à la vente de vêtements, chaussures et accessoires de mode avec expérience d\'achat fluide, paiement Wave & Orange Money et suivi de commande.',
                'description_en' => 'Modern e-commerce platform for selling clothing, shoes, and fashion accessories with seamless checkout, local mobile payments (Wave & Orange Money), and order tracking.',
                'problem' => 'Proposer une plateforme de vente en ligne élégante, rapide et adaptée aux modes de paiement locaux pour une marque de mode au Sénégal.',
                'problem_en' => 'Delivering a premium, mobile-first e-commerce shopping experience for fashion retail in Senegal with local mobile payments and express delivery.',
                'solution' => 'Une boutique en ligne réactive et complète comprenant un catalogue interactif par catégories, un outil Mix & Match, le paiement Wave/Orange Money et la livraison express 24h.',
                'solution_en' => 'An elegant online store featuring category filtering, a Mix & Match outfit creator, integrated Wave and Orange Money checkout, and 24h express delivery.',
                'technologies' => ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'REST API'],
                'impact' => 'Digitalisation de la vente de vêtements et accessoires avec expérience d\'achat haut de gamme.',
                'impact_en' => 'Digital transformation of fashion retail with seamless mobile payments.',
                'demo' => 'https://nc-ebon.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 2,
            ],
            [
                'slug' => 'garagebi-assistance',
                'title' => 'Garagebi Assistance',
                'title_en' => 'Garagebi Assistance',
                'featured' => true,
                'year' => '2026',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'Projet professionnel',
                'client_en' => 'Professional Project',
                'role' => 'Développeuse Front-End React & UI Integrator',
                'role_en' => 'React Front-End & UI Developer',
                'category' => 'Automobile • Service Digital',
                'category_en' => 'Automotive • Digital Service',
                'image' => '/images/projects/GarageB.PNG',
                'description' => 'Plateforme digitale facilitant la mise en relation entre automobilistes et services automobiles.',
                'description_en' => 'Digital platform connecting drivers with certified automotive repair services and roadside assistance.',
                'problem' => 'Trouver rapidement un dépanneur ou un mécanicien de confiance en cas de panne automobile sur la route est souvent difficile, opaque et prend du temps.',
                'problem_en' => 'Finding trustworthy roadside mechanics or emergency towing services on demand is complex, unorganized, and time-consuming for drivers.',
                'solution' => 'Une plateforme web intuitive géolocalisée permettant de mettre en relation instantanément les automobilistes en détresse avec des professionnels agréés.',
                'solution_en' => 'An intuitive geolocation web platform connecting stranded drivers directly with verified repair shops and roadside service providers.',
                'technologies' => ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
                'impact' => 'Amélioration de l\'expérience utilisateur automobile.',
                'impact_en' => 'Elevating the automotive roadside assistance experience.',
                'demo' => 'https://garage-b.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 3,
            ],
            [
                'slug' => 'noregis-saas',
                'title' => 'Noregis SaaS',
                'title_en' => 'Noregis SaaS',
                'featured' => true,
                'year' => '2026',
                'status' => 'Prototype',
                'status_en' => 'Prototype',
                'client' => 'Projet personnel',
                'client_en' => 'Personal Project',
                'role' => 'Développeuse Full Stack & Ingénieure OCR',
                'role_en' => 'Full Stack & OCR Engineer',
                'category' => 'SaaS • OCR • Scan d\'Identité',
                'category_en' => 'SaaS • OCR • Identity Scan',
                'image' => '/images/projects/noregi_ocr.jpg',
                'description' => 'Application SaaS intelligente permettant de scanner des pièces d\'identité (CIN, passeport, permis de conduire, carte grise...) et d\'en extraire automatiquement les données.',
                'description_en' => 'Smart SaaS scanner application extracting data from identity documents (national IDs, passports, driver\'s licenses, registration cards, etc.).',
                'problem' => 'La vérification et saisie manuelle des informations sur les pièces d\'identité est une tâche lente, sujette aux erreurs d\'encodage et freine l\'intégration de nouveaux utilisateurs.',
                'problem_en' => 'Manual identity document data entry (ID cards, passports, driver\'s licenses) is slow, error-prone, and causes friction during customer onboarding.',
                'solution' => 'Un moteur OCR basé sur l\'IA capable de numériser, détecter et extraire automatiquement les champs pertinents en quelques secondes.',
                'solution_en' => 'An AI-powered OCR scanning engine that automatically recognizes, captures, and structures identity fields in seconds.',
                'technologies' => ['React', 'OCR / AI Vision', 'Tailwind CSS', 'REST API'],
                'impact' => 'Saisie automatisée et sécurisée des pièces d\'identité en quelques secondes.',
                'impact_en' => 'Automated, secure identity verification within seconds.',
                'demo' => 'https://noregis.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 4,
            ],
            [
                'slug' => 'security-app',
                'title' => 'SecurityApp',
                'title_en' => 'SecurityApp',
                'featured' => false,
                'year' => '2026',
                'status' => 'Prototype',
                'status_en' => 'Prototype',
                'client' => 'Projet personnel',
                'client_en' => 'Personal Project',
                'role' => 'Développeuse Full Stack & API Engineer',
                'role_en' => 'Full Stack & API Engineer',
                'category' => 'SaaS • Security • Management',
                'category_en' => 'SaaS • Security • Management',
                'image' => '/images/projects/Security.PNG',
                'description' => 'Plateforme SaaS permettant aux entreprises de sécurité de gérer leurs agents, missions, rendez-vous et interventions.',
                'description_en' => 'SaaS platform enabling security firms to manage field agents, patrol missions, scheduling, and emergency alerts.',
                'problem' => 'Les entreprises de gardiennage et de sécurité peinent à centraliser le suivi des rondes, la gestion des plannings d\'agents et les alertes d\'intervention en temps réel.',
                'problem_en' => 'Security agencies struggle with fragmented tools to manage patrol schedules, agent dispatches, and emergency incident reporting.',
                'solution' => 'Une application SaaS complète centralisant la gestion opérationnelle, les plannings d\'agents, la géolocalisation et les notifications d\'incidents.',
                'solution_en' => 'A unified SaaS operations hub providing real-time agent tracking, patrol dispatching, shift scheduling, and incident reporting.',
                'technologies' => ['React', 'Laravel API', 'Tailwind CSS', 'Leaflet JS'],
                'impact' => 'Digitalisation des opérations des entreprises de sécurité.',
                'impact_en' => 'Digital transformation of security operations.',
                'demo' => 'https://security-app-mauve.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 5,
            ],
            [
                'slug' => 'bermas-assurance',
                'title' => 'BerMas Assurance',
                'title_en' => 'BerMas Insurance',
                'featured' => false,
                'year' => '2026',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'BerMas',
                'client_en' => 'BerMas',
                'role' => 'Développeuse Web Full Stack Laravel',
                'role_en' => 'Laravel Full Stack Web Developer',
                'category' => 'Assurance • Business',
                'category_en' => 'Insurance • Business',
                'image' => '/images/projects/Berma.PNG',
                'description' => 'Site professionnel présentant les services d\'une structure d\'assurance.',
                'description_en' => 'Corporate showcase website detailing insurance products, policy quotes, and client support.',
                'problem' => 'Manque de visibilité en ligne et difficulté pour les prospects d\'obtenir rapidement des devis clairs et d\'accéder aux offres de souscription d\'assurance.',
                'problem_en' => 'Insurance prospects face complex policy discovery, lack of online quote simulators, and slow response times from traditional brokers.',
                'solution' => 'Un portail web institutionnel et dynamique facilitant la présentation des formules d\'assurance, les demandes de devis et la mise en relation commerciale.',
                'solution_en' => 'A modern corporate insurance platform featuring interactive quote requests, policy showcases, and streamlined customer inquiries.',
                'technologies' => ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL'],
                'impact' => 'Renforcement de la présence digitale de l\'entreprise.',
                'impact_en' => 'Strengthening digital brand awareness and online client onboarding.',
                'demo' => 'https://bermasss.com/',
                'github' => null,
                'is_private' => true,
                'order' => 6,
            ],
            [
                'slug' => 'sunu-champion',
                'title' => 'Sunu Champion',
                'title_en' => 'Sunu Champion',
                'featured' => false,
                'year' => '2026',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'Projet professionnel',
                'client_en' => 'Professional Project',
                'role' => 'Développeuse Front-End React & UI/UX',
                'role_en' => 'React Front-End & UI/UX Developer',
                'category' => 'Web Platform • Sports',
                'category_en' => 'Web Platform • Sports',
                'image' => '/images/projects/sunuchampion.PNG',
                'description' => 'Plateforme web moderne proposant une expérience utilisateur optimisée pour le suivi sportif.',
                'description_en' => 'Modern web sports portal delivering tournament standings, team statistics, and athlete profiles.',
                'problem' => 'L\'accès aux classements, calendriers de matchs et actualités sportives locales reste souvent éparpillé et difficile à suivre pour les passionnés.',
                'problem_en' => 'Sports fans struggle to find centralized, real-time updates for local tournaments, team standings, and match schedules.',
                'solution' => 'Une plateforme web moderne et réactive offrant une expérience interactive complète avec classements en direct, fiches équipes et calendriers.',
                'solution_en' => 'A sleek, responsive sports portal offering real-time tournament standings, team profiles, and live schedule updates.',
                'technologies' => ['React', 'CSS', 'JavaScript'],
                'impact' => 'Création d\'une interface web moderne et immersive.',
                'impact_en' => 'Crafting an engaging sports fan portal.',
                'demo' => 'https://sunuchampion.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 7,
            ],
            [
                'slug' => 'afriaccess',
                'title' => 'AfriAccess',
                'title_en' => 'AfriAccess',
                'featured' => false,
                'year' => '2026',
                'status' => 'Prototype',
                'status_en' => 'Prototype',
                'client' => 'Projet personnel',
                'client_en' => 'Personal Project',
                'role' => 'Développeuse Front-End & Product Builder',
                'role_en' => 'Front-End Developer & Product Builder',
                'category' => 'Identity • Digital Solution',
                'category_en' => 'Identity • Digital Solution',
                'image' => '/images/projects/afriaccess.PNG',
                'description' => 'Solution numérique destinée à améliorer les processus de gestion d\'identité.',
                'description_en' => 'Digital identity management and visitor badge processing solution tailored for access control workflows.',
                'problem' => 'Les procédures de contrôle et de vérification d\'accès physique sur les sites sensibles génèrent des files d\'attente et des failles d\'enregistrement.',
                'problem_en' => 'Manual identity verification at facility checkpoints causes long queues and registration vulnerabilities.',
                'solution' => 'Une interface web rapide permettant de scanner, vérifier et consigner en temps réel les accès de visiteurs avec historique sécurisé.',
                'solution_en' => 'A fast verification portal registering visitor credentials and logging facility entry in real time.',
                'technologies' => ['React', 'CSS', 'JavaScript'],
                'impact' => 'Optimisation des processus d\'identification digitale.',
                'impact_en' => 'Streamlining digital identity access verification.',
                'demo' => 'https://afriaccess.vercel.app/',
                'github' => null,
                'is_private' => true,
                'order' => 8,
            ],
            [
                'slug' => 'location-appartement',
                'title' => 'Location Appartement',
                'title_en' => 'Apartment Rental Platform',
                'featured' => false,
                'year' => '2025',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'Projet client',
                'client_en' => 'Client Project',
                'role' => 'Développeuse Web Full Stack',
                'role_en' => 'Full Stack Web Developer',
                'category' => 'Real Estate • Web Platform',
                'category_en' => 'Real Estate • Web Platform',
                'image' => '/images/projects/LAppartement.PNG',
                'description' => 'Application web complète de gestion et publication d\'annonces immobilières.',
                'description_en' => 'Real estate platform featuring rental property listings, schedule bookings, and landlord inquiries.',
                'problem' => 'La recherche et réservation de logements meublés manque de transparence et de filtres intuitifs pour les locataires.',
                'problem_en' => 'Prospective tenants face unverified rental listings and friction in contacting landlords.',
                'solution' => 'Une plateforme ergonomique avec catalogue dynamique, galerie photos, géolocalisation et prise de rendez-vous en ligne.',
                'solution_en' => 'An intuitive apartment rental hub featuring dynamic filtering, image galleries, and direct tour booking.',
                'technologies' => ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
                'impact' => 'Digitalisation de la recherche immobilière.',
                'impact_en' => 'Digitizing property searches and rental bookings.',
                'demo' => '#',
                'github' => null,
                'is_private' => true,
                'order' => 9,
            ],
            [
                'slug' => 'site-zawiya',
                'title' => 'Site Zawiya',
                'title_en' => 'Zawiya Platform',
                'featured' => false,
                'year' => '2025',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'Projet client',
                'client_en' => 'Client Project',
                'role' => 'Développeuse Web & Intégratrice',
                'role_en' => 'Web Developer & CMS Integrator',
                'category' => 'Web Platform • Community',
                'category_en' => 'Web Platform • Community',
                'image' => '/images/projects/zawiya.PNG',
                'description' => 'Portail web institutionnel et culturel présentant les activités de la communauté Zawiya.',
                'description_en' => 'Community and institutional web portal showcasing initiatives, cultural events, and spiritual publications.',
                'problem' => 'Nécessité de moderniser la présence en ligne d\'une grande communauté avec un accès facile aux événements et documents.',
                'problem_en' => 'Need for a centralized digital presence to coordinate community events and publish educational resources.',
                'solution' => 'Un site web moderne et accessible avec gestion de contenus, annonces d\'événements et design responsive.',
                'solution_en' => 'A responsive institutional web portal with event schedules, publication libraries, and announcements.',
                'technologies' => ['WordPress', 'PHP', 'HTML5', 'CSS3', 'SEO'],
                'impact' => 'Amélioration de la communication digitale communautaire.',
                'impact_en' => 'Modernizing digital communication for community engagement.',
                'demo' => 'https://www.zawiya.defarsci.fr/',
                'github' => null,
                'is_private' => true,
                'order' => 10,
            ],
            [
                'slug' => 'cv-video',
                'title' => 'CV Vidéo — Plateforme de Candidatures',
                'title_en' => 'Video Resume Platform',
                'featured' => false,
                'year' => '2025',
                'status' => 'Prototype',
                'status_en' => 'Prototype',
                'client' => 'Projet d\'innovation',
                'client_en' => 'Innovation Project',
                'role' => 'Développeuse Full Stack',
                'role_en' => 'Full Stack Developer',
                'category' => 'HR Tech • Video • Innovation',
                'category_en' => 'HR Tech • Video • Innovation',
                'image' => '/images/projects/cv-video.jpg',
                'description' => 'Application web interactive permettant aux candidats d\'enregistrer et de partager des pitchs vidéo professionnels.',
                'description_en' => 'Interactive HR tech platform enabling candidates to record, polish, and submit video elevator pitches to recruiters.',
                'problem' => 'Les CV papier traditionnels peinent à mettre en valeur la personnalité, l\'expression et le dynamisme des candidats.',
                'problem_en' => 'Traditional resumes fail to showcase interpersonal communication, personality, and spoken articulation.',
                'solution' => 'Une plateforme de création et partage de pitchs vidéo avec minuteur intégré et génération de liens sécurisés pour recruteurs.',
                'solution_en' => 'A video resume recording platform with teleprompter features and shareable candidate portfolios.',
                'technologies' => ['React', 'WebRTC', 'Node.js', 'Tailwind CSS'],
                'impact' => 'Humanisation du processus de recrutement par la vidéo.',
                'impact_en' => 'Humanizing candidate recruitment through video technology.',
                'demo' => '#',
                'github' => null,
                'is_private' => true,
                'order' => 11,
            ],
            [
                'slug' => 'site-vitrine-bootstrap',
                'title' => 'Site Vitrine Bootstrap',
                'title_en' => 'Bootstrap Business Showcase',
                'featured' => false,
                'year' => '2024',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'Projet professionnel',
                'client_en' => 'Professional Project',
                'role' => 'Intégratrice Web Responsive',
                'role_en' => 'Responsive Web Integrator',
                'category' => 'Web Design • Showcase',
                'category_en' => 'Web Design • Showcase',
                'image' => '/images/projects/BoostrapSite.PNG',
                'description' => 'Site vitrine responsive développé avec Bootstrap 5 pour présenter les prestations d\'une entreprise.',
                'description_en' => 'Responsive corporate showcase portal engineered with Bootstrap 5 delivering smooth cross-browser navigation.',
                'problem' => 'Une entreprise locale manquait d\'une vitrine digitale moderne pour valoriser son offre de services.',
                'problem_en' => 'A local firm lacked an online storefront to display service offerings and accept inquiries.',
                'solution' => 'Intégration d\'une vitrine web ultra-rapide avec design responsive, sections de présentation et formulaire de contact interactif.',
                'solution_en' => 'Engineered a lightweight, mobile-first showcase website with clear call-to-actions and interactive forms.',
                'technologies' => ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript'],
                'impact' => 'Création rapide d\'une présence digitale professionnelle.',
                'impact_en' => 'Rapid launch of a professional corporate web presence.',
                'demo' => 'https://site-bootstrap-six.vercel.app/',
                'github' => 'https://github.com/mmilinda/site-bootstrap',
                'is_private' => false,
                'order' => 12,
            ],
            [
                'slug' => 'tech-blog-plateforme',
                'title' => 'Tech Blog & Publications',
                'title_en' => 'Tech Blog Platform',
                'featured' => false,
                'year' => '2024',
                'status' => 'Production',
                'status_en' => 'Production',
                'client' => 'Projet personnel',
                'client_en' => 'Personal Project',
                'role' => 'Développeuse Front-End & Auteure',
                'role_en' => 'Front-End Developer & Writer',
                'category' => 'Content • DevOps • Articles',
                'category_en' => 'Content • DevOps • Articles',
                'image' => '/images/projects/blog.PNG',
                'description' => 'Espace de publication technique et de partage de connaissances sur les bonnes pratiques de développement et DevOps.',
                'description_en' => 'Technical publishing blog covering software architecture, modern development, and DevOps best practices.',
                'problem' => 'Partager et vulgariser des retours d\'expérience techniques sur des projets complexes auprès de la communauté.',
                'problem_en' => 'Documenting practical DevOps architecture insights and code walk-throughs for developers.',
                'solution' => 'Un blog moderne avec recherche en direct, filtrage par tags, estimation du temps de lecture et mode bilingue.',
                'solution_en' => 'A modern tech blog featuring instant search, tag filtering, reading time calculation, and bilingual content.',
                'technologies' => ['React', 'Markdown', 'Tailwind CSS', 'Vite'],
                'impact' => 'Partage d\'expertise et valorisation de la veille technique.',
                'impact_en' => 'Knowledge sharing and active technical mentoring.',
                'demo' => '#',
                'github' => null,
                'is_private' => true,
                'order' => 13,
            ],
            [
                'slug' => 'guide-itineraire-bus',
                'title' => 'Guide Itinéraire — Transit Urbain',
                'title_en' => 'Urban Transit Route Guide',
                'featured' => false,
                'year' => '2023',
                'status' => 'Projet Académique',
                'status_en' => 'Academic Project',
                'client' => 'Projet académique',
                'client_en' => 'Academic Project',
                'role' => 'Développeuse Web Mobile',
                'role_en' => 'Mobile Web Developer',
                'category' => 'Transport • Mobile Web',
                'category_en' => 'Transport • Mobile Web',
                'image' => '/images/projects/JqueryProject.PNG',
                'description' => 'Application web mobile permettant aux usagers de planifier leurs déplacements en transport en commun.',
                'description_en' => 'Mobile web transit assistant helping city commuters plan optimal bus itineraries with interactive maps.',
                'problem' => 'Les usagers des transports urbains rencontrent des difficultés pour planifier leurs trajets.',
                'problem_en' => 'Urban commuters struggle to quickly navigate bus routes and calculate efficient travel itineraries.',
                'solution' => 'Une application web mobile développée avec jQuery Mobile et Google Maps API pour rechercher des itinéraires.',
                'solution_en' => 'A mobile web transit guide built with jQuery Mobile and Google Maps API to search routes and navigate urban transit.',
                'technologies' => ['jQuery Mobile', 'JavaScript', 'HTML5', 'CSS3', 'Google Maps API'],
                'impact' => 'Facilitation de l\'accès aux informations de déplacement.',
                'impact_en' => 'Simplifying urban travel navigation and route planning.',
                'demo' => 'https://jquerry-bus.vercel.app/',
                'github' => 'https://github.com/mmilinda/jquerry-bus',
                'is_private' => false,
                'order' => 14,
            ],
            [
                'slug' => 'site-statique-voyage-2',
                'title' => 'Voyage 2 — Site Statique',
                'title_en' => 'Travel 2 — Static Site',
                'featured' => false,
                'year' => '2021',
                'status' => 'Projet de Groupe',
                'status_en' => 'Group Project',
                'client' => 'Projet académique',
                'client_en' => 'Academic Project',
                'role' => 'Intégratrice Web',
                'role_en' => 'Web Integrator',
                'category' => 'Web Design',
                'category_en' => 'Web Design',
                'image' => '/images/projects/voyage2.PNG',
                'description' => 'Site web statique de présentation touristique et de voyage réalisé en projet de groupe de formation en 2021.',
                'description_en' => 'Static tourism and travel website designed as a collaborative team project during studies.',
                'problem' => 'Manque de présentations visuelles immersives et interactives pour promouvoir les destinations touristiques.',
                'problem_en' => 'Traditional travel brochures lack interactive visual appeal and immersive digital layouts for prospective travelers.',
                'solution' => 'Un site touristique dynamique et responsive conçu en projet collaboratif présentant des itinéraires de voyage et galeries.',
                'solution_en' => 'A collaborative, visually rich static tourism website showcasing destination highlights and travel itineraries.',
                'technologies' => ['HTML5', 'CSS3', 'JavaScript', 'FontAwesome'],
                'impact' => 'Projet collaboratif de conception et d\'intégration web.',
                'impact_en' => 'Collaborative web design and frontend integration project.',
                'demo' => 'https://voyage2-seven.vercel.app/',
                'github' => 'https://github.com/mmilinda/voyage2',
                'is_private' => false,
                'order' => 15,
            ],
        ];

        foreach ($defaultProjects as $p) {
            try {
                Project::create($p);
            } catch (\Throwable $e) {}
        }
    }
}