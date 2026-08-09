import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus, Trash2, ExternalLink, Search, Clock, Eye, EyeOff, Lock, Edit3 } from "lucide-react";
import useArticles from "../hooks/useArticles";
import SEO from "../components/SEO";

export default function ArticlesManager() {
  // Pass true to include hidden articles in admin list
  const { articles } = useArticles(true);
  const [searchTerm, setSearchTerm] = useState("");

  function toggleHide(article) {
    try {
      const hiddenIds = JSON.parse(localStorage.getItem("hidden_article_ids") || "[]");
      const key = String(article.id);
      let updated;

      if (article.hidden || hiddenIds.includes(key) || (article.slug && hiddenIds.includes(article.slug))) {
        updated = hiddenIds.filter((id) => id !== key && id !== article.slug);
      } else {
        updated = [...hiddenIds, key];
        if (article.slug) updated.push(article.slug);
      }

      localStorage.setItem("hidden_article_ids", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("articles_updated"));
    } catch (err) {
      console.error("Toggle hide article error:", err);
    }
  }

  function remove(article) {
    if (!confirm(`Voulez-vous vraiment supprimer l'article "${article.title}" ?`)) return;

    try {
      const custom = JSON.parse(localStorage.getItem("custom_articles") || "[]");
      const updatedCustom = custom.filter((a) => String(a.id) !== String(article.id) && a.slug !== article.slug);
      localStorage.setItem("custom_articles", JSON.stringify(updatedCustom));

      const deletedIds = JSON.parse(localStorage.getItem("deleted_article_ids") || "[]");
      if (!deletedIds.includes(String(article.id))) deletedIds.push(String(article.id));
      if (article.slug && !deletedIds.includes(article.slug)) deletedIds.push(article.slug);
      localStorage.setItem("deleted_article_ids", JSON.stringify(deletedIds));

      window.dispatchEvent(new CustomEvent("articles_updated"));
    } catch (err) {
      console.error("Article delete error:", err);
    }
  }

  const filtered = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO title="Gestion des articles | Administration" />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1200px" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <FileText color="#818cf8" size={26} />
              Gestion des Articles ({articles.length})
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Rédigez, modifiez, masquez ou publiez vos articles de blog.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ position: "relative", width: "240px" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 40px",
                  borderRadius: "12px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <Link
              to="/admin/articles/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "12px",
                background: "#818cf8",
                color: "#020617",
                fontSize: "0.85rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(129, 140, 248, 0.3)",
              }}
            >
              <Plus size={16} />
              Nouvel article
            </Link>
          </div>
        </div>

        {/* Articles List */}
        {filtered.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", background: "rgba(9, 13, 22, 0.8)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
            Aucun article ne correspond à votre recherche.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "rgba(9, 13, 22, 0.85)",
                  border: item.hidden
                    ? "1px dashed rgba(245, 158, 11, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  opacity: item.hidden ? 0.75 : 1,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, uppercase: "true", color: item.color || "#818cf8", letterSpacing: "0.08em" }}>
                        {item.category}
                      </span>
                      {item.hidden && (
                        <span style={{ fontSize: "0.65rem", fontWeight: 800, padding: "2px 6px", borderRadius: "6px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#fbbf24", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                          <Lock size={11} /> Masqué
                        </span>
                      )}
                    </div>

                    <span style={{ fontSize: "0.75rem", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} /> {item.readTime || "5 min"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.5rem", lineHeight: 1.4 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: 0, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.desc || item.excerpt}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <Link
                    to={`/blog/${item.slug || item.id}`}
                    target="_blank"
                    style={{ fontSize: "0.78rem", fontWeight: 700, color: "#38bdf8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <ExternalLink size={14} /> Aperçu
                  </Link>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {/* Edit Button */}
                    <Link
                      to={`/admin/articles/edit/${item.slug || item.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#818cf8",
                        background: "rgba(129, 140, 248, 0.1)",
                        border: "1px solid rgba(129, 140, 248, 0.25)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      title="Modifier cet article"
                    >
                      <Edit3 size={14} />
                      Éditer
                    </Link>

                    {/* Toggle Hide/Unhide Button */}
                    <button
                      onClick={() => toggleHide(item)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: item.hidden ? "#fbbf24" : "#cbd5e1",
                        background: item.hidden ? "rgba(245, 158, 11, 0.12)" : "rgba(255, 255, 255, 0.05)",
                        border: item.hidden ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      title={item.hidden ? "Rendre visible aux lecteurs" : "Masquer du blog public"}
                    >
                      {item.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                      {item.hidden ? "Afficher" : "Masquer"}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => remove(item)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#f87171",
                        background: "rgba(248, 113, 113, 0.08)",
                        border: "1px solid rgba(248, 113, 113, 0.2)",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
