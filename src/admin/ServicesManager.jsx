import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { Layers, Plus, Trash2, Edit3, CheckCircle, Save, X, Code2, Cloud, GitBranch, Brain, Shield, Sparkles, Eye, EyeOff, Lock } from "lucide-react";
import SEO from "../components/SEO";

export default function ServicesManager() {
  const { services, updateServices } = useSiteData();
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    iconName: "Code2",
    tags: "",
    glow: "#38bdf8",
    hidden: false,
  });

  const availableIcons = [
    { name: "Code2", label: "Code & Dev", icon: Code2 },
    { name: "Cloud", label: "Cloud & Ops", icon: Cloud },
    { name: "GitBranch", label: "CI/CD & Git", icon: GitBranch },
    { name: "Brain", label: "IA & Data", icon: Brain },
    { name: "Layers", label: "SaaS & Stack", icon: Layers },
    { name: "Shield", label: "Sécurité & Perf", icon: Shield },
  ];

  const handleEdit = (svc) => {
    setEditingId(svc.id);
    setForm({
      title: svc.title,
      desc: svc.desc,
      iconName: svc.iconName || "Code2",
      tags: Array.isArray(svc.tags) ? svc.tags.join(", ") : svc.tags || "",
      glow: svc.glow || "#38bdf8",
      hidden: !!svc.hidden,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", desc: "", iconName: "Code2", tags: "", glow: "#38bdf8", hidden: false });
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
      const updated = services.filter((s) => s.id !== id);
      updateServices(updated);
      triggerSuccess();
    }
  };

  const toggleHide = (id) => {
    const updated = services.map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s));
    updateServices(updated);
    triggerSuccess();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingId) {
      const updated = services.map((s) =>
        s.id === editingId
          ? {
              ...s,
              title: form.title,
              desc: form.desc,
              iconName: form.iconName,
              tags: tagArray,
              glow: form.glow,
              hidden: form.hidden,
            }
          : s
      );
      updateServices(updated);
    } else {
      const newService = {
        id: `svc-${Date.now()}`,
        title: form.title,
        desc: form.desc,
        iconName: form.iconName,
        tags: tagArray,
        glow: form.glow,
        gradient: "from-blue-500/20 to-cyan-500/20",
        hidden: form.hidden,
      };
      updateServices([...services, newService]);
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
      <SEO title="Gestion des Services | Admin" />
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <Layers color="#38bdf8" size={26} />
              Gestion des Services Offerts
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Modifiez, ajoutez, masquez et organisez les prestations affichées sur votre portfolio.
            </p>
          </div>
        </div>

        {saved && (
          <div style={{ padding: "0.85rem", borderRadius: "12px", background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.3)", color: "#34d399", fontSize: "0.88rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} />
            <span>Mise à jour des services enregistrée !</span>
          </div>
        )}

        {/* Formulaire d'ajout / modification */}
        <form onSubmit={handleSubmit} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
            {editingId ? "✏️ Éditer le Service" : "➕ Ajouter un Nouveau Service"}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Titre du Service</label>
              <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ex: Architecture SaaS" required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Icône</label>
              <select style={inputStyle} value={form.iconName} onChange={(e) => setForm({ ...form, iconName: e.target.value })}>
                {availableIcons.map((i) => (
                  <option key={i.name} value={i.name}>{i.label} ({i.name})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Description</label>
            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Description claire de la prestation..." required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", alignItems: "center" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Technologies (séparées par virgules)</label>
              <input style={inputStyle} value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Laravel, Docker" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Couleur / Glow Neon</label>
              <input type="color" style={{ ...inputStyle, height: "42px", padding: "4px" }} value={form.glow} onChange={(e) => setForm({ ...form, glow: e.target.value })} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1rem" }}>
              <input
                type="checkbox"
                id="serviceHidden"
                checked={form.hidden}
                onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
                style={{ width: "18px", height: "18px", accentColor: "#f59e0b", cursor: "pointer" }}
              />
              <label htmlFor="serviceHidden" style={{ fontSize: "0.85rem", color: "#fbbf24", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                <EyeOff size={15} /> Masquer ce service du site public
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            {editingId && (
              <button type="button" onClick={handleCancel} style={{ padding: "10px 16px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#cbd5e1", cursor: "pointer", fontWeight: 600 }}>
                Annuler
              </button>
            )}
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "10px", background: "#38bdf8", border: "none", color: "#020617", cursor: "pointer", fontWeight: 800, display: "flex", alignItems: "center", gap: "6px" }}>
              <Save size={16} />
              <span>{editingId ? "Enregistrer" : "Ajouter le service"}</span>
            </button>
          </div>
        </form>

        {/* Liste des Services existants */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {services.map((svc) => (
            <div
              key={svc.id}
              style={{
                background: "rgba(9, 13, 22, 0.6)",
                border: svc.hidden ? "1px dashed rgba(245, 158, 11, 0.5)" : `1px solid ${svc.glow || "#38bdf8"}44`,
                borderRadius: "16px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
                opacity: svc.hidden ? 0.75 : 1,
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>{svc.title}</h4>
                    {svc.hidden && (
                      <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", padding: "2px 8px", borderRadius: "10px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#fbbf24", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                        <Lock size={10} /> Masqué
                      </span>
                    )}
                  </div>
                  <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: svc.glow || "#38bdf8", boxShadow: `0 0 10px ${svc.glow}`, flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "0.5rem 0 0.8rem", lineHeight: 1.5 }}>{svc.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(svc.tags || []).map((t) => (
                    <span key={t} style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: "12px", background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "0.8rem" }}>
                <button
                  onClick={() => toggleHide(svc.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: svc.hidden ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    border: svc.hidden ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
                    color: svc.hidden ? "#fbbf24" : "#94a3b8",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                  title={svc.hidden ? "Rendre visible sur le site public" : "Cacher du site public"}
                >
                  {svc.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{svc.hidden ? "Masqué" : "Cacher"}</span>
                </button>

                <button onClick={() => handleEdit(svc)} style={{ flex: 1, padding: "6px", borderRadius: "8px", background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.2)", color: "#38bdf8", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <Edit3 size={14} /> Modifier
                </button>
                <button onClick={() => handleDelete(svc.id)} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid rgba(248, 113, 113, 0.2)", color: "#f87171", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}>
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

