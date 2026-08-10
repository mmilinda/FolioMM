import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { BarChart3, Plus, Trash2, Edit3, CheckCircle, Save } from "lucide-react";
import SEO from "../components/SEO";

export default function StatsManager() {
  const { stats, updateStats } = useSiteData();
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    value: "",
    label: "",
    desc: "",
  });

  const handleEdit = (st) => {
    setEditingId(st.id);
    setForm({
      value: st.value,
      label: st.label,
      desc: st.desc || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ value: "", label: "", desc: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette statistique ?")) {
      const updated = stats.filter((s) => s.id !== id);
      updateStats(updated);
      triggerSuccess();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      const updated = stats.map((s) =>
        s.id === editingId ? { ...s, value: form.value, label: form.label, desc: form.desc } : s
      );
      updateStats(updated);
    } else {
      const newStat = {
        id: `stat-${Date.now()}`,
        value: form.value,
        label: form.label,
        desc: form.desc,
      };
      updateStats([...stats, newStat]);
    }

    handleCancel();
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
      <SEO title="Gestion des Statistiques | Admin" />
      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <BarChart3 color="#f59e0b" size={26} />
            Gestion des Métriques & Statistiques
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Personnalisez les chiffres clés affichés en haut de votre page d'accueil (ex: 5+ Ans, 30+ Projets, 99.9% SLA).
          </p>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>Statistiques mises à jour !</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
            {editingId ? "✏️ Éditer la Métrique" : "➕ Ajouter une Métrique"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Valeur Chiffrée</label>
              <input style={inputStyle} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="ex: 5+, 30+, 99.9%" required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Titre / Label</label>
              <input style={inputStyle} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="ex: Projets Déployés" required />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Sous-titre / Explication courte</label>
            <input style={inputStyle} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="ex: Applications Web, SaaS & Infrastructure Cloud" />
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            {editingId && (
              <button type="button" onClick={handleCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#cbd5e1", cursor: "pointer", fontWeight: 600 }}>
                Annuler
              </button>
            )}
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "10px", background: "#f59e0b", border: "none", color: "#020617", cursor: "pointer", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
              <Save size={16} />
              <span>{editingId ? "Enregistrer" : "Ajouter la métrique"}</span>
            </button>
          </div>
        </form>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {stats.map((st) => (
            <div key={st.id} style={{ background: "rgba(9, 13, 22, 0.6)", border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: "16px", padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "#f59e0b", margin: "0 0 0.2rem" }}>{st.value}</h3>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.3rem" }}>{st.label}</h4>
                <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0 }}>{st.desc}</p>
              </div>

              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.8rem" }}>
                <button onClick={() => handleEdit(st)} style={{ flex: 1, padding: "6px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)", color: "#f59e0b", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <Edit3 size={14} /> Modifier
                </button>
                <button onClick={() => handleDelete(st.id)} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid rgba(248, 113, 113, 0.2)", color: "#f87171", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
