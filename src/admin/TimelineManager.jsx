import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Briefcase, Plus, Trash2, Edit3, CheckCircle, Save, Calendar, GraduationCap } from "lucide-react";
import SEO from "../components/SEO";

export default function TimelineManager() {
  const { timeline, updateTimeline } = useSiteData();
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    year: "",
    title: "",
    company: "",
    description: "",
    tagsStr: "",
    type: "work",
  });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      year: item.year,
      title: item.title,
      company: item.company,
      description: item.description,
      tagsStr: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      type: item.type || "work",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ year: "", title: "", company: "", description: "", tagsStr: "", type: "work" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette étape du parcours ?")) {
      const updated = timeline.filter((t) => t.id !== id);
      updateTimeline(updated);
      triggerSuccess();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsList = form.tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingId) {
      const updated = timeline.map((t) =>
        t.id === editingId
          ? {
              ...t,
              year: form.year,
              title: form.title,
              company: form.company,
              description: form.description,
              tags: tagsList,
              type: form.type,
            }
          : t
      );
      updateTimeline(updated);
    } else {
      const newItem = {
        id: `time-${Date.now()}`,
        year: form.year,
        title: form.title,
        company: form.company,
        description: form.description,
        tags: tagsList,
        type: form.type,
      };
      updateTimeline([newItem, ...timeline]);
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
      <SEO title="Gestion du Parcours | Admin" />
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Briefcase color="#a855f7" size={26} />
            Gestion de l'Expérience & Parcours (Timeline)
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Gérez la frise chronologique de vos expériences professionnelles, diplômes et certifications.
          </p>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>Mise à jour de la frise chronologique enregistrée !</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
            {editingId ? "✏️ Éditer l'Étape" : "➕ Ajouter une Étape au Parcours"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Période / Année</label>
              <input style={inputStyle} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="ex: 2023 - Présent" required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Intitulé du Poste / Diplôme</label>
              <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ex: Ingénieure DevOps" required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Entreprise / École</label>
              <input style={inputStyle} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="ex: Freelance / Remote" required />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Type</label>
              <select style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="work">💼 Expérience Pro</option>
                <option value="education">🎓 Diplôme / Formation</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Badges / Mots-clés (séparés par virgules)</label>
              <input style={inputStyle} value={form.tagsStr} onChange={(e) => setForm({ ...form, tagsStr: e.target.value })} placeholder="DevOps, AWS, Docker" />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Description des missions</label>
            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Détaillez vos responsabilités et accomplissements..." required />
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            {editingId && (
              <button type="button" onClick={handleCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#cbd5e1", cursor: "pointer", fontWeight: 600 }}>
                Annuler
              </button>
            )}
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "10px", background: "#a855f7", border: "none", color: "#ffffff", cursor: "pointer", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
              <Save size={16} />
              <span>{editingId ? "Enregistrer" : "Ajouter au parcours"}</span>
            </button>
          </div>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {timeline.map((item) => (
            <div key={item.id} style={{ background: "rgba(9, 13, 22, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "3px 10px", borderRadius: "12px", background: "rgba(168, 85, 247, 0.12)", color: "#c084fc", border: "1px solid rgba(168, 85, 247, 0.25)" }}>
                    {item.year}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>• {item.type === "education" ? "🎓 Formation" : "💼 Expérience"}</span>
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.2rem" }}>{item.title}</h4>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#38bdf8", margin: "0 0 0.5rem" }}>{item.company}</p>
                <p style={{ fontSize: "0.82rem", color: "#cbd5e1", margin: "0 0 0.8rem", lineHeight: 1.5 }}>{item.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(item.tags || []).map((tg) => (
                    <span key={tg} style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.05)", color: "#94a3b8" }}>
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <button onClick={() => handleEdit(item)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.2)", color: "#c084fc", cursor: "pointer" }}>
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: "8px", borderRadius: "8px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid rgba(248, 113, 113, 0.2)", color: "#f87171", cursor: "pointer" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
