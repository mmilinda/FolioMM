import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Edit3, ArrowLeft, UploadCloud, CheckCircle, Save, Sparkles, Loader2, AlertCircle, CheckCircle2, Key, Eye, EyeOff, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import useProjects from "../hooks/useProjects";
import SEO from "../components/SEO";
import api from "../services/api";
import AutoTranslateButton from "../components/AutoTranslateButton";
import { translateFields } from "../utils/translator";
import { analyzeGitHubProject, getActiveGitHubToken } from "../utils/githubAnalyzer";
import { syncProjectsToServer } from "../services/projectSync";

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
    status: "Production",
    statusEn: "Production",
    featured: false,
    year: "2026",
    client: "",
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
  const [syncFeedback, setSyncFeedback] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // État de l'analyse IA via Git
  const [analyzingGit, setAnalyzingGit] = useState(false);
  const [gitAnalysisError, setGitAnalysisError] = useState("");
  const [gitAnalysisSuccess, setGitAnalysisSuccess] = useState(null);

  // Gestion du Token GitHub pour dépôts privés
  const [githubToken, setGithubToken] = useState(() => getActiveGitHubToken());
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenInput, setTokenInput] = useState(() => getActiveGitHubToken() || "");
  const [showSecret, setShowSecret] = useState(false);
  const [tokenFeedback, setTokenFeedback] = useState("");

  function handleSaveToken(e) {
    e?.preventDefault();
    const val = tokenInput.trim();
    if (val) {
      localStorage.setItem("github_access_token", val);
      setGithubToken(val);
      setTokenFeedback("Token enregistré ! Vos dépôts privés sont déverrouillés.");
    } else {
      localStorage.removeItem("github_access_token");
      setGithubToken("");
      setTokenFeedback("Token supprimé.");
    }
    setTimeout(() => {
      setTokenFeedback("");
      setShowTokenModal(false);
    }, 2200);
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
        token: githubToken,
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
        status: targetProject.status || "Production",
        statusEn: targetProject.statusEn || targetProject.status || "Production",
        featured: !!targetProject.featured,
        year: targetProject.year || "2026",
        client: targetProject.client || "",
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
      status: form.status,
      statusEn: form.statusEn || form.status,
      featured: Boolean(form.featured),
      year: form.year || "2026",
      client: form.client || "",
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
      image: imagePreview || targetProject.image,
    };

    setIsSaving(true);
    setSyncFeedback({
      type: "info",
      text: "Enregistrement local et synchronisation vers la base de données distante Render...",
    });

    // 1. Sauvegarde locale immédiate (pour affichage instantané)
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
    } catch (err) {
      console.error("Project local storage error:", err);
    }

    // 2. Synchronisation complète avec le serveur distant (Render / PostgreSQL)
    try {
      const syncRes = await syncProjectsToServer();
      if (syncRes?.synced) {
        setSyncFeedback({
          type: "success",
          text: "✅ Projet modifié et synchronisé avec succès sur le serveur distant ! Visible en direct sur tous les autres appareils.",
        });
      } else {
        setSyncFeedback({
          type: "warning",
          text: `⚠️ Sauvegardé localement sur cet appareil (${syncRes?.error || "Serveur en cours de synchronisation"}).`,
        });
      }
    } catch (syncErr) {
      console.warn("Erreur synchronisation serveur:", syncErr);
    }

    // 3. Appel de mise à jour directe (supporte image file et base64)
    try {
      const data = new FormData();
      data.append("_method", "PUT");
      data.append("title", form.title);
      data.append("titleEn", form.titleEn || form.title);
      data.append("category", form.category);
      data.append("categoryEn", form.categoryEn || form.category);
      data.append("status", form.status);
      data.append("status_en", form.statusEn || form.status);
      data.append("featured", form.featured ? "1" : "0");
      data.append("year", form.year || "2026");
      data.append("client", form.client || "");
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
      if (imagePreview) data.append("image", imagePreview);
      techArray.forEach((t) => data.append("technologies[]", t));
      if (imageFile) data.append("image_file", imageFile);

      await api.post(`/projects/${targetProject.slug || targetProject.id}`, data, { timeout: 15000 });
    } catch (apiErr) {
      console.warn("Mise à jour directe fallback:", apiErr);
    }

    setIsSaving(false);
    setSaved(true);
    setTimeout(() => {
      navigate("/admin/projects");
    }, 1500);
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

          {/* Section Accès Dépôts Privés */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", padding: "10px 14px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem" }}>
              {githubToken ? (
                <>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                  <span style={{ color: "#34d399", fontWeight: 700 }}>Dépôts privés déverrouillés</span>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>(Token GitHub actif)</span>
                </>
              ) : (
                <>
                  <Lock size={14} color="#fbbf24" />
                  <span style={{ color: "#fbbf24", fontWeight: 600 }}>Dépôt privé ?</span>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Ajoutez un Token GitHub pour que l'IA puisse y accéder</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowTokenModal(!showTokenModal)}
              style={{
                background: "none",
                border: "none",
                color: "#38bdf8",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: "underline",
              }}
            >
              <Key size={13} />
              <span>{githubToken ? "Gérer / Modifier le Token" : "Configurer le Token GitHub"}</span>
            </button>
          </div>

          {/* Formulaire rétractable de configuration du Token */}
          {showTokenModal && (
            <div style={{ background: "rgba(2, 6, 23, 0.95)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "14px", padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Key size={15} color="#38bdf8" />
                  <span>Token GitHub Personnel (PAT) pour dépôts privés</span>
                </h4>
                <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0, lineHeight: 1.45 }}>
                  GitHub protège vos dépôts privés : ils renvoient une erreur 404 sans authentification. Un token avec la permission <code>repo</code> permet à l'IA d'analyser vos projets confidentiels et leurs READMEs.
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
                  <input
                    type={showSecret ? "text" : "password"}
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Collez votre token (ex: ghp_xxxxxxxxxxxxxxxxxxxx)"
                    style={{
                      width: "100%",
                      padding: "10px 40px 10px 12px",
                      borderRadius: "10px",
                      background: "rgba(15, 23, 42, 0.85)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSaveToken}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    background: "#38bdf8",
                    border: "none",
                    color: "#020617",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Enregistrer le Token
                </button>
              </div>

              {tokenFeedback && (
                <div style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 600 }}>
                  ✅ {tokenFeedback}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", fontSize: "0.75rem", color: "#64748b" }}>
                <span>
                  💡 Enregistré dans votre navigateur (ou dans <code>.env</code> sous <code>VITE_GITHUB_TOKEN</code>).
                </span>
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+AI+Analyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "none" }}
                >
                  Créer un token sur GitHub (accès direct sécurisé) ➔
                </a>
              </div>
            </div>
          )}

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
          {syncFeedback && (
            <div
              style={{
                padding: "0.9rem 1.2rem",
                borderRadius: "14px",
                background:
                  syncFeedback.type === "success"
                    ? "rgba(16, 185, 129, 0.15)"
                    : syncFeedback.type === "warning"
                    ? "rgba(245, 158, 11, 0.15)"
                    : "rgba(56, 189, 248, 0.15)",
                border: `1px solid ${
                  syncFeedback.type === "success"
                    ? "rgba(16, 185, 129, 0.4)"
                    : syncFeedback.type === "warning"
                    ? "rgba(245, 158, 11, 0.4)"
                    : "rgba(56, 189, 248, 0.4)"
                }`,
                color:
                  syncFeedback.type === "success"
                    ? "#34d399"
                    : syncFeedback.type === "warning"
                    ? "#fbbf24"
                    : "#38bdf8",
                fontSize: "0.88rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {syncFeedback.type === "success" && <CheckCircle size={18} />}
              {syncFeedback.type === "warning" && <AlertCircle size={18} />}
              {syncFeedback.type === "info" && <Loader2 size={18} className="animate-spin" />}
              <span>{syncFeedback.text}</span>
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

          {/* Statut, Année, Client & En vedette */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", background: "rgba(15, 23, 42, 0.5)", padding: "1.2rem", borderRadius: "16px", border: "1px solid rgba(56, 189, 248, 0.25)" }}>
            <div>
              <label style={labelStyle}>⚡ Statut du Projet *</label>
              <select
                name="status"
                style={{ ...inputStyle, cursor: "pointer", color: "#38bdf8", fontWeight: 700 }}
                value={form.status}
                onChange={handleChange}
              >
                <option value="Production" style={{ background: "#0f172a", color: "#34d399" }}>🟢 Production (Solution en production)</option>
                <option value="Prototype" style={{ background: "#0f172a", color: "#38bdf8" }}>🔵 Prototype (R&D / POC)</option>
                <option value="Stage Défarsci" style={{ background: "#0f172a", color: "#fb923c" }}>🟠 Stage Défarsci</option>
                <option value="Stage" style={{ background: "#0f172a", color: "#fb923c" }}>🟠 Stage (Entreprise)</option>
                <option value="Projet de Formation" style={{ background: "#0f172a", color: "#a855f7" }}>🟣 Projet de Formation</option>
                <option value="Terminé" style={{ background: "#0f172a", color: "#e2e8f0" }}>⚪ Terminé</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>📅 Année</label>
              <input
                name="year"
                style={inputStyle}
                value={form.year}
                onChange={handleChange}
                placeholder="ex: 2026"
              />
            </div>

            <div>
              <label style={labelStyle}>🏢 Client / Contexte</label>
              <input
                name="client"
                style={inputStyle}
                value={form.client}
                onChange={handleChange}
                placeholder="ex: NC Collection, SamCorporate"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={14} color="#38bdf8" />
                <span>Mise en vedette</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "10px 12px", background: form.featured ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 6, 23, 0.6)", borderRadius: "10px", border: form.featured ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)" }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: form.featured ? "#38bdf8" : "#94a3b8" }}>
                  {form.featured ? "⭐ En vedette sur l'accueil" : "Masqué de l'accueil"}
                </span>
              </label>
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
