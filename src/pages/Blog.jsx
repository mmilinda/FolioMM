import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import useArticles from "../hooks/useArticles";
import { getLocalizedArticle } from "../data/articles";
import SEO from "../components/SEO";

// ── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ article: rawArticle }) {
  const { t, i18n } = useTranslation();
  const article = getLocalizedArticle(rawArticle, i18n.language);
  const articleUrl = `/blog/${article.slug || article.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        position: "relative",
        borderRadius: "20px",
        border: `1px solid rgba(255,255,255,0.08)`,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        marginBottom: "2.5rem",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
      }}
    >
      {/* Image left */}
      <Link to={articleUrl} style={{ position: "relative", overflow: "hidden", minHeight: "280px", display: "block" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right, transparent 60%, rgba(2,6,23,0.9) 100%), linear-gradient(to top, rgba(2,6,23,0.6) 0%, transparent 50%)`,
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "3px",
          background: article.color,
        }} />
      </Link>

      {/* Content right */}
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at top right, ${article.color}12, transparent 60%)`,
        }} />
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "3px 10px", borderRadius: "999px",
          background: `${article.color}20`,
          color: article.color,
          border: `1px solid ${article.color}40`,
          marginBottom: "0.85rem",
          alignSelf: "flex-start",
        }}>
          <Tag size={10} />
          {article.category}
        </span>

        <Link to={articleUrl} style={{ textDecoration: "none" }}>
          <h2 style={{
            fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
            transition: "color 0.2s",
          }}>
            {article.title}
          </h2>
        </Link>

        <p style={{
          fontSize: "0.95rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
          maxWidth: "600px",
        }}>
          {article.desc}
        </p>

        {/* Meta + CTA */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <span>{article.date}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} />
              {article.readTime}
            </span>
          </div>

          <Link to={articleUrl} style={{ textDecoration: "none" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 20px",
              borderRadius: "10px",
              border: "none",
              background: `linear-gradient(135deg, ${article.color}, ${article.color}88)`,
              color: "#020617",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 4px 14px ${article.color}30`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              {t("blogPage.readArticle", "Lire l'article")}
              <ArrowRight size={15} />
            </button>
          </Link>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.25rem", position: "relative" }}>
          {article.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "0.72rem", fontWeight: 600,
              padding: "3px 10px", borderRadius: "6px",
              background: `${article.color}18`,
              color: `${article.color}dd`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Article Card ──────────────────────────────────────────────────────────────
function ArticleCard({ article: rawArticle, index }) {
  const { t, i18n } = useTranslation();
  const article = getLocalizedArticle(rawArticle, i18n.language);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const articleUrl = `/blog/${article.slug || article.id}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      style={{
        position: "relative",
        borderRadius: "18px",
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <Link to={articleUrl} style={{ position: "relative", height: "170px", overflow: "hidden", flexShrink: 0, display: "block" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: article.color }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(2,6,23,0.7) 0%, transparent 60%)",
        }} />
        <span style={{
          position: "absolute", bottom: "10px", left: "12px",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "3px 9px", borderRadius: "999px",
          background: `${article.color}30`,
          color: article.color,
          border: `1px solid ${article.color}50`,
          backdropFilter: "blur(8px)",
        }}>
          {article.category}
        </span>
      </Link>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        <Link to={articleUrl} style={{ textDecoration: "none" }}>
          <h3 style={{
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            {article.title}
          </h3>
        </Link>

        <p style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}>
          {article.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {article.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "0.68rem", fontWeight: 600,
              padding: "2px 8px", borderRadius: "5px",
              background: `${article.color}15`,
              color: `${article.color}cc`,
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ height: "1px", background: "var(--border)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <span>{article.date}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Clock size={11} />
              {article.readTime}
            </span>
          </div>
          <Link to={articleUrl} style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            fontSize: "0.78rem", fontWeight: 600,
            color: article.color,
            textDecoration: "none",
          }}>
            {t("blogPage.read", "Lire")}
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Blog Page ─────────────────────────────────────────────────────────────────
export default function Blog() {
  const { t } = useTranslation();
  const { articles } = useArticles();
  const [activeCategory, setActiveCategory] = useState("Tous");

  const CATEGORY_LIST = [
    { id: "Tous", label: t("blogPage.all", "Tous") },
    { id: "DevOps", label: "DevOps" },
    { id: "IA", label: "IA" },
    { id: "Full Stack", label: "Full Stack" },
    { id: "Frontend", label: "Frontend" },
    { id: "Backend", label: "Backend" },
    { id: "Design", label: "Design" },
  ];

  const featured = articles.find((a) => a.id === 1) || articles[0];
  const showFeatured = activeCategory === "Tous";

  const gridArticles =
    activeCategory === "Tous"
      ? articles.filter((a) => a.id !== featured?.id)
      : articles.filter((a) => a.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <SEO
        title={`${t("blogPage.title")} | Milinda Mendy - DevOps & Full Stack`}
        description={t("blogPage.subtitle")}
      />

      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", padding: "5rem 0 7rem" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "-120px", left: "-120px",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%)",
            filter: "blur(60px)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, right: "-80px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.1), transparent 70%)",
            filter: "blur(60px)",
          }} />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <span className="section-eyebrow">
              {t("blogPage.eyebrow", "Blog & Articles")}
            </span>

            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginTop: "1rem",
              marginBottom: "1rem",
            }}>
              {t("blogPage.title")} <span className="gradient-text">{t("blogPage.titleHighlight", "articles")}</span>
            </h1>

            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto",
            }}>
              {t("blogPage.subtitle", "Je partage mes expériences, retours de terrain et bonnes pratiques sur le DevOps, le développement et l'IA.")}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginBottom: "3rem" }}
          >
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  border: "1px solid",
                  borderColor: activeCategory === cat.id ? "transparent" : "var(--border)",
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, #38bdf8, #818cf8)"
                    : "rgba(255,255,255,0.03)",
                  color: activeCategory === cat.id ? "#020617" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Featured Article */}
          {showFeatured && featured && <FeaturedCard article={featured} />}

          {/* Grid */}
          {gridArticles.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}>
              {gridArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", color: "var(--text-muted)", padding: "4rem 0", fontSize: "1rem" }}
            >
              {t("projectsPage.noProjects", "Aucun article dans cette catégorie pour l'instant.")}
            </motion.p>
          )}

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            {t("blogPage.comingSoon", "Plus d'articles arrivent bientôt... 🚀")}
          </motion.p>
        </div>
      </div>
    </>
  );
}