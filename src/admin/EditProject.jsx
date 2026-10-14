import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Edit3, ArrowLeft, UploadCloud, CheckCircle, Save, Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import useProjects from "../hooks/useProjects";
import SEO from "../components/SEO";
import api from "../services/api";
import AutoTranslateButton from "../components/AutoTranslateButton";
import { translateFields } from "../utils/translator";
import { analyzeGitHubProject } from "../utils/githubAnalyzer";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects(true);

  const targetProject = projects.find(
    (p) => String(p.id) === String(id) || p.slug === id
  );

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saved, setSaved] = useState(false);

  // État de l'analyse IA via Git
  const [analyzingGit, setAnalyzingGit] = useState(false);
  const [gitAnalysisError, setGitAnalysisError] = useState("");
  const [gitAnalysisSuccess, setGitAnalysisSuccess] = useState(null);

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
        message: "Dépôt Git analysé et formulaire mis à jour avec succès par l'IA !",
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

  useEffect(() => {
    if (targetProject) {
      setForm({
        title: targetProject.title || "",
        titleEn: targetProject.titleEn || "",
        category: targetProject.category || "",
        categoryEn: targetProject.categoryEn || "",
        description: targetProject.description || "",
        descriptionEn: targetProject.descriptionEn || "",
        problem: targetProject.problem || "",
        problemEn: targetProject.problemEn || "",
        solution: targetProject.solution || "",
        solutionEn: targetProject.solutionEn || "",
        technologies: Array.isArray(targetProject.technologies)
          ? targetProject.technologies.join(", ")
          : targetProject.technologies || "",
        impact: targetProject.impact || "",
        impactEn: targetProject.impactEn || "",
        demo: targetProject.demo || "",
        github: targetProject.github || "",
      });
      setImagePreview(targetProject.image || "");
    }
  }, [targetProject]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (!targetProject) return;

    // Auto-traduire si des champs anglais sont vides
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

    const updatedData = {
      title: form.title,
      titleEn: finalTitleEn || form.title,
      category: form.category,
      categoryEn: finalCategoryEn || form.category,
      description: form.description,
      descriptionEn: finalDescriptionEn || form.description,
      problem: form.problem,
      problemEn: finalProblemEn || form.problem,
      solution: form.solution,
      solutionEn: finalSolutionEn || form.solution,
      technologies: techArray,
      impact: form.impact,
      impactEn: finalImpactEn || form.impact,
      demo: form.demo,
      github: form.github,
      image: imagePreview,
    };

    try {
      // API call to Laravel backend
      const data = new FormData();
      data.append("_method", "PUT");
      data.append("title", form.title);
      data.append("titleEn", form.titleEn || form.title);
      data.append("category", form.category);
      data.append("categoryEn", form.categoryEn || form.category);
      data.append("description", form.description);
      data.append("descriptionEn", form.descriptionEn || form.description);
      data.append("problem", form.problem);
      data.append("problemEn", form.problemEn || form.problem);
      data.append("solution", form.solution);
      data.append("solutionEn", form.solutionEn || form.solution);
      data.append("impact", form.impact);
      data.append("impactEn", form.impactEn || form.impact);
      data.append("demo", form.demo);
      data.append("github", form.github);
      techArray.forEach((t) => data.append("technologies[]", t));
      if (imageFile) data.append("image_file", imageFile);

      await api.post(`/projects/${targetProject.id}`, data);
    } catch (apiErr) {
      console.warn("Mise à jour locale fallback:", apiErr);
    }

    try {
      const editedMap = JSON.parse(localStorage.getItem("edited_projects") || "{}");
      const key = String(targetProject.id);
      editedMap[key] = { ...(editedMap[key] || {}), ...updatedData };
      if (targetProject.slug) editedMap[targetProject.slug] = editedMap[key];
      localStorage.setItem("edited_projects", JSON.stringify(editedMap));

      const custom = JSON.parse(localStorage.getItem("custom_projects") || "[]");
      const updatedCustom = custom.map((p) =>
        String(p.id) === String(targetProject.id) || p.slug === targetProject.slug
          ? { ...p, ...updatedData }
          : p
      );
      localStorage.setItem("custom_projects", JSON.stringify(updatedCustom));

      window.dispatchEvent(new CustomEvent("projects_updated"));
      setSaved(true);
      setTimeout(() => {
        navigate("/admin/projects");
      }, 1200);
    } catch (err) {
      console.error("Project edit error:", err);
    }
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

  if (!targetProject) {
    return (
      <div style={{ color: "#94a3b8", padding: "3rem", textAlign: "center" }}>
        Projet introuvable. <Link to="/admin/projects" style={{ color: "#38bdf8" }}>Retourner à la liste</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={`Modifier ${targetProject.title} | Administration`} noindex={true} />

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <Edit3 color="#38bdf8" size={26} />
              Modifier le Projet : <span style={{ color: "#38bdf8" }}>{targetProject.title}</span>
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Mettez à jour les informations en français ci-dessous, ou réanalysez le dépôt Git par IA pour actualiser tous les champs !
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
                  <span>Réactualiser avec l'IA depuis GitHub</span>
                  <FaGithub size={17} color="#cbd5e1" />
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0 }}>
                  Indiquez ou modifiez le lien Git ci-dessous : l'IA réanalyse le dépôt et actualise automatiquement les informations du projet !
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "0.35rem" }}>
                Nom du Projet
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Titre du projet"
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
                  <span>⚡ Réanalyser le dépôt Git & Remplir par IA</span>
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
          {saved && (
            <div
              style={{
                padding: "0.85rem 1.1rem",
                borderRadius: "12px",
                background: "rgba(52, 211, 153, 0.12)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                color: "#34d399",
                fontSize: "0.88rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircle size={18} />
              <span>Projet mis à jour avec succès dans Laravel & Local ! Redirection...</span>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Titre (FR) *</label>
              <input name="title" style={inputStyle} value={form.title} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Titre (EN - Optionnel)</label>
              <input name="titleEn" style={inputStyle} value={form.titleEn} onChange={handleChange} placeholder="ex: AgriChain AI" />
            </div>

            <div>
              <label style={labelStyle}>Catégorie (FR) *</label>
              <input name="category" style={inputStyle} value={form.category} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Catégorie (EN - Optionnel)</label>
              <input name="categoryEn" style={inputStyle} value={form.categoryEn} onChange={handleChange} placeholder="ex: AI • Agriculture" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Description complète (FR) *</label>
              <textarea
                name="description"
                rows={3}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Description complète (EN - Optionnel)</label>
              <textarea
                name="descriptionEn"
                rows={3}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.descriptionEn}
                onChange={handleChange}
                placeholder="Full description in English..."
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>🎯 Problème résolu</label>
              <textarea
                name="problem"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.problem}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>💡 Solution apportée</label>
              <textarea
                name="solution"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.solution}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Technologies (séparées par des virgules)</label>
              <input name="technologies" style={inputStyle} value={form.technologies} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>📈 Impact & Résultats</label>
              <input name="impact" style={inputStyle} value={form.impact} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Lien Démo (URL)</label>
              <input name="demo" style={inputStyle} value={form.demo} onChange={handleChange} />
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
              <input name="github" style={inputStyle} value={form.github} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Image du projet</label>
            <div
              style={{
                position: "relative",
                border: "2px dashed rgba(56, 189, 248, 0.3)",
                borderRadius: "16px",
                padding: "1.5rem",
                textAlign: "center",
                background: "rgba(2, 6, 23, 0.5)",
              }}
            >
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "10px", margin: "0 auto 12px", border: "1px solid rgba(255,255,255,0.15)" }}
                />
              )}
              <UploadCloud size={28} color="#38bdf8" style={{ margin: "0 auto 6px" }} />
              <p style={{ fontSize: "0.8rem", color: "#cbd5e1", margin: 0 }}>Cliquez pour changer l'image</p>

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
                }}
              />
            </div>
          </div>

          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              type="submit"
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
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(56, 189, 248, 0.3)",
              }}
            >
              <Save size={18} />
              <span>Enregistrer les modifications du projet</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
