import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  Check,
  Copy,
  BookOpen,
  ChevronRight,
  Code,
  Quote,
  Sparkles,
} from "lucide-react";
import { useArticle, useArticles } from "../hooks/useArticles";
import { getLocalizedArticle } from "../data/articles";
import SEO from "../components/SEO";

function CodeBlock({ filename, language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid var(--border)",
        background: "rgba(15, 23, 42, 0.75)",
        overflow: "hidden",
        margin: "1.75rem 0",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justify: "space-between",
          padding: "8px 16px",
          background: "rgba(255, 255, 255, 0.04)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace" }}>
          <Code size={14} style={{ color: "#38bdf8" }} />
          {filename || language || "Code"}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "none",
            border: "none",
            color: copied ? "#34d399" : "var(--text-muted)",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: "6px",
            transition: "all 0.2s",
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>
      <pre
        style={{
          padding: "1.25rem 1.5rem",
          margin: 0,
          overflowX: "auto",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "0.88rem",
          lineHeight: 1.6,
          color: "#e2e8f0",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function BlogDetails() {
  const { id } = useParams();
  const { article: rawArticle, loading } = useArticle(id);
  const { articles } = useArticles();
  const { t, i18n } = useTranslation();
  const [copiedLink, setCopiedLink] = useState(false);
  const article = getLocalizedArticle(rawArticle, i18n.language);

  const otherArticles = (articles || [])
    .filter((a) => String(a.id) !== String(article?.id) && a.slug !== article?.slug)
    .slice(0, 3)
    .map((a) => getLocalizedArticle(a, i18n.language));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--primary)", fontSize: "1.1rem", fontWeight: 600 }}>
          {t("contactPage.sending", "Chargement de l'article...")}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          {t("blogDetails.notFoundTitle", "Article introuvable")}
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          {t("blogDetails.notFoundDesc", "L'article que vous recherchez n'existe pas ou a été déplacé.")}
        </p>
        <Link to="/blog" className="hero-btn-primary" style={{ textDecoration: "none" }}>
          <ArrowLeft size={16} />
          {t("blogDetails.backToBlog", "Retour au blog")}
        </Link>
      </div>
    );
  }

  const color = article.color || "#38bdf8";

  return (
    <>
      <SEO
        title={`${article.title} | Blog Milinda Mendy`}
        description={article.desc}
        image={article.image}
      />

      <div style={{ position: "relative", minHeight: "100vh", padding: "7.5rem 0 8rem" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "-150px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "650px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="container-custom" style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          {/* Top Bar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <ArrowLeft size={16} />
              {t("blogDetails.backToBlog", "Retour au blog")}
            </Link>

            <button
              onClick={handleCopyPageLink}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: `1px solid ${copiedLink ? color : "var(--border)"}`,
                background: copiedLink ? `${color}15` : "rgba(255,255,255,0.03)",
                color: copiedLink ? color : "var(--text-muted)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
              {copiedLink ? t("blogDetails.copiedLink", "Lien copié !") : t("blogDetails.share", "Partager")}
            </button>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "2.5rem" }}
          >
            {/* Category & Meta */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: `${color}20`,
                  color: color,
                  border: `1px solid ${color}40`,
                }}
              >
                <Tag size={12} />
                {article.category}
              </span>

              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                <Calendar size={14} />
                {article.date}
              </span>

              <span style={{ color: "var(--border)" }}>•</span>

              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                <Clock size={14} />
                {article.readTime} de lecture
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "1.25rem",
              }}
            >
              {article.title}
            </h1>

            {/* Subtitle / Desc */}
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {article.desc}
            </p>

            {/* Author Profile */}
            {article.author && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <img
                  src={article.author.avatar || "/images/profile/MM.png"}
                  alt={article.author.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${color}`,
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/images/profile/MM.png";
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                    {article.author.name}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {article.author.role}
                  </div>
                </div>
              </div>
            )}
          </motion.header>

          {/* Hero Banner Image */}
          {article.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "3rem",
                border: "1px solid var(--border)",
                boxShadow: `0 20px 40px -15px ${color}20`,
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: "100%",
                  maxHeight: "450px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: `linear-gradient(90deg, ${color}, #818cf8)`,
                }}
              />
            </motion.div>
          )}

          {/* Main Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#cbd5e1",
            }}
          >
            {article.sections && article.sections.length > 0 ? (
              article.sections.map((section, idx) => {
                switch (section.type) {
                  case "intro":
                    return (
                      <p
                        key={idx}
                        style={{
                          fontSize: "1.15rem",
                          lineHeight: 1.8,
                          color: "#f1f5f9",
                          fontWeight: 500,
                          marginBottom: "2rem",
                        }}
                      >
                        {section.text}
                      </p>
                    );

                  case "key_takeaway":
                    return (
                      <div
                        key={idx}
                        style={{
                          borderRadius: "16px",
                          border: `1px solid ${color}40`,
                          background: `${color}0c`,
                          backdropFilter: "blur(12px)",
                          padding: "1.5rem 1.75rem",
                          marginBottom: "2.5rem",
                        }}
                      >
                        <h4
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "1.05rem",
                            fontWeight: 800,
                            color: color,
                            marginTop: 0,
                            marginBottom: "1rem",
                          }}
                        >
                          <Sparkles size={18} />
                          {section.title || "Points clés"}
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                          {section.items?.map((item, i) => (
                            <li key={i} style={{ marginBottom: "0.6rem", color: "#e2e8f0" }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );

                  case "heading":
                    return (
                      <h2
                        key={idx}
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                          letterSpacing: "-0.02em",
                          marginTop: "2.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {section.title}
                      </h2>
                    );

                  case "paragraph":
                    return (
                      <p key={idx} style={{ marginBottom: "1.5rem" }}>
                        {section.text}
                      </p>
                    );

                  case "code":
                    return (
                      <CodeBlock
                        key={idx}
                        filename={section.filename}
                        language={section.language}
                        code={section.code}
                      />
                    );

                  case "list":
                    return (
                      <ul key={idx} style={{ paddingLeft: "1.25rem", marginBottom: "1.75rem" }}>
                        {section.items?.map((item, i) => (
                          <li key={i} style={{ marginBottom: "0.5rem" }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    );

                  case "quote":
                    return (
                      <blockquote
                        key={idx}
                        style={{
                          position: "relative",
                          borderRadius: "14px",
                          borderLeft: `4px solid ${color}`,
                          background: "rgba(255,255,255,0.03)",
                          padding: "1.5rem 1.75rem",
                          margin: "2rem 0",
                          fontStyle: "italic",
                          fontSize: "1.1rem",
                          color: "#f1f5f9",
                        }}
                      >
                        <Quote
                          size={24}
                          style={{ position: "absolute", top: "1rem", right: "1rem", opacity: 0.15, color: color }}
                        />
                        <p style={{ margin: "0 0 0.5rem" }}>"{section.text}"</p>
                        {section.author && (
                          <footer style={{ fontSize: "0.85rem", fontStyle: "normal", color: color, fontWeight: 700 }}>
                            — {section.author}
                          </footer>
                        )}
                      </blockquote>
                    );

                  case "conclusion":
                    return (
                      <div
                        key={idx}
                        style={{
                          marginTop: "3rem",
                          padding: "1.75rem",
                          borderRadius: "16px",
                          border: "1px solid var(--border)",
                          background: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 0, marginBottom: "0.75rem" }}>
                          {section.title || "Conclusion"}
                        </h3>
                        <p style={{ margin: 0, lineHeight: 1.7 }}>{section.text}</p>
                      </div>
                    );

                  default:
                    return null;
                }
              })
            ) : (
              <p style={{ lineHeight: 1.8 }}>{article.desc || article.content}</p>
            )}

            {/* Tags section */}
            {article.tags && article.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "3.5rem",
                  paddingTop: "1.75rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, marginRight: "4px" }}>
                  Mots-clés :
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: "8px",
                      background: `${color}18`,
                      color: `${color}dd`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Author CTA Card */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2rem",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: `linear-gradient(135deg, rgba(255,255,255,0.03), ${color}0d)`,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justify: "space-between",
              gap: "1.5rem",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 0.4rem", color: "var(--text-primary)" }}>
                {t("blogDetails.ctaTitle", "Vous avez un projet DevOps ou Full Stack ?")}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
                {t("blogDetails.ctaDesc", "Parlons de l'architecture et de la mise en production de votre plateforme.")}
              </p>
            </div>
            <Link
              to="/contact"
              className="hero-btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              {t("blogDetails.contactBtn", "Me contacter")}
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Related Articles */}
          {otherArticles && otherArticles.length > 0 && (
            <section style={{ marginTop: "5rem" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.75rem" }}>
                {t("blogDetails.relatedTitle", "À lire également")}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                {otherArticles.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug || item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        borderRadius: "14px",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.02)",
                        padding: "1.25rem",
                        transition: "transform 0.2s, border-color 0.2s",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justify: "space-between",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            color: item.color || "#38bdf8",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.category}
                        </span>
                        <h4
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            lineHeight: 1.35,
                            margin: "0.4rem 0 0.6rem",
                            color: "var(--text-primary)",
                          }}
                        >
                          {item.title}
                        </h4>
                      </div>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: item.color || "#38bdf8",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          marginTop: "1rem",
                        }}
                      >
                        {t("blogPage.readArticle", "Lire l'article")} <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
