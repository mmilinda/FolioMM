import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FilePlus, ArrowLeft, Sparkles } from "lucide-react";
import SEO from "../components/SEO";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function CreateArticle() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "DevOps",
    readTime: "5 min",
    excerpt: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);

    const slug = slugify(form.title) || `article-${Date.now()}`;
    const tagArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const newArticle = {
      id: Date.now(),
      slug,
      title: form.title,
      titleEn: form.title,
      category: form.category,
      categoryEn: form.category,
      readTime: form.readTime,
      readTimeEn: form.readTime,
      desc: form.excerpt,
      descEn: form.excerpt,
      date: new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }),
      tags: tagArray.length > 0 ? tagArray : ["DevOps", "Tech"],
      sections: [
        { type: "intro", title: "Introduction", text: form.content },
        { type: "paragraph", text: form.content },
        { type: "conclusion", title: "Conclusion", text: "En conclusion, cette démarche permet d'optimiser l'infrastructure et la productivité." },
      ],
    };

    try {
      const existing = JSON.parse(localStorage.getItem("custom_articles") || "[]");
      localStorage.setItem("custom_articles", JSON.stringify([newArticle, ...existing]));
      window.dispatchEvent(new CustomEvent("articles_updated"));
    } catch (err) {
      console.error("Local storage article error:", err);
    } finally {
      setLoading(false);
      navigate("/admin/articles");
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

  return (
    <>
      <SEO title="Rédiger un article | Administration" />

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Link
          to="/admin/articles"
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
          <ArrowLeft size={16} color="#818cf8" />
          <span>Retour à la liste des articles</span>
        </Link>

        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <FilePlus color="#818cf8" size={26} />
            Rédiger et Publier un Article
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Publiez vos retours d'expérience, tutoriels et bonnes pratiques DevOps / Web.
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Titre de l'article *</label>
              <input
                name="title"
                placeholder="Ex: Optimiser les temps de build Docker en 2026"
                style={inputStyle}
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Catégorie *</label>
              <select
                name="category"
                style={{ ...inputStyle, background: "#090d16" }}
                value={form.category}
                onChange={handleChange}
              >
                <option value="DevOps">DevOps</option>
                <option value="IA">IA & Innovation</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Cloud">Cloud & Sécurité</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Temps de lecture</label>
              <input
                name="readTime"
                placeholder="Ex: 6 min"
                style={inputStyle}
                value={form.readTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={labelStyle}>Mots-clés (séparés par des virgules)</label>
              <input
                name="tags"
                placeholder="Docker, CI/CD, Performance, Kubernetes"
                style={inputStyle}
                value={form.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Extrait / Résumé *</label>
            <textarea
              name="excerpt"
              placeholder="Résumé accrocheur de l'article affiché sur les cartes du blog..."
              rows={2}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              value={form.excerpt}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Contenu principal de l'article *</label>
            <textarea
              name="content"
              placeholder="Rédigez ici le corps de votre article..."
              rows={8}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)",
                border: "none",
                color: "#020617",
                fontWeight: 800,
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 6px 24px rgba(129, 140, 248, 0.3)",
              }}
            >
              <Sparkles size={18} />
              <span>Publier l'article sur le Blog</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
