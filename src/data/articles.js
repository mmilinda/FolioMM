const staticArticles = [
  {
    id: 1,
    slug: "construire-une-architecture-devops-robuste-2026",
    title: "Construire une architecture DevOps robuste en 2026",
    titleEn: "Building a Resilient DevOps Architecture in 2026",
    date: "14 Juillet 2026",
    readTime: "8 min",
    readTimeEn: "8 min read",
    category: "DevOps",
    categoryEn: "DevOps",
    image: "/images/blog/blog-devops.jpg",
    desc: "CI/CD, Docker, Kubernetes et les bonnes pratiques pour industrialiser vos déploiements et fiabiliser vos pipelines en production.",
    descEn: "CI/CD, Docker, Kubernetes, and industry best practices for scaling deployments and securing production pipelines.",
    tags: ["Docker", "K8s", "CI/CD", "DevOps"],
    color: "#38bdf8",
    author: {
      name: "Milinda Mendy",
      role: "Développeuse Full Stack & DevOps",
      roleEn: "Full Stack & DevOps Engineer",
      avatar: "/images/profile/MM.png",
    },
    sections: [
      {
        type: "intro",
        text: "En 2026, l'ingénierie logicielle ne se limite plus à écrire du code fonctionnel. Elle exige de garantir une livraison continue, sécurisée et haute disponibilité en production. Les architectures DevOps modernes doivent répondre à des défis stratégiques : automatisation totale, scalabilité dynamique, observabilité avancée et souveraineté de l'infrastructure."
      },
      {
        type: "key_takeaway",
        title: "Points clés de l'article",
        items: [
          "Optimiser les builds Docker multi-stages pour réduire la taille des images de 95%",
          "Structurer un cluster Kubernetes résilient avec Ingress Controller et Auto-scaling (HPA)",
          "Mettre en place un pipeline CI/CD zero-downtime avec vérification de santé",
          "Centraliser les métriques et logs avec Prometheus, Grafana et OpenTelemetry"
        ]
      },
      {
        type: "heading",
        title: "1. Conteneurisation optimisée avec Docker"
      },
      {
        type: "paragraph",
        text: "L'une des erreurs les plus fréquentes en production est d'embarquer des outils de développement ou des dépendances inutiles dans les images finales. L'approche Multi-Stage Build permet d'isoler la phase de compilation de la phase d'exécution."
      },
      {
        type: "code",
        language: "dockerfile",
        filename: "Dockerfile.production",
        code: `# Étape 1 : Construction
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 : Image d'exécution minimale
FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        type: "paragraph",
        text: "Grâce à cette séparation, la taille de l'image passe de plus de 1 Go à seulement 30 Mo. Cela réduit drastiquement le temps de déploiement (image pull) et améliore considérablement le niveau de sécurité en éliminant les vulnérabilités inutiles."
      },
      {
        type: "heading",
        title: "2. Orchestration et résilience sur Kubernetes"
      },
      {
        type: "paragraph",
        text: "Kubernetes demeure le standard incontournable pour piloter des microservices à grande échelle. Pour garantir une disponibilité continue sans interruption de service :"
      },
      {
        type: "list",
        items: [
          "Définissez systématiquement des Liveness et Readiness Probes adaptées à votre application.",
          "Configurez des limites strictes de ressources CPU et mémoire (Requests & Limits).",
          "Mettez en place un Horizontal Pod Autoscaler (HPA) basé sur le trafic réel."
        ]
      },
      {
        type: "quote",
        author: "Milinda Mendy",
        text: "Un pipeline CI/CD efficace n'est pas seulement un canal de livraison rapide, c'est avant tout votre premier garde-fou contre les régressions et les pannes en production."
      },
      {
        type: "heading",
        title: "3. Automatisation CI/CD et déploiement Zero-Downtime"
      },
      {
        type: "paragraph",
        text: "En combinant GitHub Actions ou GitLab CI avec des stratégies de déploiement Rolling Update ou Blue/Green, chaque push sur la branche principale déclenche une suite automatisée de tests, de scans de vulnérabilités et un déploiement fluide."
      },
      {
        type: "conclusion",
        title: "Conclusion",
        text: "Industrialiser sa chaîne de valeur DevOps demande un investissement initial méthodique, mais garantit une agilité, une sécurité et une paix d'esprit inégalées pour l'équipe technique et l'entreprise."
      }
    ],
    sectionsEn: [
      {
        type: "intro",
        text: "In 2026, software engineering goes far beyond writing functional code. It demands continuous, secure, and highly available production delivery. Modern DevOps architectures must solve strategic challenges: total automation, dynamic elasticity, telemetry observability, and infrastructure security."
      },
      {
        type: "key_takeaway",
        title: "Key Takeaways",
        items: [
          "Optimize multi-stage Docker builds to reduce image footprint by 95%",
          "Architect resilient Kubernetes clusters with Ingress Controllers & HPA auto-scaling",
          "Deploy zero-downtime CI/CD pipelines backed by automated health probes",
          "Centralize metrics & logs using Prometheus, Grafana, and OpenTelemetry"
        ]
      },
      {
        type: "heading",
        title: "1. Optimized Containerization with Docker"
      },
      {
        type: "paragraph",
        text: "One of the most frequent production mistakes is packing dev toolchains and unnecessary dependencies into production containers. The Multi-Stage Build approach isolates compilation artifacts from runtime execution."
      },
      {
        type: "code",
        language: "dockerfile",
        filename: "Dockerfile.production",
        code: `# Stage 1: Build phase
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal runtime image
FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        type: "paragraph",
        text: "Through this separation, container image size drops from over 1 GB down to just 30 MB. This accelerates image pulling during auto-scaling and drastically shrinks the attack surface."
      },
      {
        type: "heading",
        title: "2. Kubernetes Orchestration & High Availability"
      },
      {
        type: "paragraph",
        text: "Kubernetes remains the industry standard for operating microservices at scale. To guarantee uninterrupted zero-downtime availability:"
      },
      {
        type: "list",
        items: [
          "Always define app-tailored Liveness and Readiness probes.",
          "Enforce strict CPU and memory resource requests and limits.",
          "Implement Horizontal Pod Autoscaler (HPA) policies based on real traffic metrics."
        ]
      },
      {
        type: "quote",
        author: "Milinda Mendy",
        text: "An efficient CI/CD pipeline is not just a fast delivery pipe—it is your primary defense line against production outages and regressions."
      },
      {
        type: "heading",
        title: "3. CI/CD Automation & Zero-Downtime Releases"
      },
      {
        type: "paragraph",
        text: "Combining GitHub Actions or GitLab CI with Rolling Update or Blue/Green deployment strategies ensures every commit on main triggers automated unit tests, security audits, and frictionless production deployment."
      },
      {
        type: "conclusion",
        title: "Conclusion",
        text: "Industrializing your DevOps toolchain requires initial discipline, but unlocks unprecedented agility, security, and peace of mind for engineering teams and businesses."
      }
    ]
  },
  {
    id: 2,
    slug: "ia-agriculture-retour-sur-agrichain-ai",
    title: "IA & Agriculture : retour sur AgriChain AI",
    titleEn: "AI & Agriculture: Deep Dive into AgriChain AI",
    date: "28 Juin 2026",
    readTime: "6 min",
    readTimeEn: "6 min read",
    category: "IA",
    categoryEn: "AI",
    image: "/images/blog/blog-ai-agri.jpg",
    desc: "Comment nous avons combiné intelligence artificielle et blockchain pour transformer la traçabilité agricole en Afrique.",
    descEn: "How we paired edge computer vision with blockchain smart contracts to modernize African agricultural supply chains.",
    tags: ["React", "AI", "Blockchain", "Python"],
    color: "#34d399",
    author: {
      name: "Milinda Mendy",
      role: "Développeuse Full Stack & DevOps",
      roleEn: "Full Stack & DevOps Engineer",
      avatar: "/images/profile/MM.png",
    },
    sections: [
      {
        type: "intro",
        text: "Le secteur agricole africain fait face à deux enjeux majeurs : la détection précoce des maladies des cultures et la garantie de traçabilité des produits pour les circuits d'exportation. Avec le projet AgriChain AI, nous avons relevé ce défi en mariant Computer Vision et technologie Blockchain."
      },
      {
        type: "key_takeaway",
        title: "Points forts du projet",
        items: [
          "Modèle de détection de maladies de plantes tournant à 94% de précision en Edge AI",
          "Registre décentralisé infalsifiable pour la traçabilité de la ferme au consommateur",
          "Application React PWA optimisée pour le fonctionnement hors-ligne (Offline-first)",
          "Interface adaptée aux smartphones d'entrée de gamme en zones rurales"
        ]
      },
      {
        type: "heading",
        title: "1. Détection des maladies par Computer Vision"
      },
      {
        type: "paragraph",
        text: "Grâce à un modèle convolutif (CNN) entraîné sur des milliers d'images de feuilles de maïs, manioc et arachide, l'application est capable d'identifier les symptômes de mildiou ou de chlorose en quelques millisecondes direct sur le smartphone de l'agriculteur."
      },
      {
        type: "code",
        language: "python",
        filename: "predict_disease.py",
        code: `import tensorflow as tf
import numpy as np

# Chargement du modèle optimisé TensorFlow Lite
interpreter = tf.lite.Interpreter(model_path="agri_vision_model.tflite")
interpreter.allocate_tensors()

def diagnose_plant_leaf(image_bytes):
    input_tensor = preprocess_image(image_bytes)
    interpreter.set_tensor(input_details[0]['index'], input_tensor)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]['index'])
    return get_diagnosis_label(np.argmax(predictions))`
      },
      {
        type: "heading",
        title: "2. Traçabilité transparente avec la Blockchain"
      },
      {
        type: "paragraph",
        text: "Chaque étape de la récolte (date, conditionnement, certifications bio, diagnostic IA) est inscrite sous forme de transaction signée sur un registre partagé, garantissant aux acheteurs finaux une transparence irréprochable via un simple QR Code."
      },
      {
        type: "quote",
        author: "Milinda Mendy",
        text: "Mettre la technologie de pointe au service des producteurs locaux est l'un des accomplissements les plus gratifiants de mon parcours de développeuse."
      },
      {
        type: "conclusion",
        title: "Impact & Bilan",
        text: "AgriChain AI démontre que l'association de l'IA embarquée et de la blockchain peut apporter des solutions concrètes, inclusives et durables face aux défis alimentaires mondiaux."
      }
    ],
    sectionsEn: [
      {
        type: "intro",
        text: "African agriculture faces two critical challenges: early crop disease diagnosis and transparent supply chain traceability for export markets. With AgriChain AI, we tackled these challenges by combining Edge Computer Vision with Blockchain technology."
      },
      {
        type: "key_takeaway",
        title: "Project Highlights",
        items: [
          "Edge AI crop disease detection model operating at 94% diagnostic accuracy",
          "Tamper-proof decentralized ledger tracing harvests from farm to consumer",
          "Offline-first React PWA architecture for rural connectivity environments",
          "Lightweight UI tailored for entry-level smartphones in rural areas"
        ]
      },
      {
        type: "heading",
        title: "1. Computer Vision Crop Disease Diagnosis"
      },
      {
        type: "paragraph",
        text: "Using a convolutional neural network (CNN) trained on thousands of plant leaf images (maize, cassava, groundnut), the mobile app diagnoses blight and chlorosis symptoms within milliseconds directly on the farmer's smartphone."
      },
      {
        type: "code",
        language: "python",
        filename: "predict_disease.py",
        code: `import tensorflow as tf
import numpy as np

# Load lightweight TFLite model
interpreter = tf.lite.Interpreter(model_path="agri_vision_model.tflite")
interpreter.allocate_tensors()

def diagnose_plant_leaf(image_bytes):
    input_tensor = preprocess_image(image_bytes)
    interpreter.set_tensor(input_details[0]['index'], input_tensor)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]['index'])
    return get_diagnosis_label(np.argmax(predictions))`
      },
      {
        type: "heading",
        title: "2. Immutable Blockchain Supply Chain Traceability"
      },
      {
        type: "paragraph",
        text: "Every harvest milestone (harvest timestamp, packaging, organic certification, AI diagnosis) is committed as a signed ledger transaction, giving international buyers complete transparency via a simple QR Code scan."
      },
      {
        type: "quote",
        author: "Milinda Mendy",
        text: "Placing cutting-edge technology directly in the hands of local agricultural producers is one of the most rewarding milestones of my software engineering career."
      },
      {
        type: "conclusion",
        title: "Impact & Takeaways",
        text: "AgriChain AI proves that combining embedded AI and decentralized ledgers brings concrete, inclusive, and scalable solutions to regional food security."
      }
    ]
  },
  {
    id: 3,
    slug: "laravel-react-le-duo-parfait-pour-vos-saas",
    title: "Laravel + React : le duo parfait pour vos SaaS",
    titleEn: "Laravel + React: The Ultimate Stack for Modern SaaS",
    date: "10 Mai 2026",
    readTime: "10 min",
    readTimeEn: "10 min read",
    category: "Full Stack",
    categoryEn: "Full Stack",
    image: "/images/blog/blog-laravel-react.jpg",
    desc: "Architecture, authentification Sanctum, upload Cloudinary et déploiement Vercel : guide complet pour votre prochaine plateforme.",
    descEn: "Architecture, Sanctum auth, Cloudinary uploads, and Vercel/VPS deployments: full guide for your next Web app.",
    tags: ["Laravel", "React", "SaaS", "Sanctum"],
    color: "#818cf8",
    author: {
      name: "Milinda Mendy",
      role: "Développeuse Full Stack & DevOps",
      roleEn: "Full Stack & DevOps Engineer",
      avatar: "/images/profile/MM.png",
    },
    sections: [
      {
        type: "intro",
        text: "Pour concevoir une plateforme SaaS moderne en 2026, associer la puissance du backend Laravel à la réactivité du frontend React s'avère un choix stratégique redoutable. Laravel offre un écosystème backend complet (ORM, Auth, Queues, Mail), tandis que React garantit une expérience utilisateur dynamique et fluide."
      },
      {
        type: "key_takeaway",
        title: "Au sommaire de ce guide",
        items: [
          "Séparation étanche Backend RESTful API / Frontend Single Page App",
          "Authentification sécurisée par cookies HTTP-only grâce à Laravel Sanctum",
          "Gestion optimisée de l'état global et requêtes asynchrones",
          "Stratégie de déploiement hybride : Vercel (React) + Cloud VPS (Laravel)"
        ]
      },
      {
        type: "heading",
        title: "1. Authentification robuste avec Laravel Sanctum"
      },
      {
        type: "paragraph",
        text: "Au lieu de stocker des jetons JWT dans le LocalStorage (vulnérable aux attaques XSS), Sanctum permet de gérer l'authentification par session SPA sécurisée avec des cookies SameSite et protection CSRF native."
      },
      {
        type: "code",
        language: "javascript",
        filename: "src/services/api.js",
        code: `import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.monsaas.com/api",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export async function login(credentials) {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/login", credentials);
}`
      },
      {
        type: "heading",
        title: "2. Performance et Expérience Utilisateur Premium"
      },
      {
        type: "paragraph",
        text: "En découplant le frontend du backend, votre application web réagit instantanément aux interactions utilisateur sans rechargement de page. Les mises à jour en temps réel s'effectuent sans effort via WebSockets (Laravel Reverb)."
      },
      {
        type: "conclusion",
        title: "Bilan",
        text: "Le couple Laravel + React offre le juste équilibre entre vitesse de développement et évolutivité à long terme. C'est l'un de mes stacks de prédilection pour concrétiser des projets SaaS ambitieux."
      }
    ],
    sectionsEn: [
      {
        type: "intro",
        text: "Building high-performance SaaS applications in 2026 pairs the robustness of Laravel backend services with the interactive reactivity of React UI components. Laravel delivers out-of-the-box ORM, auth, queues, and mailers, while React delivers silky smooth single-page user experiences."
      },
      {
        type: "key_takeaway",
        title: "Guide Summary",
        items: [
          "Decoupled RESTful API backend / SPA frontend architecture",
          "Secure HTTP-only cookie authentication backed by Laravel Sanctum",
          "Optimized global state management and async data fetching",
          "Hybrid deployment strategy: Vercel CDN (React) + Cloud VPS (Laravel)"
        ]
      },
      {
        type: "heading",
        title: "1. Hardened Auth via Laravel Sanctum"
      },
      {
        type: "paragraph",
        text: "Instead of storing vulnerable JWT tokens in browser LocalStorage, Sanctum secures SPA sessions using SameSite HTTP-only cookies and native CSRF token protection."
      },
      {
        type: "code",
        language: "javascript",
        filename: "src/services/api.js",
        code: `import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.mysaas.com/api",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export async function login(credentials) {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/login", credentials);
}`
      },
      {
        type: "heading",
        title: "2. Performance & Premium User Experience"
      },
      {
        type: "paragraph",
        text: "Decoupling the client interface from core backend logic provides instant UI responsiveness without page refreshes. Real-time updates flow through WebSockets using Laravel Reverb."
      },
      {
        type: "conclusion",
        title: "Summary",
        text: "Laravel + React strikes the perfect equilibrium between rapid dev velocity and long-term production scalability. It remains one of my primary go-to stacks for SaaS products."
      }
    ]
  },
  {
    id: 4,
    slug: "pourquoi-jai-migre-vers-vite-typescript",
    title: "Pourquoi j'ai migré vers Vite + TypeScript",
    titleEn: "Why I Migrated to Vite + TypeScript",
    date: "18 Avril 2026",
    readTime: "5 min",
    readTimeEn: "5 min read",
    category: "Frontend",
    categoryEn: "Frontend",
    image: "/images/blog/blog-vite-ts.jpg",
    desc: "Retour d'expérience sur la migration d'un projet React CRA vers Vite avec TypeScript, les gains de performance et les pièges à éviter.",
    descEn: "Field experience migrating legacy Create React App projects to Vite with TypeScript: speed gains & best practices.",
    tags: ["Vite", "TypeScript", "React", "Frontend"],
    color: "#f472b6",
    author: {
      name: "Milinda Mendy",
      role: "Développeuse Full Stack & DevOps",
      roleEn: "Full Stack & DevOps Engineer",
      avatar: "/images/profile/MM.png",
    },
    sections: [
      {
        type: "intro",
        text: "Pendant des années, Create React App (CRA) a été la norme pour démarrer des applications React. Cependant, l'accumulation de dépendances obsolètes et la lenteur des temps de démarrage devenaient un frein majeur. Passer à Vite et TypeScript a métamorphosé mon flux de travail."
      },
      {
        type: "heading",
        title: "1. Vitesse de démarrage et HMR instantané"
      },
      {
        type: "paragraph",
        text: "Là où Webpack mettait parfois 15 à 30 secondes pour démarrer le serveur de développement sur de gros projets, Vite démarre en moins de 300 millisecondes grâce à l'utilisation des ES Modules natifs du navigateur et d'esbuild en Go."
      },
      {
        type: "heading",
        title: "2. Le typage statique : zéro bug idiot en production"
      },
      {
        type: "paragraph",
        text: "Intégrer TypeScript permet de détecter les erreurs de props, les variables indéfinies et les mauvais types dès la saisie dans l'éditeur, éliminant ainsi toute une catégorie d'erreurs runtime."
      },
      {
        type: "code",
        language: "typescript",
        filename: "src/types/article.ts",
        code: `export interface Article {
  id: number;
  title: string;
  category: "DevOps" | "IA" | "Full Stack" | "Frontend" | "Backend" | "Design";
  readTime: string;
  tags: string[];
  color: string;
  published: boolean;
}`
      },
      {
        type: "conclusion",
        title: "Résultat",
        text: "Un temps de build divisé par 5, un confort de développement démultiplié et un code plus maintenable à long terme."
      }
    ],
    sectionsEn: [
      {
        type: "intro",
        text: "For years, Create React App (CRA) served as the standard starter for React apps. However, accumulated tech debt and sluggish bundling speeds became a developer bottleneck. Upgrading to Vite + TypeScript completely transformed my dev flow."
      },
      {
        type: "heading",
        title: "1. Lightning Dev Server Startup & Instant HMR"
      },
      {
        type: "paragraph",
        text: "While Webpack took 15 to 30 seconds to boot up local dev servers on large codebases, Vite boots in under 300ms by utilizing native browser ES Modules and Go-powered esbuild compilation."
      },
      {
        type: "heading",
        title: "2. Static Type Safety: Zero Dumb Runtime Crashes"
      },
      {
        type: "paragraph",
        text: "Adopting TypeScript flags missing props, undefined references, and type mismatches instantly inside VS Code before code ever hits production."
      },
      {
        type: "code",
        language: "typescript",
        filename: "src/types/article.ts",
        code: `export interface Article {
  id: number;
  title: string;
  category: "DevOps" | "IA" | "Full Stack" | "Frontend" | "Backend" | "Design";
  readTime: string;
  tags: string[];
  color: string;
  published: boolean;
}`
      },
      {
        type: "conclusion",
        title: "Result",
        text: "5x faster build pipelines, vastly improved developer ergonomics, and cleaner, maintainable software."
      }
    ]
  },
  {
    id: 5,
    slug: "securiser-une-api-laravel-avec-sanctum",
    title: "Sécuriser une API Laravel avec Sanctum",
    titleEn: "Securing a Production Laravel API with Sanctum",
    date: "05 Mars 2026",
    readTime: "7 min",
    readTimeEn: "7 min read",
    category: "Backend",
    categoryEn: "Backend",
    image: "/images/blog/blog-security.jpg",
    desc: "Authentification stateless, tokens API, CORS et protection des routes : tout ce qu'il faut savoir pour sécuriser votre API Laravel.",
    descEn: "Stateless authentication, API tokens, CORS headers, and route protection: essential rules for securing Laravel APIs.",
    tags: ["Laravel", "Sanctum", "Security", "Backend"],
    color: "#fb923c",
    author: {
      name: "Milinda Mendy",
      role: "Développeuse Full Stack & DevOps",
      roleEn: "Full Stack & DevOps Engineer",
      avatar: "/images/profile/MM.png",
    },
    sections: [
      {
        type: "intro",
        text: "La sécurité d'une application dépend entièrement de la protection de son API. Laravel Sanctum fournit un système d'authentification léger mais extrêmement robuste pour les SPA, applications mobiles et API REST."
      },
      {
        type: "heading",
        title: "1. Configuration des Middlewares et CORS"
      },
      {
        type: "paragraph",
        text: "Avant toute chose, veillez à restreindre les domaines autorisés dans votre fichier de configuration `config/cors.php` et activer le middleware Sanctum dans votre Kernel."
      },
      {
        type: "code",
        language: "php",
        filename: "routes/api.php",
        code: `use App\\Http\\Controllers\\ArticleController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
});`
      },
      {
        type: "heading",
        title: "2. Limitation du débit (Rate Limiting)"
      },
      {
        type: "paragraph",
        text: "Protégez vos routes critiques contre les attaques par force brute en appliquant le Rate Limiter de Laravel (ex: 60 requêtes par minute par IP)."
      },
      {
        type: "conclusion",
        title: "En résumé",
        text: "En appliquant Sanctum avec des politiques d'accès (Policies) strictes, votre API Laravel devient une forteresse prête pour la production."
      }
    ],
    sectionsEn: [
      {
        type: "intro",
        text: "Application security starts at the API perimeter. Laravel Sanctum delivers a lightweight yet battle-tested authentication mechanism for single-page applications, mobile clients, and REST services."
      },
      {
        type: "heading",
        title: "1. Middleware & Strict CORS Configuration"
      },
      {
        type: "paragraph",
        text: "Always restrict allowed origin domains in `config/cors.php` and attach Sanctum's authentication middleware across protected route groups."
      },
      {
        type: "code",
        language: "php",
        filename: "routes/api.php",
        code: `use App\\Http\\Controllers\\ArticleController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
});`
      },
      {
        type: "heading",
        title: "2. Rate Limiting & Brute Force Defense"
      },
      {
        type: "paragraph",
        text: "Shield critical login and token routes against brute-force attacks by enforcing Laravel's built-in throttle middleware (e.g. 60 requests/minute per IP address)."
      },
      {
        type: "conclusion",
        title: "Summary",
        text: "Combining Sanctum auth with granular Authorization Policies transforms your Laravel API into a production-ready fortress."
      }
    ]
  },
  {
    id: 6,
    slug: "ui-ux-pour-developpeurs-les-regles-dor",
    title: "UI/UX pour développeurs : les règles d'or",
    titleEn: "UI/UX Engineering: Golden Rules for Developers",
    date: "12 Février 2026",
    readTime: "9 min",
    readTimeEn: "9 min read",
    category: "Design",
    categoryEn: "Design",
    image: "/images/blog/blog-uiux.jpg",
    desc: "Glassmorphism, micro-animations, typographie et couleurs : comment concevoir des interfaces premium sans être graphiste.",
    descEn: "Glassmorphism, micro-interactions, typography, and color harmony: building world-class user interfaces.",
    tags: ["UI/UX", "CSS", "Framer Motion", "Design"],
    color: "#a78bfa",
    author: {
      name: "Milinda Mendy",
      role: "Développeuse Full Stack & DevOps",
      roleEn: "Full Stack & DevOps Engineer",
      avatar: "/images/profile/MM.png",
    },
    sections: [
      {
        type: "intro",
        text: "Il n'est pas nécessaire d'être un designer professionnel pour créer des interfaces captivantes et agréables à utiliser. En respectant quelques principes fondamentaux d'UI/UX, tout développeur peut faire passer ses projets au niveau supérieur."
      },
      {
        type: "heading",
        title: "1. La hiérarchie visuelle et l'espace négatif"
      },
      {
        type: "paragraph",
        text: "Ne surchargez jamais vos écrans. L'espace vide (padding/margin) n'est pas du vide inutilisé : c'est un élément de respiration qui permet de guider l'œil de l'utilisateur vers ce qui compte vraiment."
      },
      {
        type: "heading",
        title: "2. Utilisation moderne de la couleur et du Glassmorphism"
      },
      {
        type: "paragraph",
        text: "Privilégiez des palettes de couleurs harmonieuses basées sur le mode sombre moderne (ex: fond bleu nuit `#020617`, surfaces avec `backdrop-filter: blur(16px)` et bordures subtiles)."
      },
      {
        type: "quote",
        author: "Milinda Mendy",
        text: "Une bonne interface est une interface invisible : l'utilisateur accomplit son objectif sans même avoir à réfléchir aux boutons."
      },
      {
        type: "conclusion",
        title: "Conseil final",
        text: "Testez toujours vos interfaces sur de vrais appareils mobiles et soignez les retours visuels (hover, loading, états d'erreur)."
      }
    ],
    sectionsEn: [
      {
        type: "intro",
        text: "You don't need a formal graphic design degree to craft mesmerizing, intuitive user interfaces. By mastering fundamental UI/UX principles, any software engineer can elevate their products into world-class digital experiences."
      },
      {
        type: "heading",
        title: "1. Visual Hierarchy & Negative Space"
      },
      {
        type: "paragraph",
        text: "Never crowd UI containers. Negative space (padding & margins) is not wasted space—it gives layout elements breathing room and guides the user's focus straight to key content."
      },
      {
        type: "heading",
        title: "2. Modern Color Palettes & Glassmorphism"
      },
      {
        type: "paragraph",
        text: "Embrace curated dark mode themes (e.g. slate background `#020617`, frosted glass cards with `backdrop-filter: blur(16px)`, and subtle 1px glowing borders)."
      },
      {
        type: "quote",
        author: "Milinda Mendy",
        text: "A great interface is invisible: users achieve their goals effortlessly without stopping to figure out UI controls."
      },
      {
        type: "conclusion",
        title: "Final Recommendation",
        text: "Always audit your UIs on physical mobile screens and craft responsive micro-interactions for hover, active, and loading states."
      }
    ]
  }
];

export function getLocalizedArticle(article, lang = "fr") {
  if (!article) return article;
  const isEn = String(lang).toLowerCase().startsWith("en");
  if (!isEn) return article;

  return {
    ...article,
    title: article.titleEn || article.title,
    desc: article.descEn || article.desc,
    category: article.categoryEn || article.category,
    readTime: article.readTimeEn || article.readTime,
    sections: article.sectionsEn || article.sections,
    author: {
      ...article.author,
      role: article.author?.roleEn || article.author?.role || "Full Stack & DevOps Engineer",
    },
  };
}

export { staticArticles as ARTICLES };
export default staticArticles;
