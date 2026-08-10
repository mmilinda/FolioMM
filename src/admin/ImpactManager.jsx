import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Zap, Plus, Trash2, Edit3, CheckCircle, Save, MessageSquareQuote, TrendingUp } from "lucide-react";
import SEO from "../components/SEO";

export default function ImpactManager() {
  const { impact, updateImpact } = useSiteData();
  const [saved, setSaved] = useState(false);

  // States pour Métriques
  const [metricForm, setMetricForm] = useState({ number: "", label: "", desc: "" });
  const [editingMetricId, setEditingMetricId] = useState(null);

  // States pour Témoignages
  const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", content: "", avatar: "" });
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  const triggerSuccess = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Metric Handlers
  const handleSaveMetric = (e) => {
    e.preventDefault();
    const currentMetrics = impact.metrics || [];

    if (editingMetricId) {
      const updated = currentMetrics.map((m) =>
        m.id === editingMetricId ? { ...m, ...metricForm } : m
      );
      updateImpact({ ...impact, metrics: updated });
    } else {
      const newMetric = { id: `imp-${Date.now()}`, ...metricForm };
      updateImpact({ ...impact, metrics: [...currentMetrics, newMetric] });
    }

    setEditingMetricId(null);
    setMetricForm({ number: "", label: "", desc: "" });
    triggerSuccess();
  };

  const handleDeleteMetric = (id) => {
    if (window.confirm("Supprimer cette métrique d'impact ?")) {
      const updated = (impact.metrics || []).filter((m) => m.id !== id);
      updateImpact({ ...impact, metrics: updated });
      triggerSuccess();
    }
  };

  // Testimonial Handlers
  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    const currentTestimonials = impact.testimonials || [];

    if (editingTestimonialId) {
      const updated = currentTestimonials.map((t) =>
        t.id === editingTestimonialId ? { ...t, ...testimonialForm } : t
      );
      updateImpact({ ...impact, testimonials: updated });
    } else {
      const newTestimonial = { id: `test-${Date.now()}`, ...testimonialForm };
      updateImpact({ ...impact, testimonials: [...currentTestimonials, newTestimonial] });
    }

    setEditingTestimonialId(null);
    setTestimonialForm({ name: "", role: "", content: "", avatar: "" });
    triggerSuccess();
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm("Supprimer ce témoignage ?")) {
      const updated = (impact.testimonials || []).filter((t) => t.id !== id);
      updateImpact({ ...impact, testimonials: updated });
      triggerSuccess();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "rgba(2, 6, 23, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    fontSize: "0.88rem",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <>
      <SEO title="Gestion de l'Impact & Témoignages | Admin" />
      <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Zap color="#ec4899" size={26} />
            Gestion de l'Impact & Témoignages Clients
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Personnalisez les indicateurs d'impact (ex: -65% temps de déploiement) et les retours clients/collaborateurs.
          </p>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>Changements enregistrés avec succès !</span>
          </div>
        )}

        {/* SECTION 1: METRIQUES D'IMPACT */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f8fafc", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp color="#38bdf8" size={20} />
            Métriques d'Impact & Performance
          </h3>

          <form onSubmit={handleSaveMetric} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "18px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Chiffre / Pourcentage</label>
                <input style={inputStyle} value={metricForm.number} onChange={(e) => setMetricForm({ ...metricForm, number: e.target.value })} placeholder="ex: -65%, 99.95%, 3x" required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Intitulé</label>
                <input style={inputStyle} value={metricForm.label} onChange={(e) => setMetricForm({ ...metricForm, label: e.target.value })} placeholder="ex: Temps de Déploiement" required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Description</label>
                <input style={inputStyle} value={metricForm.desc} onChange={(e) => setMetricForm({ ...metricForm, desc: e.target.value })} placeholder="ex: Grâce aux pipelines CI/CD" />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              {editingMetricId && (
                <button type="button" onClick={() => { setEditingMetricId(null); setMetricForm({ number: "", label: "", desc: "" }); }} style={{ padding: "8px 14px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.08)", color: "#cbd5e1", cursor: "pointer" }}>
                  Annuler
                </button>
              )}
              <button type="submit" style={{ padding: "8px 16px", borderRadius: "8px", background: "#38bdf8", border: "none", color: "#020617", fontWeight: 800, cursor: "pointer" }}>
                {editingMetricId ? "Enregistrer Métrique" : "Ajouter Métrique"}
              </button>
            </div>
          </form>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {(impact.metrics || []).map((m) => (
              <div key={m.id} style={{ background: "rgba(9, 13, 22, 0.6)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "14px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#38bdf8" }}>{m.number}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>{m.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{m.desc}</div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button onClick={() => { setEditingMetricId(m.id); setMetricForm({ number: m.number, label: m.label, desc: m.desc || "" }); }} style={{ padding: "6px", borderRadius: "6px", background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "none", cursor: "pointer" }}>
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDeleteMetric(m.id)} style={{ padding: "6px", borderRadius: "6px", background: "rgba(248, 113, 113, 0.1)", color: "#f87171", border: "none", cursor: "pointer" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: TEMOIGNAGES CLIENTS */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f8fafc", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquareQuote color="#ec4899" size={20} />
            Témoignages & Avis Clients
          </h3>

          <form onSubmit={handleSaveTestimonial} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "18px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Nom du client</label>
                <input style={inputStyle} value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="ex: Alexandre Dupont" required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Rôle / Entreprise</label>
                <input style={inputStyle} value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="ex: CTO @ SaaS Tech" required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>URL Avatar (optionnel)</label>
                <input style={inputStyle} value={testimonialForm.avatar} onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })} placeholder="https://..." />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Témoignage / Commentaire</label>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} placeholder="Milinda a su transformer nos processus DevOps et stabiliser l'infra..." required />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              {editingTestimonialId && (
                <button type="button" onClick={() => { setEditingTestimonialId(null); setTestimonialForm({ name: "", role: "", content: "", avatar: "" }); }} style={{ padding: "8px 14px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.08)", color: "#cbd5e1", cursor: "pointer" }}>
                  Annuler
                </button>
              )}
              <button type="submit" style={{ padding: "8px 16px", borderRadius: "8px", background: "#ec4899", border: "none", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>
                {editingTestimonialId ? "Enregistrer Témoignage" : "Ajouter Témoignage"}
              </button>
            </div>
          </form>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {(impact.testimonials || []).map((t) => (
              <div key={t.id} style={{ background: "rgba(9, 13, 22, 0.6)", border: "1px solid rgba(236, 72, 153, 0.2)", borderRadius: "14px", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.82rem", color: "#cbd5e1", fontStyle: "italic", margin: "0 0 0.8rem", lineHeight: 1.5 }}>"{t.content}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ec4899", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.8rem" }}>
                        {t.name[0]}
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff" }}>{t.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#ec4899" }}>{t.role}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.6rem" }}>
                  <button onClick={() => { setEditingTestimonialId(t.id); setTestimonialForm({ name: t.name, role: t.role, content: t.content, avatar: t.avatar || "" }); }} style={{ flex: 1, padding: "6px", borderRadius: "6px", background: "rgba(236, 72, 153, 0.1)", color: "#ec4899", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>
                    Modifier
                  </button>
                  <button onClick={() => handleDeleteTestimonial(t.id)} style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(248, 113, 113, 0.1)", color: "#f87171", border: "none", cursor: "pointer" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
