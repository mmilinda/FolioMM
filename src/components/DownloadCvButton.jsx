import { useState, useRef, useEffect } from "react";
import { Download, FileText, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSiteData } from "../context/SiteDataContext";

export default function DownloadCvButton({ className = "hero-btn-secondary", style = {} }) {
  const { t, i18n } = useTranslation();
  const { profile } = useSiteData();
  const [open, setOpen] = useState(false);
  const [downloadedLang, setDownloadedLang] = useState(null);
  const dropdownRef = useRef(null);

  const isEn = i18n.language?.toLowerCase().startsWith("en");

  const cvFr = profile?.cvLinkFr || profile?.cvLink || "/CV-Milinda-Mendy-FR.pdf";
  const cvEn = profile?.cvLinkEn || profile?.cvLink || "/CV-Milinda-Mendy-EN.pdf";

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = (lang, url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = lang === "fr" ? "CV-Milinda-Mendy-FR.pdf" : "CV-Milinda-Mendy-EN.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedLang(lang);
    setOpen(false);
    setTimeout(() => setDownloadedLang(null), 3000);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block", ...style }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Download size={18} />
        <span>{t("hero.downloadCv", "Télécharger mon CV")}</span>
        <ChevronDown
          size={14}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            opacity: 0.8,
          }}
        />
      </button>

      {/* Success Notification Banner */}
      {downloadedLang && (
        <div
          style={{
            position: "absolute",
            top: "-42px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            background: "rgba(52, 211, 153, 0.95)",
            color: "#020617",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 10px 25px rgba(52, 211, 153, 0.4)",
            zIndex: 60,
          }}
        >
          <Check size={14} />
          <span>
            {downloadedLang === "fr"
              ? "CV Français téléchargé !"
              : "English Resume downloaded!"}
          </span>
        </div>
      )}

      {/* Dropdown Menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            minWidth: "220px",
            background: "rgba(9, 13, 22, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            padding: "8px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            style={{
              padding: "6px 10px 8px",
              fontSize: "0.68rem",
              fontWeight: 800,
              color: "#94a3b8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "4px",
            }}
          >
            {isEn ? "Select Version" : "Choisir la version"}
          </div>

          {/* Option FR */}
          <button
            type="button"
            onClick={() => handleDownload("fr", cvFr)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(56, 189, 248, 0.15)";
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
              e.currentTarget.style.color = "#38bdf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.1rem" }}>🇫🇷</span>
              <span>CV en Français</span>
            </div>
            <FileText size={14} opacity={0.7} />
          </button>

          {/* Option EN */}
          <button
            type="button"
            onClick={() => handleDownload("en", cvEn)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(168, 85, 247, 0.15)";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)";
              e.currentTarget.style.color = "#c084fc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "1.1rem" }}>🇬🇧</span>
              <span>English Resume</span>
            </div>
            <FileText size={14} opacity={0.7} />
          </button>
        </div>
      )}
    </div>
  );
}
