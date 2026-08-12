import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Edit3, ArrowLeft, UploadCloud, CheckCircle, Save } from "lucide-react";
import useProjects from "../hooks/useProjects";
import SEO from "../components/SEO";
import api from "../services/api";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects(true);

  const targetProject = projects.find(
    (p) => String(p.id) === String(id) || p.slug === id
  );

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (targetProject) {
      setForm({
        title: targetProject.title || "",
        category: targetProject.category || "",
        description: targetProject.description || "",
        problem: targetProject.problem || "",
        solution: targetProject.solution || "",
        technologies: Array.isArray(targetProject.technologies)
          ? targetProject.technologies.join(", ")
          : targetProject.technologies || "",
        impact: targetProject.impact || "",
        demo: targetProject.demo || "",
        github: targetProject.github || "",
      });
      setImagePreview(targetProject.image || "");
    }
  }, [targetProject]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    const techArray = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedData = {
      title: form.title,
      category: form.category,
      description: form.description,
      problem: form.problem,
      solution: form.solution,
      technologies: techArray,
      impact: form.impact,
      demo: form.demo,
      github: form.github,
      image: imagePreview,
    };

    try {
      // API call to Laravel backend
      const data = new FormData();
      data.append("_method", "PUT");
      data.append("title", form.title);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("problem", form.problem);
      data.append("solution", form.solution);
      data.append("impact", form.impact);
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
      <SEO title={`Modifier ${targetProject.title} | Administration`} />

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

        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Edit3 color="#38bdf8" size={26} />
            Modifier le Projet : <span style={{ color: "#38bdf8" }}>{targetProject.title}</span>
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Mettez à jour les informations et l'image du projet.
          </p>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Titre du projet *</label>
              <input name="title" style={inputStyle} value={form.title} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Catégorie *</label>
              <input name="category" style={inputStyle} value={form.category} onChange={handleChange} required />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description complète *</label>
            <textarea
              name="description"
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              value={form.description}
              onChange={handleChange}
              required
            />
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
              <label style={labelStyle}>Lien GitHub (URL)</label>
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
