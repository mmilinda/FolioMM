import { useState, useRef } from "react";
import { useSiteData } from "../context/SiteDataContext";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Save,
  Calendar,
  GraduationCap,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Download,
  Upload,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import SEO from "../components/SEO";
import AutoTranslateButton from "../components/AutoTranslateButton";
import { translateFields } from "../utils/translator";

export default function TimelineManager() {
  const { timeline, updateTimeline, syncTimelineToServer, restoreTimelineBackup } = useSiteData();
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hasPendingSync, setHasPendingSync] = useState(
    () => localStorage.getItem("site_timeline_pending_sync") === "true"
  );
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    year: "",
    title: "",
    titleEn: "",
    company: "",
    description: "",
    descriptionEn: "",
    tagsStr: "",
    type: "work",
  });

  const handleAutoTranslate = async () => {
    const res = await translateFields({
      title: form.title,
      description: form.description,
    });
    setForm((prev) => ({
      ...prev,
      titleEn: res.title || prev.titleEn,
      descriptionEn: res.description || prev.descriptionEn,
    }));
  };

  const applyTimelineUpdate = async (newItems, actionLabel = "Modification") => {
    setIsSyncing(true);
    setStatusMsg({ type: "info", text: "Enregistrement en cours..." });

    const res = await updateTimeline(newItems);
    setIsSyncing(false);

    if (res?.synced) {
      setHasPendingSync(false);
      setStatusMsg({
        type: "success",
        text: `${actionLabel} : enregistré et synchronisé avec le serveur (visible par tous les visiteurs) !`,
      });
      setTimeout(() => setStatusMsg(null), 6000);
    } else {
      setHasPendingSync(true);
      setStatusMsg({
        type: "warning",
        text: `${actionLabel} : sauvegardé localement sur cet appareil (${res?.error || "Serveur distant en attente"}). Utilisez le bouton 'Synchroniser' ci-dessous pour publier en ligne.`,
      });
    }
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    setStatusMsg({ type: "info", text: "Transmission des modifications vers la base de données Render..." });

    const res = await syncTimelineToServer(timeline);
    setIsSyncing(false);

    if (res?.synced) {
      setHasPendingSync(false);
      setStatusMsg({
        type: "success",
        text: "✅ Parcours synchronisé avec succès ! Toutes les modifications sont maintenant visibles sur tous les appareils et par les visiteurs.",
      });
      setTimeout(() => setStatusMsg(null), 6000);
    } else {
      setHasPendingSync(true);
      setStatusMsg({
        type: "warning",
        text: `Échec de synchronisation avec le serveur : ${res?.error || "Connexion refusée"}. ${res?.isAuthError ? "Veuillez vous reconnecter à l'espace Admin." : "Vérifiez votre connexion internet."}`,
      });
    }
  };

  const handleExportJson = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(timeline, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `timeline-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setStatusMsg({ type: "success", text: "Sauvegarde JSON téléchargée avec succès !" });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (e) {
      alert("Erreur export: " + e.message);
    }
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const list = Array.isArray(parsed) ? parsed : parsed.timeline || parsed.data;
        if (Array.isArray(list) && list.length > 0) {
          if (window.confirm(`Importer ${list.length} étape(s) et mettre à jour la timeline ?`)) {
            await applyTimelineUpdate(list, `Import de ${list.length} étapes`);
          }
        } else {
          alert("Le fichier JSON ne contient pas une liste valide d'étapes.");
        }
      } catch (err) {
        alert("Erreur lecture JSON: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleRestoreBackup = async () => {
    if (window.confirm("Restaurer la dernière sauvegarde locale de votre parcours ?")) {
      const ok = restoreTimelineBackup();
      if (ok) {
        setStatusMsg({ type: "info", text: "Dernière sauvegarde locale restaurée avec succès !" });
        setTimeout(() => setStatusMsg(null), 4000);
      } else {
        alert("Aucune sauvegarde locale disponible.");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      year: item.year,
      title: item.title,
      titleEn: item.titleEn || "",
      company: item.company,
      description: item.description,
      descriptionEn: item.descriptionEn || "",
      tagsStr: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      type: item.type || "work",
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ year: "", title: "", titleEn: "", company: "", description: "", descriptionEn: "", tagsStr: "", type: "work" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette étape du parcours ?")) {
      const updated = timeline.filter((t) => t.id !== id);
      await applyTimelineUpdate(updated, "Étape supprimée");
    }
  };

  const moveItem = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= timeline.length) return;
    const updated = [...timeline];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    await applyTimelineUpdate(updated, "Ordre réorganisé");
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }
    const updated = [...timeline];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setDraggedIndex(null);
    await applyTimelineUpdate(updated, "Ordre mis à jour");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsList = form.tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

    let finalTitleEn = form.titleEn?.trim();
    let finalDescEn = form.descriptionEn?.trim();

    // Traduction automatique en tâche de fond si les champs anglais sont vides
    if (!finalTitleEn || !finalDescEn) {
      try {
        const auto = await translateFields({
          title: !finalTitleEn ? form.title : "",
          description: !finalDescEn ? form.description : "",
        });
        if (!finalTitleEn && auto.title) finalTitleEn = auto.title;
        if (!finalDescEn && auto.description) finalDescEn = auto.description;
      } catch (err) {
        console.warn("Échec traduction auto timeline:", err);
      }
    }

    if (editingId) {
      const updated = timeline.map((t) =>
        t.id === editingId
          ? {
              ...t,
              year: form.year,
              title: form.title,
              titleEn: finalTitleEn || form.title,
              company: form.company,
              description: form.description,
              descriptionEn: finalDescEn || form.description,
              tags: tagsList,
              type: form.type,
            }
          : t
      );
      handleCancel();
      await applyTimelineUpdate(updated, "Étape modifiée");
    } else {
      const newItem = {
        id: `time-${Date.now()}`,
        year: form.year,
        title: form.title,
        titleEn: finalTitleEn || form.title,
        company: form.company,
        description: form.description,
        descriptionEn: finalDescEn || form.description,
        tags: tagsList,
        type: form.type,
      };
      handleCancel();
      await applyTimelineUpdate([newItem, ...timeline], "Nouvelle étape ajoutée");
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
      <SEO title="Gestion du Parcours | Admin" noindex={true} />
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.35rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <Briefcase color="#a855f7" size={26} />
              Gestion de l'Expérience & Parcours (Timeline)
            </h1>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
              Gérez, traduisez et réorganisez la frise chronologique. Vos données sont doublement protégées (sauvegarde locale + serveur).
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleExportJson}
              title="Télécharger une copie de secours JSON sur votre ordinateur"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(59, 130, 246, 0.12)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                color: "#60a5fa",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Download size={15} />
              Exporter JSON
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Restaurer à partir d'un fichier JSON exporté"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                color: "#c084fc",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Upload size={15} />
              Importer JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportJson}
            />

            <button
              type="button"
              onClick={handleRestoreBackup}
              title="Restaurer la dernière sauvegarde automatique locale"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#cbd5e1",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RotateCcw size={14} />
              Restaurer Backup Local
            </button>
          </div>
        </div>

        {statusMsg && (
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "12px",
              background:
                statusMsg.type === "success"
                  ? "rgba(52, 211, 153, 0.12)"
                  : statusMsg.type === "warning"
                  ? "rgba(245, 158, 11, 0.15)"
                  : "rgba(59, 130, 246, 0.12)",
              border: `1px solid ${
                statusMsg.type === "success"
                  ? "rgba(52, 211, 153, 0.35)"
                  : statusMsg.type === "warning"
                  ? "rgba(245, 158, 11, 0.35)"
                  : "rgba(59, 130, 246, 0.35)"
              }`,
              color:
                statusMsg.type === "success"
                  ? "#34d399"
                  : statusMsg.type === "warning"
                  ? "#fbbf24"
                  : "#60a5fa",
              fontSize: "0.88rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle size={18} />
            ) : statusMsg.type === "warning" ? (
              <AlertTriangle size={18} />
            ) : (
              <RefreshCw size={18} className="animate-spin" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {hasPendingSync && (
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
              <AlertTriangle color="#fbbf24" size={22} className="shrink-0" />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: "#fbbf24" }}>
                  Modifications locales en attente de publication en ligne
                </p>
                <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#cbd5e1" }}>
                  Vos modifications sont sauvegardées sur cet appareil mais n'ont pas encore été transmises au serveur distant. Les autres appareils et visiteurs ne les voient pas encore.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleForceSync}
              disabled={isSyncing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "#f59e0b",
                border: "none",
                color: "#0f172a",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: isSyncing ? "wait" : "pointer",
              }}
            >
              <RefreshCw size={15} className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? "Synchronisation..." : "Synchroniser avec le serveur"}
            </button>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} style={{ background: "rgba(9, 13, 22, 0.85)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
              {editingId ? "✏️ Éditer l'Étape" : "➕ Ajouter une Étape au Parcours"}
            </h3>
            <AutoTranslateButton onTranslate={handleAutoTranslate} label="Traduire en Anglais (IA)" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Période / Année</label>
              <input style={inputStyle} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="ex: 2023 - Présent" required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Intitulé du Poste / Diplôme (FR) *</label>
              <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="ex: Ingénieure DevOps" required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Title / Degree (EN - Optionnel)</label>
              <input style={inputStyle} value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} placeholder="ex: DevOps Engineer" />
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Description des missions (FR) *</label>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Détaillez vos responsabilités et accomplissements..." required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, marginBottom: "0.3rem" }}>Description (EN - Optionnel)</label>
              <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} placeholder="Detail your responsibilities and achievements..." />
            </div>
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
          {timeline.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === timeline.length - 1;
            const isDragging = draggedIndex === index;

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={() => setDraggedIndex(null)}
                style={{
                  background: isDragging ? "rgba(168, 85, 247, 0.18)" : "rgba(9, 13, 22, 0.6)",
                  border: isDragging ? "1px dashed #c084fc" : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  transition: "all 0.2s ease",
                  opacity: isDragging ? 0.5 : 1,
                  boxShadow: isDragging ? "0 8px 24px rgba(168, 85, 247, 0.25)" : "none",
                }}
              >
                {/* Drag Handle & Position Index */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "grab",
                    color: "#64748b",
                    paddingTop: "4px",
                    userSelect: "none",
                  }}
                  title="Glisser-déposer pour réordonner"
                >
                  <GripVertical size={20} />
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: "#94a3b8",
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "2px 6px",
                      borderRadius: "6px",
                    }}
                  >
                    #{index + 1}
                  </span>
                </div>

                {/* Content */}
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

                {/* Actions: Reorder Buttons + Edit + Delete */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    disabled={isFirst}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: isFirst ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: isFirst ? "#475569" : "#ffffff",
                      cursor: isFirst ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                    title={isFirst ? "Déjà au premier rang" : "Monter cette carte"}
                  >
                    <ArrowUp size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    disabled={isLast}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: isLast ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: isLast ? "#475569" : "#ffffff",
                      cursor: isLast ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                    }}
                    title={isLast ? "Déjà au dernier rang" : "Descendre cette carte"}
                  >
                    <ArrowDown size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: "rgba(168, 85, 247, 0.1)",
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      color: "#c084fc",
                      cursor: "pointer",
                    }}
                    title="Modifier cette étape"
                  >
                    <Edit3 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: "rgba(248, 113, 113, 0.1)",
                      border: "1px solid rgba(248, 113, 113, 0.2)",
                      color: "#f87171",
                      cursor: "pointer",
                    }}
                    title="Supprimer cette étape"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
