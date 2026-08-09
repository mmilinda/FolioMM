import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Edit3, ArrowLeft, CheckCircle, Save } from "lucide-react";
import useArticles from "../hooks/useArticles";
import SEO from "../components/SEO";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useArticles(true);

  const targetArticle = articles.find(
    (a) => String(a.id) === String(id) || a.slug === id
  );

  const [form, setForm] = useState({
    title: "",
    category: "DevOps",
    readTime: "5 min",
    excerpt: "",
    content: "",
    tags: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (targetArticle) {
      setForm({
        title: targetArticle.title || "",
        category: targetArticle.category || "DevOps",
        readTime: targetArticle.readTime || "5 min",
        excerpt: targetArticle.desc || targetArticle.excerpt || "",
        content: targetArticle.sections?.[0]?.text || targetArticle.desc || "",
        tags: Array.isArray(targetArticle.tags) ? targetArticle.tags.join(", ") : targetArticle.tags || "",
      });
    }
  }, [targetArticle]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    if (!targetArticle) return;

    const tagArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const updatedData = {
      title: form.title,
      category: form.category,
      readTime: form.readTime,
      desc: form.excerpt,
      tags: tagArray,
      sections: [
        { type: "intro", title: "Introduction", text: form.content },
        { type: "paragraph", text: form.content },
      ],
    };

    try {
      const editedMap = JSON.parse(localStorage.getItem("edited_articles") || "{}");
      const key = String(targetArticle.id);
      editedMap[key] = { ...(editedMap[key] || {}), ...updatedData };
      if (targetArticle.slug) editedMap[targetArticle.slug] = editedMap[key];
      localStorage.setItem("edited_articles", JSON.stringify(editedMap));

      // Update custom_articles if present
      const custom = JSON.parse(localStorage.getItem("custom_articles") || "[]");
      const updatedCustom = custom.map((a) =>
        String(a.id) === String(targetArticle.id) || a.slug === targetArticle.slug
          ? { ...a, ...updatedData }
          : a
      );
      localStorage.setItem("custom_articles", JSON.stringify(updatedCustom));

      window.dispatchEvent(new CustomEvent("articles_updated"));
      setSaved(true);
      setTimeout(() => {
        navigate("/admin/articles");
      }, 1200);
    } catch (err) {
      console.error("Article edit error:", err);
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

  if (!targetArticle) {
    return (
      <div style={{ color: "#94a3b8", padding: "3rem", textAlign: "center" }}>
        Article introuvable. <Link to="/admin/articles" style={{ color: "#818cf8" }}>Retourner à la liste</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={`Modifier ${targetArticle.title} | Administration`} />

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
            <Edit3 color="#818cf8" size={26} />
            Modifier l'Article : <span style={{ color: "#818cf8" }}>{targetArticle.title}</span>
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Mettez à jour le titre, la catégorie et le contenu de votre article.
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
              <span>Article mis à jour avec succès ! Redirection...</span>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Titre de l'article *</label>
              <input name="title" style={inputStyle} value={form.title} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Catégorie *</label>
              <select name="category" style={{ ...inputStyle, background: "#090d16" }} value={form.category} onChange={handleChange}>
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
              <input name="readTime" style={inputStyle} value={form.readTime} onChange={handleChange} />
            </div>

            <div>
              <label style={labelStyle}>Mots-clés (séparés par des virgules)</label>
              <input name="tags" style={inputStyle} value={form.tags} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Extrait / Résumé *</label>
            <textarea
              name="excerpt"
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
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(129, 140, 248, 0.3)",
              }}
            >
              <Save size={18} />
              <span>Enregistrer les modifications de l'article</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
