import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Cpu, Plus, Trash2, Edit3, CheckCircle, Save, X, Server, Layout, Database } from "lucide-react";
import SEO from "../components/SEO";

export default function SkillsManager() {
  const { skills, updateSkills } = useSiteData();
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    category: "",
    skillsStr: "",
  });

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setForm({
      category: cat.category,
      skillsStr: Array.isArray(cat.skills) ? cat.skills.join(", ") : "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ category: "", skillsStr: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette catégorie de compétences ?")) {
      const updated = skills.filter((s) => s.id !== id);
      updateSkills(updated);
      triggerSuccess();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsList = form.skillsStr.split(",").map((s) => s.trim()).filter(Boolean);

    if (editingId) {
      const updated = skills.map((s) =>
        s.id === editingId ? { ...s, category: form.category, skills: skillsList } : s
      );
      updateSkills(updated);
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        category: form.category,
        skills: skillsList,
      };
      updateSkills([...skills, newCategory]);
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
      <SEO title="Gestion des Compétences | Admin" />
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <Cpu color="#34d399" size={26} />
            Gestion de la Stack & Compétences
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
            Gérez les catégories de compétences (DevOps, Frontend, Backend, Database) et les technologies associées.
          </p>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>Compétences enregistrées avec succès !</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
            {editingId ? "✏️ Éditer la Catégorie" : "➕ Ajouter une Catégorie / Techno"}
          </h3>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Nom de la Catégorie</label>
            <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="ex: Development Frontend, Cloud & DevOps..." required />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Compétences / Outils (séparés par virgules)</label>
            <input style={inputStyle} value={form.skillsStr} onChange={(e) => setForm({ ...form, skillsStr: e.target.value })} placeholder="React, Docker, Kubernetes, AWS, Tailwind CSS" required />
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            {editingId && (
              <button type="button" onClick={handleCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#cbd5e1", cursor: "pointer", fontWeight: 600 }}>
                Annuler
              </button>
            )}
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "10px", background: "#34d399", border: "none", color: "#020617", cursor: "pointer", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
              <Save size={16} />
              <span>{editingId ? "Enregistrer" : "Ajouter la catégorie"}</span>
            </button>
          </div>
        </form>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {skills.map((cat) => (
            <div key={cat.id} style={{ background: "rgba(9, 13, 22, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#34d399", margin: "0 0 0.8rem" }}>{cat.category}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(cat.skills || []).map((sk) => (
                    <span key={sk} style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#f1f5f9" }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.8rem" }}>
                <button onClick={() => handleEdit(cat)} style={{ flex: 1, padding: "6px", borderRadius: "8px", background: "rgba(52, 211, 153, 0.1)", border: "1px solid rgba(52, 211, 153, 0.2)", color: "#34d399", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <Edit3 size={14} /> Modifier
                </button>
                <button onClick={() => handleDelete(cat.id)} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid rgba(248, 113, 113, 0.2)", color: "#f87171", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>
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
