import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ROLES = [
  "DevOps Engineer",
  "Full Stack Developer",
  "Cloud Architect",
  "Solutions Builder",
];

const TECH_BADGES = [
  "React",
  "Laravel",
  "WordPress",
  "Tailwind CSS",
  "JavaScript",
  "PHP",
  "Docker",
  "Vite",
  "Bootstrap",
  "REST API",
  "Blogger"
];

function TypewriterText({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="hero-typewriter">
      {displayed}
      <span className="hero-cursor">|</span>
    </span>
  );
}

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/mmilinda", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/milinda-mendy-5ba17928a/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mmilinda00@gmail.com", label: "Email" },
];

const stats = [
  { value: "10+", label: "Projets livrés" },
  { value: "3+", label: "Ans d'expérience" },
  { value: "15+", label: "Technologies" },
];

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Animated background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grid noise overlay */}
      <div className="hero-grid-overlay" />

      <div className="hero-container">
        {/* Left — Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Disponible pour des missions</span>
            <span className="hero-badge-dot" />
          </motion.div>

          {/* Heading */}
          <h1 className="hero-title">
            <span className="hero-title-line">Milinda Mendy</span>
            <span className="hero-title-role">
              <TypewriterText words={ROLES} />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Je conçois et déploie des architectures cloud robustes, des pipelines CI/CD
            efficaces et des applications full stack performantes — du code au serveur de production.
          </motion.p>

          {/* Tech badges */}
          <motion.div
            className="hero-tech-badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            {TECH_BADGES.map((t, i) => (
              <motion.span
                key={t}
                className="hero-tech-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/projects" className="hero-btn-primary">
              Voir mes projets
              <ArrowRight size={18} />
            </Link>

            <a href="/CV-Milinda-Mendy.pdf" download className="hero-btn-secondary">
              Télécharger CV
              <Download size={18} />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hero-social-link"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Profile image with glow ring */}
          <div className="hero-profile-wrapper">
            <div className="hero-glow-ring" />
            <div className="hero-glow-ring hero-glow-ring-2" />
            <img
              src="/images/profile/MM.png"
              alt="Milinda Mendy"
              className="hero-profile-img"
              loading="eager"
            />
            {/* Floating badge */}
            <motion.div
              className="hero-floating-card hero-floating-card-top"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <span className="hero-floating-dot hero-floating-dot-green" />
              Available for work
            </motion.div>
            <motion.div
              className="hero-floating-card hero-floating-card-bottom"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            >
              ⚡ 10+ projects shipped
            </motion.div>
          </div>

          {/* Stats row below image */}
          <div className="hero-stats">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="hero-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}