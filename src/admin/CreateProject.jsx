import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FolderPlus, ArrowLeft, UploadCloud, CheckCircle, Sparkles } from "lucide-react";
import api from "../services/api";
import SEO from "../components/SEO";
import { db, collection, addDoc } from "../firebase";

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
    category: "",
    description: "",
    problem: "",
    solution: "",
    technologies: "",
    impact: "",
    demo: "",
    github: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    const techArray = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = slugify(form.title) || `project-${Date.now()}`;
    const newProject = {
      id: Date.now(),
      slug,
      title: form.title,
      titleEn: form.title,
      category: form.category,
      categoryEn: form.category,
      description: form.description,
      descriptionEn: form.description,
      problem: form.problem || form.description,
      problemEn: form.problem || form.description,
      solution: form.solution || form.description,
      solutionEn: form.solution || form.description,
      impact: form.impact || "Projet livré avec succès",
      impactEn: form.impact || "Project successfully delivered",
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
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("problem", form.problem);
      formData.append("solution", form.solution);
      formData.append("impact", form.impact);
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
      <SEO title="Nouveau projet | Administration" />

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
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <FolderPlus color="#38bdf8" size={26} />
            Ajouter un Nouveau Projet
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Remplissez les informations ci-dessous pour publier un projet sur votre portfolio public.
          </p>
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
              <label style={labelStyle}>Titre du projet *</label>
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
              <label style={labelStyle}>Catégorie *</label>
              <input
                name="category"
                placeholder="Ex: SaaS • IA • DevOps"
                style={inputStyle}
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Full Description */}
          <div>
            <label style={labelStyle}>Description complète *</label>
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

          {/* Row 2: Problem & Solution */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>🎯 Problème résolu</label>
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
              <label style={labelStyle}>💡 Solution apportée</label>
              <textarea
                name="solution"
                placeholder="Comment votre application y répond-elle ?"
                rows={2}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                value={form.solution}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Technologies & Impact */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Technologies (séparées par des virgules)</label>
              <input
                name="technologies"
                placeholder="React, Laravel, Tailwind, Docker"
                style={inputStyle}
                value={form.technologies}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>📈 Impact & Résultats</label>
              <input
                name="impact"
                placeholder="Ex: Digitalisation & gain de 40% de temps"
                style={inputStyle}
                value={form.impact}
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
              <label style={labelStyle}>Lien GitHub (URL)</label>
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