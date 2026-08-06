import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Booking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="cta-section">
      {/* Background glow */}
      <div className="cta-glow" />

      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Contact
        </motion.span>

        <motion.h2
          className="cta-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Votre prochain projet
          <span className="gradient-text"> mérite le meilleur.</span>
        </motion.h2>

        <motion.p
          className="cta-desc"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Que vous ayez un projet en tête, une idée à explorer ou simplement
          envie d'échanger — je suis disponible et réactive.
        </motion.p>

        <motion.div
          className="cta-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to="/contact" className="hero-btn-primary">
            <Mail size={18} />
            Me contacter
            <ArrowRight size={16} />
          </Link>

          <a
            href="https://calendly.com/milindamendy"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-secondary"
          >
            <Calendar size={18} />
            Planifier un appel
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="cta-trust"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <span className="cta-trust-item">✅ Réponse sous 24h</span>
          <span className="cta-trust-sep">·</span>
          <span className="cta-trust-item">🌍 Remote-friendly</span>
          <span className="cta-trust-sep">·</span>
          <span className="cta-trust-item">📋 Devis gratuit</span>
        </motion.div>
      </motion.div>
    </section>
  );
}