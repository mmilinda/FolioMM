import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FolderPlus, ArrowLeft, UploadCloud, CheckCircle, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import api from "../services/api";
import SEO from "../components/SEO";
import { db, collection, addDoc } from "../firebase";
import AutoTranslateButton from "../components/AutoTranslateButton";
import { translateFields } from "../utils/translator";
import { analyzeGitHubProject } from "../utils/githubAnalyzer";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    category: "",
    categoryEn: "",
    description: "",
    descriptionEn: "",
    problem: "",
    problemEn: "",
    solution: "",
    solutionEn: "",
    technologies: "",
    impact: "",
    impactEn: "",
    demo: "",
    github: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // État de l'analyse IA via Git
  const [analyzingGit, setAnalyzingGit] = useState(false);
  const [gitAnalysisError, setGitAnalysisError] = useState("");
  const [gitAnalysisSuccess, setGitAnalysisSuccess] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Analyse complète du dépôt Git par IA
  async function handleAnalyzeGitHub() {
    setGitAnalysisError("");
    setGitAnalysisSuccess(null);

    const repoUrl = form.github?.trim();
    if (!repoUrl) {
      setGitAnalysisError(
        "Veuillez renseigner le lien du dépôt Git (ex: https://github.com/votre-compte/nom-du-projet)"
      );
      return;
    }

    setAnalyzingGit(true);
    try {
      const result = await analyzeGitHubProject({
        repoUrl,
        customTitle: form.title?.trim(),
      });

      setForm((prev) => ({
        ...prev,
        title: result.title || prev.title,
        titleEn: result.titleEn || prev.titleEn,
        category: result.category || prev.category,
        categoryEn: result.categoryEn || prev.categoryEn,
        description: result.description || prev.description,
        descriptionEn: result.descriptionEn || prev.descriptionEn,
        problem: result.problem || prev.problem,
        problemEn: result.problemEn || prev.problemEn,
        solution: result.solution || prev.solution,
        solutionEn: result.solutionEn || prev.solutionEn,
        technologies: result.technologies || prev.technologies,
        impact: result.impact || prev.impact,
        impactEn: result.impactEn || prev.impactEn,
        demo: result.demo || prev.demo,
        github: result.github || prev.github,
      }));

      setGitAnalysisSuccess({
        message: "Dépôt Git analysé et formulaire complété avec succès par l'IA !",
        stats: result.stats,
        techs: result.technologies,
      });
    } catch (err) {
      console.error("Erreur analyse Git:", err);
      setGitAnalysisError(err?.message || "Impossible d'analyser ce dépôt Git. Vérifiez que l'URL est accessible.");
    } finally {
      setAnalyzingGit(false);
    }
  }

  async function handleAutoTranslate() {
    const toTranslate = {};
    if (form.title) toTranslate.titleEn = form.title;
    if (form.category) toTranslate.categoryEn = form.category;
    if (form.description) toTranslate.descriptionEn = form.description;
    if (form.problem) toTranslate.problemEn = form.problem;
    if (form.solution) toTranslate.solutionEn = form.solution;
    if (form.impact) toTranslate.impactEn = form.impact;

    const translated = await translateFields(toTranslate);
    setForm((prev) => ({
      ...prev,
      titleEn: translated.titleEn || prev.titleEn,
      categoryEn: translated.categoryEn || prev.categoryEn,
      descriptionEn: translated.descriptionEn || prev.descriptionEn,
      problemEn: translated.problemEn || prev.problemEn,
      solutionEn: translated.solutionEn || prev.solutionEn,
      impactEn: translated.impactEn || prev.impactEn,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Auto-traduire à la volée tout champ anglais laissé vide
    let finalTitleEn = form.titleEn;
    let finalCategoryEn = form.categoryEn;
    let finalDescriptionEn = form.descriptionEn;
    let finalProblemEn = form.problemEn;
    let finalSolutionEn = form.solutionEn;
    let finalImpactEn = form.impactEn;

    const missingEn = {};
    if (!finalTitleEn && form.title) missingEn.titleEn = form.title;
    if (!finalCategoryEn && form.category) missingEn.categoryEn = form.category;
    if (!finalDescriptionEn && form.description) missingEn.descriptionEn = form.description;
    if (!finalProblemEn && form.problem) missingEn.problemEn = form.problem;
    if (!finalSolutionEn && form.solution) missingEn.solutionEn = form.solution;
    if (!finalImpactEn && form.impact) missingEn.impactEn = form.impact;

    if (Object.keys(missingEn).length > 0) {
      try {
        const autoTranslated = await translateFields(missingEn);
        if (autoTranslated.titleEn) finalTitleEn = autoTranslated.titleEn;
        if (autoTranslated.categoryEn) finalCategoryEn = autoTranslated.categoryEn;
        if (autoTranslated.descriptionEn) finalDescriptionEn = autoTranslated.descriptionEn;
        if (autoTranslated.problemEn) finalProblemEn = autoTranslated.problemEn;
        if (autoTranslated.solutionEn) finalSolutionEn = autoTranslated.solutionEn;
        if (autoTranslated.impactEn) finalImpactEn = autoTranslated.impactEn;
      } catch (trErr) {
        console.warn("Auto-traduction de secours:", trErr);
      }
    }

    const techArray = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = slugify(form.title) || `project-${Date.now()}`;
    const newProject = {
      id: Date.now(),
      slug,
      title: form.title,
      titleEn: finalTitleEn || form.title,
      category: form.category,
      categoryEn: finalCategoryEn || form.category,
      description: form.description,
      descriptionEn: finalDescriptionEn || form.description,
      problem: form.problem || form.description,
      problemEn: finalProblemEn || form.problem || finalDescriptionEn || form.description,
      solution: form.solution || form.description,
      solutionEn: finalSolutionEn || form.solution || finalDescriptionEn || form.description,
      impact: form.impact || "Projet livré avec succès",
      impactEn: finalImpactEn || form.impact || "Project successfully delivered",
      technologies: techArray.length > 0 ? techArray : ["React", "Tailwind"],
      demo: form.demo || "#",
      github: form.github || "#",
      featured: true,
      image: imagePreview || "/images/projects/preview.png",
      status: "Terminé",
      statusEn: "Completed",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Laravel API Database
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("title_en", finalTitleEn || form.title);
      formData.append("category", form.category);
      formData.append("category_en", finalCategoryEn || form.category);
      formData.append("description", form.description);
      formData.append("description_en", finalDescriptionEn || form.description);
      formData.append("problem", form.problem);
      formData.append("problem_en", finalProblemEn || form.problem);
      formData.append("solution", form.solution);
      formData.append("solution_en", finalSolutionEn || form.solution);
      formData.append("impact", form.impact);
      formData.append("impact_en", finalImpactEn || form.impact);
      formData.append("demo", form.demo);
      formData.append("github", form.github);
      techArray.forEach((tech) => formData.append("technologies[]", tech));
      if (image) formData.append("image", image);

      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 2500,
      });
      console.log("✅ Enregistré dans la base de données Laravel / MySQL");
    } catch (err) {
      console.warn("API Laravel non disponible, passage à la base Firebase / Firestore");
    }

    // 2. Save to Firebase Firestore Database
    try {
      if (db) {
        await addDoc(collection(db, "projects"), newProject);
        console.log("🔥 Enregistré avec succès dans la base de données Firebase Firestore !");
      }
    } catch (fbErr) {
      console.warn("Erreur d'écriture Firebase (Mode hors-ligne ou clés en cours de config)");
    }

    // 3. Sync local state fallback
    try {
      const existing = JSON.parse(localStorage.getItem("custom_projects") || "[]");
      localStorage.setItem("custom_projects", JSON.stringify([newProject, ...existing]));
      window.dispatchEvent(new CustomEvent("projects_updated"));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setLoading(false);
    navigate("/admin/projects");
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(2, 6, 23, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    fontSize: "0.92rem",
    fontWeight: 500,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#cbd5e1",
    marginBottom: "0.4rem",
  };

  return (
    <>
      <SEO title="Nouveau projet | Administration" noindex={true} />

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Back Link */}
        <Link
          to="/admin/projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#94a3b8",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} color="#38bdf8" />
          <span>Retour à la liste des projets</span>
        </Link>

        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <FolderPlus color="#38bdf8" size={26} />
              Ajouter un Nouveau Projet
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Remplissez les informations ci-dessous, ou utilisez notre assistant IA pour générer tout le contenu depuis votre dépôt Git !
            </p>
          </div>

          <AutoTranslateButton onTranslate={handleAutoTranslate} />
        </div>

        {/* Assistant IA : Remplissage Automatique depuis GitHub */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.09) 0%, rgba(168, 85, 247, 0.12) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            borderRadius: "20px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Subtle neon glow overlay */}
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "140px",
              height: "140px",
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
              filter: "blur(25px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #38bdf8, #a855f7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 0 15px rgba(56, 189, 248, 0.4)",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>Génération Automatique par IA depuis GitHub</span>
                  <FaGithub size={17} color="#cbd5e1" />
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0 }}>
                  Indiquez le nom et le lien du dépôt Git : l'IA analyse le code, le README et les langages pour remplir instantanément les 9 champs du projet en français et en anglais !
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "0.35rem" }}>
                Nom du Projet (Optionnel ou personnalisé)
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: AgriChain AI (ou laisser vide pour déduction auto)"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  background: "rgba(2, 6, 23, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "0.35rem" }}>
                Lien du dépôt Git (URL GitHub) *
              </label>
              <input
                type="url"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/votre-compte/votre-depot"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  background: "rgba(2, 6, 23, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <button
              type="button"
              onClick={handleAnalyzeGitHub}
              disabled={analyzingGit}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: analyzingGit ? "not-allowed" : "pointer",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.35)",
                transition: "all 0.2s ease",
                opacity: analyzingGit ? 0.75 : 1,
              }}
            >
              {analyzingGit ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Analyse du dépôt Git & génération IA en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>⚡ Analyser le dépôt Git & Remplir par IA</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback d'erreur d'analyse */}
          {gitAnalysisError && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#f87171",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <AlertCircle size={16} />
              <span>{gitAnalysisError}</span>
            </div>
          )}

          {/* Feedback de succès d'analyse */}
          {gitAnalysisSuccess && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "12px 16px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#34d399",
                fontSize: "0.85rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
                <CheckCircle2 size={18} />
                <span>{gitAnalysisSuccess.message}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", fontSize: "0.78rem", color: "#cbd5e1" }}>
                <span style={{ padding: "3px 8px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.08)" }}>
                  ⭐ {gitAnalysisSuccess.stats?.stars || 0} stars
                </span>
                <span style={{ padding: "3px 8px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.08)" }}>
                  🔀 {gitAnalysisSuccess.stats?.forks || 0} forks
                </span>
                <span style={{ padding: "3px 8px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.08)" }}>
                  Langage : {gitAnalysisSuccess.stats?.language || "Multi"}
                </span>
                <span style={{ padding: "3px 8px", borderRadius: "6px", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                  Stack : {gitAnalysisSuccess.techs}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Glassmorphic Form Card */}
        <form
          onSubmit={submit}
          style={{
            background: "rgba(9, 13, 22, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          }}
        >
          {error && (
            <div
              style={{
                padding: "0.85rem 1.1rem",
                borderRadius: "12px",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#fbbf24",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              ℹ️ {error}
            </div>
          )}

          {/* Row 1: Title & Category */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Titre du projet (FR) *</label>
              <input
                name="title"
                placeholder="Ex: AgriChain AI"
                style={inputStyle}
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Title (EN - Optionnel)</label>
              <input
                name="titleEn"
                placeholder="Ex: AgriChain AI"
                style={inputStyle}
                value={form.titleEn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>Catégorie (FR) *</label>
              <input
                name="category"
                placeholder="Ex: SaaS • IA • DevOps"
                style={inputStyle}
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Category (EN - Optionnel)</label>
              <input
                name="categoryEn"
                placeholder="Ex: SaaS • AI • DevOps"
                style={inputStyle}
                value={form.categoryEn}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Full Description */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Description complète (FR) *</label>
              <textarea
                name="description"
                placeholder="Présentez brièvement l'objectif et les fonctionnalités clés du projet..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Description (EN - Optionnel)</label>
              <textarea
                name="descriptionEn"
                placeholder="Briefly describe project goals and features..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.descriptionEn}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2: Problem & Solution */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>🎯 Problème résolu (FR)</label>
              <textarea
                name="problem"
                placeholder="Quel était le défi ou le besoin initial ?"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.problem}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>🎯 Problem Solved (EN)</label>
              <textarea
                name="problemEn"
                placeholder="What was the initial challenge?"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.problemEn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>💡 Solution apportée (FR)</label>
              <textarea
                name="solution"
                placeholder="Comment votre application y répond-elle ?"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.solution}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>💡 Solution Provided (EN)</label>
              <textarea
                name="solutionEn"
                placeholder="How does your application solve it?"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.solutionEn}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Technologies & Impact */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Technologies (virgules)</label>
              <input
                name="technologies"
                placeholder="React, Laravel, Tailwind, Docker"
                style={inputStyle}
                value={form.technologies}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>📈 Impact & Résultats (FR)</label>
              <input
                name="impact"
                placeholder="Ex: Digitalisation & gain de 40% de temps"
                style={inputStyle}
                value={form.impact}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>📈 Impact (EN - Optionnel)</label>
              <input
                name="impactEn"
                placeholder="Ex: Digitalization & 40% time saved"
                style={inputStyle}
                value={form.impactEn}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4: Demo & GitHub Links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Lien Démo (URL)</label>
              <input
                name="demo"
                placeholder="https://mon-projet.vercel.app"
                style={inputStyle}
                value={form.demo}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Lien GitHub (URL) *</label>
                {form.github && (
                  <button
                    type="button"
                    onClick={handleAnalyzeGitHub}
                    disabled={analyzingGit}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#38bdf8",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: 0,
                    }}
                  >
                    <Sparkles size={13} />
                    <span>{analyzingGit ? "Analyse..." : "Remplir avec l'IA"}</span>
                  </button>
                )}
              </div>
              <input
                name="github"
                placeholder="https://github.com/mmilinda/mon-projet"
                style={inputStyle}
                value={form.github}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label style={labelStyle}>Image / Capture d'écran du projet *</label>
            <div
              style={{
                position: "relative",
                border: "2px dashed rgba(56, 189, 248, 0.3)",
                borderRadius: "16px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                background: "rgba(2, 6, 23, 0.5)",
                transition: "border-color 0.2s",
              }}
            >
              <UploadCloud size={36} color="#38bdf8" style={{ margin: "0 auto 8px" }} />
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: 600, margin: "0 0 4px" }}>
                Cliquez pour choisir un fichier image (PNG, JPG, WEBP)
              </p>
              <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Taille recommandée : 1200 x 800px</p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              />

              {image && (
                <div
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#34d399",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: "rgba(52, 211, 153, 0.1)",
                    border: "1px solid rgba(52, 211, 153, 0.25)",
                  }}
                >
                  <CheckCircle size={15} /> Fichier sélectionné : {image.name}
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                border: "none",
                color: "#020617",
                fontWeight: 800,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 6px 24px rgba(56, 189, 248, 0.3)",
              }}
            >
              {loading ? (
                <span>Enregistrement du projet...</span>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Enregistrer et publier le projet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}