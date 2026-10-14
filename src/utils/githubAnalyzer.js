import { translateFrToEn, translateFields } from "./translator.js";

/**
 * Extrait l'owner et le nom de dépôt à partir de divers formats d'URLs GitHub.
 * Supporte :
 *  - https://github.com/owner/repo
 *  - https://github.com/owner/repo.git
 *  - github.com/owner/repo
 *  - owner/repo
 */
export function parseGitHubUrl(input) {
  if (!input || typeof input !== "string") {
    throw new Error("Veuillez renseigner un lien de dépôt Git valide.");
  }

  const clean = input.trim().replace(/\.git$/i, "").replace(/\/+$/, "");

  // Match URL complète ou partielle GitHub
  const match = clean.match(/(?:github\.com\/|^)([a-zA-Z0-9_\-\.]+)\/([a-zA-Z0-9_\-\.]+)/i);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }

  throw new Error(
    "Format de lien GitHub non reconnu. Utilisez un lien comme : https://github.com/votre-nom/nom-du-projet"
  );
}

/**
 * Récupère les données publiques d'un dépôt GitHub via l'API REST v3.
 */
export async function fetchGitHubRepoData(owner, repo) {
  // 1. Infos générales du dépôt
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(`Dépôt introuvable (${owner}/${repo}). Vérifiez qu'il s'agit bien d'un dépôt public.`);
    }
    if (repoRes.status === 403) {
      throw new Error("Limite d'appels temporaire atteinte sur GitHub. Réessayez dans un court instant.");
    }
    throw new Error(`Erreur GitHub (${repoRes.status}): ${repoRes.statusText}`);
  }

  const repoData = await repoRes.json();

  // 2. Langages utilisés
  let languages = {};
  try {
    const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    if (langRes.ok) {
      languages = await langRes.json();
    }
  } catch (err) {
    console.warn("Échec de récupération des langages GitHub:", err);
  }

  // 3. Contenu du README.md
  let readme = "";
  try {
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    if (readmeRes.ok) {
      const readmeJson = await readmeRes.json();
      if (readmeJson.content) {
        // Décodage base64 sécurisé pour UTF-8
        const atobFn = typeof atob !== "undefined" ? atob : (b) => Buffer.from(b, "base64").toString("binary");
        readme = decodeURIComponent(
          escape(atobFn(readmeJson.content.replace(/\s/g, "")))
        );
      }
    } else {
      // Fallback direct sur raw.githubusercontent.com
      const branch = repoData.default_branch || "main";
      const rawRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`);
      if (rawRes.ok) {
        readme = await rawRes.text();
      }
    }
  } catch (err) {
    console.warn("Échec de récupération du README GitHub:", err);
  }

  return { repoData, languages, readme };
}

/**
 * Liste des technologies courantes à rechercher dans le texte et les fichiers.
 */
const TECH_PATTERNS = [
  // Frontend
  { name: "React", regex: /\b(react|reactjs)\b/i },
  { name: "Vue.js", regex: /\b(vue|vuejs)\b/i },
  { name: "Next.js", regex: /\b(next|nextjs)\b/i },
  { name: "Angular", regex: /\b(angular)\b/i },
  { name: "Svelte", regex: /\b(svelte)\b/i },
  { name: "Tailwind CSS", regex: /\b(tailwind|tailwindcss)\b/i },
  { name: "Bootstrap", regex: /\b(bootstrap)\b/i },
  { name: "TypeScript", regex: /\b(typescript|ts)\b/i },
  { name: "JavaScript", regex: /\b(javascript|js|es6)\b/i },
  { name: "Vite", regex: /\b(vite|vitejs)\b/i },
  { name: "Redux", regex: /\b(redux)\b/i },

  // Backend
  { name: "Laravel", regex: /\b(laravel)\b/i },
  { name: "PHP", regex: /\b(php)\b/i },
  { name: "Node.js", regex: /\b(nodejs|node\.js)\b/i },
  { name: "Express", regex: /\b(express|expressjs)\b/i },
  { name: "NestJS", regex: /\b(nestjs)\b/i },
  { name: "Django", regex: /\b(django)\b/i },
  { name: "FastAPI", regex: /\b(fastapi)\b/i },
  { name: "Flask", regex: /\b(flask)\b/i },
  { name: "Python", regex: /\b(python)\b/i },
  { name: "Spring Boot", regex: /\b(spring boot|springboot)\b/i },
  { name: "Go", regex: /\b(golang|go language)\b/i },
  { name: "Rust", regex: /\b(rust|rustlang)\b/i },

  // DevOps & Cloud
  { name: "Docker", regex: /\b(docker|dockerfile)\b/i },
  { name: "Kubernetes", regex: /\b(kubernetes|k8s)\b/i },
  { name: "Terraform", regex: /\b(terraform)\b/i },
  { name: "Ansible", regex: /\b(ansible)\b/i },
  { name: "AWS", regex: /\b(aws|amazon web services|s3|ec2|lambda)\b/i },
  { name: "Azure", regex: /\b(azure)\b/i },
  { name: "GCP", regex: /\b(gcp|google cloud)\b/i },
  { name: "GitHub Actions", regex: /\b(github actions|workflow|ci\/cd|pipeline)\b/i },
  { name: "GitLab CI", regex: /\b(gitlab ci)\b/i },
  { name: "Nginx", regex: /\b(nginx)\b/i },
  { name: "Prometheus", regex: /\b(prometheus)\b/i },
  { name: "Grafana", regex: /\b(grafana)\b/i },
  { name: "Linux", regex: /\b(linux|ubuntu|debian)\b/i },

  // Bases de données
  { name: "PostgreSQL", regex: /\b(postgresql|postgres)\b/i },
  { name: "MySQL", regex: /\b(mysql)\b/i },
  { name: "SQLite", regex: /\b(sqlite)\b/i },
  { name: "MongoDB", regex: /\b(mongodb|mongo)\b/i },
  { name: "Redis", regex: /\b(redis)\b/i },
  { name: "Firebase", regex: /\b(firebase|firestore)\b/i },
  { name: "Supabase", regex: /\b(supabase)\b/i },

  // IA
  { name: "OpenAI", regex: /\b(openai|chatgpt|gpt-4|llm)\b/i },
  { name: "Gemini", regex: /\b(gemini|gemini-pro)\b/i },
  { name: "PyTorch", regex: /\b(pytorch)\b/i },
  { name: "TensorFlow", regex: /\b(tensorflow)\b/i },
  { name: "LangChain", regex: /\b(langchain)\b/i },

  // Mobile
  { name: "Flutter", regex: /\b(flutter)\b/i },
  { name: "React Native", regex: /\b(react native)\b/i },
];

/**
 * Nettoie le Markdown des balises d'images, liens et badges shields.io.
 */
function cleanMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/!\[.*?\]\(.*?\)/g, "") // Enlève les images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Garde le texte des liens
    .replace(/```[\s\S]*?```/g, "") // Enlève les blocs de code
    .replace(/`([^`]+)`/g, "$1") // Garde le inline code
    .replace(/<[^>]+>/g, "") // Enlève le HTML
    .replace(/#+\s+/g, "") // Enlève les préfixes # de titres
    .replace(/[-*]\s+/g, "") // Enlève les puces
    .trim();
}

/**
 * Analyse heuristique intelligente des métadonnées et du README.
 */
async function analyzeHeuristically({ repoData, languages, readme, customTitle }) {
  const repoName = repoData.name || "Projet";
  const repoDescription = (repoData.description || "").trim();

  // 1. Détection du Titre
  let formattedTitle = customTitle?.trim();
  if (!formattedTitle) {
    // Si pas de titre fourni, formater le nom du repo (ex: agri-chain-ai -> Agri Chain Ai)
    formattedTitle = repoName
      .replace(/[-_]+/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  // 2. Détection des Technologies
  const detectedTechs = new Set();

  // Ajouter les langages GitHub
  Object.keys(languages || {}).forEach((lang) => {
    if (lang !== "Blade" && lang !== "HTML" && lang !== "CSS") {
      detectedTechs.add(lang);
    }
  });

  // Ajouter les topics GitHub
  (repoData.topics || []).forEach((topic) => {
    const matched = TECH_PATTERNS.find((p) => p.regex.test(topic));
    if (matched) detectedTechs.add(matched.name);
    else if (topic.length >= 3) detectedTechs.add(topic.charAt(0).toUpperCase() + topic.slice(1));
  });

  // Scanner le README pour trouver d'autres technologies
  TECH_PATTERNS.forEach((item) => {
    if (item.regex.test(readme)) {
      detectedTechs.add(item.name);
    }
  });

  const techList = Array.from(detectedTechs).slice(0, 7);
  const techString = techList.length > 0 ? techList.join(", ") : "React, Tailwind, Docker";

  // 3. Détermination de la Catégorie
  const fullCorpus = `${repoDescription} ${readme} ${techString}`.toLowerCase();
  let categoryFr = "Full Stack • Application Web";
  let categoryEn = "Full Stack • Web Application";

  const hasDevops = techList.some((t) =>
    ["Docker", "Kubernetes", "Terraform", "Ansible", "AWS", "GitHub Actions", "Azure", "GCP", "Nginx"].includes(t)
  ) || /devops|ci\/cd|pipeline|cloud|cluster|infrastructure/i.test(fullCorpus);

  const hasAi = techList.some((t) =>
    ["OpenAI", "Gemini", "PyTorch", "TensorFlow", "LangChain"].includes(t)
  ) || /\b(ia|ai|llm|gpt)\b|machine learning|deep learning|intelligence artificielle/i.test(fullCorpus);

  const hasMobile = techList.some((t) => ["Flutter", "React Native"].includes(t)) || /mobile|android|ios/i.test(fullCorpus);

  if (hasDevops && hasAi) {
    categoryFr = "IA & DevOps • Cloud Automation";
    categoryEn = "AI & DevOps • Cloud Automation";
  } else if (hasDevops) {
    categoryFr = "DevOps • Cloud & Infrastructure";
    categoryEn = "DevOps • Cloud & Infrastructure";
  } else if (hasAi) {
    categoryFr = "IA • Machine Learning & SaaS";
    categoryEn = "AI • Machine Learning & SaaS";
  } else if (hasMobile) {
    categoryFr = "Mobile • Cross-Platform";
    categoryEn = "Mobile • Cross-Platform";
  }

  // 4. Extraction ou Synthèse de la Description
  let baseDesc = repoDescription;
  if (!baseDesc || baseDesc.length < 25) {
    // Extraire le premier paragraphe significatif du README
    const paragraphs = readme
      .split(/\n\s*\n/)
      .map(cleanMarkdown)
      .filter((p) => p.length > 40 && !p.startsWith("[!") && !p.startsWith("http"));
    if (paragraphs.length > 0) {
      baseDesc = paragraphs[0].slice(0, 320).trim();
      if (!baseDesc.endsWith(".")) baseDesc += ".";
    } else {
      baseDesc = `Application moderne et performante conçue avec ${techString}, axée sur la fiabilité, la rapidité et une expérience utilisateur optimale.`;
    }
  }

  // 5. Synthèse du Problème Résolu
  let problemFr = "";
  if (hasDevops) {
    problemFr =
      "Complexité des déploiements manuels, temps d'arrêt non maîtrisés et manque d'automatisation des flux d'intégration continue.";
  } else if (hasAi) {
    problemFr =
      "Nécessité de traiter et d'analyser de volumineux flux de données intelligemment avec un temps de réponse minimal.";
  } else {
    problemFr =
      "Besoin d'une plateforme robuste, réactive et intuitive pour centraliser et digitaliser les opérations clés des utilisateurs.";
  }

  // 6. Synthèse de la Solution Apportée
  let solutionFr = `Conception et déploiement d'une solution modulaire reposant sur ${techString}, intégrant des composants réutilisables, une gestion d'état réactive et une architecture extensible.`;

  // 7. Synthèse de l'Impact & Résultats
  let impactFr = "";
  if (hasDevops) {
    impactFr = "Déploiements automatisés à 100%, 0 temps d'arrêt et monitoring proactif.";
  } else if (hasAi) {
    impactFr = "Gain de 40% de productivité et automatisation intelligente des analyses.";
  } else {
    impactFr = "Interface moderne, gain de temps significatif et adoption utilisateur fluide.";
  }

  // 8. Auto-traduction en Anglais avec notre moteur i18n
  const translated = await translateFields({
    title: formattedTitle,
    description: baseDesc,
    problem: problemFr,
    solution: solutionFr,
    impact: impactFr,
  });

  return {
    title: formattedTitle,
    titleEn: translated.title || formattedTitle,
    category: categoryFr,
    categoryEn: categoryEn,
    description: baseDesc,
    descriptionEn: translated.description || baseDesc,
    problem: problemFr,
    problemEn: translated.problem || problemFr,
    solution: solutionFr,
    solutionEn: translated.solution || solutionFr,
    impact: impactFr,
    impactEn: translated.impact || impactFr,
    technologies: techString,
    demo: repoData.homepage && repoData.homepage.startsWith("http") ? repoData.homepage : "",
    github: repoData.html_url || `https://github.com/${repoData.owner?.login}/${repoData.name}`,
    stats: {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      language: repoData.language || "Multi",
    },
  };
}

/**
 * Tentative d'analyse avec l'API Gemini si la clé d'API est configurée.
 */
async function tryGeminiAnalysis(apiKey, { repoData, languages, readme, customTitle }) {
  const prompt = `Tu es un expert technique DevOps et développeur Full Stack.
Analyse les informations suivantes d'un dépôt GitHub pour rédiger une fiche projet percutante pour un portfolio professionnel :
- Nom : ${customTitle || repoData.name}
- Description GitHub : ${repoData.description || "N/A"}
- Langages : ${Object.keys(languages || {}).join(", ")}
- Topics : ${(repoData.topics || []).join(", ")}
- Extrait du README :
${(readme || "").slice(0, 3000)}

Réponds STRICTEMENT par un JSON valide (sans markdown, sans backticks, juste le JSON brut) avec cette structure :
{
  "title": "Titre du projet en français",
  "titleEn": "Project title in English",
  "category": "Catégorie en français (ex: DevOps • Cloud & CI/CD ou Full Stack • Web App)",
  "categoryEn": "Category in English",
  "description": "Description complète et professionnelle en français (2-3 phrases)",
  "descriptionEn": "Professional full description in English",
  "problem": "Le défi ou problème résolu en français (1 phrase)",
  "problemEn": "The challenge or problem solved in English (1 sentence)",
  "solution": "La solution technique apportée en français (1-2 phrases)",
  "solutionEn": "The technical solution provided in English (1-2 sentences)",
  "impact": "L'impact ou résultat clé en français (ex: Automatisation à 100% et 0 temps d'arrêt)",
  "impactEn": "Key impact or result in English",
  "technologies": "Liste des 5 à 7 technos clés séparées par des virgules (ex: React, Docker, Tailwind, AWS)"
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleanedJson = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
  const parsed = JSON.parse(cleanedJson);

  return {
    title: parsed.title || customTitle || repoData.name,
    titleEn: parsed.titleEn || parsed.title,
    category: parsed.category || "Full Stack • Application Web",
    categoryEn: parsed.categoryEn || parsed.category,
    description: parsed.description || repoData.description,
    descriptionEn: parsed.descriptionEn || parsed.description,
    problem: parsed.problem || "",
    problemEn: parsed.problemEn || parsed.problem,
    solution: parsed.solution || "",
    solutionEn: parsed.solutionEn || parsed.solution,
    impact: parsed.impact || "",
    impactEn: parsed.impactEn || parsed.impact,
    technologies: parsed.technologies || Object.keys(languages || {}).join(", "),
    demo: repoData.homepage && repoData.homepage.startsWith("http") ? repoData.homepage : "",
    github: repoData.html_url || `https://github.com/${repoData.owner?.login}/${repoData.name}`,
    stats: {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      language: repoData.language || "Multi",
    },
  };
}

/**
 * Fonction Principale : Analyse complète d'un projet Git avec IA.
 */
export async function analyzeGitHubProject({ repoUrl, customTitle }) {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  const { repoData, languages, readme } = await fetchGitHubRepoData(owner, repo);

  // Vérifier si une clé Gemini est disponible dans l'environnement
  const geminiKey = import.meta.env?.VITE_GEMINI_API_KEY;

  if (geminiKey && geminiKey.trim().length > 10) {
    try {
      const geminiResult = await tryGeminiAnalysis(geminiKey, {
        repoData,
        languages,
        readme,
        customTitle,
      });
      return geminiResult;
    } catch (geminiErr) {
      console.warn("Échec appel Gemini, bascule sur l'analyseur heuristique + i18n:", geminiErr);
    }
  }

  // Analyse heuristique avancée + traduction automatique
  return await analyzeHeuristically({
    repoData,
    languages,
    readme,
    customTitle,
  });
}
