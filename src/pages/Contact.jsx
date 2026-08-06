import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

/* ─── EmailJS credentials (configure with your EmailJS keys) ───────────────── */
const SERVICE_ID = "SERVICE_ID";
const TEMPLATE_ID = "TEMPLATE_ID";
const PUBLIC_KEY = "PUBLIC_KEY";

/* ─── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Info cards data ────────────────────────────────────────────────────── */
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
    label: "Localisation",
    value: "Sénégal 🇸🇳 – Remote",
    color: "#818cf8",
  },
  {
    icon: Clock,
    label: "Disponibilité",
    value: "Ouverte aux missions",
    color: "#34d399",
  },
];

/* ─── Social links ───────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/milindamendy" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com/in/milindamendy" },
];

export default function Contact() {
  const form = useRef();
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  /* ─── Send email handler ───────────────────────────────────────────────── */
  async function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      setSuccess(true);
      form.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError(
        "Une erreur est survenue lors de l'envoi. Veuillez me contacter directement par email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
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
            ✉️ Restons en contact
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="section-title"
            style={{ marginTop: "0.5rem", marginBottom: "0.75rem" }}
          >
            Travaillons <span className="gradient-text">ensemble</span>
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
            Vous avez un projet DevOps, Cloud ou Full-Stack ? Je suis disponible pour des
            missions freelance, des collaborations ou simplement échanger.
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
                Retrouvez-moi sur
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
              « Le bon DevOps, c'est rendre l'invisible essentiel. »
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
                Envoyer un message
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.5rem",
                }}
              >
                Je réponds généralement sous 24h.
              </p>

              <form ref={form} onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: "1rem" }} noValidate>
                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <label
                      htmlFor="cf-name"
                      style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}
                    >
                      Nom complet *
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jean Dupont"
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
                      Adresse email *
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="jean@exemple.fr"
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
                    Sujet *
                  </label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Mission DevOps / Collaboration / Question…"
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
                    Message *
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Décrivez votre projet ou votre demande en quelques mots…"
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
                    <span>Message envoyé avec succès ! Je vous répondrai très vite.</span>
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
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer le message
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
  );
}