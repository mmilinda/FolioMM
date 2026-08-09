import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import SEO from "../components/SEO";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { triggerNewMessageNotification } from "../utils/pwaNotifications";

/* ─── EmailJS credentials ─────────────────────────────────────────────────── */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "SERVICE_ID";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "TEMPLATE_ID";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "PUBLIC_KEY";

/* ─── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Social links ───────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/mmilinda" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/milinda-mendy-5ba17928a/" },
];

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith("en");
  const form = useRef();
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const INFO_CARDS = [
    {
      icon: Mail,
      label: "Email",
      value: "mmilinda00@gmail.com",
      href: "mailto:mmilinda00@gmail.com",
      color: "#38bdf8",
    },
    {
      icon: MapPin,
      label: isEn ? "Location" : "Localisation",
      value: isEn ? "Senegal 🇸🇳 – Remote" : "Sénégal 🇸🇳 – Remote",
      color: "#818cf8",
    },
    {
      icon: Clock,
      label: isEn ? "Availability" : "Disponibilité",
      value: isEn ? "Open for contracts & freelance" : "Ouverte aux missions",
      color: "#34d399",
    },
  ];

  /* ─── Send email handler ───────────────────────────────────────────────── */
  async function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const formData = new FormData(form.current);
    const newMessage = {
      id: Date.now(),
      name: formData.get("name") || "Visiteur",
      email: formData.get("email") || "email@inconnu.com",
      subject: formData.get("subject") || "Demande de contact",
      message: formData.get("message") || "",
      date: new Date().toLocaleString(),
      type: "Message Contact",
      read: false,
    };

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      setSuccess(true);
      if (form.current) form.current.reset();
    } catch (err) {
      console.warn("EmailJS Offline or missing credentials, saved to Admin Inbox");
      setSuccess(true);
      if (form.current) form.current.reset();
    } finally {
      try {
        const stored = JSON.parse(localStorage.getItem("contact_messages") || "[]");
        localStorage.setItem("contact_messages", JSON.stringify([newMessage, ...stored]));
        window.dispatchEvent(new CustomEvent("messages_updated"));
        triggerNewMessageNotification(newMessage.name, newMessage.subject, newMessage.message);
      } catch (storageErr) {
        console.error("Inbox storage error:", storageErr);
      }
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title={`${t("contactPage.eyebrow", "Contact")} | Milinda Mendy`}
        description={t("contactPage.subtitle")}
      />

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          paddingTop: "4rem",
          paddingBottom: "5rem",
          overflow: "hidden",
        }}
      >
        {/* Background ambient glowing orbs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-80px",
            left: "-120px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.1), transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />

        <div className="container-custom relative z-10">
          {/* ── Section header ──────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <motion.span variants={fadeUp} className="section-eyebrow">
              ✉️ {t("contactPage.eyebrow", "Restons en contact")}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="section-title"
              style={{ marginTop: "0.5rem", marginBottom: "0.75rem" }}
            >
              {t("contactPage.title", "Parlons de votre")}{" "}
              <span className="gradient-text">{t("contactPage.titleHighlight", "projet")}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {t(
                "contactPage.subtitle",
                "Une question, un projet SaaS ou une opportunité de collaboration ? Envoyez-moi un message."
              )}
            </motion.p>
          </motion.div>

          {/* ── Two-column responsive layout ────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start relative z-10"
          >
            {/* ══ LEFT COLUMN: Contact details & info ════════════════════════ */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {INFO_CARDS.map(({ icon: Icon, label, value, href, color }) => (
                  <div
                    key={label}
                    className="glass"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1.1rem 1.3rem",
                      borderRadius: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: `${color}18`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          marginBottom: "2px",
                        }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: color,
                            textDecoration: "none",
                          }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{ fontSize: "0.95rem", fontWeight: 600, color: color, margin: 0 }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--border)" }} />

              {/* Social links */}
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {isEn ? "Find me on" : "Retrouvez-moi sur"}
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--text-secondary)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)";
                        e.currentTarget.style.color = "var(--primary)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  padding: "1.1rem 1.3rem",
                  background: "rgba(56,189,248,0.05)",
                  border: "1px solid rgba(56,189,248,0.15)",
                  borderLeft: "3px solid #38bdf8",
                  borderRadius: "0 12px 12px 0",
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {isEn
                  ? '"Great DevOps is about making the essential invisible."'
                  : '« Le bon DevOps, c\'est rendre l\'invisible essentiel. »'}
              </blockquote>
            </motion.div>

            {/* ══ RIGHT COLUMN: Contact Form ═════════════════════════════════ */}
            <motion.div variants={fadeUp}>
              <div
                className="glass"
                style={{
                  borderRadius: "20px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow accent inside card */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <h2
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {isEn ? "Send a message" : "Envoyer un message"}
                </h2>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {isEn ? "I usually reply within 24 hours." : "Je réponds généralement sous 24h."}
                </p>

                <form ref={form} onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} noValidate>
                  {/* Row: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <label
                        htmlFor="cf-name"
                        style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}
                      >
                        {isEn ? "Full Name *" : "Nom complet *"}
                      </label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        required
                        placeholder={isEn ? "John Doe" : "Jean Dupont"}
                        className="input-style"
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid var(--border)",
                          background: "rgba(255,255,255,0.03)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <label
                        htmlFor="cf-email"
                        style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}
                      >
                        {isEn ? "Email Address *" : "Adresse email *"}
                      </label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        required
                        placeholder={isEn ? "john@example.com" : "jean@exemple.fr"}
                        className="input-style"
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid var(--border)",
                          background: "rgba(255,255,255,0.03)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label
                      htmlFor="cf-subject"
                      style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}
                    >
                      {isEn ? "Subject *" : "Sujet *"}
                    </label>
                    <input
                      id="cf-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder={isEn ? "DevOps Contract / Collaboration / Question..." : "Mission DevOps / Collaboration / Question…"}
                      className="input-style"
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.03)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label
                      htmlFor="cf-message"
                      style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}
                    >
                      {isEn ? "Message *" : "Message *"}
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      rows={5}
                      required
                      placeholder={isEn ? "Describe your project or request in a few words..." : "Décrivez votre projet ou votre demande en quelques mots…"}
                      className="input-style"
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.03)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  {/* Success Banner */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.85rem 1.1rem",
                        background: "rgba(52,211,153,0.1)",
                        border: "1px solid rgba(52,211,153,0.3)",
                        borderRadius: "10px",
                        color: "#34d399",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle size={18} color="#34d399" />
                      <span>
                        {isEn
                          ? "Message sent successfully! I will reply to you shortly."
                          : "Message envoyé avec succès ! Je vous répondrai très vite."}
                      </span>
                    </motion.div>
                  )}

                  {/* Error Banner */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.85rem 1.1rem",
                        background: "rgba(248,113,113,0.1)",
                        border: "1px solid rgba(248,113,113,0.3)",
                        borderRadius: "10px",
                        color: "#f87171",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                      }}
                    >
                      <AlertCircle size={18} color="#f87171" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading ? { scale: 0.99 } : {}}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      padding: "0.9rem 1.75rem",
                      background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#020617",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      marginTop: "0.5rem",
                      boxShadow: "0 4px 20px rgba(56,189,248,0.25)",
                      transition: "opacity 0.2s, boxShadow 0.2s",
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(2,6,23,0.3)",
                            borderTopColor: "#020617",
                            borderRadius: "50%",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                        {t("contactPage.sending", "Envoi en cours...")}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t("contactPage.send", "Envoyer le message")}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </section>
    </>
  );
}