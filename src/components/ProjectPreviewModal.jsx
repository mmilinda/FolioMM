import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  RotateCw,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProjectPreview } from "../context/ProjectPreviewContext";

export default function ProjectPreviewModal() {
  const { activeProject, isOpen, closePreview } = useProjectPreview();
  const { t } = useTranslation();

  const [device, setDevice] = useState("desktop"); // "desktop" | "tablet" | "mobile"
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  // Reset state when project changes
  useEffect(() => {
    if (activeProject) {
      setIsLoading(true);
      setDevice("desktop");
      setReloadKey(0);
    }
  }, [activeProject]);

  if (!isOpen || !activeProject) return null;

  const demoUrl = activeProject.demo;

  // Pretty URL display
  let displayHost = "";
  try {
    if (demoUrl && demoUrl.startsWith("http")) {
      const parsed = new URL(demoUrl);
      displayHost = parsed.hostname;
    }
  } catch {
    displayHost = demoUrl || "";
  }

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((k) => k + 1);
  };

  const getContainerWidth = () => {
    switch (device) {
      case "mobile":
        return "390px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closePreview}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(3, 7, 18, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1380px",
            height: "92vh",
            maxHeight: "920px",
            background: "linear-gradient(180deg, #0f172a 0%, #090d16 100%)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "22px",
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 50px -12px rgba(56, 189, 248, 0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "0.85rem 1.25rem",
              background: "rgba(15, 23, 42, 0.85)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
              flexShrink: 0,
            }}
          >
            {/* Left: Project title & live badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "220px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#10b981",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 8px #10b981",
                    display: "inline-block",
                  }}
                />
                {t("projectPreview.liveDemo", "Aperçu en direct")}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#f8fafc",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {activeProject.title}
                </h3>
                {activeProject.category && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {activeProject.category}
                  </span>
                )}
              </div>
            </div>

            {/* Center: Fake browser URL bar + Device toggles */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: "1 1 auto",
                justifyContent: "center",
                maxWidth: "600px",
              }}
            >
              {/* Address bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  background: "rgba(2, 6, 23, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#94a3b8",
                  fontSize: "0.78rem",
                  maxWidth: "320px",
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={demoUrl}
              >
                <Lock size={12} style={{ color: "#10b981", flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {displayHost || demoUrl}
                </span>
              </div>

              {/* Device switchers */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(2, 6, 23, 0.6)",
                  padding: "3px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  gap: "2px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setDevice("desktop")}
                  title={t("projectPreview.desktop", "Ordinateur")}
                  style={{
                    padding: "6px 9px",
                    borderRadius: "7px",
                    border: "none",
                    background: device === "desktop" ? "rgba(56, 189, 248, 0.2)" : "transparent",
                    color: device === "desktop" ? "#38bdf8" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <Monitor size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("tablet")}
                  title={t("projectPreview.tablet", "Tablette")}
                  style={{
                    padding: "6px 9px",
                    borderRadius: "7px",
                    border: "none",
                    background: device === "tablet" ? "rgba(56, 189, 248, 0.2)" : "transparent",
                    color: device === "tablet" ? "#38bdf8" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <Tablet size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("mobile")}
                  title={t("projectPreview.mobile", "Mobile")}
                  style={{
                    padding: "6px 9px",
                    borderRadius: "7px",
                    border: "none",
                    background: device === "mobile" ? "rgba(56, 189, 248, 0.2)" : "transparent",
                    color: device === "mobile" ? "#38bdf8" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <Smartphone size={15} />
                </button>
              </div>
            </div>

            {/* Right: Actions (Reload, Open externally, Close) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                onClick={handleReload}
                title={t("projectPreview.reload", "Recharger l'aperçu")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "7px 10px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                <RotateCw size={15} className={isLoading ? "animate-spin" : ""} />
              </button>

              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={t("projectPreview.openNewTab", "Ouvrir dans un nouvel onglet")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.12)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  color: "#38bdf8",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(56, 189, 248, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(56, 189, 248, 0.12)";
                }}
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">
                  {t("projectPreview.openNewTab", "Nouvel onglet")}
                </span>
              </a>

              <button
                type="button"
                onClick={closePreview}
                title={t("projectPreview.close", "Fermer")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#f87171",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#030712",
              padding: device === "desktop" ? "0" : "1.25rem 0.5rem",
              overflow: "hidden",
            }}
          >
            {/* Loading Indicator */}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(3, 7, 18, 0.85)",
                  zIndex: 20,
                  gap: "12px",
                }}
              >
                <Loader2
                  size={36}
                  style={{
                    color: "#38bdf8",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#94a3b8",
                    fontWeight: 500,
                  }}
                >
                  {t("projectPreview.loading", "Chargement du projet dans le folio...")}
                </p>
              </div>
            )}

            {/* The Device Frame */}
            <div
              style={{
                width: getContainerWidth(),
                height: "100%",
                maxHeight: "100%",
                transition: "width 0.3s ease, border-radius 0.3s ease",
                borderRadius: device === "desktop" ? "0" : "24px",
                border:
                  device === "desktop"
                    ? "none"
                    : "8px solid #1e293b",
                boxShadow:
                  device === "desktop"
                    ? "none"
                    : "0 20px 40px rgba(0, 0, 0, 0.7)",
                overflow: "hidden",
                position: "relative",
                background: "#ffffff",
              }}
            >
              {demoUrl ? (
                <iframe
                  key={`${demoUrl}-${reloadKey}`}
                  src={demoUrl}
                  title={activeProject.title}
                  onLoad={() => setIsLoading(false)}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "#64748b",
                    fontSize: "0.9rem",
                  }}
                >
                  Aucun lien de démonstration disponible.
                </div>
              )}
            </div>
          </div>

          {/* Bottom helper bar */}
          <div
            style={{
              padding: "0.6rem 1.25rem",
              background: "rgba(15, 23, 42, 0.95)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              fontSize: "0.78rem",
              color: "#94a3b8",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={14} style={{ color: "#38bdf8" }} />
              <span>
                {t(
                  "projectPreview.blockedNotice",
                  "Si le site bloque l'affichage intégré par mesure de sécurité, ouvrez-le directement :"
                )}
              </span>
            </div>

            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#38bdf8",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                flexShrink: 0,
              }}
            >
              {t("projectPreview.openDirectly", "Ouvrir le site")}
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
