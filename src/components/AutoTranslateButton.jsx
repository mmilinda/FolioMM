import { useState } from "react";
import { Sparkles, Check, Loader2 } from "lucide-react";

/**
 * Bouton interactif pour déclencher la traduction automatique FR -> EN
 * avec animation de chargement et confirmation visuelle.
 */
export default function AutoTranslateButton({
  onTranslate,
  label = "Traduire en Anglais par IA",
  disabled = false,
  className = "",
  size = "normal", // 'small' | 'normal'
}) {
  const [translating, setTranslating] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleClick(e) {
    e.preventDefault();
    if (translating || disabled) return;

    setTranslating(true);
    setSuccess(false);

    try {
      await onTranslate();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.warn("Erreur auto-traduction:", err);
    } finally {
      setTranslating(false);
    }
  }

  const isSmall = size === "small";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={translating || disabled}
      title="Traduit automatiquement les champs saisis en français vers l'anglais"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSmall ? "5px" : "8px",
        padding: isSmall ? "5px 12px" : "8px 16px",
        borderRadius: "10px",
        background: success
          ? "rgba(16, 185, 129, 0.15)"
          : translating
          ? "rgba(168, 85, 247, 0.1)"
          : "linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(56, 189, 248, 0.12))",
        border: success
          ? "1px solid rgba(16, 185, 129, 0.4)"
          : "1px solid rgba(168, 85, 247, 0.35)",
        color: success ? "#34d399" : "#c084fc",
        fontSize: isSmall ? "0.75rem" : "0.82rem",
        fontWeight: 700,
        cursor: translating || disabled ? "not-allowed" : "pointer",
        transition: "all 0.25s ease",
        boxShadow: translating ? "none" : "0 2px 10px rgba(168, 85, 247, 0.15)",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {translating ? (
        <>
          <Loader2 size={isSmall ? 13 : 15} className="animate-spin text-purple-400" />
          <span>Traduction en cours...</span>
        </>
      ) : success ? (
        <>
          <Check size={isSmall ? 13 : 15} color="#34d399" />
          <span>Traduit en Anglais !</span>
        </>
      ) : (
        <>
          <Sparkles size={isSmall ? 13 : 15} color="#c084fc" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
